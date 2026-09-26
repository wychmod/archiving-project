/**
 * Rehype plugin: prefix root-relative links in Markdown with the deployment base.
 *
 * Article bodies are authored (and migrated) with portable, base-free paths
 * such as `/projects/lottery/`. That is correct at authoring time — content
 * must not know which sub-path the site is served from — but it is wrong in the
 * built HTML, where every internal link needs the GitHub Pages base.
 *
 * Rather than hardcoding the base into twenty-odd Markdown files, the rewrite
 * happens once, here, at build time. Markdown stays portable; the output is
 * correct.
 *
 * Only `href` attributes starting with a single `/` are touched, so absolute
 * URLs, anchors, `mailto:` and relative links pass through untouched.
 */
import { visit } from './unist-visit.mjs';

/**
 * @param {{ base?: string }} options
 * @returns {(tree: object) => void}
 */
export function rehypeBaseLinks({ base = '' } = {}) {
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;

  return (tree) => {
    if (!prefix) return;

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;

      const href = node.properties?.href;
      if (typeof href !== 'string' || !href.startsWith('/')) return;
      if (href.startsWith('//')) return; // protocol-relative
      if (href === prefix || href.startsWith(`${prefix}/`)) return; // already done

      node.properties.href = `${prefix}${href}`;
    });
  };
}

export default rehypeBaseLinks;
