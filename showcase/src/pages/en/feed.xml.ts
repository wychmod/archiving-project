/**
 * RSS feed (en) — the English counterpart of `/feed.xml`.
 *
 * Spec: DESIGN-V2 §8.4
 */
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getProjects } from '@/lib/content';
import { CATEGORY_MAP, REPO_URL, SITE_URL } from '@/data/taxonomy';
import { absoluteUrl, projectPath } from '@/lib/url';

export const prerender = true;

export const GET: APIRoute = async (context) => {
  const projects = await getProjects('en');

  return rss({
    title: 'Archiving Project',
    description:
      'A read-only archive of retired personal projects: 12 codebases across AI / LLM, full-stack, enterprise architecture and tools. Every entry answers what it is, why it is kept, and whether it still runs.',
    // The channel link is the site root, which must include the deploy base —
    // `context.site` only carries the origin.
    site: absoluteUrl('/en/', context.site ?? SITE_URL),
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    // `customData` is injected verbatim into <channel>; there is no separate
    // footer option — see the note in the zh feed.
    customData:
      `<language>en</language>` +
      `<copyright>${REPO_URL}</copyright>` +
      `<atom:link href="${absoluteUrl('/en/feed.xml', context.site ?? SITE_URL)}" rel="self" type="application/rss+xml"/>`,
    items: projects.map((p) => ({
      title: `${p.name} · ${p.subtitle}`,
      description: p.description,
      // Feed readers require absolute URLs, and the base has to be included.
      link: absoluteUrl(projectPath('en', p.ref), context.site ?? SITE_URL),
      pubDate: p.archivedAt,
      categories: [CATEGORY_MAP[p.category].en.label, ...p.stack],
    })),
  });
};
