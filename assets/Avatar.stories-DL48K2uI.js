import{j as e}from"./iframe-C3j6EdMW.js";import{A as s}from"./Avatar-DOKSMBMj.js";import{A as d}from"./AvatarStack-rXpZKemL.js";import"./index-C6xV686X.js";import{I as n}from"./Icon-DKIEuqof.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./Button-C_2sxInh.js";import"./icon-at-drawn-size-DFTKan6O.js";const Ae={title:"New Components/Avatar",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["A person or a thing, as a photo, **one letter**, or an icon.","","| Prop | Values |","| --- | --- |","| `shape` | circle · rounded — left unset it follows the content: a letter or a photo is a circle, an icon a rounded square |","| `size` | xs 20 · sm 24 · md 32 · lg 40 · xl 56 |","| `tone` | slate · blue · green · amber · rose · purple |","| `icon` | a thing rather than a person — the glyph sizes itself: 12 · 14 · 16 · 20 · 24 |","| `logo` | a logo that fills the square edge to edge, no ground; the letter stands when there is none |","| `status` | active · suspended · offboarded — a dot on the bottom-right corner, ringed in the card colour |","| `onEdit` | a camera button on the corner; opens the file picker and hands back the chosen image |","","Ruled on the avatar mock (Pranjal, 2026-09-20 → 21): **one letter at every size**; the type a","step smaller than the scale (11 · 11 · 12 · 16 · 18); **a person is a circle, a thing is a","square**; the square's corners are 6, and 12 at xl; a photo falls back to the letter.","","**Leave `tone` unset and the colour is derived from the name**, so one person is","always one colour — and never slate, which keeps to the +N chip, to a thing, and to an","avatar with no name. IAM's audit records the failure this avoids: a palette assigned per","row rather than per identity, so the same person appears in two colours on two screens."].join(`
`)}}}},o=({children:a})=>e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3",children:a}),i=({children:a})=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:a}),r=({children:a})=>e.jsx("p",{className:"mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:a}),t=["Sarah Johnson","Ravi Patel","Mei Chen","Tom Green","Ana Silva","Ken Watts"],g={args:{name:"Sarah Johnson"}},l={parameters:{controls:{disable:!0},layout:"padded"},render:()=>e.jsxs(i,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"circle — a person"}),e.jsx(o,{children:t.slice(0,4).map(a=>e.jsx(s,{name:a,shape:"circle"},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"rounded — a thing, or a person when forced"}),e.jsx(o,{children:t.slice(0,4).map(a=>e.jsx(s,{name:a,shape:"rounded"},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Both, at every size"}),e.jsxs(o,{children:[["xs","sm","md","lg","xl"].map(a=>e.jsx(s,{name:"Sarah Johnson",size:a,shape:"circle"},a)),e.jsx("span",{className:"mdt-w-4"}),["xs","sm","md","lg","xl"].map(a=>e.jsx(s,{name:"Sarah Johnson",size:a,shape:"rounded"},a))]})]})]})},j={parameters:{controls:{disable:!0},layout:"padded"},render:()=>e.jsxs(o,{children:[e.jsx(s,{name:"Sarah Johnson",size:"xs"}),e.jsx(s,{name:"Sarah Johnson",size:"sm"}),e.jsx(s,{name:"Sarah Johnson",size:"md"}),e.jsx(s,{name:"Sarah Johnson",size:"lg"}),e.jsx(s,{name:"Sarah Johnson",size:"xl"})]})},c={parameters:{controls:{disable:!0},layout:"padded"},render:()=>e.jsxs(i,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"Explicit"}),e.jsx(o,{children:["slate","blue","green","amber","rose","purple"].map(a=>e.jsx(s,{name:a,tone:a,size:"lg"},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Derived from the name — the same person is always the same colour"}),e.jsx(o,{children:t.map(a=>e.jsx(s,{name:a,size:"lg"},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Sarah Johnson, rendered three times — identical every time"}),e.jsxs(o,{children:[e.jsx(s,{name:"Sarah Johnson",size:"lg"}),e.jsx(s,{name:"Sarah Johnson",size:"lg"}),e.jsx(s,{name:"Sarah Johnson",size:"lg"})]})]})]})},h={name:"With a photo",parameters:{controls:{disable:!0},layout:"padded"},render:()=>e.jsxs(i,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"Photo"}),e.jsxs(o,{children:[e.jsx(s,{name:"Sarah Johnson",size:"lg",src:"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%233d7dff'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%23fff'/%3E%3Cellipse cx='40' cy='68' rx='24' ry='18' fill='%23fff'/%3E%3C/svg%3E"}),e.jsx(s,{name:"Sarah Johnson",size:"lg",shape:"rounded",src:"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%2337b97d'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%23fff'/%3E%3Cellipse cx='40' cy='68' rx='24' ry='18' fill='%23fff'/%3E%3C/svg%3E"})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Broken image — falls back to initials rather than an empty box"}),e.jsx(o,{children:e.jsx(s,{name:"Sarah Johnson",size:"lg",src:"https://example.invalid/missing.png"})})]})]})},m={name:"With an icon",parameters:{controls:{disable:!0},layout:"padded"},render:()=>e.jsxs(i,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"The things the console marks — team · role · service account · organization"}),e.jsxs(o,{children:[e.jsx(s,{name:"Design team",icon:e.jsx(n,{name:"users"}),tone:"blue"}),e.jsx(s,{name:"Administrator role",icon:e.jsx(n,{name:"shield"}),tone:"blue"}),e.jsx(s,{name:"Backup runner",icon:e.jsx(n,{name:"bot"}),tone:"blue"}),e.jsx(s,{name:"Acme Corp",icon:e.jsx(n,{name:"building"}),tone:"blue"})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"At every size — the glyph follows: 12 · 14 · 16 · 20 · 24; the corners 6, and 12 at xl"}),e.jsx(o,{children:["xs","sm","md","lg","xl"].map(a=>e.jsx(s,{name:"Design team",icon:e.jsx(n,{name:"users"}),tone:"blue",size:a},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Forced into a circle, and a person beside it for scale"}),e.jsxs(o,{children:[e.jsx(s,{name:"Design team",icon:e.jsx(n,{name:"users"}),tone:"blue",shape:"circle"}),e.jsx(s,{name:"Sarah Johnson"})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"No name at all — a glyph on slate"}),e.jsx(o,{children:e.jsx(s,{icon:e.jsx(n,{name:"user"})})})]})]})},p={parameters:{controls:{disable:!0},layout:"padded"},render:()=>e.jsxs(i,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"Default — shows 4, collapses the rest"}),e.jsx(d,{children:t.map(a=>e.jsx(s,{name:a},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Showing 3"}),e.jsx(d,{max:3,children:t.map(a=>e.jsx(s,{name:a},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Rounded, large"}),e.jsx(d,{max:4,size:"lg",shape:"rounded",children:t.map(a=>e.jsx(s,{name:a},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Nothing hidden — no chip"}),e.jsx(d,{max:6,children:t.slice(0,3).map(a=>e.jsx(s,{name:a},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Every size"}),e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:["xs","sm","md","lg","xl"].map(a=>e.jsx(d,{size:a,max:4,children:t.map(f=>e.jsx(s,{name:f},f))},a))})]})]})},b="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23101828'/%3E%3Cpath d='M20 58 40 18 60 58Z' fill='%2336d576'/%3E%3C/svg%3E",x={name:"With a logo",parameters:{controls:{disable:!0},layout:"padded"},render:()=>e.jsxs(i,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"The logo fills the box at every size; the corners round it"}),e.jsx(o,{children:["xs","sm","md","lg","xl"].map(a=>e.jsx(s,{name:"Acme Corp",logo:b,size:a},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"No logo, or a broken one — the letter on its tone, still a square"}),e.jsxs(o,{children:[e.jsx(s,{name:"Acme Corp",size:"xl",shape:"rounded"}),e.jsx(s,{name:"Acme Corp",size:"xl",logo:"https://example.invalid/missing.png"})]})]})]})},u={name:"With a status dot",parameters:{controls:{disable:!0},layout:"padded"},render:()=>e.jsxs(i,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"active · suspended · offboarded"}),e.jsxs(o,{children:[e.jsx(s,{name:"Acme Corp",size:"xl",shape:"rounded",status:"active"}),e.jsx(s,{name:"Globex",size:"xl",shape:"rounded",status:"suspended"}),e.jsx(s,{name:"Initech",size:"xl",shape:"rounded",status:"offboarded"}),e.jsx(s,{name:"Acme Corp",size:"xl",logo:b,status:"active"})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Rounded, at every size — the dot is 10/64 of the avatar, the ring 1/16"}),e.jsx(o,{children:["xs","sm","md","lg","xl"].map(a=>e.jsx(s,{name:"Acme Corp",shape:"rounded",size:a,status:"active"},a))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Circle, at every size"}),e.jsx(o,{children:["xs","sm","md","lg","xl"].map(a=>e.jsx(s,{name:"Sarah Johnson",size:a,status:"active"},a))})]})]})},v={name:"With an edit button",parameters:{controls:{disable:!0},layout:"padded"},render:()=>e.jsxs(o,{children:[e.jsx(s,{name:"Sarah Johnson",size:"xl",shape:"rounded",onEdit:()=>{}}),e.jsx(s,{name:"Acme Corp",size:"xl",logo:b,editLabel:"Change logo",onEdit:()=>{}})]})};var w,y,A;g.parameters={...g.parameters,docs:{...(w=g.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    name: 'Sarah Johnson'
  }
}`,...(A=(y=g.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var z,S,L,E,k;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Group>
      <div>
        <Label>circle — a person</Label>
        <Row>
          {PEOPLE.slice(0, 4).map(n => <Avatar key={n} name={n} shape="circle" />)}
        </Row>
      </div>
      <div>
        <Label>rounded — a thing, or a person when forced</Label>
        <Row>
          {PEOPLE.slice(0, 4).map(n => <Avatar key={n} name={n} shape="rounded" />)}
        </Row>
      </div>
      <div>
        <Label>Both, at every size</Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => <Avatar key={s} name="Sarah Johnson" size={s} shape="circle" />)}
          <span className="mdt-w-4" />
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => <Avatar key={s} name="Sarah Johnson" size={s} shape="rounded" />)}
        </Row>
      </div>
    </Group>
}`,...(L=(S=l.parameters)==null?void 0:S.docs)==null?void 0:L.source},description:{story:"A person is a circle, a thing is a rounded square. Either can be forced.",...(k=(E=l.parameters)==null?void 0:E.docs)==null?void 0:k.description}}};var C,R,J;j.parameters={...j.parameters,docs:{...(C=j.parameters)==null?void 0:C.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Row>
      <Avatar name="Sarah Johnson" size="xs" />
      <Avatar name="Sarah Johnson" size="sm" />
      <Avatar name="Sarah Johnson" size="md" />
      <Avatar name="Sarah Johnson" size="lg" />
      <Avatar name="Sarah Johnson" size="xl" />
    </Row>
}`,...(J=(R=j.parameters)==null?void 0:R.docs)==null?void 0:J.source}}};var P,G,W,O,I;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Group>
      <div>
        <Label>Explicit</Label>
        <Row>
          {(['slate', 'blue', 'green', 'amber', 'rose', 'purple'] as const).map(t => <Avatar key={t} name={t} tone={t} size="lg" />)}
        </Row>
      </div>
      <div>
        <Label>Derived from the name — the same person is always the same colour</Label>
        <Row>
          {PEOPLE.map(n => <Avatar key={n} name={n} size="lg" />)}
        </Row>
      </div>
      <div>
        <Label>Sarah Johnson, rendered three times — identical every time</Label>
        <Row>
          <Avatar name="Sarah Johnson" size="lg" />
          <Avatar name="Sarah Johnson" size="lg" />
          <Avatar name="Sarah Johnson" size="lg" />
        </Row>
      </div>
    </Group>
}`,...(W=(G=c.parameters)==null?void 0:G.docs)==null?void 0:W.source},description:{story:"Six tones. Set one explicitly, or let the name choose.",...(I=(O=c.parameters)==null?void 0:O.docs)==null?void 0:I.description}}};var N,D,q,T,B;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`{
  name: 'With a photo',
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Group>
      <div>
        <Label>Photo</Label>
        <Row>
          <Avatar name="Sarah Johnson" size="lg" src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%233d7dff'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%23fff'/%3E%3Cellipse cx='40' cy='68' rx='24' ry='18' fill='%23fff'/%3E%3C/svg%3E" />
          <Avatar name="Sarah Johnson" size="lg" shape="rounded" src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%2337b97d'/%3E%3Ccircle cx='40' cy='30' r='14' fill='%23fff'/%3E%3Cellipse cx='40' cy='68' rx='24' ry='18' fill='%23fff'/%3E%3C/svg%3E" />
        </Row>
      </div>
      <div>
        <Label>Broken image — falls back to initials rather than an empty box</Label>
        <Row>
          <Avatar name="Sarah Johnson" size="lg" src="https://example.invalid/missing.png" />
        </Row>
      </div>
    </Group>
}`,...(q=(D=h.parameters)==null?void 0:D.docs)==null?void 0:q.source},description:{story:"A photo when there is one; initials when there isn't, or when it fails.",...(B=(T=h.parameters)==null?void 0:T.docs)==null?void 0:B.description}}};var M,F,_,K,V;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  name: 'With an icon',
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Group>
      <div>
        <Label>The things the console marks — team · role · service account · organization</Label>
        <Row>
          <Avatar name="Design team" icon={<Icon name="users" />} tone="blue" />
          <Avatar name="Administrator role" icon={<Icon name="shield" />} tone="blue" />
          <Avatar name="Backup runner" icon={<Icon name="bot" />} tone="blue" />
          <Avatar name="Acme Corp" icon={<Icon name="building" />} tone="blue" />
        </Row>
      </div>
      <div>
        <Label>
          At every size — the glyph follows: 12 · 14 · 16 · 20 · 24; the corners 6, and 12 at xl
        </Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => <Avatar key={s} name="Design team" icon={<Icon name="users" />} tone="blue" size={s} />)}
        </Row>
      </div>
      <div>
        <Label>Forced into a circle, and a person beside it for scale</Label>
        <Row>
          <Avatar name="Design team" icon={<Icon name="users" />} tone="blue" shape="circle" />
          <Avatar name="Sarah Johnson" />
        </Row>
      </div>
      <div>
        <Label>No name at all — a glyph on slate</Label>
        <Row>
          <Avatar icon={<Icon name="user" />} />
        </Row>
      </div>
    </Group>
}`,...(_=(F=m.parameters)==null?void 0:F.docs)==null?void 0:_.source},description:{story:"A thing rather than a person: a team, a role, a service account, an organization. The square is the default; the glyph sizes itself to the tile.",...(V=(K=m.parameters)==null?void 0:K.docs)==null?void 0:V.description}}};var Z,H,Q,U,X;p.parameters={...p.parameters,docs:{...(Z=p.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Group>
      <div>
        <Label>Default — shows 4, collapses the rest</Label>
        <AvatarStack>
          {PEOPLE.map(n => <Avatar key={n} name={n} />)}
        </AvatarStack>
      </div>
      <div>
        <Label>Showing 3</Label>
        <AvatarStack max={3}>
          {PEOPLE.map(n => <Avatar key={n} name={n} />)}
        </AvatarStack>
      </div>
      <div>
        <Label>Rounded, large</Label>
        <AvatarStack max={4} size="lg" shape="rounded">
          {PEOPLE.map(n => <Avatar key={n} name={n} />)}
        </AvatarStack>
      </div>
      <div>
        <Label>Nothing hidden — no chip</Label>
        <AvatarStack max={6}>
          {PEOPLE.slice(0, 3).map(n => <Avatar key={n} name={n} />)}
        </AvatarStack>
      </div>
      <div>
        <Label>Every size</Label>
        <div className="mdt-flex mdt-flex-col mdt-gap-3">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => <AvatarStack key={s} size={s} max={4}>
              {PEOPLE.map(n => <Avatar key={n} name={n} />)}
            </AvatarStack>)}
        </div>
      </div>
    </Group>
}`,...(Q=(H=p.parameters)==null?void 0:H.docs)==null?void 0:Q.source},description:{story:"Overlapping, with the rest collapsed into a count.",...(X=(U=p.parameters)==null?void 0:U.docs)==null?void 0:X.description}}};var Y,$,ee,ae,se;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  name: 'With a logo',
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Group>
      <div>
        <Label>The logo fills the box at every size; the corners round it</Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => <Avatar key={s} name="Acme Corp" logo={LOGO} size={s} />)}
        </Row>
      </div>
      <div>
        <Label>No logo, or a broken one — the letter on its tone, still a square</Label>
        <Row>
          <Avatar name="Acme Corp" size="xl" shape="rounded" />
          <Avatar name="Acme Corp" size="xl" logo="https://example.invalid/missing.png" />
        </Row>
      </div>
    </Group>
}`,...(ee=($=x.parameters)==null?void 0:$.docs)==null?void 0:ee.source},description:{story:"An organization's logo FILLS the square edge to edge — no frame, no ground (the console's OrgMark). Without one, the letter stands.",...(se=(ae=x.parameters)==null?void 0:ae.docs)==null?void 0:se.description}}};var re,oe,te,ne,ie;u.parameters={...u.parameters,docs:{...(re=u.parameters)==null?void 0:re.docs,source:{originalSource:`{
  name: 'With a status dot',
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Group>
      <div>
        <Label>active · suspended · offboarded</Label>
        <Row>
          <Avatar name="Acme Corp" size="xl" shape="rounded" status="active" />
          <Avatar name="Globex" size="xl" shape="rounded" status="suspended" />
          <Avatar name="Initech" size="xl" shape="rounded" status="offboarded" />
          <Avatar name="Acme Corp" size="xl" logo={LOGO} status="active" />
        </Row>
      </div>
      <div>
        <Label>Rounded, at every size — the dot is 10/64 of the avatar, the ring 1/16</Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => <Avatar key={s} name="Acme Corp" shape="rounded" size={s} status="active" />)}
        </Row>
      </div>
      <div>
        <Label>Circle, at every size</Label>
        <Row>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => <Avatar key={s} name="Sarah Johnson" size={s} status="active" />)}
        </Row>
      </div>
    </Group>
}`,...(te=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:te.source},description:{story:"A state on the corner — the console's presence dot on the organization mark, ringed in the card colour so it reads as a cut-out in both themes.",...(ie=(ne=u.parameters)==null?void 0:ne.docs)==null?void 0:ie.description}}};var de,le,ce,he,me;v.parameters={...v.parameters,docs:{...(de=v.parameters)==null?void 0:de.docs,source:{originalSource:`{
  name: 'With an edit button',
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => <Row>
      <Avatar name="Sarah Johnson" size="xl" shape="rounded" onEdit={() => {
      /* a story: the file is not kept */
    }} />
      <Avatar name="Acme Corp" size="xl" logo={LOGO} editLabel="Change logo" onEdit={() => {
      /* a story: the file is not kept */
    }} />
    </Row>
}`,...(ce=(le=v.parameters)==null?void 0:le.docs)==null?void 0:ce.source},description:{story:"The camera button on the corner — the console's profile drawer in edit mode. It opens the file picker; the chosen image is handed back.",...(me=(he=v.parameters)==null?void 0:he.docs)==null?void 0:me.description}}};const ze=["Default","Shapes","Sizes","Tones","WithPhoto","WithIcon","Stack","WithLogo","WithStatus","WithEditButton"];export{g as Default,l as Shapes,j as Sizes,p as Stack,c as Tones,v as WithEditButton,m as WithIcon,x as WithLogo,h as WithPhoto,u as WithStatus,ze as __namedExportsOrder,Ae as default};
//# sourceMappingURL=Avatar.stories-DL48K2uI.js.map
