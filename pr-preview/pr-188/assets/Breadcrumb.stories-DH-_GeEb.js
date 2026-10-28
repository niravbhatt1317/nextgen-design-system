import{j as e,r as A}from"./iframe-CCgwJbt2.js";import{B as o}from"./Breadcrumb-DBxnxKZG.js";import{B as E}from"./Button-BlpLRJ1F.js";import{I as T}from"./Icon-BKTarBaZ.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./icon-at-drawn-size-Dp6VoVpc.js";const U=[{label:"Settings"},{label:"User management",href:"#user-management"},{label:"Users"}],N=[{label:"User management"},{label:"Edit details"}],M={title:"New Components/Breadcrumb",component:o,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A crumb says where you are and offers the way back.","","**Depth, not sequence.** Every place on a crumb already exists; you are simply","standing at the bottom of a path. A journey whose later steps have not happened yet","is `Stepper`; doors you can take in any order are `Tabs`.","","**Two forms.** The `page` form sits in the header band after the panel icon: 12/500","in the faint ink (`--mdt-faint`), the place you are on in the foreground (`--mdt-foreground`), and any ancestor given an","`href` or an `onSelect` can be followed. The `drawer` form replaces a drawer's title","while a page is open inside it — a back button, a 1 × 16 nick in neutral-30, the parent at 400 in the faint ink,","a chevron 14, the step in the title's own 16/600 in the soft ink (neutral-130) — so the way back is visible before","anyone commits.","","**In the drawer form only the back button navigates.** An item's `href` and","`onSelect` are ignored there. The crumb's job in a drawer is to name where a page","will return to, and one way back is enough; the back button takes the caller's","path, so a dirty draft still gets its discard question first.","","Every name stays on one line and is never shortened — the console’s crumb is nowrap throughout.","",'Announced as a navigation landmark named "Breadcrumb" holding a list, with the last',"item marked as the current page. The chevrons are drawing only.","","Measured against the console 2026-09-22: /fields for the page form, the Users drawer’s Edit for the drawer form."].join(`
`)}}},argTypes:{variant:{control:"inline-radio",options:["page","drawer"]},items:{control:!1},onBack:{control:!1},backLabel:{control:"text"},"aria-label":{control:"text"}},args:{items:U,variant:"page"}},P=({children:t})=>e.jsx("p",{className:"mdt-mt-3 mdt-text-xs mdt-text-muted-foreground",children:t}),O=()=>{const[t,d]=A.useState(null);return e.jsxs("div",{children:[e.jsx(o,{items:[{label:"Settings"},{label:"User management",onSelect:()=>{d("User management")}},{label:"Users"}]}),e.jsx(P,{children:t?`Went to ${t}.`:"Click the middle crumb."})]})},r={parameters:{controls:{disable:!0}},render:()=>e.jsx(O,{})},W=()=>{const[t,d]=A.useState(0);return e.jsxs("div",{children:[e.jsx(o,{variant:"drawer",items:N,onBack:()=>{d(C=>C+1)}}),e.jsx(P,{children:t>0?`Back pressed ${String(t)} ${t===1?"time":"times"}.`:'Press the arrow. Its name is "Back to User management".'})]})},a={parameters:{controls:{disable:!0}},render:()=>e.jsx(W,{})},n={parameters:{controls:{disable:!0},layout:"fullscreen"},render:()=>e.jsxs("div",{className:"mdt-flex mdt-h-[60px] mdt-w-[1440px] mdt-max-w-full mdt-items-center mdt-gap-2.5 mdt-border-b mdt-border-neutral-30 mdt-bg-card mdt-pl-4 mdt-pr-6",children:[e.jsx(E,{variant:"ghost",iconOnly:!0,size:"sm",ariaLabel:"Collapse the sidebar",leftIcon:e.jsx(T,{name:"panel-left","aria-hidden":!0})}),e.jsx(o,{items:U})]})},s={parameters:{controls:{disable:!0},layout:"fullscreen"},render:()=>e.jsxs("div",{className:"mdt-flex mdt-min-h-[60px] mdt-w-[720px] mdt-max-w-full mdt-items-center mdt-justify-between mdt-gap-3 mdt-border-b mdt-border-neutral-20 mdt-bg-card mdt-px-5 mdt-py-1.5",children:[e.jsx(o,{variant:"drawer",items:N,onBack:()=>{}}),e.jsx(E,{variant:"ghost",iconOnly:!0,size:"sm",ariaLabel:"Close",leftIcon:e.jsx(T,{name:"x","aria-hidden":!0})})]})};var i,m,l,c,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <PageDemo />
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source},description:{story:`The header band's crumb: three places, the middle one clickable. The last is
where you are, in the foreground, and is never a link — you are already here.`,...(p=(c=r.parameters)==null?void 0:c.docs)==null?void 0:p.description}}};var h,u,b,g,f;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <DrawerDemo />
}`,...(b=(u=a.parameters)==null?void 0:u.docs)==null?void 0:b.source},description:{story:`The drawer's crumb, standing in the title's place. Back arrow, nick, the
parent in the faint ink at 400, a chevron, the step at the title's 600 in the soft ink.
**Only the arrow navigates.**`,...(f=(g=a.parameters)==null?void 0:g.docs)==null?void 0:f.description}}};var w,x,y,v,k;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(y=(x=n.parameters)==null?void 0:x.docs)==null?void 0:y.source},description:{story:`Where the page form lives: the B1 header band at 1440, 60 tall, the one band
with a bottom hairline (neutral-30, as the console renders it), padded 16 left so the
panel trigger hugs the rail and 24 right, everything 10 apart.`,...(k=(v=n.parameters)==null?void 0:v.docs)==null?void 0:k.description}}};var j,B,I,D,S;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'fullscreen'
  },
  render: () => <div className="mdt-flex mdt-min-h-[60px] mdt-w-[720px] mdt-max-w-full mdt-items-center mdt-justify-between mdt-gap-3 mdt-border-b mdt-border-neutral-20 mdt-bg-card mdt-px-5 mdt-py-1.5">
      <Breadcrumb variant="drawer" items={DRAWER} onBack={() => undefined} />
      <Button variant="ghost" iconOnly size="sm" ariaLabel="Close" leftIcon={<Icon name="x" aria-hidden />} />
    </div>
}`,...(I=(B=s.parameters)==null?void 0:B.docs)==null?void 0:I.source},description:{story:`Where the drawer form lives: a 720 drawer's head, 60 tall, padded 6 · 20, a neutral-20
hairline under it, the crumb where the title was and the close at the right. The ✕ closes the whole
drawer; the arrow steps back one page.`,...(S=(D=s.parameters)==null?void 0:D.docs)==null?void 0:S.description}}};const F=["Page","Drawer","InAHeaderBand","InADrawerHead"];export{a as Drawer,s as InADrawerHead,n as InAHeaderBand,r as Page,F as __namedExportsOrder,M as default};
//# sourceMappingURL=Breadcrumb.stories-DH-_GeEb.js.map
