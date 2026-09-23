import { detectIntent, buildReply } from '@/lib/line-reply';

const cases = [
  'abcxyz',
  'ญี่ปุ่น พฤศจิกายน',
  'japan',
  'japan october',
  'japan november',
  'korea',
  ' أيضһjsdj',
  'ต.ค. เกาหลี',
];

for (const input of cases) {
  const r = detectIntent(input);
  const reply = buildReply(r, 'th');
  const text = (reply.text || '').split('\n')[0];
  console.log(`${input.padEnd(22)} => ${r.intent.padEnd(17)} ${r.keyword ? `kw="${r.keyword}" ` : ''}${JSON.stringify(text)}`);
}