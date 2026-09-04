import type { Intent } from './intent';

export interface IntentResult {
  intent: Intent;
  keyword?: string;
  maxPrice?: number;
  days?: number;        // ← เพิ่มบรรทัดนี้
}

export interface ReplyPayload {
  text: string;
  quickReplyItems?: string[];
}
