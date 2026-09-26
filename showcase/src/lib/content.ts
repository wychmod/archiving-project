import { getCollection, type CollectionEntry } from 'astro:content';
import {
  CATEGORIES,
  CATEGORY_MAP,
  STACK_MAP,
  type CategoryKey,
  type Locale,
} from '@/data/taxonomy';

export type ProjectEntry = CollectionEntry<'projects'>;

export interface ProjectRecord {
  ref: string;
  locale: Locale;
  title: string;
  name: string;
  subtitle: string;
  description: string;
  category: CategoryKey;
  stack: string[];
  status: 'archived' | 'runnable' | 'wip';
  scrubbed: boolean;
  repoCleared: boolean;
  archivedAt: Date;
  commitCount?: number;
  body: string;
}

function toRecord(entry: ProjectEntry): ProjectRecord {
  const d = entry.data;
  return {
    ref: d.ref,
    locale: d.lang as Locale,
    title: d.title,
    name: d.name,
    subtitle: d.subtitle,
    description: d.description,
    category: d.category as CategoryKey,
    stack: [...d.stack],
    status: d.status,
    scrubbed: d.scrubbed,
    repoCleared: d.repoCleared,
    archivedAt: d.archivedAt,
    commitCount: d.commitCount,
    body: entry.body ?? '',
  };
}

/** All project records for one locale, newest archive first. */
export async function getProjects(locale: Locale): Promise<ProjectRecord[]> {
  const entries = await getCollection(
    'projects',
    (entry: ProjectEntry) => entry.data.lang === locale
  );
  return entries
    .map(toRecord)
    .sort((a, b) => b.archivedAt.getTime() - a.archivedAt.getTime());
}

export async function getProject(
  locale: Locale,
  ref: string
): Promise<ProjectRecord | undefined> {
  const all = await getProjects(locale);
  return all.find((p) => p.ref === ref);
}

/** Every ref, in archive order. */
export async function getRefs(locale: Locale): Promise<string[]> {
  return (await getProjects(locale)).map((p) => p.ref);
}

/** Count of projects per category for one locale. */
export function countByCategory(projects: ProjectRecord[]) {
  const counts = new Map<CategoryKey, number>();
  for (const p of projects) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return CATEGORIES.map((c) => ({ ...c, count: counts.get(c.key) ?? 0 }));
}

/** Frequency map of stack keys across the given projects. */
export function stackFrequency(projects: ProjectRecord[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const p of projects) {
    for (const key of p.stack) {
      freq.set(key, (freq.get(key) ?? 0) + 1);
    }
  }
  return freq;
}

/** Stack keys that actually appear in the given projects, ordered by frequency. */
export function usedStacks(projects: ProjectRecord[]): string[] {
  return [...stackFrequency(projects).entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([key]) => key)
    .filter((key) => STACK_MAP[key]);
}

/** Group projects by category key, preserving CATEGORIES display order. */
export function groupByCategory(projects: ProjectRecord[]) {
  return CATEGORIES.map((cat) => ({
    category: cat,
    projects: projects.filter((p) => p.category === cat.key),
  })).filter((group) => group.projects.length > 0);
}

/** Projects sharing a category, excluding the given ref. */
export function relatedProjects(
  projects: ProjectRecord[],
  ref: string,
  limit = 3
): ProjectRecord[] {
  const current = projects.find((p) => p.ref === ref);
  if (!current) return [];
  return projects
    .filter((p) => p.ref !== ref && p.category === current.category)
    .slice(0, limit);
}

/** Category meta for a project, always defined because the schema restricts values. */
export function categoryOf(project: ProjectRecord) {
  return CATEGORY_MAP[project.category];
}

/** Group projects by archive year then month, for /timeline/. */
export function groupByPeriod(projects: ProjectRecord[]) {
  const byYear = new Map<number, Map<number, ProjectRecord[]>>();
  for (const p of projects) {
    const year = p.archivedAt.getFullYear();
    const month = p.archivedAt.getMonth() + 1;
    if (!byYear.has(year)) byYear.set(year, new Map());
    const months = byYear.get(year)!;
    if (!months.has(month)) months.set(month, []);
    months.get(month)!.push(p);
  }
  return [...byYear.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, months]) => ({
      year,
      months: [...months.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([month, items]) => ({
          month,
          projects: items.sort(
            (a, b) => b.archivedAt.getTime() - a.archivedAt.getTime()
          ),
        })),
    }));
}

/** Extract h2/h3 headings from a markdown body for the table of contents. */
export function extractHeadings(
  body: string
): { depth: 2 | 3; text: string; id: string }[] {
  const headings: { depth: 2 | 3; text: string; id: string }[] = [];
  const seen = new Map<string, number>();

  for (const line of body.split('\n')) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .trim();

    const base =
      text
        .toLowerCase()
        .replace(/[\s]+/g, '-')
        .replace(/[^\p{L}\p{N}-]/gu, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || 'section';

    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    headings.push({ depth, text, id: n === 0 ? base : `${base}-${n}` });
  }

  return headings;
}

/** Format a date for display in a given locale. */
export function formatDate(date: Date, locale: Locale): string {
  if (locale === 'en') {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  }
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${date.getUTCFullYear()}-${mm}-${dd}`;
}

/** ISO date (YYYY-MM-DD) for machine-readable output. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
