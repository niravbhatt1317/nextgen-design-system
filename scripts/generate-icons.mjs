/**
 * Icon generation - builds the icon registry from Lucide's own SVG source.
 *
 * Lucide is the primary icon source for this library. We copy its artwork in
 * rather than importing the package at runtime, so a product using this library
 * gains no new dependency and an icon never silently changes shape underneath a
 * team. `lucide-static` is a devDependency purely so this script has something
 * to read; refreshing is `npm run generate-icons`.
 *
 * Two rules this script exists to enforce, both learned the hard way:
 *
 * 1. **Inner elements carry no stroke attributes.** The previous generator
 *    repeated `stroke-width="2"` on every path. An element's own attribute beats
 *    an inherited one, so the `strokeWidth` prop on <Icon> was silently ignored
 *    by 1208 of 1209 icons. Only the outer <svg> sets stroke properties now.
 *
 * 2. **Lucide's element structure is preserved.** The old icons came through
 *    Figma, which welds every shape into one giant path and turns arcs into
 *    bezier curves. That renders the same but is impossible to diff against
 *    upstream, so nobody could tell an outdated icon from a current one.
 *
 * Usage:
 *   npm run generate-icons              # refresh from node_modules/lucide-static
 *   node scripts/generate-icons.mjs <folder-of-svgs>
 *   node scripts/generate-icons.mjs --all   # also add icons we don't have yet
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ICONS_OUTPUT_DIR = path.join(__dirname, '../src/components/Icon/icons');
const DEFAULT_SOURCE = path.join(__dirname, '../node_modules/lucide-static/icons');

/** SVG attributes that React wants in camelCase. */
const ATTR_MAP = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-opacity': 'strokeOpacity',
  'fill-opacity': 'fillOpacity',
  'fill-rule': 'fillRule',
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'text-anchor': 'textAnchor',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'xlink:href': 'xlinkHref',
  'vector-effect': 'vectorEffect',
  'paint-order': 'paintOrder',
};

/**
 * Stroke properties belong on the outer <svg> only, so the component's props can
 * still reach the artwork. See rule 1 above.
 *
 * `fill` is deliberately NOT in here. Ten Lucide icons set `fill="currentColor"`
 * on a child to make a shape solid - the dots in `scatter-chart`, for instance.
 * Stripping it turned every one of those into a hollow ring. Only a redundant
 * `fill="none"`, which the outer <svg> already sets, is dropped.
 */
const STRIP_FROM_CHILDREN = new Set([
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
]);

/** Attribute values that only repeat what the outer <svg> already says. */
function isRedundant(key, value) {
  return key === 'fill' && value === 'none';
}

/** camelCase JSX attribute names back to the SVG spelling, so one parser handles both. */
const FROM_REACT = Object.fromEntries(Object.entries(ATTR_MAP).map(([svg, jsx]) => [jsx, svg]));

function fromReactAttrs(source) {
  return source.replace(/\b([a-zA-Z]+)=/g, (whole, name) =>
    FROM_REACT[name] ? `${FROM_REACT[name]}=` : whole
  );
}

/** "activity-square" -> "ActivitySquare" */
function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Take the inside of a Lucide SVG and make it valid JSX: drop the stroke and
 * fill attributes that would override the component's props, camelCase what is
 * left, and self-close every element.
 */
function toJsxChildren(svgSource) {
  const inner = /<svg[^>]*>([\s\S]*?)<\/svg>/i.exec(svgSource);
  if (!inner) return null;

  const elements = [];
  const seenAttrs = new Set();
  const dropped = [];

  // Lucide's icons are flat lists of self-closing shapes - no nesting, no
  // gradients, no defs. Anything else means the format changed and this script
  // needs looking at, so it is reported rather than silently mangled.
  for (const m of inner[1].matchAll(/<([a-zA-Z]+)((?:\s+[^>]*?)?)\/>/g)) {
    const [, tag, rawAttrs] = m;
    const parts = [];

    // Digits matter: half of Lucide's shapes are <line x1= x2= y1= y2=>, and a
    // pattern that only allowed letters turned every one of them into a bare
    // <line /> that draws nothing at all.
    for (const a of rawAttrs.matchAll(/([a-zA-Z][a-zA-Z0-9:_-]*)\s*=\s*"([^"]*)"/g)) {
      const [, key, value] = a;
      seenAttrs.add(key);
      if (STRIP_FROM_CHILDREN.has(key) || isRedundant(key, value)) continue;
      parts.push(`${ATTR_MAP[key] ?? key}="${value}"`);
    }

    // A shape with no geometry left is a parsing failure, not a valid icon.
    if (parts.length === 0 && rawAttrs.trim() !== '') dropped.push(tag);

    elements.push(parts.length ? `<${tag} ${parts.join(' ')} />` : `<${tag} />`);
  }

  if (elements.length === 0) return null;
  return { jsx: elements, seenAttrs, dropped };
}

/** Wrap the shapes in the outer <svg> that carries every stroke property. */
function buildComponent(componentName, children) {
  const indented = children.map((c) => `    ${c}`).join('\n');
  return `export const ${componentName}Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
${indented}
  </svg>
);
`;
}

function generateIndexFile(iconNames) {
  const sorted = [...iconNames].sort();

  const imports = sorted
    .map((name) => `import { ${toPascalCase(name)}Icon } from './${name}';`)
    .join('\n');

  const registryEntries = sorted
    .map((name) => {
      const key = name.includes('-') || /^\d/.test(name) ? `'${name}'` : name;
      return `  ${key}: ${toPascalCase(name)}Icon,`;
    })
    .join('\n');

  return `${imports}

/**
 * Icon registry mapping icon names to their components
 *
 * This file is AUTO-GENERATED by scripts/generate-icons.mjs from Lucide's own
 * SVG source. Do not edit manually. To refresh against the latest Lucide:
 *   npm run generate-icons
 */
export const iconRegistry = {
${registryEntries}
} as const;

/**
 * Type-safe icon names derived from the registry
 */
export type IconName = keyof typeof iconRegistry;

/**
 * Array of all available icon names (useful for Storybook and documentation)
 */
export const iconNames = Object.keys(iconRegistry) as IconName[];
`;
}

function main() {
  const args = process.argv.slice(2);
  const addAll = args.includes('--all');
  const sourceArg = args.find((a) => !a.startsWith('--'));
  const sourceDir = sourceArg ?? DEFAULT_SOURCE;

  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: folder not found: ${sourceDir}`);
    console.error('Install the source with: npm install --save-dev lucide-static');
    process.exit(1);
  }

  const available = new Map(
    fs
      .readdirSync(sourceDir)
      .filter((f) => f.endsWith('.svg'))
      .map((f) => [f.replace(/\.svg$/, ''), path.join(sourceDir, f)])
  );

  if (available.size === 0) {
    console.error('Error: no SVG files in the source folder');
    process.exit(1);
  }

  const existing = fs.existsSync(ICONS_OUTPUT_DIR)
    ? fs
        .readdirSync(ICONS_OUTPUT_DIR)
        .filter((f) => f.endsWith('.tsx'))
        .map((f) => f.replace(/\.tsx$/, ''))
    : [];

  // Which icons end up in the registry. By default the set is frozen: refreshing
  // artwork must not quietly add 800 names to a public API. `--all` opts in.
  const targets = addAll
    ? [...new Set([...existing, ...available.keys()])].sort()
    : existing.length
      ? existing.slice().sort()
      : [...available.keys()].sort();

  console.log(`source:   ${sourceDir} (${String(available.size)} icons)`);
  console.log(`existing: ${String(existing.length)} icons`);
  console.log(`target:   ${String(targets.length)} icons${addAll ? ' (--all)' : ''}\n`);

  fs.mkdirSync(ICONS_OUTPUT_DIR, { recursive: true });

  const written = [];
  const keptLocal = [];
  const failed = [];
  const emptied = [];
  const allAttrs = new Set();

  for (const name of targets) {
    const svgPath = available.get(name);

    // No upstream file means the icon was removed from Lucide - brand logos, in
    // practice, dropped for trademark reasons. Keep our artwork, but still run it
    // through the same pipeline: leaving them alone the first time left 17 icons
    // as the only ones in the set where the strokeWidth prop still did nothing.
    if (!svgPath) {
      if (!existing.includes(name)) continue;
      try {
        const current = fs.readFileSync(path.join(ICONS_OUTPUT_DIR, `${name}.tsx`), 'utf-8');
        const parsed = toJsxChildren(fromReactAttrs(current));
        if (parsed) {
          fs.writeFileSync(
            path.join(ICONS_OUTPUT_DIR, `${name}.tsx`),
            buildComponent(toPascalCase(name), parsed.jsx)
          );
        }
      } catch (error) {
        console.error(`  ${name}: ${String(error)}`);
      }
      keptLocal.push(name);
      written.push(name);
      continue;
    }

    try {
      const parsed = toJsxChildren(fs.readFileSync(svgPath, 'utf-8'));
      if (!parsed) {
        failed.push(name);
        continue;
      }
      parsed.seenAttrs.forEach((a) => allAttrs.add(a));
      if (parsed.dropped.length) {
        emptied.push(`${name} (<${parsed.dropped.join('>, <')}>)`);
      }
      fs.writeFileSync(
        path.join(ICONS_OUTPUT_DIR, `${name}.tsx`),
        buildComponent(toPascalCase(name), parsed.jsx)
      );
      written.push(name);
    } catch (error) {
      console.error(`  ${name}: ${String(error)}`);
      failed.push(name);
    }
  }

  fs.writeFileSync(path.join(ICONS_OUTPUT_DIR, 'index.ts'), generateIndexFile(written));

  const unmapped = [...allAttrs].filter(
    (a) => a.includes('-') && !ATTR_MAP[a] && !STRIP_FROM_CHILDREN.has(a)
  );

  console.log(`Regenerated from source: ${String(written.length - keptLocal.length)}`);
  console.log(`Kept our own copy:       ${String(keptLocal.length)}`);
  console.log(`Registry size:           ${String(written.length)}`);
  if (keptLocal.length) {
    console.log(`\nNo longer in the source, kept as-is:\n  ${keptLocal.join(', ')}`);
  }
  if (failed.length) {
    console.log(`\nFailed (${String(failed.length)}): ${failed.join(', ')}`);
  }
  if (emptied.length) {
    console.log(
      `\nWARNING - shapes lost every attribute (${String(emptied.length)}): ${emptied.slice(0, 20).join(', ')}`
    );
  }
  if (unmapped.length) {
    console.log(`\nWARNING - unrecognised attributes: ${unmapped.join(', ')}`);
  }
  console.log('\nNext: npx prettier --write "src/components/Icon/icons/**" && npm run typecheck');
}

main();
