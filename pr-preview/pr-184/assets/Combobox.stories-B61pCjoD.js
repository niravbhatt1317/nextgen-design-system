import{j as r,r as s}from"./iframe-jAzyQdNT.js";import{C as l}from"./Combobox-Brqz2pVR.js";import{I as Vr}from"./Icon-Dn8JtVwC.js";import{B as Cr}from"./Button-BNBvmj0g.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./picked-row-BGnBNViw.js";import"./index-DhIUffZ1.js";import"./index-CwbRmnwU.js";import"./index-PoenCA2M.js";import"./index-D6mwKsNb.js";import"./index-BpAmcwq1.js";import"./index-CGbJKHJD.js";import"./index-C6sCkeEe.js";import"./index-D8Aj-nc_.js";import"./index-Dw9fRhA4.js";import"./index-DjEBRoXU.js";import"./index-D1fp2YC3.js";import"./index-DQvl6Pgx.js";import"./index-5iGiP2t8.js";import"./index-BFTTolwb.js";import"./index-Bo6Ta2qb.js";import"./index-Dle_wG5w.js";import"./Select-DItNVLIi.js";import"./index-BSF09ghm.js";import"./index-BdQq_4o_.js";import"./index-CYnvuXK9.js";import"./index-CjRClCgI.js";import"./index-CJLog4DZ.js";import"./index-DCIgVgY6.js";import"./Input-DkEh6hl9.js";import"./HoverCard-DqQO1rMt.js";import"./Popover-BL6ek257.js";import"./icon-at-drawn-size-BJTw8yf4.js";const ut={title:"Components/Combobox",component:l,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A searchable combobox component with keyboard navigation. Perfect for large datasets where users need to search and filter options. Uses the command palette pattern for optimal UX."}}},argTypes:{variant:{control:"select",options:["default","outline"],description:"Visual style variant",table:{defaultValue:{summary:"default"}}},size:{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},search:{control:"inline-radio",options:["list","field"],description:"Where the typing happens: 'list' - a search box at the top of the open list; 'field' - the field itself (the type-in picker)",table:{defaultValue:{summary:"list"}}},clearable:{control:"boolean",description:"Show clear button when value is selected",table:{defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Disable the combobox",table:{defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Mark the field as required",table:{defaultValue:{summary:"false"}}}},decorators:[e=>r.jsx("div",{className:"mdt-w-[350px]",children:r.jsx(e,{})})]},n=[{value:"react",label:"React",description:"A JavaScript library for building user interfaces"},{value:"vue",label:"Vue",description:"The Progressive JavaScript Framework"},{value:"angular",label:"Angular",description:"Platform for building mobile and desktop web applications"},{value:"svelte",label:"Svelte",description:"Cybernetically enhanced web apps"},{value:"next",label:"Next.js",description:"The React Framework for Production"},{value:"nuxt",label:"Nuxt",description:"The Intuitive Vue Framework"},{value:"remix",label:"Remix",description:"Build Better Websites"},{value:"astro",label:"Astro",description:"Build fast websites, faster"},{value:"solid",label:"SolidJS",description:"Simple and performant reactivity"},{value:"qwik",label:"Qwik",description:"The HTML-first framework"}],u=[{value:"javascript",label:"JavaScript"},{value:"typescript",label:"TypeScript"},{value:"python",label:"Python"},{value:"java",label:"Java"},{value:"csharp",label:"C#"},{value:"go",label:"Go"},{value:"rust",label:"Rust"},{value:"php",label:"PHP"},{value:"ruby",label:"Ruby"},{value:"swift",label:"Swift"}],$=[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"au",label:"Australia"},{value:"de",label:"Germany"},{value:"fr",label:"France"},{value:"in",label:"India"},{value:"jp",label:"Japan"},{value:"cn",label:"China"},{value:"br",label:"Brazil"}],m={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"}],placeholder:"Click to select...",searchPlaceholder:"Search...",label:"Framework Selection"}},p={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:n,placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",label:"Framework"}},h={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:u,label:"Programming Language",helperText:"Choose your preferred programming language",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},g={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:u,label:"Programming Language",required:!0,placeholder:"Select language...",searchPlaceholder:"Search languages..."}},b={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:n,label:"Framework",error:"Please select a framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},v={render:e=>{const[a,t]=s.useState("react");return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:n,label:"Framework",disabled:!0,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},S={render:e=>{const[a,t]=s.useState("react");return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:n,label:"Framework",clearable:!0,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},f={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:u,size:"sm",label:"Small Size",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},x={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:u,size:"md",label:"Medium Size",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},w={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:u,size:"lg",label:"Large Size",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},V={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:n,variant:"outline",label:"Outline Variant",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},y={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:n,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},k={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:[{value:"react",label:"React"},{value:"vue",label:"Vue",disabled:!0},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte",disabled:!0},{value:"next",label:"Next.js"}],label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},C={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:[],label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",emptyMessage:"No frameworks available"}},P={render:e=>{const[a,t]=s.useState("react");return r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(l,{...e,value:a,onValueChange:t}),r.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm",children:[r.jsx("div",{className:"mdt-font-medium",children:"Selected value:"}),r.jsx("div",{className:"mdt-font-mono mdt-text-muted-foreground",children:a||"null"})]})]})},args:{options:n,label:"Framework",clearable:!0,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},j={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:n,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",renderOption:({option:e,selected:a})=>r.jsxs("div",{className:"mdt-flex mdt-w-full mdt-items-center mdt-gap-3",children:[r.jsxs("div",{className:"mdt-flex mdt-flex-1 mdt-flex-col",children:[r.jsx("span",{className:"mdt-font-medium",children:e.label}),e.description&&r.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:e.description})]}),r.jsx("span",{className:"mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center",children:a&&r.jsx(Vr,{name:"check",size:"sm","aria-hidden":!0})})]})}},N={render:e=>{const[a,t]=s.useState("react");return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:n,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",renderValue:e=>r.jsxs("span",{className:"mdt-font-semibold mdt-text-primary",children:["✨ ",e.label]})}},L={render:e=>{const[a,t]=s.useState("react");return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:n,label:"Framework (Custom Trigger)",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",renderTrigger:({selectedOption:e,placeholder:a,open:t,disabled:o})=>r.jsxs(Cr,{variant:"outline",role:"combobox","aria-label":"Select a framework","aria-expanded":t,"aria-controls":"combobox-list",disabled:o,className:"mdt-flex mdt-h-10 mdt-w-full mdt-items-center mdt-justify-between mdt-rounded-lg mdt-border-2 mdt-border-primary mdt-bg-primary/5 mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-transition-colors hover:mdt-bg-primary/10",children:[e?r.jsxs("span",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[r.jsx("span",{className:"mdt-h-2 mdt-w-2 mdt-rounded-full mdt-bg-primary"}),r.jsx("span",{className:"mdt-text-primary",children:e.label})]}):r.jsx("span",{className:"mdt-text-muted-foreground",children:a}),r.jsx(Vr,{name:"chevrons-up-down",size:"sm",color:"primary","aria-hidden":!0})]})}},T={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{options:Array.from({length:100},(e,a)=>({value:`option-${a}`,label:`Option ${a+1}`,description:`Description for option ${a+1}`})),label:"Large Dataset (100 options)",placeholder:"Search from 100 options...",searchPlaceholder:"Type to search..."}},A={render:e=>{var o;const[a,t]=s.useState(null);return r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(l,{...e,value:a,onValueChange:t}),a&&r.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm",children:[r.jsx("div",{className:"mdt-font-medium",children:"Selected country:"}),r.jsx("div",{className:"mdt-font-semibold mdt-text-primary",children:(o=$.find(c=>c.value===a))==null?void 0:o.label})]})]})},args:{options:$,label:"Country",required:!0,clearable:!0,placeholder:"Select your country...",searchPlaceholder:"Search countries...",helperText:"Select the country where you are located"}},z={render:e=>{const[a,t]=s.useState(null),[o,c]=s.useState([]),[i,d]=s.useState(!1);return s.useEffect(()=>{d(!0),setTimeout(()=>{c([{value:"1",label:"User 1",description:"user1@example.com"},{value:"2",label:"User 2",description:"user2@example.com"},{value:"3",label:"User 3",description:"user3@example.com"},{value:"4",label:"User 4",description:"user4@example.com"},{value:"5",label:"User 5",description:"user5@example.com"}]),d(!1)},1500)},[]),r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(l,{...e,options:o,value:a,onValueChange:t}),i&&r.jsx("div",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Loading users from API..."})]})},args:{label:"User (Async Loading)",placeholder:"Select user...",searchPlaceholder:"Search users...",emptyMessage:"Loading users..."}},O={render:e=>{const[a,t]=s.useState(null),[o,c]=s.useState(n),[i,d]=s.useState(!1),yr=E=>{if(!E){c(n);return}d(!0),setTimeout(()=>{const kr=n.filter(U=>{var W;return U.label.toLowerCase().includes(E.toLowerCase())||((W=U.description)==null?void 0:W.toLowerCase().includes(E.toLowerCase()))});c(kr),d(!1)},500)};return r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(l,{...e,options:o,value:a,onValueChange:t,onSearch:yr}),i&&r.jsx("div",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Searching on server..."})]})},args:{label:"Framework (Server-side Search)",placeholder:"Select framework...",searchPlaceholder:"Type to search server...",helperText:"Search is performed on the server"}},F={render:()=>{const[e,a]=s.useState(null),[t,o]=s.useState(null),[c,i]=s.useState(null);return r.jsxs("div",{className:"mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4",children:[r.jsx(l,{options:u,value:e,onValueChange:a,size:"sm",label:"Small",placeholder:"Select language...",searchPlaceholder:"Search..."}),r.jsx(l,{options:u,value:t,onValueChange:o,size:"md",label:"Medium",placeholder:"Select language...",searchPlaceholder:"Search..."}),r.jsx(l,{options:u,value:c,onValueChange:i,size:"lg",label:"Large",placeholder:"Select language...",searchPlaceholder:"Search..."})]})}},D={render:()=>{const[e,a]=s.useState(null),[t,o]=s.useState(null);return r.jsxs("div",{className:"mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4",children:[r.jsx(l,{options:n,value:e,onValueChange:a,variant:"default",label:"Default",placeholder:"Select framework...",searchPlaceholder:"Search..."}),r.jsx(l,{options:n,value:t,onValueChange:o,variant:"outline",label:"Outline",placeholder:"Select framework...",searchPlaceholder:"Search..."})]})}},M={render:e=>{const[a,t]=s.useState(null),[o,c]=s.useState("");return r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(l,{...e,value:a,onValueChange:t,onSearch:i=>{c(i),console.log("Search query:",i)}}),o&&r.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm",children:[r.jsx("div",{className:"mdt-font-medium",children:"Current search:"}),r.jsx("div",{className:"mdt-font-mono mdt-text-muted-foreground",children:o})]})]})},args:{options:n,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Type to search..."}},Pr=[{value:"env:prod",label:"env:prod",description:"1,781 agents"},{value:"env:staging",label:"env:staging",description:"353 agents"},{value:"owner:platform",label:"owner:platform",description:"245 agents"},{value:"pci:in-scope",label:"pci:in-scope",description:"484 agents"},{value:"role:databases",label:"role:databases",description:"352 agents"},{value:"role:edge",label:"role:edge",description:"383 agents"},{value:"role:kubernetes",label:"role:kubernetes",description:"329 agents"},{value:"role:production",label:"role:production",description:"359 agents"},{value:"role:staging",label:"role:staging",description:"353 agents"},{value:"role:web",label:"role:web",description:"358 agents"}],jr=["Asia/Kolkata","Asia/Dubai","Asia/Singapore","Asia/Tokyo","Asia/Shanghai","Asia/Jakarta","Australia/Sydney","Pacific/Auckland","Europe/London","Europe/Berlin","Europe/Paris","Europe/Madrid","Europe/Istanbul","Africa/Johannesburg","Africa/Lagos","America/New_York","America/Chicago","America/Denver","America/Los_Angeles","America/Sao_Paulo"].map(e=>({value:e,label:e})),Nr=["edge","web","db","kube"].flatMap((e,a)=>{const t=32+a;return Array.from({length:100},(o,c)=>{const i=`${e}-${t}-${String(c+1).padStart(4,"0")}`;return{value:i,label:i,description:`10.${t}.0.${c+3}`}})}),R={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{search:"field",size:"sm",options:Pr,label:"Which tag",placeholder:"Type to find a tag",emptyMessage:e=>`No tag matches "${e}"`}},I={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{search:"field",size:"sm",options:jr,label:"Time zone",placeholder:"Type to find a time zone"}},q={render:e=>{const[a,t]=s.useState(null);return r.jsx(l,{...e,value:a,onValueChange:t})},args:{search:"field",size:"sm",options:Nr,label:"Which agent",placeholder:"Type a host name"}};var B,J,Q,_,H;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: [{
      value: 'react',
      label: 'React'
    }, {
      value: 'vue',
      label: 'Vue'
    }, {
      value: 'angular',
      label: 'Angular'
    }],
    placeholder: 'Click to select...',
    searchPlaceholder: 'Search...',
    label: 'Framework Selection'
  }
}`,...(Q=(J=m.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:"Simple selection test with basic options.",...(H=(_=m.parameters)==null?void 0:_.docs)==null?void 0:H.description}}};var G,K,Z,X,Y;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    label: 'Framework'
  }
}`,...(Z=(K=p.parameters)==null?void 0:K.docs)==null?void 0:Z.source},description:{story:"Default combobox example with frameworks (with state management).",...(Y=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Y.description}}};var ee,ae,re,te,se;h.parameters={...h.parameters,docs:{...(ee=h.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    label: 'Programming Language',
    helperText: 'Choose your preferred programming language',
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...'
  }
}`,...(re=(ae=h.parameters)==null?void 0:ae.docs)==null?void 0:re.source},description:{story:"Combobox with a label and helper text.",...(se=(te=h.parameters)==null?void 0:te.docs)==null?void 0:se.description}}};var le,oe,ne,ce,ie;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    label: 'Programming Language',
    required: true,
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...'
  }
}`,...(ne=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:ne.source},description:{story:"Required field with asterisk indicator.",...(ie=(ce=g.parameters)==null?void 0:ce.docs)==null?void 0:ie.description}}};var ue,de,me,pe,he;b.parameters={...b.parameters,docs:{...(ue=b.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    error: 'Please select a framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...'
  }
}`,...(me=(de=b.parameters)==null?void 0:de.docs)==null?void 0:me.source},description:{story:"Combobox with an error state.",...(he=(pe=b.parameters)==null?void 0:pe.docs)==null?void 0:he.description}}};var ge,be,ve,Se,fe;v.parameters={...v.parameters,docs:{...(ge=v.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>('react');
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    disabled: true,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...'
  }
}`,...(ve=(be=v.parameters)==null?void 0:be.docs)==null?void 0:ve.source},description:{story:"Disabled combobox.",...(fe=(Se=v.parameters)==null?void 0:Se.docs)==null?void 0:fe.description}}};var xe,we,Ve,ye,ke;S.parameters={...S.parameters,docs:{...(xe=S.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>('react');
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    clearable: true,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...'
  }
}`,...(Ve=(we=S.parameters)==null?void 0:we.docs)==null?void 0:Ve.source},description:{story:"Combobox with clearable option enabled.",...(ke=(ye=S.parameters)==null?void 0:ye.docs)==null?void 0:ke.description}}};var Ce,Pe,je,Ne,Le;f.parameters={...f.parameters,docs:{...(Ce=f.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    size: 'sm',
    label: 'Small Size',
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...'
  }
}`,...(je=(Pe=f.parameters)==null?void 0:Pe.docs)==null?void 0:je.source},description:{story:"Small size variant.",...(Le=(Ne=f.parameters)==null?void 0:Ne.docs)==null?void 0:Le.description}}};var Te,Ae,ze,Oe,Fe;x.parameters={...x.parameters,docs:{...(Te=x.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    size: 'md',
    label: 'Medium Size',
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...'
  }
}`,...(ze=(Ae=x.parameters)==null?void 0:Ae.docs)==null?void 0:ze.source},description:{story:"Medium size variant (default).",...(Fe=(Oe=x.parameters)==null?void 0:Oe.docs)==null?void 0:Fe.description}}};var De,Me,Re,Ie,qe;w.parameters={...w.parameters,docs:{...(De=w.parameters)==null?void 0:De.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: languages,
    size: 'lg',
    label: 'Large Size',
    placeholder: 'Select language...',
    searchPlaceholder: 'Search languages...'
  }
}`,...(Re=(Me=w.parameters)==null?void 0:Me.docs)==null?void 0:Re.source},description:{story:"Large size variant.",...(qe=(Ie=w.parameters)==null?void 0:Ie.docs)==null?void 0:qe.description}}};var Ee,Ue,We,$e,Be;V.parameters={...V.parameters,docs:{...(Ee=V.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    variant: 'outline',
    label: 'Outline Variant',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...'
  }
}`,...(We=(Ue=V.parameters)==null?void 0:Ue.docs)==null?void 0:We.source},description:{story:"Outline variant style.",...(Be=($e=V.parameters)==null?void 0:$e.docs)==null?void 0:Be.description}}};var Je,Qe,_e,He,Ge;y.parameters={...y.parameters,docs:{...(Je=y.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...'
  }
}`,...(_e=(Qe=y.parameters)==null?void 0:Qe.docs)==null?void 0:_e.source},description:{story:"Combobox with options that have descriptions.",...(Ge=(He=y.parameters)==null?void 0:He.docs)==null?void 0:Ge.description}}};var Ke,Ze,Xe,Ye,ea;k.parameters={...k.parameters,docs:{...(Ke=k.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: [{
      value: 'react',
      label: 'React'
    }, {
      value: 'vue',
      label: 'Vue',
      disabled: true
    }, {
      value: 'angular',
      label: 'Angular'
    }, {
      value: 'svelte',
      label: 'Svelte',
      disabled: true
    }, {
      value: 'next',
      label: 'Next.js'
    }],
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...'
  }
}`,...(Xe=(Ze=k.parameters)==null?void 0:Ze.docs)==null?void 0:Xe.source},description:{story:"Combobox with some disabled options.",...(ea=(Ye=k.parameters)==null?void 0:Ye.docs)==null?void 0:ea.description}}};var aa,ra,ta,sa,la;C.parameters={...C.parameters,docs:{...(aa=C.parameters)==null?void 0:aa.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: [],
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    emptyMessage: 'No frameworks available'
  }
}`,...(ta=(ra=C.parameters)==null?void 0:ra.docs)==null?void 0:ta.source},description:{story:"Empty state when no options are available.",...(la=(sa=C.parameters)==null?void 0:sa.docs)==null?void 0:la.description}}};var oa,na,ca,ia,ua;P.parameters={...P.parameters,docs:{...(oa=P.parameters)==null?void 0:oa.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>('react');
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox {...args} value={value} onValueChange={setValue} />
        <div className="mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm">
          <div className="mdt-font-medium">Selected value:</div>
          <div className="mdt-font-mono mdt-text-muted-foreground">{value || 'null'}</div>
        </div>
      </div>;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    clearable: true,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...'
  }
}`,...(ca=(na=P.parameters)==null?void 0:na.docs)==null?void 0:ca.source},description:{story:"Controlled combobox with state management showing selected value.",...(ua=(ia=P.parameters)==null?void 0:ia.docs)==null?void 0:ua.description}}};var da,ma,pa,ha,ga;j.parameters={...j.parameters,docs:{...(da=j.parameters)==null?void 0:da.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    renderOption: ({
      option,
      selected
    }) => <div className="mdt-flex mdt-w-full mdt-items-center mdt-gap-3">
        <div className="mdt-flex mdt-flex-1 mdt-flex-col">
          <span className="mdt-font-medium">{option.label}</span>
          {option.description && <span className="mdt-text-xs mdt-text-muted-foreground">{option.description}</span>}
        </div>
        <span className="mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center">
          {selected && <Icon name="check" size="sm" aria-hidden />}
        </span>
      </div>
  }
}`,...(pa=(ma=j.parameters)==null?void 0:ma.docs)==null?void 0:pa.source},description:{story:`Custom render function for options: a bolder label over its description. The row around it still wears the one
selection look (Pranjal, 2026-10-21) - the pale ground when picked, the grey one under the pointer - so the custom
part draws only the tick, on the RIGHT in the reading ink, in a slot that stays empty on unpicked rows.`,...(ga=(ha=j.parameters)==null?void 0:ha.docs)==null?void 0:ga.description}}};var ba,va,Sa,fa,xa;N.parameters={...N.parameters,docs:{...(ba=N.parameters)==null?void 0:ba.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>('react');
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    renderValue: option => <span className="mdt-font-semibold mdt-text-primary">✨ {option.label}</span>
  }
}`,...(Sa=(va=N.parameters)==null?void 0:va.docs)==null?void 0:Sa.source},description:{story:"Custom render function for selected value with emoji.",...(xa=(fa=N.parameters)==null?void 0:fa.docs)==null?void 0:xa.description}}};var wa,Va,ya,ka,Ca;L.parameters={...L.parameters,docs:{...(wa=L.parameters)==null?void 0:wa.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>('react');
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: frameworks,
    label: 'Framework (Custom Trigger)',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search frameworks...',
    renderTrigger: ({
      selectedOption,
      placeholder,
      open,
      disabled
    }) => <Button variant="outline" role="combobox" aria-label="Select a framework" aria-expanded={open} aria-controls="combobox-list" disabled={disabled} className="mdt-flex mdt-h-10 mdt-w-full mdt-items-center mdt-justify-between mdt-rounded-lg mdt-border-2 mdt-border-primary mdt-bg-primary/5 mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-transition-colors hover:mdt-bg-primary/10">
        {selectedOption ? <span className="mdt-flex mdt-items-center mdt-gap-2">
            <span className="mdt-h-2 mdt-w-2 mdt-rounded-full mdt-bg-primary" />
            <span className="mdt-text-primary">{selectedOption.label}</span>
          </span> : <span className="mdt-text-muted-foreground">{placeholder}</span>}
        <Icon name="chevrons-up-down" size="sm" color="primary" aria-hidden />
      </Button>
  }
}`,...(ya=(Va=L.parameters)==null?void 0:Va.docs)==null?void 0:ya.source},description:{story:"Custom trigger with badge style.",...(Ca=(ka=L.parameters)==null?void 0:ka.docs)==null?void 0:Ca.description}}};var Pa,ja,Na,La,Ta;T.parameters={...T.parameters,docs:{...(Pa=T.parameters)==null?void 0:Pa.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    options: Array.from({
      length: 100
    }, (_, i) => ({
      value: \`option-\${i}\`,
      label: \`Option \${i + 1}\`,
      description: \`Description for option \${i + 1}\`
    })),
    label: 'Large Dataset (100 options)',
    placeholder: 'Search from 100 options...',
    searchPlaceholder: 'Type to search...'
  }
}`,...(Na=(ja=T.parameters)==null?void 0:ja.docs)==null?void 0:Na.source},description:{story:"Large dataset example showing combobox performance.",...(Ta=(La=T.parameters)==null?void 0:La.docs)==null?void 0:Ta.description}}};var Aa,za,Oa,Fa,Da;A.parameters={...A.parameters,docs:{...(Aa=A.parameters)==null?void 0:Aa.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox {...args} value={value} onValueChange={setValue} />
        {value && <div className="mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm">
            <div className="mdt-font-medium">Selected country:</div>
            <div className="mdt-font-semibold mdt-text-primary">
              {countries.find(c => c.value === value)?.label}
            </div>
          </div>}
      </div>;
  },
  args: {
    options: countries,
    label: 'Country',
    required: true,
    clearable: true,
    placeholder: 'Select your country...',
    searchPlaceholder: 'Search countries...',
    helperText: 'Select the country where you are located'
  }
}`,...(Oa=(za=A.parameters)==null?void 0:za.docs)==null?void 0:Oa.source},description:{story:"Real-world example: Country selector with state display.",...(Da=(Fa=A.parameters)==null?void 0:Fa.docs)==null?void 0:Da.description}}};var Ma,Ra,Ia,qa,Ea;z.parameters={...z.parameters,docs:{...(Ma=z.parameters)==null?void 0:Ma.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    const [options, setOptions] = useState<ComboboxOption[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      // Simulate API call
      setLoading(true);
      setTimeout(() => {
        setOptions([{
          value: '1',
          label: 'User 1',
          description: 'user1@example.com'
        }, {
          value: '2',
          label: 'User 2',
          description: 'user2@example.com'
        }, {
          value: '3',
          label: 'User 3',
          description: 'user3@example.com'
        }, {
          value: '4',
          label: 'User 4',
          description: 'user4@example.com'
        }, {
          value: '5',
          label: 'User 5',
          description: 'user5@example.com'
        }]);
        setLoading(false);
      }, 1500);
    }, []);
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox {...args} options={options} value={value} onValueChange={setValue} />
        {loading && <div className="mdt-text-sm mdt-text-muted-foreground">Loading users from API...</div>}
      </div>;
  },
  args: {
    label: 'User (Async Loading)',
    placeholder: 'Select user...',
    searchPlaceholder: 'Search users...',
    emptyMessage: 'Loading users...'
  }
}`,...(Ia=(Ra=z.parameters)==null?void 0:Ra.docs)==null?void 0:Ia.source},description:{story:"Async data loading from API simulation.",...(Ea=(qa=z.parameters)==null?void 0:qa.docs)==null?void 0:Ea.description}}};var Ua,Wa,$a,Ba,Ja;O.parameters={...O.parameters,docs:{...(Ua=O.parameters)==null?void 0:Ua.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    const [options, setOptions] = useState<ComboboxOption[]>(frameworks);
    const [loading, setLoading] = useState(false);
    const handleSearch = (query: string) => {
      if (!query) {
        setOptions(frameworks);
        return;
      }

      // Simulate API call for server-side filtering
      setLoading(true);
      setTimeout(() => {
        const filtered = frameworks.filter(fw => fw.label.toLowerCase().includes(query.toLowerCase()) || fw.description?.toLowerCase().includes(query.toLowerCase()));
        setOptions(filtered);
        setLoading(false);
      }, 500);
    };
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox {...args} options={options} value={value} onValueChange={setValue} onSearch={handleSearch} />
        {loading && <div className="mdt-text-sm mdt-text-muted-foreground">Searching on server...</div>}
      </div>;
  },
  args: {
    label: 'Framework (Server-side Search)',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Type to search server...',
    helperText: 'Search is performed on the server'
  }
}`,...($a=(Wa=O.parameters)==null?void 0:Wa.docs)==null?void 0:$a.source},description:{story:"Server-side search/filtering example.",...(Ja=(Ba=O.parameters)==null?void 0:Ba.docs)==null?void 0:Ja.description}}};var Qa,_a,Ha,Ga,Ka;F.parameters={...F.parameters,docs:{...(Qa=F.parameters)==null?void 0:Qa.docs,source:{originalSource:`{
  render: () => {
    const [valueSm, setValueSm] = useState<string | null>(null);
    const [valueMd, setValueMd] = useState<string | null>(null);
    const [valueLg, setValueLg] = useState<string | null>(null);
    return <div className="mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4">
        <Combobox options={languages} value={valueSm} onValueChange={setValueSm} size="sm" label="Small" placeholder="Select language..." searchPlaceholder="Search..." />
        <Combobox options={languages} value={valueMd} onValueChange={setValueMd} size="md" label="Medium" placeholder="Select language..." searchPlaceholder="Search..." />
        <Combobox options={languages} value={valueLg} onValueChange={setValueLg} size="lg" label="Large" placeholder="Select language..." searchPlaceholder="Search..." />
      </div>;
  }
}`,...(Ha=(_a=F.parameters)==null?void 0:_a.docs)==null?void 0:Ha.source},description:{story:"All size variants displayed together.",...(Ka=(Ga=F.parameters)==null?void 0:Ga.docs)==null?void 0:Ka.description}}};var Za,Xa,Ya,er,ar;D.parameters={...D.parameters,docs:{...(Za=D.parameters)==null?void 0:Za.docs,source:{originalSource:`{
  render: () => {
    const [valueDefault, setValueDefault] = useState<string | null>(null);
    const [valueOutline, setValueOutline] = useState<string | null>(null);
    return <div className="mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4">
        <Combobox options={frameworks} value={valueDefault} onValueChange={setValueDefault} variant="default" label="Default" placeholder="Select framework..." searchPlaceholder="Search..." />
        <Combobox options={frameworks} value={valueOutline} onValueChange={setValueOutline} variant="outline" label="Outline" placeholder="Select framework..." searchPlaceholder="Search..." />
      </div>;
  }
}`,...(Ya=(Xa=D.parameters)==null?void 0:Xa.docs)==null?void 0:Ya.source},description:{story:"All variants displayed together.",...(ar=(er=D.parameters)==null?void 0:er.docs)==null?void 0:ar.description}}};var rr,tr,sr,lr,or;M.parameters={...M.parameters,docs:{...(rr=M.parameters)==null?void 0:rr.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Combobox {...args} value={value} onValueChange={setValue} onSearch={query => {
        setSearchQuery(query);
        console.log('Search query:', query);
      }} />
        {searchQuery && <div className="mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm">
            <div className="mdt-font-medium">Current search:</div>
            <div className="mdt-font-mono mdt-text-muted-foreground">{searchQuery}</div>
          </div>}
      </div>;
  },
  args: {
    options: frameworks,
    label: 'Framework',
    placeholder: 'Select framework...',
    searchPlaceholder: 'Type to search...'
  }
}`,...(sr=(tr=M.parameters)==null?void 0:tr.docs)==null?void 0:sr.source},description:{story:"Search callback example showing how to handle search events.",...(or=(lr=M.parameters)==null?void 0:lr.docs)==null?void 0:or.description}}};var nr,cr,ir,ur,dr;R.parameters={...R.parameters,docs:{...(nr=R.parameters)==null?void 0:nr.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    search: 'field',
    size: 'sm',
    options: agentTags,
    label: 'Which tag',
    placeholder: 'Type to find a tag',
    emptyMessage: q => \`No tag matches "\${q}"\`
  }
}`,...(ir=(cr=R.parameters)==null?void 0:cr.docs)==null?void 0:ir.source},description:{story:'The type-in picker, two-line options: `search="field"` makes the field itself the search box, so there is one input,\nnot a field plus a second search box inside the list, and the list only shows results. A click or ArrowDown opens\nevery option; typing narrows them (label, value or second line) and lights the first match, so Enter picks it;\nEscape, Tab or a click elsewhere keeps the last pick. Picked, the field reads the name and the detail with a hairline\nbetween - "env:staging | 353 agents". `emptyMessage` can be a function of what was typed.',...(dr=(ur=R.parameters)==null?void 0:ur.docs)==null?void 0:dr.description}}};var mr,pr,hr,gr,br;I.parameters={...I.parameters,docs:{...(mr=I.parameters)==null?void 0:mr.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    search: 'field',
    size: 'sm',
    options: timeZones,
    label: 'Time zone',
    placeholder: 'Type to find a time zone'
  }
}`,...(hr=(pr=I.parameters)==null?void 0:pr.docs)==null?void 0:hr.source},description:{story:'The type-in picker, one-line options: an option with no `description` is the name alone, in the list and in the\nfield once picked ("Asia/Kolkata", no hairline). Reopening shows the whole list again with the pick ticked, its\nname selected in the field so typing replaces it.',...(br=(gr=I.parameters)==null?void 0:gr.docs)==null?void 0:br.description}}};var vr,Sr,fr,xr,wr;q.parameters={...q.parameters,docs:{...(vr=q.parameters)==null?void 0:vr.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <Combobox {...args} value={value} onValueChange={setValue} />;
  },
  args: {
    search: 'field',
    size: 'sm',
    options: agentHosts,
    label: 'Which agent',
    placeholder: 'Type a host name'
  }
}`,...(fr=(Sr=q.parameters)==null?void 0:Sr.docs)==null?void 0:fr.source},description:{story:`The type-in picker on a long list: 400 hosts, each with its address as the second line. Typing a few characters of
the name or the address ("0012", "10.34") narrows the list to a handful; the arrow keys keep the lit row in view.
Picked, the field reads "edge-32-0012 | 10.32.0.14".`,...(wr=(xr=q.parameters)==null?void 0:xr.docs)==null?void 0:wr.description}}};const dt=["DebugSelection","Default","WithLabel","Required","WithError","Disabled","Clearable","SizeSmall","SizeMedium","SizeLarge","VariantOutline","WithDescriptions","WithDisabledOptions","EmptyState","Controlled","CustomRenderOption","CustomRenderValue","CustomTrigger","LargeDataset","CountrySelector","AsyncDataLoading","ServerSideFiltering","AllSizes","AllVariants","WithSearchCallback","TypeInTwoLine","TypeInOneLine","TypeInLongList"];export{F as AllSizes,D as AllVariants,z as AsyncDataLoading,S as Clearable,P as Controlled,A as CountrySelector,j as CustomRenderOption,N as CustomRenderValue,L as CustomTrigger,m as DebugSelection,p as Default,v as Disabled,C as EmptyState,T as LargeDataset,g as Required,O as ServerSideFiltering,w as SizeLarge,x as SizeMedium,f as SizeSmall,q as TypeInLongList,I as TypeInOneLine,R as TypeInTwoLine,V as VariantOutline,y as WithDescriptions,k as WithDisabledOptions,b as WithError,h as WithLabel,M as WithSearchCallback,dt as __namedExportsOrder,ut as default};
//# sourceMappingURL=Combobox.stories-B61pCjoD.js.map
