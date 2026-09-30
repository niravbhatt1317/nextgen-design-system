import{j as e}from"./iframe-CMFEwLf1.js";import{P as a,a as v}from"./Progress-C3dcH77e.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";const pe={title:"Components/Progress",component:a,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["How far along something is.","","Org Mgmt and Agent Fleet both built this, and both audits call their version",'**"the cleanest atom in the set — zero drift"**. Two teams arrived at the same',"thing independently and neither found a fault in it, so this follows it closely.","","`aria-label` is required — a bar with no name tells a screen reader nothing."].join(`
`)}}},args:{value:62,"aria-label":"Storage used"}},b=({children:r})=>e.jsx("div",{className:"mdt-flex mdt-w-96 mdt-flex-col mdt-gap-6",children:r}),s=({children:r})=>e.jsx("p",{className:"mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:r}),h={},g={parameters:{controls:{disable:!0}},render:()=>e.jsxs(b,{children:[e.jsxs("div",{children:[e.jsx(s,{children:"default"}),e.jsx(a,{value:62,"aria-label":"Storage used"})]}),e.jsxs("div",{children:[e.jsx(s,{children:"success"}),e.jsx(a,{value:100,tone:"success","aria-label":"Rollout complete"})]}),e.jsxs("div",{children:[e.jsx(s,{children:"warning"}),e.jsx(a,{value:81,tone:"warning","aria-label":"Seats used"})]}),e.jsxs("div",{children:[e.jsx(s,{children:"danger"}),e.jsx(a,{value:96,tone:"danger","aria-label":"Quota used"})]})]})},m={parameters:{controls:{disable:!0}},render:()=>e.jsxs(b,{children:[e.jsx(a,{value:62,size:"sm","aria-label":"Small"}),e.jsx(a,{value:62,size:"md","aria-label":"Medium"}),e.jsx(a,{value:62,size:"lg","aria-label":"Large"})]})},t={name:"With markers",parameters:{controls:{disable:!0}},render:()=>e.jsxs(b,{children:[e.jsxs("div",{children:[e.jsx(s,{children:"Baseline — the value this tenant is measured against"}),e.jsx(a,{value:62,baseline:75,"aria-label":"Seats used against baseline"})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Floor — a lower bound"}),e.jsx(a,{value:62,floor:20,"aria-label":"Seats used above floor"})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Both, over the baseline"}),e.jsx(a,{value:88,tone:"warning",baseline:75,floor:20,"aria-label":"Seats used, over baseline"})]})]})},l={name:"Edge cases",parameters:{controls:{disable:!0}},render:()=>e.jsxs(b,{children:[e.jsxs("div",{children:[e.jsx(s,{children:"Empty"}),e.jsx(a,{value:0,"aria-label":"Nothing used"})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Full"}),e.jsx(a,{value:100,tone:"success","aria-label":"All used"})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Over 100 — clamped"}),e.jsx(a,{value:150,tone:"danger","aria-label":"Over quota"})]}),e.jsxs("div",{children:[e.jsx(s,{children:"Custom max — 5 of 20"}),e.jsx(a,{value:5,max:20,"aria-label":"Five of twenty"})]})]})},o={render:()=>e.jsxs("div",{className:"mdt-flex mdt-w-[420px] mdt-flex-col mdt-gap-7",children:[e.jsx(a,{value:62,above:{left:"Storage used",right:"62%"},below:{left:"62 GB of 100 GB",right:"38 GB left"},"aria-label":"Storage used"}),e.jsx(a,{value:91,tone:"danger",above:{left:"Seats used",right:"91 of 100"},below:{right:"9 left"},"aria-label":"Seats used"}),e.jsx(a,{value:38,above:"Uploading rollback-plan.pdf","aria-label":"Uploading"}),e.jsx(a,{value:100,tone:"success",below:{left:"Finished",right:"2 min ago"},"aria-label":"Import"})]})},n={render:()=>e.jsxs("div",{className:"mdt-flex mdt-w-[420px] mdt-flex-col mdt-gap-5",children:[e.jsx(a,{value:62,above:{left:"Storage",right:"62%"},below:{left:"62 GB of 100 GB",right:"38 GB left"},"aria-label":"Storage"}),e.jsx(a,{value:91,tone:"danger",above:{left:"Seats",right:"91%"},below:{left:"91 of 100",right:"9 left"},"aria-label":"Seats"}),e.jsx(a,{value:7,tone:"success",above:{left:"Automations",right:"7%"},below:{left:"140 of 2,000",right:"1,860 left"},"aria-label":"Automations"}),e.jsx(a,{value:78,tone:"warning",above:{left:"API calls today",right:"78%"},below:{left:"7,800 of 10,000",right:"2,200 left"},"aria-label":"API calls today"})]})},i={render:()=>e.jsx("div",{className:"mdt-w-[420px]",children:e.jsx(a,{value:91,tone:"danger",baseline:75,above:{left:"Seats used",right:"91 of 100"},below:{right:"9 over your plan"},legend:[{label:"Used",value:91,swatch:"danger"},{label:"Your plan allows",value:75,swatch:"baseline"}],"aria-label":"Seats used"})})},d={render:()=>e.jsx("div",{className:"mdt-w-[420px]",children:e.jsx(v,{max:100,segments:[{label:"Tickets",value:48,valueLabel:"48 GB"},{label:"Attachments",value:22,valueLabel:"22 GB",tone:"warning"},{label:"Backups",value:14,valueLabel:"14 GB",tone:"success"}],remainderLabel:"Free",formatValue:r=>`${String(r)} GB`,above:{left:"Storage",right:"100 GB"},below:{left:"Updated 4 minutes ago",right:"84 GB used"},"aria-label":"Storage: 48 GB tickets, 22 GB attachments, 14 GB backups, 16 GB free of 100 GB"})})},c={render:()=>e.jsx("div",{className:"mdt-w-[420px]",children:e.jsx(v,{segments:[{label:"Open",value:34,tone:"danger"},{label:"In progress",value:21,tone:"warning"},{label:"Resolved",value:62,tone:"success"}],above:{left:"Tickets this week",right:"117"},"aria-label":"Tickets this week: 34 open, 21 in progress, 62 resolved"})})},u={render:()=>e.jsx("div",{className:"mdt-w-[420px]",children:e.jsx(v,{max:100,showLegend:!1,segments:[{label:"Tickets",value:48},{label:"Attachments",value:22,tone:"warning"},{label:"Backups",value:14,tone:"success"}],above:{left:"Storage",right:"84 GB of 100 GB"},"aria-label":"Storage: 84 GB of 100 GB used"})})};var p,f,w;h.parameters={...h.parameters,docs:{...(p=h.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(w=(f=h.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};var x,S,k;g.parameters={...g.parameters,docs:{...(x=g.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>default</Label>
        <Progress value={62} aria-label="Storage used" />
      </div>
      <div>
        <Label>success</Label>
        <Progress value={100} tone="success" aria-label="Rollout complete" />
      </div>
      <div>
        <Label>warning</Label>
        <Progress value={81} tone="warning" aria-label="Seats used" />
      </div>
      <div>
        <Label>danger</Label>
        <Progress value={96} tone="danger" aria-label="Quota used" />
      </div>
    </Stack>
}`,...(k=(S=g.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var j,B,G;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <Progress value={62} size="sm" aria-label="Small" />
      <Progress value={62} size="md" aria-label="Medium" />
      <Progress value={62} size="lg" aria-label="Large" />
    </Stack>
}`,...(G=(B=m.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var L,P,y,A,T;t.parameters={...t.parameters,docs:{...(L=t.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: 'With markers',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>Baseline — the value this tenant is measured against</Label>
        <Progress value={62} baseline={75} aria-label="Seats used against baseline" />
      </div>
      <div>
        <Label>Floor — a lower bound</Label>
        <Progress value={62} floor={20} aria-label="Seats used above floor" />
      </div>
      <div>
        <Label>Both, over the baseline</Label>
        <Progress value={88} tone="warning" baseline={75} floor={20} aria-label="Seats used, over baseline" />
      </div>
    </Stack>
}`,...(y=(P=t.parameters)==null?void 0:P.docs)==null?void 0:y.source},description:{story:"The markers Org Mgmt's ConstraintMeter uses to give a value context.",...(T=(A=t.parameters)==null?void 0:A.docs)==null?void 0:T.description}}};var N,W,F,z,O;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'Edge cases',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>Empty</Label>
        <Progress value={0} aria-label="Nothing used" />
      </div>
      <div>
        <Label>Full</Label>
        <Progress value={100} tone="success" aria-label="All used" />
      </div>
      <div>
        <Label>Over 100 — clamped</Label>
        <Progress value={150} tone="danger" aria-label="Over quota" />
      </div>
      <div>
        <Label>Custom max — 5 of 20</Label>
        <Progress value={5} max={20} aria-label="Five of twenty" />
      </div>
    </Stack>
}`,...(F=(W=l.parameters)==null?void 0:W.docs)==null?void 0:F.source},description:{story:"Out-of-range values are clamped rather than overflowing the track.",...(O=(z=l.parameters)==null?void 0:z.docs)==null?void 0:O.description}}};var I,M,E,U,q;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-w-[420px] mdt-flex-col mdt-gap-7">
      <Progress value={62} above={{
      left: 'Storage used',
      right: '62%'
    }} below={{
      left: '62 GB of 100 GB',
      right: '38 GB left'
    }} aria-label="Storage used" />
      <Progress value={91} tone="danger" above={{
      left: 'Seats used',
      right: '91 of 100'
    }} below={{
      right: '9 left'
    }} aria-label="Seats used" />
      <Progress value={38} above="Uploading rollback-plan.pdf" aria-label="Uploading" />
      <Progress value={100} tone="success" below={{
      left: 'Finished',
      right: '2 min ago'
    }} aria-label="Import" />
    </div>
}`,...(E=(M=o.parameters)==null?void 0:M.docs)==null?void 0:E.source},description:{story:`## The four slots

A line above the bar and a line below, each with a left end and a right end.
Left and right sit at the two ends of the same line, which is what makes
**"Storage used"** and **"62%"** read as one sentence about one bar rather
than two labels that happen to be near each other.

Any of the four can be left out. Pass a bare string and that is the left end
on its own.`,...(q=(U=o.parameters)==null?void 0:U.docs)==null?void 0:q.description}}};var C,R,D,Q,V;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-w-[420px] mdt-flex-col mdt-gap-5">
      <Progress value={62} above={{
      left: 'Storage',
      right: '62%'
    }} below={{
      left: '62 GB of 100 GB',
      right: '38 GB left'
    }} aria-label="Storage" />
      <Progress value={91} tone="danger" above={{
      left: 'Seats',
      right: '91%'
    }} below={{
      left: '91 of 100',
      right: '9 left'
    }} aria-label="Seats" />
      <Progress value={7} tone="success" above={{
      left: 'Automations',
      right: '7%'
    }} below={{
      left: '140 of 2,000',
      right: '1,860 left'
    }} aria-label="Automations" />
      <Progress value={78} tone="warning" above={{
      left: 'API calls today',
      right: '78%'
    }} below={{
      left: '7,800 of 10,000',
      right: '2,200 left'
    }} aria-label="API calls today" />
    </div>
}`,...(D=(R=n.parameters)==null?void 0:R.docs)==null?void 0:D.source},description:{story:`Four of them stacked, which is where the alignment earns its keep.

**The figures on the right form a straight edge** because the digits are set
to a single width. Without that, 1,860 and 9 sit at different distances from
the edge and the column looks broken.`,...(V=(Q=n.parameters)==null?void 0:Q.docs)==null?void 0:V.description}}};var Y,_,$,H,J;i.parameters={...i.parameters,docs:{...(Y=i.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-[420px]">
      <Progress value={91} tone="danger" baseline={75} above={{
      left: 'Seats used',
      right: '91 of 100'
    }} below={{
      right: '9 over your plan'
    }} legend={[{
      label: 'Used',
      value: 91,
      swatch: 'danger'
    }, {
      label: 'Your plan allows',
      value: 75,
      swatch: 'baseline'
    }]} aria-label="Seats used" />
    </div>
}`,...($=(_=i.parameters)==null?void 0:_.docs)==null?void 0:$.source},description:{story:`## A key for the markers

The bar takes a \`baseline\` marker and a \`floor\` marker, and without a key
nothing on screen says what those lines mean.

**A key of one colour explains nothing**, so the legend earns its place only
when there is more than one thing on the track. A marker is a line, so its
swatch is a line too — a square would say "a band of the bar is this colour",
which is the opposite of what a marker is.`,...(J=(H=i.parameters)==null?void 0:H.docs)==null?void 0:J.description}}};var K,X,Z,ee,ae;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-[420px]">
      <ProgressBreakdown max={100} segments={[{
      label: 'Tickets',
      value: 48,
      valueLabel: '48 GB'
    }, {
      label: 'Attachments',
      value: 22,
      valueLabel: '22 GB',
      tone: 'warning'
    }, {
      label: 'Backups',
      value: 14,
      valueLabel: '14 GB',
      tone: 'success'
    }]} remainderLabel="Free" formatValue={n => \`\${String(n)} GB\`} above={{
      left: 'Storage',
      right: '100 GB'
    }} below={{
      left: 'Updated 4 minutes ago',
      right: '84 GB used'
    }} aria-label="Storage: 48 GB tickets, 22 GB attachments, 14 GB backups, 16 GB free of 100 GB" />
    </div>
}`,...(Z=(X=d.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:`## ProgressBreakdown — one whole, divided into named parts

Same track, same tones, same sizes — and a different question. Progress says
how far along one thing is; this says what a whole is made of.

**It is not a progress bar and is not announced as one.** Nothing here is
advancing toward finishing and there is no single value, so it is one picture
with one sentence describing it — which is why \`aria-label\` has to carry the
whole story.

The parts butt together and carry no rounding of their own; only the two ends
of the bar are round. That is what makes it read as one thing divided up
rather than several bars sitting next to each other.`,...(ae=(ee=d.parameters)==null?void 0:ee.docs)==null?void 0:ae.description}}};var se,re,te,le,oe;c.parameters={...c.parameters,docs:{...(se=c.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-[420px]">
      <ProgressBreakdown segments={[{
      label: 'Open',
      value: 34,
      tone: 'danger'
    }, {
      label: 'In progress',
      value: 21,
      tone: 'warning'
    }, {
      label: 'Resolved',
      value: 62,
      tone: 'success'
    }]} above={{
      left: 'Tickets this week',
      right: '117'
    }} aria-label="Tickets this week: 34 open, 21 in progress, 62 resolved" />
    </div>
}`,...(te=(re=c.parameters)==null?void 0:re.docs)==null?void 0:te.source},description:{story:"With no `max`, the parts **are** the whole and are drawn as shares of their\nown total — so a breakdown of a queue does not need a denominator invented\nfor it.",...(oe=(le=c.parameters)==null?void 0:le.docs)==null?void 0:oe.description}}};var ne,ie,de,ce,ue;u.parameters={...u.parameters,docs:{...(ne=u.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-[420px]">
      <ProgressBreakdown max={100} showLegend={false} segments={[{
      label: 'Tickets',
      value: 48
    }, {
      label: 'Attachments',
      value: 22,
      tone: 'warning'
    }, {
      label: 'Backups',
      value: 14,
      tone: 'success'
    }]} above={{
      left: 'Storage',
      right: '84 GB of 100 GB'
    }} aria-label="Storage: 84 GB of 100 GB used" />
    </div>
}`,...(de=(ie=u.parameters)==null?void 0:ie.docs)==null?void 0:de.source},description:{story:"The legend can be turned off when the parts are labelled somewhere else.",...(ue=(ce=u.parameters)==null?void 0:ce.docs)==null?void 0:ue.description}}};const fe=["Default","Tones","Sizes","WithMarkers","EdgeCases","WithLabels","Stacked","WithLegend","Breakdown","BreakdownWithoutMax","BreakdownWithoutLegend"];export{d as Breakdown,u as BreakdownWithoutLegend,c as BreakdownWithoutMax,h as Default,l as EdgeCases,m as Sizes,n as Stacked,g as Tones,o as WithLabels,i as WithLegend,t as WithMarkers,fe as __namedExportsOrder,pe as default};
//# sourceMappingURL=Progress.stories-BPQD6Jkc.js.map
