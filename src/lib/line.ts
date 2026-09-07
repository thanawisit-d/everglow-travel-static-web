import { messagingApi, validateSignature } from '@line/bot-sdk';

import { env } from '@/lib/env';
import { buildQuickReply } from '@/lib/line-quick-reply';
import type { ReplyPayload } from '@/types/line';

let client: messagingApi.MessagingApiClient | null = null;

export function getClient(): messagingApi.MessagingApiClient {
  if (!client) {
    client = new messagingApi.MessagingApiClient({
      channelAccessToken: env.accessToken,
    });
  }
  return client;
}

export function isValidSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  return validateSignature(rawBody, env.channelSecret, signature);
}

// JSON-serializable message list (works with both text and future flex messages)
export type LineMessage = Record<string, unknown>;

// Attach quick reply to every text message we send back to the user
function withQuickReply(messages: LineMessage[]): LineMessage[] {
  return messages.map((message) =>
    message.type === 'text' && !message.quickReply
      ? { ...message, quickReply: buildQuickReply() }
      : message,
  );
}

export async function replyMessage(
  replyToken: string,
  messages: LineMessage[],
): Promise<void> {
  await getClient().replyMessage({
    replyToken,
    messages: withQuickReply(messages) as never,
  });
}

// Send from a ReplyPayload. Flex first (no quick reply), then text with quick reply.
export async function replyWithPayload(
  replyToken: string,
  payload: ReplyPayload,
): Promise<void> {
  const messages: LineMessage[] = [];

  if (payload.flex) {
    messages.push(payload.flex as unknown as LineMessage);
  }

  if (payload.text) {
    messages.push({
      type: 'text',
      text: payload.text,
      quickReply: buildQuickReply(),
    });
  }

  if (messages.length === 0) return;

  await getClient().replyMessage({
    replyToken,
    messages: messages as never,
  });
}

export async function pushMessage(userId: string, messages: LineMessage[]): Promise<void> {
  await getClient().pushMessage({ to: userId, messages: withQuickReply(messages) as never });
}

export async function getProfile(userId: string) {
  return getClient().getProfile(userId);
}
