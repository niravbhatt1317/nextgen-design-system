import{j as n}from"./iframe-CZ2srKnX.js";import{useMDXComponents as r}from"./index-CI0M5y41.js";import{M as l}from"./blocks-BhRQoNHb.js";import"./preload-helper-Dp1pzeXC.js";import"./index-4XoGJTsG.js";import"./index-B3SZBbxg.js";function s(i){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(l,{title:"Foundation/Accessibility"}),`
`,n.jsx(e.h1,{id:"accessibility",children:"Accessibility"}),`
`,n.jsx(e.p,{children:"Motadata React Library is built with accessibility as a core principle. All components are designed to be WCAG 2.1 AA compliant."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"our-accessibility-commitment",children:"Our Accessibility Commitment"}),`
`,n.jsx(e.p,{children:"We are committed to making our components accessible to everyone, including:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"People using screen readers"}),`
`,n.jsx(e.li,{children:"People using keyboard-only navigation"}),`
`,n.jsx(e.li,{children:"People with visual impairments"}),`
`,n.jsx(e.li,{children:"People with motor disabilities"}),`
`,n.jsx(e.li,{children:"People using assistive technologies"}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"wcag-21-compliance",children:"WCAG 2.1 Compliance"}),`
`,n.jsxs(e.p,{children:["All components meet ",n.jsx(e.strong,{children:"WCAG 2.1 Level AA"})," standards, including:"]}),`
`,n.jsx(e.h3,{id:"perceivable",children:"Perceivable"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)"}),`
`,n.jsx(e.li,{children:"Text alternatives for non-text content"}),`
`,n.jsx(e.li,{children:"Adaptable layouts that work in different orientations"}),`
`,n.jsx(e.li,{children:"Distinguishable content with clear visual hierarchy"}),`
`]}),`
`,n.jsx(e.h3,{id:"operable",children:"Operable"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Full keyboard accessibility"}),`
`,n.jsx(e.li,{children:"Sufficient time for interactions"}),`
`,n.jsx(e.li,{children:"No content that could cause seizures"}),`
`,n.jsx(e.li,{children:"Clear navigation and focus indicators"}),`
`]}),`
`,n.jsx(e.h3,{id:"understandable",children:"Understandable"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Readable and understandable text"}),`
`,n.jsx(e.li,{children:"Predictable component behavior"}),`
`,n.jsx(e.li,{children:"Input assistance and error prevention"}),`
`,n.jsx(e.li,{children:"Clear error messages"}),`
`]}),`
`,n.jsx(e.h3,{id:"robust",children:"Robust"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Compatible with current and future assistive technologies"}),`
`,n.jsx(e.li,{children:"Valid, semantic HTML"}),`
`,n.jsx(e.li,{children:"ARIA attributes when needed"}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,n.jsx(e.p,{children:"All components support full keyboard navigation:"}),`
`,n.jsx(e.p,{children:`| Key           | Action                             |
| ------------- | ---------------------------------- |
| Tab           | Move focus forward                 |
| Shift + Tab   | Move focus backward                |
| Enter / Space | Activate buttons, toggle switches  |
| Escape        | Close dialogs, dismiss menus       |
| Arrow Keys    | Navigate within lists, menus, tabs |
| Home / End    | Jump to first/last item            |`}),`
`,n.jsx(e.h3,{id:"testing-keyboard-navigation",children:"Testing Keyboard Navigation"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`# Try navigating your app without a mouse
# All interactive elements should be:
# 1. Reachable via Tab key
# 2. Have visible focus indicators
# 3. Activate with Enter or Space
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,n.jsx(e.p,{children:"All components include proper ARIA attributes and semantic HTML:"}),`
`,n.jsx(e.h3,{id:"aria-labels",children:"ARIA Labels"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Button with descriptive label
<Button aria-label="Close dialog">
  <X />
</Button>

// Input with associated label
<Input
  id="email"
  aria-describedby="email-help"
  aria-invalid={hasError}
/>
`})}),`
`,n.jsx(e.h3,{id:"live-regions",children:"Live Regions"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Announce dynamic content to screen readers
<div role="status" aria-live="polite">
  Item added to cart
</div>

<div role="alert" aria-live="assertive">
  Error: Please fix the form errors
</div>
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"color-contrast",children:"Color Contrast"}),`
`,n.jsx(e.p,{children:"All color combinations meet WCAG AA standards:"}),`
`,n.jsx(e.h3,{id:"text-contrast",children:"Text Contrast"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Normal text"})," (< 18pt): 4.5:1 minimum"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Large text"})," (≥ 18pt or 14pt bold): 3:1 minimum"]}),`
`]}),`
`,n.jsx(e.h3,{id:"ui-components",children:"UI Components"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Borders, icons, focus indicators"}),": 3:1 minimum"]}),`
`]}),`
`,n.jsx(e.h3,{id:"testing-contrast",children:"Testing Contrast"}),`
`,n.jsx(e.p,{children:"Use browser DevTools or online tools:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Chrome DevTools Contrast Ratio checker"}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://webaim.org/resources/contrastchecker/",rel:"nofollow",children:"WebAIM Contrast Checker"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://www.tpgi.com/color-contrast-checker/",rel:"nofollow",children:"Colour Contrast Analyser"})}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"focus-management",children:"Focus Management"}),`
`,n.jsx(e.h3,{id:"visible-focus-indicators",children:"Visible Focus Indicators"}),`
`,n.jsx(e.p,{children:"All interactive elements have clear focus styles:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`/* Default focus ring */
.mdt-focus-visible:focus-visible {
  outline: 2px solid hsl(var(--mdt-ring));
  outline-offset: 2px;
}
`})}),`
`,n.jsx(e.h3,{id:"focus-trapping",children:"Focus Trapping"}),`
`,n.jsx(e.p,{children:"Dialogs and modals trap focus within them:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// Focus is trapped within dialog
<Dialog>
  <DialogContent>
    {/* Tab cycles through these elements only */}
    <input />
    <button>Save</button>
    <button>Cancel</button>
  </DialogContent>
</Dialog>
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"semantic-html",children:"Semantic HTML"}),`
`,n.jsx(e.p,{children:"We use proper semantic HTML elements:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`// ✅ Good: Semantic button
<button onClick={handleClick}>Click me</button>

// ❌ Bad: Div styled as button
<div onClick={handleClick}>Click me</div>

// ✅ Good: Proper heading hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>

// ✅ Good: Form labels
<label htmlFor="name">Name</label>
<input id="name" />
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"component-specific-accessibility",children:"Component-Specific Accessibility"}),`
`,n.jsx(e.h3,{id:"buttons",children:"Buttons"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Uses ",n.jsx(e.code,{children:"<button>"})," element"]}),`
`,n.jsx(e.li,{children:"Has accessible name (text or aria-label)"}),`
`,n.jsx(e.li,{children:"Disabled state communicated to screen readers"}),`
`,n.jsx(e.li,{children:"Keyboard accessible"}),`
`]}),`
`,n.jsx(e.h3,{id:"inputs",children:"Inputs"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Associated with ",n.jsx(e.code,{children:"<label>"})," using htmlFor/id"]}),`
`,n.jsx(e.li,{children:"Error messages linked with aria-describedby"}),`
`,n.jsx(e.li,{children:"Invalid state indicated with aria-invalid"}),`
`,n.jsx(e.li,{children:"Required fields marked with aria-required"}),`
`]}),`
`,n.jsx(e.h3,{id:"dialogs",children:"Dialogs"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Focus trapped within dialog"}),`
`,n.jsx(e.li,{children:"Escape key closes dialog"}),`
`,n.jsx(e.li,{children:"Focus returns to trigger element on close"}),`
`,n.jsx(e.li,{children:'Proper role="dialog" and aria-modal'}),`
`]}),`
`,n.jsx(e.h3,{id:"dropdown-menus",children:"Dropdown Menus"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Keyboard navigable with arrow keys"}),`
`,n.jsx(e.li,{children:'Proper role="menu" and role="menuitem"'}),`
`,n.jsx(e.li,{children:"Screen reader announcements"}),`
`,n.jsx(e.li,{children:"Focus management"}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"testing-for-accessibility",children:"Testing for Accessibility"}),`
`,n.jsx(e.h3,{id:"automated-testing",children:"Automated Testing"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`# Install axe-core for automated testing
npm install -D @axe-core/react

# Run accessibility tests
npm run test:a11y
`})}),`
`,n.jsx(e.h3,{id:"manual-testing-checklist",children:"Manual Testing Checklist"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"[ ] Navigate entire app using only keyboard"}),`
`,n.jsx(e.li,{children:"[ ] Test with screen reader (NVDA, JAWS, VoiceOver)"}),`
`,n.jsx(e.li,{children:"[ ] Check color contrast with DevTools"}),`
`,n.jsx(e.li,{children:"[ ] Test at 200% zoom level"}),`
`,n.jsx(e.li,{children:"[ ] Test in high contrast mode"}),`
`,n.jsx(e.li,{children:"[ ] Verify all images have alt text"}),`
`,n.jsx(e.li,{children:"[ ] Check form validation errors are announced"}),`
`,n.jsx(e.li,{children:"[ ] Ensure focus indicators are visible"}),`
`]}),`
`,n.jsx(e.h3,{id:"screen-readers",children:"Screen Readers"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Windows:"})," NVDA (free), JAWS"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Mac:"})," VoiceOver (built-in)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Linux:"})," Orca"]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"accessibility-tools",children:"Accessibility Tools"}),`
`,n.jsx(e.h3,{id:"browser-extensions",children:"Browser Extensions"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"axe DevTools"})," - Automated accessibility testing"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"WAVE"})," - Visual feedback on accessibility"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Lighthouse"})," - Accessibility audits in Chrome"]}),`
`]}),`
`,n.jsx(e.h3,{id:"testing-tools",children:"Testing Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Pa11y"})," - Automated accessibility testing"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"jest-axe"})," - Accessibility testing in Jest"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Storybook a11y addon"})," - Built into this Storybook"]}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"common-accessibility-patterns",children:"Common Accessibility Patterns"}),`
`,n.jsx(e.h3,{id:"skip-links",children:"Skip Links"}),`
`,n.jsx(e.p,{children:"Allow keyboard users to skip to main content:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<a href="#main-content" className="skip-link">
  Skip to main content
</a>

<main id="main-content">
  {/* Page content */}
</main>
`})}),`
`,n.jsx(e.h3,{id:"error-messages",children:"Error Messages"}),`
`,n.jsx(e.p,{children:"Announce errors to screen readers:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`<Input
  aria-invalid={hasError}
  aria-describedby={hasError ? "error-message" : undefined}
/>
{hasError && (
  <div id="error-message" role="alert">
    This field is required
  </div>
)}
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"resources",children:"Resources"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://www.w3.org/WAI/WCAG21/quickref/",rel:"nofollow",children:"WCAG 2.1 Guidelines"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://www.radix-ui.com/primitives/docs/overview/accessibility",rel:"nofollow",children:"Radix UI Accessibility"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://webaim.org/",rel:"nofollow",children:"WebAIM"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://www.a11yproject.com/",rel:"nofollow",children:"A11y Project"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility",rel:"nofollow",children:"MDN Accessibility"})}),`
`]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h2,{id:"related",children:"Related"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"?path=/docs/foundation-colors--docs",children:"Colors"})," - Accessible color system"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"?path=/docs/foundation-typography--docs",children:"Typography"})," - Readable typography"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.a,{href:"?path=/docs/catalog--docs",children:"Components"})," - All accessible components"]}),`
`]})]})}function x(i={}){const{wrapper:e}={...r(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{x as default};
//# sourceMappingURL=Accessibility-lpyW1WeG.js.map
