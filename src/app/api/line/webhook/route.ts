import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { env } from '@/lib/env';
import { lineConfig } from '@/lib/line-config';
import { logger, newCorrelationId, logAdminPushed, logAdminSkipped, logLineError } from '@/lib/logger';
import { isValidSignature, replyMessage, replyWithPayload, pushMessage, getProfile } from '@/lib/line';
import { detectIntent, buildReply, buildAdminNotification } from '@/lib/line-reply';
import type { Intent } from '@/types/intent';
import type { IntentResult } from '@/types/line';

export const runtime = 'nodejs';

const NOTIFY_INTENTS: Intent[] = ['bookingTour', 'tourInquiry'];

export async function POST(request: NextRequest) {
  const reqId = newCorrelationId();
  const rawBody = await request.text();
  const signature = request.headers.get('x-line-signature');

  if (!isValidSignature(rawBody, signature)) {
    logger.warn(`[${reqId}] Invalid LINE signature`);
    return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 });
  }

  let body: { events?: unknown[] } | null = null;
  try {
    body = JSON.parse(rawBody);
  } catch (err) {
    logger.error(`[${reqId}] Failed to parse webhook body`, err);
    return NextResponse.json({ success: false, error: 'Bad request' }, { status: 400 });
  }

  const events = body?.events ?? [];
  logger.info(`[${reqId}] Webhook received`, { events: events.length });

  for (const rawEvent of events) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event = rawEvent as any;
    try {
      await handleEvent(event, reqId);
    } catch (err) {
      logger.error(`[${reqId}] Failed to process event`, err);
    }
  }

  return new Response('ok', { status: 200 });
}

async function handleEvent(
  event: {
    type: string;
    replyToken?: string;
    source?: { userId?: string; type?: string };
    message?: { type?: string; text?: string };
  },
  reqId: string,
) {
  switch (event.type) {
    case 'message': {
      if (event.message?.type !== 'text' || !event.message.text) return;

      const userId = event.source?.userId;
      const text = event.message.text;

      const result = detectIntent(text);
      const reply = buildReply(result, lineConfig.defaultLocale);

      logger.info(`[${reqId}] Intent resolved`, {
        intent: result.intent,
        hasFlex: Boolean(reply.flex),
      });

      if (event.replyToken) {
        await replyWithPayload(event.replyToken, reply);
      }

      await notifyAdmin(reqId, result, text, userId);
      return;
    }

    case 'follow': {
      if (event.replyToken) {
        await replyMessage(event.replyToken, [
          { type: 'text', text: lineConfig.welcomeMessage },
        ]);
      }
      logger.info(`[${reqId}] New follower`, { userId: event.source?.userId });
      return;
    }

    case 'unfollow':
      logger.info('User unfollowed', { userId: event.source?.userId });
      return;

    case 'postback':
      logger.info('Postback received', { data: undefined });
      return;

    default:
      return;
  }
}

async function notifyAdmin(
  reqId: string,
  result: IntentResult,
  text: string,
  userId?: string,
): Promise<void> {
  if (!NOTIFY_INTENTS.includes(result.intent)) return;

  if (
    !lineConfig.adminNotificationEnabled ||
    !env.adminUserId ||
    !userId ||
    userId === env.adminUserId
  ) {
    logAdminSkipped(reqId, {
      intent: result.intent,
      user: userId,
      reason: !lineConfig.adminNotificationEnabled
        ? 'admin_disabled'
        : !env.adminUserId
          ? 'missing_admin_user_id'
          : !userId
            ? 'missing_user_id'
            : 'admin_user_self',
    });
    return;
  }

  try {
    let displayName = 'ลูกค้า';
    try {
      const profile = await getProfile(userId);
      displayName = profile.displayName || displayName;
    } catch {
      // Profile fetch is best-effort; never block the notification.
    }

    const messageText = buildAdminNotification({
      intent: result.intent as 'bookingTour' | 'tourInquiry',
      displayName,
      userId,
      text,
      tourId: result.keyword,
    });

    await pushMessage(env.adminUserId, [{ type: 'text', text: messageText }]);
    logAdminPushed(reqId, { intent: result.intent, tour: result.keyword, user: userId });
  } catch (err) {
    logLineError(`[${reqId}] Admin notification failed`, err);
  }
}
