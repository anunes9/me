/** Join a base path and a path with exactly one slash between them. */
export function joinBase(base: string, path: string): string {
  const b = base.replace(/\/+$/, '');
  const p = path.replace(/^\/+/, '');
  return `${b}/${p}`;
}

/** Resolve a site-relative path against Astro's configured base. */
export function withBase(path: string): string {
  return joinBase(import.meta.env.BASE_URL, path);
}
