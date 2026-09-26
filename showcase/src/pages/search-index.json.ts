/**
 * Build-time search index.
 *
 * Emitted as a static JSON file and fetched lazily by the search dialog on
 * first open — the dialog itself ships no data, so the index costs nothing
 * until a reader actually searches. Both locales go into one index and are
 * distinguished by `url`, so a Chinese term and an English term can be ranked
 * in the same query.
 *
 * Spec: DESIGN-V2 §4.4
 */
import type { APIRoute } from 'astro';
import { CATEGORIES, STACK_MAP, stackLabel } from '@/data/taxonomy';
import { getProjects } from '@/lib/content';
import { projectPath } from '@/lib/url';
import type { Locale } from '@/data/i18n';

export const prerender = true;

interface SearchDoc {
  name: string;
  subtitle: string;
  description: string;
  category: string;
  categoryLabel: string;
  /** CSS value — a token reference so the swatch follows the active theme. */
  color: string;
  stack: string[];
  url: string;
}

interface CategoryDoc {
  key: string;
  label: string;
  desc: string;
  url: string;
  color: string;
}

export const GET: APIRoute = async () => {
  const locales: Locale[] = ['zh', 'en'];

  const projects: SearchDoc[] = [];

  for (const locale of locales) {
    for (const p of await getProjects(locale)) {
      const cat = CATEGORIES.find((c) => c.key === p.category)!;
      const labels = p.stack.map((key) => stackLabel(key, locale));

      projects.push({
        name: p.name,
        subtitle: p.subtitle,
        // Fold the stack labels into the searchable text: a reader looking for
        // "Dubbo" should find the lottery system even though the word only
        // appears in its stack, not its prose.
        description: `${p.description} ${labels.join(' ')}`,
        category: p.category,
        categoryLabel: cat[locale].label,
        color: `var(${cat.colorVar})`,
        stack: labels,
        // Base-relative on purpose: the dialog prefixes the deployment base.
        url: projectPath(locale, p.ref),
      });
    }
  }

  const categories: CategoryDoc[] = CATEGORIES.map((c) => ({
    key: c.key,
    label: c.zh.label,
    desc: c.zh.desc,
    url: `/projects/?category=${c.key}`,
    color: `var(${c.colorVar})`,
  }));

  // A second, English-labelled copy of each category so English queries match.
  for (const c of CATEGORIES) {
    categories.push({
      key: `${c.key}-en`,
      label: c.en.label,
      desc: c.en.desc,
      url: `/en/projects/?category=${c.key}`,
      color: `var(${c.colorVar})`,
    });
  }

  // Any stack key referenced by a project but missing from the dictionary
  // would silently drop out of the overview; surface it at build time.
  const unknown = new Set<string>();
  for (const locale of locales) {
    for (const p of await getProjects(locale)) {
      for (const key of p.stack) if (!STACK_MAP[key]) unknown.add(key);
    }
  }
  if (unknown.size > 0) {
    console.warn(`[search-index] stack keys missing from dictionary: ${[...unknown].join(', ')}`);
  }

  return new Response(JSON.stringify({ projects, categories }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
