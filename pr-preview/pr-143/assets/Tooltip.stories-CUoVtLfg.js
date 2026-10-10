import{j as t,r as ct}from"./iframe-DQursvEH.js";import"./index-BgugIDqY.js";import{a as e,T as mt,b as o,c as n}from"./Tooltip-CgoohORF.js";import{B as i}from"./Button-Cshedlc1.js";import{C as ht,T as x}from"./TableCells-BKML4dv-.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CaJ7xKgI.js";import"./index-ak9MQ5Fc.js";import"./index-RA3EVs0n.js";import"./index-BQzdwuR5.js";import"./index-960YftBw.js";import"./index-DIh4lijD.js";import"./index-Zmfp1ZVX.js";import"./index-C3ZR67W0.js";import"./index-BDBuL6bf.js";import"./index-BOKC_ayS.js";import"./index-DaELAsqK.js";import"./index-BfA3i_mp.js";import"./index-C7NzNik3.js";import"./index-pcGP6OXW.js";import"./index-CcRgbaMz.js";import"./index-ChEho857.js";/* empty css              */import"./Badge-Etsd6AYb.js";import"./Avatar-DKSIfJFE.js";import"./Icon-CuII0BIc.js";const Mt={title:"New Components/Tooltip",component:e,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["A small dark bubble that names or explains the thing under the pointer. It opens on hover and on keyboard focus, sits on any side of its trigger, turns away from the screen edge, and follows the page as it scrolls. One look, two themes, no tones.","The merged console's bubble on the library's engine (7 September 2026): the console fill and text; the library's spacing, arrow, sides and delay handling. Two content pieces come from the console: `hint`, a quieter second line, and `items`, a list that scrolls past seven entries. Plain text wraps at 280px and reads centred.","Dark mode comes from the theme toggle in the toolbar: the fill and text swap through the tokens, nothing else changes."].join(`

`)}},controls:{exclude:["class"]}},argTypes:{instant:{control:"boolean",description:"No wait at all. For chips and counters that reveal a value.",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},open:{control:"boolean",description:"Drive the open state yourself",table:{type:{summary:"boolean"}}},defaultOpen:{control:"boolean",description:"Open when first rendered",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}},decorators:[r=>t.jsx(mt,{children:t.jsx("div",{className:"mdt-flex mdt-min-h-[200px] mdt-items-center mdt-justify-center",children:t.jsx(r,{})})})]},f=["Platform","Security","Finance","Design","Web","Support","Data","Sales","Ops","Product"],s={args:{defaultOpen:!1,instant:!1},render:r=>t.jsxs(e,{...r,children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"Hover me"})}),t.jsx(n,{children:"This is a helpful tooltip"})]})},a={render:()=>t.jsxs(e,{children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"No arrow"})}),t.jsx(n,{showArrow:!1,children:"Same bubble, arrow off"})]})},l={render:()=>t.jsxs("div",{className:"mdt-grid mdt-grid-cols-3 mdt-gap-4",children:[t.jsx("div",{}),t.jsxs(e,{children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"Top"})}),t.jsx(n,{side:"top",children:"Tooltip on top"})]}),t.jsx("div",{}),t.jsxs(e,{children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"Left"})}),t.jsx(n,{side:"left",children:"Tooltip on left"})]}),t.jsx("div",{}),t.jsxs(e,{children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"Right"})}),t.jsx(n,{side:"right",children:"Tooltip on right"})]}),t.jsx("div",{}),t.jsxs(e,{children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"Bottom"})}),t.jsx(n,{side:"bottom",children:"Tooltip on bottom"})]}),t.jsx("div",{})]})},d={render:()=>t.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:["start","center","end"].map(r=>t.jsxs(e,{children:[t.jsx(o,{asChild:!0,children:t.jsxs(i,{variant:"outline",className:"mdt-w-[280px]",children:['align="',r,'"']})}),t.jsxs(n,{align:r,children:["Aligned to the ",r]})]},r))})},p={render:()=>t.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-12",children:[t.jsx(ht,{email:"michael.smith@company.com",phone:"+1 415 555 0100"}),t.jsxs(e,{instant:!0,children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"Copy link"})}),t.jsx(n,{hint:"Click to copy the link",children:"company.com/invite/8f3k2"})]})]})},c={render:()=>t.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-12",children:[t.jsxs(e,{children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"Scheduled suspension"})}),t.jsx(n,{children:"This account is scheduled for suspension on 14 October 2026 because the last owner left the organisation."})]}),t.jsxs(e,{children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"Short"})}),t.jsx(n,{children:"Short copy stays on one line"})]})]})},m={render:()=>t.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-12",children:[t.jsx(x,{items:f.slice(0,5)}),t.jsx(x,{items:f,max:1})]})},h={render:()=>t.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-6",children:[t.jsxs(e,{children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"100ms"})}),t.jsx(n,{children:"Opens after the wait"})]}),t.jsxs(e,{instant:!0,children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",children:"Instant"})}),t.jsx(n,{children:"Opens at once"})]})]})},u={render:function(){const[T,g]=ct.useState(!0);return t.jsxs(e,{open:T,onOpenChange:g,children:[t.jsx(o,{asChild:!0,children:t.jsx(i,{variant:"outline",onClick:()=>{g(pt=>!pt)},children:T?"Close it":"Open it"})}),t.jsx(n,{children:"Held open by the page"})]})}};var C,j,v,b,y;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    defaultOpen: false,
    instant: false
  },
  render: args => <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>This is a helpful tooltip</TooltipContent>
    </Tooltip>
}`,...(v=(j=s.parameters)==null?void 0:j.docs)==null?void 0:v.source},description:{story:"Opens 100ms after the pointer arrives, or at once on keyboard focus: Tab to the button. Neighbouring triggers open without the wait. Escape closes it.",...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.description}}};var w,S,B,O,N;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">No arrow</Button>
      </TooltipTrigger>
      <TooltipContent showArrow={false}>Same bubble, arrow off</TooltipContent>
    </Tooltip>
}`,...(B=(S=a.parameters)==null?void 0:S.docs)==null?void 0:B.source},description:{story:"The same bubble with the arrow off. Sits 4px from the trigger instead of 9.",...(N=(O=a.parameters)==null?void 0:O.docs)==null?void 0:N.description}}};var k,A,L,D,E;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="mdt-grid mdt-grid-cols-3 mdt-gap-4">
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Tooltip on top</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">Tooltip on left</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Tooltip on right</TooltipContent>
      </Tooltip>
      <div />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
      </Tooltip>
      <div />
    </div>
}`,...(L=(A=l.parameters)==null?void 0:A.docs)==null?void 0:L.source},description:{story:"Top by default. Any side on request; near a screen edge it flips to the opposite side by itself.",...(E=(D=l.parameters)==null?void 0:D.docs)==null?void 0:E.description}}};var H,q,I,P,W;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      {(['start', 'center', 'end'] as const).map(align => <Tooltip key={align}>
          <TooltipTrigger asChild>
            <Button variant="outline" className="mdt-w-[280px]">
              align=&quot;{align}&quot;
            </Button>
          </TooltipTrigger>
          <TooltipContent align={align}>Aligned to the {align}</TooltipContent>
        </Tooltip>)}
    </div>
}`,...(I=(q=d.parameters)==null?void 0:q.docs)==null?void 0:I.source},description:{story:"Alignment slides the bubble to the start or end of a wide trigger.",...(W=(P=d.parameters)==null?void 0:P.docs)==null?void 0:W.description}}};var R,M,F,V,_;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-center mdt-gap-12">
      <ContactChips email="michael.smith@company.com" phone="+1 415 555 0100" />
      <Tooltip instant>
        <TooltipTrigger asChild>
          <Button variant="outline">Copy link</Button>
        </TooltipTrigger>
        <TooltipContent hint="Click to copy the link">company.com/invite/8f3k2</TooltipContent>
      </Tooltip>
    </div>
}`,...(F=(M=p.parameters)==null?void 0:M.docs)==null?void 0:F.source},description:{story:`A quieter second line under the value: what happens if you click. The Table's contact chips carry it, open at once, and say "Copied!" after a click until the pointer leaves.`,...(_=(V=p.parameters)==null?void 0:V.docs)==null?void 0:_.description}}};var z,G,J,K,Q;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-center mdt-gap-12">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Scheduled suspension</Button>
        </TooltipTrigger>
        <TooltipContent>
          This account is scheduled for suspension on 14 October 2026 because the last owner left
          the organisation.
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Short</Button>
        </TooltipTrigger>
        <TooltipContent>Short copy stays on one line</TooltipContent>
      </Tooltip>
    </div>
}`,...(J=(G=c.parameters)==null?void 0:G.docs)==null?void 0:J.source},description:{story:"Plain text wraps at 280px and reads centred. Short copy stays on one line.",...(Q=(K=c.parameters)==null?void 0:K.docs)==null?void 0:Q.description}}};var U,X,Y,Z,$;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-center mdt-gap-12">
      <TagList items={TEAMS.slice(0, 5)} />
      <TagList items={TEAMS} max={1} />
    </div>
}`,...(Y=(X=m.parameters)==null?void 0:X.docs)==null?void 0:Y.source},description:{story:'The "+N" in a Teams or Roles cell lists the rest. Bullet lines 3px apart; past seven the list scrolls inside the bubble, and the pointer may travel into it.',...($=(Z=m.parameters)==null?void 0:Z.docs)==null?void 0:$.description}}};var tt,et,ot,nt,it;h.parameters={...h.parameters,docs:{...(tt=h.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-center mdt-gap-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">100ms</Button>
        </TooltipTrigger>
        <TooltipContent>Opens after the wait</TooltipContent>
      </Tooltip>
      <Tooltip instant>
        <TooltipTrigger asChild>
          <Button variant="outline">Instant</Button>
        </TooltipTrigger>
        <TooltipContent>Opens at once</TooltipContent>
      </Tooltip>
    </div>
}`,...(ot=(et=h.parameters)==null?void 0:et.docs)==null?void 0:ot.source},description:{story:"Side by side: the default 100ms wait, and `instant`.",...(it=(nt=h.parameters)==null?void 0:nt.docs)==null?void 0:it.description}}};var rt,st,at,lt,dt;u.parameters={...u.parameters,docs:{...(rt=u.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  render: function ControlledStory() {
    const [open, setOpen] = useState(true);
    return <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => {
          setOpen(o => !o);
        }}>
            {open ? 'Close it' : 'Open it'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Held open by the page</TooltipContent>
      </Tooltip>;
  }
}`,...(at=(st=u.parameters)==null?void 0:st.docs)==null?void 0:at.source},description:{story:"Drive it yourself: the button toggles the bubble, the pointer no longer does.",...(dt=(lt=u.parameters)==null?void 0:lt.docs)==null?void 0:dt.description}}};const Ft=["Default","WithoutArrow","Sides","Alignment","WithHint","LongCopy","List","Instant","Controlled"];export{d as Alignment,u as Controlled,s as Default,h as Instant,m as List,c as LongCopy,l as Sides,p as WithHint,a as WithoutArrow,Ft as __namedExportsOrder,Mt as default};
//# sourceMappingURL=Tooltip.stories-CUoVtLfg.js.map
