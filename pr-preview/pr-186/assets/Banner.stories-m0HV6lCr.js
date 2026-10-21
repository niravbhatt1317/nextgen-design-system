import{j as e,r as re}from"./iframe-Efcjm0Tq.js";import{B as t}from"./Banner-DJ1I58xW.js";import{B as n}from"./Button-Duk-NGQd.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./feedback-tones-CRXuhnAx.js";import"./Icon-FX6dLAH1.js";import"./icon-at-drawn-size-BatxaPRs.js";const fe={title:"New Components/Banner",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A message that sits in the page and stays there.","","All four product teams built one, which puts it near the top of the gap list.","It is about the thing it sits above, it waits for you, and it can carry as many","actions as the situation actually needs.","","**It is not a Toast.** They share the six tones and the same palette deliberately —","a warning should look like a warning wherever it appears. Everything about how they","behave is different, and that is what decides which one a screen should use.","","| | Toast | Banner |","| --- | --- | --- |","| Where it is | Floating over the page, in a corner | In the layout, where it belongs |","| How it leaves | On a timer, or swiped away | Only when the reason has gone |","| What it is about | Something that just happened | The state of the thing it sits above |","| Actions | One at most — there is no time for two | As many as the situation needs |","| Announced as | A live region — it interrupts | A region in the page — read in order |","","**The one-line test:** if you would still need the message after a refresh, it is a banner."].join(`
`)}}},argTypes:{tone:{control:"select",options:["neutral","info","success","warning","danger","ai"]},placement:{control:"inline-radio",options:["inline","page"]},actionPlacement:{control:"inline-radio",options:["auto","inline","below"]},title:{control:"text"},description:{control:"text"},actions:{control:!1},icon:{control:!1},onDismiss:{control:!1}},args:{tone:"warning",title:"Your trial ends in 3 days",description:"After that, agents keep read-only access until a plan is chosen."}},a=({children:s})=>e.jsx("div",{className:"mdt-flex mdt-max-w-3xl mdt-flex-col mdt-gap-3",children:s}),i=({children:s})=>e.jsx("p",{className:"mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-muted-foreground",children:s}),g={args:{onDismiss:()=>{},actions:e.jsx(n,{variant:"ghost",size:"sm",children:"Choose a plan"})}},oe=[{tone:"neutral",title:"Retention is set by the platform, not by this org"},{tone:"info",title:"Maintenance on Sunday, 02:00–04:00 UTC"},{tone:"success",title:"All 1,204 assets imported"},{tone:"warning",title:"Two agents have not signed in for 90 days"},{tone:"danger",title:"Sync has been failing since 14:20"},{tone:"ai",title:"Three tickets look like duplicates of INC-4471"}],r={parameters:{controls:{disable:!0}},render:()=>e.jsx(a,{children:oe.map(({tone:s,title:o})=>e.jsx(t,{tone:s,title:o,onDismiss:()=>{}},s))})},d={name:"With a description",parameters:{controls:{disable:!0}},render:()=>e.jsx(a,{children:e.jsx(t,{tone:"danger",title:"Sync has been failing since 14:20",description:"Six runs in a row returned 403 from the connector. Nothing new has come in since.",onDismiss:()=>{}})})},l={name:"With actions",parameters:{controls:{disable:!0}},render:()=>e.jsxs(a,{children:[e.jsxs("div",{children:[e.jsx(i,{children:"One action — sits beside the words, on the banner’s centre line"}),e.jsx(t,{tone:"warning",title:"Your trial ends in 3 days",description:"After that, agents keep read-only access until a plan is chosen.",actions:e.jsx(n,{variant:"ghost",size:"sm",children:"Choose a plan"}),onDismiss:()=>{}})]}),e.jsxs("div",{children:[e.jsx(i,{children:"Two actions — drop to their own line. A link is the quieter of the two."}),e.jsx(t,{tone:"info",title:"A newer agent build is available",description:"Version 4.18 fixes the discovery timeout on large subnets.",actions:e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"link",size:"sm",children:"Read the notes"}),e.jsx(n,{variant:"ghost",size:"sm",children:"Update all agents"})]}),onDismiss:()=>{}})]}),e.jsxs("div",{children:[e.jsx(i,{children:"A link on its own, for somewhere very tight"}),e.jsx(t,{tone:"ai",title:"Three tickets look like duplicates of INC-4471",actions:e.jsx(n,{variant:"link",size:"sm",children:"Review"}),onDismiss:()=>{}})]}),e.jsxs("div",{children:[e.jsx(i,{children:"The same ghost on every tone — no ground to clash with any of them"}),e.jsx(a,{children:oe.map(({tone:s,title:o})=>e.jsx(t,{tone:s,title:o,actions:e.jsx(n,{variant:"ghost",size:"sm",children:"Take a look"}),onDismiss:()=>{}},s))})]})]})},c={name:"Where the actions go",parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-max-w-sm mdt-flex-col mdt-gap-5",children:[e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Shown in a narrow column, which is where the difference actually matters."}),e.jsxs("div",{children:[e.jsx(i,{children:"auto — one action, so it stays beside"}),e.jsx(t,{tone:"warning",title:"Your trial ends in 3 days",actions:e.jsx(n,{variant:"ghost",size:"sm",children:"Choose a plan"}),onDismiss:()=>{}})]}),e.jsxs("div",{children:[e.jsx(i,{children:"below — forced down, for a long message"}),e.jsx(t,{tone:"warning",title:"Your trial ends in 3 days",description:"After that, agents keep read-only access until a plan is chosen.",actionPlacement:"below",actions:e.jsx(n,{variant:"ghost",size:"sm",children:"Choose a plan"}),onDismiss:()=>{}})]}),e.jsxs("div",{children:[e.jsx(i,{children:"inline — held beside, even with two. It gets tight."}),e.jsx(t,{tone:"info",title:"A newer agent build is available",actionPlacement:"inline",actions:e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"link",size:"sm",children:"Notes"}),e.jsx(n,{variant:"ghost",size:"sm",children:"Update"})]}),onDismiss:()=>{}})]})]})},h={parameters:{controls:{disable:!0}},render:function(){const[o,v]=re.useState(!0);return e.jsx(a,{children:o?e.jsx(t,{tone:"success",title:"All 1,204 assets imported",description:"Nothing was skipped. The report is in Exports.",actions:e.jsx(n,{variant:"ghost",size:"sm",children:"Open the report"}),onDismiss:()=>{v(!1)}}):e.jsx(n,{variant:"outline",size:"sm",onClick:()=>{v(!0)},children:"Bring it back"})})}},m={parameters:{controls:{disable:!0},layout:"fullscreen"},render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-8 mdt-p-6",children:[e.jsxs("div",{children:[e.jsx(i,{children:"page — across the top of a view"}),e.jsxs("div",{className:"mdt-overflow-hidden mdt-rounded-lg mdt-border mdt-border-border",children:[e.jsx(t,{placement:"page",tone:"danger",title:"Sync has been failing since 14:20",actions:e.jsx(n,{variant:"ghost",size:"sm",children:"Check the connector"}),onDismiss:()=>{}}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3 mdt-p-5",children:[e.jsx("div",{className:"mdt-h-2 mdt-w-2/5 mdt-rounded-full mdt-bg-muted"}),e.jsx("div",{className:"mdt-h-2 mdt-w-3/4 mdt-rounded-full mdt-bg-muted"}),e.jsx("div",{className:"mdt-h-2 mdt-w-1/2 mdt-rounded-full mdt-bg-muted"})]})]})]}),e.jsxs("div",{children:[e.jsx(i,{children:"inline — inside a panel or a form"}),e.jsx("div",{className:"mdt-max-w-3xl",children:e.jsx(t,{tone:"danger",title:"Sync has been failing since 14:20",actions:e.jsx(n,{variant:"ghost",size:"sm",children:"Check the connector"}),onDismiss:()=>{}})})]})]})},u={name:"A different glyph, or none",parameters:{controls:{disable:!0}},render:()=>e.jsxs(a,{children:[e.jsx(t,{tone:"neutral",icon:null,title:"Retention is set by the platform",onDismiss:()=>{}}),e.jsx(t,{tone:"info",icon:e.jsx("span",{"aria-hidden":!0,children:"🛠️"}),title:"Maintenance on Sunday, 02:00–04:00 UTC",onDismiss:()=>{}})]})},p={name:"When the text wraps",parameters:{controls:{disable:!0}},render:()=>e.jsx("div",{className:"mdt-max-w-md",children:e.jsx(t,{tone:"warning",title:"Two agents have not signed in for 90 days",description:"Agents that stay dormant past 120 days are archived automatically, and archived agents keep their history but stop counting towards the seat total on the next billing run.",actions:e.jsx(n,{variant:"ghost",size:"sm",children:"Review agents"}),onDismiss:()=>{}})})};var f,w,x;g.parameters={...g.parameters,docs:{...(f=g.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    onDismiss: () => undefined,
    actions: <Button variant="ghost" size="sm">
        Choose a plan
      </Button>
  }
}`,...(x=(w=g.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var b,y,j,k,B;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      {TONES.map(({
      tone,
      title
    }) => <Banner key={tone} tone={tone} title={title} onDismiss={() => undefined} />)}
    </Stack>
}`,...(j=(y=r.parameters)==null?void 0:y.docs)==null?void 0:j.source},description:{story:`Only the icon carries the tone. **The words stay one colour in every tone**,
so a danger banner is not also harder to read than an info one — the same
rule Toast already follows.`,...(B=(k=r.parameters)==null?void 0:k.docs)==null?void 0:B.description}}};var S,D,N,A,T;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'With a description',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <Banner tone="danger" title="Sync has been failing since 14:20" description="Six runs in a row returned 403 from the connector. Nothing new has come in since." onDismiss={() => undefined} />
    </Stack>
}`,...(N=(D=d.parameters)==null?void 0:D.docs)==null?void 0:N.source},description:{story:"A second line, for when the headline is not the whole story.",...(T=(A=d.parameters)==null?void 0:A.docs)==null?void 0:T.description}}};var z,C,L,W,O;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: 'With actions',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <div>
        <Label>One action — sits beside the words, on the banner’s centre line</Label>
        <Banner tone="warning" title="Your trial ends in 3 days" description="After that, agents keep read-only access until a plan is chosen." actions={<Button variant="ghost" size="sm">
              Choose a plan
            </Button>} onDismiss={() => undefined} />
      </div>
      <div>
        <Label>Two actions — drop to their own line. A link is the quieter of the two.</Label>
        <Banner tone="info" title="A newer agent build is available" description="Version 4.18 fixes the discovery timeout on large subnets." actions={<>
              <Button variant="link" size="sm">
                Read the notes
              </Button>
              <Button variant="ghost" size="sm">
                Update all agents
              </Button>
            </>} onDismiss={() => undefined} />
      </div>
      <div>
        <Label>A link on its own, for somewhere very tight</Label>
        <Banner tone="ai" title="Three tickets look like duplicates of INC-4471" actions={<Button variant="link" size="sm">
              Review
            </Button>} onDismiss={() => undefined} />
      </div>
      <div>
        <Label>The same ghost on every tone — no ground to clash with any of them</Label>
        <Stack>
          {TONES.map(({
          tone,
          title
        }) => <Banner key={tone} tone={tone} title={title} actions={<Button variant="ghost" size="sm">
                  Take a look
                </Button>} onDismiss={() => undefined} />)}
        </Stack>
      </div>
    </Stack>
}`,...(L=(C=l.parameters)==null?void 0:C.docs)==null?void 0:L.source},description:{story:`**\`ghost\` only, with \`link\` where it is genuinely tight.** Nothing with a
ground of its own.

Two reasons, and they stack. A solid button is the loudest thing on a page and
a banner is not the page — put one in a warning and it outranks the Save button
the person came for. And a fill has to be *some* colour: every ground the
library has is tuned for the white page, so on a cream or a green surface it
reads as a chip borrowed from another screen. A ghost has no ground, so there
is nothing to clash and nothing to invent.

With two actions, the **link is the quieter one** and goes first. Anything
filled is warned about while you build.`,...(O=(W=l.parameters)==null?void 0:W.docs)==null?void 0:O.description}}};var I,R,P,E,U;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  name: 'Where the actions go',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="mdt-flex mdt-max-w-sm mdt-flex-col mdt-gap-5">
      <p className="mdt-text-xs mdt-text-muted-foreground">
        Shown in a narrow column, which is where the difference actually matters.
      </p>
      <div>
        <Label>auto — one action, so it stays beside</Label>
        <Banner tone="warning" title="Your trial ends in 3 days" actions={<Button variant="ghost" size="sm">
              Choose a plan
            </Button>} onDismiss={() => undefined} />
      </div>
      <div>
        <Label>below — forced down, for a long message</Label>
        <Banner tone="warning" title="Your trial ends in 3 days" description="After that, agents keep read-only access until a plan is chosen." actionPlacement="below" actions={<Button variant="ghost" size="sm">
              Choose a plan
            </Button>} onDismiss={() => undefined} />
      </div>
      <div>
        <Label>inline — held beside, even with two. It gets tight.</Label>
        <Banner tone="info" title="A newer agent build is available" actionPlacement="inline" actions={<>
              <Button variant="link" size="sm">
                Notes
              </Button>
              <Button variant="ghost" size="sm">
                Update
              </Button>
            </>} onDismiss={() => undefined} />
      </div>
    </div>
}`,...(P=(R=c.parameters)==null?void 0:R.docs)==null?void 0:P.source},description:{story:`The rule in one line: **one action sits beside the words, two or more go on
their own line.** It is counted, never measured, so the same banner always
renders the same way.

Override it when several banners stack and you want them all one height, or
when the message is long enough that even one action should drop.`,...(U=(E=c.parameters)==null?void 0:E.docs)==null?void 0:U.description}}};var Y,M,q,F,V;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: function Render() {
    const [shown, setShown] = useState(true);
    return <Stack>
        {shown ? <Banner tone="success" title="All 1,204 assets imported" description="Nothing was skipped. The report is in Exports." actions={<Button variant="ghost" size="sm">
                Open the report
              </Button>} onDismiss={() => {
        setShown(false);
      }} /> : <Button variant="outline" size="sm" onClick={() => {
        setShown(true);
      }}>
            Bring it back
          </Button>}
      </Stack>;
  }
}`,...(q=(M=h.parameters)==null?void 0:M.docs)==null?void 0:q.source},description:{story:`The cross means *"I have read this"*, never *"I have dealt with it"* — so it
is always last and it is never counted as one of the actions.

Leave \`onDismiss\` out entirely for a banner that has to stay until the reason
for it has gone.`,...(V=(F=h.parameters)==null?void 0:F.docs)==null?void 0:V.description}}};var _,H,G,J,K;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'fullscreen'
  },
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-8 mdt-p-6">
      <div>
        <Label>page — across the top of a view</Label>
        <div className="mdt-overflow-hidden mdt-rounded-lg mdt-border mdt-border-border">
          <Banner placement="page" tone="danger" title="Sync has been failing since 14:20" actions={<Button variant="ghost" size="sm">
                Check the connector
              </Button>} onDismiss={() => undefined} />
          <div className="mdt-flex mdt-flex-col mdt-gap-3 mdt-p-5">
            <div className="mdt-h-2 mdt-w-2/5 mdt-rounded-full mdt-bg-muted" />
            <div className="mdt-h-2 mdt-w-3/4 mdt-rounded-full mdt-bg-muted" />
            <div className="mdt-h-2 mdt-w-1/2 mdt-rounded-full mdt-bg-muted" />
          </div>
        </div>
      </div>
      <div>
        <Label>inline — inside a panel or a form</Label>
        <div className="mdt-max-w-3xl">
          <Banner tone="danger" title="Sync has been failing since 14:20" actions={<Button variant="ghost" size="sm">
                Check the connector
              </Button>} onDismiss={() => undefined} />
        </div>
      </div>
    </div>
}`,...(G=(H=m.parameters)==null?void 0:H.docs)==null?void 0:G.source},description:{story:"`page` runs the banner edge to edge across the top of a view — no rounding,\nbecause there is nothing beside it to be rounded against. Neither placement\nwears an edge; the tint alone marks it out.",...(K=(J=m.parameters)==null?void 0:J.docs)==null?void 0:K.description}}};var Q,X,Z,$,ee;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: 'A different glyph, or none',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Stack>
      <Banner tone="neutral" icon={null} title="Retention is set by the platform" onDismiss={() => undefined} />
      <Banner tone="info" icon={<span aria-hidden>🛠️</span>} title="Maintenance on Sunday, 02:00–04:00 UTC" onDismiss={() => undefined} />
    </Stack>
}`,...(Z=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:"Pass your own glyph, or `null` to drop it. Dropping it is worth considering\nfor `neutral`, where the message is a statement of fact rather than a state.",...(ee=($=u.parameters)==null?void 0:$.docs)==null?void 0:ee.description}}};var te,ne,se,ie,ae;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:`{
  name: 'When the text wraps',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="mdt-max-w-md">
      <Banner tone="warning" title="Two agents have not signed in for 90 days" description="Agents that stay dormant past 120 days are archived automatically, and archived agents keep their history but stop counting towards the seat total on the next billing run." actions={<Button variant="ghost" size="sm">
            Review agents
          </Button>} onDismiss={() => undefined} />
    </div>
}`,...(se=(ne=p.parameters)==null?void 0:ne.docs)==null?void 0:se.source},description:{story:`The glyph sits in a box exactly one line tall, so on a single line everything
shares one centre and the moment the text wraps the glyph stays beside the
**first** line rather than halfway down a paragraph. One rule, both
behaviours.`,...(ae=(ie=p.parameters)==null?void 0:ie.docs)==null?void 0:ae.description}}};const we=["Default","Tones","WithDescription","WithActions","ActionPlacement","Dismissible","Placement","CustomIcon","LongMessage"];export{c as ActionPlacement,u as CustomIcon,g as Default,h as Dismissible,p as LongMessage,m as Placement,r as Tones,l as WithActions,d as WithDescription,we as __namedExportsOrder,fe as default};
//# sourceMappingURL=Banner.stories-m0HV6lCr.js.map
