import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Project collection — one entry per archived project per locale.
 * Spec: showcase/docs/DESIGN-V2.md §3.3
 *
 * The schema is the contract: an unknown category, a malformed date or a
 * missing locale counterpart fails the build instead of silently shipping.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ref: z.string(),
    lang: z.enum(['zh', 'en']),
    title: z.string(),
    name: z.string(),
    subtitle: z.string().default(''),
    description: z.string(),

    category: z.enum(['ai-llm', 'fullstack', 'enterprise', 'tools']),
    stack: z.array(z.string()).min(1),

    status: z.enum(['archived', 'runnable', 'wip']),
    scrubbed: z.boolean().default(false),
    repoCleared: z.boolean().default(false),

    archivedAt: z.coerce.date(),
    commitCount: z.number().int().positive().optional(),
  }),
});

export const collections = { projects };
