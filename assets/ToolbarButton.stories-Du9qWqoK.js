import{j as e,r as E}from"./iframe-D3L_AnZa.js";import{c as t,T as O,b as W,a as q}from"./ToolbarButton-BYufBIIB.js";import{I as o}from"./Icon-BcXiq_tR.js";import{P as H,a as U,b as M}from"./Popover-Cte_AVwZ.js";import{I as _}from"./Input-tBX3WOsA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./Badge-wPcL5ZRZ.js";import"./index-CPMGFkTY.js";import"./index-aJxLFKE2.js";import"./index-DRUA48A3.js";import"./index-BdSqhxDN.js";import"./index-DkkbFPYq.js";import"./index-C8XH1Saf.js";import"./index-CfH6n4xF.js";import"./index-retS0xqV.js";import"./Combination-DR26Rniv.js";import"./index-C4-KIcLT.js";import"./index-B7fcxO3w.js";import"./index-B2qj-pDA.js";import"./index-A1AWFnZD.js";import"./index-B_-eZSry.js";const pe={title:"New Components/ToolbarButton",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["The 32px control that lives in a Toolbar strip: Filters, a quick filter, Sort, Columns.","Ported from the merged console on 4 September 2026.","","| State | Ground | Edge | Marker |","| --- | --- | --- | --- |","| Rest | White | Neutral-30 | None |","| Hover, keyboard focus | Lifts to neutral-10 | Slate | None |","| Open, the menu or drawer is showing | Same as hover | Slate | None |","| Active, something is applied | White | Slate | A `count` after the label, or a `dot` on the top-right corner |","","**No filter chips.** Applying a filter draws nothing new in the strip or under it. The lit","button and its count are the whole signal; the drawer or menu shows which filters are on.","","**Which marker.** Filters carries a count. The quick filter and Sort carry a dot. Columns has",'no applied state at all, by ruling. The edge is always 1px, and the three "on" looks share',"one slate so the strip never shows two darknesses side by side.","","A Radix trigger (Popover, DropdownMenu) reports `open` on its own through `data-state`, so","the `open` prop is only needed for a drawer."].join(`
`)}}}},n=({label:d,children:r})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,minHeight:44},children:[e.jsx("span",{style:{width:160,flex:"none",fontSize:11,letterSpacing:".08em",textTransform:"uppercase",color:"hsl(var(--mdt-muted-foreground))",fontWeight:600},children:d}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:r})]}),c={args:{children:"Filters",icon:e.jsx(o,{name:"funnel"}),count:0}},a={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[e.jsxs(n,{label:"rest · hover me",children:[e.jsx(t,{icon:e.jsx(o,{name:"funnel"}),children:"Filters"}),e.jsx(t,{icon:e.jsx(o,{name:"check-circle"}),"aria-label":"Status"}),e.jsx(t,{icon:e.jsx(o,{name:"arrow-up-down"}),"aria-label":"Sort"}),e.jsx(t,{icon:e.jsx(o,{name:"columns"}),"aria-label":"Columns"})]}),e.jsxs(n,{label:"open",children:[e.jsx(t,{icon:e.jsx(o,{name:"funnel"}),open:!0,children:"Filters"}),e.jsx(t,{icon:e.jsx(o,{name:"check-circle"}),open:!0,"aria-label":"Status"}),e.jsx(t,{icon:e.jsx(o,{name:"arrow-up-down"}),open:!0,"aria-label":"Sort"}),e.jsx(t,{icon:e.jsx(o,{name:"columns"}),open:!0,"aria-label":"Columns"})]}),e.jsxs(n,{label:"active",children:[e.jsx(t,{icon:e.jsx(o,{name:"funnel"}),count:2,children:"Filters"}),e.jsx(t,{icon:e.jsx(o,{name:"check-circle"}),dot:!0,"aria-label":"Status"}),e.jsx(t,{icon:e.jsx(o,{name:"arrow-up-down"}),dot:!0,"aria-label":"Sort"}),e.jsx("span",{style:{fontSize:12,color:"hsl(var(--mdt-muted-foreground))",fontStyle:"italic"},children:"Columns has no active state"})]}),e.jsxs(n,{label:"count caps at 9+",children:[e.jsx(t,{icon:e.jsx(o,{name:"funnel"}),count:1,children:"Filters"}),e.jsx(t,{icon:e.jsx(o,{name:"funnel"}),count:9,children:"Filters"}),e.jsx(t,{icon:e.jsx(o,{name:"funnel"}),count:14,children:"Filters"})]}),e.jsxs(n,{label:"disabled",children:[e.jsx(t,{icon:e.jsx(o,{name:"funnel"}),disabled:!0,children:"Filters"}),e.jsx(t,{icon:e.jsx(o,{name:"arrow-up-down"}),disabled:!0,"aria-label":"Sort"})]})]})},s={render:function(){const[r,m]=E.useState(!1);return e.jsxs(H,{children:[e.jsx(U,{asChild:!0,children:e.jsx(t,{icon:e.jsx(o,{name:"arrow-up-down"}),dot:r,"aria-label":"Sort"})}),e.jsx(M,{align:"start",className:"mdt-w-56 mdt-p-2",children:e.jsx("button",{type:"button",className:"mdt-w-full mdt-rounded-md mdt-px-2 mdt-py-1.5 mdt-text-left mdt-text-sm hover:mdt-bg-muted",onClick:()=>{m(u=>!u)},children:r?"Clear sort":"Sort by name"})})]})}},l={parameters:{layout:"fullscreen"},render:function(){const[r,m]=E.useState(!1);return e.jsxs(O,{label:"User controls",children:[e.jsx(_,{size:"sm",placeholder:"Search by name or email","aria-label":"Search by name or email",startAdornment:e.jsx(o,{name:"search",size:14}),className:"mdt-w-[300px]"}),e.jsx(t,{icon:e.jsx(o,{name:"funnel"}),count:2,open:r,onClick:()=>{m(u=>!u)},children:"Filters"}),e.jsx(t,{icon:e.jsx(o,{name:"check-circle"}),dot:!0,"aria-label":"Status"}),e.jsx(W,{}),e.jsxs(q,{children:[e.jsx(t,{icon:e.jsx(o,{name:"arrow-up-down"}),dot:!0,"aria-label":"Sort"}),e.jsx(t,{icon:e.jsx(o,{name:"columns"}),"aria-label":"Columns"})]})]})}},i={args:{children:"Filters",icon:e.jsx(o,{name:"funnel"}),count:2,open:!1,dot:!1,disabled:!1},argTypes:{count:{control:{type:"number",min:0,max:20}},open:{control:"boolean"},dot:{control:"boolean"},active:{control:"boolean"},disabled:{control:"boolean"},children:{control:"text"},icon:{control:!1}}};var p,b,h;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: 'Filters',
    icon: <Icon name="funnel" />,
    count: 0
  }
}`,...(h=(b=c.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var x,f,j,g,w;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  }}>
      <Row label="rest · hover me">
        <ToolbarButton icon={<Icon name="funnel" />}>Filters</ToolbarButton>
        <ToolbarButton icon={<Icon name="check-circle" />} aria-label="Status" />
        <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
        <ToolbarButton icon={<Icon name="columns" />} aria-label="Columns" />
      </Row>
      <Row label="open">
        <ToolbarButton icon={<Icon name="funnel" />} open>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="check-circle" />} open aria-label="Status" />
        <ToolbarButton icon={<Icon name="arrow-up-down" />} open aria-label="Sort" />
        <ToolbarButton icon={<Icon name="columns" />} open aria-label="Columns" />
      </Row>
      <Row label="active">
        <ToolbarButton icon={<Icon name="funnel" />} count={2}>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="check-circle" />} dot aria-label="Status" />
        <ToolbarButton icon={<Icon name="arrow-up-down" />} dot aria-label="Sort" />
        <span style={{
        fontSize: 12,
        color: 'hsl(var(--mdt-muted-foreground))',
        fontStyle: 'italic'
      }}>
          Columns has no active state
        </span>
      </Row>
      <Row label="count caps at 9+">
        <ToolbarButton icon={<Icon name="funnel" />} count={1}>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="funnel" />} count={9}>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="funnel" />} count={14}>
          Filters
        </ToolbarButton>
      </Row>
      <Row label="disabled">
        <ToolbarButton icon={<Icon name="funnel" />} disabled>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="arrow-up-down" />} disabled aria-label="Sort" />
      </Row>
    </div>
}`,...(j=(f=a.parameters)==null?void 0:f.docs)==null?void 0:j.source},description:{story:"Rest, open, active. Hover the rest ones to see the ground lift and the edge turn slate.",...(w=(g=a.parameters)==null?void 0:g.docs)==null?void 0:w.description}}};var S,T,y,v,I;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: function AsATriggerStory() {
    const [sorted, setSorted] = useState(false);
    return <Popover>
        <PopoverTrigger asChild>
          <ToolbarButton icon={<Icon name="arrow-up-down" />} dot={sorted} aria-label="Sort" />
        </PopoverTrigger>
        <PopoverContent align="start" className="mdt-w-56 mdt-p-2">
          <button type="button" className="mdt-w-full mdt-rounded-md mdt-px-2 mdt-py-1.5 mdt-text-left mdt-text-sm hover:mdt-bg-muted" onClick={() => {
          setSorted(s => !s);
        }}>
            {sorted ? 'Clear sort' : 'Sort by name'}
          </button>
        </PopoverContent>
      </Popover>;
  }
}`,...(y=(T=s.parameters)==null?void 0:T.docs)==null?void 0:y.source},description:{story:"Inside a Popover the trigger reports open on its own; nothing to wire.",...(I=(v=s.parameters)==null?void 0:v.docs)==null?void 0:I.description}}};var B,C,F,k,P;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: function InTheBandStory() {
    const [open, setOpen] = useState(false);
    return <Toolbar label="User controls">
        <Input size="sm" placeholder="Search by name or email" aria-label="Search by name or email" startAdornment={<Icon name="search" size={14} />} className="mdt-w-[300px]" />
        <ToolbarButton icon={<Icon name="funnel" />} count={2} open={open} onClick={() => {
        setOpen(o => !o);
      }}>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="check-circle" />} dot aria-label="Status" />
        <ToolbarSpacer />
        <ToolbarSection>
          <ToolbarButton icon={<Icon name="arrow-up-down" />} dot aria-label="Sort" />
          <ToolbarButton icon={<Icon name="columns" />} aria-label="Columns" />
        </ToolbarSection>
      </Toolbar>;
  }
}`,...(F=(C=l.parameters)==null?void 0:C.docs)==null?void 0:F.source},description:{story:`The Users toolbar: the strip, 60px tall with a 24px inset,
10px between the controls on the left and 8px on the right. Filters has two
applied, the status quick filter one, and a sort is on. No chips.`,...(P=(k=l.parameters)==null?void 0:k.docs)==null?void 0:P.description}}};var R,A,N,z,D;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    children: 'Filters',
    icon: <Icon name="funnel" />,
    count: 2,
    open: false,
    dot: false,
    disabled: false
  },
  argTypes: {
    count: {
      control: {
        type: 'number',
        min: 0,
        max: 20
      }
    },
    open: {
      control: 'boolean'
    },
    dot: {
      control: 'boolean'
    },
    active: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    children: {
      control: 'text'
    },
    icon: {
      control: false
    }
  }
}`,...(N=(A=i.parameters)==null?void 0:A.docs)==null?void 0:N.source},description:{story:"Every option on one page, driven by the Controls panel.",...(D=(z=i.parameters)==null?void 0:z.docs)==null?void 0:D.description}}};const be=["Default","States","AsATrigger","InTheBand","Playground"];export{s as AsATrigger,c as Default,l as InTheBand,i as Playground,a as States,be as __namedExportsOrder,pe as default};
//# sourceMappingURL=ToolbarButton.stories-Du9qWqoK.js.map
