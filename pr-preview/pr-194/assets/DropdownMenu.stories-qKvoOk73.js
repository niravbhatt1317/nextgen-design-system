import{j as e,r as v}from"./iframe-BPNIX2vJ.js";import{D as o,a as s,b as a,d as n,c as I,e as oe,f as ae,g as ie,h as de}from"./DropdownMenu-CvCvCa7Z.js";import{I as t}from"./Icon-BLDIqfzI.js";import"./preload-helper-Dp1pzeXC.js";import"./index-C9th4aOc.js";import"./index-NbxAkC4T.js";import"./index-Crf4kKva.js";import"./index-D_RZid9h.js";import"./index-NgIyBmQT.js";import"./index-DcPT9S5_.js";import"./index-CBr6hXeD.js";import"./index-C4ixBugh.js";import"./index-DaxV1mri.js";import"./index-B_jtxi_5.js";import"./index-s_DBOVAB.js";import"./index-BLt0VlOS.js";import"./index-CfbJRTEW.js";import"./index-DJtW34v4.js";import"./index-B3OX0ovT.js";import"./index-9lSDbwQs.js";import"./index-CcRgbaMz.js";import"./picked-row-BGnBNViw.js";import"./index-ChEho857.js";const{userEvent:ce,within:le}=__STORYBOOK_MODULE_TEST__,Ee={title:"New Components/DropdownMenu",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"The Users row menu, at the root: a 10-cornered box with 6 inside, items 34 tall at 13/500 with corners 7, a destructive item that stays red under its wash. Every action menu, the Sort menu, the Columns panel and the quick-filter menu are this one part."}}}},i=async({canvasElement:j})=>{await ce.click(le(j).getByRole("button",{name:"Row actions"}))},d=v.forwardRef(function(c,l){return e.jsx("button",{ref:l,type:"button","aria-label":"Row actions",...c,className:"mdt-inline-flex mdt-h-7 mdt-w-7 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-faint hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 data-[state=open]:mdt-bg-neutral-20 data-[state=open]:mdt-text-neutral-90",children:e.jsx(t,{name:"more-vertical",size:16})})}),m={play:i,render:()=>e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(d,{})}),e.jsxs(a,{align:"start",className:"mdt-min-w-56",children:[e.jsxs(n,{children:[e.jsx(t,{name:"pencil",size:16}),"Edit details"]}),e.jsxs(n,{children:[e.jsx(t,{name:"toggle-left",size:16}),"Disable user"]}),e.jsx(I,{}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"trash-2",size:16}),"Delete user"]})]})]})},h={play:i,render:()=>e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(d,{})}),e.jsxs(a,{align:"start",className:"mdt-min-w-56",children:[e.jsxs(n,{children:[e.jsx(t,{name:"pencil",size:16}),"Edit team details"]}),e.jsx(I,{}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"trash-2",size:16}),"Delete team"]}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"x-circle",size:16}),"Revoke access"]})]})]})},w={play:i,render:()=>e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(d,{})}),e.jsxs(a,{align:"start",className:"mdt-min-w-56",children:[e.jsxs(n,{children:[e.jsx(t,{name:"activity",size:16}),"Diagnose"]}),e.jsxs(n,{children:[e.jsx(t,{name:"power",size:16}),"Restart or stop collector"]}),e.jsxs(n,{children:[e.jsx(t,{name:"pause-circle",size:16}),"Hold work on every module it runs"]}),e.jsx(I,{}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"trash-2",size:16}),"Retire collector"]})]})]})},D={play:i,render:()=>e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(d,{})}),e.jsxs(a,{align:"start",className:"mdt-w-[220px]",children:[e.jsx(oe,{children:"Sort by"}),e.jsxs(n,{children:["Name",e.jsx("span",{className:"mdt-ml-auto mdt-text-sm","aria-label":"ascending",children:"↑"})]}),e.jsx(n,{className:"mdt-text-neutral-90",children:"Status"}),e.jsx(n,{className:"mdt-text-neutral-90",children:"Last active"}),e.jsx(I,{}),e.jsx(n,{className:"mdt-text-neutral-50",children:"Clear sort"})]})]})},M={play:i,render:function(){const[c,l]=v.useState(["Active"]),p=r=>{l(u=>u.includes(r)?u.filter(se=>se!==r):[...u,r])};return e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(d,{})}),e.jsx(a,{align:"start",className:"mdt-w-48",children:["Active","Inactive","Invited","Suspended"].map(r=>e.jsx(ae,{checked:c.includes(r),onCheckedChange:()=>{p(r)},onSelect:u=>{u.preventDefault()},children:r},r))})]})}},x={play:i,render:function(){const[c,l]=v.useState("Users");return e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(d,{})}),e.jsxs(a,{align:"start",className:"mdt-w-48",children:[e.jsx(oe,{children:"Switch to"}),e.jsx(ie,{value:c,onValueChange:l,children:["Users","Teams","Roles","Access profiles"].map(p=>e.jsx(de,{value:p,children:p},p))})]})]})}},g={play:i,render:()=>e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(d,{})}),e.jsxs(a,{align:"start",className:"mdt-min-w-56",children:[e.jsxs(n,{disabled:!0,children:[e.jsx(t,{name:"lock",size:16}),"Read-only"]}),e.jsxs(n,{children:[e.jsx(t,{name:"copy",size:16}),"Duplicate"]})]})]})};var y,C,k,b,f;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  play: openTheMenu,
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-min-w-56">
        <DropdownMenuItem>
          <Icon name="pencil" size={16} />
          Edit details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="toggle-left" size={16} />
          Disable user
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon name="trash-2" size={16} />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...(k=(C=m.parameters)==null?void 0:C.docs)==null?void 0:k.source},description:{story:`The row menu as the Users table draws it: Edit details · Disable user, a hairline, then Delete user in red.
Every ⋯ action menu follows it (Pranjal, 2026-10-14 and 2026-10-27): an icon on every item, never a "…" on a
label, the destructive item last and red after a divider, and the menu at least 224 wide - \`mdt-min-w-56\`, a
floor and not a width, so a longer item widens it.`,...(f=(b=m.parameters)==null?void 0:b.docs)==null?void 0:f.description}}};var R,S,T,N,z;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`{
  play: openTheMenu,
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-min-w-56">
        <DropdownMenuItem>
          <Icon name="pencil" size={16} />
          Edit team details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon name="trash-2" size={16} />
          Delete team
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Icon name="x-circle" size={16} />
          Revoke access
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...(T=(S=h.parameters)==null?void 0:S.docs)==null?void 0:T.source},description:{story:`A destructive item: red-60 text and glyph at rest; under the pointer the danger wash, and the text and
glyph STAY red. Hover the last rows.`,...(z=(N=h.parameters)==null?void 0:N.docs)==null?void 0:z.description}}};var A,E,B,W,L;w.parameters={...w.parameters,docs:{...(A=w.parameters)==null?void 0:A.docs,source:{originalSource:`{
  play: openTheMenu,
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-min-w-56">
        <DropdownMenuItem>
          <Icon name="activity" size={16} />
          Diagnose
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="power" size={16} />
          Restart or stop collector
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="pause-circle" size={16} />
          Hold work on every module it runs
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon name="trash-2" size={16} />
          Retire collector
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...(B=(E=w.parameters)==null?void 0:E.docs)==null?void 0:B.source},description:{story:`224 is a floor, not a width: an item longer than the floor widens the menu instead of being cut off or touching
its edge (Pranjal, 2026-10-09 and 2026-10-27, on a fleet row menu: "increase the width by a little bit").`,...(L=(W=w.parameters)==null?void 0:W.docs)==null?void 0:L.description}}};var _,O,P,U,H;D.parameters={...D.parameters,docs:{...(_=D.parameters)==null?void 0:_.docs,source:{originalSource:`{
  play: openTheMenu,
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-w-[220px]">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuItem>
          Name
          <span className="mdt-ml-auto mdt-text-sm" aria-label="ascending">
            {'↑'}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="mdt-text-neutral-90">Status</DropdownMenuItem>
        <DropdownMenuItem className="mdt-text-neutral-90">Last active</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="mdt-text-neutral-50">Clear sort</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...(P=(O=D.parameters)==null?void 0:O.docs)==null?void 0:P.source},description:{story:`The Sort menu's shape: a SORT BY heading at 11/600 in the muted grey, one row per field with the active
one carrying its arrow, a hairline, and Clear sort in the muted grey. 220 wide.`,...(H=(U=D.parameters)==null?void 0:U.docs)==null?void 0:H.description}}};var G,q,Y,V,K;M.parameters={...M.parameters,docs:{...(G=M.parameters)==null?void 0:G.docs,source:{originalSource:`{
  play: openTheMenu,
  render: function WithCheckboxesStory() {
    const [picked, setPicked] = useState<string[]>(['Active']);
    const toggle = (v: string) => {
      setPicked(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
    };
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <RowActionsButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mdt-w-48">
          {['Active', 'Inactive', 'Invited', 'Suspended'].map(v => <DropdownMenuCheckboxItem key={v} checked={picked.includes(v)} onCheckedChange={() => {
          toggle(v);
        }} onSelect={e => {
          e.preventDefault();
        }}>
              {v}
            </DropdownMenuCheckboxItem>)}
        </DropdownMenuContent>
      </DropdownMenu>;
  }
}`,...(Y=(q=M.parameters)==null?void 0:q.docs)==null?void 0:Y.source},description:{story:`Several at once. A ticked row sits on the pale blue-10 ground with its tick on the RIGHT in the reading ink; the
row under the pointer takes only the grey ground and no tick (Pranjal, 2026-10-21: every selection looks the same).
The quick-filter menu swaps the tick for a checkbox square and keeps the pale ground.`,...(K=(V=M.parameters)==null?void 0:V.docs)==null?void 0:K.description}}};var F,J,Q,X,Z;x.parameters={...x.parameters,docs:{...(F=x.parameters)==null?void 0:F.docs,source:{originalSource:`{
  play: openTheMenu,
  render: function WithRadioItemsStory() {
    const [module, setModule] = useState('Users');
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <RowActionsButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mdt-w-48">
          <DropdownMenuLabel>Switch to</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={module} onValueChange={setModule}>
            {['Users', 'Teams', 'Roles', 'Access profiles'].map(v => <DropdownMenuRadioItem key={v} value={v}>
                {v}
              </DropdownMenuRadioItem>)}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>;
  }
}`,...(Q=(J=x.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:`One of several, as a module switcher picks one: the chosen row looks exactly like a ticked checkbox row - the pale
ground, the tick on the right (Pranjal, 2026-10-21; a dot on the left until then).`,...(Z=(X=x.parameters)==null?void 0:X.docs)==null?void 0:Z.description}}};var $,ee,ne,te,re;g.parameters={...g.parameters,docs:{...($=g.parameters)==null?void 0:$.docs,source:{originalSource:`{
  play: openTheMenu,
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-min-w-56">
        <DropdownMenuItem disabled>
          <Icon name="lock" size={16} />
          Read-only
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="copy" size={16} />
          Duplicate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...(ne=(ee=g.parameters)==null?void 0:ee.docs)==null?void 0:ne.source},description:{story:"A disabled row: half opacity, no pointer.",...(re=(te=g.parameters)==null?void 0:te.docs)==null?void 0:re.description}}};const Be=["TheMenu","Destructive","ALongItemWidensIt","WithAHeading","WithCheckboxes","WithRadioItems","Disabled"];export{w as ALongItemWidensIt,h as Destructive,g as Disabled,m as TheMenu,D as WithAHeading,M as WithCheckboxes,x as WithRadioItems,Be as __namedExportsOrder,Ee as default};
//# sourceMappingURL=DropdownMenu.stories-qKvoOk73.js.map
