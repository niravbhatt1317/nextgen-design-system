import{j as e,r as w}from"./iframe-JSEMHSLX.js";import{S as t}from"./Stepper-CzpRUIYD.js";import{B as S}from"./Button-D-QMh15K.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./Icon-D1k2lo4b.js";import"./icon-at-drawn-size-xDkXBPJl.js";const s=[{label:"Choose a source"},{label:"Connect"},{label:"Map fields"},{label:"Review"},{label:"Publish"}],Pe={title:"Components/Stepper",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A named, ordered journey with a place you are now.","","Three of the four product teams built one and nothing existed in the library.","","**One rule carries the whole component: a filled disc is settled, an outlined disc","is live.** That is why the number stays visible on the step you are standing on and","only turns into a tick once it is behind you — and why a broken step is outlined","rather than filled. You are still standing on it.","","**It is not Tabs.** Tabs are four doors into the same room: no order, nothing to","finish, and everything behind them already exists. Here the steps ahead of you have","not happened yet.","","| | Tabs | Stepper |","| --- | --- | --- |","| Order | None — any, any time | Fixed, and enforced |","| Ahead of you | Already there | Does not exist yet |","| Going back | Free | Sometimes allowed, sometimes not |","| Announced as | Tabs | A list, one item marked as the current step |","","**The one-line test:** if you can do them in any order, it is Tabs. It is not","`Progress` either — that is one number with no names, and nobody is doing anything.","","Horizontal only. Vertical is a different component with different rules, not a third","value on the layout switch."].join(`
`)}}},argTypes:{layout:{control:"inline-radio",options:["stacked","inline","underline","vertical"]},reached:{control:{type:"number",min:0,max:6}},current:{control:{type:"number",min:0,max:4}},responsive:{control:"boolean"},steps:{control:!1},onStepSelect:{control:!1}},args:{steps:s,current:2,"aria-label":"Import assets"}},n=({children:i})=>e.jsx("p",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:i}),j=({children:i})=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-9",children:i}),y={},l={parameters:{controls:{disable:!0}},render:()=>e.jsxs(j,{children:[e.jsxs("div",{children:[e.jsx(n,{children:"stacked — the one everybody recognises"}),e.jsx(t,{steps:s,current:2,"aria-label":"Import assets"})]}),e.jsxs("div",{children:[e.jsx(n,{children:"inline — half the height"}),e.jsx(t,{steps:s,current:2,layout:"inline","aria-label":"Import assets"})]}),e.jsxs("div",{children:[e.jsx(n,{children:"underline — the bar is the progress"}),e.jsx(t,{steps:s,current:2,layout:"underline","aria-label":"Import assets"})]})]})},N=[{label:"Completed",state:"complete"},{label:"Current",state:"current"},{label:"Upcoming",state:"upcoming"},{label:"Skipped",state:"skipped"},{label:"Disabled",state:"disabled"}],c={parameters:{controls:{disable:!0}},render:()=>e.jsxs(j,{children:[e.jsxs("div",{children:[e.jsx(n,{children:"stacked"}),e.jsx(t,{steps:N,current:1,"aria-label":"Every state"})]}),e.jsxs("div",{children:[e.jsx(n,{children:"inline"}),e.jsx(t,{steps:N,current:1,layout:"inline","aria-label":"Every state"})]})]})},m={name:"When something goes wrong",parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-4",children:[e.jsx(t,{"aria-label":"Import assets",current:1,steps:[{label:"Choose a source"},{label:"Connect"},{label:"Map fields"},{label:"Review"}]}),e.jsxs("p",{className:"mdt-rounded-lg mdt-border mdt-border-destructive/40 mdt-bg-destructive/5 mdt-px-3.5 mdt-py-3 mdt-text-sm mdt-text-foreground",children:[e.jsx("span",{className:"mdt-font-semibold",children:"Could not reach the connector."})," The host answered but rejected the credentials — check the service account has read access."]})]})},p={name:"With a second line",parameters:{controls:{disable:!0}},render:()=>e.jsx(t,{"aria-label":"Import assets",current:1,steps:[{label:"Choose a source",description:"Where the assets live"},{label:"Connect",description:"Credentials and reachability"},{label:"Map fields",description:"Ours against theirs"},{label:"Review",description:"Before anything is written"}]})},u={parameters:{controls:{disable:!0}},render:function(){const[a,d]=w.useState(3);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsx(t,{"aria-label":"Import assets",steps:s,current:a,onStepSelect:r=>{d(r)}}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(S,{variant:"outline",size:"sm",disabled:a===0,onClick:()=>{d(r=>Math.max(0,r-1))},children:"Back"}),e.jsx(S,{variant:"secondary",size:"sm",disabled:a===s.length-1,onClick:()=>{d(r=>Math.min(s.length-1,r+1))},children:"Next"}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Finished steps are clickable. Try tabbing to them."})]})]})}},h={name:"In a narrow column",parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-9",children:[e.jsxs("div",{className:"mdt-w-[380px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4",children:[e.jsx(n,{children:"380px — dropped to inline on its own"}),e.jsx(t,{steps:s,current:2,"aria-label":"Import assets"})]}),e.jsxs("div",{className:"mdt-w-[380px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4",children:[e.jsxs(n,{children:["380px with responsive=","{false}"," — held stacked, labels break"]}),e.jsx(t,{steps:s,current:2,responsive:!1,"aria-label":"Import assets"})]}),e.jsxs("div",{className:"mdt-w-[720px] mdt-rounded-lg mdt-border mdt-border-dashed mdt-border-border mdt-p-4",children:[e.jsx(n,{children:"720px — room enough, stays stacked"}),e.jsx(t,{steps:s,current:2,"aria-label":"Import assets"})]})]})},b={name:"Three steps, and eight",parameters:{controls:{disable:!0}},render:()=>e.jsxs(j,{children:[e.jsxs("div",{children:[e.jsx(n,{children:"Three"}),e.jsx(t,{"aria-label":"Invite a teammate",current:1,steps:[{label:"Details"},{label:"Permissions"},{label:"Review"}]})]}),e.jsxs("div",{children:[e.jsx(n,{children:"Eight — inline holds up better past about six"}),e.jsx(t,{"aria-label":"Onboard an organisation",current:4,layout:"inline",steps:[{label:"Organisation"},{label:"Domain"},{label:"Branding"},{label:"Plan"},{label:"Agents"},{label:"Alerting"},{label:"Retention"},{label:"Review"}]})]})]})},x={name:"In a wizard",parameters:{controls:{disable:!0}},render:function(){var f;const[a,d]=w.useState(1),r=s.length-1;return e.jsxs("div",{className:"mdt-max-w-2xl mdt-rounded-xl mdt-border mdt-border-border mdt-bg-background mdt-p-6",children:[e.jsx(t,{"aria-label":"Import assets",steps:s,current:a,onStepSelect:o=>{d(o)}}),e.jsxs("div",{className:"mdt-my-7 mdt-flex mdt-min-h-[132px] mdt-flex-col mdt-gap-3 mdt-rounded-lg mdt-bg-muted/40 mdt-p-5",children:[e.jsxs("p",{className:"mdt-text-sm mdt-font-semibold mdt-text-foreground",children:["Step ",a+1," — ",(f=s[a])==null?void 0:f.label]}),e.jsx("div",{className:"mdt-h-2 mdt-w-2/5 mdt-rounded-full mdt-bg-muted"}),e.jsx("div",{className:"mdt-h-2 mdt-w-3/4 mdt-rounded-full mdt-bg-muted"}),e.jsx("div",{className:"mdt-h-2 mdt-w-1/2 mdt-rounded-full mdt-bg-muted"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between",children:[e.jsx(S,{variant:"ghost",size:"sm",disabled:a===0,onClick:()=>{d(o=>Math.max(0,o-1))},children:"Back"}),e.jsx(S,{size:"sm",disabled:a===r,onClick:()=>{d(o=>Math.min(r,o+1))},children:a===r-1?"Publish":"Next"})]})]})}},Ie=[{label:"Essentials",description:"Required · 3 fields"},{label:"Profile"},{label:"Security policy"},{label:"Allowed domains"},{label:"Sites"},{label:"Branding & portal"},{label:"Tags & attributes"}],g={args:{layout:"vertical",steps:Ie,current:2,reached:3,"aria-label":"Create organization"},render:function(a){const[d,r]=w.useState(a.current),[f,o]=w.useState(a.reached??a.current);return e.jsx("div",{className:"mdt-w-[280px] mdt-p-4",children:e.jsx(t,{...a,current:d,reached:f,onStepSelect:k=>{r(k),o(Te=>Math.max(Te,k))}})})}},T=[{label:"Complete",description:"Behind you"},{label:"Current",description:"The one in the panel"},{label:"Complete, ahead",description:"Reached, then went back"},{label:"Disabled",description:"Set by hand",state:"disabled"},{label:"Locked",description:"Opens after Disabled"}],v={parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-8",children:[e.jsxs("div",{className:"mdt-w-[280px] mdt-p-4",children:[e.jsx("p",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:"clickable - current 1, reached 2"}),e.jsx(t,{layout:"vertical",steps:T,current:1,reached:2,onStepSelect:()=>{},"aria-label":"Every state"})]}),e.jsxs("div",{className:"mdt-w-[280px] mdt-p-4",children:[e.jsx("p",{className:"mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:"read only - no onStepSelect"}),e.jsx(t,{layout:"vertical",steps:T,current:1,reached:2,"aria-label":"Every state"})]})]})};var I,R,A;y.parameters={...y.parameters,docs:{...(I=y.parameters)==null?void 0:I.docs,source:{originalSource:"{}",...(A=(R=y.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var C,L,M,O,E;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(M=(L=l.parameters)==null?void 0:L.docs)==null?void 0:M.source},description:{story:`\`stacked\` puts the disc above its label, joined by a line that fills only once
you are past it. \`inline\` sets the disc beside its label on one row with a
chevron between — **half the height**, and it wraps rather than breaking words.

\`underline\` gives every step a full-width rule beneath its own label instead
of a line between discs. **The bar is the progress, not a connector.** A row
of circles joined by a line says *"these are stations on a route"*; a row of
underlined labels says *"these are the parts, and you have done this many"* —
which is what somebody halfway through a form is actually asking.

It is what \`DialogSteps\` draws. That used to be a second implementation of
this idea living in \`Dialog\`; two answers to one question is a defect, and
the tick would eventually have been fixed in one of them and not the other.`,...(E=(O=l.parameters)==null?void 0:O.docs)==null?void 0:E.description}}};var B,P,z,D,W;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
    </Stack>
}`,...(z=(P=c.parameters)==null?void 0:P.docs)==null?void 0:z.source},description:{story:"Five, and every one is readable **without colour** — a tick, a number, a dash.\nThe shape says it as well as the tone does.\n\nThree are worked out from `current` and never need setting. The two you set\nyourself are the ones no counter can know about: `skipped` and `disabled`.",...(W=(D=c.parameters)==null?void 0:D.docs)==null?void 0:W.description}}};var _,G,F,V,H;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(F=(G=m.parameters)==null?void 0:G.docs)==null?void 0:F.source},description:{story:`**There is no error state, on purpose.**

A coloured ring says *where* a problem is and never what it is, so it always
needs a message beside it — and once the message is there, the ring is only
repeating itself. Leave the step as the current one and put a \`Banner\` under
the strip, which is where somebody can actually read what went wrong and what
to do about it.`,...(H=(V=m.parameters)==null?void 0:V.docs)==null?void 0:H.description}}};var q,U,Y,J,K;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(Y=(U=p.parameters)==null?void 0:U.docs)==null?void 0:Y.source},description:{story:"A second line per step, for when the label alone is not enough.\n\n**`stacked` only.** `inline` has nowhere to put it — beside the label the row\nstops reading as one line of travel — so it is dropped and warned about while\nyou build.",...(K=(J=p.parameters)==null?void 0:J.docs)==null?void 0:K.description}}};var Q,X,Z,$,ee;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Z=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:`**A step is not a button unless you can actually go there.** Leave
\`onStepSelect\` out and no step is focusable at all — which is right for a
wizard that acts as it goes, because you cannot return to step 1 once step 2
has used it.

Give it, and **only finished steps** become buttons. The one you are on is
already here, and one you have not reached is not a place.`,...(ee=($=u.parameters)==null?void 0:$.docs)==null?void 0:ee.description}}};var te,ae,se,re,ne;h.parameters={...h.parameters,docs:{...(te=h.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(se=(ae=h.parameters)==null?void 0:ae.docs)==null?void 0:se.source},description:{story:"`stacked` drops to `inline` when there is genuinely not room for it —\n**measured, not guessed at from the window**, because a stepper in a side\npanel has to know about the panel rather than the screen.\n\nSet `responsive={false}` to hold one shape at every width, and accept that the\nlabels will break.",...(ne=(re=h.parameters)==null?void 0:re.docs)==null?void 0:ne.description}}};var de,oe,ie,le,ce;b.parameters={...b.parameters,docs:{...(de=b.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(ie=(oe=b.parameters)==null?void 0:oe.docs)==null?void 0:ie.source},description:{story:"Three steps or twelve — the strip shares whatever width it is given.",...(ce=(le=b.parameters)==null?void 0:le.docs)==null?void 0:ce.description}}};var me,pe,ue,he,be;x.parameters={...x.parameters,docs:{...(me=x.parameters)==null?void 0:me.docs,source:{originalSource:`{
  name: 'In a wizard',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: function Render() {
    const [at, setAt] = useState(1);
    const last = IMPORT.length - 1;
    return <div className="mdt-max-w-2xl mdt-rounded-xl mdt-border mdt-border-border mdt-bg-background mdt-p-6">
        <Stepper aria-label="Import assets" steps={IMPORT} current={at} onStepSelect={index => {
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
          setAt(n => Math.min(last, n + 1));
        }}>
            {at === last - 1 ? 'Publish' : 'Next'}
          </Button>
        </div>
      </div>;
  }
}`,...(ue=(pe=x.parameters)==null?void 0:pe.docs)==null?void 0:ue.source},description:{story:"The shape it was built for: a step strip above a panel, with Back and Next\nbeneath it. `Dialog` names this as the place a wizard belongs.",...(be=(he=x.parameters)==null?void 0:he.docs)==null?void 0:be.description}}};var xe,ge,ve,fe,ye;g.parameters={...g.parameters,docs:{...(xe=g.parameters)==null?void 0:xe.docs,source:{originalSource:`{
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
}`,...(ve=(ge=g.parameters)==null?void 0:ge.docs)==null?void 0:ve.source},description:{story:'**`layout="vertical"`** - the journey set down a rail, as the navigation of a two-column flow (the console\'s\nCreate organization): the rail on the left, the panel beside it showing one step at a time.\n\nIt reads a second counter, `reached` - the furthest step unlocked so far - so somebody can go back to step 2 and\nforward again to step 4 without redoing 3. Every unlocked step but the current one is clickable; everything past\n`reached` is locked, faint, and titled "Opens after ...". On step 3 here, with step 4 already unlocked.',...(ye=(fe=g.parameters)==null?void 0:fe.docs)==null?void 0:ye.description}}};var we,Se,je,ke,Ne;v.parameters={...v.parameters,docs:{...(we=v.parameters)==null?void 0:we.docs,source:{originalSource:`{
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
}`,...(je=(Se=v.parameters)==null?void 0:Se.docs)==null?void 0:je.source},description:{story:"Every vertical state, readable without colour - a tick for done, a number everywhere else, the ink dropping as the step gets further away.",...(Ne=(ke=v.parameters)==null?void 0:ke.docs)==null?void 0:Ne.description}}};const ze=["Default","Layouts","States","WhenSomethingGoesWrong","WithDescriptions","Clickable","InANarrowColumn","HowManySteps","InAWizard","Vertical","VerticalStates"];export{u as Clickable,y as Default,b as HowManySteps,h as InANarrowColumn,x as InAWizard,l as Layouts,c as States,g as Vertical,v as VerticalStates,m as WhenSomethingGoesWrong,p as WithDescriptions,ze as __namedExportsOrder,Pe as default};
//# sourceMappingURL=Stepper.stories-CBwhTbX5.js.map
