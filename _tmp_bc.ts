import { buildBroadcastPayload } from '@/lib/line-broadcast';
import { getTours, getPopularTours } from '@/lib/tours-data';
import { toNumber } from '@/utils/price';

for (const type of ['monthly', 'promotion'] as const) {
  const payload = buildBroadcastPayload(type, 'th');
  const flex = payload.flex as any;
  let bubbles = 0;
  if (flex?.contents?.type === 'carousel') bubbles = flex.contents.contents?.length ?? 0;
  else if (flex?.type === 'bubble') bubbles = 1;
  const bubbleCaps = (flex?.contents?.contents ?? []).map((b: any) => b?.body?.contents?.length ? 'has-body' : 'no-body');

  console.log(`\n=== BROADCAST [${type}] ===`);
  console.log(`text: ${JSON.stringify(payload.text)}`);
  console.log(`flex altText: ${JSON.stringify(payload.flex?.altText)}`);
  console.log(`bubbles: ${bubbles} (limit 10)`);
  console.log(`all bubbles have body: ${bubbleCaps.every((b: string) => b === 'has-body')} (${bubbles}x)`);
}

const promo = [...getTours('th')].sort((a, b) => toNumber(a.price) - toNumber(b.price));
console.log(`\n=== promo sort check ===`);
console.log(`promo source: ${promo.length} tours, first 3 prices: ${promo.slice(0, 3).map((t) => toNumber(t.price))}`);
const popular = getPopularTours('th');
console.log(`popular: ${popular.length} tours (expect 5)`);