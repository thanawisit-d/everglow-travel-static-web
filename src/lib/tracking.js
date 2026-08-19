'use client';

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

export function trackSearch(query, { locale, tourType } = {}) {
  trackEvent('search', {
    search_term: query,
    locale,
    tour_type: tourType || 'all',
  });
}

export function trackFilter(filterType, value, { locale, tourType } = {}) {
  trackEvent('filter_usage', {
    filter_type: filterType,
    filter_value: Array.isArray(value) ? value.join(',') : value,
    locale,
    tour_type: tourType || 'all',
  });
}
