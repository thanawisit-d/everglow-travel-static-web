function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  accessToken: required('LINE_CHANNEL_ACCESS_TOKEN'),
  channelSecret: required('LINE_CHANNEL_SECRET'),
  adminUserId: process.env.LINE_ADMIN_USER_ID || '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://everglow-travel-static-web.vercel.app',
};
