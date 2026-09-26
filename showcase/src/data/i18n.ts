/**
 * UI copy dictionary. Every user-visible string lives here so that no page can
 * ship with an untranslated key (DESIGN-V2 §9 "双语完备").
 */

export type Locale = 'zh' | 'en';

export interface Strings {
  siteName: string;
  tagline: string;
  metaDescription: string;

  nav: {
    home: string;
    projects: string;
    timeline: string;
    stack: string;
    about: string;
    menu: string;
    close: string;
    search: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    language: string;
    github: string;
    skipToContent: string;
  };

  hero: {
    overline: string;
    title: string;
    tagline: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  stats: {
    projects: string;
    stacks: string;
    docs: string;
    languages: string;
    langValue: string;
  };

  home: {
    categoriesTitle: string;
    categoriesDesc: string;
    featuredTitle: string;
    featuredDesc: string;
    featuredViewAll: string;
    overviewTitle: string;
    overviewDesc: string;
    stacksTitle: string;
    stacksDesc: string;
    stacksByLanguage: string;
    stacksByFrontend: string;
    timelineTitle: string;
    timelineDesc: string;
    timelineViewAll: string;
    methodTitle: string;
    methodDesc: string;
    methodSearchable: string;
    methodSearchableDesc: string;
    methodComparable: string;
    methodComparableDesc: string;
    methodDurable: string;
    methodDurableDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaDocs: string;
    ctaWorkflow: string;
    projectCountSuffix: string;
  };

  projects: {
    title: string;
    desc: string;
    countLabel: string;
    filterCategory: string;
    filterStack: string;
    filterStatus: string;
    sortLabel: string;
    sortArchived: string;
    sortName: string;
    clearFilters: string;
    viewGrid: string;
    viewList: string;
    emptyTitle: string;
    emptyDesc: string;
    emptyAction: string;
    selected: string;
    all: string;
  };

  status: {
    archived: string;
    runnable: string;
    wip: string;
    scrubbed: string;
    repoCleared: string;
  };

  detail: {
    breadcrumbHome: string;
    breadcrumbProjects: string;
    viewSource: string;
    viewArchiveDoc: string;
    archivedOn: string;
    commits: string;
    stackTitle: string;
    tocTitle: string;
    prevProject: string;
    nextProject: string;
    relatedProjects: string;
    switchLang: string;
    copyLink: string;
    copied: string;
    printPage: string;
    sourceClearedNote: string;
    scrubbedNote: string;
  };

  timeline: {
    title: string;
    desc: string;
    span: string;
    latest: string;
    groupYear: string;
  };

  stack: {
    title: string;
    desc: string;
    projectsCount: string;
    representatives: string;
    allTags: string;
    allTagsDesc: string;
  };

  about: {
    title: string;
    quote: string;
    q1: string;
    q1Desc: string;
    q2: string;
    q2Desc: string;
    q3: string;
    q3Desc: string;
    solvesTitle: string;
    solves: { title: string; desc: string }[];
    notTitle: string;
    nots: string[];
    compositionTitle: string;
    resourcesTitle: string;
    resourceRepo: string;
    resourceAgents: string;
    resourceClaude: string;
    resourceDesign: string;
    resourceLicense: string;
    maintainerTitle: string;
    maintainerDesc: string;
  };

  footer: {
    siteTitle: string;
    projectsTitle: string;
    docsTitle: string;
    connectTitle: string;
    builtWith: string;
    license: string;
    backToTop: string;
    rss: string;
    email: string;
  };

  notFound: {
    title: string;
    desc: string;
    home: string;
    projects: string;
    search: string;
  };

  search: {
    placeholder: string;
    hint: string;
    empty: string;
    emptyHint: string;
    groupProjects: string;
    groupCategories: string;
    loading: string;
  };

  common: {
    more: string;
    all: string;
    back: string;
    of: string;
  };
}

export const STRINGS: Record<Locale, Strings> = {
  zh: {
    siteName: 'Archiving Project',
    tagline: '代码化石标本馆 · A curated archive of code',
    metaDescription:
      '归档个人历史学习项目的只读快照仓库:12 个项目,横跨 AI / 全栈 / 企业架构 / 工具与垂直领域。每一份归档都能回答:它是什么、为什么保留、现在还活着吗。',

    nav: {
      home: '首页',
      projects: '项目库',
      timeline: '时间线',
      stack: '技术栈',
      about: '关于',
      menu: '打开菜单',
      close: '关闭菜单',
      search: '搜索',
      theme: '切换主题',
      themeLight: '浅色',
      themeDark: '深色',
      themeSystem: '跟随系统',
      language: '切换语言',
      github: 'GitHub 仓库',
      skipToContent: '跳到主内容',
    },

    hero: {
      overline: 'ARCHIVE · 归档年鉴',
      title: '代码化石标本馆',
      tagline: 'A single source of truth for code that shaped the way I build.',
      lead: '集中沉淀不再单独维护、但仍有学习与参考价值的历史项目。全部通过 git subtree 迁入,提交历史完整保留;每一份归档都能回答三个问题:它是什么 · 为什么保留 · 现在还活着吗。',
      ctaPrimary: '浏览项目库',
      ctaSecondary: '查看 GitHub 仓库',
    },

    stats: {
      projects: '归档项目',
      stacks: '技术栈覆盖',
      docs: '双语文档',
      languages: '界面语言',
      langValue: '中 / EN',
    },

    home: {
      categoriesTitle: '四条主线',
      categoriesDesc: '按场景用途而非字母序划分,每条主线下的项目共享同一类工程问题。',
      featuredTitle: '精选项目',
      featuredDesc: '从架构复杂度与工程完整度两个维度挑出的三个代表。',
      featuredViewAll: '查看全部',
      overviewTitle: '项目总览',
      overviewDesc: '12 个归档项目的全量索引,可按分类、技术栈与状态进一步筛选。',
      stacksTitle: '技术栈分布',
      stacksDesc: '一图看清这个仓库的语言、框架与架构风格覆盖度。',
      stacksByLanguage: '按后端语言',
      stacksByFrontend: '按前端栈',
      timelineTitle: '归档时间线',
      timelineDesc: '按归档提交顺序排列,作为仓库成长史的一瞥。',
      timelineViewAll: '完整时间线',
      methodTitle: '这个仓库怎么用',
      methodDesc: '不做教程合集,而是做一份可检索、可对照、可托底的技术档案。',
      methodSearchable: '可检索',
      methodSearchableDesc: '翻找某段历史代码时,不再需要在几十个分散的 GitHub 仓库中大海捞针。',
      methodComparable: '可对照',
      methodComparableDesc: '不同语言、框架与架构风格的尝试并列存放,形成技术演化的化石标本。',
      methodDurable: '可托底',
      methodDurableDesc: '集中管理,降低历史项目散落带来的凭据泄露与归档丢失风险。',
      ctaTitle: '所有归档都遵循同一套规范',
      ctaDesc: '目录约定、字段模板、提交规范与禁止动作全部写在仓库的协作规范里,自动化工具在改动前需先理解约定。',
      ctaDocs: '阅读协作规范',
      ctaWorkflow: '了解归档工作流',
      projectCountSuffix: ' 个项目',
    },

    projects: {
      title: '项目库',
      desc: '全部归档项目的可筛选索引。筛选状态会写入地址栏,可直接分享或回退。',
      countLabel: '个项目',
      filterCategory: '分类',
      filterStack: '技术栈',
      filterStatus: '状态',
      sortLabel: '排序',
      sortArchived: '按归档时间',
      sortName: '按名称',
      clearFilters: '清除筛选',
      viewGrid: '网格视图',
      viewList: '列表视图',
      emptyTitle: '没有匹配的项目',
      emptyDesc: '当前筛选条件下没有归档项目,试试放宽条件。',
      emptyAction: '清除筛选',
      selected: '已选',
      all: '全部',
    },

    status: {
      archived: '已归档',
      runnable: '可运行',
      wip: '待整理',
      scrubbed: '已脱敏',
      repoCleared: '原仓库已清空',
    },

    detail: {
      breadcrumbHome: '首页',
      breadcrumbProjects: '项目库',
      viewSource: '查看源码入口',
      viewArchiveDoc: '归档说明',
      archivedOn: '归档于',
      commits: '提交数',
      stackTitle: '技术栈',
      tocTitle: '本页目录',
      prevProject: '上一个项目',
      nextProject: '下一个项目',
      relatedProjects: '同分类项目',
      switchLang: '切换语言',
      copyLink: '复制链接',
      copied: '已复制',
      printPage: '打印',
      sourceClearedNote: 'owner 已停止开发并清空原仓库,本归档为唯一保留副本。',
      scrubbedNote: '项目涉及真实外部凭证,导入时已逐项脱敏。',
    },

    timeline: {
      title: '归档时间线',
      desc: '按归档提交的时间顺序倒序排列。每个节点对应一次 archive: import 提交。',
      span: '时间跨度',
      latest: '最近归档',
      groupYear: '年',
    },

    stack: {
      title: '技术栈总览',
      desc: '按后端语言、前端栈与架构风格三个维度聚合全部归档项目。',
      projectsCount: '个项目',
      representatives: '代表项目',
      allTags: '全部技术标签',
      allTagsDesc: '按出现频次决定字号,点击可筛选包含该技术的项目。',
    },

    about: {
      title: '关于这个归档',
      quote: '把不再单独维护、但依然有价值的代码,集中到一个可检索的索引下。',
      q1: '它是什么',
      q1Desc: '一个纯归档仓库,所有子目录保存的是历史上从其他仓库导入的只读代码快照。',
      q2: '为什么保留',
      q2Desc: '每一份归档都记录了项目定位、技术栈与学习重点,构成技术演化的对照样本。',
      q3: '现在还活着吗',
      q3Desc: '状态字段明确标注已归档、可运行或待整理,不制造"仍在维护"的错觉。',
      solvesTitle: '它解决什么问题',
      solves: [
        { title: '可检索', desc: '翻找某段历史代码时,不再需要在几十个分散的 GitHub 仓库中大海捞针。' },
        { title: '可对照', desc: '不同语言、框架与架构风格的尝试并列存放,形成技术演化的化石标本。' },
        { title: '可托底', desc: '集中管理,降低历史项目散落带来的凭据泄露与归档丢失风险。' },
        { title: '可协作', desc: '配套 AI Agent 规范文件,让自动化工具在改动前先理解约定。' },
      ],
      notTitle: '它不是什么',
      nots: [
        '不是个人作品集主站',
        '不是持续维护的开发项目(归档默认只读快照)',
        '不是教程合集,每个子项目独立的 ARCHIVE.md 才是检索入口',
      ],
      compositionTitle: '归档构成',
      resourcesTitle: '相关资源',
      resourceRepo: 'GitHub 仓库',
      resourceAgents: '协作规范 AGENTS.md',
      resourceClaude: 'Claude 偏好 CLAUDE.md',
      resourceDesign: '站点设计文档',
      resourceLicense: 'MIT License',
      maintainerTitle: '维护者',
      maintainerDesc: '归档仓库与本站均由个人维护,欢迎通过仓库 issue 或邮件交流。',
    },

    footer: {
      siteTitle: '站点',
      projectsTitle: '归档项目',
      docsTitle: '文档',
      connectTitle: '联系',
      builtWith: '由 Astro 构建 · 部署于 GitHub Pages',
      license: 'MIT License',
      backToTop: '回到顶部',
      rss: 'RSS 订阅',
      email: '邮件联系',
    },

    notFound: {
      title: '页面走丢了',
      desc: '你访问的地址没有对应的内容,可能是链接已变更或拼写有误。',
      home: '返回首页',
      projects: '浏览项目库',
      search: '搜索内容',
    },

    search: {
      placeholder: '搜索项目、技术栈或分类…',
      hint: '输入关键词开始检索',
      empty: '没有找到匹配结果',
      emptyHint: '换个关键词试试,或直接浏览项目库。',
      groupProjects: '项目',
      groupCategories: '分类',
      loading: '正在检索…',
    },

    common: {
      more: '了解更多',
      all: '全部',
      back: '返回',
      of: '/',
    },
  },

  en: {
    siteName: 'Archiving Project',
    tagline: 'A curated archive of code — what it is, why it is kept, whether it still lives',
    metaDescription:
      'A read-only archive of retired personal projects: 12 codebases across AI / full-stack / enterprise architecture / tools and vertical systems. Every entry answers what it is, why it is kept, and whether it still lives.',

    nav: {
      home: 'Home',
      projects: 'Projects',
      timeline: 'Timeline',
      stack: 'Stack',
      about: 'About',
      menu: 'Open menu',
      close: 'Close menu',
      search: 'Search',
      theme: 'Switch theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeSystem: 'System',
      language: 'Switch language',
      github: 'GitHub repository',
      skipToContent: 'Skip to content',
    },

    hero: {
      overline: 'ARCHIVE · A YEARBOOK OF CODE',
      title: 'A curated archive of code',
      tagline: 'A single source of truth for code that shaped the way I build.',
      lead: 'A home for projects no longer maintained on their own but still worth reading. Everything arrived via git subtree with full commit history, and every entry answers three questions: what it is, why it is kept, and whether it still lives.',
      ctaPrimary: 'Browse projects',
      ctaSecondary: 'View on GitHub',
    },

    stats: {
      projects: 'Archived projects',
      stacks: 'Technologies covered',
      docs: 'Bilingual articles',
      languages: 'Interface languages',
      langValue: 'ZH / EN',
    },

    home: {
      categoriesTitle: 'Four threads',
      categoriesDesc: 'Grouped by the class of engineering problem they solve, not alphabetically.',
      featuredTitle: 'Selected projects',
      featuredDesc: 'Three representatives chosen for architectural depth and engineering completeness.',
      featuredViewAll: 'View all',
      overviewTitle: 'Project index',
      overviewDesc: 'The full index of 12 archived projects, filterable by category, stack and status.',
      stacksTitle: 'Technology coverage',
      stacksDesc: 'The language, framework and architecture spread of this repository at a glance.',
      stacksByLanguage: 'Backend languages',
      stacksByFrontend: 'Frontend stacks',
      timelineTitle: 'Archive timeline',
      timelineDesc: 'Ordered by archive commit — a glimpse into how this repository grew.',
      timelineViewAll: 'Full timeline',
      methodTitle: 'How to use this archive',
      methodDesc: 'Not a tutorial collection, but a searchable, comparable and durable technical record.',
      methodSearchable: 'Searchable',
      methodSearchableDesc: 'Stop hunting through dozens of scattered GitHub repositories for that one snippet.',
      methodComparable: 'Comparable',
      methodComparableDesc: 'Different languages, frameworks and architecture styles side by side, as fossils of a technical evolution.',
      methodDurable: 'Durable',
      methodDurableDesc: 'Centralised, reducing the risk of credential leaks and lost archives from scattered projects.',
      ctaTitle: 'Every archive follows the same conventions',
      ctaDesc: 'Directory rules, field templates, commit conventions and forbidden actions all live in the repository guide, so automated tools understand the contract before changing anything.',
      ctaDocs: 'Read the conventions',
      ctaWorkflow: 'See the archive workflow',
      projectCountSuffix: ' projects',
    },

    projects: {
      title: 'Projects',
      desc: 'A filterable index of every archived project. Filter state is written to the URL, so views are shareable and back-navigable.',
      countLabel: 'projects',
      filterCategory: 'Category',
      filterStack: 'Stack',
      filterStatus: 'Status',
      sortLabel: 'Sort',
      sortArchived: 'By archive date',
      sortName: 'By name',
      clearFilters: 'Clear filters',
      viewGrid: 'Grid view',
      viewList: 'List view',
      emptyTitle: 'No matching projects',
      emptyDesc: 'Nothing matches the current filters. Try widening the criteria.',
      emptyAction: 'Clear filters',
      selected: 'Selected',
      all: 'All',
    },

    status: {
      archived: 'Archived',
      runnable: 'Runnable',
      wip: 'Pending',
      scrubbed: 'Scrubbed',
      repoCleared: 'Upstream cleared',
    },

    detail: {
      breadcrumbHome: 'Home',
      breadcrumbProjects: 'Projects',
      viewSource: 'View source',
      viewArchiveDoc: 'Archive notes',
      archivedOn: 'Archived on',
      commits: 'Commits',
      stackTitle: 'Tech stack',
      tocTitle: 'On this page',
      prevProject: 'Previous',
      nextProject: 'Next',
      relatedProjects: 'Same category',
      switchLang: 'Switch language',
      copyLink: 'Copy link',
      copied: 'Copied',
      printPage: 'Print',
      sourceClearedNote: 'The owner stopped development and emptied the upstream repository; this archive is the only remaining copy.',
      scrubbedNote: 'This project dealt with live external credentials, all of which were scrubbed on import.',
    },

    timeline: {
      title: 'Archive timeline',
      desc: 'Newest archive commit first. Each node corresponds to one archive: import commit.',
      span: 'Span',
      latest: 'Latest archive',
      groupYear: '',
    },

    stack: {
      title: 'Technology overview',
      desc: 'All archived projects aggregated by backend language, frontend stack and architecture style.',
      projectsCount: 'projects',
      representatives: 'Representatives',
      allTags: 'All technology tags',
      allTagsDesc: 'Font size tracks frequency. Click a tag to filter projects that use it.',
    },

    about: {
      title: 'About this archive',
      quote: 'Code that is no longer maintained on its own, gathered under one searchable index.',
      q1: 'What it is',
      q1Desc: 'A pure archive repository. Every subdirectory holds a read-only snapshot imported from an earlier repository.',
      q2: 'Why it is kept',
      q2Desc: 'Each entry records what the project was, its stack and what it taught, forming comparable fossils of a technical evolution.',
      q3: 'Whether it still lives',
      q3Desc: 'A status field states archived, runnable or pending outright — no pretence of ongoing maintenance.',
      solvesTitle: 'What it solves',
      solves: [
        { title: 'Searchable', desc: 'Stop hunting through dozens of scattered GitHub repositories for that one snippet.' },
        { title: 'Comparable', desc: 'Different languages, frameworks and styles stored side by side as fossils of a technical evolution.' },
        { title: 'Durable', desc: 'Centralised, reducing credential-leak and archive-loss risk from scattered projects.' },
        { title: 'Collaborative', desc: 'AI agent conventions ship with the repo, so tooling understands the contract before acting.' },
      ],
      notTitle: 'What it is not',
      nots: [
        'Not a personal portfolio site',
        'Not an actively maintained project — archives are read-only snapshots',
        'Not a tutorial collection; each ARCHIVE.md is the real entry point',
      ],
      compositionTitle: 'Composition',
      resourcesTitle: 'Resources',
      resourceRepo: 'GitHub repository',
      resourceAgents: 'Agent conventions, AGENTS.md',
      resourceClaude: 'Claude preferences, CLAUDE.md',
      resourceDesign: 'Site design document',
      resourceLicense: 'MIT License',
      maintainerTitle: 'Maintainer',
      maintainerDesc: 'Both the archive and this site are maintained personally. Reach out via a repository issue or email.',
    },

    footer: {
      siteTitle: 'Site',
      projectsTitle: 'Projects',
      docsTitle: 'Docs',
      connectTitle: 'Connect',
      builtWith: 'Built with Astro · Deployed on GitHub Pages',
      license: 'MIT License',
      backToTop: 'Back to top',
      rss: 'RSS feed',
      email: 'Email',
    },

    notFound: {
      title: 'Page not found',
      desc: 'There is nothing at this address. The link may have changed or been mistyped.',
      home: 'Back home',
      projects: 'Browse projects',
      search: 'Search',
    },

    search: {
      placeholder: 'Search projects, stacks or categories…',
      hint: 'Type to start searching',
      empty: 'No results',
      emptyHint: 'Try another keyword, or browse the project index.',
      groupProjects: 'Projects',
      groupCategories: 'Categories',
      loading: 'Searching…',
    },

    common: {
      more: 'Learn more',
      all: 'All',
      back: 'Back',
      of: '/',
    },
  },
};

export function t(locale: Locale): Strings {
  return STRINGS[locale];
}
