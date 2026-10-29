import{j as e}from"./iframe-BjBV9yvu.js";import{I as n}from"./InfoTip-Bxjb2yVy.js";import{I as j}from"./Icon-DYpCcUvi.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./Tooltip-CEK6AKAu.js";import"./index-BEzypSCe.js";import"./index-CMpfNFkf.js";import"./index-DMpwjUjF.js";import"./index-BrCyuQaX.js";import"./index-BsXVsMKl.js";import"./index-D51dyxd9.js";import"./index-DOgW8-qp.js";import"./index-8bz-aukh.js";import"./index-CAndCr3r.js";import"./index-CicujPQK.js";import"./index-DhLWBaXY.js";import"./index-C8TUTqI8.js";import"./index-DqBXtJo3.js";import"./index-BLAtDC55.js";import"./index-ChEho857.js";const K={title:"New Components/InfoTip",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["The ⓘ beside a heading or a label, in place of a helper paragraph. Its explainer opens in the library Tooltip on hover, on keyboard focus and on a press - touch has no hover - and a second press on the ⓘ does not blink it shut. Leaving, Escape, blur or a press anywhere else closes it.","","A 20px box holding the filled info glyph at 14, quiet at rest so it never competes with the heading beside it; the explainer opens under its start, reads from the left and wraps at 340.","","`learnMore` adds a link at the foot. The pointer can travel into the bubble to reach it, and Tab on the open ⓘ moves into it; from the link, Tab moves on, Shift+Tab returns to the ⓘ and Escape closes.","","**Ported from the console (Pranjal, 2026-10-13)**, which had three hand-made copies: the Settings headings' ⓘ (its look), the offboarding cards' ⓘ (the same placement) and the setup drawers' ⓘ (its press-to-open behaviour). The link is new."].join(`
`)}}},args:{label:"About Security policy",children:"Applies to every user in this organization. A stricter rule set on a site wins over this one."},argTypes:{learnMore:{control:"object"},icon:{control:!1}},decorators:[A=>e.jsx("div",{className:"mdt-flex mdt-min-h-[220px] mdt-items-start mdt-justify-center mdt-pt-6",children:e.jsx(A,{})})]},s={},t={parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-w-[24rem] mdt-flex-col mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-1",children:[e.jsx("h3",{className:"mdt-m-0 mdt-text-base mdt-font-semibold mdt-text-foreground",children:"Security policy"}),e.jsx(n,{label:"About Security policy",children:"Applies to every user in this organization. A stricter rule set on a site wins over this one."})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-1",children:[e.jsx("span",{className:"mdt-text-[13px] mdt-font-medium mdt-text-neutral-90",children:"Entity ID"}),e.jsx(n,{label:"About Entity ID",children:"The name your identity provider knows OneOps by. Paste it into the provider's SAML settings."})]})]})},r={args:{label:"About SCIM",children:"Your identity provider creates, updates and removes users here, so nobody has to do it by hand.",learnMore:{href:"https://scim.cloud",newTab:!0}}},o={args:{label:"Why this mapping is broken",children:"The source attribute no longer exists in the directory. Pick another, or remove the row.",icon:e.jsx(j,{name:"alert-triangle",size:14,"aria-hidden":!0})}};var i,a,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(d=(a=s.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};var m,p,l,c,h;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="mdt-flex mdt-w-[24rem] mdt-flex-col mdt-gap-6">
      <div className="mdt-flex mdt-items-center mdt-gap-1">
        <h3 className="mdt-m-0 mdt-text-base mdt-font-semibold mdt-text-foreground">
          Security policy
        </h3>
        <InfoTip label="About Security policy">
          Applies to every user in this organization. A stricter rule set on a site wins over this
          one.
        </InfoTip>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-1">
        <span className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">Entity ID</span>
        <InfoTip label="About Entity ID">
          The name your identity provider knows OneOps by. Paste it into the provider&apos;s SAML
          settings.
        </InfoTip>
      </div>
    </div>
}`,...(l=(p=t.parameters)==null?void 0:p.docs)==null?void 0:l.source},description:{story:"Beside a heading and beside a field label - where it lives.",...(h=(c=t.parameters)==null?void 0:c.docs)==null?void 0:h.description}}};var u,b,f,x,y;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'About SCIM',
    children: 'Your identity provider creates, updates and removes users here, so nobody has to do it by hand.',
    learnMore: {
      href: 'https://scim.cloud',
      newTab: true
    }
  }
}`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source},description:{story:"A link at the foot of the explainer.",...(y=(x=r.parameters)==null?void 0:x.docs)==null?void 0:y.description}}};var g,v,I,w,T;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Why this mapping is broken',
    children: 'The source attribute no longer exists in the directory. Pick another, or remove the row.',
    icon: <Icon name="alert-triangle" size={14} aria-hidden />
  }
}`,...(I=(v=o.parameters)==null?void 0:v.docs)==null?void 0:I.source},description:{story:"Another glyph with the same explainer.",...(T=(w=o.parameters)==null?void 0:w.docs)==null?void 0:T.description}}};const Q=["Default","InContext","WithLearnMore","CustomIcon"];export{o as CustomIcon,s as Default,t as InContext,r as WithLearnMore,Q as __namedExportsOrder,K as default};
//# sourceMappingURL=InfoTip.stories-B8RhzIYM.js.map
