export function buildCountryContinentMap(countryGroups) {
  const map = {};
  countryGroups.forEach((g) => {
    g.items.forEach((c) => {
      map[c.name] = g.label;
    });
  });
  return map;
}

export function getContinentByCountry(country, countryGroups) {
  const group = countryGroups.find((g) => g.items.some((c) => c.name === country));
  return group ? group.label : null;
}