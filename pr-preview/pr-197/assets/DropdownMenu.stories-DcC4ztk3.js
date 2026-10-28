import{j as e,r as j}from"./iframe-CH2_8cO_.js";import{D as o,a as s,b as a,d as n,e as X,c as $,f as ee,g as ne,h as te}from"./DropdownMenu-ruU03gWY.js";import{I as t}from"./Icon-BCOTw1cv.js";import"./preload-helper-Dp1pzeXC.js";import"./index-x3iD3wJO.js";import"./index-DB7yGzIL.js";import"./index-Dycvs6x_.js";import"./index-Bze5njmV.js";import"./index-B3BmlGN0.js";import"./index-CDp1pyu9.js";import"./index-BwNg4B3B.js";import"./index-DgyivPUh.js";import"./index-CEyOv_Z1.js";import"./index-Dq47sYjr.js";import"./index-CIHvRBos.js";import"./index-C6K-ybRl.js";import"./index-BdpCxT-r.js";import"./index-Cm6kGBZx.js";import"./index-CWsdyKc7.js";import"./index-DZUyxn9Z.js";import"./index-CcRgbaMz.js";import"./picked-row-BGnBNViw.js";import"./index-ChEho857.js";const{userEvent:re,within:oe}=__STORYBOOK_MODULE_TEST__,Se={title:"New Components/DropdownMenu",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"The Users row menu, at the root: a 10-cornered box with 6 inside, items 34 tall at 13/500 with corners 7, a destructive item that stays red under its wash. Every action menu, the Sort menu, the Columns panel and the quick-filter menu are this one part."}}}},d=async({canvasElement:g})=>{await re.click(oe(g).getByRole("button",{name:"Row actions"}))},i=j.forwardRef(function(c,l){return e.jsx("button",{ref:l,type:"button","aria-label":"Row actions",...c,className:"mdt-inline-flex mdt-h-7 mdt-w-7 mdt-items-center mdt-justify-center mdt-rounded-lg mdt-border-0 mdt-bg-transparent mdt-p-0 mdt-text-faint hover:mdt-bg-neutral-20 hover:mdt-text-neutral-90 data-[state=open]:mdt-bg-neutral-20 data-[state=open]:mdt-text-neutral-90",children:e.jsx(t,{name:"more-vertical",size:16})})}),m={play:d,render:()=>e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(i,{})}),e.jsxs(a,{align:"start",className:"mdt-w-48",children:[e.jsxs(n,{children:[e.jsx(t,{name:"pencil",size:16}),"Edit details"]}),e.jsxs(n,{children:[e.jsx(t,{name:"toggle-left",size:16}),"Disable user"]}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"trash-2",size:16}),"Delete user"]})]})]})},h={play:d,render:()=>e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(i,{})}),e.jsxs(a,{align:"start",className:"mdt-w-48",children:[e.jsxs(n,{children:[e.jsx(t,{name:"pencil",size:16}),"Edit team details"]}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"trash-2",size:16}),"Delete team"]}),e.jsxs(n,{variant:"destructive",children:[e.jsx(t,{name:"x-circle",size:16}),"Revoke access"]})]})]})},w={play:d,render:()=>e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(i,{})}),e.jsxs(a,{align:"start",className:"mdt-w-[220px]",children:[e.jsx(X,{children:"Sort by"}),e.jsxs(n,{children:["Name",e.jsx("span",{className:"mdt-ml-auto mdt-text-sm","aria-label":"ascending",children:"↑"})]}),e.jsx(n,{className:"mdt-text-neutral-90",children:"Status"}),e.jsx(n,{className:"mdt-text-neutral-90",children:"Last active"}),e.jsx($,{}),e.jsx(n,{className:"mdt-text-neutral-50",children:"Clear sort"})]})]})},D={play:d,render:function(){const[c,l]=j.useState(["Active"]),p=r=>{l(u=>u.includes(r)?u.filter(Z=>Z!==r):[...u,r])};return e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(i,{})}),e.jsx(a,{align:"start",className:"mdt-w-48",children:["Active","Inactive","Invited","Suspended"].map(r=>e.jsx(ee,{checked:c.includes(r),onCheckedChange:()=>{p(r)},onSelect:u=>{u.preventDefault()},children:r},r))})]})}},M={play:d,render:function(){const[c,l]=j.useState("Users");return e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(i,{})}),e.jsxs(a,{align:"start",className:"mdt-w-48",children:[e.jsx(X,{children:"Switch to"}),e.jsx(ne,{value:c,onValueChange:l,children:["Users","Teams","Roles","Access profiles"].map(p=>e.jsx(te,{value:p,children:p},p))})]})]})}},x={play:d,render:()=>e.jsxs(o,{children:[e.jsx(s,{asChild:!0,children:e.jsx(i,{})}),e.jsxs(a,{align:"start",className:"mdt-w-48",children:[e.jsxs(n,{disabled:!0,children:[e.jsx(t,{name:"lock",size:16}),"Read-only"]}),e.jsxs(n,{children:[e.jsx(t,{name:"copy",size:16}),"Duplicate"]})]})]})};var v,I,y,C,k;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(y=(I=m.parameters)==null?void 0:I.docs)==null?void 0:y.source},description:{story:"The row menu as the Users table draws it: Edit details · Disable user · Delete user, 192 wide.",...(k=(C=m.parameters)==null?void 0:C.docs)==null?void 0:k.description}}};var b,T,S,R,f;h.parameters={...h.parameters,docs:{...(b=h.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(S=(T=h.parameters)==null?void 0:T.docs)==null?void 0:S.source},description:{story:`A destructive item: red-60 text and glyph at rest; under the pointer the danger wash, and the text and
glyph STAY red. Hover the last rows.`,...(f=(R=h.parameters)==null?void 0:R.docs)==null?void 0:f.description}}};var N,A,z,E,B;w.parameters={...w.parameters,docs:{...(N=w.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(z=(A=w.parameters)==null?void 0:A.docs)==null?void 0:z.source},description:{story:`The Sort menu's shape: a SORT BY heading at 11/600 in the muted grey, one row per field with the active
one carrying its arrow, a hairline, and Clear sort in the muted grey. 220 wide.`,...(B=(E=w.parameters)==null?void 0:E.docs)==null?void 0:B.description}}};var W,L,_,O,U;D.parameters={...D.parameters,docs:{...(W=D.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(_=(L=D.parameters)==null?void 0:L.docs)==null?void 0:_.source},description:{story:`Several at once. A ticked row sits on the pale blue-10 ground with its tick on the RIGHT in the reading ink; the
row under the pointer takes only the grey ground and no tick (Pranjal, 2026-10-21: every selection looks the same).
The quick-filter menu swaps the tick for a checkbox square and keeps the pale ground.`,...(U=(O=D.parameters)==null?void 0:O.docs)==null?void 0:U.description}}};var P,G,H,q,Y;M.parameters={...M.parameters,docs:{...(P=M.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(H=(G=M.parameters)==null?void 0:G.docs)==null?void 0:H.source},description:{story:`One of several, as a module switcher picks one: the chosen row looks exactly like a ticked checkbox row - the pale
ground, the tick on the right (Pranjal, 2026-10-21; a dot on the left until then).`,...(Y=(q=M.parameters)==null?void 0:q.docs)==null?void 0:Y.description}}};var V,K,F,J,Q;x.parameters={...x.parameters,docs:{...(V=x.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(F=(K=x.parameters)==null?void 0:K.docs)==null?void 0:F.source},description:{story:"A disabled row: half opacity, no pointer.",...(Q=(J=x.parameters)==null?void 0:J.docs)==null?void 0:Q.description}}};const Re=["TheMenu","Destructive","WithAHeading","WithCheckboxes","WithRadioItems","Disabled"];export{h as Destructive,x as Disabled,m as TheMenu,w as WithAHeading,D as WithCheckboxes,M as WithRadioItems,Re as __namedExportsOrder,Se as default};
//# sourceMappingURL=DropdownMenu.stories-DcC4ztk3.js.map
