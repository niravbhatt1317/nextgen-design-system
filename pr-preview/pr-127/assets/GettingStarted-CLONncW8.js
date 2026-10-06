import{j as n}from"./iframe-DJRSXhCs.js";import{useMDXComponents as r}from"./index-DqytuWCJ.js";import{M as o}from"./blocks-BCdq1hO3.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DoEZPmhT.js";import"./index-9wR4J5_7.js";function t(s){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Getting Started"}),`
`,n.jsx(e.h1,{id:"getting-started",children:"Getting Started"}),`
`,n.jsx(e.p,{children:"Get up and running with Motadata React Library in just a few minutes."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"prerequisites",children:"Prerequisites"}),`
`,n.jsx(e.p,{children:"Before you begin, ensure you have:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Node.js"})," 22.0 or later"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"React"})," 18.0 or later"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"npm"})," package manager"]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"installation",children:"Installation"}),`
`,n.jsx(e.h3,{id:"step-1-install-the-package",children:"Step 1: Install the Package"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install @mtdt/nextgen-design-system
`})}),`
`,n.jsx(e.h3,{id:"step-2-import-global-styles",children:"Step 2: Import Global Styles"}),`
`,n.jsxs(e.p,{children:["Import the library CSS file in your application entry point (e.g., ",n.jsx(e.code,{children:"main.tsx"})," or ",n.jsx(e.code,{children:"App.tsx"}),"):"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import '@mtdt/nextgen-design-system/styles.css';
`})}),`
`,n.jsxs(e.blockquote,{children:[`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Note:"})," The library uses ",n.jsx(e.strong,{children:"system fonts by default"}),` (San Francisco on Mac, Segoe UI on Windows, etc.)
for optimal performance. No font loading required! If you want to use a custom font,
see `,n.jsx(e.a,{href:"?path=/docs/foundation-typography--docs",children:"Typography"})," for customization options."]}),`
`]}),`
`,n.jsx(e.h3,{id:"step-3-use-components",children:"Step 3: Use Components"}),`
`,n.jsx(e.p,{children:"You are ready to start using components!"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Button, Input, Card } from '@mtdt/nextgen-design-system';

function App() {
  return (
    <Card>
      <h2>Welcome to Motadata</h2>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"tailwind-css-setup-optional-but-recommended",children:"Tailwind CSS Setup (Optional but Recommended)"}),`
`,n.jsx(e.p,{children:"If you are using Tailwind CSS in your project, configure it to work seamlessly with Motadata React Library."}),`
`,n.jsx(e.h3,{id:"1-configure-tailwind",children:"1. Configure Tailwind"}),`
`,n.jsxs(e.p,{children:["Update your ",n.jsx(e.code,{children:"tailwind.config.js"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@mtdt/nextgen-design-system/**/*.{js,ts,jsx,tsx}', // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`})}),`
`,n.jsx(e.h3,{id:"2-extend-the-theme-optional",children:"2. Extend the Theme (Optional)"}),`
`,n.jsx(e.p,{children:"Customize the library design tokens:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#3B82F6',
        foreground: '#FFFFFF',
      },
    },
  },
}
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"theming-with-css-variables",children:"Theming with CSS Variables"}),`
`,n.jsxs(e.p,{children:["Motadata React Library uses CSS variables for theming. All variables use the ",n.jsx(e.code,{children:"--mdt-"})," prefix."]}),`
`,n.jsx(e.h3,{id:"override-colors",children:"Override Colors"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`:root {
  /* Primary colors */
  --mdt-primary: 221.2 83.2% 53.3%;
  --mdt-primary-foreground: 210 40% 98%;

  /* Background colors */
  --mdt-background: 0 0% 100%;
  --mdt-foreground: 222.2 84% 4.9%;
}
`})}),`
`,n.jsx(e.h3,{id:"dark-mode",children:"Dark Mode"}),`
`,n.jsxs(e.p,{children:["Enable dark mode by adding CSS variables for a ",n.jsx(e.code,{children:".dark"})," class:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`.dark {
  --mdt-background: 222.2 84% 4.9%;
  --mdt-foreground: 210 40% 98%;
  --mdt-primary: 217.2 91.2% 59.8%;
}
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"component-naming-convention",children:"Component Naming Convention"}),`
`,n.jsx(e.p,{children:"All components use simple, intuitive names:"}),`
`,n.jsxs(e.p,{children:[`| Component Export Name | Usage              |
| --------------------- | ------------------ |
| `,n.jsx(e.code,{children:"Button"}),"              | ",n.jsx(e.code,{children:"<Button />"}),`       |
| `,n.jsx(e.code,{children:"Input"}),"               | ",n.jsx(e.code,{children:"<Input />"}),`        |
| `,n.jsx(e.code,{children:"Card"}),"                | ",n.jsx(e.code,{children:"<Card />"}),`         |
| `,n.jsx(e.code,{children:"Dialog"}),"              | ",n.jsx(e.code,{children:"<Dialog />"}),`       |
| `,n.jsx(e.code,{children:"DropdownMenu"}),"        | ",n.jsx(e.code,{children:"<DropdownMenu />"})," |"]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"typescript-support",children:"TypeScript Support"}),`
`,n.jsx(e.p,{children:"Motadata React Library is written in TypeScript and provides full type definitions."}),`
`,n.jsx(e.h3,{id:"importing-types",children:"Importing Types"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import type { ButtonProps } from '@mtdt/nextgen-design-system';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
`})}),`
`,n.jsx(e.h3,{id:"type-safety",children:"Type Safety"}),`
`,n.jsx(e.p,{children:"All component props are fully typed:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { Button } from '@mtdt/nextgen-design-system';

// TypeScript will autocomplete and validate props
<Button
  variant="primary"  // Type-checked: "primary" | "secondary" | "outline" | "ghost"
  size="md"          // Type-checked: "sm" | "md" | "lg"
  disabled={false}
/>
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,n.jsx(e.h3,{id:"styles-not-appearing",children:"Styles Not Appearing"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Problem:"})," Components render but have no styles."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Solution:"})," Ensure you have imported the CSS file:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import '@mtdt/nextgen-design-system/styles.css';
`})}),`
`,n.jsx(e.h3,{id:"tailwind-classes-not-working",children:"Tailwind Classes Not Working"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Problem:"})," Tailwind utility classes from the library do not work."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Solution:"})," Add the library to your Tailwind content configuration:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`content: [
  './node_modules/@mtdt/nextgen-design-system/**/*.{js,ts,jsx,tsx}',
],
`})}),`
`,n.jsx(e.h3,{id:"typescript-errors",children:"TypeScript Errors"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Problem:"})," TypeScript cannot find module types."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Solution:"})," Ensure ",n.jsx(e.code,{children:'"moduleResolution": "node"'})," is set in your ",n.jsx(e.code,{children:"tsconfig.json"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-json",children:`{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
`})}),`
`,n.jsx(e.h3,{id:"using-custom-fonts",children:"Using Custom Fonts"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Note:"})," The library uses ",n.jsx(e.strong,{children:"system fonts by default"})," for optimal performance (zero load time, smaller bundle)."]}),`
`,n.jsx(e.p,{children:"If you want to use a custom font like Inter, override the CSS variable:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`:root {
  --mdt-font-sans: 'Inter', system-ui, sans-serif;
}
`})}),`
`,n.jsx(e.p,{children:"Then load the font via Google Fonts, @fontsource, or Next.js font optimization."}),`
`,n.jsxs(e.p,{children:["See ",n.jsx(e.a,{href:"?path=/docs/foundation-typography--docs",children:"Typography"})," for more details on font customization."]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"next-steps",children:"Next Steps"}),`
`,n.jsx(e.p,{children:"Now that you are set up, explore the library:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"?path=/docs/foundation-colors--docs",children:"Learn Design Foundations"})," - Colors, typography, spacing, and more"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"?path=/docs/components-button--docs",children:"See Component Examples"})," - Interactive component demos"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"https://github.com/motadata/@mtdt/nextgen-design-system",rel:"nofollow",children:"View on GitHub"})," - Source code and examples"]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"need-help",children:"Need Help?"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"GitHub Issues:"})," ",n.jsx(e.a,{href:"https://github.com/motadata/@mtdt/nextgen-design-system/issues",rel:"nofollow",children:"Report bugs or request features"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"GitHub Discussions:"})," ",n.jsx(e.a,{href:"https://github.com/motadata/@mtdt/nextgen-design-system/discussions",rel:"nofollow",children:"Ask questions and share ideas"})]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Documentation:"})," Browse this Storybook for comprehensive guides"]}),`
`]})]})}function p(s={}){const{wrapper:e}={...r(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(t,{...s})}):t(s)}export{p as default};
//# sourceMappingURL=GettingStarted-CLONncW8.js.map
