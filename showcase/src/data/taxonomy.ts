/**
 * Taxonomy — the single source of truth for categories and the tech-stack
 * dictionary behind /stack/ and the /projects/ filters.
 * Spec: showcase/docs/DESIGN-V2.md §3.3, §4.6
 */

export const SITE_URL = 'https://wychmod.github.io';
export const REPO_URL = 'https://github.com/wychmod/archiving-project';

export type CategoryKey = 'ai-llm' | 'fullstack' | 'enterprise' | 'tools';
export type Locale = 'zh' | 'en';

export interface CategoryMeta {
  key: CategoryKey;
  /** CSS custom property holding the category colour. */
  colorVar: string;
  /** lucide icon name, resolved by the Icon component. */
  icon: string;
  zh: { label: string; desc: string };
  en: { label: string; desc: string };
}

/**
 * Category colours are semantic and never move between categories
 * (DESIGN-V2 §6.1). Order here is the display order everywhere.
 */
export const CATEGORIES: CategoryMeta[] = [
  {
    key: 'ai-llm',
    colorVar: '--cat-ai',
    icon: 'sparkles',
    zh: { label: 'AI / LLM 应用', desc: '大模型应用、AI 网关与智能交互界面' },
    en: { label: 'AI / LLM', desc: 'LLM applications, AI gateways and intelligent UIs' },
  },
  {
    key: 'fullstack',
    colorVar: '--cat-fullstack',
    icon: 'layers',
    zh: { label: '全栈练手', desc: '前后端贯通的基础练习与技术入门' },
    en: { label: 'Full-stack Practice', desc: 'End-to-end practice projects and first steps' },
  },
  {
    key: 'enterprise',
    colorVar: '--cat-enterprise',
    icon: 'building-2',
    zh: { label: '企业级 / 中台架构', desc: '微服务、分布式与领域驱动设计实践' },
    en: { label: 'Enterprise Architecture', desc: 'Microservices, distribution and DDD in practice' },
  },
  {
    key: 'tools',
    colorVar: '--cat-tools',
    icon: 'wrench',
    zh: { label: '工具 / 垂直领域系统', desc: '桌面工具、运维桥接与行业解决方案' },
    en: { label: 'Tools & Verticals', desc: 'Desktop tools, ops bridges and domain systems' },
  },
];

export const CATEGORY_MAP: Record<CategoryKey, CategoryMeta> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c])
) as Record<CategoryKey, CategoryMeta>;

/* ---------------------------------------------------------------------------
 * Tech-stack dictionary
 * Keys are the canonical, locale-independent identifiers stored in each
 * project's `stack` array. Labels are display-only.
 * ------------------------------------------------------------------------- */

export interface StackMeta {
  key: string;
  label: string;
  /** Grouping used by /stack/. */
  group: 'backend' | 'frontend' | 'architecture';
  /** Optional brand colour for the leading swatch on /stack/. */
  color?: string;
}

export const STACKS: StackMeta[] = [
  // ---- backend languages & runtimes ----
  { key: 'python', label: 'Python', group: 'backend', color: '#3776AB' },
  { key: 'java', label: 'Java', group: 'backend', color: '#E76F00' },
  { key: 'go', label: 'Go', group: 'backend', color: '#00ADD8' },
  { key: 'nodejs', label: 'Node.js', group: 'backend', color: '#5FA04E' },
  { key: 'typescript', label: 'TypeScript', group: 'backend', color: '#3178C6' },

  // ---- frameworks & libraries ----
  { key: 'spring-boot', label: 'Spring Boot', group: 'backend' },
  { key: 'spring-boot-starter', label: 'Spring Boot Starter', group: 'backend' },
  { key: 'spring-cloud-alibaba', label: 'Spring Cloud Alibaba', group: 'backend' },
  { key: 'django', label: 'Django', group: 'backend' },
  { key: 'drf', label: 'Django REST Framework', group: 'backend' },
  { key: 'flask', label: 'Flask', group: 'backend' },
  { key: 'fastapi', label: 'FastAPI', group: 'backend' },
  { key: 'mybatis', label: 'MyBatis', group: 'backend' },
  { key: 'sqlalchemy', label: 'SQLAlchemy', group: 'backend' },
  { key: 'jinja2', label: 'Jinja2', group: 'backend' },
  { key: 'dubbo', label: 'Dubbo', group: 'backend' },

  { key: 'react', label: 'React', group: 'frontend', color: '#61DAFB' },
  { key: 'vue3', label: 'Vue 3', group: 'frontend', color: '#41B883' },
  { key: 'nextjs', label: 'Next.js', group: 'frontend' },
  { key: 'jquery', label: 'jQuery', group: 'frontend' },
  { key: 'mobx', label: 'MobX', group: 'frontend' },
  { key: 'bootstrap', label: 'Bootstrap', group: 'frontend', color: '#7952B3' },
  { key: 'webpack', label: 'Webpack', group: 'frontend' },
  { key: 'electron', label: 'Electron', group: 'frontend' },
  { key: 'electron-builder', label: 'electron-builder', group: 'frontend' },
  { key: 'tauri', label: 'Tauri', group: 'frontend' },
  { key: 'wails', label: 'Wails', group: 'frontend' },
  { key: 'pwa', label: 'PWA', group: 'frontend' },
  { key: 'mobile-h5', label: '移动端 H5', group: 'frontend' },

  // ---- data & infrastructure ----
  { key: 'sqlite', label: 'SQLite', group: 'architecture' },
  { key: 'postgresql', label: 'PostgreSQL', group: 'architecture' },
  { key: 'redis', label: 'Redis', group: 'architecture', color: '#DC382D' },
  { key: 'nacos', label: 'Nacos', group: 'architecture' },
  { key: 'websocket', label: 'WebSocket', group: 'architecture' },
  { key: 'webhook', label: 'Webhook', group: 'architecture' },
  { key: 'lark-openapi', label: 'Lark OpenAPI', group: 'architecture' },

  // ---- architecture & patterns ----
  { key: 'ddd', label: 'DDD', group: 'architecture' },
  { key: 'database-sharding', label: 'Database Sharding', group: 'architecture' },
  { key: 'sharding-jdbc', label: 'Sharding-JDBC', group: 'architecture' },
  { key: 'aop', label: 'AOP', group: 'architecture' },
  { key: 'microservices', label: 'Microservices', group: 'architecture' },
  { key: 'ai-gateway', label: 'AI Gateway', group: 'architecture' },
  { key: 'desktop-app', label: 'Desktop App', group: 'architecture' },
  { key: 'healthcare-it', label: 'Healthcare IT', group: 'architecture' },
];

export const STACK_MAP: Record<string, StackMeta> = Object.fromEntries(
  STACKS.map((s) => [s.key, s])
);

export const STACK_GROUPS: { key: StackMeta['group']; zh: string; en: string }[] = [
  { key: 'backend', zh: '后端语言与框架', en: 'Backend languages & frameworks' },
  { key: 'frontend', zh: '前端栈与桌面运行时', en: 'Frontend & desktop runtimes' },
  { key: 'architecture', zh: '数据、基础设施与架构风格', en: 'Data, infrastructure & architecture' },
];

/** Resolve a stack key to its label, falling back to the raw key. */
export function stackLabel(key: string, locale: Locale): string {
  const meta = STACK_MAP[key];
  if (!meta) return key;
  // Localised labels for the few entries whose Chinese form is idiomatic.
  if (locale === 'zh') {
    const zhOverrides: Record<string, string> = {
      'mobile-h5': '移动端 H5',
      'desktop-app': '桌面应用',
      'database-sharding': '分库分表',
      microservices: '微服务',
      'ai-gateway': 'AI 网关',
      'healthcare-it': '医疗信息化',
      webhook: 'Webhook',
    };
    return zhOverrides[key] ?? meta.label;
  }
  const enOverrides: Record<string, string> = {
    'mobile-h5': 'Mobile H5',
    'desktop-app': 'Desktop App',
    'database-sharding': 'Database Sharding',
    microservices: 'Microservices',
    'ai-gateway': 'AI Gateway',
    'healthcare-it': 'Healthcare IT',
  };
  return enOverrides[key] ?? meta.label;
}

/* ---------------------------------------------------------------------------
 * Project-level provenance. Derived from the repository README and each
 * ARCHIVE.md — used by the detail page's "archive info" card.
 * ------------------------------------------------------------------------- */

/** Projects whose original credentials were scrubbed on import. */
export const SCRUBBED_REFS = new Set(['huawei-alarm', 'ascvd', 'cloud-short-link']);

/** Projects whose upstream repository has been emptied; this archive is the only copy. */
export const SOURCE_CLEARED_REFS = new Set(['TokenBridge', 'db-router-springboot-starter']);

export function archivedProjectUrl(ref: string): string {
  return `${REPO_URL}/tree/main/archived-projects/${ref}`;
}

export function archiveDocUrl(ref: string): string {
  return `${REPO_URL}/blob/main/archived-projects/${ref}/ARCHIVE.md`;
}
