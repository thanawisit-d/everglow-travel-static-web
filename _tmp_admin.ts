import { detectIntent, buildAdminNotification } from '@/lib/line-reply';

const NOTIFY_INTENTS = ['bookingTour', 'tourInquiry', 'contactAdminRequest'];

const cases: Array<{ input: string; expected: string }> = [
  { input: 'วิธีจองทัวร์', expected: 'bookingGuide' },
  { input: 'จองทัวร์', expected: 'bookingTour' },
  { input: 'สอบถามทัวร์ BT-KIX-NRT', expected: 'tourInquiry' },
  { input: 'ติดต่อแอดมิน', expected: 'contactAdminRequest' },
  { input: 'สวัสดี', expected: 'greeting' },
  { input: 'โปรโมชั่นล่าสุด', expected: 'promotionSearch' },
];

for (const c of cases) {
  const r = detectIntent(c.input);
  const notify = NOTIFY_INTENTS.includes(r.intent);
  const ok = r.intent === c.expected;
  console.log(`${ok ? 'PASS' : 'FAIL'} "${c.input}" => intent=${r.intent} notify=${notify ? 'YES' : 'no'} (expect ${c.expected})`);
}

console.log('\n=== Notification message shape (3 pushable intents) ===');
for (const intent of ['bookingTour', 'tourInquiry', 'contactAdminRequest'] as const) {
  const msg = buildAdminNotification({
    intent,
    displayName: 'สมชาย ใจดี',
    text: intent === 'tourInquiry' ? 'สอบถามทัวร์ BT-KIX-NRT' : intent === 'bookingTour' ? 'จองทัวร์' : 'ติดต่อแอดมิน',
    tourId: intent === 'tourInquiry' ? 'BT-KIX-NRT' : undefined,
    messageTime: new Date('2026-09-23T14:30:00+07:00'),
  });
  console.log(`\n--- ${intent} ---`);
  console.log(msg.replace(/\n/g, '\n  '));
  console.log(`  [contains userId U/]: ${/U[0-9a-fA-F]{10,}/.test(msg)}`);
  console.log(`  [contains replyToken/accessToken]: ${/replyToken|accessToken|access_token|CHANNEL_ACCESS/i.test(msg)}`);
}

console.log('\n=== PII/secret scan in full code path ===');
console.log('NOTIFY_INTENTS in route:', NOTIFY_INTENTS.join('|'));
console.log('adminNotificationEnabled:', process.env.ADMIN_NOTIFICATION_ENABLED !== 'false');