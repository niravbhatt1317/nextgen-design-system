import{j as e,r as q}from"./iframe-B4s2k7w1.js";import{F as H}from"./AiMark-C8D-PxjZ.js";import{C as t}from"./Callout-BLe-Jb5R.js";import{I as J}from"./Input-CxBR0EXm.js";import{B as u}from"./Button-B-LcAj3B.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./index-ChEho857.js";import"./Icon-dDXbmkPX.js";const oe={title:"Deprecated/Callout",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`A tinted block that says something about the content around it.

**It is already there when you arrive.** That is the whole difference from
\`Toast\`, and it decides everything else: a callout does not animate in, does
not time out, is not announced as it appears, and is not dismissible unless
you ask. A toast interrupts you; a callout is part of the page.

The six tones are \`Toast\`'s, from the same table in \`@/utils/feedback-tones\`,
so a seventh tone is one edit rather than two that drift.`}}},args:{tone:"neutral",children:"Guest users lose access when their invite expires."}},c={},a={render:()=>e.jsx("div",{className:"mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-3",children:H.map(n=>e.jsx(t,{tone:n,title:n,children:"The body text is the same colour here as in every other tone."},n))})},s={render:()=>e.jsxs("div",{className:"mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-6",children:[e.jsxs(t,{tone:"danger",title:"This cannot be undone",children:["Deleting ",e.jsx("strong",{children:"Acme Production"})," removes:",e.jsxs("ul",{className:"mdt-mt-1.5 mdt-list-disc mdt-space-y-0.5 mdt-pl-4",children:[e.jsx("li",{children:"3 members, immediately"}),e.jsx("li",{children:"12 files, permanently"}),e.jsx("li",{children:"All API keys issued to this workspace"})]})]}),e.jsx(t,{tone:"info",title:"What happens next",children:"We will email an invite to each address. Guests can accept for 7 days, and their access ends automatically 30 days after that."}),e.jsx(t,{tone:"warning",children:"You are close to your plan's limit — 48 of 50 seats are in use."}),e.jsx(t,{tone:"neutral",icon:!1,title:"Access limits",children:e.jsx("div",{className:"mdt-mt-2 mdt-flex mdt-flex-col mdt-gap-2",children:[{name:"Maximum seats",value:"50"},{name:"Session length",value:"8 hours"}].map(n=>e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between mdt-gap-4",children:[e.jsx("span",{children:n.name}),e.jsx(J,{"aria-label":n.name,defaultValue:n.value,className:"mdt-w-32 mdt-text-right"})]},n.name))})})]})},o={render:()=>e.jsx("div",{className:"mdt-flex mdt-max-w-md mdt-flex-col mdt-gap-3",children:e.jsx(t,{tone:"warning",title:"Two members have not accepted their invite",actions:e.jsxs(e.Fragment,{children:[e.jsx(u,{size:"sm",children:"Resend invites"}),e.jsx(u,{size:"sm",variant:"ghost",children:"Review members"})]}),children:"Invites expire 7 days after they are sent."})})},i={render:function(){const[d,m]=q.useState(!0);return e.jsx("div",{className:"mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-3",children:d?e.jsx(t,{tone:"info",title:"New: saved views",onDismiss:()=>{m(!1)},children:"Save a filter and a column layout together, and share them with your team."}):e.jsx(u,{variant:"outline",onClick:()=>{m(!0)},children:"Bring it back"})})}},r={render:()=>e.jsxs(t,{tone:"info",title:"Before you continue",className:"mdt-max-w-2xl",children:["Two things need your attention.",e.jsxs("div",{className:"mdt-mt-3 mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx(t,{tone:"warning",variant:"outline",size:"sm",children:"Your billing address is incomplete."}),e.jsx(t,{tone:"danger",variant:"outline",size:"sm",children:"One payment method has expired."})]})]})},l={render:function(){const[d,m]=q.useState(!1);return e.jsxs("div",{className:"mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-3",children:[e.jsx(u,{onClick:()=>{m(U=>!U)},children:d?"Reset":"Submit with errors"}),d&&e.jsx(t,{tone:"danger",role:"alert",title:"Two fields need attention",children:"An email address is missing, and the parent organisation has not been chosen."}),e.jsx(t,{tone:"warning",toneLabel:"Warning",children:"48 of 50 seats are in use. — this one names its tone, because the sentence does not."})]})}};var h,p,f;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(f=(p=c.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var g,x,w,v,y;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-3">
      {FEEDBACK_TONES.map(tone => <Callout key={tone} tone={tone} title={tone}>
          The body text is the same colour here as in every other tone.
        </Callout>)}
    </div>
}`,...(w=(x=a.parameters)==null?void 0:x.docs)==null?void 0:w.source},description:{story:`Six tones, and one calm ink through all of them.

**Only the icon and the border carry the tone.** Six tones that differ by a
tint, an edge and a glyph read as one family; six tones of coloured text read
as six problems. The rule came from Org Mgmt's banner and \`Toast\` follows it
too.`,...(y=(v=a.parameters)==null?void 0:v.docs)==null?void 0:y.description}}};var b,j,C,k,A;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-6">
      <Callout tone="danger" title="This cannot be undone">
        Deleting <strong>Acme Production</strong> removes:
        <ul className="mdt-mt-1.5 mdt-list-disc mdt-space-y-0.5 mdt-pl-4">
          <li>3 members, immediately</li>
          <li>12 files, permanently</li>
          <li>All API keys issued to this workspace</li>
        </ul>
      </Callout>

      <Callout tone="info" title="What happens next">
        We will email an invite to each address. Guests can accept for 7 days, and their access ends
        automatically 30 days after that.
      </Callout>

      <Callout tone="warning">
        You are close to your plan&apos;s limit — 48 of 50 seats are in use.
      </Callout>

      <Callout tone="neutral" icon={false} title="Access limits">
        {/*
          A row per setting: the name on the left, the control on the right,
          and no label on the control because the name already is one. A
          stacked label above every field turns four short settings into a
          form, which is not what a grouped block is for.
         */}
        <div className="mdt-mt-2 mdt-flex mdt-flex-col mdt-gap-2">
          {[{
          name: 'Maximum seats',
          value: '50'
        }, {
          name: 'Session length',
          value: '8 hours'
        }].map(setting => <div key={setting.name} className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4">
              <span>{setting.name}</span>
              <Input aria-label={setting.name} defaultValue={setting.value} className="mdt-w-32 mdt-text-right" />
            </div>)}
        </div>
      </Callout>
    </div>
}`,...(C=(j=s.parameters)==null?void 0:j.docs)==null?void 0:C.source},description:{story:`What it is actually for.

Four jobs, all from the product screens the dialog work was read from:
the consequences of something irreversible, a summary of what is about to
happen, a limit worth knowing before filling a form in, and a group of
settings that belong together.

**The last one has no icon and no tone.** \`neutral\` with \`icon={false}\` is a
plain inset panel — and that is a callout too. An icon there would label a
group that does not need labelling.`,...(A=(k=s.parameters)==null?void 0:k.docs)==null?void 0:A.description}}};var S,N,T,D,B;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-max-w-md mdt-flex-col mdt-gap-3">
      <Callout tone="warning" title="Two members have not accepted their invite" actions={<>
            <Button size="sm">Resend invites</Button>
            <Button size="sm" variant="ghost">
              Review members
            </Button>
          </>}>
        Invites expire 7 days after they are sent.
      </Callout>
    </div>
}`,...(T=(N=o.parameters)==null?void 0:N.docs)==null?void 0:T.source},description:{story:`Controls sit **below** the reading, never beside it.

A callout's action is what you do after reading it, and putting it on the
right invites pressing it first.

**On the width:** a callout is \`w-full\` on purpose. It is a block that
annotates the thing above or below it, so it takes that thing's width — a
callout that shrank to fit its sentence would give a stack of them ragged
right edges, and would stop lining up with the form it belongs to. Put it in
a narrower column and it is narrower; this story is in one.`,...(B=(D=o.parameters)==null?void 0:D.docs)==null?void 0:B.description}}};var I,F,O,W,E;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: function DismissibleDemo() {
    const [shown, setShown] = useState(true);
    return <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-3">
        {shown ? <Callout tone="info" title="New: saved views" onDismiss={() => {
        setShown(false);
      }}>
            Save a filter and a column layout together, and share them with your team.
          </Callout> : <Button variant="outline" onClick={() => {
        setShown(true);
      }}>
            Bring it back
          </Button>}
      </div>;
  }
}`,...(O=(F=i.parameters)==null?void 0:F.docs)==null?void 0:O.source},description:{story:`Dismissible only when you ask — the opposite of \`Toast\`.

A toast always has a way out because it arrived uninvited. A close on
something that was always there implies it will come back.`,...(E=(W=i.parameters)==null?void 0:W.docs)==null?void 0:E.description}}};var z,R,P,Y,_;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <Callout tone="info" title="Before you continue" className="mdt-max-w-2xl">
      Two things need your attention.
      <div className="mdt-mt-3 mdt-flex mdt-flex-col mdt-gap-2">
        <Callout tone="warning" variant="outline" size="sm">
          Your billing address is incomplete.
        </Callout>
        <Callout tone="danger" variant="outline" size="sm">
          One payment method has expired.
        </Callout>
      </div>
    </Callout>
}`,...(P=(R=r.parameters)==null?void 0:R.docs)==null?void 0:P.source},description:{story:`\`outline\` keeps the edge and drops the fill.

For a callout that has to sit on a surface which is already tinted — one
inside another, or one on a coloured panel — where a second tint reads as a
stain rather than as a block.`,...(_=(Y=r.parameters)==null?void 0:Y.docs)==null?void 0:_.description}}};var G,L,M,K,V;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: function AnnouncingDemo() {
    const [failed, setFailed] = useState(false);
    return <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-3">
        <Button onClick={() => {
        setFailed(was => !was);
      }}>
          {failed ? 'Reset' : 'Submit with errors'}
        </Button>

        {failed && <Callout tone="danger" role="alert" title="Two fields need attention">
            An email address is missing, and the parent organisation has not been chosen.
          </Callout>}

        <Callout tone="warning" toneLabel="Warning">
          48 of 50 seats are in use. — this one names its tone, because the sentence does not.
        </Callout>
      </div>;
  }
}`,...(M=(L=l.parameters)==null?void 0:L.docs)==null?void 0:M.source},description:{story:`On being read out.

A callout is read in document order like any other content, so it carries no
live region. If one **appears** in response to something — a validation
summary after a failed submit — the caller adds \`role="alert"\`, because only
the caller knows it is new.

The tone glyph is decorative, so a \`danger\` callout whose writing does not
say it is dangerous reads as neutral. Usually the writing carries it —
*"This cannot be undone"* needs no label. \`toneLabel\` is for when it does not.`,...(V=(K=l.parameters)==null?void 0:K.docs)==null?void 0:V.description}}};const ie=["Default","Tones","WhatItIsFor","WithActions","Dismissible","OnATintedSurface","Announcing"];export{l as Announcing,c as Default,i as Dismissible,r as OnATintedSurface,a as Tones,s as WhatItIsFor,o as WithActions,ie as __namedExportsOrder,oe as default};
//# sourceMappingURL=Callout.stories-BudR36po.js.map
