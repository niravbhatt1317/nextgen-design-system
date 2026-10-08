import{j as e}from"./iframe-BtUjxFlt.js";import{T as o}from"./TagPill-BDwSXyfj.js";import{I as h}from"./Icon-CviZHsvv.js";import{A as s}from"./Avatar-DG3vUA8J.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";const{fn:Y}=__STORYBOOK_MODULE_TEST__,oe={title:"New Components/TagPill",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["A label a person put there and can take away.","","`Badge` is the other half of that pair — a label the *system* applies, which","nobody removes. If nothing about it can be deleted, it is a Badge.","","| Prop | What it does |","| --- | --- |","| `shape` | pill · square |","| `emphasis` | fill (default) · outline — a light inset stroke, no fill, on request |","| `icon` | a 12px mark before the label |","| `avatar` | a 20px person or thing before the label |","| `onRemove` | adds the cross |","| `readOnly` | never yours to remove |","| `disabled` | yours, but not right now |","| `truncate` | cut a long label off |","","**Neutral only, by ruling.** Colour on a chip means the system set it, which makes it","a Badge. A tag is the person's, so it keeps the neutral Badge tint and the eye reads","the two as one family.","","**One size, 28px.** The console's height, corner and left inset; the library's gap, hover","and cross. The × sits in a 16px well with an invisible 24 × 24 pointer target around it.","","**The cross is always visible.** It never appears on hover: there is no hover on","a phone, and a chip that grows to reveal a control shoves its neighbours","sideways while you are aiming at them."].join(`
`)}},controls:{exclude:["class"]}},args:{onRemove:Y()}},r=({children:a})=>e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-2",children:a}),u=({children:a})=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:a}),t=({children:a})=>e.jsx("p",{className:"mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:a}),v={args:{children:"Production"}},n={parameters:{controls:{disable:!0},layout:"padded"},render:a=>e.jsxs(u,{children:[e.jsxs("div",{children:[e.jsx(t,{children:"Removable — hover the chip, then hover the cross"}),e.jsxs(r,{children:[e.jsx(o,{onRemove:a.onRemove,children:"Infrastructure"}),e.jsx(o,{shape:"square",onRemove:a.onRemove,children:"Infrastructure"})]})]}),e.jsxs("div",{children:[e.jsx(t,{children:"Read-only — never yours to remove. No cross, no hover, skipped by Tab"}),e.jsxs(r,{children:[e.jsx(o,{readOnly:!0,children:"Owned by IAM"}),e.jsx(o,{shape:"square",readOnly:!0,children:"Owned by IAM"})]})]}),e.jsxs("div",{children:[e.jsx(t,{children:"Disabled — yours, but not at this moment. Still visible, still readable"}),e.jsxs(r,{children:[e.jsx(o,{disabled:!0,onRemove:a.onRemove,children:"Infrastructure"}),e.jsx(o,{shape:"square",disabled:!0,onRemove:a.onRemove,children:"Infrastructure"})]})]}),e.jsxs("div",{children:[e.jsx(t,{children:"A plain label — nothing to remove, but not read-only either"}),e.jsxs(r,{children:[e.jsx(o,{children:"Production"}),e.jsx(o,{shape:"square",children:"Production"})]})]})]})},i={parameters:{controls:{disable:!0},layout:"padded"},render:a=>e.jsxs(u,{children:[e.jsxs("div",{children:[e.jsx(t,{children:"Fill — the default, the same neutral as a Badge"}),e.jsxs(r,{children:[e.jsx(o,{onRemove:a.onRemove,children:"Production"}),e.jsx(o,{shape:"square",onRemove:a.onRemove,children:"Production"}),e.jsx(o,{readOnly:!0,children:"Owned by IAM"})]})]}),e.jsxs("div",{children:[e.jsx(t,{children:"Outline — on request, never by default"}),e.jsxs(r,{children:[e.jsx(o,{emphasis:"outline",onRemove:a.onRemove,children:"Production"}),e.jsx(o,{emphasis:"outline",shape:"square",onRemove:a.onRemove,children:"Production"}),e.jsx(o,{emphasis:"outline",readOnly:!0,children:"Owned by IAM"})]})]})]})},l={parameters:{controls:{disable:!0},layout:"padded"},render:a=>e.jsxs(u,{children:[e.jsxs("div",{children:[e.jsx(t,{children:"Pill"}),e.jsxs(r,{children:[e.jsx(o,{onRemove:a.onRemove,children:"Production"}),e.jsx(o,{icon:e.jsx(h,{name:"tag"}),onRemove:a.onRemove,children:"Platform"}),e.jsx(o,{avatar:e.jsx(s,{name:"Nirav Bhatt",size:"xs"}),onRemove:a.onRemove,children:"Nirav Bhatt"})]})]}),e.jsxs("div",{children:[e.jsx(t,{children:"Square — the avatar takes the matching corner"}),e.jsxs(r,{children:[e.jsx(o,{shape:"square",onRemove:a.onRemove,children:"Production"}),e.jsx(o,{shape:"square",icon:e.jsx(h,{name:"tag"}),onRemove:a.onRemove,children:"Platform"}),e.jsx(o,{shape:"square",avatar:e.jsx(s,{name:"Nirav Bhatt",size:"xs",shape:"rounded"}),onRemove:a.onRemove,children:"Nirav Bhatt"})]})]})]})},d={parameters:{controls:{disable:!0},layout:"padded"},render:a=>e.jsxs(u,{children:[e.jsxs("div",{children:[e.jsx(t,{children:"Nothing · icon at 12px · avatar at 20px"}),e.jsxs(r,{children:[e.jsx(o,{onRemove:a.onRemove,children:"Production"}),e.jsx(o,{icon:e.jsx(h,{name:"tag"}),onRemove:a.onRemove,children:"Platform"}),e.jsx(o,{avatar:e.jsx(s,{name:"Nirav Bhatt",size:"xs"}),onRemove:a.onRemove,children:"Nirav Bhatt"})]})]}),e.jsxs("div",{children:[e.jsx(t,{children:"A row of people, an icon and a plain word — the left edges line up"}),e.jsxs(r,{children:[e.jsx(o,{avatar:e.jsx(s,{name:"Nirav Bhatt",size:"xs"}),onRemove:a.onRemove,children:"Nirav Bhatt"}),e.jsx(o,{avatar:e.jsx(s,{name:"Om Vekariya",size:"xs"}),onRemove:a.onRemove,children:"Om Vekariya"}),e.jsx(o,{avatar:e.jsx(s,{name:"Kaivalya Pandit",size:"xs"}),onRemove:a.onRemove,children:"Kaivalya Pandit"}),e.jsx(o,{icon:e.jsx(h,{name:"tag"}),onRemove:a.onRemove,children:"Platform"}),e.jsx(o,{onRemove:a.onRemove,children:"Production"})]})]})]})},m={parameters:{controls:{disable:!0},layout:"padded"},render:a=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-start mdt-gap-3",children:[e.jsx(o,{truncate:!0,onRemove:a.onRemove,children:"Infrastructure and platform"}),e.jsx(o,{onRemove:a.onRemove,children:"Infrastructure and platform"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Cut off above, loose below."})]})},c={parameters:{controls:{disable:!0},layout:"padded"},render:a=>e.jsxs("div",{className:"mdt-flex mdt-w-full mdt-max-w-xl mdt-flex-col mdt-gap-3",children:[e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Applied to payments-gateway"}),e.jsxs(r,{children:[e.jsx(o,{icon:e.jsx(h,{name:"tag"}),onRemove:a.onRemove,children:"Infrastructure"}),e.jsx(o,{onRemove:a.onRemove,children:"Production"}),e.jsx(o,{avatar:e.jsx(s,{name:"Nirav Bhatt",size:"xs"}),onRemove:a.onRemove,children:"Nirav Bhatt"}),e.jsx(o,{truncate:!0,onRemove:a.onRemove,children:"Needs security review"}),e.jsx(o,{readOnly:!0,children:"Owned by IAM"})]}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"The last one is read-only — applied by a policy, not by a person, so there is nothing to remove."})]})};var p,g,x;v.parameters={...v.parameters,docs:{...(p=v.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: 'Production'
  }
}`,...(x=(g=v.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var R,P,b,f,y;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: args => <Group>
      <div>
        <Label>Removable — hover the chip, then hover the cross</Label>
        <Row>
          <TagPill onRemove={args.onRemove}>Infrastructure</TagPill>
          <TagPill shape="square" onRemove={args.onRemove}>
            Infrastructure
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>Read-only — never yours to remove. No cross, no hover, skipped by Tab</Label>
        <Row>
          <TagPill readOnly>Owned by IAM</TagPill>
          <TagPill shape="square" readOnly>
            Owned by IAM
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>Disabled — yours, but not at this moment. Still visible, still readable</Label>
        <Row>
          <TagPill disabled onRemove={args.onRemove}>
            Infrastructure
          </TagPill>
          <TagPill shape="square" disabled onRemove={args.onRemove}>
            Infrastructure
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>A plain label — nothing to remove, but not read-only either</Label>
        <Row>
          <TagPill>Production</TagPill>
          <TagPill shape="square">Production</TagPill>
        </Row>
      </div>
    </Group>
}`,...(b=(P=n.parameters)==null?void 0:P.docs)==null?void 0:b.source},description:{story:`The states carry the whole design here. Hover belongs to the chip; the remove
control has its own hover on top of it, so it is clear which of the two you
are about to hit. Hover them rather than reading them.`,...(y=(f=n.parameters)==null?void 0:f.docs)==null?void 0:y.description}}};var j,T,w,N,I;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: args => <Group>
      <div>
        <Label>Fill — the default, the same neutral as a Badge</Label>
        <Row>
          <TagPill onRemove={args.onRemove}>Production</TagPill>
          <TagPill shape="square" onRemove={args.onRemove}>
            Production
          </TagPill>
          <TagPill readOnly>Owned by IAM</TagPill>
        </Row>
      </div>
      <div>
        <Label>Outline — on request, never by default</Label>
        <Row>
          <TagPill emphasis="outline" onRemove={args.onRemove}>
            Production
          </TagPill>
          <TagPill emphasis="outline" shape="square" onRemove={args.onRemove}>
            Production
          </TagPill>
          <TagPill emphasis="outline" readOnly>
            Owned by IAM
          </TagPill>
        </Row>
      </div>
    </Group>
}`,...(w=(T=i.parameters)==null?void 0:T.docs)==null?void 0:w.source},description:{story:"Fill is the default. Outline clears the fill and draws a light inset stroke; nothing moves.",...(I=(N=i.parameters)==null?void 0:N.docs)==null?void 0:I.description}}};var O,A,L,B,q;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: args => <Group>
      <div>
        <Label>Pill</Label>
        <Row>
          <TagPill onRemove={args.onRemove}>Production</TagPill>
          <TagPill icon={<Icon name="tag" />} onRemove={args.onRemove}>
            Platform
          </TagPill>
          <TagPill avatar={<Avatar name="Nirav Bhatt" size="xs" />} onRemove={args.onRemove}>
            Nirav Bhatt
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>Square — the avatar takes the matching corner</Label>
        <Row>
          <TagPill shape="square" onRemove={args.onRemove}>
            Production
          </TagPill>
          <TagPill shape="square" icon={<Icon name="tag" />} onRemove={args.onRemove}>
            Platform
          </TagPill>
          <TagPill shape="square" avatar={<Avatar name="Nirav Bhatt" size="xs" shape="rounded" />} onRemove={args.onRemove}>
            Nirav Bhatt
          </TagPill>
        </Row>
      </div>
    </Group>
}`,...(L=(A=l.parameters)==null?void 0:A.docs)==null?void 0:L.source},description:{story:`A pill reads as an object sitting on the page. A square sits into a column of
data more quietly.`,...(q=(B=l.parameters)==null?void 0:B.docs)==null?void 0:q.description}}};var S,k,z,M,G;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: args => <Group>
      <div>
        <Label>Nothing · icon at 12px · avatar at 20px</Label>
        <Row>
          <TagPill onRemove={args.onRemove}>Production</TagPill>
          <TagPill icon={<Icon name="tag" />} onRemove={args.onRemove}>
            Platform
          </TagPill>
          <TagPill avatar={<Avatar name="Nirav Bhatt" size="xs" />} onRemove={args.onRemove}>
            Nirav Bhatt
          </TagPill>
        </Row>
      </div>
      <div>
        <Label>A row of people, an icon and a plain word — the left edges line up</Label>
        <Row>
          <TagPill avatar={<Avatar name="Nirav Bhatt" size="xs" />} onRemove={args.onRemove}>
            Nirav Bhatt
          </TagPill>
          <TagPill avatar={<Avatar name="Om Vekariya" size="xs" />} onRemove={args.onRemove}>
            Om Vekariya
          </TagPill>
          <TagPill avatar={<Avatar name="Kaivalya Pandit" size="xs" />} onRemove={args.onRemove}>
            Kaivalya Pandit
          </TagPill>
          <TagPill icon={<Icon name="tag" />} onRemove={args.onRemove}>
            Platform
          </TagPill>
          <TagPill onRemove={args.onRemove}>Production</TagPill>
        </Row>
      </div>
    </Group>
}`,...(z=(k=d.parameters)==null?void 0:k.docs)==null?void 0:z.source},description:{story:`Two different things share the leading slot, and they need different
treatment. An icon is a line drawing that carries its own air, so it sits
small and 10px in. An avatar is a filled circle with none at all, so it runs
nearly the chip's full height and sits 2px in.

Measured from the ink rather than the boxes, a tag with an icon comes out at
12px of air on each side.`,...(G=(M=d.parameters)==null?void 0:M.docs)==null?void 0:G.description}}};var _,E,D,K,C;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: args => <div className="mdt-flex mdt-flex-col mdt-items-start mdt-gap-3">
      <TagPill truncate onRemove={args.onRemove}>
        Infrastructure and platform
      </TagPill>
      <TagPill onRemove={args.onRemove}>Infrastructure and platform</TagPill>
      <p className="mdt-text-xs mdt-text-muted-foreground">Cut off above, loose below.</p>
    </div>
}`,...(D=(E=m.parameters)==null?void 0:E.docs)==null?void 0:D.source},description:{story:"A tag's text is written by a person, so its length is not yours to control.\nWith `truncate` it cuts off rather than stretching whatever holds it.",...(C=(K=m.parameters)==null?void 0:K.docs)==null?void 0:C.description}}};var V,F,H,W,U;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: args => <div className="mdt-flex mdt-w-full mdt-max-w-xl mdt-flex-col mdt-gap-3">
      <p className="mdt-text-xs mdt-text-muted-foreground">Applied to payments-gateway</p>
      <Row>
        <TagPill icon={<Icon name="tag" />} onRemove={args.onRemove}>
          Infrastructure
        </TagPill>
        <TagPill onRemove={args.onRemove}>Production</TagPill>
        <TagPill avatar={<Avatar name="Nirav Bhatt" size="xs" />} onRemove={args.onRemove}>
          Nirav Bhatt
        </TagPill>
        <TagPill truncate onRemove={args.onRemove}>
          Needs security review
        </TagPill>
        <TagPill readOnly>Owned by IAM</TagPill>
      </Row>
      <p className="mdt-text-xs mdt-text-muted-foreground">
        The last one is read-only — applied by a policy, not by a person, so there is nothing to
        remove.
      </p>
    </div>
}`,...(H=(F=c.parameters)==null?void 0:F.docs)==null?void 0:H.source},description:{story:`Tags almost never appear alone. This is the honest check — spacing that looks
fine on one chip can still be wrong beside its neighbours.`,...(U=(W=c.parameters)==null?void 0:W.docs)==null?void 0:U.description}}};const re=["Default","States","Emphasis","Shapes","LeadingSlot","LongLabels","InPlace"];export{v as Default,i as Emphasis,c as InPlace,d as LeadingSlot,m as LongLabels,l as Shapes,n as States,re as __namedExportsOrder,oe as default};
//# sourceMappingURL=TagPill.stories-CtUnb2kX.js.map
