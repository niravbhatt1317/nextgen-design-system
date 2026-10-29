import{j as e,r as f}from"./iframe-D3prpiam.js";import{P as n,a as i,b as te,c as b,d as oe}from"./Popover-Pr1zR15E.js";import{B as g}from"./Button-Dm8cqF7t.js";import{I as t}from"./Icon-Dx9XXtQk.js";import"./preload-helper-Dp1pzeXC.js";import"./DropdownMenu-DDdui5Jx.js";import"./index-5NTikNTt.js";import"./index-4AQQuvpZ.js";import"./index-28IxR4K0.js";import"./index-DWFjSe0X.js";import"./index-Dp_whDTU.js";import"./index-DOzB6PXY.js";import"./index-CfLsbkXh.js";import"./index-Do4P7H5Z.js";import"./index-B9Vx0Db6.js";import"./index-CDzjl8Nl.js";import"./index-rVfbO7DR.js";import"./index-DRWHOs2m.js";import"./index-D2iJc-0x.js";import"./index-CtGrMHpd.js";import"./index-QOw5hcJ7.js";import"./index-Bh7Bny6w.js";import"./index-CcRgbaMz.js";import"./picked-row-BGnBNViw.js";import"./index-CcOk_2h2.js";import"./Input-BCOeOOhc.js";import"./index-ChEho857.js";import"./Checkbox-3WP1q0cd.js";import"./index-BCP57w5e.js";import"./icon-at-drawn-size-BUHWhXTL.js";const{userEvent:re,within:ne}=__STORYBOOK_MODULE_TEST__,Fe={title:"New Components/Popover",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["One popover, three variants (Pranjal, 2026-10-29). Pick the variant on `<Popover variant>`:","","- **`card`** (the default) - **the empty card**: the overlay surface and nothing else, for anything a page","  puts in it. `<PopoverContent>` inside. The Popover as it was, unchanged.","- **`action-menu`** - **the action menu** (a row's or a header's ⋯): `<PopoverActionMenu groups danger />`.","  Its rules are built in: an icon on every item; a divider between groups (any number, or none); at most","  **one red action**, always **last**, always **under a divider**; at least 224 wide (a longer item widens it).","- **`quick-filter`** - **the quick filter**, the table toolbar's tick menu:","  `<PopoverQuickFilter heading options value onValueChange />` - the heading naming what it filters, an","  optional search, a checkbox per value.","","The two menus are menus underneath (the DropdownMenu parts), so they keep the menu's keys - arrows, type to","jump, Escape back to the trigger - and read as a menu to a screen reader.","","The surface: `--mdt-popover`, the colour map's `elevation.surface.overlay` - white in light, neutral-150 in","dark, a step DARKER than a card, with the hairline visible on it. Exported as `popoverSurface` for the other","parts that float.","","Replaces the Popover before it (now `PopoverOld2`, under Deprecated 2) as of 29 October 2026."].join(`
`)}},controls:{exclude:["class"]}}},x=f.forwardRef((r,a)=>e.jsx("button",{ref:a,type:"button",className:"mdt-inline-flex mdt-h-6 mdt-w-6 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-faint hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 data-[state=open]:mdt-bg-neutral-20 data-[state=open]:mdt-text-neutral-90","aria-label":"Row actions",...r,children:e.jsx(t,{name:"more-horizontal",size:16})}));x.displayName="MoreButton";const o=()=>{},v=r=>async({canvasElement:a})=>{await new Promise(s=>setTimeout(s,150)),await re.click(ne(a).getByRole("button",{name:r}))},l={render:()=>e.jsxs(n,{children:[e.jsx(i,{asChild:!0,children:e.jsx(g,{variant:"outline",children:"Open popover"})}),e.jsx(te,{children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("h4",{className:"mdt-m-0 mdt-text-sm mdt-font-medium",children:"Dimensions"}),e.jsx("p",{className:"mdt-m-0 mdt-text-sm mdt-text-muted-foreground",children:"Set the dimensions for the layer."})]})})]})},d={render:()=>e.jsxs("div",{className:"mdt-flex mdt-items-start mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-w-56 mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-neutral-30 mdt-bg-card mdt-p-4",children:[e.jsx("h4",{className:"mdt-m-0 mdt-text-sm mdt-font-medium",children:"A card"}),e.jsx("p",{className:"mdt-m-0 mdt-text-sm mdt-text-muted-foreground",children:"--mdt-card, with its edge."})]}),e.jsxs(n,{defaultOpen:!0,children:[e.jsx(i,{asChild:!0,children:e.jsx(g,{variant:"outline",children:"The popover"})}),e.jsx(te,{align:"start",sideOffset:8,children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("h4",{className:"mdt-m-0 mdt-text-sm mdt-font-medium",children:"The overlay surface"}),e.jsx("p",{className:"mdt-m-0 mdt-text-sm mdt-text-muted-foreground",children:"--mdt-popover: white in light, neutral-150 in dark, the hairline visible on it."})]})})]})]})},c={play:v("Row actions"),render:()=>e.jsxs(n,{variant:"action-menu",children:[e.jsx(i,{asChild:!0,children:e.jsx(x,{})}),e.jsx(b,{groups:[[{label:"Edit details",icon:e.jsx(t,{name:"pencil"}),onSelect:o},{label:"Disable user",icon:e.jsx(t,{name:"user-x"}),onSelect:o}]],danger:{label:"Delete user",icon:e.jsx(t,{name:"trash-2"}),onSelect:o}})]})},m={play:v("Row actions"),render:()=>e.jsxs(n,{variant:"action-menu",children:[e.jsx(i,{asChild:!0,children:e.jsx(x,{})}),e.jsx(b,{groups:[[{label:"Edit details",icon:e.jsx(t,{name:"pencil"}),onSelect:o},{label:"Duplicate",icon:e.jsx(t,{name:"copy"}),onSelect:o}],[{label:"Export as CSV",icon:e.jsx(t,{name:"download"}),onSelect:o},{label:"Copy link",icon:e.jsx(t,{name:"link"}),onSelect:o}]],danger:{label:"Delete team",icon:e.jsx(t,{name:"trash-2"}),onSelect:o}})]})},p={play:v("Row actions"),render:()=>e.jsxs(n,{variant:"action-menu",children:[e.jsx(i,{asChild:!0,children:e.jsx(x,{})}),e.jsx(b,{groups:[[{label:"Edit details",icon:e.jsx(t,{name:"pencil"}),onSelect:o},{label:"Resend invitation",icon:e.jsx(t,{name:"mail"}),onSelect:o},{label:"Copy link",icon:e.jsx(t,{name:"link"}),onSelect:o,disabled:!0}]]})]})},ae=[{value:"active",label:"Active"},{value:"invited",label:"Invited"},{value:"disabled",label:"Disabled"},{value:"locked",label:"Locked"}],u={play:v("Status"),render:function(){const[a,s]=f.useState(["active"]);return e.jsxs(n,{variant:"quick-filter",children:[e.jsx(i,{asChild:!0,children:e.jsx(g,{variant:"outline",leftIcon:e.jsx(t,{name:"check-circle"}),children:"Status"})}),e.jsx(oe,{heading:"Filter by status",options:ae,value:a,onValueChange:s})]})}},ie=["Acme Corp","Finserve Bank","Helios Energy","Lighthouse Health","Northwind Retail","Orbit Logistics","Summit Insurance"].map(r=>({value:r.toLowerCase().replace(/\s+/g,"-"),label:r})),h={play:v("Organization"),render:function(){const[a,s]=f.useState([]);return e.jsxs(n,{variant:"quick-filter",children:[e.jsx(i,{asChild:!0,children:e.jsx(g,{variant:"outline",leftIcon:e.jsx(t,{name:"building-2"}),children:"Organization"})}),e.jsx(oe,{heading:"Filter by organization",options:ie,value:a,onValueChange:s,searchable:!0})]})}};var y,S,j,P,w;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <h4 className="mdt-m-0 mdt-text-sm mdt-font-medium">Dimensions</h4>
          <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
}`,...(j=(S=l.parameters)==null?void 0:S.docs)==null?void 0:j.source},description:{story:"The empty card: the overlay surface, 16 inside, 288 wide unless told otherwise - anything goes in it.",...(w=(P=l.parameters)==null?void 0:P.docs)==null?void 0:w.description}}};var k,T,C,N,I;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-start mdt-gap-6">
      <div className="mdt-flex mdt-w-56 mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-neutral-30 mdt-bg-card mdt-p-4">
        <h4 className="mdt-m-0 mdt-text-sm mdt-font-medium">A card</h4>
        <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground">--mdt-card, with its edge.</p>
      </div>
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">The popover</Button>
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={8}>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <h4 className="mdt-m-0 mdt-text-sm mdt-font-medium">The overlay surface</h4>
            <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground">
              --mdt-popover: white in light, neutral-150 in dark, the hairline visible on it.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
}`,...(C=(T=d.parameters)==null?void 0:T.docs)==null?void 0:C.source},description:{story:`The surface itself: the popover's ground beside a card, so the step reads in both themes. In dark the card is the
page colour with an edge (cards are flat), and the popover steps DOWN to neutral-150 with the hairline on it.`,...(I=(N=d.parameters)==null?void 0:N.docs)==null?void 0:I.description}}};var O,E,D,M,R;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
  play: openWith('Row actions'),
  render: () => <Popover variant="action-menu">
      <PopoverTrigger asChild>
        <MoreButton />
      </PopoverTrigger>
      <PopoverActionMenu groups={[[{
      label: 'Edit details',
      icon: <Icon name="pencil" />,
      onSelect: noop
    }, {
      label: 'Disable user',
      icon: <Icon name="user-x" />,
      onSelect: noop
    }]]} danger={{
      label: 'Delete user',
      icon: <Icon name="trash-2" />,
      onSelect: noop
    }} />
    </Popover>
}`,...(D=(E=c.parameters)==null?void 0:E.docs)==null?void 0:D.source},description:{story:`The action menu as the Users table's row draws it: Edit details · Disable user, then the one red action - Delete user
- last, under its divider.`,...(R=(M=c.parameters)==null?void 0:M.docs)==null?void 0:R.description}}};var A,B,F,V,Q;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  play: openWith('Row actions'),
  render: () => <Popover variant="action-menu">
      <PopoverTrigger asChild>
        <MoreButton />
      </PopoverTrigger>
      <PopoverActionMenu groups={[[{
      label: 'Edit details',
      icon: <Icon name="pencil" />,
      onSelect: noop
    }, {
      label: 'Duplicate',
      icon: <Icon name="copy" />,
      onSelect: noop
    }], [{
      label: 'Export as CSV',
      icon: <Icon name="download" />,
      onSelect: noop
    }, {
      label: 'Copy link',
      icon: <Icon name="link" />,
      onSelect: noop
    }]]} danger={{
      label: 'Delete team',
      icon: <Icon name="trash-2" />,
      onSelect: noop
    }} />
    </Popover>
}`,...(F=(B=m.parameters)==null?void 0:B.docs)==null?void 0:F.source},description:{story:`More than one divider: each group is split from the next where the page wants it. The red action's divider is the
one that is never left out.`,...(Q=(V=m.parameters)==null?void 0:V.docs)==null?void 0:Q.description}}};var z,W,_,q,L;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  play: openWith('Row actions'),
  render: () => <Popover variant="action-menu">
      <PopoverTrigger asChild>
        <MoreButton />
      </PopoverTrigger>
      <PopoverActionMenu groups={[[{
      label: 'Edit details',
      icon: <Icon name="pencil" />,
      onSelect: noop
    }, {
      label: 'Resend invitation',
      icon: <Icon name="mail" />,
      onSelect: noop
    }, {
      label: 'Copy link',
      icon: <Icon name="link" />,
      onSelect: noop,
      disabled: true
    }]]} />
    </Popover>
}`,...(_=(W=p.parameters)==null?void 0:W.docs)==null?void 0:_.source},description:{story:"No red action: no divider is owed - one group draws none.",...(L=(q=p.parameters)==null?void 0:q.docs)==null?void 0:L.description}}};var G,U,K,H,Y;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  play: openWith('Status'),
  render: function QuickFilterStory() {
    const [value, setValue] = useState<string[]>(['active']);
    return <Popover variant="quick-filter">
        <PopoverTrigger asChild>
          <Button variant="outline" leftIcon={<Icon name="check-circle" />}>
            Status
          </Button>
        </PopoverTrigger>
        <PopoverQuickFilter heading="Filter by status" options={STATUS} value={value} onValueChange={setValue} />
      </Popover>;
  }
}`,...(K=(U=u.parameters)==null?void 0:U.docs)==null?void 0:K.source},description:{story:`The quick filter as the table toolbar draws it: the heading naming what it filters, a checkbox per value, several at
once - a tick does not close it.`,...(Y=(H=u.parameters)==null?void 0:H.docs)==null?void 0:Y.description}}};var J,X,Z,$,ee;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
  play: openWith('Organization'),
  render: function QuickFilterSearchableStory() {
    const [value, setValue] = useState<string[]>([]);
    return <Popover variant="quick-filter">
        <PopoverTrigger asChild>
          <Button variant="outline" leftIcon={<Icon name="building-2" />}>
            Organization
          </Button>
        </PopoverTrigger>
        <PopoverQuickFilter heading="Filter by organization" options={ORGS} value={value} onValueChange={setValue} searchable />
      </Popover>;
  }
}`,...(Z=(X=h.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:"With a search over the values, focused on open (a long list - organizations). Keys typed in the box stay in it.",...(ee=($=h.parameters)==null?void 0:$.docs)==null?void 0:ee.description}}};const Ve=["EmptyCard","TheSurface","ActionMenu","ActionMenuGroups","ActionMenuNoDanger","QuickFilter","QuickFilterSearchable"];export{c as ActionMenu,m as ActionMenuGroups,p as ActionMenuNoDanger,l as EmptyCard,u as QuickFilter,h as QuickFilterSearchable,d as TheSurface,Ve as __namedExportsOrder,Fe as default};
//# sourceMappingURL=Popover.stories-BLs5BViT.js.map
