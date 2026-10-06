const PER_PAGE = 12;

export function parsePrice(p) {
  return parseInt((p || '').replace(/,/g, ''), 10) || 0;
}

export function paginate(items, page, perPage = PER_PAGE) {
  const totalPages = Math.max(Math.ceil(items.length / perPage), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
  };
}
