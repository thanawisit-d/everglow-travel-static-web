// Static approximate FX rates (1 THB -> foreign). Update periodically.
// ~36 THB/USD, ~38.5 THB/EUR (Aug 2026).
const STATIC_RATES = {
  USD: 0.028,
  EUR: 0.026,
};

export function formatPrice(price) {
  if (price == null) return '';
  return Number(String(price).replace(/,/g, "")).toLocaleString();
}

export function formatPriceApprox(price, locale) {
  if (locale !== 'en' || price == null) return '';
  const thb = Number(String(price).replace(/,/g, ""));
  if (!thb) return '';
  const usd = Math.round(thb * STATIC_RATES.USD);
  const eur = Math.round(thb * STATIC_RATES.EUR);
  return `≈ $${usd.toLocaleString()} / €${eur.toLocaleString()}`;
}
