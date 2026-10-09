import{j as e}from"./iframe-DGfO5Tky.js";import{I as n}from"./IconTile-Dox8-d0y.js";import{I as s}from"./Icon-DdgFfEyY.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";const B={title:"New Components/IconTile",component:n,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A tinted container holding a single icon.","","Org Mgmt's audit calls this **the most duplicated inline pattern** in that system,","and records what leaving it inline cost: the warning foreground alternates between","two values, the success background between two more, and some sites reference","tokens that do not exist at all.","","Tones match `Avatar`, so a tile and an avatar side by side agree on what green means.","","Leave `aria-label` off and the tile is hidden from screen readers — right when the","icon only decorates something already labelled beside it."].join(`
`)}}},args:{icon:e.jsx(s,{name:"server"}),tone:"blue"}},t=({children:r})=>e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3",children:r}),q=({children:r})=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:r}),m=({children:r})=>e.jsx("p",{className:"mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:r}),a={},i={parameters:{controls:{disable:!0}},render:()=>e.jsxs(t,{children:[e.jsx(n,{icon:e.jsx(s,{name:"server"}),tone:"slate"}),e.jsx(n,{icon:e.jsx(s,{name:"database"}),tone:"blue"}),e.jsx(n,{icon:e.jsx(s,{name:"check-circle"}),tone:"green"}),e.jsx(n,{icon:e.jsx(s,{name:"alert-triangle"}),tone:"amber"}),e.jsx(n,{icon:e.jsx(s,{name:"x-circle"}),tone:"rose"}),e.jsx(n,{icon:e.jsx(s,{name:"sparkles"}),tone:"purple"})]})},c={parameters:{controls:{disable:!0}},render:()=>e.jsxs(q,{children:[e.jsxs("div",{children:[e.jsx(m,{children:"square"}),e.jsxs(t,{children:[e.jsx(n,{icon:e.jsx(s,{name:"server"}),tone:"blue",shape:"square"}),e.jsx(n,{icon:e.jsx(s,{name:"check-circle"}),tone:"green",shape:"square"}),e.jsx(n,{icon:e.jsx(s,{name:"alert-triangle"}),tone:"amber",shape:"square"})]})]}),e.jsxs("div",{children:[e.jsx(m,{children:"circle"}),e.jsxs(t,{children:[e.jsx(n,{icon:e.jsx(s,{name:"server"}),tone:"blue",shape:"circle"}),e.jsx(n,{icon:e.jsx(s,{name:"check-circle"}),tone:"green",shape:"circle"}),e.jsx(n,{icon:e.jsx(s,{name:"alert-triangle"}),tone:"amber",shape:"circle"})]})]})]})},l={parameters:{controls:{disable:!0}},render:()=>e.jsxs(q,{children:[e.jsxs("div",{children:[e.jsx(m,{children:"square"}),e.jsxs(t,{children:[e.jsx(n,{icon:e.jsx(s,{name:"server",size:"xs"}),tone:"blue",size:"sm"}),e.jsx(n,{icon:e.jsx(s,{name:"server",size:"sm"}),tone:"blue",size:"md"}),e.jsx(n,{icon:e.jsx(s,{name:"server",size:"md"}),tone:"blue",size:"lg"}),e.jsx(n,{icon:e.jsx(s,{name:"server",size:"lg"}),tone:"blue",size:"xl"}),e.jsx(n,{icon:e.jsx(s,{name:"server",size:"lg"}),tone:"blue",size:"2xl"})]})]}),e.jsxs("div",{children:[e.jsx(m,{children:"circle"}),e.jsxs(t,{children:[e.jsx(n,{icon:e.jsx(s,{name:"server",size:"xs"}),tone:"purple",shape:"circle",size:"sm"}),e.jsx(n,{icon:e.jsx(s,{name:"server",size:"sm"}),tone:"purple",shape:"circle",size:"md"}),e.jsx(n,{icon:e.jsx(s,{name:"server",size:"md"}),tone:"purple",shape:"circle",size:"lg"}),e.jsx(n,{icon:e.jsx(s,{name:"server",size:"lg"}),tone:"purple",shape:"circle",size:"xl"})]})]})]})},o={name:"Alongside content",parameters:{controls:{disable:!0}},render:()=>e.jsx("div",{className:"mdt-flex mdt-w-96 mdt-flex-col mdt-gap-3",children:[{icon:"server",tone:"blue",title:"prod-db-01",meta:"10.4.22.9"},{icon:"check-circle",tone:"green",title:"Backup complete",meta:"2 minutes ago"},{icon:"alert-triangle",tone:"amber",title:"Certificate expiring",meta:"in 6 days"}].map(r=>e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-border mdt-border-border mdt-p-3",children:[e.jsx(n,{icon:e.jsx(s,{name:r.icon,size:"sm"}),tone:r.tone,size:"lg"}),e.jsxs("div",{className:"mdt-flex mdt-flex-col",children:[e.jsx("span",{className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:r.title}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:r.meta})]})]},r.title))})};var d,p,x;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(x=(p=a.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var u,j,h;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Row>
      <IconTile icon={<Icon name="server" />} tone="slate" />
      <IconTile icon={<Icon name="database" />} tone="blue" />
      <IconTile icon={<Icon name="check-circle" />} tone="green" />
      <IconTile icon={<Icon name="alert-triangle" />} tone="amber" />
      <IconTile icon={<Icon name="x-circle" />} tone="rose" />
      <IconTile icon={<Icon name="sparkles" />} tone="purple" />
    </Row>
}`,...(h=(j=i.parameters)==null?void 0:j.docs)==null?void 0:h.source}}};var g,b,v;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Group>
      <div>
        <Label>square</Label>
        <Row>
          <IconTile icon={<Icon name="server" />} tone="blue" shape="square" />
          <IconTile icon={<Icon name="check-circle" />} tone="green" shape="square" />
          <IconTile icon={<Icon name="alert-triangle" />} tone="amber" shape="square" />
        </Row>
      </div>
      <div>
        <Label>circle</Label>
        <Row>
          <IconTile icon={<Icon name="server" />} tone="blue" shape="circle" />
          <IconTile icon={<Icon name="check-circle" />} tone="green" shape="circle" />
          <IconTile icon={<Icon name="alert-triangle" />} tone="amber" shape="circle" />
        </Row>
      </div>
    </Group>
}`,...(v=(b=c.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var I,z,f;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Group>
      <div>
        <Label>square</Label>
        <Row>
          <IconTile icon={<Icon name="server" size="xs" />} tone="blue" size="sm" />
          <IconTile icon={<Icon name="server" size="sm" />} tone="blue" size="md" />
          <IconTile icon={<Icon name="server" size="md" />} tone="blue" size="lg" />
          <IconTile icon={<Icon name="server" size="lg" />} tone="blue" size="xl" />
          <IconTile icon={<Icon name="server" size="lg" />} tone="blue" size="2xl" />
        </Row>
      </div>
      <div>
        <Label>circle</Label>
        <Row>
          <IconTile icon={<Icon name="server" size="xs" />} tone="purple" shape="circle" size="sm" />
          <IconTile icon={<Icon name="server" size="sm" />} tone="purple" shape="circle" size="md" />
          <IconTile icon={<Icon name="server" size="md" />} tone="purple" shape="circle" size="lg" />
          <IconTile icon={<Icon name="server" size="lg" />} tone="purple" shape="circle" size="xl" />
        </Row>
      </div>
    </Group>
}`,...(f=(z=l.parameters)==null?void 0:z.docs)==null?void 0:f.source}}};var T,w,k,N,R;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  name: 'Alongside content',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="mdt-flex mdt-w-96 mdt-flex-col mdt-gap-3">
      {[{
      icon: 'server',
      tone: 'blue',
      title: 'prod-db-01',
      meta: '10.4.22.9'
    }, {
      icon: 'check-circle',
      tone: 'green',
      title: 'Backup complete',
      meta: '2 minutes ago'
    }, {
      icon: 'alert-triangle',
      tone: 'amber',
      title: 'Certificate expiring',
      meta: 'in 6 days'
    }].map(r => <div key={r.title} className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-border mdt-border-border mdt-p-3">
          <IconTile icon={<Icon name={r.icon as 'server'} size="sm" />} tone={r.tone as 'blue'} size="lg" />
          <div className="mdt-flex mdt-flex-col">
            <span className="mdt-text-sm mdt-font-medium mdt-text-foreground">{r.title}</span>
            <span className="mdt-text-xs mdt-text-muted-foreground">{r.meta}</span>
          </div>
        </div>)}
    </div>
}`,...(k=(w=o.parameters)==null?void 0:w.docs)==null?void 0:k.source},description:{story:"Next to an avatar, to show the palettes agree.",...(R=(N=o.parameters)==null?void 0:N.docs)==null?void 0:R.description}}};const D=["Default","Tones","Shapes","Sizes","AlongsideContent"];export{o as AlongsideContent,a as Default,c as Shapes,l as Sizes,i as Tones,D as __namedExportsOrder,B as default};
//# sourceMappingURL=IconTile.stories-O6W7252o.js.map
