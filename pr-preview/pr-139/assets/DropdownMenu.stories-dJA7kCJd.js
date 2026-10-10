import{j as e,r as Y}from"./iframe-D_vKAA_A.js";import{D as o,a as m,b as l,c as n,d as F,e as G,f as J}from"./DropdownMenu-FB0ansUf.js";import{I as t}from"./Icon-Ba89DlHN.js";import"./preload-helper-Dp1pzeXC.js";import"./index-KXcojkRA.js";import"./index-Bav5G4C9.js";import"./index-BaK4qz__.js";import"./index-C1YXQEf3.js";import"./index-C_DcTTJW.js";import"./index-ByiQLlil.js";import"./index-CNnruunU.js";import"./index-BSbBB2Km.js";import"./index-Dm6XllQy.js";import"./index-DYF-_nNE.js";import"./Combination-CiEOu-rE.js";import"./index-C92NAdW-.js";import"./index-BnD6GeKT.js";import"./index-BMinK--b.js";import"./index-PdXwCgyT.js";import"./index-D0JfoKtM.js";import"./index-CcRgbaMz.js";import"./index-ChEho857.js";const{userEvent:Q,within:V}=__STORYBOOK_MODULE_TEST__,ge={title:"New Components/DropdownMenu",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"The Users row menu, at the root: a 10-cornered box with 6 inside, items 34 tall at 13/500 with corners 7, a destructive item that stays red under its wash. Every action menu, the Sort menu, the Columns panel and the quick-filter menu are this one part."}}}},u=async({canvasElement:w})=>{await Q.click(V(w).getByRole("button",{name:"Row actions"}))},h=Y.forwardRef(function(D,x){return e.jsx("button",{ref:x,type:"button","aria-label":"Row actions",...D,className:"mdt-inline-flex mdt-h-7 mdt-w-7 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-faint hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 data-[state=open]:mdt-bg-neutral-20 data-[state=open]:mdt-text-neutral-90",children:e.jsx(t,{name:"more-vertical",size:16})})}),a={play:u,render:()=>e.jsxs(o,{children:[e.jsx(m,{asChild:!0,children:e.jsx(h,{})}),e.jsxs(l,{align:"start",className:"mdt-w-48",children:[e.jsxs(n,{children:[e.jsx(t,{name:"pencil",size:16}),"Edit details"]}),e.jsxs(n,{children:[e.jsx(t,{name:"toggle-left",size:16}),"Disable user"]}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"trash-2",size:16}),"Delete user"]})]})]})},d={play:u,render:()=>e.jsxs(o,{children:[e.jsx(m,{asChild:!0,children:e.jsx(h,{})}),e.jsxs(l,{align:"start",className:"mdt-w-48",children:[e.jsxs(n,{children:[e.jsx(t,{name:"pencil",size:16}),"Edit team details"]}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"trash-2",size:16}),"Delete team"]}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"x-circle",size:16}),"Revoke access"]})]})]})},i={play:u,render:()=>e.jsxs(o,{children:[e.jsx(m,{asChild:!0,children:e.jsx(h,{})}),e.jsxs(l,{align:"start",className:"mdt-w-[220px]",children:[e.jsx(F,{children:"Sort by"}),e.jsxs(n,{children:["Name",e.jsx("span",{className:"mdt-ml-auto mdt-text-sm","aria-label":"ascending",children:"↑"})]}),e.jsx(n,{className:"mdt-text-neutral-90",children:"Status"}),e.jsx(n,{className:"mdt-text-neutral-90",children:"Last active"}),e.jsx(G,{}),e.jsx(n,{className:"mdt-text-neutral-50",children:"Clear sort"})]})]})},c={play:u,render:function(){const[D,x]=Y.useState(["Active"]),q=r=>{x(s=>s.includes(r)?s.filter(K=>K!==r):[...s,r])};return e.jsxs(o,{children:[e.jsx(m,{asChild:!0,children:e.jsx(h,{})}),e.jsx(l,{align:"start",className:"mdt-w-48",children:["Active","Inactive","Invited","Suspended"].map(r=>e.jsx(J,{checked:D.includes(r),onCheckedChange:()=>{q(r)},onSelect:s=>{s.preventDefault()},children:r},r))})]})}},p={play:u,render:()=>e.jsxs(o,{children:[e.jsx(m,{asChild:!0,children:e.jsx(h,{})}),e.jsxs(l,{align:"start",className:"mdt-w-48",children:[e.jsxs(n,{disabled:!0,children:[e.jsx(t,{name:"lock",size:16}),"Read-only"]}),e.jsxs(n,{children:[e.jsx(t,{name:"copy",size:16}),"Duplicate"]})]})]})};var M,g,j,v,I;a.parameters={...a.parameters,docs:{...(M=a.parameters)==null?void 0:M.docs,source:{originalSource:`{
  play: openTheMenu,
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-w-48">
        <DropdownMenuItem>
          <Icon name="pencil" size={16} />
          Edit details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="toggle-left" size={16} />
          Disable user
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Icon name="trash-2" size={16} />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
}`,...(j=(g=a.parameters)==null?void 0:g.docs)==null?void 0:j.source},description:{story:"The row menu as the Users table draws it: Edit details · Disable user · Delete user, 192 wide.",...(I=(v=a.parameters)==null?void 0:v.docs)==null?void 0:I.description}}};var y,C,b,T,k;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  play: openTheMenu,
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-w-48">
        <DropdownMenuItem>
          <Icon name="pencil" size={16} />
          Edit team details
        </DropdownMenuItem>
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
}`,...(b=(C=d.parameters)==null?void 0:C.docs)==null?void 0:b.source},description:{story:`A destructive item: red-60 text and glyph at rest; under the pointer the danger wash, and the text and
glyph STAY red. Hover the last rows.`,...(k=(T=d.parameters)==null?void 0:T.docs)==null?void 0:k.description}}};var S,f,N,R,z;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(N=(f=i.parameters)==null?void 0:f.docs)==null?void 0:N.source},description:{story:`The Sort menu's shape: a SORT BY heading at 11/600 in the muted grey, one row per field with the active
one carrying its arrow, a hairline, and Clear sort in the muted grey. 220 wide.`,...(z=(R=i.parameters)==null?void 0:R.docs)==null?void 0:z.description}}};var A,E,B,_,L;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(B=(E=c.parameters)==null?void 0:E.docs)==null?void 0:B.source},description:{story:"The quick-filter menu's shape: a checkbox per row, several at once.",...(L=(_=c.parameters)==null?void 0:_.docs)==null?void 0:L.description}}};var O,W,H,P,U;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  play: openTheMenu,
  render: () => <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <RowActionsButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mdt-w-48">
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
}`,...(H=(W=p.parameters)==null?void 0:W.docs)==null?void 0:H.source},description:{story:"A disabled row: half opacity, no pointer.",...(U=(P=p.parameters)==null?void 0:P.docs)==null?void 0:U.description}}};const je=["TheMenu","Destructive","WithAHeading","WithCheckboxes","Disabled"];export{d as Destructive,p as Disabled,a as TheMenu,i as WithAHeading,c as WithCheckboxes,je as __namedExportsOrder,ge as default};
//# sourceMappingURL=DropdownMenu.stories-dJA7kCJd.js.map
