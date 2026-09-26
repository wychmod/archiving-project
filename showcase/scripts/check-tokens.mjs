/**
 * Token audit: every `var(--x)` used anywhere must be defined in tokens.css.
 *
 * A typo'd or missing custom property fails silently — the declaration is
 * dropped and the element renders with an inherited or initial value. The
 * whole token layer once went un-imported for exactly that reason, so this
 * check is the cheap insurance against a repeat.
 *
 * Usage: node scripts/check-tokens.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const TOKENS = 'src/styles/tokens.css';
const SCAN_DIRS = ['src', 'plugins'];

/* Custom properties browsers define themselves, or set from JS at runtime. */
const IGNORE = new Set([
  // set by ThemeToggle / BaseLayout at runtime
  '--cover-color',
]);

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (/\.(astro|css|ts|mjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

const tokenSrc = fs.readFileSync(TOKENS, 'utf8');
const defined = new Set([...tokenSrc.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)].map((m) => m[1]));

// Plus anything defined outside tokens.css (component-local custom props).
for (const file of SCAN_DIRS.flatMap(walk)) {
  if (file === TOKENS) continue;
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)) defined.add(m[1]);
}

const used = new Map();
for (const file of SCAN_DIRS.flatMap(walk)) {
  if (file === TOKENS) continue;
  const src = fs.readFileSync(file, 'utf8');
  for (const m of src.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)/g)) {
    const name = m[1];
    if (IGNORE.has(name)) continue;
    if (!used.has(name)) used.set(name, new Set());
    used.get(name).add(file);
  }
}

const missing = [...used].filter(([name]) => !defined.has(name));

console.log(`tokens defined: ${defined.size}`);
console.log(`tokens used:    ${used.size}\n`);

if (missing.length === 0) {
  console.log('ok   every referenced custom property is defined');
  process.exit(0);
}

console.log(`FAIL ${missing.length} custom property/properties never defined:`);
for (const [name, files] of missing.sort()) {
  console.log(`  ${name}`);
  for (const f of [...files].slice(0, 4)) console.log(`      ${f}`);
}
process.exit(1);
