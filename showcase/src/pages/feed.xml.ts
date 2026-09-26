/**
 * RSS feed (zh) — kept at the legacy `/feed.xml` path so existing subscribers
 * keep working. The English feed lives at `/en/feed.xml`.
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
  const projects = await getProjects('zh');

  return rss({
    title: 'Archiving Project · 归档项目库',
    description:
      '退役个人项目的只读归档:AI / LLM、全栈、企业级架构与工具类共 12 个代码库。每一项都记录它是什么、为什么保留、是否仍可运行。',
    // The channel link is the site root, which must include the deploy base —
    // `context.site` only carries the origin.
    site: absoluteUrl('/', context.site ?? SITE_URL),
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    // `@astrojs/rss` injects `customData` verbatim into <channel>; there is no
    // separate footer option (one was removed after tsc rejected it — it had
    // been silently dropped from the output). The repository is the canonical
    // home of the archive, so point readers there.
    customData:
      `<language>zh-cn</language>` +
      `<copyright>${REPO_URL}</copyright>` +
      `<atom:link href="${absoluteUrl('/feed.xml', context.site ?? SITE_URL)}" rel="self" type="application/rss+xml"/>`,
    items: projects.map((p) => ({
      title: `${p.name} · ${p.subtitle}`,
      description: p.description,
      // Feed readers require absolute URLs, and the base has to be included.
      link: absoluteUrl(projectPath('zh', p.ref), context.site ?? SITE_URL),
      pubDate: p.archivedAt,
      categories: [CATEGORY_MAP[p.category].zh.label, ...p.stack],
    })),
  });
};
