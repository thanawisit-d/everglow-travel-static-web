import type { Intent } from './intent';
import type { SearchFilters } from './tour';
import type { messagingApi } from '@line/bot-sdk';

export interface IntentResult {
  intent: Intent;
  keyword?: string;
  maxPrice?: number;
  days?: number;
  city?: string;
  filters?: SearchFilters;
}

export interface ReplyPayload {
  text?: string;
  flex?: messagingApi.FlexMessage;
  quickReplyItems?: string[];
}
