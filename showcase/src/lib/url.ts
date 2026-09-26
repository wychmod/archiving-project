import type { Locale } from '@/data/i18n';

/**
 * The site is served from a repository sub-path on GitHub Pages, so every
 * internal link has to be prefixed with the configured base. Astro leaves this
 * to the author, hence this single helper — nothing in the app hardcodes a
 * base-prefixed string.
 */
const rawBase = import.meta.env.BASE_URL || '/';
export const BASE = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

/** Prefix an absolute app path with the deployment base. */
export function withBase(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}`;
}

/** Absolute URL, for canonical tags, sitemap and JSON-LD. */
export function absoluteUrl(path: string, site: URL | string): string {
  const origin = typeof site === 'string' ? site : site.origin;
  return new URL(withBase(path), origin).href;
}

/**
 * Home path for a locale. Named to match its siblings below
 * (`projectsPath`, `timelinePath`, …) — this module is the single source of
 * truth for every locale-aware path in the app.
 */
export function homePath(locale: Locale): string {
  return locale === 'en' ? '/en/' : '/';
}

/** Path to the project index in a locale. */
export function projectsPath(locale: Locale): string {
  return locale === 'en' ? '/en/projects/' : '/projects/';
}

/** Path to a single project's detail page. */
export function projectPath(locale: Locale, ref: string): string {
  return locale === 'en' ? `/en/projects/${ref}/` : `/projects/${ref}/`;
}

/** Path to the timeline. */
export function timelinePath(locale: Locale): string {
  return locale === 'en' ? '/en/timeline/' : '/timeline/';
}

/** Path to the technology overview. */
export function stackPath(locale: Locale): string {
  return locale === 'en' ? '/en/stack/' : '/stack/';
}

/** Path to the about page. */
export function aboutPath(locale: Locale): string {
  return locale === 'en' ? '/en/about/' : '/about/';
}

/**
 * Map the current pathname onto its counterpart in the other locale.
 * Used by the language switcher so switching keeps the reader on the same
 * page rather than dumping them on the home page.
 */
export function counterpartPath(pathname: string, to: Locale): string {
  let p = pathname;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || '/';
  if (!p.startsWith('/')) p = `/${p}`;

  if (to === 'en') {
    if (p === '/' || p === '') return '/en/';
    return p.startsWith('/en/') ? p : `/en${p}`;
  }
  if (p === '/en/' || p === '/en') return '/';
  return p.startsWith('/en/') ? p.slice(3) || '/' : p;
}

/** Normalise the human-facing label for the language control. */
export function localeLabel(locale: Locale): string {
  return locale === 'en' ? 'EN' : '中文';
}
