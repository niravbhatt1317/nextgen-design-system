import{j as n}from"./iframe-B4s2k7w1.js";import{useMDXComponents as i}from"./index-BQ7G6jfD.js";import{M as r}from"./blocks-D9BMtwkd.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D9dDYVyu.js";import"./index-Bci4Pf7K.js";function d(s){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"Foundation/Spacing"}),`
`,n.jsx(e.h1,{id:"spacing",children:"Spacing"}),`
`,n.jsx(e.p,{children:"The Motadata spacing system provides consistent spacing throughout the design system based on a 4px grid."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"spacing-scale",children:"Spacing Scale"}),`
`,n.jsx(e.p,{children:"All spacing values are multiples of 4px (0.25rem) for consistency."}),`
`,n.jsxs(e.p,{children:[`| Token | Value (rem) | Value (px) | Usage |
| --- | --- | --- | --- |
| `,n.jsx(e.code,{children:"mdt-0"}),` | 0 | 0px | No spacing |
| `,n.jsx(e.code,{children:"mdt-0.5"}),` | 0.125rem | 2px | Tight spacing |
| `,n.jsx(e.code,{children:"mdt-1"}),` | 0.25rem | 4px | Extra small |
| `,n.jsx(e.code,{children:"mdt-2"}),` | 0.5rem | 8px | Small |
| `,n.jsx(e.code,{children:"mdt-3"}),` | 0.75rem | 12px | Medium small |
| `,n.jsx(e.code,{children:"mdt-4"}),` | 1rem | 16px | Medium |
| `,n.jsx(e.code,{children:"mdt-5"}),` | 1.25rem | 20px | Medium large |
| `,n.jsx(e.code,{children:"mdt-6"}),` | 1.5rem | 24px | Large |
| `,n.jsx(e.code,{children:"mdt-8"}),` | 2rem | 32px | Extra large |
| `,n.jsx(e.code,{children:"mdt-10"}),` | 2.5rem | 40px | 2X large |
| `,n.jsx(e.code,{children:"mdt-12"}),` | 3rem | 48px | 3X large |
| `,n.jsx(e.code,{children:"mdt-16"}),` | 4rem | 64px | 4X large |
| `,n.jsx(e.code,{children:"mdt-20"}),` | 5rem | 80px | 5X large |
| `,n.jsx(e.code,{children:"mdt-24"})," | 6rem | 96px | 6X large |"]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"usage-patterns",children:"Usage Patterns"}),`
`,n.jsx(e.h3,{id:"component-padding",children:"Component Padding"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Compact:"})," ",n.jsx(e.code,{children:"mdt-p-2"})," (8px) - Dense layouts, small components"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Default:"})," ",n.jsx(e.code,{children:"mdt-p-4"})," (16px) - Standard components"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Comfortable:"})," ",n.jsx(e.code,{children:"mdt-p-6"})," (24px) - Cards, containers"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Spacious:"})," ",n.jsx(e.code,{children:"mdt-p-8"})," (32px) - Large sections"]}),`
`]}),`
`,n.jsx(e.h3,{id:"component-margins",children:"Component Margins"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Tight:"})," ",n.jsx(e.code,{children:"mdt-mb-2"})," (8px) - Between related elements"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Standard:"})," ",n.jsx(e.code,{children:"mdt-mb-4"})," (16px) - Between components"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Section:"})," ",n.jsx(e.code,{children:"mdt-mb-8"})," (32px) - Between sections"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Page:"})," ",n.jsx(e.code,{children:"mdt-mb-12"})," (48px) - Between major sections"]}),`
`]}),`
`,n.jsx(e.h3,{id:"gap-gridflex",children:"Gap (Grid/Flex)"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Tight:"})," ",n.jsx(e.code,{children:"mdt-gap-2"})," (8px) - Compact grids"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Default:"})," ",n.jsx(e.code,{children:"mdt-gap-4"})," (16px) - Standard grids"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Comfortable:"})," ",n.jsx(e.code,{children:"mdt-gap-6"})," (24px) - Spacious layouts"]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"usage-examples",children:"Usage Examples"}),`
`,n.jsx(e.h3,{id:"padding",children:"Padding"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Small padding
<div className="mdt-p-2">Compact</div>

// Standard padding
<div className="mdt-p-4">Standard</div>

// Different padding on each side
<div className="mdt-px-4 mdt-py-2">Horizontal 16px, Vertical 8px</div>
`})}),`
`,n.jsx(e.h3,{id:"margin",children:"Margin"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Bottom margin
<div className="mdt-mb-4">Element with bottom margin</div>

// Top and bottom margin
<div className="mdt-my-6">Element with vertical margin</div>

// Negative margin (use sparingly)
<div className="-mdt-mt-2">Negative top margin</div>
`})}),`
`,n.jsx(e.h3,{id:"gap",children:"Gap"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Flex gap
<div className="mdt-flex mdt-gap-4">
  <span>Item 1</span>
  <span>Item 2</span>
</div>

// Grid gap
<div className="mdt-grid mdt-gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"component-spacing-guidelines",children:"Component Spacing Guidelines"}),`
`,n.jsx(e.h3,{id:"buttons",children:"Buttons"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Padding: ",n.jsx(e.code,{children:"mdt-px-4 mdt-py-2"})," (default)"]}),`
`,n.jsxs(e.li,{children:["Gap between buttons: ",n.jsx(e.code,{children:"mdt-gap-2"})," or ",n.jsx(e.code,{children:"mdt-gap-3"})]}),`
`]}),`
`,n.jsx(e.h3,{id:"cards",children:"Cards"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Padding: ",n.jsx(e.code,{children:"mdt-p-6"})," (default)"]}),`
`,n.jsxs(e.li,{children:["Gap between cards: ",n.jsx(e.code,{children:"mdt-gap-4"})," or ",n.jsx(e.code,{children:"mdt-gap-6"})]}),`
`]}),`
`,n.jsx(e.h3,{id:"forms",children:"Forms"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Gap between form fields: ",n.jsx(e.code,{children:"mdt-gap-4"})]}),`
`,n.jsxs(e.li,{children:["Label to input: ",n.jsx(e.code,{children:"mdt-mb-2"})]}),`
`]}),`
`,n.jsx(e.h3,{id:"lists",children:"Lists"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Gap between list items: ",n.jsx(e.code,{children:"mdt-gap-2"})," or ",n.jsx(e.code,{children:"mdt-gap-3"})]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"responsive-spacing",children:"Responsive Spacing"}),`
`,n.jsx(e.p,{children:"Use responsive prefixes to adjust spacing at different breakpoints:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<div className="mdt-p-4 md:mdt-p-6 lg:mdt-p-8">
  Responsive padding: 16px → 24px → 32px
</div>
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"best-practices",children:"Best Practices"}),`
`,n.jsx(e.h3,{id:"do",children:"Do"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Use the spacing scale for consistency"}),`
`,n.jsx(e.li,{children:"Keep spacing consistent within component groups"}),`
`,n.jsx(e.li,{children:"Use larger spacing between unrelated sections"}),`
`,n.jsx(e.li,{children:"Follow the 4px grid system"}),`
`]}),`
`,n.jsx(e.h3,{id:"dont",children:"Don't"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Use arbitrary spacing values"}),`
`,n.jsx(e.li,{children:"Mix different spacing systems"}),`
`,n.jsx(e.li,{children:"Use inconsistent spacing for similar components"}),`
`,n.jsx(e.li,{children:"Overcrowd elements with too little spacing"}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"custom-spacing",children:"Custom Spacing"}),`
`,n.jsxs(e.p,{children:["If you need custom spacing, extend the theme in ",n.jsx(e.code,{children:"tailwind.config.js"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`module.exports = {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
      },
    },
  },
};
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"related",children:"Related"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"?path=/docs/foundation-colors--docs",children:"Colors"})," - Color system"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"?path=/docs/foundation-typography--docs",children:"Typography"})," - Typography scale"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"?path=/docs/foundation-accessibility--docs",children:"Accessibility"})," - Accessibility guidelines"]}),`
`]})]})}function h(s={}){const{wrapper:e}={...i(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(d,{...s})}):d(s)}export{h as default};
//# sourceMappingURL=Spacing-0D4JqDzC.js.map
