import { messagingApi, validateSignature } from '@line/bot-sdk';

import { env } from '@/lib/env';

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

export async function replyMessage(
  replyToken: string,
  messages: LineMessage[],
): Promise<void> {
  await getClient().replyMessage({ replyToken, messages: messages as never });
}

export async function pushMessage(userId: string, messages: LineMessage[]): Promise<void> {
  await getClient().pushMessage({ to: userId, messages: messages as never });
}

export async function getProfile(userId: string) {
  return getClient().getProfile(userId);
}
