import{j as n}from"./iframe-DZn6zJ_A.js";import{useMDXComponents as t}from"./index-tSo2vsAR.js";import{M as r}from"./blocks-BFaT2grr.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CyeSJejy.js";import"./index-NjEcKSwJ.js";function s(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"Introduction"}),`
`,n.jsx(e.h1,{id:"motadata-react-library",children:"Motadata React Library"}),`
`,n.jsx(e.p,{children:"Welcome to the Motadata React Library documentation. This library provides a set of production-ready, accessible UI components for building SaaS platforms and custom applications."}),`
`,n.jsx(e.h2,{id:"features",children:"Features"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Accessible"})," - Built on Radix UI primitives with full keyboard navigation and screen reader support"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Customizable"})," - Tailwind CSS-based styling with CSS variables for theming"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Type-Safe"})," - Written in TypeScript with strict mode enabled"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Tree-Shakeable"})," - Only import what you need"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Well-Documented"})," - Comprehensive documentation with examples"]}),`
`]}),`
`,n.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install @mtdt/nextgen-design-system
`})}),`
`,n.jsx(e.h2,{id:"quick-start",children:"Quick Start"}),`
`,n.jsx(e.h3,{id:"1-import-styles",children:"1. Import Styles"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import '@mtdt/nextgen-design-system/styles.css';
`})}),`
`,n.jsx(e.h3,{id:"2-load-inter-font",children:"2. Load Inter Font"}),`
`,n.jsxs(e.p,{children:["The library uses ",n.jsx(e.strong,{children:"Inter"})," as the default font. Add it to your HTML head:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
`})}),`
`,n.jsx(e.p,{children:"Or install via npm for self-hosting:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install @fontsource/inter
`})}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// In your app entry point
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
`})}),`
`,n.jsx(e.h3,{id:"3-use-components",children:"3. Use Components"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Button } from '@mtdt/nextgen-design-system';

function App() {
  return <Button variant="primary">Click me</Button>;
}
`})}),`
`,n.jsx(e.h2,{id:"design-principles",children:"Design Principles"}),`
`,n.jsx(e.h3,{id:"accessibility-first",children:"Accessibility First"}),`
`,n.jsx(e.p,{children:"All components are built with accessibility in mind, using Radix UI primitives that handle keyboard navigation, focus management, and ARIA attributes automatically."}),`
`,n.jsx(e.h3,{id:"consistent-styling",children:"Consistent Styling"}),`
`,n.jsxs(e.p,{children:["Components use a consistent design language with CSS variables for easy theming. The ",n.jsx(e.code,{children:"mdt-"})," prefix ensures no conflicts with your existing styles."]}),`
`,n.jsx(e.h3,{id:"typescript-native",children:"TypeScript Native"}),`
`,n.jsx(e.p,{children:"Full TypeScript support with exported types for all component props, ensuring type safety across your application."}),`
`,n.jsx(e.h2,{id:"naming-convention",children:"Naming Convention"}),`
`,n.jsx(e.p,{children:"All components in this library use simple, intuitive names:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Button"})," - Button component"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Input"})," - Input component"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Dialog"})," - Dialog component"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"DropdownMenu"})," - Dropdown menu component"]}),`
`]}),`
`,n.jsx(e.h2,{id:"customization",children:"Customization"}),`
`,n.jsx(e.h3,{id:"css-variables",children:"CSS Variables"}),`
`,n.jsx(e.p,{children:"Override the default theme by setting CSS variables:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`:root {
  --mdt-primary: 221.2 83.2% 53.3%;
  --mdt-primary-foreground: 210 40% 98%;
  /* ... */
}
`})}),`
`,n.jsx(e.h3,{id:"tailwind-integration",children:"Tailwind Integration"}),`
`,n.jsxs(e.p,{children:["If you're using Tailwind CSS in your project, you can extend the library's theme in your ",n.jsx(e.code,{children:"tailwind.config.js"}),"."]})]})}function p(i={}){const{wrapper:e}={...t(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{p as default};
//# sourceMappingURL=Introduction-D7KW-PoU.js.map
