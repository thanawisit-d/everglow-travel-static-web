import type { Intent } from './intent';

export interface IntentResult {
  intent: Intent;
  keyword?: string;
  maxPrice?: number;
}

export interface ReplyPayload {
  text: string;
  quickReplyItems?: string[];
}
