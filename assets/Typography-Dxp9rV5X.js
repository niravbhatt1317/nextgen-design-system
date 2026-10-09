import{j as e}from"./iframe-DR2Xf7Va.js";import{useMDXComponents as t}from"./index-NarM6dwl.js";import{M as o}from"./blocks-yV8D9pbt.js";import"./preload-helper-Dp1pzeXC.js";import"./index-AvfVXy8K.js";import"./index-B75sUY0K.js";function i(s){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Foundation/Typography"}),`
`,e.jsx(n.h1,{id:"typography",children:"Typography"}),`
`,e.jsx(n.p,{children:"The Motadata typography system provides a consistent, scalable type system for all components."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"font-families",children:"Font Families"}),`
`,e.jsxs(n.p,{children:["The library uses ",e.jsx(n.strong,{children:"system fonts by default"})," for optimal performance and native user experience."]}),`
`,e.jsx(n.h3,{id:"why-system-fonts",children:"Why System Fonts?"}),`
`,e.jsxs(n.p,{children:[`| Benefit | Description |
| --- | --- |
| `,e.jsx(n.strong,{children:"Zero Load Time"}),` | No font files to download |
| `,e.jsx(n.strong,{children:"Smaller Bundle"}),` | No font assets shipped with the library |
| `,e.jsx(n.strong,{children:"Native OS Feel"}),` | Users see familiar fonts from their platform |
| `,e.jsx(n.strong,{children:"No FOUT/FOIT"}),` | No flash of unstyled or invisible text |
| `,e.jsx(n.strong,{children:"Better Accessibility"})," | Respects user font size preferences |"]}),`
`,e.jsx(n.h3,{id:"sans-serif-default",children:"Sans-Serif (Default)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`--mdt-font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  'Segoe UI', 'Noto Sans', 'Liberation Sans', Arial, sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`})}),`
`,e.jsx(n.p,{children:"Used for body text, headings, and UI components."}),`
`,e.jsx(n.h3,{id:"monospace",children:"Monospace"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`--mdt-font-mono: ui-monospace, 'JetBrains Mono', 'Fira Code', Consolas, monospace;
`})}),`
`,e.jsx(n.p,{children:"Used for code blocks, technical content, and data display."}),`
`,e.jsx(n.h3,{id:"platform-specific-fonts",children:"Platform-Specific Fonts"}),`
`,e.jsx(n.p,{children:`| Font | Platform |
| --- | --- |
| San Francisco | macOS, iOS |
| Segoe UI | Windows 7+ |
| Noto Sans | Android, Linux |
| Liberation Sans | Linux (fallback) |
| Arial | Universal fallback |`}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"type-scale",children:"Type Scale"}),`
`,e.jsx(n.h3,{id:"headings",children:"Headings"}),`
`,e.jsx(n.p,{children:`| Level | Size | Line Height | Usage |
| --- | --- | --- | --- |
| H1 | 2.25rem (36px) | 2.5rem (40px) | Page titles |
| H2 | 1.875rem (30px) | 2.25rem (36px) | Section headings |
| H3 | 1.5rem (24px) | 2rem (32px) | Subsection headings |
| H4 | 1.25rem (20px) | 1.75rem (28px) | Card titles |
| H5 | 1.125rem (18px) | 1.75rem (28px) | Component titles |
| H6 | 1rem (16px) | 1.5rem (24px) | Small headings |`}),`
`,e.jsx(n.h3,{id:"body-text",children:"Body Text"}),`
`,e.jsx(n.p,{children:`| Size | Line Height | Usage |
| --- | --- | --- |
| Base (1rem / 16px) | 1.5rem (24px) | Standard body text |
| Small (0.875rem / 14px) | 1.25rem (20px) | Helper text, captions |
| Extra Small (0.75rem / 12px) | 1rem (16px) | Labels, metadata |`}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"font-weights",children:"Font Weights"}),`
`,e.jsx(n.p,{children:`| Weight | Value | Usage |
| --- | --- | --- |
| Normal | 400 | Body text |
| Medium | 500 | Emphasized text |
| Semibold | 600 | Headings, buttons |
| Bold | 700 | Strong emphasis |`}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"usage-examples",children:"Usage Examples"}),`
`,e.jsx(n.h3,{id:"in-htmljsx",children:"In HTML/JSX"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<h1>Page Title</h1>
<h2>Section Heading</h2>
<p>This is body text with normal weight.</p>
<p className="mdt-text-sm">This is small text.</p>
<code className="mdt-font-mono">const code = true;</code>
`})}),`
`,e.jsx(n.h3,{id:"with-tailwind-css",children:"With Tailwind CSS"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<div>
  <h1 className="mdt-text-4xl mdt-font-bold">Heading 1</h1>
  <h2 className="mdt-text-3xl mdt-font-semibold">Heading 2</h2>
  <p className="mdt-text-base">Body text</p>
  <p className="mdt-text-sm mdt-text-muted-foreground">Helper text</p>
</div>
`})}),`
`,e.jsx(n.h3,{id:"custom-styles",children:"Custom Styles"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`.custom-heading {
  font-family: var(--mdt-font-sans);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 2.5rem;
}

.code-snippet {
  font-family: var(--mdt-font-mono);
  font-size: 0.875rem;
}
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"responsive-typography",children:"Responsive Typography"}),`
`,e.jsx(n.p,{children:"Font sizes automatically scale on different screen sizes using Tailwind's responsive prefixes:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<h1 className="mdt-text-2xl md:mdt-text-3xl lg:mdt-text-4xl">
  Responsive Heading
</h1>
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsx(n.h3,{id:"do",children:"Do"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use semantic HTML tags (h1, h2, p) for proper structure"}),`
`,e.jsx(n.li,{children:"Maintain consistent hierarchy (don't skip heading levels)"}),`
`,e.jsx(n.li,{children:"Use medium/semibold for emphasis instead of bold"}),`
`,e.jsx(n.li,{children:"Keep line length between 50-75 characters for readability"}),`
`]}),`
`,e.jsx(n.h3,{id:"dont",children:"Don't"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use all caps for long passages of text"}),`
`,e.jsx(n.li,{children:"Stack multiple font weights in the same block"}),`
`,e.jsx(n.li,{children:"Use italic for large amounts of text"}),`
`,e.jsx(n.li,{children:"Override line heights without testing readability"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Contrast:"})," All text meets WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Sizing:"})," Minimum font size is 12px (0.75rem)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Responsive:"})," Text scales appropriately on all devices"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semantic:"})," Use proper HTML tags for screen readers"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"customizing-fonts",children:"Customizing Fonts"}),`
`,e.jsx(n.p,{children:"Consumers can override the default system fonts using CSS variables."}),`
`,e.jsx(n.h3,{id:"option-1-css-variables-recommended",children:"Option 1: CSS Variables (Recommended)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* In your application's global CSS */
:root {
  --mdt-font-sans: 'Inter', 'Poppins', system-ui, sans-serif;
  --mdt-font-mono: 'Fira Code', 'JetBrains Mono', monospace;
}
`})}),`
`,e.jsx(n.h3,{id:"option-2-tailwind-config-override",children:"Option 2: Tailwind Config Override"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// tailwind.config.ts
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
    },
  },
};
`})}),`
`,e.jsx(n.h3,{id:"option-3-css-class-override",children:"Option 3: CSS Class Override"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* Target library components specifically */
.my-app [class*='mdt-'] {
  font-family: 'Your Custom Font', system-ui, sans-serif;
}
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` When using custom fonts, you must load the font files in your application
(via `,e.jsx(n.code,{children:"@font-face"}),", Google Fonts, Adobe Fonts, or self-hosting)."]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"related",children:"Related"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?path=/docs/foundation-colors--docs",children:"Colors"})," - Color system"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?path=/docs/foundation-spacing--docs",children:"Spacing"})," - Spacing tokens"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?path=/docs/foundation-accessibility--docs",children:"Accessibility"})," - Accessibility guidelines"]}),`
`]})]})}function m(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{m as default};
//# sourceMappingURL=Typography-Dxp9rV5X.js.map
