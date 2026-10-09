import{j as t}from"./iframe-BiWG0vd5.js";import{S as e}from"./Separator-CFYiTjsl.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";const Xt={title:"Layout/Separator",component:e,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A separator component for visually dividing content. Supports horizontal and vertical orientations, different styles (solid, dashed, dotted), thickness, and spacing options."}}},argTypes:{orientation:{control:"select",options:["horizontal","vertical"],description:"Orientation of the separator",table:{defaultValue:{summary:"horizontal"}}},variant:{control:"select",options:["solid","dashed","dotted"],description:"Style variant of the separator",table:{defaultValue:{summary:"solid"}}},thickness:{control:"select",options:["thin","medium","thick"],description:"Thickness of the separator",table:{defaultValue:{summary:"thin"}}},spacing:{control:"select",options:["none","sm","md","lg","xl"],description:"Spacing around the separator",table:{defaultValue:{summary:"none"}}},decorative:{control:"boolean",description:"Whether the separator is purely decorative",table:{defaultValue:{summary:"true"}}},label:{control:"text",description:'Label to display on the separator (e.g., "OR")'},labelPosition:{control:"select",options:["left","center","right"],description:"Position of the label on the separator",table:{defaultValue:{summary:"center"}}},labelClassName:{control:"text",description:"Custom className for the label element"}}},m={args:{},render:N=>t.jsxs("div",{className:"mdt-w-96",children:[t.jsx("p",{className:"mdt-text-sm",children:"Content above"}),t.jsx(e,{...N}),t.jsx("p",{className:"mdt-text-sm",children:"Content below"})]})},d={args:{orientation:"vertical"},render:N=>t.jsxs("div",{className:"mdt-flex mdt-h-20 mdt-items-center mdt-gap-4",children:[t.jsx("p",{className:"mdt-text-sm",children:"Left content"}),t.jsx(e,{...N}),t.jsx("p",{className:"mdt-text-sm",children:"Right content"})]})},s={render:()=>t.jsxs("div",{className:"mdt-w-96 mdt-space-y-8",children:[t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Solid (default)"}),t.jsx(e,{variant:"solid"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Dashed"}),t.jsx(e,{variant:"dashed"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Dotted"}),t.jsx(e,{variant:"dotted"})]})]})},a={render:()=>t.jsxs("div",{className:"mdt-w-96 mdt-space-y-8",children:[t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Thin (1px)"}),t.jsx(e,{thickness:"thin"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Medium (2px)"}),t.jsx(e,{thickness:"medium"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Thick (4px)"}),t.jsx(e,{thickness:"thick"})]})]})},n={render:()=>t.jsxs("div",{className:"mdt-w-96 mdt-space-y-8",children:[t.jsxs("div",{children:[t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"None (no spacing)"}),t.jsx(e,{spacing:"none"}),t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"Next item"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"Small spacing (8px)"}),t.jsx(e,{spacing:"sm"}),t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"Next item"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"Medium spacing (16px)"}),t.jsx(e,{spacing:"md"}),t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"Next item"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"Large spacing (24px)"}),t.jsx(e,{spacing:"lg"}),t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"Next item"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"Extra large spacing (32px)"}),t.jsx(e,{spacing:"xl"}),t.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"Next item"})]})]})},r={render:()=>t.jsx("div",{className:"mdt-w-96",children:t.jsx(e,{label:"OR"})})},i={render:()=>t.jsxs("div",{className:"mdt-w-96 mdt-space-y-8",children:[t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Left aligned"}),t.jsx(e,{label:"Continue with",labelPosition:"left"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Center aligned (default)"}),t.jsx(e,{label:"OR",labelPosition:"center"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Right aligned"}),t.jsx(e,{label:"Continue with",labelPosition:"right"})]})]})},o={render:()=>t.jsxs("div",{className:"mdt-w-96 mdt-space-y-8",children:[t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Solid (default)"}),t.jsx(e,{label:"OR",variant:"solid"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Dashed"}),t.jsx(e,{label:"OR",variant:"dashed"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Dotted"}),t.jsx(e,{label:"OR",variant:"dotted"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Thick"}),t.jsx(e,{label:"OR",thickness:"thick"})]})]})},l={render:()=>t.jsxs("div",{className:"mdt-mx-auto mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6",children:[t.jsx("h2",{className:"mdt-mb-6 mdt-text-center mdt-text-2xl mdt-font-bold",children:"Sign In"}),t.jsx("button",{className:"mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted",children:"Continue with Google"}),t.jsx("button",{className:"mdt-mt-2 mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted",children:"Continue with GitHub"}),t.jsx(e,{label:"OR",className:"mdt-my-6"}),t.jsx("input",{type:"email",placeholder:"Email",className:"mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"}),t.jsx("input",{type:"password",placeholder:"Password",className:"mdt-mt-2 mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm"}),t.jsx("button",{className:"mdt-mt-4 mdt-w-full mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90",children:"Sign In"})]})},c={render:()=>t.jsxs("div",{className:"mdt-w-96 mdt-space-y-8",children:[t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Bold uppercase"}),t.jsx(e,{label:"OR",labelClassName:"mdt-font-bold mdt-uppercase"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Primary color"}),t.jsx(e,{label:"OR",labelClassName:"mdt-text-primary mdt-font-semibold"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"Larger text"}),t.jsx(e,{label:"OR",labelClassName:"mdt-text-base mdt-font-medium"})]}),t.jsxs("div",{children:[t.jsx("p",{className:"mdt-mb-4 mdt-text-sm mdt-font-medium",children:"With background"}),t.jsx(e,{label:"OR",labelClassName:"mdt-bg-muted mdt-px-4 mdt-py-1 mdt-rounded-full mdt-font-medium"})]})]})},p={render:()=>t.jsxs("div",{className:"mdt-space-y-8",children:[t.jsxs("div",{className:"mdt-flex mdt-h-32 mdt-items-center",children:[t.jsx("div",{className:"mdt-flex-1 mdt-text-center",children:t.jsx("p",{className:"mdt-text-sm",children:"Left content"})}),t.jsx(e,{orientation:"vertical",label:"OR",className:"mdt-h-full"}),t.jsx("div",{className:"mdt-flex-1 mdt-text-center",children:t.jsx("p",{className:"mdt-text-sm",children:"Right content"})})]}),t.jsxs("div",{className:"mdt-flex mdt-h-32 mdt-items-center",children:[t.jsx("div",{className:"mdt-flex-1 mdt-text-center",children:t.jsx("p",{className:"mdt-text-sm",children:"Left content"})}),t.jsx(e,{orientation:"vertical",label:"OR",labelPosition:"left",className:"mdt-h-full"}),t.jsx("div",{className:"mdt-flex-1 mdt-text-center",children:t.jsx("p",{className:"mdt-text-sm",children:"Right content"})})]})]})},x={render:()=>t.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-4",children:[t.jsxs("div",{className:"mdt-flex mdt-h-12 mdt-items-center mdt-gap-4",children:[t.jsx("span",{className:"mdt-text-sm",children:"Item 1"}),t.jsx(e,{orientation:"vertical"}),t.jsx("span",{className:"mdt-text-sm",children:"Item 2"})]}),t.jsxs("div",{className:"mdt-flex mdt-h-16 mdt-items-center mdt-gap-4",children:[t.jsx("span",{className:"mdt-text-sm",children:"Taller"}),t.jsx(e,{orientation:"vertical",thickness:"medium"}),t.jsx("span",{className:"mdt-text-sm",children:"Items"})]}),t.jsxs("div",{className:"mdt-flex mdt-h-20 mdt-items-center mdt-gap-4",children:[t.jsx("span",{className:"mdt-text-sm",children:"Even"}),t.jsx(e,{orientation:"vertical",thickness:"thick"}),t.jsx("span",{className:"mdt-text-sm",children:"Taller"})]})]})},u={render:()=>t.jsxs("div",{className:"mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border",children:[t.jsxs("div",{className:"mdt-p-4",children:[t.jsx("h4",{className:"mdt-font-medium",children:"Item 1"}),t.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Description for item 1"})]}),t.jsx(e,{}),t.jsxs("div",{className:"mdt-p-4",children:[t.jsx("h4",{className:"mdt-font-medium",children:"Item 2"}),t.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Description for item 2"})]}),t.jsx(e,{}),t.jsxs("div",{className:"mdt-p-4",children:[t.jsx("h4",{className:"mdt-font-medium",children:"Item 3"}),t.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Description for item 3"})]})]})},h={render:()=>t.jsxs("nav",{className:"mdt-flex mdt-items-center mdt-gap-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-4",children:[t.jsx("button",{type:"button",className:"mdt-text-sm hover:mdt-text-primary",children:"Home"}),t.jsx(e,{orientation:"vertical",className:"mdt-h-4"}),t.jsx("button",{type:"button",className:"mdt-text-sm hover:mdt-text-primary",children:"About"}),t.jsx(e,{orientation:"vertical",className:"mdt-h-4"}),t.jsx("button",{type:"button",className:"mdt-text-sm hover:mdt-text-primary",children:"Services"}),t.jsx(e,{orientation:"vertical",className:"mdt-h-4"}),t.jsx("button",{type:"button",className:"mdt-text-sm hover:mdt-text-primary",children:"Contact"})]})},b={render:()=>t.jsxs("div",{className:"mdt-w-96",children:[t.jsxs("section",{children:[t.jsx("h2",{className:"mdt-mb-2 mdt-text-lg mdt-font-bold",children:"Section 1"}),t.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"This is the first section with some content explaining the first topic."})]}),t.jsx(e,{spacing:"lg",thickness:"medium"}),t.jsxs("section",{children:[t.jsx("h2",{className:"mdt-mb-2 mdt-text-lg mdt-font-bold",children:"Section 2"}),t.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"This is the second section with different content."})]}),t.jsx(e,{spacing:"lg",thickness:"medium"}),t.jsxs("section",{children:[t.jsx("h2",{className:"mdt-mb-2 mdt-text-lg mdt-font-bold",children:"Section 3"}),t.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"This is the third section continuing the content."})]})]})},v={render:()=>t.jsxs("div",{className:"mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6",children:[t.jsxs("div",{children:[t.jsx("h3",{className:"mdt-mb-1 mdt-text-base mdt-font-semibold",children:"Card Title"}),t.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Card subtitle or description"})]}),t.jsx(e,{spacing:"md",variant:"dashed"}),t.jsxs("div",{children:[t.jsx("h4",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Details"}),t.jsxs("ul",{className:"mdt-space-y-1 mdt-text-sm mdt-text-muted-foreground",children:[t.jsx("li",{children:"• Detail item 1"}),t.jsx("li",{children:"• Detail item 2"}),t.jsx("li",{children:"• Detail item 3"})]})]}),t.jsx(e,{spacing:"md",variant:"dashed"}),t.jsxs("div",{className:"mdt-flex mdt-justify-end mdt-gap-2",children:[t.jsx("button",{className:"mdt-rounded-md mdt-border mdt-border-input mdt-px-3 mdt-py-1.5 mdt-text-sm hover:mdt-bg-muted",children:"Cancel"}),t.jsx("button",{className:"mdt-rounded-md mdt-bg-primary mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90",children:"Submit"})]})]})};var f,g,j,y,S;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {},
  render: args => <div className="mdt-w-96">
      <p className="mdt-text-sm">Content above</p>
      <Separator {...args} />
      <p className="mdt-text-sm">Content below</p>
    </div>
}`,...(j=(g=m.parameters)==null?void 0:g.docs)==null?void 0:j.source},description:{story:"Default horizontal separator.",...(S=(y=m.parameters)==null?void 0:y.docs)==null?void 0:S.description}}};var w,k,C,R,D;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical'
  },
  render: args => <div className="mdt-flex mdt-h-20 mdt-items-center mdt-gap-4">
      <p className="mdt-text-sm">Left content</p>
      <Separator {...args} />
      <p className="mdt-text-sm">Right content</p>
    </div>
}`,...(C=(k=d.parameters)==null?void 0:k.docs)==null?void 0:C.source},description:{story:"Vertical separator between items.",...(D=(R=d.parameters)==null?void 0:R.docs)==null?void 0:D.description}}};var L,O,T,V,I;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Solid (default)</p>
        <Separator variant="solid" />
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Dashed</p>
        <Separator variant="dashed" />
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Dotted</p>
        <Separator variant="dotted" />
      </div>
    </div>
}`,...(T=(O=s.parameters)==null?void 0:O.docs)==null?void 0:T.source},description:{story:"Different style variants.",...(I=(V=s.parameters)==null?void 0:V.docs)==null?void 0:I.description}}};var P,E,W,z,G;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Thin (1px)</p>
        <Separator thickness="thin" />
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Medium (2px)</p>
        <Separator thickness="medium" />
      </div>

      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-font-medium">Thick (4px)</p>
        <Separator thickness="thick" />
      </div>
    </div>
}`,...(W=(E=a.parameters)==null?void 0:E.docs)==null?void 0:W.source},description:{story:"Different thickness options.",...(G=(z=a.parameters)==null?void 0:z.docs)==null?void 0:G.description}}};var H,M,A,B,F;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-text-sm mdt-font-medium">None (no spacing)</p>
        <Separator spacing="none" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>

      <div>
        <p className="mdt-text-sm mdt-font-medium">Small spacing (8px)</p>
        <Separator spacing="sm" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>

      <div>
        <p className="mdt-text-sm mdt-font-medium">Medium spacing (16px)</p>
        <Separator spacing="md" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>

      <div>
        <p className="mdt-text-sm mdt-font-medium">Large spacing (24px)</p>
        <Separator spacing="lg" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>

      <div>
        <p className="mdt-text-sm mdt-font-medium">Extra large spacing (32px)</p>
        <Separator spacing="xl" />
        <p className="mdt-text-sm mdt-font-medium">Next item</p>
      </div>
    </div>
}`,...(A=(M=n.parameters)==null?void 0:M.docs)==null?void 0:A.source},description:{story:"Spacing around the separator.",...(F=(B=n.parameters)==null?void 0:B.docs)==null?void 0:F.description}}};var _,q,J,K,Q;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96">
      <Separator label="OR" />
    </div>
}`,...(J=(q=r.parameters)==null?void 0:q.docs)==null?void 0:J.source},description:{story:"Separator with text label (centered).",...(Q=(K=r.parameters)==null?void 0:K.docs)==null?void 0:Q.description}}};var U,X,Y,Z,$;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Left aligned</p>
        <Separator label="Continue with" labelPosition="left" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Center aligned (default)</p>
        <Separator label="OR" labelPosition="center" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Right aligned</p>
        <Separator label="Continue with" labelPosition="right" />
      </div>
    </div>
}`,...(Y=(X=i.parameters)==null?void 0:X.docs)==null?void 0:Y.source},description:{story:"Separator with label in different positions.",...($=(Z=i.parameters)==null?void 0:Z.docs)==null?void 0:$.description}}};var tt,et,mt,dt,st;o.parameters={...o.parameters,docs:{...(tt=o.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Solid (default)</p>
        <Separator label="OR" variant="solid" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Dashed</p>
        <Separator label="OR" variant="dashed" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Dotted</p>
        <Separator label="OR" variant="dotted" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Thick</p>
        <Separator label="OR" thickness="thick" />
      </div>
    </div>
}`,...(mt=(et=o.parameters)==null?void 0:et.docs)==null?void 0:mt.source},description:{story:"Separator with label and different variants.",...(st=(dt=o.parameters)==null?void 0:dt.docs)==null?void 0:st.description}}};var at,nt,rt,it,ot;l.parameters={...l.parameters,docs:{...(at=l.parameters)==null?void 0:at.docs,source:{originalSource:`{
  render: () => <div className="mdt-mx-auto mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
      <h2 className="mdt-mb-6 mdt-text-center mdt-text-2xl mdt-font-bold">Sign In</h2>

      <button className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
        Continue with Google
      </button>

      <button className="mdt-mt-2 mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-py-2 mdt-text-sm hover:mdt-bg-muted">
        Continue with GitHub
      </button>

      <Separator label="OR" className="mdt-my-6" />

      <input type="email" placeholder="Email" className="mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm" />

      <input type="password" placeholder="Password" className="mdt-mt-2 mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-3 mdt-py-2 mdt-text-sm" />

      <button className="mdt-mt-4 mdt-w-full mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90">
        Sign In
      </button>
    </div>
}`,...(rt=(nt=l.parameters)==null?void 0:nt.docs)==null?void 0:rt.source},description:{story:"Real-world login form example with separator label.",...(ot=(it=l.parameters)==null?void 0:it.docs)==null?void 0:ot.description}}};var lt,ct,pt,xt,ut;c.parameters={...c.parameters,docs:{...(lt=c.parameters)==null?void 0:lt.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96 mdt-space-y-8">
      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Bold uppercase</p>
        <Separator label="OR" labelClassName="mdt-font-bold mdt-uppercase" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Primary color</p>
        <Separator label="OR" labelClassName="mdt-text-primary mdt-font-semibold" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">Larger text</p>
        <Separator label="OR" labelClassName="mdt-text-base mdt-font-medium" />
      </div>

      <div>
        <p className="mdt-mb-4 mdt-text-sm mdt-font-medium">With background</p>
        <Separator label="OR" labelClassName="mdt-bg-muted mdt-px-4 mdt-py-1 mdt-rounded-full mdt-font-medium" />
      </div>
    </div>
}`,...(pt=(ct=c.parameters)==null?void 0:ct.docs)==null?void 0:pt.source},description:{story:"Separator with custom label styling.",...(ut=(xt=c.parameters)==null?void 0:xt.docs)==null?void 0:ut.description}}};var ht,bt,vt,Nt,ft;p.parameters={...p.parameters,docs:{...(ht=p.parameters)==null?void 0:ht.docs,source:{originalSource:`{
  render: () => <div className="mdt-space-y-8">
      <div className="mdt-flex mdt-h-32 mdt-items-center">
        <div className="mdt-flex-1 mdt-text-center">
          <p className="mdt-text-sm">Left content</p>
        </div>
        <Separator orientation="vertical" label="OR" className="mdt-h-full" />
        <div className="mdt-flex-1 mdt-text-center">
          <p className="mdt-text-sm">Right content</p>
        </div>
      </div>

      <div className="mdt-flex mdt-h-32 mdt-items-center">
        <div className="mdt-flex-1 mdt-text-center">
          <p className="mdt-text-sm">Left content</p>
        </div>
        <Separator orientation="vertical" label="OR" labelPosition="left" className="mdt-h-full" />
        <div className="mdt-flex-1 mdt-text-center">
          <p className="mdt-text-sm">Right content</p>
        </div>
      </div>
    </div>
}`,...(vt=(bt=p.parameters)==null?void 0:bt.docs)==null?void 0:vt.source},description:{story:"Vertical separator with label.",...(ft=(Nt=p.parameters)==null?void 0:Nt.docs)==null?void 0:ft.description}}};var gt,jt,yt,St,wt;x.parameters={...x.parameters,docs:{...(gt=x.parameters)==null?void 0:gt.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-center mdt-gap-4">
      <div className="mdt-flex mdt-h-12 mdt-items-center mdt-gap-4">
        <span className="mdt-text-sm">Item 1</span>
        <Separator orientation="vertical" />
        <span className="mdt-text-sm">Item 2</span>
      </div>

      <div className="mdt-flex mdt-h-16 mdt-items-center mdt-gap-4">
        <span className="mdt-text-sm">Taller</span>
        <Separator orientation="vertical" thickness="medium" />
        <span className="mdt-text-sm">Items</span>
      </div>

      <div className="mdt-flex mdt-h-20 mdt-items-center mdt-gap-4">
        <span className="mdt-text-sm">Even</span>
        <Separator orientation="vertical" thickness="thick" />
        <span className="mdt-text-sm">Taller</span>
      </div>
    </div>
}`,...(yt=(jt=x.parameters)==null?void 0:jt.docs)==null?void 0:yt.source},description:{story:"Vertical separator with different heights.",...(wt=(St=x.parameters)==null?void 0:St.docs)==null?void 0:wt.description}}};var kt,Ct,Rt,Dt,Lt;u.parameters={...u.parameters,docs:{...(kt=u.parameters)==null?void 0:kt.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border">
      <div className="mdt-p-4">
        <h4 className="mdt-font-medium">Item 1</h4>
        <p className="mdt-text-sm mdt-text-muted-foreground">Description for item 1</p>
      </div>
      <Separator />
      <div className="mdt-p-4">
        <h4 className="mdt-font-medium">Item 2</h4>
        <p className="mdt-text-sm mdt-text-muted-foreground">Description for item 2</p>
      </div>
      <Separator />
      <div className="mdt-p-4">
        <h4 className="mdt-font-medium">Item 3</h4>
        <p className="mdt-text-sm mdt-text-muted-foreground">Description for item 3</p>
      </div>
    </div>
}`,...(Rt=(Ct=u.parameters)==null?void 0:Ct.docs)==null?void 0:Rt.source},description:{story:"List with separators.",...(Lt=(Dt=u.parameters)==null?void 0:Dt.docs)==null?void 0:Lt.description}}};var Ot,Tt,Vt,It,Pt;h.parameters={...h.parameters,docs:{...(Ot=h.parameters)==null?void 0:Ot.docs,source:{originalSource:`{
  render: () => <nav className="mdt-flex mdt-items-center mdt-gap-4 mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
      <button type="button" className="mdt-text-sm hover:mdt-text-primary">
        Home
      </button>
      <Separator orientation="vertical" className="mdt-h-4" />
      <button type="button" className="mdt-text-sm hover:mdt-text-primary">
        About
      </button>
      <Separator orientation="vertical" className="mdt-h-4" />
      <button type="button" className="mdt-text-sm hover:mdt-text-primary">
        Services
      </button>
      <Separator orientation="vertical" className="mdt-h-4" />
      <button type="button" className="mdt-text-sm hover:mdt-text-primary">
        Contact
      </button>
    </nav>
}`,...(Vt=(Tt=h.parameters)==null?void 0:Tt.docs)==null?void 0:Vt.source},description:{story:"Navigation with vertical separators.",...(Pt=(It=h.parameters)==null?void 0:It.docs)==null?void 0:Pt.description}}};var Et,Wt,zt,Gt,Ht;b.parameters={...b.parameters,docs:{...(Et=b.parameters)==null?void 0:Et.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96">
      <section>
        <h2 className="mdt-mb-2 mdt-text-lg mdt-font-bold">Section 1</h2>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          This is the first section with some content explaining the first topic.
        </p>
      </section>

      <Separator spacing="lg" thickness="medium" />

      <section>
        <h2 className="mdt-mb-2 mdt-text-lg mdt-font-bold">Section 2</h2>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          This is the second section with different content.
        </p>
      </section>

      <Separator spacing="lg" thickness="medium" />

      <section>
        <h2 className="mdt-mb-2 mdt-text-lg mdt-font-bold">Section 3</h2>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          This is the third section continuing the content.
        </p>
      </section>
    </div>
}`,...(zt=(Wt=b.parameters)==null?void 0:Wt.docs)==null?void 0:zt.source},description:{story:"Section divider example.",...(Ht=(Gt=b.parameters)==null?void 0:Gt.docs)==null?void 0:Ht.description}}};var Mt,At,Bt,Ft,_t;v.parameters={...v.parameters,docs:{...(Mt=v.parameters)==null?void 0:Mt.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card mdt-p-6">
      <div>
        <h3 className="mdt-mb-1 mdt-text-base mdt-font-semibold">Card Title</h3>
        <p className="mdt-text-sm mdt-text-muted-foreground">Card subtitle or description</p>
      </div>

      <Separator spacing="md" variant="dashed" />

      <div>
        <h4 className="mdt-mb-2 mdt-text-sm mdt-font-medium">Details</h4>
        <ul className="mdt-space-y-1 mdt-text-sm mdt-text-muted-foreground">
          <li>• Detail item 1</li>
          <li>• Detail item 2</li>
          <li>• Detail item 3</li>
        </ul>
      </div>

      <Separator spacing="md" variant="dashed" />

      <div className="mdt-flex mdt-justify-end mdt-gap-2">
        <button className="mdt-rounded-md mdt-border mdt-border-input mdt-px-3 mdt-py-1.5 mdt-text-sm hover:mdt-bg-muted">
          Cancel
        </button>
        <button className="mdt-rounded-md mdt-bg-primary mdt-px-3 mdt-py-1.5 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90">
          Submit
        </button>
      </div>
    </div>
}`,...(Bt=(At=v.parameters)==null?void 0:At.docs)==null?void 0:Bt.source},description:{story:"Card with sections.",...(_t=(Ft=v.parameters)==null?void 0:Ft.docs)==null?void 0:_t.description}}};const Yt=["Default","Vertical","Variants","Thickness","Spacing","WithLabel","LabelPositions","LabelWithVariants","LoginFormExample","CustomLabelStyling","VerticalWithLabel","VerticalVariations","ListExample","NavigationExample","SectionDivider","CardSections"];export{v as CardSections,c as CustomLabelStyling,m as Default,i as LabelPositions,o as LabelWithVariants,u as ListExample,l as LoginFormExample,h as NavigationExample,b as SectionDivider,n as Spacing,a as Thickness,s as Variants,d as Vertical,x as VerticalVariations,p as VerticalWithLabel,r as WithLabel,Yt as __namedExportsOrder,Xt as default};
//# sourceMappingURL=Separator.stories-Ehq24LrJ.js.map
