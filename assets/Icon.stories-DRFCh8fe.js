import{j as e,r as I}from"./iframe-BT9_51ib.js";import{r as _e}from"./index-DbEj0LFr.js";import{i as w,I as t}from"./Icon-tBu8Kzh7.js";import"./preload-helper-Dp1pzeXC.js";import"./index-Cz3TE7T9.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";function Je({message:d,onClose:n}){return I.useEffect(()=>{if(d){const o=setTimeout(()=>{n()},2500);return()=>{clearTimeout(o)}}},[d,n]),d?_e.createPortal(e.jsxs("div",{role:"alert","aria-live":"polite",style:{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:99999,display:"flex",alignItems:"center",gap:"8px",padding:"12px 20px",borderRadius:"8px",backgroundColor:"hsl(var(--mdt-success))",color:"hsl(var(--mdt-success-foreground))",fontSize:"14px",fontWeight:500,boxShadow:"var(--mdt-shadow-lg)",animation:"slideDown 0.3s ease-out"},children:[e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M20 6L9 17l-5-5"})}),e.jsx("span",{children:"Copied: "}),e.jsx("code",{style:{backgroundColor:"hsl(var(--mdt-success-foreground) / 0.2)",padding:"2px 8px",borderRadius:"4px",fontFamily:"monospace"},children:d})]}),document.body):null}function Ke(){const[d,n]=I.useState(""),[o,m]=I.useState(null),a=w.filter(s=>s.toLowerCase().includes(d.toLowerCase())),r=async s=>{const S=`<Icon name="${s}" />`;try{await navigator.clipboard.writeText(S),m(S)}catch{console.warn("Clipboard API not available")}},y=()=>{m(null)};return e.jsxs("div",{className:"mdt-w-full mdt-max-w-6xl",children:[e.jsx(Je,{message:o,onClose:y}),e.jsxs("div",{className:"mdt-mb-4 mdt-flex mdt-items-center mdt-gap-4",children:[e.jsxs("div",{className:"mdt-relative mdt-flex-1",children:[e.jsx(t,{name:"search",size:"sm",color:"muted",className:"mdt-absolute mdt-left-3 mdt-top-1/2 mdt--translate-y-1/2","aria-hidden":!0}),e.jsx("input",{type:"text",placeholder:"Search icons...",value:d,onChange:s=>{n(s.target.value)},className:"mdt-h-9 mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-pl-9 mdt-pr-3 mdt-text-sm mdt-text-foreground placeholder:mdt-text-muted-foreground focus:mdt-outline-none focus:mdt-ring-2 focus:mdt-ring-ring","aria-label":"Search icons"})]}),e.jsxs("span",{className:"mdt-whitespace-nowrap mdt-text-sm mdt-text-muted-foreground",children:[a.length," of ",w.length," icons"]})]}),a.length>0?e.jsx("div",{className:"mdt-grid mdt-grid-cols-6 mdt-gap-2 sm:mdt-grid-cols-8 md:mdt-grid-cols-10 lg:mdt-grid-cols-12",children:a.map(s=>e.jsxs("button",{type:"button",onClick:()=>{r(s)},className:"mdt-group mdt-flex mdt-cursor-pointer mdt-flex-col mdt-items-center mdt-gap-1 mdt-rounded-md mdt-border mdt-border-transparent mdt-p-2 mdt-transition-all hover:mdt-border-border hover:mdt-bg-muted",title:`Click to copy: <Icon name="${s}" />`,"aria-label":`Copy ${s} icon code`,children:[e.jsx(t,{name:s,size:"md","aria-hidden":!0}),e.jsx("span",{className:"mdt-w-full mdt-truncate mdt-text-center mdt-text-[10px] mdt-leading-tight mdt-text-muted-foreground",children:s})]},s))}):e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-justify-center mdt-py-12 mdt-text-muted-foreground",children:[e.jsx(t,{name:"search",size:"xl",color:"muted","aria-hidden":!0}),e.jsxs("p",{className:"mdt-mt-2 mdt-text-sm",children:['No icons found for "',d,'"']}),e.jsx("button",{type:"button",onClick:()=>{n("")},className:"mdt-mt-2 mdt-text-sm mdt-text-primary hover:mdt-underline",children:"Clear search"})]})]})}const at={title:"Components/Icon",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A flexible icon component system for custom SVG icons designed by your UX team. No third-party dependencies required. All icons use consistent sizing, colors from the theme system, and support full accessibility.\n\n**Line weight is automatic.** Do not pass `strokeWidth` — the stroke ladder sets it from `size` (1.75 at 16px and under, 1.5 above), because the line you see is `strokeWidth × size / 24` and one number does not give one line across five sizes. See the *Stroke ladder* story."}},controls:{exclude:["class"]}},argTypes:{name:{control:"select",options:w,description:"Name of the icon to display",table:{type:{summary:"IconName"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Size of the icon (or custom number in pixels)",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg | xl | number"}}},color:{control:"select",options:["current","primary","secondary","success","destructive","warning","info","muted","foreground"],description:"Semantic color from the theme",table:{defaultValue:{summary:"current"}}},strokeWidth:{control:"number",description:"Stroke width. **Leave it unset.** The stroke ladder picks it from `size`: 1.75 at 16px and under, 1.5 above. Set it only to override the ladder deliberately — see the *Stroke ladder* story for why one number does not work at every size.",table:{defaultValue:{summary:"the ladder — 1.75 at xs/sm, 1.5 at md/lg/xl"},type:{summary:"number"}}},"aria-label":{control:"text",description:"Accessibility label for screen readers (required if icon conveys meaning)"},"aria-hidden":{control:"boolean",description:"Whether icon is decorative (hidden from screen readers)",table:{defaultValue:{summary:"false"}}},className:{control:"text",description:"Additional CSS classes to apply",table:{type:{summary:"string"}}}}},i={args:{name:"user","aria-label":"User icon"}},c={parameters:{layout:"padded"},render:()=>e.jsx(Ke,{})},l={render:()=>e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"xs","aria-label":"Extra small user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"xs (12px)"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"sm","aria-label":"Small user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"sm (16px)"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"md","aria-label":"Medium user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"md (20px)"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"lg","aria-label":"Large user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"lg (24px)"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"xl","aria-label":"Extra large user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"xl (32px)"})]})]})},x={render:()=>e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"settings",size:18,"aria-label":"18px settings icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"18px"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"settings",size:28,"aria-label":"28px settings icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"28px"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"settings",size:48,"aria-label":"48px settings icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"48px"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"settings",size:64,"aria-label":"64px settings icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"64px"})]})]})},p={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"current","aria-label":"Current color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"current"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"primary","aria-label":"Primary color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"primary"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"secondary","aria-label":"Secondary color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"secondary"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"success","aria-label":"Success color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"success"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"destructive","aria-label":"Destructive color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"destructive"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"warning","aria-label":"Warning color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"warning"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"info","aria-label":"Info color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"info"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"muted","aria-label":"Muted color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"muted"})]})]})},u={parameters:{layout:"padded"},render:()=>{const d=[{size:"xs",px:12,stroke:1.75},{size:"sm",px:16,stroke:1.75},{size:"md",px:20,stroke:1.5},{size:"lg",px:24,stroke:1.5},{size:"xl",px:32,stroke:1.5}],n=["search","settings","calendar","user","check"],o=(m,a)=>e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-8",children:[e.jsx("span",{className:"mdt-w-28 mdt-shrink-0 mdt-text-xs mdt-text-muted-foreground",children:m}),d.map(r=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx("div",{className:"mdt-flex mdt-items-end mdt-gap-3",style:{minHeight:32},children:n.map(y=>e.jsx(t,{name:y,size:r.size,...a===void 0?{}:{strokeWidth:a},"aria-hidden":!0},y))}),e.jsxs("span",{className:"mdt-text-[11px] mdt-text-muted-foreground",children:[r.size," · ",r.px,"px · ",a??r.stroke]})]},r.size))]});return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-8",children:[o("the ladder",void 0),o("flat 1.5",1.5),e.jsxs("div",{className:"mdt-text-xs mdt-text-muted-foreground",children:[e.jsx("p",{className:"mdt-mb-2 mdt-font-medium mdt-text-foreground",children:"Rendered line and peak ink, measured at 1x"}),e.jsxs("table",{className:"mdt-border-collapse",children:[e.jsx("thead",{children:e.jsx("tr",{children:["","12px","16px","20px","24px","32px"].map(m=>e.jsx("th",{className:"mdt-px-3 mdt-py-1 mdt-text-left mdt-font-medium",children:m},m))})}),e.jsx("tbody",{children:[["stroke 2","1.00 / 50%","1.33 / 67%","1.67 / 84%","2.00 / 100%","2.66 / 100%"],["stroke 1.75","0.87 / 44%","1.16 / 58%","1.45 / 73%","1.75 / 87%","2.33 / 100%"],["stroke 1.5","0.75 / 38%","1.00 / 50%","1.25 / 62%","1.50 / 75%","2.00 / 100%"]].map(m=>e.jsx("tr",{children:m.map((a,r)=>e.jsx("td",{className:r===0?"mdt-px-3 mdt-py-1 mdt-font-medium":"mdt-px-3 mdt-py-1",children:a},a))},m[0]))})]})]})]})}},g={render:()=>e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"search",size:"xl",strokeWidth:1,"aria-label":"Thin stroke search icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"strokeWidth: 1"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"search",size:"xl",strokeWidth:2,"aria-label":"Normal stroke search icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"strokeWidth: 2"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"search",size:"xl",strokeWidth:3,"aria-label":"Bold stroke search icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"strokeWidth: 3"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"search",size:"xl",strokeWidth:4,"aria-label":"Extra bold stroke search icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"strokeWidth: 4"})]})]})},f={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("button",{className:"mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90","aria-label":"Add new item",children:[e.jsx(t,{name:"plus",size:"sm","aria-hidden":!0}),"Add Item"]}),e.jsxs("button",{className:"mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-foreground hover:mdt-bg-muted","aria-label":"Search",children:[e.jsx(t,{name:"search",size:"sm","aria-hidden":!0}),"Search"]}),e.jsx("button",{className:"mdt-inline-flex mdt-h-9 mdt-w-9 mdt-items-center mdt-justify-center mdt-rounded-md mdt-bg-destructive mdt-text-destructive-foreground hover:mdt-bg-destructive/90","aria-label":"Close",children:e.jsx(t,{name:"x",size:"sm","aria-hidden":!0})})]})},h={render:()=>e.jsxs("div",{className:"mdt-w-64 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted",children:[e.jsx(t,{name:"home",size:"sm",color:"muted","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"Home"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted",children:[e.jsx(t,{name:"user",size:"sm",color:"muted","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"Profile"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted",children:[e.jsx(t,{name:"settings",size:"sm",color:"muted","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"Settings"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-p-3 hover:mdt-bg-muted",children:[e.jsx(t,{name:"bell",size:"sm",color:"muted","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"Notifications"})]})]})},v={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-success mdt-bg-green-10 mdt-p-3",children:[e.jsx(t,{name:"check",size:"md",color:"success","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-green-80",children:"Operation successful"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-destructive mdt-bg-red-10 mdt-p-3",children:[e.jsx(t,{name:"x",size:"md",color:"destructive","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-red-80",children:"Operation failed"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-warning mdt-bg-orange-10 mdt-p-3",children:[e.jsx(t,{name:"bell",size:"md",color:"warning","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-orange-80",children:"Warning: Check your settings"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-info mdt-bg-blue-10 mdt-p-3",children:[e.jsx(t,{name:"file",size:"md",color:"info","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-blue-80",children:"New file uploaded"})]})]})},b={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsxs("button",{className:"mdt-inline-flex mdt-items-center mdt-gap-2 mdt-rounded-md mdt-p-2 mdt-text-sm mdt-text-foreground hover:mdt-bg-muted","aria-label":"Navigate forward",children:[e.jsx(t,{name:"chevron-right",size:"sm","aria-hidden":!0}),e.jsx("span",{children:"Next Page"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2 mdt-text-sm mdt-text-muted-foreground",children:[e.jsx(t,{name:"home",size:"sm","aria-hidden":!0}),e.jsx("span",{children:"/"}),e.jsx(t,{name:"chevron-right",size:"xs","aria-hidden":!0}),e.jsx("span",{children:"Projects"}),e.jsx(t,{name:"chevron-right",size:"xs","aria-hidden":!0}),e.jsx("span",{children:"Settings"})]})]})},N={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"md","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"The icon here is decorative because the text already conveys the meaning"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"md",color:"success","aria-label":"Completed task"}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"This icon has aria-label because it conveys additional meaning"})]})]})},j={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Custom SVG from URL (src prop)"}),e.jsx("p",{className:"mdt-mb-4 mdt-text-xs mdt-text-muted-foreground",children:"Use the src prop to load SVGs from external URLs or local paths. The icon will be fetched, cached, and rendered with full styling support."}),e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/heart.svg",size:"lg",color:"destructive","aria-label":"Heart icon from CDN"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"CDN URL"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/star.svg",size:"lg",color:"warning","aria-label":"Star icon from CDN"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"CDN URL"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/globe.svg",size:"lg",color:"info","aria-label":"Globe icon from CDN"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"CDN URL"})]})]})]}),e.jsxs("div",{className:"mdt-rounded-lg mdt-border mdt-border-border mdt-bg-muted/30 mdt-p-4",children:[e.jsx("h5",{className:"mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-foreground",children:"Usage Example:"}),e.jsx("pre",{className:"mdt-text-xs mdt-text-muted-foreground",children:`// From CDN
<Icon src="https://cdn.example.com/icon.svg" />

// From local public folder
<Icon src="/icons/custom-icon.svg" />

// With size and color
<Icon src="/icons/logo.svg" size="lg" color="primary" />`})]})]})},k={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Size Variants"}),e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"xs","aria-label":"Extra small rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"xs"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"sm","aria-label":"Small rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"sm"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"md","aria-label":"Medium rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"md"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"lg","aria-label":"Large rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"lg"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"xl","aria-label":"Extra large rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"xl"})]})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Color Variants"}),e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"primary","aria-label":"Primary zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"primary"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"success","aria-label":"Success zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"success"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"destructive","aria-label":"Destructive zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"destructive"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"warning","aria-label":"Warning zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"warning"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"info","aria-label":"Info zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"info"})]})]})]})]})},z={render:()=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:e.jsxs("div",{className:"mdt-rounded-lg mdt-border mdt-border-border mdt-p-4",children:[e.jsx("h4",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Comparison: name prop vs src prop"}),e.jsxs("div",{className:"mdt-grid mdt-grid-cols-2 mdt-gap-8",children:[e.jsxs("div",{children:[e.jsx("h5",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:"Registered Icon (name prop)"}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-bg-muted/50 mdt-p-3",children:[e.jsx(t,{name:"user",size:"lg",color:"primary","aria-label":"Registered user icon"}),e.jsxs("div",{children:[e.jsx("code",{className:"mdt-text-xs",children:'<Icon name="user" />'}),e.jsx("p",{className:"mdt-mt-1 mdt-text-xs mdt-text-muted-foreground",children:"Type-safe, tree-shakeable, instant render"})]})]})]}),e.jsxs("div",{children:[e.jsx("h5",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:"Custom SVG (src prop)"}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-bg-muted/50 mdt-p-3",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/user.svg",size:"lg",color:"primary","aria-label":"Custom user icon from URL"}),e.jsxs("div",{children:[e.jsx("code",{className:"mdt-text-xs",children:'<Icon src="..." />'}),e.jsx("p",{className:"mdt-mt-1 mdt-text-xs mdt-text-muted-foreground",children:"Flexible, dynamic, fetched & cached"})]})]})]})]})]})})};var C,W,L,D,R;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    name: 'user',
    'aria-label': 'User icon'
  }
}`,...(L=(W=i.parameters)==null?void 0:W.docs)==null?void 0:L.source},description:{story:"Default icon with medium size.",...(R=(D=i.parameters)==null?void 0:D.docs)==null?void 0:R.description}}};var U,V,T,E,G;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <IconGalleryComponent />
}`,...(T=(V=c.parameters)==null?void 0:V.docs)==null?void 0:T.source},description:{story:`Icon Gallery - All available icons with search functionality.
Use the search box to find icons by name.`,...(G=(E=c.parameters)==null?void 0:E.docs)==null?void 0:G.description}}};var A,P,F,M,O;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-end mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="xs" aria-label="Extra small user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">xs (12px)</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="sm" aria-label="Small user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">sm (16px)</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="md" aria-label="Medium user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">md (20px)</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="lg" aria-label="Large user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">lg (24px)</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="xl" aria-label="Extra large user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">xl (32px)</span>
      </div>
    </div>
}`,...(F=(P=l.parameters)==null?void 0:P.docs)==null?void 0:F.source},description:{story:"All size variants displayed together.",...(O=(M=l.parameters)==null?void 0:M.docs)==null?void 0:O.description}}};var B,H,q,$,Q;x.parameters={...x.parameters,docs:{...(B=x.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-end mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="settings" size={18} aria-label="18px settings icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">18px</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="settings" size={28} aria-label="28px settings icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">28px</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="settings" size={48} aria-label="48px settings icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">48px</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="settings" size={64} aria-label="64px settings icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">64px</span>
      </div>
    </div>
}`,...(q=(H=x.parameters)==null?void 0:H.docs)==null?void 0:q.source},description:{story:"Custom numeric size (in pixels).",...(Q=($=x.parameters)==null?void 0:$.docs)==null?void 0:Q.description}}};var X,_,J,K,Y;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-wrap mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="current" aria-label="Current color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">current</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="primary" aria-label="Primary color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">primary</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="secondary" aria-label="Secondary color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">secondary</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="success" aria-label="Success color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">success</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="destructive" aria-label="Destructive color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">destructive</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="warning" aria-label="Warning color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">warning</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="info" aria-label="Info color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">info</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="muted" aria-label="Muted color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">muted</span>
      </div>
    </div>
}`,...(J=(_=p.parameters)==null?void 0:_.docs)==null?void 0:J.source},description:{story:"All color variants from the theme system.",...(Y=(K=p.parameters)==null?void 0:K.docs)==null?void 0:Y.description}}};var Z,ee,te,se,de;u.parameters={...u.parameters,docs:{...(Z=u.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => {
    const sizes = [{
      size: 'xs',
      px: 12,
      stroke: 1.75
    }, {
      size: 'sm',
      px: 16,
      stroke: 1.75
    }, {
      size: 'md',
      px: 20,
      stroke: 1.5
    }, {
      size: 'lg',
      px: 24,
      stroke: 1.5
    }, {
      size: 'xl',
      px: 32,
      stroke: 1.5
    }] as const;
    const names = ['search', 'settings', 'calendar', 'user', 'check'] as const;
    const row = (label: string, flat: number | undefined) => <div className="mdt-flex mdt-items-end mdt-gap-8">
        <span className="mdt-w-28 mdt-shrink-0 mdt-text-xs mdt-text-muted-foreground">{label}</span>
        {sizes.map(s => <div key={s.size} className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <div className="mdt-flex mdt-items-end mdt-gap-3" style={{
          minHeight: 32
        }}>
              {names.map(n => <Icon key={n} name={n} size={s.size} {...flat === undefined ? {} : {
            strokeWidth: flat
          }} aria-hidden />)}
            </div>
            <span className="mdt-text-[11px] mdt-text-muted-foreground">
              {s.size} · {s.px}px · {flat ?? s.stroke}
            </span>
          </div>)}
      </div>;
    return <div className="mdt-flex mdt-flex-col mdt-gap-8">
        {row('the ladder', undefined)}
        {row('flat 1.5', 1.5)}
        <div className="mdt-text-xs mdt-text-muted-foreground">
          <p className="mdt-mb-2 mdt-font-medium mdt-text-foreground">
            Rendered line and peak ink, measured at 1x
          </p>
          <table className="mdt-border-collapse">
            <thead>
              <tr>
                {['', '12px', '16px', '20px', '24px', '32px'].map(h => <th key={h} className="mdt-px-3 mdt-py-1 mdt-text-left mdt-font-medium">
                    {h}
                  </th>)}
              </tr>
            </thead>
            <tbody>
              {[['stroke 2', '1.00 / 50%', '1.33 / 67%', '1.67 / 84%', '2.00 / 100%', '2.66 / 100%'], ['stroke 1.75', '0.87 / 44%', '1.16 / 58%', '1.45 / 73%', '1.75 / 87%', '2.33 / 100%'], ['stroke 1.5', '0.75 / 38%', '1.00 / 50%', '1.25 / 62%', '1.50 / 75%', '2.00 / 100%']].map(r => <tr key={r[0]}>
                  {r.map((c, i) => <td key={c} className={i === 0 ? 'mdt-px-3 mdt-py-1 mdt-font-medium' : 'mdt-px-3 mdt-py-1'}>
                      {c}
                    </td>)}
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>;
  }
}`,...(te=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:te.source},description:{story:"Different stroke widths.\n**The stroke ladder — the line weight is automatic, and you should not set it.**\n\nThe artwork is a 24-unit viewBox, so the line a person sees is `strokeWidth × size / 24`.\nOne number for every size therefore does not give one line: a flat 1.5 draws 2px at `xl`\nand 0.75px at `xs`. Measured at 1x, that 0.75px line never exceeds **38% ink** — an icon\nasked for in `neutral-110` arrives at about a third of that contrast.\n\nSo the default steps once: **1.75 at 16px and under, 1.5 above.** The top row is what you\nget for free. The second row is a flat 1.5 at every size, for comparison — look at `xs`\nand `sm`, which is where the console actually lives: table rows, buttons, input affixes.",...(de=(se=u.parameters)==null?void 0:se.docs)==null?void 0:de.description}}};var me,ae,re,ne,oe;g.parameters={...g.parameters,docs:{...(me=g.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-end mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="search" size="xl" strokeWidth={1} aria-label="Thin stroke search icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">strokeWidth: 1</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="search" size="xl" strokeWidth={2} aria-label="Normal stroke search icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">strokeWidth: 2</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="search" size="xl" strokeWidth={3} aria-label="Bold stroke search icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">strokeWidth: 3</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="search" size="xl" strokeWidth={4} aria-label="Extra bold stroke search icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">strokeWidth: 4</span>
      </div>
    </div>
}`,...(re=(ae=g.parameters)==null?void 0:ae.docs)==null?void 0:re.source},description:{story:"**Overriding the ladder.** `strokeWidth` still wins when you pass it, but you are opting out\nof a rule that exists for a measured reason — so have one. Every value here is drawn at `xl`,\nwhere the difference is easiest to see and least consequential.",...(oe=(ne=g.parameters)==null?void 0:ne.docs)==null?void 0:oe.description}}};var ie,ce,le,xe,pe;f.parameters={...f.parameters,docs:{...(ie=f.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <button className="mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90" aria-label="Add new item">
        <Icon name="plus" size="sm" aria-hidden />
        Add Item
      </button>
      <button className="mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-foreground hover:mdt-bg-muted" aria-label="Search">
        <Icon name="search" size="sm" aria-hidden />
        Search
      </button>
      <button className="mdt-inline-flex mdt-h-9 mdt-w-9 mdt-items-center mdt-justify-center mdt-rounded-md mdt-bg-destructive mdt-text-destructive-foreground hover:mdt-bg-destructive/90" aria-label="Close">
        <Icon name="x" size="sm" aria-hidden />
      </button>
    </div>
}`,...(le=(ce=f.parameters)==null?void 0:ce.docs)==null?void 0:le.source},description:{story:"Icons used in buttons.",...(pe=(xe=f.parameters)==null?void 0:xe.docs)==null?void 0:pe.description}}};var ue,ge,fe,he,ve;h.parameters={...h.parameters,docs:{...(ue=h.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-64 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card">
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted">
        <Icon name="home" size="sm" color="muted" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">Home</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted">
        <Icon name="user" size="sm" color="muted" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">Profile</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted">
        <Icon name="settings" size="sm" color="muted" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">Settings</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-p-3 hover:mdt-bg-muted">
        <Icon name="bell" size="sm" color="muted" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">Notifications</span>
      </div>
    </div>
}`,...(fe=(ge=h.parameters)==null?void 0:ge.docs)==null?void 0:fe.source},description:{story:"Icons in list items.",...(ve=(he=h.parameters)==null?void 0:he.docs)==null?void 0:ve.description}}};var be,Ne,je,ke,ze;v.parameters={...v.parameters,docs:{...(be=v.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-success mdt-bg-green-10 mdt-p-3">
        <Icon name="check" size="md" color="success" aria-hidden />
        <span className="mdt-text-sm mdt-text-green-80">Operation successful</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-destructive mdt-bg-red-10 mdt-p-3">
        <Icon name="x" size="md" color="destructive" aria-hidden />
        <span className="mdt-text-sm mdt-text-red-80">Operation failed</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-warning mdt-bg-orange-10 mdt-p-3">
        <Icon name="bell" size="md" color="warning" aria-hidden />
        <span className="mdt-text-sm mdt-text-orange-80">Warning: Check your settings</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-info mdt-bg-blue-10 mdt-p-3">
        <Icon name="file" size="md" color="info" aria-hidden />
        <span className="mdt-text-sm mdt-text-blue-80">New file uploaded</span>
      </div>
    </div>
}`,...(je=(Ne=v.parameters)==null?void 0:Ne.docs)==null?void 0:je.source},description:{story:"Icons with status indicators.",...(ze=(ke=v.parameters)==null?void 0:ke.docs)==null?void 0:ze.description}}};var ye,Ie,we,Se,Ce;b.parameters={...b.parameters,docs:{...(ye=b.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-2">
      <button className="mdt-inline-flex mdt-items-center mdt-gap-2 mdt-rounded-md mdt-p-2 mdt-text-sm mdt-text-foreground hover:mdt-bg-muted" aria-label="Navigate forward">
        <Icon name="chevron-right" size="sm" aria-hidden />
        <span>Next Page</span>
      </button>
      <div className="mdt-flex mdt-items-center mdt-gap-2 mdt-text-sm mdt-text-muted-foreground">
        <Icon name="home" size="sm" aria-hidden />
        <span>/</span>
        <Icon name="chevron-right" size="xs" aria-hidden />
        <span>Projects</span>
        <Icon name="chevron-right" size="xs" aria-hidden />
        <span>Settings</span>
      </div>
    </div>
}`,...(we=(Ie=b.parameters)==null?void 0:Ie.docs)==null?void 0:we.source},description:{story:"Navigation icons with chevron.",...(Ce=(Se=b.parameters)==null?void 0:Se.docs)==null?void 0:Ce.description}}};var We,Le,De,Re,Ue;N.parameters={...N.parameters,docs:{...(We=N.parameters)==null?void 0:We.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-items-center mdt-gap-2">
        <Icon name="user" size="md" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">
          The icon here is decorative because the text already conveys the meaning
        </span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-2">
        <Icon name="check" size="md" color="success" aria-label="Completed task" />
        <span className="mdt-text-sm mdt-text-foreground">
          This icon has aria-label because it conveys additional meaning
        </span>
      </div>
    </div>
}`,...(De=(Le=N.parameters)==null?void 0:Le.docs)==null?void 0:De.source},description:{story:"Decorative icons (aria-hidden for accessibility).",...(Ue=(Re=N.parameters)==null?void 0:Re.docs)==null?void 0:Ue.description}}};var Ve,Te,Ee,Ge,Ae;j.parameters={...j.parameters,docs:{...(Ve=j.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">
          Custom SVG from URL (src prop)
        </h4>
        <p className="mdt-mb-4 mdt-text-xs mdt-text-muted-foreground">
          Use the src prop to load SVGs from external URLs or local paths. The icon will be fetched,
          cached, and rendered with full styling support.
        </p>
        <div className="mdt-flex mdt-items-end mdt-gap-6">
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/heart.svg" size="lg" color="destructive" aria-label="Heart icon from CDN" />
            <span className="mdt-text-xs mdt-text-muted-foreground">CDN URL</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/star.svg" size="lg" color="warning" aria-label="Star icon from CDN" />
            <span className="mdt-text-xs mdt-text-muted-foreground">CDN URL</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/globe.svg" size="lg" color="info" aria-label="Globe icon from CDN" />
            <span className="mdt-text-xs mdt-text-muted-foreground">CDN URL</span>
          </div>
        </div>
      </div>

      <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-bg-muted/30 mdt-p-4">
        <h5 className="mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-foreground">Usage Example:</h5>
        <pre className="mdt-text-xs mdt-text-muted-foreground">
          {\`// From CDN
<Icon src="https://cdn.example.com/icon.svg" />

// From local public folder
<Icon src="/icons/custom-icon.svg" />

// With size and color
<Icon src="/icons/logo.svg" size="lg" color="primary" />\`}
        </pre>
      </div>
    </div>
}`,...(Ee=(Te=j.parameters)==null?void 0:Te.docs)==null?void 0:Ee.source},description:{story:`Custom SVG via src prop.
Load external or custom SVG icons from a URL or path.`,...(Ae=(Ge=j.parameters)==null?void 0:Ge.docs)==null?void 0:Ae.description}}};var Pe,Fe,Me,Oe,Be;k.parameters={...k.parameters,docs:{...(Pe=k.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">Size Variants</h4>
        <div className="mdt-flex mdt-items-end mdt-gap-6">
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/rocket.svg" size="xs" aria-label="Extra small rocket" />
            <span className="mdt-text-xs mdt-text-muted-foreground">xs</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/rocket.svg" size="sm" aria-label="Small rocket" />
            <span className="mdt-text-xs mdt-text-muted-foreground">sm</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/rocket.svg" size="md" aria-label="Medium rocket" />
            <span className="mdt-text-xs mdt-text-muted-foreground">md</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/rocket.svg" size="lg" aria-label="Large rocket" />
            <span className="mdt-text-xs mdt-text-muted-foreground">lg</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/rocket.svg" size="xl" aria-label="Extra large rocket" />
            <span className="mdt-text-xs mdt-text-muted-foreground">xl</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">Color Variants</h4>
        <div className="mdt-flex mdt-flex-wrap mdt-gap-6">
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/zap.svg" size="lg" color="primary" aria-label="Primary zap" />
            <span className="mdt-text-xs mdt-text-muted-foreground">primary</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/zap.svg" size="lg" color="success" aria-label="Success zap" />
            <span className="mdt-text-xs mdt-text-muted-foreground">success</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/zap.svg" size="lg" color="destructive" aria-label="Destructive zap" />
            <span className="mdt-text-xs mdt-text-muted-foreground">destructive</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/zap.svg" size="lg" color="warning" aria-label="Warning zap" />
            <span className="mdt-text-xs mdt-text-muted-foreground">warning</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon src="https://unpkg.com/lucide-static@latest/icons/zap.svg" size="lg" color="info" aria-label="Info zap" />
            <span className="mdt-text-xs mdt-text-muted-foreground">info</span>
          </div>
        </div>
      </div>
    </div>
}`,...(Me=(Fe=k.parameters)==null?void 0:Fe.docs)==null?void 0:Me.source},description:{story:"Custom SVG with different sizes and colors.",...(Be=(Oe=k.parameters)==null?void 0:Oe.docs)==null?void 0:Be.description}}};var He,qe,$e,Qe,Xe;z.parameters={...z.parameters,docs:{...(He=z.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
        <h4 className="mdt-mb-4 mdt-text-sm mdt-font-medium mdt-text-foreground">
          Comparison: name prop vs src prop
        </h4>
        <div className="mdt-grid mdt-grid-cols-2 mdt-gap-8">
          <div>
            <h5 className="mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
              Registered Icon (name prop)
            </h5>
            <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-bg-muted/50 mdt-p-3">
              <Icon name="user" size="lg" color="primary" aria-label="Registered user icon" />
              <div>
                <code className="mdt-text-xs">{\`<Icon name="user" />\`}</code>
                <p className="mdt-mt-1 mdt-text-xs mdt-text-muted-foreground">
                  Type-safe, tree-shakeable, instant render
                </p>
              </div>
            </div>
          </div>
          <div>
            <h5 className="mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
              Custom SVG (src prop)
            </h5>
            <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-bg-muted/50 mdt-p-3">
              <Icon src="https://unpkg.com/lucide-static@latest/icons/user.svg" size="lg" color="primary" aria-label="Custom user icon from URL" />
              <div>
                <code className="mdt-text-xs">{\`<Icon src="..." />\`}</code>
                <p className="mdt-mt-1 mdt-text-xs mdt-text-muted-foreground">
                  Flexible, dynamic, fetched & cached
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...($e=(qe=z.parameters)==null?void 0:qe.docs)==null?void 0:$e.source},description:{story:"Comparison: Registered vs Custom SVG icons side by side.",...(Xe=(Qe=z.parameters)==null?void 0:Qe.docs)==null?void 0:Xe.description}}};const rt=["Default","IconGallery","Sizes","CustomSize","Colors","StrokeLadder","StrokeWidth","InButtons","InListItems","WithStatusColors","Navigation","DecorativeIcons","CustomSvgFromUrl","CustomSvgVariants","RegisteredVsCustom"];export{p as Colors,x as CustomSize,j as CustomSvgFromUrl,k as CustomSvgVariants,N as DecorativeIcons,i as Default,c as IconGallery,f as InButtons,h as InListItems,b as Navigation,z as RegisteredVsCustom,l as Sizes,u as StrokeLadder,g as StrokeWidth,v as WithStatusColors,rt as __namedExportsOrder,at as default};
//# sourceMappingURL=Icon.stories-DRFCh8fe.js.map
