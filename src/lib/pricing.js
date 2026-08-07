export function formatPrice(price) {
  if (price == null) return '';
  return Number(String(price).replace(/,/g, "")).toLocaleString();
}
