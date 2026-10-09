import{j as e,r as j}from"./iframe-sI50lGBm.js";import{r as Oe}from"./index-BxhYdNHp.js";import{i as z,I as t}from"./Icon-DZ5W2S0l.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DHmNcZHs.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";function He({message:d,onClose:m}){return j.useEffect(()=>{if(d){const N=setTimeout(()=>{m()},2500);return()=>{clearTimeout(N)}}},[d,m]),d?Oe.createPortal(e.jsxs("div",{role:"alert","aria-live":"polite",style:{position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:99999,display:"flex",alignItems:"center",gap:"8px",padding:"12px 20px",borderRadius:"8px",backgroundColor:"hsl(var(--mdt-success))",color:"hsl(var(--mdt-success-foreground))",fontSize:"14px",fontWeight:500,boxShadow:"var(--mdt-shadow-lg)",animation:"slideDown 0.3s ease-out"},children:[e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M20 6L9 17l-5-5"})}),e.jsx("span",{children:"Copied: "}),e.jsx("code",{style:{backgroundColor:"hsl(var(--mdt-success-foreground) / 0.2)",padding:"2px 8px",borderRadius:"4px",fontFamily:"monospace"},children:d})]}),document.body):null}function $e(){const[d,m]=j.useState(""),[N,k]=j.useState(null),b=z.filter(s=>s.toLowerCase().includes(d.toLowerCase())),Me=async s=>{const y=`<Icon name="${s}" />`;try{await navigator.clipboard.writeText(y),k(y)}catch{console.warn("Clipboard API not available")}},Be=()=>{k(null)};return e.jsxs("div",{className:"mdt-w-full mdt-max-w-6xl",children:[e.jsx(He,{message:N,onClose:Be}),e.jsxs("div",{className:"mdt-mb-4 mdt-flex mdt-items-center mdt-gap-4",children:[e.jsxs("div",{className:"mdt-relative mdt-flex-1",children:[e.jsx(t,{name:"search",size:"sm",color:"muted",className:"mdt-absolute mdt-left-3 mdt-top-1/2 mdt--translate-y-1/2","aria-hidden":!0}),e.jsx("input",{type:"text",placeholder:"Search icons...",value:d,onChange:s=>{m(s.target.value)},className:"mdt-h-9 mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-pl-9 mdt-pr-3 mdt-text-sm mdt-text-foreground placeholder:mdt-text-muted-foreground focus:mdt-outline-none focus:mdt-ring-2 focus:mdt-ring-ring","aria-label":"Search icons"})]}),e.jsxs("span",{className:"mdt-whitespace-nowrap mdt-text-sm mdt-text-muted-foreground",children:[b.length," of ",z.length," icons"]})]}),b.length>0?e.jsx("div",{className:"mdt-grid mdt-grid-cols-6 mdt-gap-2 sm:mdt-grid-cols-8 md:mdt-grid-cols-10 lg:mdt-grid-cols-12",children:b.map(s=>e.jsxs("button",{type:"button",onClick:()=>{Me(s)},className:"mdt-group mdt-flex mdt-cursor-pointer mdt-flex-col mdt-items-center mdt-gap-1 mdt-rounded-md mdt-border mdt-border-transparent mdt-p-2 mdt-transition-all hover:mdt-border-border hover:mdt-bg-muted",title:`Click to copy: <Icon name="${s}" />`,"aria-label":`Copy ${s} icon code`,children:[e.jsx(t,{name:s,size:"md","aria-hidden":!0}),e.jsx("span",{className:"mdt-w-full mdt-truncate mdt-text-center mdt-text-[10px] mdt-leading-tight mdt-text-muted-foreground",children:s})]},s))}):e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-justify-center mdt-py-12 mdt-text-muted-foreground",children:[e.jsx(t,{name:"search",size:"xl",color:"muted","aria-hidden":!0}),e.jsxs("p",{className:"mdt-mt-2 mdt-text-sm",children:['No icons found for "',d,'"']}),e.jsx("button",{type:"button",onClick:()=>{m("")},className:"mdt-mt-2 mdt-text-sm mdt-text-primary hover:mdt-underline",children:"Clear search"})]})]})}const Ze={title:"Components/Icon",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A flexible icon component system for custom SVG icons designed by your UX team. No third-party dependencies required. All icons use consistent sizing, colors from the theme system, and support full accessibility."}},controls:{exclude:["class"]}},argTypes:{name:{control:"select",options:z,description:"Name of the icon to display",table:{type:{summary:"IconName"}}},size:{control:"select",options:["xs","sm","md","lg","xl"],description:"Size of the icon (or custom number in pixels)",table:{defaultValue:{summary:"md"},type:{summary:"xs | sm | md | lg | xl | number"}}},color:{control:"select",options:["current","primary","secondary","success","destructive","warning","info","muted","foreground"],description:"Semantic color from the theme",table:{defaultValue:{summary:"current"}}},strokeWidth:{control:"number",description:"Stroke width of the icon",table:{defaultValue:{summary:"2"}}},"aria-label":{control:"text",description:"Accessibility label for screen readers (required if icon conveys meaning)"},"aria-hidden":{control:"boolean",description:"Whether icon is decorative (hidden from screen readers)",table:{defaultValue:{summary:"false"}}},className:{control:"text",description:"Additional CSS classes to apply",table:{type:{summary:"string"}}}}},a={args:{name:"user","aria-label":"User icon"}},r={parameters:{layout:"padded"},render:()=>e.jsx($e,{})},n={render:()=>e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"xs","aria-label":"Extra small user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"xs (12px)"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"sm","aria-label":"Small user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"sm (16px)"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"md","aria-label":"Medium user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"md (20px)"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"lg","aria-label":"Large user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"lg (24px)"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"xl","aria-label":"Extra large user icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"xl (32px)"})]})]})},c={render:()=>e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"settings",size:18,"aria-label":"18px settings icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"18px"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"settings",size:28,"aria-label":"28px settings icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"28px"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"settings",size:48,"aria-label":"48px settings icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"48px"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"settings",size:64,"aria-label":"64px settings icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"64px"})]})]})},o={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"current","aria-label":"Current color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"current"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"primary","aria-label":"Primary color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"primary"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"secondary","aria-label":"Secondary color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"secondary"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"success","aria-label":"Success color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"success"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"destructive","aria-label":"Destructive color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"destructive"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"warning","aria-label":"Warning color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"warning"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"info","aria-label":"Info color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"info"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"lg",color:"muted","aria-label":"Muted color check icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"muted"})]})]})},i={render:()=>e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"search",size:"xl",strokeWidth:1,"aria-label":"Thin stroke search icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"strokeWidth: 1"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"search",size:"xl",strokeWidth:2,"aria-label":"Normal stroke search icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"strokeWidth: 2"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"search",size:"xl",strokeWidth:3,"aria-label":"Bold stroke search icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"strokeWidth: 3"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"search",size:"xl",strokeWidth:4,"aria-label":"Extra bold stroke search icon"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"strokeWidth: 4"})]})]})},l={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("button",{className:"mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90","aria-label":"Add new item",children:[e.jsx(t,{name:"plus",size:"sm","aria-hidden":!0}),"Add Item"]}),e.jsxs("button",{className:"mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-foreground hover:mdt-bg-muted","aria-label":"Search",children:[e.jsx(t,{name:"search",size:"sm","aria-hidden":!0}),"Search"]}),e.jsx("button",{className:"mdt-inline-flex mdt-h-9 mdt-w-9 mdt-items-center mdt-justify-center mdt-rounded-md mdt-bg-destructive mdt-text-destructive-foreground hover:mdt-bg-destructive/90","aria-label":"Close",children:e.jsx(t,{name:"x",size:"sm","aria-hidden":!0})})]})},x={render:()=>e.jsxs("div",{className:"mdt-w-64 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted",children:[e.jsx(t,{name:"home",size:"sm",color:"muted","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"Home"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted",children:[e.jsx(t,{name:"user",size:"sm",color:"muted","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"Profile"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted",children:[e.jsx(t,{name:"settings",size:"sm",color:"muted","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"Settings"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-p-3 hover:mdt-bg-muted",children:[e.jsx(t,{name:"bell",size:"sm",color:"muted","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"Notifications"})]})]})},p={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-success mdt-bg-green-10 mdt-p-3",children:[e.jsx(t,{name:"check",size:"md",color:"success","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-green-80",children:"Operation successful"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-destructive mdt-bg-red-10 mdt-p-3",children:[e.jsx(t,{name:"x",size:"md",color:"destructive","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-red-80",children:"Operation failed"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-warning mdt-bg-orange-10 mdt-p-3",children:[e.jsx(t,{name:"bell",size:"md",color:"warning","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-orange-80",children:"Warning: Check your settings"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-info mdt-bg-blue-10 mdt-p-3",children:[e.jsx(t,{name:"file",size:"md",color:"info","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-blue-80",children:"New file uploaded"})]})]})},u={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsxs("button",{className:"mdt-inline-flex mdt-items-center mdt-gap-2 mdt-rounded-md mdt-p-2 mdt-text-sm mdt-text-foreground hover:mdt-bg-muted","aria-label":"Navigate forward",children:[e.jsx(t,{name:"chevron-right",size:"sm","aria-hidden":!0}),e.jsx("span",{children:"Next Page"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2 mdt-text-sm mdt-text-muted-foreground",children:[e.jsx(t,{name:"home",size:"sm","aria-hidden":!0}),e.jsx("span",{children:"/"}),e.jsx(t,{name:"chevron-right",size:"xs","aria-hidden":!0}),e.jsx("span",{children:"Projects"}),e.jsx(t,{name:"chevron-right",size:"xs","aria-hidden":!0}),e.jsx("span",{children:"Settings"})]})]})},g={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"user",size:"md","aria-hidden":!0}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"The icon here is decorative because the text already conveys the meaning"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(t,{name:"check",size:"md",color:"success","aria-label":"Completed task"}),e.jsx("span",{className:"mdt-text-sm mdt-text-foreground",children:"This icon has aria-label because it conveys additional meaning"})]})]})},f={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Custom SVG from URL (src prop)"}),e.jsx("p",{className:"mdt-mb-4 mdt-text-xs mdt-text-muted-foreground",children:"Use the src prop to load SVGs from external URLs or local paths. The icon will be fetched, cached, and rendered with full styling support."}),e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/heart.svg",size:"lg",color:"destructive","aria-label":"Heart icon from CDN"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"CDN URL"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/star.svg",size:"lg",color:"warning","aria-label":"Star icon from CDN"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"CDN URL"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/globe.svg",size:"lg",color:"info","aria-label":"Globe icon from CDN"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"CDN URL"})]})]})]}),e.jsxs("div",{className:"mdt-rounded-lg mdt-border mdt-border-border mdt-bg-muted/30 mdt-p-4",children:[e.jsx("h5",{className:"mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-foreground",children:"Usage Example:"}),e.jsx("pre",{className:"mdt-text-xs mdt-text-muted-foreground",children:`// From CDN
<Icon src="https://cdn.example.com/icon.svg" />

// From local public folder
<Icon src="/icons/custom-icon.svg" />

// With size and color
<Icon src="/icons/logo.svg" size="lg" color="primary" />`})]})]})},h={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Size Variants"}),e.jsxs("div",{className:"mdt-flex mdt-items-end mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"xs","aria-label":"Extra small rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"xs"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"sm","aria-label":"Small rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"sm"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"md","aria-label":"Medium rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"md"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"lg","aria-label":"Large rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"lg"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/rocket.svg",size:"xl","aria-label":"Extra large rocket"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"xl"})]})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Color Variants"}),e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"primary","aria-label":"Primary zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"primary"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"success","aria-label":"Success zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"success"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"destructive","aria-label":"Destructive zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"destructive"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"warning","aria-label":"Warning zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"warning"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/zap.svg",size:"lg",color:"info","aria-label":"Info zap"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"info"})]})]})]})]})},v={render:()=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:e.jsxs("div",{className:"mdt-rounded-lg mdt-border mdt-border-border mdt-p-4",children:[e.jsx("h4",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Comparison: name prop vs src prop"}),e.jsxs("div",{className:"mdt-grid mdt-grid-cols-2 mdt-gap-8",children:[e.jsxs("div",{children:[e.jsx("h5",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:"Registered Icon (name prop)"}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-bg-muted/50 mdt-p-3",children:[e.jsx(t,{name:"user",size:"lg",color:"primary","aria-label":"Registered user icon"}),e.jsxs("div",{children:[e.jsx("code",{className:"mdt-text-xs",children:'<Icon name="user" />'}),e.jsx("p",{className:"mdt-mt-1 mdt-text-xs mdt-text-muted-foreground",children:"Type-safe, tree-shakeable, instant render"})]})]})]}),e.jsxs("div",{children:[e.jsx("h5",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:"Custom SVG (src prop)"}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-bg-muted/50 mdt-p-3",children:[e.jsx(t,{src:"https://unpkg.com/lucide-static@latest/icons/user.svg",size:"lg",color:"primary","aria-label":"Custom user icon from URL"}),e.jsxs("div",{children:[e.jsx("code",{className:"mdt-text-xs",children:'<Icon src="..." />'}),e.jsx("p",{className:"mdt-mt-1 mdt-text-xs mdt-text-muted-foreground",children:"Flexible, dynamic, fetched & cached"})]})]})]})]})]})})};var I,C,S,w,W;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    name: 'user',
    'aria-label': 'User icon'
  }
}`,...(S=(C=a.parameters)==null?void 0:C.docs)==null?void 0:S.source},description:{story:"Default icon with medium size.",...(W=(w=a.parameters)==null?void 0:w.docs)==null?void 0:W.description}}};var D,L,R,U,V;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <IconGalleryComponent />
}`,...(R=(L=r.parameters)==null?void 0:L.docs)==null?void 0:R.source},description:{story:`Icon Gallery - All available icons with search functionality.
Use the search box to find icons by name.`,...(V=(U=r.parameters)==null?void 0:U.docs)==null?void 0:V.description}}};var G,E,T,A,P;n.parameters={...n.parameters,docs:{...(G=n.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(T=(E=n.parameters)==null?void 0:E.docs)==null?void 0:T.source},description:{story:"All size variants displayed together.",...(P=(A=n.parameters)==null?void 0:A.docs)==null?void 0:P.description}}};var F,M,B,O,H;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(B=(M=c.parameters)==null?void 0:M.docs)==null?void 0:B.source},description:{story:"Custom numeric size (in pixels).",...(H=(O=c.parameters)==null?void 0:O.docs)==null?void 0:H.description}}};var $,q,Q,X,_;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(Q=(q=o.parameters)==null?void 0:q.docs)==null?void 0:Q.source},description:{story:"All color variants from the theme system.",...(_=(X=o.parameters)==null?void 0:X.docs)==null?void 0:_.description}}};var J,K,Y,Z,ee;i.parameters={...i.parameters,docs:{...(J=i.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(Y=(K=i.parameters)==null?void 0:K.docs)==null?void 0:Y.source},description:{story:"Different stroke widths.",...(ee=(Z=i.parameters)==null?void 0:Z.docs)==null?void 0:ee.description}}};var te,se,de,me,ae;l.parameters={...l.parameters,docs:{...(te=l.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(de=(se=l.parameters)==null?void 0:se.docs)==null?void 0:de.source},description:{story:"Icons used in buttons.",...(ae=(me=l.parameters)==null?void 0:me.docs)==null?void 0:ae.description}}};var re,ne,ce,oe,ie;x.parameters={...x.parameters,docs:{...(re=x.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(ce=(ne=x.parameters)==null?void 0:ne.docs)==null?void 0:ce.source},description:{story:"Icons in list items.",...(ie=(oe=x.parameters)==null?void 0:oe.docs)==null?void 0:ie.description}}};var le,xe,pe,ue,ge;p.parameters={...p.parameters,docs:{...(le=p.parameters)==null?void 0:le.docs,source:{originalSource:`{
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
}`,...(pe=(xe=p.parameters)==null?void 0:xe.docs)==null?void 0:pe.source},description:{story:"Icons with status indicators.",...(ge=(ue=p.parameters)==null?void 0:ue.docs)==null?void 0:ge.description}}};var fe,he,ve,Ne,be;u.parameters={...u.parameters,docs:{...(fe=u.parameters)==null?void 0:fe.docs,source:{originalSource:`{
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
}`,...(ve=(he=u.parameters)==null?void 0:he.docs)==null?void 0:ve.source},description:{story:"Navigation icons with chevron.",...(be=(Ne=u.parameters)==null?void 0:Ne.docs)==null?void 0:be.description}}};var je,ze,ke,ye,Ie;g.parameters={...g.parameters,docs:{...(je=g.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
}`,...(ke=(ze=g.parameters)==null?void 0:ze.docs)==null?void 0:ke.source},description:{story:"Decorative icons (aria-hidden for accessibility).",...(Ie=(ye=g.parameters)==null?void 0:ye.docs)==null?void 0:Ie.description}}};var Ce,Se,we,We,De;f.parameters={...f.parameters,docs:{...(Ce=f.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
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
}`,...(we=(Se=f.parameters)==null?void 0:Se.docs)==null?void 0:we.source},description:{story:`Custom SVG via src prop.
Load external or custom SVG icons from a URL or path.`,...(De=(We=f.parameters)==null?void 0:We.docs)==null?void 0:De.description}}};var Le,Re,Ue,Ve,Ge;h.parameters={...h.parameters,docs:{...(Le=h.parameters)==null?void 0:Le.docs,source:{originalSource:`{
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
}`,...(Ue=(Re=h.parameters)==null?void 0:Re.docs)==null?void 0:Ue.source},description:{story:"Custom SVG with different sizes and colors.",...(Ge=(Ve=h.parameters)==null?void 0:Ve.docs)==null?void 0:Ge.description}}};var Ee,Te,Ae,Pe,Fe;v.parameters={...v.parameters,docs:{...(Ee=v.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(Ae=(Te=v.parameters)==null?void 0:Te.docs)==null?void 0:Ae.source},description:{story:"Comparison: Registered vs Custom SVG icons side by side.",...(Fe=(Pe=v.parameters)==null?void 0:Pe.docs)==null?void 0:Fe.description}}};const et=["Default","IconGallery","Sizes","CustomSize","Colors","StrokeWidth","InButtons","InListItems","WithStatusColors","Navigation","DecorativeIcons","CustomSvgFromUrl","CustomSvgVariants","RegisteredVsCustom"];export{o as Colors,c as CustomSize,f as CustomSvgFromUrl,h as CustomSvgVariants,g as DecorativeIcons,a as Default,r as IconGallery,l as InButtons,x as InListItems,u as Navigation,v as RegisteredVsCustom,n as Sizes,i as StrokeWidth,p as WithStatusColors,et as __namedExportsOrder,Ze as default};
//# sourceMappingURL=Icon.stories-CX9r9yKq.js.map
