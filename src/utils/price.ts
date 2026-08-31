export function toNumber(price: string | number): number {
  if (typeof price === 'number') return price;
  return Number(price.replace(/[^\d]/g, '')) || 0;
}

export function formatPrice(price: string | number): string {
  return toNumber(price).toLocaleString();
}
