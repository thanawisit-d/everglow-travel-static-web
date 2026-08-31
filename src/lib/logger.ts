const isProd = process.env.NODE_ENV === 'production';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stringify(meta?: any): string {
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
