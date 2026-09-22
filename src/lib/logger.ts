const isProd = process.env.NODE_ENV === 'production';

function stringify(meta?: unknown): string {
  if (meta === undefined || meta === null) return '';
  try {
    return ' ' + JSON.stringify(meta);
  } catch {
    return '';
  }
}

export const logger = {
  info: (msg: string, meta?: unknown) => {
    if (!isProd) console.log(`[INFO] ${msg}${stringify(meta)}`);
  },
  warn: (msg: string, meta?: unknown) => {
    console.warn(`[WARN] ${msg}${stringify(meta)}`);
  },
  error: (msg: string, err?: unknown) => {
    if (err instanceof Error) {
      console.error(`[ERROR] ${msg}: ${err.message}`);
    } else {
      console.error(`[ERROR] ${msg}${stringify(err)}`);
    }
  },
};

// Log any LINE API failure with full context for production debugging.
export function logLineError(context: string, error: unknown): void {
  logger.error(context, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
}

// One ID per webhook request, so we can trace a single request through every log line.
export function newCorrelationId(): string {
  return `req-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

interface AdminNotifyMeta {
  intent: string;
  tour?: string;
  user?: string;
  reason?: string;
}

export function logAdminPushed(reqId: string, meta: AdminNotifyMeta): void {
  logger.info(`[${reqId}] Admin notification pushed`, meta);
}

export function logAdminSkipped(reqId: string, meta: AdminNotifyMeta): void {
  logger.warn(`[${reqId}] Admin notification skipped`, meta);
}

// Broadcast operational logs (always visible, even in production).
export function logBroadcastPreview(type: string, messages: number): void {
  console.log(`[BROADCAST PREVIEW] type=${type} messages=${messages}`);
}

export function logBroadcastSent(type: string, messages: number): void {
  console.log(`[BROADCAST SENT] type=${type} messages=${messages}`);
}

export function logBroadcastFailed(type: string, reason: string): void {
  console.error(`[BROADCAST FAILED] type=${type} reason=${reason}`);
}
