import { NextResponse } from 'next/server';

import { broadcastMessage, type LineMessage } from '@/lib/line';
import { buildBroadcastPayload, type BroadcastType } from '@/lib/line-broadcast';
import type { ReplyPayload } from '@/types/line';

export const runtime = 'nodejs';

const BROADCAST_ENABLED = process.env.BROADCAST_ENABLED === 'true';
const VALID_TYPES: BroadcastType[] = ['monthly', 'promotion'];

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

export async function POST(request: Request) {
  if (!BROADCAST_ENABLED) {
    return NextResponse.json(
      { success: false, error: 'broadcast_disabled' },
      { status: 403 },
    );
  }

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

  try {
    const payload = buildBroadcastPayload(type as BroadcastType);
    await broadcastMessage(payloadToMessages(payload));
    return NextResponse.json({ success: true, type });
  } catch (err) {
    console.error('Broadcast failed:', err);
    return NextResponse.json(
      { success: false, error: 'broadcast_failed' },
      { status: 500 },
    );
  }
}