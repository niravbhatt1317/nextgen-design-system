import{j as e,r as s}from"./iframe-D3prpiam.js";import{A as n}from"./ActionCard-D7lMHROv.js";import{I as t}from"./Icon-Dx9XXtQk.js";import{M as p}from"./Switch-C8ntFvsY.js";import{B as f}from"./Badge-By5kZTLc.js";import{A as J}from"./AvatarStack-Cnon-n3d.js";import{A as w}from"./Avatar-DH0Qw65Y.js";import{B as h}from"./Button-Dm8cqF7t.js";import{D as Q,a as X,b as Z,c as ee,d as te}from"./Dialog-ChD5EMbw.js";import{S as ne,a as ae,b as oe,c as ie,d as re}from"./Sheet-dNTXeH4P.js";import{D as se,a as ce,b as de,c as le,d as me}from"./DropdownMenu-DDdui5Jx.js";import{I as pe}from"./Input-BCOeOOhc.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./icon-at-drawn-size-BUHWhXTL.js";import"./index-DlfvoJO6.js";import"./index-CYF4rNPc.js";import"./index-5NTikNTt.js";import"./index-4AQQuvpZ.js";import"./index-28IxR4K0.js";import"./index-DWFjSe0X.js";import"./index-Dp_whDTU.js";import"./index-B9Vx0Db6.js";import"./index-CDzjl8Nl.js";import"./index-DRWHOs2m.js";import"./index-D2iJc-0x.js";import"./index-CtGrMHpd.js";import"./index-QOw5hcJ7.js";import"./index-DOzB6PXY.js";import"./index-CDAczfsX.js";import"./index-DBsxZbK3.js";import"./index-BCP57w5e.js";import"./index-C5_RAJvM.js";import"./index-rVfbO7DR.js";import"./scroll-fade-DWC0drtQ.js";import"./index-CfLsbkXh.js";import"./index-Do4P7H5Z.js";import"./index-Bh7Bny6w.js";import"./picked-row-BGnBNViw.js";const{expect:he,fn:v,userEvent:D,within:ue}=__STORYBOOK_MODULE_TEST__,y=({children:r})=>e.jsx("div",{style:{display:"grid",gap:10,width:760},children:r}),ge=[{label:"Edit setup",icon:"pencil"},{label:"Test connection",icon:"zap"},{label:"Remove connection…",icon:"trash-2",destructive:!0,divided:!0}],m=({name:r,items:i=ge})=>e.jsxs(se,{children:[e.jsx(ce,{asChild:!0,children:e.jsx(h,{iconOnly:!0,variant:"ghost",size:"sm",ariaLabel:`More for ${r}`,leftIcon:e.jsx(t,{name:"more-horizontal"})})}),e.jsx(de,{align:"end",children:i.map(o=>e.jsxs(s.Fragment,{children:[o.divided&&e.jsx(le,{}),e.jsxs(me,{variant:o.destructive?"destructive":"default",...o.onSelect?{onSelect:o.onSelect}:{},children:[e.jsx(t,{name:o.icon,size:16}),o.label]})]},o.label))})]}),at={title:"New Components/ActionCard",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"One item on a settings page, as a row: a 36px tile, a title with its badge, a line under it, and controls on the right. Four faces: `default`, the dashed blue `add`, `edit` for an inline field, and `compact` - a quiet tinted card with a 14 glyph by a 12 title and its line, for inside a dialog or panel (the store endpoint with Sync now in the Browse popup). Give it `onClick` or `href` and the whole card is clickable - open a modal, a drawer, an inline edit, change the content, or go somewhere. `clickable={false}` holds it still. The switch, buttons and menu inside keep working on their own and never trigger the card."}}},argTypes:{variant:{control:"inline-radio",options:["default","add","edit","compact"]},title:{control:"text"},description:{control:"text"},dim:{control:"boolean",description:"Fade the tile: retired or switched off"},clickable:{control:"boolean",description:"Respond to a click when onClick or href is set"},href:{control:"text",description:"Make the card a link"},icon:{control:!1},badge:{control:!1},actions:{control:!1},menu:{control:!1}},args:{icon:e.jsx(t,{name:"globe"}),title:"Use your own domain",description:"Serve the console and every portal from an address like support.yourcompany.com",onClick:v()}},k={render:r=>e.jsx(y,{children:e.jsx(n,{...r})})},Se=()=>{const[r,i]=s.useState(!1),[o,d]=s.useState("moments ago");return e.jsx(n,{variant:"compact",icon:e.jsx(t,{name:"globe"}),title:"https://vault.acme.io/v1/secret/metadata?list=true",description:`Synced ${o} · auto every 10 min`,actions:e.jsx(h,{variant:"outline",leftIcon:e.jsx(t,{name:"refresh-cw",size:16,"aria-hidden":!0}),disabled:r,onClick:()=>{i(!0),setTimeout(()=>{i(!1),d("just now")},700)},children:r?"Syncing…":"Sync now"})})},x={parameters:{controls:{disable:!0}},render:()=>e.jsxs(y,{children:[e.jsx(n,{variant:"add",icon:e.jsx(t,{name:"globe"}),title:"Use your own domain",description:"Serve the console and every portal from an address like support.yourcompany.com",onClick:v()}),e.jsx(n,{variant:"add",icon:e.jsx(t,{name:"plus"}),title:"Add domain",onClick:v()}),e.jsx(n,{icon:e.jsx(t,{name:"globe"}),title:"northbridge.io",actions:e.jsx(p,{defaultChecked:!0,"aria-label":"Enable northbridge.io"}),menu:e.jsx(m,{name:"northbridge.io",items:[{label:"Edit",icon:"pencil"},{label:"Delete",icon:"trash-2",destructive:!0}]})}),e.jsx(n,{icon:e.jsx(t,{name:"lock"}),title:"Require SSO",badge:e.jsx(f,{size:"sm",children:"Off"}),description:"Members can sign in with Acme Corp SSO, Google Workspace, or with email and a one-time code",actions:e.jsx(p,{"aria-label":"Require SSO"})}),e.jsx(n,{variant:"add",icon:e.jsx(t,{name:"plus"}),title:"Add connection",description:"Let members sign in with the identity provider they already use",onClick:v(),actions:e.jsxs(J,{max:3,size:"sm",children:[e.jsx(w,{name:"Acme Corp"}),e.jsx(w,{name:"Microsoft"}),e.jsx(w,{name:"Google"}),e.jsx(w,{name:"Okta"})]})}),e.jsx(n,{icon:e.jsx(t,{name:"shield"}),title:"Acme Corp SSO",badge:e.jsx(f,{tone:"success",size:"sm",children:"Live"}),description:["SAML 2.0","2,104 sign-ins in 30 days"],actions:e.jsx(p,{defaultChecked:!0,"aria-label":"Show Acme Corp SSO on the sign-in screen"}),menu:e.jsx(m,{name:"Acme Corp SSO"})}),e.jsx(n,{icon:e.jsx(t,{name:"key-round"}),title:"Contractor Okta",badge:e.jsx(f,{tone:"danger",size:"sm",children:"Test failed"}),description:"The identity provider rejected the connection details",actions:e.jsx(h,{variant:"outline",size:"sm",leftIcon:e.jsx(t,{name:"zap"}),children:"Run test"}),menu:e.jsx(m,{name:"Contractor Okta"})}),e.jsx(n,{icon:e.jsx(t,{name:"key-round"}),title:"Azure AD — Pilot",badge:e.jsx(f,{size:"sm",children:"Draft"}),description:["OpenID Connect","Setup not finished"],actions:e.jsx(h,{variant:"outline",size:"sm",children:"Finish setup"}),menu:e.jsx(m,{name:"Azure AD — Pilot"})}),e.jsx(n,{dim:!0,icon:e.jsx(t,{name:"key-round"}),title:"Legacy ADFS (retired)",badge:e.jsx(f,{size:"sm",children:"Off"}),description:["Hidden from the sign-in screen","setup kept"],actions:e.jsx(p,{"aria-label":"Show Legacy ADFS on the sign-in screen"}),menu:e.jsx(m,{name:"Legacy ADFS"})}),e.jsx(Se,{})]})},b={parameters:{controls:{disable:!0}},render:function(){const[i,o]=s.useState(["northbridge.io"]),[d,u]=s.useState(null),[g,S]=s.useState(""),j=(a,l)=>{u(a),S(l)},A=()=>{u(null),S("")},O=()=>{const a=g.trim();a&&(o(l=>d==="new"?[a,...l]:l.map(c=>c===d?a:c)),A())},E=(a,l)=>e.jsx(n,{variant:"edit",icon:e.jsx(t,{name:"globe"}),actions:e.jsxs(e.Fragment,{children:[e.jsx(h,{variant:"ghost",size:"sm",onClick:A,children:"Cancel"}),e.jsx(h,{size:"sm",onClick:O,disabled:!g.trim(),children:a})]}),children:e.jsx(pe,{"aria-label":l,placeholder:"acme-corp.com",value:g,onChange:c=>{S(c.target.value)},onKeyDown:c=>{c.key==="Enter"&&O(),c.key==="Escape"&&A()}})});return e.jsxs(y,{children:[d==="new"?E("Add","New domain"):e.jsx(n,{variant:"add",icon:e.jsx(t,{name:"plus"}),title:"Add domain",onClick:()=>{j("new","")}}),i.map(a=>d===a?e.jsx(s.Fragment,{children:E("Save",`Rename ${a}`)},a):e.jsx(n,{icon:e.jsx(t,{name:"globe"}),title:a,actions:e.jsx(p,{defaultChecked:!0,"aria-label":`Enable ${a}`}),menu:e.jsx(m,{name:a,items:[{label:"Edit",icon:"pencil",onSelect:()=>{j(a,a)}},{label:"Delete",icon:"trash-2",destructive:!0,onSelect:()=>{o(l=>l.filter(c=>c!==a))}}]})},a))]})},play:async({canvasElement:r})=>{const i=ue(r);await D.click(i.getByRole("button",{name:"Add domain"})),await D.type(i.getByRole("textbox",{name:"New domain"}),"acme-corp.com"),await D.click(i.getByRole("button",{name:"Add"})),await he(i.getByText("acme-corp.com")).toBeInTheDocument()}},C={parameters:{controls:{disable:!0}},render:function(){const[i,o]=s.useState(!1),[d,u]=s.useState(!1),[g,S]=s.useState(0);return e.jsxs(y,{children:[e.jsx(n,{icon:e.jsx(t,{name:"lock"}),title:"Open a modal",description:"onClick opens a Dialog",onClick:()=>{o(!0)}}),e.jsx(n,{icon:e.jsx(t,{name:"shield"}),title:"Open a drawer",description:"onClick opens a Sheet; the switch and menu stay their own controls",onClick:()=>{u(!0)},actions:e.jsx(p,{defaultChecked:!0,"aria-label":"Enable the drawer card"}),menu:e.jsx(m,{name:"the drawer card"})}),e.jsx(n,{icon:e.jsx(t,{name:"zap"}),title:"Change the content",description:`Clicked ${String(g)} times`,onClick:()=>{S(j=>j+1)}}),e.jsx(n,{icon:e.jsx(t,{name:"github"}),title:"Redirect",description:"href makes the card a link; this one opens in a new tab",href:"https://github.com",target:"_blank"}),e.jsx(n,{icon:e.jsx(t,{name:"globe"}),title:"Not clickable",description:"clickable={false} holds it still, even with an onClick",onClick:()=>{o(!0)},clickable:!1}),e.jsx(Q,{open:i,onOpenChange:o,children:e.jsx(X,{children:e.jsxs(Z,{children:[e.jsx(ee,{children:"Opened from a card"}),e.jsx(te,{children:"The card's onClick set this dialog open."})]})})}),e.jsx(ne,{open:d,onOpenChange:u,children:e.jsx(ae,{children:e.jsxs(oe,{children:[e.jsx(ie,{children:"Opened from a card"}),e.jsx(re,{children:"The card's onClick set this drawer open."})]})})})]})}};var B,I,M,z,T;k.parameters={...k.parameters,docs:{...(B=k.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <Stack>
      <ActionCard {...args} />
    </Stack>
}`,...(M=(I=k.parameters)==null?void 0:I.docs)==null?void 0:M.source},description:{story:"Change anything in the controls panel.",...(T=(z=k.parameters)==null?void 0:z.docs)==null?void 0:T.description}}};var R,F,L,_,N;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
      <SyncSource />
    </Stack>
}`,...(L=(F=x.parameters)==null?void 0:F.docs)==null?void 0:L.source},description:{story:"Every face from the console: add cards, a domain, a setting, connections in each state, and the compact source card.",...(N=(_=x.parameters)==null?void 0:_.docs)==null?void 0:N.description}}};var H,$,P,q,G;b.parameters={...b.parameters,docs:{...(H=b.parameters)==null?void 0:H.docs,source:{originalSource:`{
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
}`,...(P=($=b.parameters)==null?void 0:$.docs)==null?void 0:P.source},description:{story:"Add domain, pressed, becomes the `edit` card in its place: the field, Cancel\nand Add. Each domain's ⋯ works: Edit turns that card into the same field,\nDelete removes it. Enter and Escape do what the two buttons do.",...(G=(q=b.parameters)==null?void 0:q.docs)==null?void 0:G.description}}};var U,K,W,V,Y;C.parameters={...C.parameters,docs:{...(U=C.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(W=(K=C.parameters)==null?void 0:K.docs)==null?void 0:W.source},description:{story:`What a click on the card can do. The switch and ⋯ on the drawer card stay
their own controls - flipping the switch does not open the drawer.`,...(Y=(V=C.parameters)==null?void 0:V.docs)==null?void 0:Y.description}}};const ot=["Playground","AllVariants","InlineEdit","ClickBehaviours"];export{x as AllVariants,C as ClickBehaviours,b as InlineEdit,k as Playground,ot as __namedExportsOrder,at as default};
//# sourceMappingURL=ActionCard.stories-DRfyRupx.js.map
