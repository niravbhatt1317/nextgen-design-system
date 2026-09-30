import{j as o,r as N}from"./iframe-CRQn37hH.js";import"./index-DXf-30mB.js";import{T as l,c as r,b as c,a as i}from"./ToolbarButton-BOPzOpor.js";import{I as e}from"./Icon-BgfP2e69.js";import{I as R}from"./Input-BwTsvM6C.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-DkSUl2wM.js";import"./Badge-lxrW0k50.js";const M={title:"New Components/Toolbar",component:l,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:["The strip above a list: search and filters on the left, sort and columns on the right.","Ported from the merged console on 4 September 2026. The previous general-purpose strip is","`ToolbarOld`, deprecated.","","| Rule | |","| --- | --- |","| **One strip** | 60px tall, a 24px inset, 10px between controls, on the page ground. No sizes. |","| **Two runs** | Controls on the left as direct children. The right-hand run in a `ToolbarSection` after a `ToolbarSpacer`; a section keeps 8px. |","| **One control** | Every button in it is a `ToolbarButton`: 32px, four states. The search box is a small `Input`, parked with the fields decision. |","| **No filter chips** | Applying a filter lights the Filters button and its count. Nothing else appears. |"].join(`
`)}}}},p=()=>o.jsx(R,{size:"sm",placeholder:"Search by name or email","aria-label":"Search by name or email",startAdornment:o.jsx(e,{name:"search",size:14}),className:"mdt-w-[300px]"}),n={render:()=>o.jsxs(l,{label:"User controls",children:[o.jsx(p,{}),o.jsx(r,{icon:o.jsx(e,{name:"funnel"}),children:"Filters"}),o.jsx(r,{icon:o.jsx(e,{name:"check-circle"}),"aria-label":"Status"}),o.jsx(c,{}),o.jsxs(i,{children:[o.jsx(r,{icon:o.jsx(e,{name:"arrow-up-down"}),"aria-label":"Sort"}),o.jsx(r,{icon:o.jsx(e,{name:"columns"}),"aria-label":"Columns"})]})]})},a={render:function(){const[U,W]=N.useState(!1);return o.jsxs(l,{label:"User controls",children:[o.jsx(p,{}),o.jsx(r,{icon:o.jsx(e,{name:"funnel"}),count:2,open:U,onClick:()=>{W(E=>!E)},children:"Filters"}),o.jsx(r,{icon:o.jsx(e,{name:"check-circle"}),dot:!0,"aria-label":"Status"}),o.jsx(c,{}),o.jsxs(i,{children:[o.jsx(r,{icon:o.jsx(e,{name:"arrow-up-down"}),dot:!0,"aria-label":"Sort"}),o.jsx(r,{icon:o.jsx(e,{name:"columns"}),"aria-label":"Columns"})]})]})}},t={render:()=>o.jsxs(l,{label:"User controls",border:!0,children:[o.jsx(p,{}),o.jsx(r,{icon:o.jsx(e,{name:"funnel"}),children:"Filters"}),o.jsx(c,{}),o.jsxs(i,{children:[o.jsx(r,{icon:o.jsx(e,{name:"arrow-up-down"}),"aria-label":"Sort"}),o.jsx(r,{icon:o.jsx(e,{name:"columns"}),"aria-label":"Columns"})]})]})},s={render:()=>o.jsxs(l,{label:"Role controls",children:[o.jsx(r,{icon:o.jsx(e,{name:"funnel"}),children:"Filters"}),o.jsx(c,{}),o.jsx(i,{children:o.jsx(r,{icon:o.jsx(e,{name:"arrow-up-down"}),"aria-label":"Sort"})})]})};var u,m,d,b,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Toolbar label="User controls">
      <Search />
      <ToolbarButton icon={<Icon name="funnel" />}>Filters</ToolbarButton>
      <ToolbarButton icon={<Icon name="check-circle" />} aria-label="Status" />
      <ToolbarSpacer />
      <ToolbarSection>
        <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
        <ToolbarButton icon={<Icon name="columns" />} aria-label="Columns" />
      </ToolbarSection>
    </Toolbar>
}`,...(d=(m=n.parameters)==null?void 0:m.docs)==null?void 0:d.source},description:{story:"The Users strip at rest.",...(h=(b=n.parameters)==null?void 0:b.docs)==null?void 0:h.description}}};var T,x,j,S,f;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function WithThingsAppliedStory() {
    const [open, setOpen] = useState(false);
    return <Toolbar label="User controls">
        <Search />
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
}`,...(j=(x=a.parameters)==null?void 0:x.docs)==null?void 0:j.source},description:{story:"Two filters, a status and a sort applied. Each control says so itself; no chips.",...(f=(S=a.parameters)==null?void 0:S.docs)==null?void 0:f.description}}};var w,B,g,I,y;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <Toolbar label="User controls" border>
      <Search />
      <ToolbarButton icon={<Icon name="funnel" />}>Filters</ToolbarButton>
      <ToolbarSpacer />
      <ToolbarSection>
        <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
        <ToolbarButton icon={<Icon name="columns" />} aria-label="Columns" />
      </ToolbarSection>
    </Toolbar>
}`,...(g=(B=t.parameters)==null?void 0:B.docs)==null?void 0:g.source},description:{story:"With the hairline, for a table that has no card of its own beneath it.",...(y=(I=t.parameters)==null?void 0:I.docs)==null?void 0:y.description}}};var C,F,O,k,A;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Toolbar label="Role controls">
      <ToolbarButton icon={<Icon name="funnel" />}>Filters</ToolbarButton>
      <ToolbarSpacer />
      <ToolbarSection>
        <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
      </ToolbarSection>
    </Toolbar>
}`,...(O=(F=s.parameters)==null?void 0:F.docs)==null?void 0:O.source},description:{story:"A page with nothing to search: the strip still holds, controls only.",...(A=(k=s.parameters)==null?void 0:k.docs)==null?void 0:A.description}}};const Q=["Default","WithThingsApplied","WithBorder","ControlsOnly"];export{s as ControlsOnly,n as Default,t as WithBorder,a as WithThingsApplied,Q as __namedExportsOrder,M as default};
//# sourceMappingURL=Toolbar.stories-CW3gVMZt.js.map
