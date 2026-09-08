import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { env } from '@/lib/env';
import { lineConfig } from '@/lib/line-config';
import { logger, newCorrelationId } from '@/lib/logger';
import { isValidSignature, replyMessage, replyWithPayload, pushMessage } from '@/lib/line';
import { detectIntent, buildReply } from '@/lib/line-reply';

export const runtime = 'nodejs';

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

      if (
        lineConfig.adminNotificationEnabled &&
        env.adminUserId &&
        userId &&
        userId !== env.adminUserId
      ) {
        const profileName = 'customer';
        await pushMessage(env.adminUserId, [
          {
            type: 'text',
            text: `[ระบบ] 📩 มีลูกค้าใหม่${profileName ? ` (${profileName})` : ''} (${userId})\nข้อความ: ${text}`,
          },
        ]);
      }
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
