import type { Intent } from './intent';

export interface IntentResult {
  intent: Intent;
  keyword?: string;
}

export interface ReplyPayload {
  text: string;
  quickReplyItems?: string[];
}
