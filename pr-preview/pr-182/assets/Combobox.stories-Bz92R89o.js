import{j as a,r as l}from"./iframe-CvNoFiz2.js";import{C as s}from"./Combobox-WBKDKQ_s.js";import{I as lr}from"./Icon-BD0YnmWv.js";import{B as nr}from"./Button-BatjGhd1.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./picked-row-BGnBNViw.js";import"./index-DrXcw4uj.js";import"./index-Boj9kjU1.js";import"./index-CisqQ8p0.js";import"./index-D4VC4XHm.js";import"./index-CaRK-U8F.js";import"./index-Bkyk5XED.js";import"./index-CBdhtf3v.js";import"./index-DtKrpRQK.js";import"./index-Cd82tuvN.js";import"./index-DCqWoTEq.js";import"./index-CFm2NAtb.js";import"./index-D_ugx0NM.js";import"./index-DmC6tL5e.js";import"./index-MX_dvxQD.js";import"./index-B8kgf7iT.js";import"./index-DwsVGyiN.js";import"./icon-at-drawn-size-CHRYBTjY.js";const Tr={title:"Components/Combobox",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A searchable combobox component with keyboard navigation. Perfect for large datasets where users need to search and filter options. Uses the command palette pattern for optimal UX."}}},argTypes:{variant:{control:"select",options:["default","outline"],description:"Visual style variant",table:{defaultValue:{summary:"default"}}},size:{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},clearable:{control:"boolean",description:"Show clear button when value is selected",table:{defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Disable the combobox",table:{defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Mark the field as required",table:{defaultValue:{summary:"false"}}}},decorators:[e=>a.jsx("div",{className:"mdt-w-[350px]",children:a.jsx(e,{})})]},o=[{value:"react",label:"React",description:"A JavaScript library for building user interfaces"},{value:"vue",label:"Vue",description:"The Progressive JavaScript Framework"},{value:"angular",label:"Angular",description:"Platform for building mobile and desktop web applications"},{value:"svelte",label:"Svelte",description:"Cybernetically enhanced web apps"},{value:"next",label:"Next.js",description:"The React Framework for Production"},{value:"nuxt",label:"Nuxt",description:"The Intuitive Vue Framework"},{value:"remix",label:"Remix",description:"Build Better Websites"},{value:"astro",label:"Astro",description:"Build fast websites, faster"},{value:"solid",label:"SolidJS",description:"Simple and performant reactivity"},{value:"qwik",label:"Qwik",description:"The HTML-first framework"}],d=[{value:"javascript",label:"JavaScript"},{value:"typescript",label:"TypeScript"},{value:"python",label:"Python"},{value:"java",label:"Java"},{value:"csharp",label:"C#"},{value:"go",label:"Go"},{value:"rust",label:"Rust"},{value:"php",label:"PHP"},{value:"ruby",label:"Ruby"},{value:"swift",label:"Swift"}],I=[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"au",label:"Australia"},{value:"de",label:"Germany"},{value:"fr",label:"France"},{value:"in",label:"India"},{value:"jp",label:"Japan"},{value:"cn",label:"China"},{value:"br",label:"Brazil"}],m={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"}],placeholder:"Click to select...",searchPlaceholder:"Search...",label:"Framework Selection"}},p={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:o,placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",label:"Framework"}},g={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:d,label:"Programming Language",helperText:"Choose your preferred programming language",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},h={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:d,label:"Programming Language",required:!0,placeholder:"Select language...",searchPlaceholder:"Search languages..."}},b={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:o,label:"Framework",error:"Please select a framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},v={render:e=>{const[r,t]=l.useState("react");return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:o,label:"Framework",disabled:!0,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},S={render:e=>{const[r,t]=l.useState("react");return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:o,label:"Framework",clearable:!0,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},f={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:d,size:"sm",label:"Small Size",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},x={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:d,size:"md",label:"Medium Size",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},w={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:d,size:"lg",label:"Large Size",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},V={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:o,variant:"outline",label:"Outline Variant",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},C={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:o,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},k={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:[{value:"react",label:"React"},{value:"vue",label:"Vue",disabled:!0},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte",disabled:!0},{value:"next",label:"Next.js"}],label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},y={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:[],label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",emptyMessage:"No frameworks available"}},j={render:e=>{const[r,t]=l.useState("react");return a.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[a.jsx(s,{...e,value:r,onValueChange:t}),a.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm",children:[a.jsx("div",{className:"mdt-font-medium",children:"Selected value:"}),a.jsx("div",{className:"mdt-font-mono mdt-text-muted-foreground",children:r||"null"})]})]})},args:{options:o,label:"Framework",clearable:!0,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},P={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:o,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",renderOption:({option:e,selected:r})=>a.jsxs("div",{className:"mdt-flex mdt-w-full mdt-items-center mdt-gap-3",children:[a.jsxs("div",{className:"mdt-flex mdt-flex-1 mdt-flex-col",children:[a.jsx("span",{className:"mdt-font-medium",children:e.label}),e.description&&a.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:e.description})]}),a.jsx("span",{className:"mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center",children:r&&a.jsx(lr,{name:"check",size:"sm","aria-hidden":!0})})]})}},N={render:e=>{const[r,t]=l.useState("react");return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:o,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",renderValue:e=>a.jsxs("span",{className:"mdt-font-semibold mdt-text-primary",children:["✨ ",e.label]})}},L={render:e=>{const[r,t]=l.useState("react");return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:o,label:"Framework (Custom Trigger)",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",renderTrigger:({selectedOption:e,placeholder:r,open:t,disabled:n})=>a.jsxs(nr,{variant:"outline",role:"combobox","aria-label":"Select a framework","aria-expanded":t,"aria-controls":"combobox-list",disabled:n,className:"mdt-flex mdt-h-10 mdt-w-full mdt-items-center mdt-justify-between mdt-rounded-lg mdt-border-2 mdt-border-primary mdt-bg-primary/5 mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-transition-colors hover:mdt-bg-primary/10",children:[e?a.jsxs("span",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[a.jsx("span",{className:"mdt-h-2 mdt-w-2 mdt-rounded-full mdt-bg-primary"}),a.jsx("span",{className:"mdt-text-primary",children:e.label})]}):a.jsx("span",{className:"mdt-text-muted-foreground",children:r}),a.jsx(lr,{name:"chevrons-up-down",size:"sm",color:"primary","aria-hidden":!0})]})}},z={render:e=>{const[r,t]=l.useState(null);return a.jsx(s,{...e,value:r,onValueChange:t})},args:{options:Array.from({length:100},(e,r)=>({value:`option-${r}`,label:`Option ${r+1}`,description:`Description for option ${r+1}`})),label:"Large Dataset (100 options)",placeholder:"Search from 100 options...",searchPlaceholder:"Type to search..."}},F={render:e=>{var n;const[r,t]=l.useState(null);return a.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[a.jsx(s,{...e,value:r,onValueChange:t}),r&&a.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm",children:[a.jsx("div",{className:"mdt-font-medium",children:"Selected country:"}),a.jsx("div",{className:"mdt-font-semibold mdt-text-primary",children:(n=I.find(c=>c.value===r))==null?void 0:n.label})]})]})},args:{options:I,label:"Country",required:!0,clearable:!0,placeholder:"Select your country...",searchPlaceholder:"Search countries...",helperText:"Select the country where you are located"}},O={render:e=>{const[r,t]=l.useState(null),[n,c]=l.useState([]),[u,i]=l.useState(!1);return l.useEffect(()=>{i(!0),setTimeout(()=>{c([{value:"1",label:"User 1",description:"user1@example.com"},{value:"2",label:"User 2",description:"user2@example.com"},{value:"3",label:"User 3",description:"user3@example.com"},{value:"4",label:"User 4",description:"user4@example.com"},{value:"5",label:"User 5",description:"user5@example.com"}]),i(!1)},1500)},[]),a.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[a.jsx(s,{...e,options:n,value:r,onValueChange:t}),u&&a.jsx("div",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Loading users from API..."})]})},args:{label:"User (Async Loading)",placeholder:"Select user...",searchPlaceholder:"Search users...",emptyMessage:"Loading users..."}},T={render:e=>{const[r,t]=l.useState(null),[n,c]=l.useState(o),[u,i]=l.useState(!1),sr=R=>{if(!R){c(o);return}i(!0),setTimeout(()=>{const or=o.filter(q=>{var U;return q.label.toLowerCase().includes(R.toLowerCase())||((U=q.description)==null?void 0:U.toLowerCase().includes(R.toLowerCase()))});c(or),i(!1)},500)};return a.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[a.jsx(s,{...e,options:n,value:r,onValueChange:t,onSearch:sr}),u&&a.jsx("div",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Searching on server..."})]})},args:{label:"Framework (Server-side Search)",placeholder:"Select framework...",searchPlaceholder:"Type to search server...",helperText:"Search is performed on the server"}},D={render:()=>{const[e,r]=l.useState(null),[t,n]=l.useState(null),[c,u]=l.useState(null);return a.jsxs("div",{className:"mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4",children:[a.jsx(s,{options:d,value:e,onValueChange:r,size:"sm",label:"Small",placeholder:"Select language...",searchPlaceholder:"Search..."}),a.jsx(s,{options:d,value:t,onValueChange:n,size:"md",label:"Medium",placeholder:"Select language...",searchPlaceholder:"Search..."}),a.jsx(s,{options:d,value:c,onValueChange:u,size:"lg",label:"Large",placeholder:"Select language...",searchPlaceholder:"Search..."})]})}},A={render:()=>{const[e,r]=l.useState(null),[t,n]=l.useState(null);return a.jsxs("div",{className:"mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4",children:[a.jsx(s,{options:o,value:e,onValueChange:r,variant:"default",label:"Default",placeholder:"Select framework...",searchPlaceholder:"Search..."}),a.jsx(s,{options:o,value:t,onValueChange:n,variant:"outline",label:"Outline",placeholder:"Select framework...",searchPlaceholder:"Search..."})]})}},M={render:e=>{const[r,t]=l.useState(null),[n,c]=l.useState("");return a.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[a.jsx(s,{...e,value:r,onValueChange:t,onSearch:u=>{c(u),console.log("Search query:",u)}}),n&&a.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm",children:[a.jsx("div",{className:"mdt-font-medium",children:"Current search:"}),a.jsx("div",{className:"mdt-font-mono mdt-text-muted-foreground",children:n})]})]})},args:{options:o,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Type to search..."}};var W,E,B,Q,J;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(B=(E=m.parameters)==null?void 0:E.docs)==null?void 0:B.source},description:{story:"Simple selection test with basic options.",...(J=(Q=m.parameters)==null?void 0:Q.docs)==null?void 0:J.description}}};var $,_,G,H,K;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(G=(_=p.parameters)==null?void 0:_.docs)==null?void 0:G.source},description:{story:"Default combobox example with frameworks (with state management).",...(K=(H=p.parameters)==null?void 0:H.docs)==null?void 0:K.description}}};var X,Y,Z,ee,ae;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:"Combobox with a label and helper text.",...(ae=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:ae.description}}};var re,te,le,se,oe;h.parameters={...h.parameters,docs:{...(re=h.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(le=(te=h.parameters)==null?void 0:te.docs)==null?void 0:le.source},description:{story:"Required field with asterisk indicator.",...(oe=(se=h.parameters)==null?void 0:se.docs)==null?void 0:oe.description}}};var ne,ce,ue,de,ie;b.parameters={...b.parameters,docs:{...(ne=b.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(ue=(ce=b.parameters)==null?void 0:ce.docs)==null?void 0:ue.source},description:{story:"Combobox with an error state.",...(ie=(de=b.parameters)==null?void 0:de.docs)==null?void 0:ie.description}}};var me,pe,ge,he,be;v.parameters={...v.parameters,docs:{...(me=v.parameters)==null?void 0:me.docs,source:{originalSource:`{
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
}`,...(ge=(pe=v.parameters)==null?void 0:pe.docs)==null?void 0:ge.source},description:{story:"Disabled combobox.",...(be=(he=v.parameters)==null?void 0:he.docs)==null?void 0:be.description}}};var ve,Se,fe,xe,we;S.parameters={...S.parameters,docs:{...(ve=S.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(fe=(Se=S.parameters)==null?void 0:Se.docs)==null?void 0:fe.source},description:{story:"Combobox with clearable option enabled.",...(we=(xe=S.parameters)==null?void 0:xe.docs)==null?void 0:we.description}}};var Ve,Ce,ke,ye,je;f.parameters={...f.parameters,docs:{...(Ve=f.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
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
}`,...(ke=(Ce=f.parameters)==null?void 0:Ce.docs)==null?void 0:ke.source},description:{story:"Small size variant.",...(je=(ye=f.parameters)==null?void 0:ye.docs)==null?void 0:je.description}}};var Pe,Ne,Le,ze,Fe;x.parameters={...x.parameters,docs:{...(Pe=x.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
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
}`,...(Le=(Ne=x.parameters)==null?void 0:Ne.docs)==null?void 0:Le.source},description:{story:"Medium size variant (default).",...(Fe=(ze=x.parameters)==null?void 0:ze.docs)==null?void 0:Fe.description}}};var Oe,Te,De,Ae,Me;w.parameters={...w.parameters,docs:{...(Oe=w.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
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
}`,...(De=(Te=w.parameters)==null?void 0:Te.docs)==null?void 0:De.source},description:{story:"Large size variant.",...(Me=(Ae=w.parameters)==null?void 0:Ae.docs)==null?void 0:Me.description}}};var Re,qe,Ue,Ie,We;V.parameters={...V.parameters,docs:{...(Re=V.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(Ue=(qe=V.parameters)==null?void 0:qe.docs)==null?void 0:Ue.source},description:{story:"Outline variant style.",...(We=(Ie=V.parameters)==null?void 0:Ie.docs)==null?void 0:We.description}}};var Ee,Be,Qe,Je,$e;C.parameters={...C.parameters,docs:{...(Ee=C.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(Qe=(Be=C.parameters)==null?void 0:Be.docs)==null?void 0:Qe.source},description:{story:"Combobox with options that have descriptions.",...($e=(Je=C.parameters)==null?void 0:Je.docs)==null?void 0:$e.description}}};var _e,Ge,He,Ke,Xe;k.parameters={...k.parameters,docs:{...(_e=k.parameters)==null?void 0:_e.docs,source:{originalSource:`{
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
}`,...(He=(Ge=k.parameters)==null?void 0:Ge.docs)==null?void 0:He.source},description:{story:"Combobox with some disabled options.",...(Xe=(Ke=k.parameters)==null?void 0:Ke.docs)==null?void 0:Xe.description}}};var Ye,Ze,ea,aa,ra;y.parameters={...y.parameters,docs:{...(Ye=y.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
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
}`,...(ea=(Ze=y.parameters)==null?void 0:Ze.docs)==null?void 0:ea.source},description:{story:"Empty state when no options are available.",...(ra=(aa=y.parameters)==null?void 0:aa.docs)==null?void 0:ra.description}}};var ta,la,sa,oa,na;j.parameters={...j.parameters,docs:{...(ta=j.parameters)==null?void 0:ta.docs,source:{originalSource:`{
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
}`,...(sa=(la=j.parameters)==null?void 0:la.docs)==null?void 0:sa.source},description:{story:"Controlled combobox with state management showing selected value.",...(na=(oa=j.parameters)==null?void 0:oa.docs)==null?void 0:na.description}}};var ca,ua,da,ia,ma;P.parameters={...P.parameters,docs:{...(ca=P.parameters)==null?void 0:ca.docs,source:{originalSource:`{
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
}`,...(da=(ua=P.parameters)==null?void 0:ua.docs)==null?void 0:da.source},description:{story:`Custom render function for options: a bolder label over its description. The row around it still wears the one
selection look (Pranjal, 2026-10-21) - the pale ground when picked, the grey one under the pointer - so the custom
part draws only the tick, on the RIGHT in the reading ink, in a slot that stays empty on unpicked rows.`,...(ma=(ia=P.parameters)==null?void 0:ia.docs)==null?void 0:ma.description}}};var pa,ga,ha,ba,va;N.parameters={...N.parameters,docs:{...(pa=N.parameters)==null?void 0:pa.docs,source:{originalSource:`{
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
}`,...(ha=(ga=N.parameters)==null?void 0:ga.docs)==null?void 0:ha.source},description:{story:"Custom render function for selected value with emoji.",...(va=(ba=N.parameters)==null?void 0:ba.docs)==null?void 0:va.description}}};var Sa,fa,xa,wa,Va;L.parameters={...L.parameters,docs:{...(Sa=L.parameters)==null?void 0:Sa.docs,source:{originalSource:`{
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
}`,...(xa=(fa=L.parameters)==null?void 0:fa.docs)==null?void 0:xa.source},description:{story:"Custom trigger with badge style.",...(Va=(wa=L.parameters)==null?void 0:wa.docs)==null?void 0:Va.description}}};var Ca,ka,ya,ja,Pa;z.parameters={...z.parameters,docs:{...(Ca=z.parameters)==null?void 0:Ca.docs,source:{originalSource:`{
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
}`,...(ya=(ka=z.parameters)==null?void 0:ka.docs)==null?void 0:ya.source},description:{story:"Large dataset example showing combobox performance.",...(Pa=(ja=z.parameters)==null?void 0:ja.docs)==null?void 0:Pa.description}}};var Na,La,za,Fa,Oa;F.parameters={...F.parameters,docs:{...(Na=F.parameters)==null?void 0:Na.docs,source:{originalSource:`{
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
}`,...(za=(La=F.parameters)==null?void 0:La.docs)==null?void 0:za.source},description:{story:"Real-world example: Country selector with state display.",...(Oa=(Fa=F.parameters)==null?void 0:Fa.docs)==null?void 0:Oa.description}}};var Ta,Da,Aa,Ma,Ra;O.parameters={...O.parameters,docs:{...(Ta=O.parameters)==null?void 0:Ta.docs,source:{originalSource:`{
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
}`,...(Aa=(Da=O.parameters)==null?void 0:Da.docs)==null?void 0:Aa.source},description:{story:"Async data loading from API simulation.",...(Ra=(Ma=O.parameters)==null?void 0:Ma.docs)==null?void 0:Ra.description}}};var qa,Ua,Ia,Wa,Ea;T.parameters={...T.parameters,docs:{...(qa=T.parameters)==null?void 0:qa.docs,source:{originalSource:`{
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
}`,...(Ia=(Ua=T.parameters)==null?void 0:Ua.docs)==null?void 0:Ia.source},description:{story:"Server-side search/filtering example.",...(Ea=(Wa=T.parameters)==null?void 0:Wa.docs)==null?void 0:Ea.description}}};var Ba,Qa,Ja,$a,_a;D.parameters={...D.parameters,docs:{...(Ba=D.parameters)==null?void 0:Ba.docs,source:{originalSource:`{
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
}`,...(Ja=(Qa=D.parameters)==null?void 0:Qa.docs)==null?void 0:Ja.source},description:{story:"All size variants displayed together.",...(_a=($a=D.parameters)==null?void 0:$a.docs)==null?void 0:_a.description}}};var Ga,Ha,Ka,Xa,Ya;A.parameters={...A.parameters,docs:{...(Ga=A.parameters)==null?void 0:Ga.docs,source:{originalSource:`{
  render: () => {
    const [valueDefault, setValueDefault] = useState<string | null>(null);
    const [valueOutline, setValueOutline] = useState<string | null>(null);
    return <div className="mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4">
        <Combobox options={frameworks} value={valueDefault} onValueChange={setValueDefault} variant="default" label="Default" placeholder="Select framework..." searchPlaceholder="Search..." />
        <Combobox options={frameworks} value={valueOutline} onValueChange={setValueOutline} variant="outline" label="Outline" placeholder="Select framework..." searchPlaceholder="Search..." />
      </div>;
  }
}`,...(Ka=(Ha=A.parameters)==null?void 0:Ha.docs)==null?void 0:Ka.source},description:{story:"All variants displayed together.",...(Ya=(Xa=A.parameters)==null?void 0:Xa.docs)==null?void 0:Ya.description}}};var Za,er,ar,rr,tr;M.parameters={...M.parameters,docs:{...(Za=M.parameters)==null?void 0:Za.docs,source:{originalSource:`{
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
}`,...(ar=(er=M.parameters)==null?void 0:er.docs)==null?void 0:ar.source},description:{story:"Search callback example showing how to handle search events.",...(tr=(rr=M.parameters)==null?void 0:rr.docs)==null?void 0:tr.description}}};const Dr=["DebugSelection","Default","WithLabel","Required","WithError","Disabled","Clearable","SizeSmall","SizeMedium","SizeLarge","VariantOutline","WithDescriptions","WithDisabledOptions","EmptyState","Controlled","CustomRenderOption","CustomRenderValue","CustomTrigger","LargeDataset","CountrySelector","AsyncDataLoading","ServerSideFiltering","AllSizes","AllVariants","WithSearchCallback"];export{D as AllSizes,A as AllVariants,O as AsyncDataLoading,S as Clearable,j as Controlled,F as CountrySelector,P as CustomRenderOption,N as CustomRenderValue,L as CustomTrigger,m as DebugSelection,p as Default,v as Disabled,y as EmptyState,z as LargeDataset,h as Required,T as ServerSideFiltering,w as SizeLarge,x as SizeMedium,f as SizeSmall,V as VariantOutline,C as WithDescriptions,k as WithDisabledOptions,b as WithError,g as WithLabel,M as WithSearchCallback,Dr as __namedExportsOrder,Tr as default};
//# sourceMappingURL=Combobox.stories-Bz92R89o.js.map
