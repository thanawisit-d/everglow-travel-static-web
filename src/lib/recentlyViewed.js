const STORAGE_KEY = 'everglow:recent';
const MAX_ITEMS = 8;

export function trackRecentlyViewed(tour) {
  if (!tour?.id || typeof window === 'undefined') return;
  try {
    const list = readRecentlyViewed();
    const entry = {
      id: tour.id,
      type: tour.type,
      desc: tour.desc || tour.id,
      desc_en: tour.desc_en || tour.desc || tour.id,
      image: tour.image,
      price: tour.price,
      ts: Date.now(),
    };
    const next = [entry, ...list.filter(x => x.id !== tour.id)].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode / quota) - silently skip
  }
}

export function readRecentlyViewed() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function clearRecentlyViewed() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
