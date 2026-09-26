/**
 * Minimal hast walker.
 *
 * The plugin needs exactly one traversal helper and nothing else from
 * `unist-util-visit`, so it is inlined here rather than pulling in a package
 * for a fifteen-line loop.
 */

/**
 * Depth-first walk of a hast tree.
 * @param {object} node
 * @param {string} type - node type to match, e.g. 'element'
 * @param {(node: object) => void} fn
 */
export function visit(node, type, fn) {
  if (!node || typeof node !== 'object') return;
  if (node.type === type) fn(node);
  const children = node.children;
  if (!Array.isArray(children)) return;
  for (const child of children) visit(child, type, fn);
}
