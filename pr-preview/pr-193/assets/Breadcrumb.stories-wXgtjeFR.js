import{j as e,r as W}from"./iframe-D3prpiam.js";import{B as r}from"./Breadcrumb-37OdAj84.js";import{B as C}from"./Button-Dm8cqF7t.js";import{I as M}from"./Icon-Dx9XXtQk.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./icon-at-drawn-size-BUHWhXTL.js";const H=[{label:"Settings"},{label:"User management",href:"#user-management"},{label:"Users"}],R=[{label:"User management",onSelect:()=>{}},{label:"Edit details"}],X={title:"New Components/Breadcrumb",component:r,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A crumb says where you are and offers the way back.","","**Depth, not sequence.** Every place on a crumb already exists; you are simply","standing at the bottom of a path. A journey whose later steps have not happened yet","is `Stepper`; doors you can take in any order are `Tabs`.","","**Two forms.** The `page` form sits in the header band after the panel icon: 12/500","in the faint ink (`--mdt-faint`), the place you are on in the foreground (`--mdt-foreground`), and any ancestor given an","`href` or an `onSelect` can be followed. The `drawer` form replaces a drawer's title","while a page is open inside it — the drawer title's own 14 on a 20 line, the earlier steps at 400 in the faint ink,","a chevron 14, the step at 600 in the soft ink (neutral-130), every visible gap 12.","",'**The drawer form is a real breadcrumb with no back button** (Pranjal, 2026-10-26: "Where first or other','options will be clickable so no need for back button. Update it in all the sidedrawers"). Every step before the',"last that is given an `onSelect` (or an `href`) is a way back: the faint ink at rest, the foreground and an",'underline under the pointer, named "Back to <step>". `onBack` is the short form for the step before the last,',"and takes the caller's path, so a dirty draft still gets its discard question first.","","Every name stays on one line and is never shortened — the console’s crumb is nowrap throughout.","",'Announced as a navigation landmark named "Breadcrumb" holding a list, with the last',"item marked as the current page. The chevrons are drawing only.","","Measured against the console 2026-09-22 (/fields, the page form) and 2026-10-28 (Agent Fleet › Health, Needs attention, the drawer form)."].join(`
`)}}},argTypes:{variant:{control:"inline-radio",options:["page","drawer"]},items:{control:!1},onBack:{control:!1},backLabel:{control:"text"},"aria-label":{control:"text"}},args:{items:H,variant:"page"}},L=({children:t})=>e.jsx("p",{className:"mdt-mt-3 mdt-text-xs mdt-text-muted-foreground",children:t}),z=()=>{const[t,i]=W.useState(null);return e.jsxs("div",{children:[e.jsx(r,{items:[{label:"Settings"},{label:"User management",onSelect:()=>{i("User management")}},{label:"Users"}]}),e.jsx(L,{children:t?`Went to ${t}.`:"Click the middle crumb."})]})},a={parameters:{controls:{disable:!0}},render:()=>e.jsx(z,{})},$=()=>{const[t,i]=W.useState(0);return e.jsxs("div",{children:[e.jsx(r,{variant:"drawer",items:[{label:"Needs attention",onSelect:()=>{i(O=>O+1)}},{label:"Crashing modules"}]}),e.jsx(L,{children:t>0?`Went back ${String(t)} ${t===1?"time":"times"}.`:'Press "Needs attention" - it is the way back. Its name is "Back to Needs attention".'})]})},s={parameters:{controls:{disable:!0}},render:()=>e.jsx($,{})},n={name:"Drawer · three steps",parameters:{controls:{disable:!0}},render:()=>e.jsx(r,{variant:"drawer",items:[{label:"Agent details",onSelect:()=>{}},{label:"Modules",onSelect:()=>{}},{label:"Metrics"}]})},o={parameters:{controls:{disable:!0},layout:"fullscreen"},render:()=>e.jsxs("div",{className:"mdt-flex mdt-h-[60px] mdt-w-[1440px] mdt-max-w-full mdt-items-center mdt-gap-2.5 mdt-border-b mdt-border-neutral-30 mdt-bg-card mdt-pl-4 mdt-pr-6",children:[e.jsx(C,{variant:"ghost",iconOnly:!0,size:"sm",ariaLabel:"Collapse the sidebar",leftIcon:e.jsx(M,{name:"panel-left","aria-hidden":!0})}),e.jsx(r,{items:H})]})},d={parameters:{controls:{disable:!0},layout:"fullscreen"},render:()=>e.jsxs("div",{className:"mdt-flex mdt-min-h-[60px] mdt-w-[720px] mdt-max-w-full mdt-items-center mdt-justify-between mdt-gap-3 mdt-border-b mdt-border-neutral-20 mdt-bg-card mdt-px-5 mdt-py-1.5",children:[e.jsx(r,{variant:"drawer",items:R}),e.jsx(C,{variant:"ghost",iconOnly:!0,size:"sm",ariaLabel:"Close",leftIcon:e.jsx(M,{name:"x","aria-hidden":!0})})]})};var l,m,c,p,h;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <PageDemo />
}`,...(c=(m=a.parameters)==null?void 0:m.docs)==null?void 0:c.source},description:{story:`The header band's crumb: three places, the middle one clickable. The last is
where you are, in the foreground, and is never a link — you are already here.`,...(h=(p=a.parameters)==null?void 0:p.docs)==null?void 0:h.description}}};var u,b,g,f,w;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <DrawerDemo />
}`,...(g=(b=s.parameters)==null?void 0:b.docs)==null?void 0:g.source},description:{story:`The drawer's crumb, standing in the title's place: the earlier step in the faint
ink at 400, a chevron, the step at the title's 600 in the soft ink, 14 on a 20 line.
**No back button** - the earlier step is the way back, underlined under the pointer.`,...(w=(f=s.parameters)==null?void 0:f.docs)==null?void 0:w.description}}};var x,y,v,k,j;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  name: 'Drawer · three steps',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Breadcrumb variant="drawer" items={[{
    label: 'Agent details',
    onSelect: () => undefined
  }, {
    label: 'Modules',
    onSelect: () => undefined
  }, {
    label: 'Metrics'
  }]} />
}`,...(v=(y=n.parameters)==null?void 0:y.docs)==null?void 0:v.source},description:{story:`Three steps deep: both earlier steps go back - "Agent details" straight to the
drawer's first page, "Modules" one page back.`,...(j=(k=n.parameters)==null?void 0:k.docs)==null?void 0:j.description}}};var S,B,D,A,T;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'fullscreen'
  },
  render: () => <div className="mdt-flex mdt-h-[60px] mdt-w-[1440px] mdt-max-w-full mdt-items-center mdt-gap-2.5 mdt-border-b mdt-border-neutral-30 mdt-bg-card mdt-pl-4 mdt-pr-6">
      <Button variant="ghost" iconOnly size="sm" ariaLabel="Collapse the sidebar" leftIcon={<Icon name="panel-left" aria-hidden />} />
      <Breadcrumb items={PAGE} />
    </div>
}`,...(D=(B=o.parameters)==null?void 0:B.docs)==null?void 0:D.source},description:{story:`Where the page form lives: the B1 header band at 1440, 60 tall, the one band
with a bottom hairline (neutral-30, as the console renders it), padded 16 left so the
panel trigger hugs the rail and 24 right, everything 10 apart.`,...(T=(A=o.parameters)==null?void 0:A.docs)==null?void 0:T.description}}};var I,N,E,P,U;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'fullscreen'
  },
  render: () => <div className="mdt-flex mdt-min-h-[60px] mdt-w-[720px] mdt-max-w-full mdt-items-center mdt-justify-between mdt-gap-3 mdt-border-b mdt-border-neutral-20 mdt-bg-card mdt-px-5 mdt-py-1.5">
      <Breadcrumb variant="drawer" items={DRAWER} />
      <Button variant="ghost" iconOnly size="sm" ariaLabel="Close" leftIcon={<Icon name="x" aria-hidden />} />
    </div>
}`,...(E=(N=d.parameters)==null?void 0:N.docs)==null?void 0:E.source},description:{story:`Where the drawer form lives: a 720 drawer's head, 60 tall, padded 6 · 20, a neutral-20
hairline under it, the crumb where the title was and the close at the right. The ✕ closes the whole
drawer; "User management" goes back one page.`,...(U=(P=d.parameters)==null?void 0:P.docs)==null?void 0:U.description}}};const Y=["Page","Drawer","DrawerThreeSteps","InAHeaderBand","InADrawerHead"];export{s as Drawer,n as DrawerThreeSteps,d as InADrawerHead,o as InAHeaderBand,a as Page,Y as __namedExportsOrder,X as default};
//# sourceMappingURL=Breadcrumb.stories-wXgtjeFR.js.map
