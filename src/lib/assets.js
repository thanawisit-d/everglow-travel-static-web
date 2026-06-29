export function assetPath(path) {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
}
