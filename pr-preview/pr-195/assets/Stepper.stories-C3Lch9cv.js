import{j as e,r as m}from"./iframe-DTe3Uuey.js";import{S as t}from"./Stepper-Bvjsalf9.js";import{B as R}from"./Button-DvAspCcU.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./Icon-8RMnISkK.js";import"./icon-at-drawn-size-D6K8e_hU.js";const n=[{label:"Choose a source"},{label:"Connect"},{label:"Map fields"},{label:"Review"},{label:"Publish"}],Je={title:"Components/Stepper",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A named, ordered journey with a place you are now.","","Three of the four product teams built one and nothing existed in the library.","","**One rule carries the whole component: a filled disc is settled, an outlined disc","is live.** That is why the number stays visible on the step you are standing on and","only turns into a tick once it is behind you — and why a broken step is outlined","rather than filled. You are still standing on it.","","**It is not Tabs.** Tabs are four doors into the same room: no order, nothing to","finish, and everything behind them already exists. Here the steps ahead of you have","not happened yet.","","| | Tabs | Stepper |","| --- | --- | --- |","| Order | None — any, any time | Fixed, and enforced |","| Ahead of you | Already there | Does not exist yet |","| Going back | Free | Sometimes allowed, sometimes not |","| Announced as | Tabs | A list, one item marked as the current step |","","**The one-line test:** if you can do them in any order, it is Tabs. It is not","`Progress` either — that is one number with no names, and nobody is doing anything.","","Four layouts on one switch — `stacked`, `inline`, `underline` and `vertical` — and the","same rules in every one (Pranjal, 2026-10-19):","","- **Hover marks the disc and the name, never the whole step** — a soft halo on the disc,","  a dashed underline under the name. Keyboard focus rings the disc.","- **Nothing moves when a step becomes clickable.** A clickable step is exactly the same","  box as a plain one, so the strip never changes height.","- **A finished step reads as finished** — its name in full ink. Only the steps ahead stay","  quiet.","- **Going back keeps your progress.** Pass `reached`, the furthest step got to: every","  step before it keeps its tick and its line, it shows as where you left off, and the",'  step you went back to keeps its tick inside a "you are here" ring.'].join(`
`)}}},argTypes:{layout:{control:"inline-radio",options:["stacked","inline","underline","vertical"]},reached:{control:{type:"number",min:0,max:6}},current:{control:{type:"number",min:0,max:4}},responsive:{control:"boolean"},steps:{control:!1},onStepSelect:{control:!1}},args:{steps:n,current:2,"aria-label":"Import assets"}},r=({children:a})=>e.jsx("p",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:a}),N=({children:a})=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-9",children:a}),T={},h={parameters:{controls:{disable:!0}},render:()=>e.jsxs(N,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"stacked — the one everybody recognises"}),e.jsx(t,{steps:n,current:2,"aria-label":"Import assets"})]}),e.jsxs("div",{children:[e.jsx(r,{children:"inline — half the height"}),e.jsx(t,{steps:n,current:2,layout:"inline","aria-label":"Import assets"})]}),e.jsxs("div",{children:[e.jsx(r,{children:"underline — the bar is the progress"}),e.jsx(t,{steps:n,current:2,layout:"underline","aria-label":"Import assets"})]})]})},L=[{label:"Completed",state:"complete"},{label:"Current",state:"current"},{label:"Upcoming",state:"upcoming"},{label:"Skipped",state:"skipped"},{label:"Disabled",state:"disabled"}],u={parameters:{controls:{disable:!0}},render:()=>e.jsxs(N,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"stacked"}),e.jsx(t,{steps:L,current:1,"aria-label":"Every state"})]}),e.jsxs("div",{children:[e.jsx(r,{children:"inline"}),e.jsx(t,{steps:L,current:1,layout:"inline","aria-label":"Every state"})]}),e.jsxs("div",{children:[e.jsx(r,{children:"underline"}),e.jsx(t,{steps:L,current:1,layout:"underline","aria-label":"Every state"})]})]})},b={name:"When something goes wrong",parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-4",children:[e.jsx(t,{"aria-label":"Import assets",current:1,steps:[{label:"Choose a source"},{label:"Connect"},{label:"Map fields"},{label:"Review"}]}),e.jsxs("p",{className:"mdt-rounded-lg mdt-border mdt-border-destructive/40 mdt-bg-destructive/5 mdt-px-3.5 mdt-py-3 mdt-text-sm mdt-text-foreground",children:[e.jsx("span",{className:"mdt-font-semibold",children:"Could not reach the connector."})," The host answered but rejected the credentials — check the service account has read access."]})]})},x={name:"With a second line",parameters:{controls:{disable:!0}},render:()=>e.jsx(t,{"aria-label":"Import assets",current:1,steps:[{label:"Choose a source",description:"Where the assets live"},{label:"Connect",description:"Credentials and reachability"},{label:"Map fields",description:"Ours against theirs"},{label:"Review",description:"Before anything is written"}]})},v={parameters:{controls:{disable:!0}},render:function(){const[s,i]=m.useState(3);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsx(t,{"aria-label":"Import assets",steps:n,current:s,onStepSelect:d=>{i(d)}}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(R,{variant:"outline",size:"sm",disabled:s===0,onClick:()=>{i(d=>Math.max(0,d-1))},children:"Back"}),e.jsx(R,{variant:"secondary",size:"sm",disabled:s===n.length-1,onClick:()=>{i(d=>Math.min(n.length-1,d+1))},children:"Next"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Finished steps are clickable. Try tabbing to them."})]})]})}},g={name:"In a narrow column",parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-9",children:[e.jsxs("div",{className:"mdt-w-[380px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4",children:[e.jsx(r,{children:"380px — dropped to inline on its own"}),e.jsx(t,{steps:n,current:2,"aria-label":"Import assets"})]}),e.jsxs("div",{className:"mdt-w-[380px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4",children:[e.jsxs(r,{children:["380px with responsive=","{false}"," — held stacked, labels break"]}),e.jsx(t,{steps:n,current:2,responsive:!1,"aria-label":"Import assets"})]}),e.jsxs("div",{className:"mdt-w-[720px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4",children:[e.jsx(r,{children:"720px — room enough, stays stacked"}),e.jsx(t,{steps:n,current:2,"aria-label":"Import assets"})]})]})},y={name:"Three steps, and eight",parameters:{controls:{disable:!0}},render:()=>e.jsxs(N,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"Three"}),e.jsx(t,{"aria-label":"Invite a teammate",current:1,steps:[{label:"Details"},{label:"Permissions"},{label:"Review"}]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Eight — inline holds up better past about six"}),e.jsx(t,{"aria-label":"Onboard an organisation",current:4,layout:"inline",steps:[{label:"Organisation"},{label:"Domain"},{label:"Branding"},{label:"Plan"},{label:"Agents"},{label:"Alerting"},{label:"Retention"},{label:"Review"}]})]})]})},f={name:"In a wizard",parameters:{controls:{disable:!0}},render:function(){var c;const[s,i]=m.useState(1),[d,p]=m.useState(1),o=n.length-1;return e.jsxs("div",{className:"mdt-max-w-2xl mdt-rounded-xl mdt-border mdt-border-border mdt-bg-background mdt-p-6",children:[e.jsx(t,{"aria-label":"Import assets",steps:n,current:s,reached:d,onStepSelect:l=>{i(l)}}),e.jsxs("div",{className:"mdt-my-7 mdt-flex mdt-min-h-[132px] mdt-flex-col mdt-gap-3 mdt-rounded-lg mdt-bg-muted/40 mdt-p-5",children:[e.jsxs("p",{className:"mdt-text-sm mdt-font-semibold mdt-text-foreground",children:["Step ",s+1," — ",(c=n[s])==null?void 0:c.label]}),e.jsx("div",{className:"mdt-h-2 mdt-w-2/5 mdt-rounded-full mdt-bg-muted"}),e.jsx("div",{className:"mdt-h-2 mdt-w-3/4 mdt-rounded-full mdt-bg-muted"}),e.jsx("div",{className:"mdt-h-2 mdt-w-1/2 mdt-rounded-full mdt-bg-muted"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between",children:[e.jsx(R,{variant:"ghost",size:"sm",disabled:s===0,onClick:()=>{i(l=>Math.max(0,l-1))},children:"Back"}),e.jsx(R,{size:"sm",disabled:s===o,onClick:()=>{const l=Math.min(o,s+1);i(l),p(_e=>Math.max(_e,l))},children:s===o-1?"Publish":"Next"})]})]})}},Ge=[{label:"Essentials",description:"Required · 3 fields"},{label:"Profile"},{label:"Security policy"},{label:"Allowed domains"},{label:"Sites"},{label:"Branding & portal"},{label:"Tags & attributes"}],w={args:{layout:"vertical",steps:Ge,current:2,reached:3,"aria-label":"Create organization"},render:function(s){const[i,d]=m.useState(s.current),[p,o]=m.useState(s.reached??s.current);return e.jsx("div",{className:"mdt-w-[280px] mdt-p-4",children:e.jsx(t,{...s,current:i,reached:p,onStepSelect:c=>{d(c),o(l=>Math.max(l,c))}})})}},A=[{label:"Complete",description:"Behind you"},{label:"Current",description:"The one in the panel"},{label:"Where you left off",description:"Reached, then went back"},{label:"Disabled",description:"Set by hand",state:"disabled"},{label:"Locked",description:"Opens after Disabled"}],k={parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-8",children:[e.jsxs("div",{className:"mdt-w-[280px] mdt-p-4",children:[e.jsx("p",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:"clickable - current 1, reached 2"}),e.jsx(t,{layout:"vertical",steps:A,current:1,reached:2,onStepSelect:()=>{},"aria-label":"Every state"})]}),e.jsxs("div",{className:"mdt-w-[280px] mdt-p-4",children:[e.jsx("p",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:"read only - no onStepSelect"}),e.jsx(t,{layout:"vertical",steps:A,current:1,reached:2,"aria-label":"Every state"})]})]})},I=({layout:a})=>{const[s,i]=m.useState(0),[d,p]=m.useState(3);return e.jsx(t,{layout:a,steps:a==="vertical"?Ge.slice(0,5):n,current:s,reached:d,onStepSelect:o=>{i(o),p(c=>Math.max(c,o))},"aria-label":a==="vertical"?"Create organization":"Import assets"})},S={name:"Going back keeps your progress",parameters:{controls:{disable:!0}},render:()=>e.jsxs(N,{children:[e.jsxs("div",{"data-testid":"revisit-stacked",children:[e.jsx(r,{children:"stacked — current 0, reached 3"}),e.jsx(I,{layout:"stacked"})]}),e.jsxs("div",{"data-testid":"revisit-inline",children:[e.jsx(r,{children:"inline — current 0, reached 3"}),e.jsx(I,{layout:"inline"})]}),e.jsxs("div",{"data-testid":"revisit-underline",children:[e.jsx(r,{children:"underline — current 0, reached 3"}),e.jsx(I,{layout:"underline"})]}),e.jsxs("div",{"data-testid":"revisit-vertical",className:"mdt-w-[280px]",children:[e.jsx(r,{children:"vertical — current 0, reached 3"}),e.jsx(I,{layout:"vertical"})]})]})},j={name:"Clickable or not, the same box",parameters:{controls:{disable:!0}},render:()=>e.jsx(N,{children:["stacked","inline","underline"].map(a=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{"data-testid":`plain-${a}`,children:[e.jsxs(r,{children:[a," — read only"]}),e.jsx(t,{steps:n,current:2,layout:a,"aria-label":"Import assets"})]}),e.jsxs("div",{"data-testid":`clickable-${a}`,children:[e.jsxs(r,{children:[a," — clickable"]}),e.jsx(t,{steps:n,current:2,layout:a,onStepSelect:()=>{},"aria-label":"Import assets"})]})]},a))})};var C,M,O;T.parameters={...T.parameters,docs:{...(C=T.parameters)==null?void 0:C.docs,source:{originalSource:"{}",...(O=(M=T.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var E,P,B,z,D;h.parameters={...h.parameters,docs:{...(E=h.parameters)==null?void 0:E.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>stacked — the one everybody recognises</Label>
        <Stepper steps={IMPORT} current={2} aria-label="Import assets" />
      </div>
      <div>
        <Label>inline — half the height</Label>
        <Stepper steps={IMPORT} current={2} layout="inline" aria-label="Import assets" />
      </div>
      <div>
        <Label>underline — the bar is the progress</Label>
        <Stepper steps={IMPORT} current={2} layout="underline" aria-label="Import assets" />
      </div>
    </Stack>
}`,...(B=(P=h.parameters)==null?void 0:P.docs)==null?void 0:B.source},description:{story:`\`stacked\` puts the disc above its label, joined by a line that fills only once
you are past it. \`inline\` sets the disc beside its label on one row with a
chevron between — **half the height**, and it wraps rather than breaking words.

\`underline\` gives every step a full-width rule beneath its own label instead
of a line between discs. **The bar is the progress, not a connector.** A row
of circles joined by a line says *"these are stations on a route"*; a row of
underlined labels says *"these are the parts, and you have done this many"* —
which is what somebody halfway through a form is actually asking.

It is what \`DialogSteps\` draws. That used to be a second implementation of
this idea living in \`Dialog\`; two answers to one question is a defect, and
the tick would eventually have been fixed in one of them and not the other.`,...(D=(z=h.parameters)==null?void 0:z.docs)==null?void 0:D.description}}};var W,G,_,F,q;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>stacked</Label>
        <Stepper steps={ALL_STATES} current={1} aria-label="Every state" />
      </div>
      <div>
        <Label>inline</Label>
        <Stepper steps={ALL_STATES} current={1} layout="inline" aria-label="Every state" />
      </div>
      <div>
        <Label>underline</Label>
        <Stepper steps={ALL_STATES} current={1} layout="underline" aria-label="Every state" />
      </div>
    </Stack>
}`,...(_=(G=u.parameters)==null?void 0:G.docs)==null?void 0:_.source},description:{story:"Five, and every one is readable **without colour** — a tick, a number, a dash.\nThe shape says it as well as the tone does.\n\nThree are worked out from `current` and never need setting. The two you set\nyourself are the ones no counter can know about: `skipped` and `disabled`.",...(q=(F=u.parameters)==null?void 0:F.docs)==null?void 0:q.description}}};var H,V,$,K,U;b.parameters={...b.parameters,docs:{...(H=b.parameters)==null?void 0:H.docs,source:{originalSource:`{
  name: 'When something goes wrong',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-4">
      <Stepper aria-label="Import assets" current={1} steps={[{
      label: 'Choose a source'
    }, {
      label: 'Connect'
    }, {
      label: 'Map fields'
    }, {
      label: 'Review'
    }]} />
      <p className="mdt-rounded-lg mdt-border mdt-border-destructive/40 mdt-bg-destructive/5 mdt-px-3.5 mdt-py-3 mdt-text-sm mdt-text-foreground">
        <span className="mdt-font-semibold">Could not reach the connector.</span> The host answered
        but rejected the credentials — check the service account has read access.
      </p>
    </div>
}`,...($=(V=b.parameters)==null?void 0:V.docs)==null?void 0:$.source},description:{story:`**There is no error state, on purpose.**

A coloured ring says *where* a problem is and never what it is, so it always
needs a message beside it — and once the message is there, the ring is only
repeating itself. Leave the step as the current one and put a \`Banner\` under
the strip, which is where somebody can actually read what went wrong and what
to do about it.`,...(U=(K=b.parameters)==null?void 0:K.docs)==null?void 0:U.description}}};var Y,J,Q,X,Z;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: 'With a second line',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stepper aria-label="Import assets" current={1} steps={[{
    label: 'Choose a source',
    description: 'Where the assets live'
  }, {
    label: 'Connect',
    description: 'Credentials and reachability'
  }, {
    label: 'Map fields',
    description: 'Ours against theirs'
  }, {
    label: 'Review',
    description: 'Before anything is written'
  }]} />
}`,...(Q=(J=x.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:"A second line per step, for when the label alone is not enough.\n\n**`stacked` only.** `inline` has nowhere to put it — beside the label the row\nstops reading as one line of travel — so it is dropped and warned about while\nyou build.",...(Z=(X=x.parameters)==null?void 0:X.docs)==null?void 0:Z.description}}};var ee,te,ae,se,re;v.parameters={...v.parameters,docs:{...(ee=v.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: function Render() {
    const [at, setAt] = useState(3);
    return <div className="mdt-flex mdt-flex-col mdt-gap-6">
        <Stepper aria-label="Import assets" steps={IMPORT} current={at} onStepSelect={index => {
        setAt(index);
      }} />
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <Button variant="outline" size="sm" disabled={at === 0} onClick={() => {
          setAt(n => Math.max(0, n - 1));
        }}>
            Back
          </Button>
          <Button variant="secondary" size="sm" disabled={at === IMPORT.length - 1} onClick={() => {
          setAt(n => Math.min(IMPORT.length - 1, n + 1));
        }}>
            Next
          </Button>
          <span className="mdt-text-xs mdt-text-muted-foreground">
            Finished steps are clickable. Try tabbing to them.
          </span>
        </div>
      </div>;
  }
}`,...(ae=(te=v.parameters)==null?void 0:te.docs)==null?void 0:ae.source},description:{story:`**A step is not a button unless you can actually go there.** Leave
\`onStepSelect\` out and no step is focusable at all — which is right for a
wizard that acts as it goes, because you cannot return to step 1 once step 2
has used it.

Give it, and **every step you have got to** becomes a button - without
\`reached\`, that is the finished ones. The one you are on is already here,
and one you have not reached is not a place.

**A clickable step is the same box as a plain one**, so nothing moves when
this is turned on. Under the pointer only the disc (a soft halo) and the name
(a dashed underline) react; keyboard focus rings the disc.`,...(re=(se=v.parameters)==null?void 0:se.docs)==null?void 0:re.description}}};var ne,ie,de,oe,le;g.parameters={...g.parameters,docs:{...(ne=g.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  name: 'In a narrow column',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-9">
      <div className="mdt-w-[380px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4">
        <Label>380px — dropped to inline on its own</Label>
        <Stepper steps={IMPORT} current={2} aria-label="Import assets" />
      </div>
      <div className="mdt-w-[380px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4">
        <Label>380px with responsive={'{false}'} — held stacked, labels break</Label>
        <Stepper steps={IMPORT} current={2} responsive={false} aria-label="Import assets" />
      </div>
      <div className="mdt-w-[720px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4">
        <Label>720px — room enough, stays stacked</Label>
        <Stepper steps={IMPORT} current={2} aria-label="Import assets" />
      </div>
    </div>
}`,...(de=(ie=g.parameters)==null?void 0:ie.docs)==null?void 0:de.source},description:{story:"`stacked` drops to `inline` when there is genuinely not room for it —\n**measured, not guessed at from the window**, because a stepper in a side\npanel has to know about the panel rather than the screen.\n\nSet `responsive={false}` to hold one shape at every width, and accept that the\nlabels will break.",...(le=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:le.description}}};var ce,me,pe,he,ue;y.parameters={...y.parameters,docs:{...(ce=y.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  name: 'Three steps, and eight',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>Three</Label>
        <Stepper aria-label="Invite a teammate" current={1} steps={[{
        label: 'Details'
      }, {
        label: 'Permissions'
      }, {
        label: 'Review'
      }]} />
      </div>
      <div>
        <Label>Eight — inline holds up better past about six</Label>
        <Stepper aria-label="Onboard an organisation" current={4} layout="inline" steps={[{
        label: 'Organisation'
      }, {
        label: 'Domain'
      }, {
        label: 'Branding'
      }, {
        label: 'Plan'
      }, {
        label: 'Agents'
      }, {
        label: 'Alerting'
      }, {
        label: 'Retention'
      }, {
        label: 'Review'
      }]} />
      </div>
    </Stack>
}`,...(pe=(me=y.parameters)==null?void 0:me.docs)==null?void 0:pe.source},description:{story:"Three steps or twelve — the strip shares whatever width it is given.",...(ue=(he=y.parameters)==null?void 0:he.docs)==null?void 0:ue.description}}};var be,xe,ve,ge,ye;f.parameters={...f.parameters,docs:{...(be=f.parameters)==null?void 0:be.docs,source:{originalSource:`{
  name: 'In a wizard',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: function Render() {
    const [at, setAt] = useState(1);
    const [reached, setReached] = useState(1);
    const last = IMPORT.length - 1;
    return <div className="mdt-max-w-2xl mdt-rounded-xl mdt-border mdt-border-border mdt-bg-background mdt-p-6">
        <Stepper aria-label="Import assets" steps={IMPORT} current={at} reached={reached} onStepSelect={index => {
        setAt(index);
      }} />

        <div className="mdt-my-7 mdt-flex mdt-min-h-[132px] mdt-flex-col mdt-gap-3 mdt-rounded-lg mdt-bg-muted/40 mdt-p-5">
          <p className="mdt-text-sm mdt-font-semibold mdt-text-foreground">
            Step {at + 1} — {IMPORT[at]?.label}
          </p>
          <div className="mdt-h-2 mdt-w-2/5 mdt-rounded-full mdt-bg-muted" />
          <div className="mdt-h-2 mdt-w-3/4 mdt-rounded-full mdt-bg-muted" />
          <div className="mdt-h-2 mdt-w-1/2 mdt-rounded-full mdt-bg-muted" />
        </div>

        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <Button variant="ghost" size="sm" disabled={at === 0} onClick={() => {
          setAt(n => Math.max(0, n - 1));
        }}>
            Back
          </Button>
          <Button size="sm" disabled={at === last} onClick={() => {
          const next = Math.min(last, at + 1);
          setAt(next);
          setReached(r => Math.max(r, next));
        }}>
            {at === last - 1 ? 'Publish' : 'Next'}
          </Button>
        </div>
      </div>;
  }
}`,...(ve=(xe=f.parameters)==null?void 0:xe.docs)==null?void 0:ve.source},description:{story:`The shape it was built for: a step strip above a panel, with Back and Next
beneath it. \`Dialog\` names this as the place a wizard belongs.

It keeps \`reached\`, so clicking back to fix an earlier step loses nothing:
the steps after it keep their ticks, the furthest one shows as where you left
off, and you can click straight forward to it again.`,...(ye=(ge=f.parameters)==null?void 0:ge.docs)==null?void 0:ye.description}}};var fe,we,ke,Se,je;w.parameters={...w.parameters,docs:{...(fe=w.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    layout: 'vertical',
    steps: CREATE_ORG,
    current: 2,
    reached: 3,
    'aria-label': 'Create organization'
  },
  render: function Render(args) {
    const [current, setCurrent] = useState(args.current);
    const [reached, setReached] = useState(args.reached ?? args.current);
    return <div className="mdt-w-[280px] mdt-p-4">
        <Stepper {...args} current={current} reached={reached} onStepSelect={index => {
        setCurrent(index);
        setReached(r => Math.max(r, index));
      }} />
      </div>;
  }
}`,...(ke=(we=w.parameters)==null?void 0:we.docs)==null?void 0:ke.source},description:{story:`**\`layout="vertical"\`** - the journey set down a rail, as the navigation of a two-column flow (the console's
Create organization): the rail on the left, the panel beside it showing one step at a time.

It reads the second counter every layout reads, \`reached\` - the furthest step got to so far - so somebody can go back
to step 2 and forward again to step 4 without redoing 3. Every step up to \`reached\` but the current one is
clickable; everything past it is locked, quiet, and titled "Opens after ...". On step 3 here, with step 4 where
you left off.`,...(je=(Se=w.parameters)==null?void 0:Se.docs)==null?void 0:je.description}}};var Ne,Te,Ie,Re,Le;k.parameters={...k.parameters,docs:{...(Ne=k.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="mdt-flex mdt-flex-wrap mdt-gap-8">
      <div className="mdt-w-[280px] mdt-p-4">
        <p className="mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
          clickable - current 1, reached 2
        </p>
        <Stepper layout="vertical" steps={RAIL_STATES} current={1} reached={2} onStepSelect={() => undefined} aria-label="Every state" />
      </div>
      <div className="mdt-w-[280px] mdt-p-4">
        <p className="mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
          read only - no onStepSelect
        </p>
        <Stepper layout="vertical" steps={RAIL_STATES} current={1} reached={2} aria-label="Every state" />
      </div>
    </div>
}`,...(Ie=(Te=k.parameters)==null?void 0:Te.docs)==null?void 0:Ie.source},description:{story:"Every vertical state, readable without colour - a tick for done, a number everywhere else, the ink going quiet past where you got to.",...(Le=(Re=k.parameters)==null?void 0:Re.docs)==null?void 0:Le.description}}};var Ae,Ce,Me,Oe,Ee;S.parameters={...S.parameters,docs:{...(Ae=S.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  name: 'Going back keeps your progress',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div data-testid="revisit-stacked">
        <Label>stacked — current 0, reached 3</Label>
        <Revisiting layout="stacked" />
      </div>
      <div data-testid="revisit-inline">
        <Label>inline — current 0, reached 3</Label>
        <Revisiting layout="inline" />
      </div>
      <div data-testid="revisit-underline">
        <Label>underline — current 0, reached 3</Label>
        <Revisiting layout="underline" />
      </div>
      <div data-testid="revisit-vertical" className="mdt-w-[280px]">
        <Label>vertical — current 0, reached 3</Label>
        <Revisiting layout="vertical" />
      </div>
    </Stack>
}`,...(Me=(Ce=S.parameters)==null?void 0:Ce.docs)==null?void 0:Me.source},description:{story:`**Going back keeps your progress.** Each strip opens mid-revisit: somebody got as far as step 4, then went back to
step 1 to fix something. Nothing is undone -

- **the step you went back to** keeps its tick, inside a "you are here" ring;
- **the steps in between** keep their ticks, and the line or bar stays filled;
- **step 4 shows as where you left off** - outlined in primary, its name in full ink;
- **every one of them is clickable**, so you can jump straight back to where you were.

\`reached\` is the furthest step got to (\`current\` when left out). Keep it as the larger of itself and wherever the
person goes, as these strips do. A screen reader hears "done", "done, you are here" and "where you left off".`,...(Ee=(Oe=S.parameters)==null?void 0:Oe.docs)==null?void 0:Ee.description}}};var Pe,Be,ze,De,We;j.parameters={...j.parameters,docs:{...(Pe=j.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  name: 'Clickable or not, the same box',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      {(['stacked', 'inline', 'underline'] as const).map(layout => <div key={layout} className="mdt-flex mdt-flex-col mdt-gap-4">
          <div data-testid={\`plain-\${layout}\`}>
            <Label>{layout} — read only</Label>
            <Stepper steps={IMPORT} current={2} layout={layout} aria-label="Import assets" />
          </div>
          <div data-testid={\`clickable-\${layout}\`}>
            <Label>{layout} — clickable</Label>
            <Stepper steps={IMPORT} current={2} layout={layout} onStepSelect={() => undefined} aria-label="Import assets" />
          </div>
        </div>)}
    </Stack>
}`,...(ze=(Be=j.parameters)==null?void 0:Be.docs)==null?void 0:ze.source},description:{story:`**Nothing moves when a step becomes clickable.** Each layout twice, on step 3: read-only, then with
\`onStepSelect\`. A clickable step is exactly the same box as a plain one, so the two strips are the same height and
every disc sits in the same place. Point at a finished step in the second strip: only its disc (a soft halo) and its
name (a dashed underline) react - no wash behind the step. Tab to it and the focus ring sits on the disc.`,...(We=(De=j.parameters)==null?void 0:De.docs)==null?void 0:We.description}}};const Qe=["Default","Layouts","States","WhenSomethingGoesWrong","WithDescriptions","Clickable","InANarrowColumn","HowManySteps","InAWizard","Vertical","VerticalStates","GoingBack","ClickableOrNot"];export{v as Clickable,j as ClickableOrNot,T as Default,S as GoingBack,y as HowManySteps,g as InANarrowColumn,f as InAWizard,h as Layouts,u as States,w as Vertical,k as VerticalStates,b as WhenSomethingGoesWrong,x as WithDescriptions,Qe as __namedExportsOrder,Je as default};
//# sourceMappingURL=Stepper.stories-C3Lch9cv.js.map
