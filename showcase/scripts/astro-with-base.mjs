/**
 * Run an Astro CLI command with the GitHub Pages base applied consistently.
 *
 * Why this exists
 * ---------------
 * The base must be identical when building and when serving. Building without a
 * base and then serving under `/archiving-project/` makes every stylesheet and
 * script 404, so the site renders completely unstyled — which looks like broken
 * CSS, not a configuration mismatch. That is exactly what happened once, so the
 * base now has a single default that `dev`, `build` and `preview` all share.
 *
 * It also sets the variable from Node rather than the shell: on Windows, Git
 * Bash rewrites path-like env vars and CLI args, so `PAGES_BASE_PATH=/archiving-project`
 * can arrive as `C:/.../PortableGit/.../archiving-project`. Setting it here
 * sidesteps that entirely, so no MSYS_NO_PATHCONV incantation is needed.
 *
 * `preview` additionally refuses to serve a `dist/` that was built with a
 * different base — that is the specific mismatch this file exists to prevent.
 *
 * Usage: node scripts/astro-with-base.mjs <dev|build|preview> [...astro args]
 *        PAGES_BASE_PATH= node scripts/astro-with-base.mjs build   # root-hosted
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

/** The base this site is deployed under. */
const DEFAULT_BASE = '/archiving-project';

const [command, ...rest] = process.argv.slice(2);

if (!command) {
  console.error('usage: node scripts/astro-with-base.mjs <dev|build|preview> [...args]');
  process.exit(2);
}

/** An explicitly-set but empty PAGES_BASE_PATH means "root-hosted" — respect it. */
const base =
  process.env.PAGES_BASE_PATH === undefined ? DEFAULT_BASE : process.env.PAGES_BASE_PATH;

const normalize = (p) => p.replace(/\/+$/, '');
const wantBase = normalize(base);

/** The base a finished build recorded in its own HTML. */
function builtBase() {
  const entry = path.join('dist', 'index.html');
  if (!existsSync(entry)) return null;
  const m = readFileSync(entry, 'utf8').match(
    /<meta\s+name="site-base"\s+content="([^"]*)"/
  );
  return m ? normalize(m[1]) : null;
}

if (command === 'preview') {
  const built = builtBase();
  if (built !== null && built !== wantBase) {
    console.error(
      `\nerror: dist/ was built with base "${built || '/'}" but preview would serve it at "${wantBase || '/'}".\n` +
        `  Every asset would 404 and the page would render unstyled.\n` +
        `  Rebuild first:  npm run build\n`
    );
    process.exit(2);
  }
}

const cli = path.join('node_modules', 'astro', 'astro.js');
const result = spawnSync(process.execPath, [cli, command, ...rest], {
  stdio: 'inherit',
  env: { ...process.env, PAGES_BASE_PATH: base },
});

process.exit(result.status ?? 1);
