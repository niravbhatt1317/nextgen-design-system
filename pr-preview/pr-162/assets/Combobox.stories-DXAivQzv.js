import{j as r,r as t}from"./iframe-BZAmqjMg.js";import{C as s}from"./Combobox-CQ9ECQba.js";import{I as tr}from"./Icon-B3y3vZed.js";import{B as nr}from"./Button-eTWYZ0KV.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-XhpRaMTr.js";import"./index-m3DPtfoE.js";import"./index-ChhGpwI1.js";import"./index-BmWyMJzS.js";import"./index-1QXOkIze.js";import"./index-CSC-bFcG.js";import"./index-Duuv09oK.js";import"./index-7wjsHcQo.js";import"./Combination-BMDf1sQV.js";import"./index-D5CBbUe5.js";import"./index-CiRK75R_.js";import"./index-B-F8hGln.js";import"./index-BKfkILC3.js";import"./index-Ckce6WhC.js";import"./index-DHnRn2DM.js";import"./index-DjHSyJKj.js";import"./icon-at-drawn-size-C5Ok8h5G.js";const Or={title:"Components/Combobox",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A searchable combobox component with keyboard navigation. Perfect for large datasets where users need to search and filter options. Uses the command palette pattern for optimal UX."}}},argTypes:{variant:{control:"select",options:["default","outline"],description:"Visual style variant",table:{defaultValue:{summary:"default"}}},size:{control:"select",options:["sm","md","lg"],description:"Size variant",table:{defaultValue:{summary:"md"}}},clearable:{control:"boolean",description:"Show clear button when value is selected",table:{defaultValue:{summary:"false"}}},disabled:{control:"boolean",description:"Disable the combobox",table:{defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Mark the field as required",table:{defaultValue:{summary:"false"}}}},decorators:[e=>r.jsx("div",{className:"mdt-w-[350px]",children:r.jsx(e,{})})]},o=[{value:"react",label:"React",description:"A JavaScript library for building user interfaces"},{value:"vue",label:"Vue",description:"The Progressive JavaScript Framework"},{value:"angular",label:"Angular",description:"Platform for building mobile and desktop web applications"},{value:"svelte",label:"Svelte",description:"Cybernetically enhanced web apps"},{value:"next",label:"Next.js",description:"The React Framework for Production"},{value:"nuxt",label:"Nuxt",description:"The Intuitive Vue Framework"},{value:"remix",label:"Remix",description:"Build Better Websites"},{value:"astro",label:"Astro",description:"Build fast websites, faster"},{value:"solid",label:"SolidJS",description:"Simple and performant reactivity"},{value:"qwik",label:"Qwik",description:"The HTML-first framework"}],d=[{value:"javascript",label:"JavaScript"},{value:"typescript",label:"TypeScript"},{value:"python",label:"Python"},{value:"java",label:"Java"},{value:"csharp",label:"C#"},{value:"go",label:"Go"},{value:"rust",label:"Rust"},{value:"php",label:"PHP"},{value:"ruby",label:"Ruby"},{value:"swift",label:"Swift"}],I=[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"au",label:"Australia"},{value:"de",label:"Germany"},{value:"fr",label:"France"},{value:"in",label:"India"},{value:"jp",label:"Japan"},{value:"cn",label:"China"},{value:"br",label:"Brazil"}],m={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"}],placeholder:"Click to select...",searchPlaceholder:"Search...",label:"Framework Selection"}},p={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:o,placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",label:"Framework"}},g={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:d,label:"Programming Language",helperText:"Choose your preferred programming language",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},h={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:d,label:"Programming Language",required:!0,placeholder:"Select language...",searchPlaceholder:"Search languages..."}},b={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:o,label:"Framework",error:"Please select a framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},v={render:e=>{const[a,l]=t.useState("react");return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:o,label:"Framework",disabled:!0,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},S={render:e=>{const[a,l]=t.useState("react");return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:o,label:"Framework",clearable:!0,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},f={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:d,size:"sm",label:"Small Size",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},x={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:d,size:"md",label:"Medium Size",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},w={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:d,size:"lg",label:"Large Size",placeholder:"Select language...",searchPlaceholder:"Search languages..."}},V={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:o,variant:"outline",label:"Outline Variant",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},C={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:o,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},k={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:[{value:"react",label:"React"},{value:"vue",label:"Vue",disabled:!0},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte",disabled:!0},{value:"next",label:"Next.js"}],label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},y={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:[],label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",emptyMessage:"No frameworks available"}},P={render:e=>{const[a,l]=t.useState("react");return r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(s,{...e,value:a,onValueChange:l}),r.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm",children:[r.jsx("div",{className:"mdt-font-medium",children:"Selected value:"}),r.jsx("div",{className:"mdt-font-mono mdt-text-muted-foreground",children:a||"null"})]})]})},args:{options:o,label:"Framework",clearable:!0,placeholder:"Select framework...",searchPlaceholder:"Search frameworks..."}},j={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:o,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",renderOption:({option:e,selected:a})=>r.jsxs("div",{className:"mdt-flex mdt-w-full mdt-items-center mdt-gap-3",children:[r.jsx("div",{className:`mdt-h-2 mdt-w-2 mdt-shrink-0 mdt-rounded-full ${a?"mdt-bg-primary":"mdt-bg-muted"}`}),r.jsxs("div",{className:"mdt-flex mdt-flex-1 mdt-flex-col",children:[r.jsx("span",{className:"mdt-font-medium",children:e.label}),e.description&&r.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:e.description})]}),a&&r.jsx(tr,{name:"check",size:"sm",color:"primary","aria-hidden":!0})]})}},N={render:e=>{const[a,l]=t.useState("react");return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:o,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",renderValue:e=>r.jsxs("span",{className:"mdt-font-semibold mdt-text-primary",children:["✨ ",e.label]})}},L={render:e=>{const[a,l]=t.useState("react");return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:o,label:"Framework (Custom Trigger)",placeholder:"Select framework...",searchPlaceholder:"Search frameworks...",renderTrigger:({selectedOption:e,placeholder:a,open:l,disabled:n})=>r.jsxs(nr,{variant:"outline",role:"combobox","aria-label":"Select a framework","aria-expanded":l,"aria-controls":"combobox-list",disabled:n,className:"mdt-flex mdt-h-10 mdt-w-full mdt-items-center mdt-justify-between mdt-rounded-lg mdt-border-2 mdt-border-primary mdt-bg-primary/5 mdt-px-4 mdt-py-2 mdt-text-sm mdt-font-medium mdt-transition-colors hover:mdt-bg-primary/10",children:[e?r.jsxs("span",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[r.jsx("span",{className:"mdt-h-2 mdt-w-2 mdt-rounded-full mdt-bg-primary"}),r.jsx("span",{className:"mdt-text-primary",children:e.label})]}):r.jsx("span",{className:"mdt-text-muted-foreground",children:a}),r.jsx(tr,{name:"chevrons-up-down",size:"sm",color:"primary","aria-hidden":!0})]})}},z={render:e=>{const[a,l]=t.useState(null);return r.jsx(s,{...e,value:a,onValueChange:l})},args:{options:Array.from({length:100},(e,a)=>({value:`option-${a}`,label:`Option ${a+1}`,description:`Description for option ${a+1}`})),label:"Large Dataset (100 options)",placeholder:"Search from 100 options...",searchPlaceholder:"Type to search..."}},F={render:e=>{var n;const[a,l]=t.useState(null);return r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(s,{...e,value:a,onValueChange:l}),a&&r.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm",children:[r.jsx("div",{className:"mdt-font-medium",children:"Selected country:"}),r.jsx("div",{className:"mdt-font-semibold mdt-text-primary",children:(n=I.find(c=>c.value===a))==null?void 0:n.label})]})]})},args:{options:I,label:"Country",required:!0,clearable:!0,placeholder:"Select your country...",searchPlaceholder:"Search countries...",helperText:"Select the country where you are located"}},O={render:e=>{const[a,l]=t.useState(null),[n,c]=t.useState([]),[u,i]=t.useState(!1);return t.useEffect(()=>{i(!0),setTimeout(()=>{c([{value:"1",label:"User 1",description:"user1@example.com"},{value:"2",label:"User 2",description:"user2@example.com"},{value:"3",label:"User 3",description:"user3@example.com"},{value:"4",label:"User 4",description:"user4@example.com"},{value:"5",label:"User 5",description:"user5@example.com"}]),i(!1)},1500)},[]),r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(s,{...e,options:n,value:a,onValueChange:l}),u&&r.jsx("div",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Loading users from API..."})]})},args:{label:"User (Async Loading)",placeholder:"Select user...",searchPlaceholder:"Search users...",emptyMessage:"Loading users..."}},D={render:e=>{const[a,l]=t.useState(null),[n,c]=t.useState(o),[u,i]=t.useState(!1),sr=R=>{if(!R){c(o);return}i(!0),setTimeout(()=>{const or=o.filter(q=>{var U;return q.label.toLowerCase().includes(R.toLowerCase())||((U=q.description)==null?void 0:U.toLowerCase().includes(R.toLowerCase()))});c(or),i(!1)},500)};return r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(s,{...e,options:n,value:a,onValueChange:l,onSearch:sr}),u&&r.jsx("div",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Searching on server..."})]})},args:{label:"Framework (Server-side Search)",placeholder:"Select framework...",searchPlaceholder:"Type to search server...",helperText:"Search is performed on the server"}},T={render:()=>{const[e,a]=t.useState(null),[l,n]=t.useState(null),[c,u]=t.useState(null);return r.jsxs("div",{className:"mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4",children:[r.jsx(s,{options:d,value:e,onValueChange:a,size:"sm",label:"Small",placeholder:"Select language...",searchPlaceholder:"Search..."}),r.jsx(s,{options:d,value:l,onValueChange:n,size:"md",label:"Medium",placeholder:"Select language...",searchPlaceholder:"Search..."}),r.jsx(s,{options:d,value:c,onValueChange:u,size:"lg",label:"Large",placeholder:"Select language...",searchPlaceholder:"Search..."})]})}},A={render:()=>{const[e,a]=t.useState(null),[l,n]=t.useState(null);return r.jsxs("div",{className:"mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4",children:[r.jsx(s,{options:o,value:e,onValueChange:a,variant:"default",label:"Default",placeholder:"Select framework...",searchPlaceholder:"Search..."}),r.jsx(s,{options:o,value:l,onValueChange:n,variant:"outline",label:"Outline",placeholder:"Select framework...",searchPlaceholder:"Search..."})]})}},M={render:e=>{const[a,l]=t.useState(null),[n,c]=t.useState("");return r.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[r.jsx(s,{...e,value:a,onValueChange:l,onSearch:u=>{c(u),console.log("Search query:",u)}}),n&&r.jsxs("div",{className:"mdt-rounded-md mdt-border mdt-bg-muted/50 mdt-p-3 mdt-text-sm",children:[r.jsx("div",{className:"mdt-font-medium",children:"Current search:"}),r.jsx("div",{className:"mdt-font-mono mdt-text-muted-foreground",children:n})]})]})},args:{options:o,label:"Framework",placeholder:"Select framework...",searchPlaceholder:"Type to search..."}};var W,E,B,Q,$;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(B=(E=m.parameters)==null?void 0:E.docs)==null?void 0:B.source},description:{story:"Simple selection test with basic options.",...($=(Q=m.parameters)==null?void 0:Q.docs)==null?void 0:$.description}}};var J,_,G,H,K;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source},description:{story:"Combobox with a label and helper text.",...(ae=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:ae.description}}};var re,le,te,se,oe;h.parameters={...h.parameters,docs:{...(re=h.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(te=(le=h.parameters)==null?void 0:le.docs)==null?void 0:te.source},description:{story:"Required field with asterisk indicator.",...(oe=(se=h.parameters)==null?void 0:se.docs)==null?void 0:oe.description}}};var ne,ce,ue,de,ie;b.parameters={...b.parameters,docs:{...(ne=b.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(fe=(Se=S.parameters)==null?void 0:Se.docs)==null?void 0:fe.source},description:{story:"Combobox with clearable option enabled.",...(we=(xe=S.parameters)==null?void 0:xe.docs)==null?void 0:we.description}}};var Ve,Ce,ke,ye,Pe;f.parameters={...f.parameters,docs:{...(Ve=f.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
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
}`,...(ke=(Ce=f.parameters)==null?void 0:Ce.docs)==null?void 0:ke.source},description:{story:"Small size variant.",...(Pe=(ye=f.parameters)==null?void 0:ye.docs)==null?void 0:Pe.description}}};var je,Ne,Le,ze,Fe;x.parameters={...x.parameters,docs:{...(je=x.parameters)==null?void 0:je.docs,source:{originalSource:`{
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
}`,...(Le=(Ne=x.parameters)==null?void 0:Ne.docs)==null?void 0:Le.source},description:{story:"Medium size variant (default).",...(Fe=(ze=x.parameters)==null?void 0:ze.docs)==null?void 0:Fe.description}}};var Oe,De,Te,Ae,Me;w.parameters={...w.parameters,docs:{...(Oe=w.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
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
}`,...(Te=(De=w.parameters)==null?void 0:De.docs)==null?void 0:Te.source},description:{story:"Large size variant.",...(Me=(Ae=w.parameters)==null?void 0:Ae.docs)==null?void 0:Me.description}}};var Re,qe,Ue,Ie,We;V.parameters={...V.parameters,docs:{...(Re=V.parameters)==null?void 0:Re.docs,source:{originalSource:`{
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
}`,...(Ue=(qe=V.parameters)==null?void 0:qe.docs)==null?void 0:Ue.source},description:{story:"Outline variant style.",...(We=(Ie=V.parameters)==null?void 0:Ie.docs)==null?void 0:We.description}}};var Ee,Be,Qe,$e,Je;C.parameters={...C.parameters,docs:{...(Ee=C.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
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
}`,...(Qe=(Be=C.parameters)==null?void 0:Be.docs)==null?void 0:Qe.source},description:{story:"Combobox with options that have descriptions.",...(Je=($e=C.parameters)==null?void 0:$e.docs)==null?void 0:Je.description}}};var _e,Ge,He,Ke,Xe;k.parameters={...k.parameters,docs:{...(_e=k.parameters)==null?void 0:_e.docs,source:{originalSource:`{
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
}`,...(ea=(Ze=y.parameters)==null?void 0:Ze.docs)==null?void 0:ea.source},description:{story:"Empty state when no options are available.",...(ra=(aa=y.parameters)==null?void 0:aa.docs)==null?void 0:ra.description}}};var la,ta,sa,oa,na;P.parameters={...P.parameters,docs:{...(la=P.parameters)==null?void 0:la.docs,source:{originalSource:`{
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
}`,...(sa=(ta=P.parameters)==null?void 0:ta.docs)==null?void 0:sa.source},description:{story:"Controlled combobox with state management showing selected value.",...(na=(oa=P.parameters)==null?void 0:oa.docs)==null?void 0:na.description}}};var ca,ua,da,ia,ma;j.parameters={...j.parameters,docs:{...(ca=j.parameters)==null?void 0:ca.docs,source:{originalSource:`{
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
        <div className={\`mdt-h-2 mdt-w-2 mdt-shrink-0 mdt-rounded-full \${selected ? 'mdt-bg-primary' : 'mdt-bg-muted'}\`} />
        <div className="mdt-flex mdt-flex-1 mdt-flex-col">
          <span className="mdt-font-medium">{option.label}</span>
          {option.description && <span className="mdt-text-xs mdt-text-muted-foreground">{option.description}</span>}
        </div>
        {selected && <Icon name="check" size="sm" color="primary" aria-hidden />}
      </div>
  }
}`,...(da=(ua=j.parameters)==null?void 0:ua.docs)==null?void 0:da.source},description:{story:"Custom render function for options with colored indicator.",...(ma=(ia=j.parameters)==null?void 0:ia.docs)==null?void 0:ma.description}}};var pa,ga,ha,ba,va;N.parameters={...N.parameters,docs:{...(pa=N.parameters)==null?void 0:pa.docs,source:{originalSource:`{
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
}`,...(xa=(fa=L.parameters)==null?void 0:fa.docs)==null?void 0:xa.source},description:{story:"Custom trigger with badge style.",...(Va=(wa=L.parameters)==null?void 0:wa.docs)==null?void 0:Va.description}}};var Ca,ka,ya,Pa,ja;z.parameters={...z.parameters,docs:{...(Ca=z.parameters)==null?void 0:Ca.docs,source:{originalSource:`{
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
}`,...(ya=(ka=z.parameters)==null?void 0:ka.docs)==null?void 0:ya.source},description:{story:"Large dataset example showing combobox performance.",...(ja=(Pa=z.parameters)==null?void 0:Pa.docs)==null?void 0:ja.description}}};var Na,La,za,Fa,Oa;F.parameters={...F.parameters,docs:{...(Na=F.parameters)==null?void 0:Na.docs,source:{originalSource:`{
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
}`,...(za=(La=F.parameters)==null?void 0:La.docs)==null?void 0:za.source},description:{story:"Real-world example: Country selector with state display.",...(Oa=(Fa=F.parameters)==null?void 0:Fa.docs)==null?void 0:Oa.description}}};var Da,Ta,Aa,Ma,Ra;O.parameters={...O.parameters,docs:{...(Da=O.parameters)==null?void 0:Da.docs,source:{originalSource:`{
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
}`,...(Aa=(Ta=O.parameters)==null?void 0:Ta.docs)==null?void 0:Aa.source},description:{story:"Async data loading from API simulation.",...(Ra=(Ma=O.parameters)==null?void 0:Ma.docs)==null?void 0:Ra.description}}};var qa,Ua,Ia,Wa,Ea;D.parameters={...D.parameters,docs:{...(qa=D.parameters)==null?void 0:qa.docs,source:{originalSource:`{
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
}`,...(Ia=(Ua=D.parameters)==null?void 0:Ua.docs)==null?void 0:Ia.source},description:{story:"Server-side search/filtering example.",...(Ea=(Wa=D.parameters)==null?void 0:Wa.docs)==null?void 0:Ea.description}}};var Ba,Qa,$a,Ja,_a;T.parameters={...T.parameters,docs:{...(Ba=T.parameters)==null?void 0:Ba.docs,source:{originalSource:`{
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
}`,...($a=(Qa=T.parameters)==null?void 0:Qa.docs)==null?void 0:$a.source},description:{story:"All size variants displayed together.",...(_a=(Ja=T.parameters)==null?void 0:Ja.docs)==null?void 0:_a.description}}};var Ga,Ha,Ka,Xa,Ya;A.parameters={...A.parameters,docs:{...(Ga=A.parameters)==null?void 0:Ga.docs,source:{originalSource:`{
  render: () => {
    const [valueDefault, setValueDefault] = useState<string | null>(null);
    const [valueOutline, setValueOutline] = useState<string | null>(null);
    return <div className="mdt-flex mdt-w-[350px] mdt-flex-col mdt-gap-4">
        <Combobox options={frameworks} value={valueDefault} onValueChange={setValueDefault} variant="default" label="Default" placeholder="Select framework..." searchPlaceholder="Search..." />
        <Combobox options={frameworks} value={valueOutline} onValueChange={setValueOutline} variant="outline" label="Outline" placeholder="Select framework..." searchPlaceholder="Search..." />
      </div>;
  }
}`,...(Ka=(Ha=A.parameters)==null?void 0:Ha.docs)==null?void 0:Ka.source},description:{story:"All variants displayed together.",...(Ya=(Xa=A.parameters)==null?void 0:Xa.docs)==null?void 0:Ya.description}}};var Za,er,ar,rr,lr;M.parameters={...M.parameters,docs:{...(Za=M.parameters)==null?void 0:Za.docs,source:{originalSource:`{
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
}`,...(ar=(er=M.parameters)==null?void 0:er.docs)==null?void 0:ar.source},description:{story:"Search callback example showing how to handle search events.",...(lr=(rr=M.parameters)==null?void 0:rr.docs)==null?void 0:lr.description}}};const Dr=["DebugSelection","Default","WithLabel","Required","WithError","Disabled","Clearable","SizeSmall","SizeMedium","SizeLarge","VariantOutline","WithDescriptions","WithDisabledOptions","EmptyState","Controlled","CustomRenderOption","CustomRenderValue","CustomTrigger","LargeDataset","CountrySelector","AsyncDataLoading","ServerSideFiltering","AllSizes","AllVariants","WithSearchCallback"];export{T as AllSizes,A as AllVariants,O as AsyncDataLoading,S as Clearable,P as Controlled,F as CountrySelector,j as CustomRenderOption,N as CustomRenderValue,L as CustomTrigger,m as DebugSelection,p as Default,v as Disabled,y as EmptyState,z as LargeDataset,h as Required,D as ServerSideFiltering,w as SizeLarge,x as SizeMedium,f as SizeSmall,V as VariantOutline,C as WithDescriptions,k as WithDisabledOptions,b as WithError,g as WithLabel,M as WithSearchCallback,Dr as __namedExportsOrder,Or as default};
//# sourceMappingURL=Combobox.stories-DXAivQzv.js.map
