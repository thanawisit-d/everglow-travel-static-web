import { NextResponse } from 'next/server';

import { broadcastMessage, type LineMessage } from '@/lib/line';
import { buildBroadcastPayload, type BroadcastType } from '@/lib/line-broadcast';
import { logBroadcastFailed, logBroadcastPreview, logBroadcastSent } from '@/lib/logger';
import type { ReplyPayload } from '@/types/line';

export const runtime = 'nodejs';

// Production Checklist
// [ ] BROADCAST_ENABLED=true
// [ ] CHANNEL_ACCESS_TOKEN exists
// [ ] Preview passed
// [ ] Monthly payload validated
// [ ] Promotion payload validated

const BROADCAST_ENABLED = process.env.BROADCAST_ENABLED === 'true';
const VALID_TYPES: BroadcastType[] = ['monthly', 'promotion'];
const MAX_MESSAGES = 5;

function payloadToMessages(payload: ReplyPayload): LineMessage[] {
  const messages: LineMessage[] = [];

  if (payload.flex?.contents) {
    messages.push(payload.flex as unknown as LineMessage);
  }

  if (payload.text) {
    messages.push({ type: 'text', text: payload.text });
  }

  return messages;
}

function bubbleCount(flex: LineMessage | undefined): number {
  const contents = (
    flex as { contents?: { type?: string; contents?: unknown[] } }
  )?.contents;
  if (!contents) return 0;
  if (contents.type === 'carousel') return contents.contents?.length ?? 0;
  return 1; // single bubble (flex message with a bubble as contents)
}

function validatePayload(payload: ReplyPayload, messages: LineMessage[]): boolean {
  if (!payload.text) return false; // text required
  if (!payload.flex?.contents) return false; // flex required
  if (messages.length === 0 || messages.length > MAX_MESSAGES) return false; // ≤5 messages
  const bubbles = bubbleCount(messages[0]);
  if (bubbles < 1 || bubbles > 10) return false; // carousel 1-10 bubbles
  return true;
}

export async function POST(request: Request) {
  const preview = new URL(request.url).searchParams.get('preview') === 'true';

  let body: { type?: unknown } | null = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'invalid_body' }, { status: 400 });
  }

  const type = body?.type;
  if (typeof type !== 'string' || !VALID_TYPES.includes(type as BroadcastType)) {
    return NextResponse.json(
      { success: false, error: 'invalid_broadcast_type' },
      { status: 400 },
    );
  }

  const payload = buildBroadcastPayload(type as BroadcastType);
  const messages = payloadToMessages(payload);

  if (!validatePayload(payload, messages)) {
    return NextResponse.json(
      { success: false, error: 'invalid_broadcast_payload' },
      { status: 400 },
    );
  }

  if (preview) {
    logBroadcastPreview(type, messages.length);
    return NextResponse.json({
      success: true,
      preview: true,
      type,
      messageCount: messages.length,
      messages,
    });
  }

  if (!BROADCAST_ENABLED) {
    logBroadcastFailed(type as string, 'broadcast_disabled');
    return NextResponse.json(
      { success: false, error: 'broadcast_disabled' },
      { status: 403 },
    );
  }

  try {
    await broadcastMessage(messages);
    logBroadcastSent(type, messages.length);
    return NextResponse.json({ success: true, type });
  } catch (err) {
    logBroadcastFailed(type, err instanceof Error ? err.message : 'broadcast_failed');
    return NextResponse.json(
      { success: false, error: 'broadcast_failed' },
      { status: 500 },
    );
  }
}