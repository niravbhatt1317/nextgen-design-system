import{j as e,r as d}from"./iframe-BZKVIHi7.js";import{A as n}from"./ActionCard-BL9p6Ek2.js";import{I as t}from"./Icon-BF6zgblk.js";import{M as p}from"./Switch-BQInliJu.js";import{B as k}from"./Badge-bZPBZz1T.js";import{A as J}from"./AvatarStack-DD1gnf0z.js";import{A as w}from"./Avatar-CjjK3YGj.js";import{B as x}from"./Button-DEouIwSn.js";import{D as Q,a as X,b as Z,c as ee,d as te}from"./Dialog-BU5T3E-P.js";import{S as ne,a as ae,b as oe,c as ie,d as re}from"./Sheet-CXFihFHK.js";import{D as se,a as ce,b as de,c as le,d as me}from"./DropdownMenu-CRIq2BTP.js";import{I as pe}from"./Input-83m65qbu.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./icon-at-drawn-size-DJS4bc5D.js";import"./Tooltip-B2oZPq9d.js";import"./index-DghMHQVO.js";import"./index-BX2BM9Iz.js";import"./index-BCs0fDqA.js";import"./index-CUDQRJH4.js";import"./index-B_4Iad7J.js";import"./index-JXsg6yrZ.js";import"./index-YCqdBqwi.js";import"./index-Lfb6aHOa.js";import"./index-CSpS5iqM.js";import"./index-C-y5PaXt.js";import"./index-CUxWVG-Y.js";import"./index-DEyVE27u.js";import"./index-CqVSmy7M.js";import"./index-CG8IlN6G.js";import"./index-D-eIWsqZ.js";import"./index-Cyax9JJj.js";import"./index-koTU_5Be.js";import"./index-Bp_Jmt9l.js";import"./scroll-fade-DWC0drtQ.js";import"./index-vEJ-XXbM.js";import"./index-5ekqYCLx.js";import"./index-ZFJINkSu.js";const{expect:he,fn:v,userEvent:D,within:ue}=__STORYBOOK_MODULE_TEST__,y=({children:r})=>e.jsx("div",{style:{display:"grid",gap:10,width:760},children:r}),ge=[{label:"Edit setup",icon:"pencil"},{label:"Test connection",icon:"zap"},{label:"Remove connection…",icon:"trash-2",destructive:!0,divided:!0}],l=({name:r,items:i=ge})=>e.jsxs(se,{children:[e.jsx(ce,{asChild:!0,children:e.jsx(x,{iconOnly:!0,variant:"ghost",size:"sm",ariaLabel:`More for ${r}`,leftIcon:e.jsx(t,{name:"more-horizontal"})})}),e.jsx(de,{align:"end",children:i.map(o=>e.jsxs(d.Fragment,{children:[o.divided&&e.jsx(le,{}),e.jsxs(me,{variant:o.destructive?"destructive":"default",...o.onSelect?{onSelect:o.onSelect}:{},children:[e.jsx(t,{name:o.icon,size:16}),o.label]})]},o.label))})]}),tt={title:"New Components/ActionCard",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"One item on a settings page, as a row: a 36px tile, a title with its badge, a line under it, and controls on the right. Three faces: `default`, the dashed blue `add`, and `edit` for an inline field. Give it `onClick` or `href` and the whole card is clickable - open a modal, a drawer, an inline edit, change the content, or go somewhere. `clickable={false}` holds it still. The switch, buttons and menu inside keep working on their own and never trigger the card."}}},argTypes:{variant:{control:"inline-radio",options:["default","add","edit"]},title:{control:"text"},description:{control:"text"},dim:{control:"boolean",description:"Fade the tile: retired or switched off"},clickable:{control:"boolean",description:"Respond to a click when onClick or href is set"},href:{control:"text",description:"Make the card a link"},icon:{control:!1},badge:{control:!1},actions:{control:!1},menu:{control:!1}},args:{icon:e.jsx(t,{name:"globe"}),title:"Use your own domain",description:"Serve the console and every portal from an address like support.yourcompany.com",onClick:v()}},C={render:r=>e.jsx(y,{children:e.jsx(n,{...r})})},b={parameters:{controls:{disable:!0}},render:()=>e.jsxs(y,{children:[e.jsx(n,{variant:"add",icon:e.jsx(t,{name:"globe"}),title:"Use your own domain",description:"Serve the console and every portal from an address like support.yourcompany.com",onClick:v()}),e.jsx(n,{variant:"add",icon:e.jsx(t,{name:"plus"}),title:"Add domain",onClick:v()}),e.jsx(n,{icon:e.jsx(t,{name:"globe"}),title:"northbridge.io",actions:e.jsx(p,{defaultChecked:!0,"aria-label":"Enable northbridge.io"}),menu:e.jsx(l,{name:"northbridge.io",items:[{label:"Edit",icon:"pencil"},{label:"Delete",icon:"trash-2",destructive:!0}]})}),e.jsx(n,{icon:e.jsx(t,{name:"lock"}),title:"Require SSO",badge:e.jsx(k,{size:"sm",children:"Off"}),description:"Members can sign in with Acme Corp SSO, Google Workspace, or with email and a one-time code",actions:e.jsx(p,{"aria-label":"Require SSO"})}),e.jsx(n,{variant:"add",icon:e.jsx(t,{name:"plus"}),title:"Add connection",description:"Let members sign in with the identity provider they already use",onClick:v(),actions:e.jsxs(J,{max:3,size:"sm",children:[e.jsx(w,{name:"Acme Corp"}),e.jsx(w,{name:"Microsoft"}),e.jsx(w,{name:"Google"}),e.jsx(w,{name:"Okta"})]})}),e.jsx(n,{icon:e.jsx(t,{name:"shield"}),title:"Acme Corp SSO",badge:e.jsx(k,{tone:"success",size:"sm",children:"Live"}),description:["SAML 2.0","2,104 sign-ins in 30 days"],actions:e.jsx(p,{defaultChecked:!0,"aria-label":"Show Acme Corp SSO on the sign-in screen"}),menu:e.jsx(l,{name:"Acme Corp SSO"})}),e.jsx(n,{icon:e.jsx(t,{name:"key-round"}),title:"Contractor Okta",badge:e.jsx(k,{tone:"danger",size:"sm",children:"Test failed"}),description:"The identity provider rejected the connection details",actions:e.jsx(x,{variant:"outline",size:"sm",leftIcon:e.jsx(t,{name:"zap"}),children:"Run test"}),menu:e.jsx(l,{name:"Contractor Okta"})}),e.jsx(n,{icon:e.jsx(t,{name:"key-round"}),title:"Azure AD — Pilot",badge:e.jsx(k,{size:"sm",children:"Draft"}),description:["OpenID Connect","Setup not finished"],actions:e.jsx(x,{variant:"outline",size:"sm",children:"Finish setup"}),menu:e.jsx(l,{name:"Azure AD — Pilot"})}),e.jsx(n,{dim:!0,icon:e.jsx(t,{name:"key-round"}),title:"Legacy ADFS (retired)",badge:e.jsx(k,{size:"sm",children:"Off"}),description:["Hidden from the sign-in screen","setup kept"],actions:e.jsx(p,{"aria-label":"Show Legacy ADFS on the sign-in screen"}),menu:e.jsx(l,{name:"Legacy ADFS"})})]})},S={parameters:{controls:{disable:!0}},render:function(){const[i,o]=d.useState(["northbridge.io"]),[m,h]=d.useState(null),[u,g]=d.useState(""),j=(a,c)=>{h(a),g(c)},A=()=>{h(null),g("")},O=()=>{const a=u.trim();a&&(o(c=>m==="new"?[a,...c]:c.map(s=>s===m?a:s)),A())},E=(a,c)=>e.jsx(n,{variant:"edit",icon:e.jsx(t,{name:"globe"}),actions:e.jsxs(e.Fragment,{children:[e.jsx(x,{variant:"ghost",size:"sm",onClick:A,children:"Cancel"}),e.jsx(x,{size:"sm",onClick:O,disabled:!u.trim(),children:a})]}),children:e.jsx(pe,{"aria-label":c,placeholder:"acme-corp.com",value:u,onChange:s=>{g(s.target.value)},onKeyDown:s=>{s.key==="Enter"&&O(),s.key==="Escape"&&A()}})});return e.jsxs(y,{children:[m==="new"?E("Add","New domain"):e.jsx(n,{variant:"add",icon:e.jsx(t,{name:"plus"}),title:"Add domain",onClick:()=>{j("new","")}}),i.map(a=>m===a?e.jsx(d.Fragment,{children:E("Save",`Rename ${a}`)},a):e.jsx(n,{icon:e.jsx(t,{name:"globe"}),title:a,actions:e.jsx(p,{defaultChecked:!0,"aria-label":`Enable ${a}`}),menu:e.jsx(l,{name:a,items:[{label:"Edit",icon:"pencil",onSelect:()=>{j(a,a)}},{label:"Delete",icon:"trash-2",destructive:!0,onSelect:()=>{o(c=>c.filter(s=>s!==a))}}]})},a))]})},play:async({canvasElement:r})=>{const i=ue(r);await D.click(i.getByRole("button",{name:"Add domain"})),await D.type(i.getByRole("textbox",{name:"New domain"}),"acme-corp.com"),await D.click(i.getByRole("button",{name:"Add"})),await he(i.getByText("acme-corp.com")).toBeInTheDocument()}},f={parameters:{controls:{disable:!0}},render:function(){const[i,o]=d.useState(!1),[m,h]=d.useState(!1),[u,g]=d.useState(0);return e.jsxs(y,{children:[e.jsx(n,{icon:e.jsx(t,{name:"lock"}),title:"Open a modal",description:"onClick opens a Dialog",onClick:()=>{o(!0)}}),e.jsx(n,{icon:e.jsx(t,{name:"shield"}),title:"Open a drawer",description:"onClick opens a Sheet; the switch and menu stay their own controls",onClick:()=>{h(!0)},actions:e.jsx(p,{defaultChecked:!0,"aria-label":"Enable the drawer card"}),menu:e.jsx(l,{name:"the drawer card"})}),e.jsx(n,{icon:e.jsx(t,{name:"zap"}),title:"Change the content",description:`Clicked ${String(u)} times`,onClick:()=>{g(j=>j+1)}}),e.jsx(n,{icon:e.jsx(t,{name:"github"}),title:"Redirect",description:"href makes the card a link; this one opens in a new tab",href:"https://github.com",target:"_blank"}),e.jsx(n,{icon:e.jsx(t,{name:"globe"}),title:"Not clickable",description:"clickable={false} holds it still, even with an onClick",onClick:()=>{o(!0)},clickable:!1}),e.jsx(Q,{open:i,onOpenChange:o,children:e.jsx(X,{children:e.jsxs(Z,{children:[e.jsx(ee,{children:"Opened from a card"}),e.jsx(te,{children:"The card's onClick set this dialog open."})]})})}),e.jsx(ne,{open:m,onOpenChange:h,children:e.jsx(ae,{children:e.jsxs(oe,{children:[e.jsx(ie,{children:"Opened from a card"}),e.jsx(re,{children:"The card's onClick set this drawer open."})]})})})]})}};var B,I,M,z,T;C.parameters={...C.parameters,docs:{...(B=C.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <Stack>
      <ActionCard {...args} />
    </Stack>
}`,...(M=(I=C.parameters)==null?void 0:I.docs)==null?void 0:M.source},description:{story:"Change anything in the controls panel.",...(T=(z=C.parameters)==null?void 0:z.docs)==null?void 0:T.description}}};var R,F,L,_,N;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <ActionCard variant="add" icon={<Icon name="globe" />} title="Use your own domain" description="Serve the console and every portal from an address like support.yourcompany.com" onClick={fn()} />
      <ActionCard variant="add" icon={<Icon name="plus" />} title="Add domain" onClick={fn()} />
      <ActionCard icon={<Icon name="globe" />} title="northbridge.io" actions={<MotadataSwitch defaultChecked aria-label="Enable northbridge.io" />} menu={<More name="northbridge.io" items={[{
      label: 'Edit',
      icon: 'pencil'
    }, {
      label: 'Delete',
      icon: 'trash-2',
      destructive: true
    }]} />} />
      <ActionCard icon={<Icon name="lock" />} title="Require SSO" badge={<Badge size="sm">Off</Badge>} description="Members can sign in with Acme Corp SSO, Google Workspace, or with email and a one-time code" actions={<MotadataSwitch aria-label="Require SSO" />} />
      <ActionCard variant="add" icon={<Icon name="plus" />} title="Add connection" description="Let members sign in with the identity provider they already use" onClick={fn()} actions={<AvatarStack max={3} size="sm">
            <Avatar name="Acme Corp" />
            <Avatar name="Microsoft" />
            <Avatar name="Google" />
            <Avatar name="Okta" />
          </AvatarStack>} />
      <ActionCard icon={<Icon name="shield" />} title="Acme Corp SSO" badge={<Badge tone="success" size="sm">
            Live
          </Badge>} description={['SAML 2.0', '2,104 sign-ins in 30 days']} actions={<MotadataSwitch defaultChecked aria-label="Show Acme Corp SSO on the sign-in screen" />} menu={<More name="Acme Corp SSO" />} />
      <ActionCard icon={<Icon name="key-round" />} title="Contractor Okta" badge={<Badge tone="danger" size="sm">
            Test failed
          </Badge>} description="The identity provider rejected the connection details" actions={<Button variant="outline" size="sm" leftIcon={<Icon name="zap" />}>
            Run test
          </Button>} menu={<More name="Contractor Okta" />} />
      <ActionCard icon={<Icon name="key-round" />} title="Azure AD — Pilot" badge={<Badge size="sm">Draft</Badge>} description={['OpenID Connect', 'Setup not finished']} actions={<Button variant="outline" size="sm">
            Finish setup
          </Button>} menu={<More name="Azure AD — Pilot" />} />
      <ActionCard dim icon={<Icon name="key-round" />} title="Legacy ADFS (retired)" badge={<Badge size="sm">Off</Badge>} description={['Hidden from the sign-in screen', 'setup kept']} actions={<MotadataSwitch aria-label="Show Legacy ADFS on the sign-in screen" />} menu={<More name="Legacy ADFS" />} />
    </Stack>
}`,...(L=(F=b.parameters)==null?void 0:F.docs)==null?void 0:L.source},description:{story:"Every face from the console: add cards, a domain, a setting, and connections in each state.",...(N=(_=b.parameters)==null?void 0:_.docs)==null?void 0:N.description}}};var H,$,P,G,q;S.parameters={...S.parameters,docs:{...(H=S.parameters)==null?void 0:H.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: function InlineEditStory() {
    const [domains, setDomains] = useState(['northbridge.io']);
    /* which card holds the field: 'new' for Add domain, a name for an Edit */
    const [editing, setEditing] = useState<string | null>(null);
    const [draft, setDraft] = useState('');
    const open = (key: string, value: string) => {
      setEditing(key);
      setDraft(value);
    };
    const close = () => {
      setEditing(null);
      setDraft('');
    };
    const commit = () => {
      const value = draft.trim();
      if (!value) return;
      setDomains(list => editing === 'new' ? [value, ...list] : list.map(d => d === editing ? value : d));
      close();
    };
    const editCard = (verb: string, label: string) => <ActionCard variant="edit" icon={<Icon name="globe" />} actions={<>
            <Button variant="ghost" size="sm" onClick={close}>
              Cancel
            </Button>
            <Button size="sm" onClick={commit} disabled={!draft.trim()}>
              {verb}
            </Button>
          </>}>
        <Input aria-label={label} placeholder="acme-corp.com" value={draft} onChange={e => {
        setDraft(e.target.value);
      }} onKeyDown={e => {
        if (e.key === 'Enter') commit();
        if (e.key === 'Escape') close();
      }} />
      </ActionCard>;
    return <Stack>
        {editing === 'new' ? editCard('Add', 'New domain') : <ActionCard variant="add" icon={<Icon name="plus" />} title="Add domain" onClick={() => {
        open('new', '');
      }} />}
        {domains.map(d => editing === d ? <Fragment key={d}>{editCard('Save', \`Rename \${d}\`)}</Fragment> : <ActionCard key={d} icon={<Icon name="globe" />} title={d} actions={<MotadataSwitch defaultChecked aria-label={\`Enable \${d}\`} />} menu={<More name={d} items={[{
        label: 'Edit',
        icon: 'pencil',
        onSelect: () => {
          open(d, d);
        }
      }, {
        label: 'Delete',
        icon: 'trash-2',
        destructive: true,
        onSelect: () => {
          setDomains(list => list.filter(x => x !== d));
        }
      }]} />} />)}
      </Stack>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add domain'
    }));
    await userEvent.type(canvas.getByRole('textbox', {
      name: 'New domain'
    }), 'acme-corp.com');
    await userEvent.click(canvas.getByRole('button', {
      name: 'Add'
    }));
    await expect(canvas.getByText('acme-corp.com')).toBeInTheDocument();
  }
}`,...(P=($=S.parameters)==null?void 0:$.docs)==null?void 0:P.source},description:{story:"Add domain, pressed, becomes the `edit` card in its place: the field, Cancel\nand Add. Each domain's ⋯ works: Edit turns that card into the same field,\nDelete removes it. Enter and Escape do what the two buttons do.",...(q=(G=S.parameters)==null?void 0:G.docs)==null?void 0:q.description}}};var U,K,W,V,Y;f.parameters={...f.parameters,docs:{...(U=f.parameters)==null?void 0:U.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: function ClickBehavioursStory() {
    const [modal, setModal] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [count, setCount] = useState(0);
    return <Stack>
        <ActionCard icon={<Icon name="lock" />} title="Open a modal" description="onClick opens a Dialog" onClick={() => {
        setModal(true);
      }} />
        <ActionCard icon={<Icon name="shield" />} title="Open a drawer" description="onClick opens a Sheet; the switch and menu stay their own controls" onClick={() => {
        setDrawer(true);
      }} actions={<MotadataSwitch defaultChecked aria-label="Enable the drawer card" />} menu={<More name="the drawer card" />} />
        <ActionCard icon={<Icon name="zap" />} title="Change the content" description={\`Clicked \${String(count)} times\`} onClick={() => {
        setCount(c => c + 1);
      }} />
        <ActionCard icon={<Icon name="github" />} title="Redirect" description="href makes the card a link; this one opens in a new tab" href="https://github.com" target="_blank" />
        <ActionCard icon={<Icon name="globe" />} title="Not clickable" description="clickable={false} holds it still, even with an onClick" onClick={() => {
        setModal(true);
      }} clickable={false} />
        <Dialog open={modal} onOpenChange={setModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Opened from a card</DialogTitle>
              <DialogDescription>The card's onClick set this dialog open.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Sheet open={drawer} onOpenChange={setDrawer}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Opened from a card</SheetTitle>
              <SheetDescription>The card's onClick set this drawer open.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Stack>;
  }
}`,...(W=(K=f.parameters)==null?void 0:K.docs)==null?void 0:W.source},description:{story:`What a click on the card can do. The switch and ⋯ on the drawer card stay
their own controls - flipping the switch does not open the drawer.`,...(Y=(V=f.parameters)==null?void 0:V.docs)==null?void 0:Y.description}}};const nt=["Playground","AllVariants","InlineEdit","ClickBehaviours"];export{b as AllVariants,f as ClickBehaviours,S as InlineEdit,C as Playground,nt as __namedExportsOrder,tt as default};
//# sourceMappingURL=ActionCard.stories-BsBlCon3.js.map
