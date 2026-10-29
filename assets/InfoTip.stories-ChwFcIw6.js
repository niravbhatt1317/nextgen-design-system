import{j as e}from"./iframe-BVny_pRr.js";import{I as a}from"./InfoTip-B1Ri-meU.js";import{I as M}from"./Icon-B1KNd0Hv.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./index-Dan2Y3pQ.js";import"./index-fjg5WwAA.js";import"./index-KbrO5x-l.js";import"./index-D7V6g07c.js";import"./index-C_axOCZc.js";import"./index-DEDJQErV.js";import"./index-BKyR8UQD.js";import"./index-JrAwV7wi.js";import"./index--2V8L0lP.js";import"./index-DYEW8koA.js";import"./index-DTKSwrNG.js";import"./index-Br9mv3eE.js";import"./index-thbIhSdZ.js";import"./index-ndUxbvvW.js";import"./index-CP1w2CP5.js";import"./index-ChEho857.js";const{userEvent:C,within:P}=__STORYBOOK_MODULE_TEST__,te={title:"New Components/InfoTip",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["The ⓘ beside a heading or a label, in place of a helper paragraph. Its explainer opens in the library Tooltip on hover, on keyboard focus and on a press - touch has no hover - and a second press on the ⓘ does not blink it shut. Leaving, Escape, blur or a press anywhere else closes it.","","A 20px box holding the filled info glyph at 14, quiet at rest so it never competes with the heading beside it; the explainer opens under its start, reads from the left and wraps at 340.","",'On hover, focus and while its explainer is open **only the glyph answers**: neutral-40 darkens to neutral-60 and nothing is drawn behind it, in either theme, so it never shows a pale box on a tinted card (Pranjal, 2026-10-27: "only icon should have hover"). The keyboard keeps its focus ring.',"","`learnMore` adds a link at the foot. The pointer can travel into the bubble to reach it, and Tab on the open ⓘ moves into it; from the link, Tab moves on, Shift+Tab returns to the ⓘ and Escape closes.","","**Ported from the console (Pranjal, 2026-10-13)**, which had three hand-made copies: the Settings headings' ⓘ (its look), the offboarding cards' ⓘ (the same placement) and the setup drawers' ⓘ (its press-to-open behaviour). The link is new."].join(`
`)}}},args:{label:"About Security policy",children:"Applies to every user in this organization. A stricter rule set on a site wins over this one."},argTypes:{learnMore:{control:"object"},icon:{control:!1}},decorators:[i=>e.jsx("div",{className:"mdt-flex mdt-min-h-[220px] mdt-items-start mdt-justify-center mdt-pt-6",children:e.jsx(i,{})})]},n={},t={parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-w-[24rem] mdt-flex-col mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-1",children:[e.jsx("h3",{className:"mdt-m-0 mdt-text-base mdt-font-semibold mdt-text-foreground",children:"Security policy"}),e.jsx(a,{label:"About Security policy",children:"Applies to every user in this organization. A stricter rule set on a site wins over this one."})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-1",children:[e.jsx("span",{className:"mdt-text-[13px] mdt-font-medium mdt-text-neutral-90",children:"Entity ID"}),e.jsx(a,{label:"About Entity ID",children:"The name your identity provider knows OneOps by. Paste it into the provider's SAML settings."})]})]})},r={parameters:{controls:{disable:!0}},play:async({canvasElement:i})=>{await C.hover(P(i).getByRole("button",{name:"About retiring"}))},render:()=>e.jsxs("div",{className:"mdt-flex mdt-w-[24rem] mdt-items-center mdt-gap-1 mdt-rounded-lg mdt-border mdt-border-solid mdt-border-feedback-danger-border mdt-bg-feedback-danger-bg mdt-p-4",children:[e.jsx("h3",{className:"mdt-m-0 mdt-text-sm mdt-font-semibold mdt-text-foreground",children:"Retire this agent"}),e.jsx(a,{label:"About retiring",children:"The agent stops reporting and its seat is released. Its history stays for 30 days."})]})},o={args:{label:"About SCIM",children:"Your identity provider creates, updates and removes users here, so nobody has to do it by hand.",learnMore:{href:"https://scim.cloud",newTab:!0}}},s={args:{label:"Why this mapping is broken",children:"The source attribute no longer exists in the directory. Pick another, or remove the row.",icon:e.jsx(M,{name:"alert-triangle",size:14,"aria-hidden":!0})}};var d,m,l;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(l=(m=n.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var c,p,h,u,b;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(h=(p=t.parameters)==null?void 0:p.docs)==null?void 0:h.source},description:{story:"Beside a heading and beside a field label - where it lives.",...(b=(u=t.parameters)==null?void 0:u.docs)==null?void 0:b.description}}};var g,y,f,x,v;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  play: async ({
    canvasElement
  }) => {
    await userEvent.hover(within(canvasElement).getByRole('button', {
      name: 'About retiring'
    }));
  },
  render: () => <div className="mdt-flex mdt-w-[24rem] mdt-items-center mdt-gap-1 mdt-rounded-lg mdt-border mdt-border-solid mdt-border-feedback-danger-border mdt-bg-feedback-danger-bg mdt-p-4">
      <h3 className="mdt-m-0 mdt-text-sm mdt-font-semibold mdt-text-foreground">
        Retire this agent
      </h3>
      <InfoTip label="About retiring">
        The agent stops reporting and its seat is released. Its history stays for 30 days.
      </InfoTip>
    </div>
}`,...(f=(y=r.parameters)==null?void 0:y.docs)==null?void 0:f.source},description:{story:`Under the pointer, on a tinted card: only the glyph darkens (neutral-40 to neutral-60) - nothing is drawn
behind it, so no pale box shows on the danger wash (Pranjal, 2026-10-27). The play hovers the ⓘ.`,...(v=(x=r.parameters)==null?void 0:x.docs)==null?void 0:v.description}}};var w,T,I,A,j;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'About SCIM',
    children: 'Your identity provider creates, updates and removes users here, so nobody has to do it by hand.',
    learnMore: {
      href: 'https://scim.cloud',
      newTab: true
    }
  }
}`,...(I=(T=o.parameters)==null?void 0:T.docs)==null?void 0:I.source},description:{story:"A link at the foot of the explainer.",...(j=(A=o.parameters)==null?void 0:A.docs)==null?void 0:j.description}}};var k,S,N,E,O;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Why this mapping is broken',
    children: 'The source attribute no longer exists in the directory. Pick another, or remove the row.',
    icon: <Icon name="alert-triangle" size={14} aria-hidden />
  }
}`,...(N=(S=s.parameters)==null?void 0:S.docs)==null?void 0:N.source},description:{story:"Another glyph with the same explainer.",...(O=(E=s.parameters)==null?void 0:E.docs)==null?void 0:O.description}}};const re=["Default","InContext","HoveredOnATintedCard","WithLearnMore","CustomIcon"];export{s as CustomIcon,n as Default,r as HoveredOnATintedCard,t as InContext,o as WithLearnMore,re as __namedExportsOrder,te as default};
//# sourceMappingURL=InfoTip.stories-ChwFcIw6.js.map
