const PER_PAGE = 12;

export function parsePrice(p) {
  return parseInt((p || '').replace(/,/g, ''), 10) || 0;
}

export function paginate(items, page) {
  const totalPages = Math.ceil(items.length / PER_PAGE) || 1;
  return {
    items: items.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    totalPages,
  };
}
