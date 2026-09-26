/**
 * Post-build validation: every internal link must stay inside the deployment
 * base. Astro does not enforce this, and a single un-prefixed path silently
 * 404s only once deployed — so we check the built HTML instead of trusting it.
 *
 * Two modes, deliberately:
 *
 *   - No argument (local): the base is read back from the build itself, via the
 *     `<meta name="site-base">` tag BaseLayout emits. Convenient, and it cannot
 *     disagree with what was built.
 *   - Explicit argument (CI): assert that the build used the base we *expected*
 *     (`configure-pages`' `base_path`). This is the stronger check — a build
 *     that silently lost its base would self-validate happily without it.
 *
 * Usage: node scripts/check-links.mjs [base]
 *        node scripts/check-links.mjs ""     # assert a root-hosted build
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const HOST = 'https://wychmod.github.io';
const EXTERNAL = /^(?:https?:|mailto:|tel:|data:|#|\/\/)/;

/** Read the base the build actually used, falling back to the CLI argument. */
function resolveBase() {
  if (process.argv.length > 2) {
    return String(process.argv[2]).replace(/\/$/, '');
  }
  const entry = path.join(DIST, 'index.html');
  if (!fs.existsSync(entry)) return '';
  const html = fs.readFileSync(entry, 'utf8');
  const m = html.match(/<meta\s+name="site-base"\s+content="([^"]*)"/);
  if (!m) return '';
  return m[1].replace(/\/$/, '');
}

const BASE = resolveBase();

/*
 * Guard against a base that was mangled before it reached Node. On Windows, Git
 * Bash rewrites path-like arguments and env vars, so passing "/archiving-project"
 * can arrive as "C:/.../PortableGit/.../archiving-project". Without this check
 * that surfaces as "48 paths escape the base", which reads like a real link bug
 * and sends you looking in the wrong place.
 */
if (BASE.includes('\\') || /^[A-Za-z]:/.test(BASE)) {
  console.error(
    `error: the base looks like a Windows path, not a URL prefix: "${BASE}"\n` +
      `  Something rewrote it before Node saw it. On Git Bash, run the command\n` +
      `  with MSYS_NO_PATHCONV=1 to stop the shell converting it.`
  );
  process.exit(2);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(DIST);
const rootRelative = new Map();
const absolute = new Map();

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (!url || EXTERNAL.test(url)) continue;

    if (url.startsWith(HOST)) {
      if (!url.startsWith(`${HOST}${BASE}/`)) {
        const key = url.replace(/[?#].*$/, '');
        absolute.set(key, (absolute.get(key) ?? 0) + 1);
      }
      continue;
    }

    if (!url.startsWith('/')) continue; // relative links are fine
    if (url === BASE || url.startsWith(`${BASE}/`)) continue;

    const key = url.replace(/[?#].*$/, '');
    rootRelative.set(key, (rootRelative.get(key) ?? 0) + 1);
  }
}

function report(label, map) {
  if (map.size === 0) {
    console.log(`ok   ${label}: all inside ${BASE}`);
    return 0;
  }
  console.log(`FAIL ${label}: ${map.size} path(s) escape the base`);
  for (const [url, n] of [...map].slice(0, 30)) console.log(`       ${url}  x${n}`);
  return map.size;
}

console.log(`scanned ${files.length} HTML files with base "${BASE}"\n`);
const failures = report('root-relative links', rootRelative) + report('absolute URLs', absolute);
process.exit(failures > 0 ? 1 : 0);
