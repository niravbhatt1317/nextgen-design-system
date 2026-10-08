import{j as e}from"./iframe-DZn6zJ_A.js";import{B as n}from"./Button-CQwv0u3c.js";import"./index-DXf-30mB.js";import{I as a}from"./Icon-C7A5kxOO.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";const{expect:de,fn:ue,userEvent:he,within:pe}=__STORYBOOK_MODULE_TEST__,v=["primary","secondary","outline","ghost","destructive","destructiveGhost","link"],le=["sm","md","lg"],o=({children:t})=>e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:12,alignItems:"center"},children:t}),g=({children:t})=>e.jsx("div",{style:{display:"grid",gap:18},children:t}),r=({children:t})=>e.jsx("div",{style:{font:"600 11px/1 ui-monospace, monospace",letterSpacing:"0.08em",textTransform:"uppercase",color:"hsl(var(--mdt-neutral-70))",marginBottom:10},children:t}),je={title:"New Components/Button",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`**Behaviour reference — Claude artifacts:** [Button Variants](https://claude.ai/code/artifact/2418ec74-6852-43bf-9001-d028a8fccddf), every look, state and size on one live page, and [Button Spec](https://claude.ai/code/artifact/9e5401f0-4c01-49c5-8b1e-6072cd630e8c), the measurements drawn out. Open them to see how this component is meant to behave — they are what it was designed and approved from.

The merged console button. Seven looks, three heights of 28, 32 and 36, one text size of 13/20 and one glyph size of 16 at a 1.5 stroke. The height is not set directly: it comes from the 20px line the label sits on, so 6 above and 6 below make 32. Padding is decided by what meets each edge — 16 against a word, 12 against a glyph — which is why a button with a leading glyph is 12 on the left and 16 on the right. Hover and press move along the neutral ramp rather than fading the fill, because fading lightens a colour against a white page and costs the label its contrast.`}}},argTypes:{variant:{control:"select",options:v,description:"The look, loudest to quietest"},size:{control:"inline-radio",options:le,description:"28, 32 or 36 tall"},children:{control:"text",description:"The label"},iconOnly:{control:"boolean",description:"A square holding one glyph and no label"},loading:{control:"boolean",description:"Busy: the disabled face with a spinner on it"},loadingText:{control:"text",description:"Swap the label while working"},disabled:{control:"boolean"},fullWidth:{control:"boolean"},active:{control:"boolean",description:"Held on, the way an applied filter looks"},href:{control:"text",description:"Render an anchor instead of a button"},ariaLabel:{control:"text",description:"Required when iconOnly leaves no label to read"},leftIcon:{control:!1},rightIcon:{control:!1}},args:{children:"Invite users",onClick:ue()}},i={args:{variant:"primary",size:"md",leftIcon:e.jsx(a,{name:"plus"})}},s={parameters:{controls:{disable:!0}},render:()=>e.jsxs(g,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"With a leading glyph"}),e.jsx(o,{children:v.map(t=>e.jsx(n,{variant:t,leftIcon:t==="link"?void 0:e.jsx(a,{name:"plus"}),children:t},t))})]}),e.jsxs("div",{children:[e.jsx(r,{children:"Icon only"}),e.jsx(o,{children:v.filter(t=>t!=="link").map(t=>e.jsx(n,{variant:t,iconOnly:!0,ariaLabel:`${t} row actions`,leftIcon:e.jsx(a,{name:"more-vertical"})},t))})]})]})},l={parameters:{controls:{disable:!0}},render:()=>e.jsx(g,{children:le.map(t=>e.jsxs("div",{children:[e.jsx(r,{children:t==="sm"?"28":t==="md"?"32 · default":"36"}),e.jsxs(o,{children:[e.jsx(n,{size:t,leftIcon:e.jsx(a,{name:"plus"}),children:"Invite users"}),e.jsx(n,{size:t,variant:"secondary",children:"Secondary"}),e.jsx(n,{size:t,variant:"outline",children:"Outline"}),e.jsx(n,{size:t,variant:"ghost",children:"Ghost"}),e.jsx(n,{size:t,variant:"outline",iconOnly:!0,ariaLabel:"Row actions",leftIcon:e.jsx(a,{name:"more-vertical"})})]})]},t))})},c={parameters:{controls:{disable:!0}},render:()=>e.jsxs(g,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"text only · 16 / 16"}),e.jsxs(o,{children:[e.jsx(n,{children:"Invite users"}),e.jsx(n,{variant:"outline",children:"Cancel"})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"glyph, then text · 12 / 16"}),e.jsxs(o,{children:[e.jsx(n,{leftIcon:e.jsx(a,{name:"plus"}),children:"Invite users"}),e.jsx(n,{variant:"outline",leftIcon:e.jsx(a,{name:"filter"}),children:"More filters"})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"text, then glyph · 16 / 12"}),e.jsxs(o,{children:[e.jsx(n,{rightIcon:e.jsx(a,{name:"chevron-down"}),children:"25 rows per page"}),e.jsx(n,{variant:"outline",rightIcon:e.jsx(a,{name:"chevron-down"}),children:"Sort by"})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"glyph both sides · 12 / 12"}),e.jsx(o,{children:e.jsx(n,{leftIcon:e.jsx(a,{name:"plus"}),rightIcon:e.jsx(a,{name:"chevron-down"}),children:"Invite users"})})]}),e.jsxs("div",{children:[e.jsx(r,{children:"icon only · a square the height of its size"}),e.jsxs(o,{children:[e.jsx(n,{iconOnly:!0,ariaLabel:"Row actions",leftIcon:e.jsx(a,{name:"more-vertical"})}),e.jsx(n,{variant:"outline",iconOnly:!0,ariaLabel:"Manage columns",leftIcon:e.jsx(a,{name:"sliders"})}),e.jsx(n,{variant:"ghost",iconOnly:!0,ariaLabel:"Close",leftIcon:e.jsx(a,{name:"x"})})]})]})]})},d={parameters:{controls:{disable:!0}},render:()=>e.jsxs(g,{children:[e.jsxs("div",{children:[e.jsx(r,{children:"working"}),e.jsxs(o,{children:[e.jsx(n,{loading:!0,loadingText:"Sending…",children:"Send invite"}),e.jsx(n,{variant:"outline",loading:!0,children:"Cancel"}),e.jsx(n,{variant:"destructive",loading:!0,loadingText:"Deleting…",children:"Delete user"}),e.jsx(n,{iconOnly:!0,loading:!0,ariaLabel:"Working",leftIcon:e.jsx(a,{name:"more-vertical"})})]})]}),e.jsxs("div",{children:[e.jsx(r,{children:"disabled"}),e.jsxs(o,{children:[e.jsx(n,{disabled:!0,children:"Send invite"}),e.jsx(n,{variant:"outline",disabled:!0,children:"Cancel"}),e.jsx(n,{variant:"destructive",disabled:!0,children:"Delete user"}),e.jsx(n,{iconOnly:!0,disabled:!0,ariaLabel:"Row actions",leftIcon:e.jsx(a,{name:"more-vertical"})})]})]})]})},u={parameters:{controls:{disable:!0}},render:()=>e.jsx(o,{children:v.filter(t=>t!=="link").map(t=>e.jsx(n,{variant:t,leftIcon:e.jsx(a,{name:"plus"}),children:t},t))}),play:async({canvasElement:t})=>{const ce=pe(t);await he.tab(),await de(ce.getByRole("button",{name:/primary/i})).toHaveFocus()}},h={parameters:{controls:{disable:!0}},render:()=>e.jsxs(o,{children:[e.jsx(n,{variant:"outline",iconOnly:!0,ariaLabel:"Filter by status",leftIcon:e.jsx(a,{name:"filter"})}),e.jsx(n,{variant:"outline",active:!0,iconOnly:!0,ariaLabel:"Filter by status, applied",leftIcon:e.jsx(a,{name:"filter"})}),e.jsx(n,{variant:"ghost",children:"Not applied"}),e.jsx(n,{variant:"ghost",active:!0,children:"Applied"})]})},p={parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{style:{fontSize:13,color:"hsl(var(--mdt-neutral-90))"},children:["Drop a file here, or"," ",e.jsx(n,{variant:"link",href:"https://example.com",target:"_blank",children:"select one from your computer"}),"."]})},m={parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{style:{width:320,display:"grid",gap:10},children:[e.jsx(n,{fullWidth:!0,leftIcon:e.jsx(a,{name:"plus"}),children:"Invite users"}),e.jsx(n,{fullWidth:!0,variant:"outline",children:"Cancel"})]})};var x,b,y,f,j;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    leftIcon: <Icon name="plus" />
  }
}`,...(y=(b=i.parameters)==null?void 0:b.docs)==null?void 0:y.source},description:{story:"Change anything in the controls panel.",...(j=(f=i.parameters)==null?void 0:f.docs)==null?void 0:j.description}}};var w,I,B,k,S;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>With a leading glyph</Label>
        <Row>
          {VARIANTS.map(v => <Button key={v} variant={v} leftIcon={v === 'link' ? undefined : <Icon name="plus" />}>
              {v}
            </Button>)}
        </Row>
      </div>
      <div>
        <Label>Icon only</Label>
        <Row>
          {VARIANTS.filter(v => v !== 'link').map(v => <Button key={v} variant={v} iconOnly ariaLabel={\`\${v} row actions\`} leftIcon={<Icon name="more-vertical" />} />)}
        </Row>
      </div>
    </Stack>
}`,...(B=(I=s.parameters)==null?void 0:I.docs)==null?void 0:B.source},description:{story:"Seven looks. `secondary` is a quiet fill with no border, which is what keeps\nit apart from `outline` — together with `primary` that gives three volumes a\nreader can rank without reading the labels.",...(S=(k=s.parameters)==null?void 0:k.docs)==null?void 0:S.description}}};var L,R,O,z,A;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      {SIZES.map(s => <div key={s}>
          <Label>{s === 'sm' ? '28' : s === 'md' ? '32 · default' : '36'}</Label>
          <Row>
            <Button size={s} leftIcon={<Icon name="plus" />}>
              Invite users
            </Button>
            <Button size={s} variant="secondary">
              Secondary
            </Button>
            <Button size={s} variant="outline">
              Outline
            </Button>
            <Button size={s} variant="ghost">
              Ghost
            </Button>
            <Button size={s} variant="outline" iconOnly ariaLabel="Row actions" leftIcon={<Icon name="more-vertical" />} />
          </Row>
        </div>)}
    </Stack>
}`,...(O=(R=l.parameters)==null?void 0:R.docs)==null?void 0:O.source},description:{story:`Text, glyph, gap and side padding never change. Only the air above and below
moves, so the same words make the same width at every size.`,...(A=(z=l.parameters)==null?void 0:z.docs)==null?void 0:A.description}}};var T,W,C,D,E;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>text only · 16 / 16</Label>
        <Row>
          <Button>Invite users</Button>
          <Button variant="outline">Cancel</Button>
        </Row>
      </div>
      <div>
        <Label>glyph, then text · 12 / 16</Label>
        <Row>
          <Button leftIcon={<Icon name="plus" />}>Invite users</Button>
          <Button variant="outline" leftIcon={<Icon name="filter" />}>
            More filters
          </Button>
        </Row>
      </div>
      <div>
        <Label>text, then glyph · 16 / 12</Label>
        <Row>
          <Button rightIcon={<Icon name="chevron-down" />}>25 rows per page</Button>
          <Button variant="outline" rightIcon={<Icon name="chevron-down" />}>
            Sort by
          </Button>
        </Row>
      </div>
      <div>
        <Label>glyph both sides · 12 / 12</Label>
        <Row>
          <Button leftIcon={<Icon name="plus" />} rightIcon={<Icon name="chevron-down" />}>
            Invite users
          </Button>
        </Row>
      </div>
      <div>
        <Label>icon only · a square the height of its size</Label>
        <Row>
          <Button iconOnly ariaLabel="Row actions" leftIcon={<Icon name="more-vertical" />} />
          <Button variant="outline" iconOnly ariaLabel="Manage columns" leftIcon={<Icon name="sliders" />} />
          <Button variant="ghost" iconOnly ariaLabel="Close" leftIcon={<Icon name="x" />} />
        </Row>
      </div>
    </Stack>
}`,...(C=(W=c.parameters)==null?void 0:W.docs)==null?void 0:C.source},description:{story:`Padding follows the edge: 16 against a word, 12 against a glyph. A button with
a glyph on both sides is 12 on both; one with words at both edges is 16.`,...(E=(D=c.parameters)==null?void 0:D.docs)==null?void 0:E.description}}};var F,_,N,V,q;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>working</Label>
        <Row>
          <Button loading loadingText="Sending…">
            Send invite
          </Button>
          <Button variant="outline" loading>
            Cancel
          </Button>
          <Button variant="destructive" loading loadingText="Deleting…">
            Delete user
          </Button>
          <Button iconOnly loading ariaLabel="Working" leftIcon={<Icon name="more-vertical" />} />
        </Row>
      </div>
      <div>
        <Label>disabled</Label>
        <Row>
          <Button disabled>Send invite</Button>
          <Button variant="outline" disabled>
            Cancel
          </Button>
          <Button variant="destructive" disabled>
            Delete user
          </Button>
          <Button iconOnly disabled ariaLabel="Row actions" leftIcon={<Icon name="more-vertical" />} />
        </Row>
      </div>
    </Stack>
}`,...(N=(_=d.parameters)==null?void 0:_.docs)==null?void 0:N.source},description:{story:`Working wears the disabled face on purpose. In both cases there is nothing for
the reader to do, so they look alike, and the turning glyph is the part that
says wait rather than no.`,...(q=(V=d.parameters)==null?void 0:V.docs)==null?void 0:q.description}}};var H,M,P,G,K;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Row>
      {VARIANTS.filter(v => v !== 'link').map(v => <Button key={v} variant={v} leftIcon={<Icon name="plus" />}>
          {v}
        </Button>)}
    </Row>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole('button', {
      name: /primary/i
    })).toHaveFocus();
  }
}`,...(P=(M=u.parameters)==null?void 0:M.docs)==null?void 0:P.source},description:{story:`Keyboard focus lights the button's own edge and lifts its fill. Nothing is
drawn outside the box, so the mark can never touch a neighbour and the layout
never moves. Press Tab to walk it along the row.`,...(K=(G=u.parameters)==null?void 0:G.docs)==null?void 0:K.description}}};var Z,$,U,Y,J;h.parameters={...h.parameters,docs:{...(Z=h.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Row>
      <Button variant="outline" iconOnly ariaLabel="Filter by status" leftIcon={<Icon name="filter" />} />
      <Button variant="outline" active iconOnly ariaLabel="Filter by status, applied" leftIcon={<Icon name="filter" />} />
      <Button variant="ghost">Not applied</Button>
      <Button variant="ghost" active>
        Applied
      </Button>
    </Row>
}`,...(U=($=h.parameters)==null?void 0:$.docs)==null?void 0:U.source},description:{story:"Held on, the way a toolbar control looks once its filter is applied.",...(J=(Y=h.parameters)==null?void 0:Y.docs)==null?void 0:J.description}}};var Q,X,ee,ne,te;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    fontSize: 13,
    color: 'hsl(var(--mdt-neutral-90))'
  }}>
      Drop a file here, or{' '}
      <Button variant="link" href="https://example.com" target="_blank">
        select one from your computer
      </Button>
      .
    </div>
}`,...(ee=(X=p.parameters)==null?void 0:X.docs)==null?void 0:ee.source},description:{story:"A link is not a button shape. It takes no padding, and an outbound marker appears while the pointer is on it.",...(te=(ne=p.parameters)==null?void 0:ne.docs)==null?void 0:te.description}}};var ae,oe,re,ie,se;m.parameters={...m.parameters,docs:{...(ae=m.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div style={{
    width: 320,
    display: 'grid',
    gap: 10
  }}>
      <Button fullWidth leftIcon={<Icon name="plus" />}>
        Invite users
      </Button>
      <Button fullWidth variant="outline">
        Cancel
      </Button>
    </div>
}`,...(re=(oe=m.parameters)==null?void 0:oe.docs)==null?void 0:re.source},description:{story:"Stretches to its parent, the way a drawer footer's confirm does.",...(se=(ie=m.parameters)==null?void 0:ie.docs)==null?void 0:se.description}}};const we=["Playground","AllVariants","Sizes","WithAndWithoutIcons","WorkingAndDisabled","Focus","Active","AsLink","FullWidth"];export{h as Active,s as AllVariants,p as AsLink,u as Focus,m as FullWidth,i as Playground,l as Sizes,c as WithAndWithoutIcons,d as WorkingAndDisabled,we as __namedExportsOrder,je as default};
//# sourceMappingURL=Button.stories-u5NIFomc.js.map
