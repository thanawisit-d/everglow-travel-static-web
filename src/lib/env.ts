function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const env = {
  get accessToken(): string {
    return required('LINE_CHANNEL_ACCESS_TOKEN');
  },
  get channelSecret(): string {
    return required('LINE_CHANNEL_SECRET');
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://everglowtravel.com',
};