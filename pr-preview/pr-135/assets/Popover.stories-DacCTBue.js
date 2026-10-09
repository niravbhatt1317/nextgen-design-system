import{j as e,r as d}from"./iframe-DGfO5Tky.js";import{P as s,a as n,b as o}from"./Popover-DMc36o6m.js";import{B as t}from"./Button-CpqDAepe.js";import{I as N}from"./Input-B4NWrnDU.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DHfsFR7-.js";import"./index-D5UmGI4o.js";import"./index-Bp1E-f5H.js";import"./index-BCQj_X_7.js";import"./index-6n8FiUgv.js";import"./index-SA6fEBGb.js";import"./index-DEp-ScbS.js";import"./index-BeoI_AkG.js";import"./Combination-f8HmdYF9.js";import"./index-BUwFXXpO.js";import"./index-B9EProgT.js";import"./index-CfYC5P7p.js";import"./index-Dng2bb8n.js";import"./index-ytv_xIA9.js";import"./index-CcRgbaMz.js";import"./index-ChEho857.js";import"./Icon-DdgFfEyY.js";const Ie={title:"New Components/Popover",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["Rich content that floats over the page from a trigger, built on Radix Popover. The part that owns","**the overlay surface**: its ground is `--mdt-popover`, the colour map's `elevation.surface.overlay`","- white in light, neutral-150 in dark (the storybook's neutral-150; Pranjal, 2026-09-25/26) - a step","DARKER than a card, so a menu reads as its own thing on any surface, with the hairline visible on it.","The ink is `--mdt-popover-foreground`. It carries no private dark rule: the theme comes from the tokens.","","The same frame is exported as `popoverSurface` for the other parts that float - the row menu, a","select list, the date panel, the filter panel - so they share one ground and one edge.","","Replaces the earlier Popover (now `PopoverOld`, under Deprecated) as of 26 September 2026."].join(`
`)}},controls:{exclude:["class"]}}},l={render:()=>e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Open popover"})}),e.jsx(o,{children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("h4",{className:"mdt-font-medium mdt-leading-none",children:"Dimensions"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Set the dimensions for the layer."})]})})]})},c={render:()=>e.jsxs("div",{className:"mdt-flex mdt-items-start mdt-gap-6",children:[e.jsxs("div",{className:"mdt-flex mdt-w-56 mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-neutral-30 mdt-bg-card mdt-p-4",children:[e.jsx("h4",{className:"mdt-m-0 mdt-text-sm mdt-font-medium",children:"A card"}),e.jsx("p",{className:"mdt-m-0 mdt-text-sm mdt-text-muted-foreground",children:"--mdt-card, with its edge."})]}),e.jsxs(s,{defaultOpen:!0,children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"The popover"})}),e.jsx(o,{align:"start",sideOffset:8,children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("h4",{className:"mdt-m-0 mdt-text-sm mdt-font-medium",children:"The overlay surface"}),e.jsx("p",{className:"mdt-m-0 mdt-text-sm mdt-text-muted-foreground",children:"--mdt-popover: white in light, neutral-150 in dark, the hairline visible on it."})]})})]})]})},p={render:function(){const[a,m]=d.useState("100%"),[j,P]=d.useState("300px"),[i,xe]=d.useState("25px"),[ue,fe]=d.useState("none");return e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Open dimensions"})}),e.jsx(o,{className:"mdt-w-80",children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-space-y-2",children:[e.jsx("h4",{className:"mdt-font-medium mdt-leading-none",children:"Dimensions"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Set the dimensions for the layer."})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("label",{htmlFor:"width",className:"mdt-text-sm mdt-font-medium",children:"Width"}),e.jsx(N,{id:"width",value:a,onChange:r=>{m(r.target.value)}})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("label",{htmlFor:"maxWidth",className:"mdt-text-sm mdt-font-medium",children:"Max width"}),e.jsx(N,{id:"maxWidth",value:j,onChange:r=>{P(r.target.value)}})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("label",{htmlFor:"height",className:"mdt-text-sm mdt-font-medium",children:"Height"}),e.jsx(N,{id:"height",value:i,onChange:r=>{xe(r.target.value)}})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("label",{htmlFor:"maxHeight",className:"mdt-text-sm mdt-font-medium",children:"Max height"}),e.jsx(N,{id:"maxHeight",value:ue,onChange:r=>{fe(r.target.value)}})]})]})]})})]})}},h={render:function(){const[a,m]=d.useState(!1);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-4",children:[e.jsxs(s,{open:a,onOpenChange:m,children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Toggle popover"})}),e.jsx(o,{children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("h4",{className:"mdt-font-medium mdt-leading-none",children:"Controlled Popover"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"This popover's open state is controlled externally."}),e.jsx(t,{variant:"secondary",size:"sm",onClick:()=>{m(!1)},children:"Close"})]})})]}),e.jsxs("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:["Popover is ",a?"open":"closed"]})]})}},x={render:()=>e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Start"})}),e.jsx(o,{align:"start",children:e.jsx("p",{className:"mdt-text-sm",children:"Aligned to start"})})]}),e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Center"})}),e.jsx(o,{align:"center",children:e.jsx("p",{className:"mdt-text-sm",children:"Aligned to center"})})]}),e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"End"})}),e.jsx(o,{align:"end",children:e.jsx("p",{className:"mdt-text-sm",children:"Aligned to end"})})]})]})},u={render:()=>e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Offset 0"})}),e.jsx(o,{sideOffset:0,children:e.jsx("p",{className:"mdt-text-sm",children:"No offset from trigger"})})]}),e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Offset 20"})}),e.jsx(o,{sideOffset:20,children:e.jsx("p",{className:"mdt-text-sm",children:"20px offset from trigger"})})]})]})},f={render:()=>e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Open wide popover"})}),e.jsx(o,{className:"mdt-w-96",children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("h4",{className:"mdt-font-medium mdt-leading-none",children:"Custom Width"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"This popover has a custom width of 24rem (384px). You can customize the width by passing a className to PopoverContent."})]})})]})},v={render:function(){const[a,m]=d.useState(!0),[j,P]=d.useState(!1);return e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Settings"})}),e.jsx(o,{className:"mdt-w-80",children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-space-y-2",children:[e.jsx("h4",{className:"mdt-font-medium mdt-leading-none",children:"Preferences"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Manage your notification settings."})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between",children:[e.jsx("label",{htmlFor:"notifications",className:"mdt-cursor-pointer mdt-text-sm mdt-font-medium",children:"Push Notifications"}),e.jsx("input",{type:"checkbox",id:"notifications",checked:a,onChange:i=>{m(i.target.checked)},className:"mdt-h-4 mdt-w-4 mdt-cursor-pointer"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between",children:[e.jsx("label",{htmlFor:"emails",className:"mdt-cursor-pointer mdt-text-sm mdt-font-medium",children:"Email Notifications"}),e.jsx("input",{type:"checkbox",id:"emails",checked:j,onChange:i=>{P(i.target.checked)},className:"mdt-h-4 mdt-w-4 mdt-cursor-pointer"})]})]})]})})]})}},g={render:()=>e.jsxs(s,{children:[e.jsx(n,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"View Profile"})}),e.jsx(o,{className:"mdt-w-80",children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-4",children:[e.jsx("div",{className:"mdt-flex mdt-h-12 mdt-w-12 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-primary mdt-text-primary-foreground",children:"JD"}),e.jsxs("div",{className:"mdt-flex mdt-flex-col",children:[e.jsx("p",{className:"mdt-font-medium",children:"John Doe"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"john.doe@example.com"})]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx(t,{variant:"outline",size:"sm",children:"View Profile"}),e.jsx(t,{variant:"outline",size:"sm",children:"Edit Profile"}),e.jsx(t,{variant:"outline",size:"sm",children:"Sign Out"})]})]})})]})};var w,y,b,S,T;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <h4 className="mdt-font-medium mdt-leading-none">Dimensions</h4>
          <p className="mdt-text-sm mdt-text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
}`,...(b=(y=l.parameters)==null?void 0:y.docs)==null?void 0:b.source},description:{story:"Default popover example.",...(T=(S=l.parameters)==null?void 0:S.docs)==null?void 0:T.description}}};var B,O,W,k,E;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-start mdt-gap-6">
      <div className="mdt-flex mdt-w-56 mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-neutral-30 mdt-bg-card mdt-p-4">
        <h4 className="mdt-m-0 mdt-text-sm mdt-font-medium">A card</h4>
        <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground">--mdt-card, with its edge.</p>
      </div>
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">The popover</Button>
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={8}>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <h4 className="mdt-m-0 mdt-text-sm mdt-font-medium">The overlay surface</h4>
            <p className="mdt-m-0 mdt-text-sm mdt-text-muted-foreground">
              --mdt-popover: white in light, neutral-150 in dark, the hairline visible on it.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
}`,...(W=(O=c.parameters)==null?void 0:O.docs)==null?void 0:W.source},description:{story:`The surface itself: the popover's ground beside the page and a card, so the step reads in both themes. In dark the
card is the page colour with an edge (cards are flat), and the popover steps DOWN to neutral-150 with the hairline on it.`,...(E=(k=c.parameters)==null?void 0:k.docs)==null?void 0:E.description}}};var F,H,D,M,A;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: function WithFormComponent() {
    const [width, setWidth] = useState('100%');
    const [maxWidth, setMaxWidth] = useState('300px');
    const [height, setHeight] = useState('25px');
    const [maxHeight, setMaxHeight] = useState('none');
    return <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open dimensions</Button>
        </PopoverTrigger>
        <PopoverContent className="mdt-w-80">
          <div className="mdt-flex mdt-flex-col mdt-gap-4">
            <div className="mdt-space-y-2">
              <h4 className="mdt-font-medium mdt-leading-none">Dimensions</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="mdt-flex mdt-flex-col mdt-gap-3">
              <div className="mdt-flex mdt-flex-col mdt-gap-2">
                <label htmlFor="width" className="mdt-text-sm mdt-font-medium">
                  Width
                </label>
                <Input id="width" value={width} onChange={e => {
                setWidth(e.target.value);
              }} />
              </div>
              <div className="mdt-flex mdt-flex-col mdt-gap-2">
                <label htmlFor="maxWidth" className="mdt-text-sm mdt-font-medium">
                  Max width
                </label>
                <Input id="maxWidth" value={maxWidth} onChange={e => {
                setMaxWidth(e.target.value);
              }} />
              </div>
              <div className="mdt-flex mdt-flex-col mdt-gap-2">
                <label htmlFor="height" className="mdt-text-sm mdt-font-medium">
                  Height
                </label>
                <Input id="height" value={height} onChange={e => {
                setHeight(e.target.value);
              }} />
              </div>
              <div className="mdt-flex mdt-flex-col mdt-gap-2">
                <label htmlFor="maxHeight" className="mdt-text-sm mdt-font-medium">
                  Max height
                </label>
                <Input id="maxHeight" value={maxHeight} onChange={e => {
                setMaxHeight(e.target.value);
              }} />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>;
  }
}`,...(D=(H=p.parameters)==null?void 0:H.docs)==null?void 0:D.source},description:{story:"Popover with form inputs.",...(A=(M=p.parameters)==null?void 0:M.docs)==null?void 0:A.description}}};var z,I,R,J,V;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: function ControlledComponent() {
    const [open, setOpen] = useState(false);
    return <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Toggle popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="mdt-flex mdt-flex-col mdt-gap-2">
              <h4 className="mdt-font-medium mdt-leading-none">Controlled Popover</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                This popover&apos;s open state is controlled externally.
              </p>
              <Button variant="secondary" size="sm" onClick={() => {
              setOpen(false);
            }}>
                Close
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Popover is {open ? 'open' : 'closed'}
        </p>
      </div>;
  }
}`,...(R=(I=h.parameters)==null?void 0:I.docs)==null?void 0:R.source},description:{story:"Controlled popover - you can control the open state.",...(V=(J=h.parameters)==null?void 0:J.docs)==null?void 0:V.description}}};var Y,_,K,U,q;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <p className="mdt-text-sm">Aligned to start</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <p className="mdt-text-sm">Aligned to center</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p className="mdt-text-sm">Aligned to end</p>
        </PopoverContent>
      </Popover>
    </div>
}`,...(K=(_=x.parameters)==null?void 0:_.docs)==null?void 0:K.source},description:{story:"Popover with different alignments.",...(q=(U=x.parameters)==null?void 0:U.docs)==null?void 0:q.description}}};var G,L,Q,X,Z;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Offset 0</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={0}>
          <p className="mdt-text-sm">No offset from trigger</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Offset 20</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={20}>
          <p className="mdt-text-sm">20px offset from trigger</p>
        </PopoverContent>
      </Popover>
    </div>
}`,...(Q=(L=u.parameters)==null?void 0:L.docs)==null?void 0:Q.source},description:{story:"Popover with custom side offset.",...(Z=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Z.description}}};var $,ee,te,se,ne;f.parameters={...f.parameters,docs:{...($=f.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open wide popover</Button>
      </PopoverTrigger>
      <PopoverContent className="mdt-w-96">
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <h4 className="mdt-font-medium mdt-leading-none">Custom Width</h4>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            This popover has a custom width of 24rem (384px). You can customize the width by passing
            a className to PopoverContent.
          </p>
        </div>
      </PopoverContent>
    </Popover>
}`,...(te=(ee=f.parameters)==null?void 0:ee.docs)==null?void 0:te.source},description:{story:"Popover with custom width.",...(ne=(se=f.parameters)==null?void 0:se.docs)==null?void 0:ne.description}}};var oe,re,de,ae,me;v.parameters={...v.parameters,docs:{...(oe=v.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: function SettingsExampleComponent() {
    const [notifications, setNotifications] = useState(true);
    const [emails, setEmails] = useState(false);
    return <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Settings</Button>
        </PopoverTrigger>
        <PopoverContent className="mdt-w-80">
          <div className="mdt-flex mdt-flex-col mdt-gap-4">
            <div className="mdt-space-y-2">
              <h4 className="mdt-font-medium mdt-leading-none">Preferences</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Manage your notification settings.
              </p>
            </div>
            <div className="mdt-flex mdt-flex-col mdt-gap-3">
              <div className="mdt-flex mdt-items-center mdt-justify-between">
                <label htmlFor="notifications" className="mdt-cursor-pointer mdt-text-sm mdt-font-medium">
                  Push Notifications
                </label>
                <input type="checkbox" id="notifications" checked={notifications} onChange={e => {
                setNotifications(e.target.checked);
              }} className="mdt-h-4 mdt-w-4 mdt-cursor-pointer" />
              </div>
              <div className="mdt-flex mdt-items-center mdt-justify-between">
                <label htmlFor="emails" className="mdt-cursor-pointer mdt-text-sm mdt-font-medium">
                  Email Notifications
                </label>
                <input type="checkbox" id="emails" checked={emails} onChange={e => {
                setEmails(e.target.checked);
              }} className="mdt-h-4 mdt-w-4 mdt-cursor-pointer" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>;
  }
}`,...(de=(re=v.parameters)==null?void 0:re.docs)==null?void 0:de.source},description:{story:"Example: Settings popover with actions.",...(me=(ae=v.parameters)==null?void 0:ae.docs)==null?void 0:me.description}}};var ie,le,ce,pe,he;g.parameters={...g.parameters,docs:{...(ie=g.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">View Profile</Button>
      </PopoverTrigger>
      <PopoverContent className="mdt-w-80">
        <div className="mdt-flex mdt-flex-col mdt-gap-4">
          <div className="mdt-flex mdt-items-center mdt-gap-4">
            <div className="mdt-flex mdt-h-12 mdt-w-12 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-primary mdt-text-primary-foreground">
              JD
            </div>
            <div className="mdt-flex mdt-flex-col">
              <p className="mdt-font-medium">John Doe</p>
              <p className="mdt-text-sm mdt-text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <Button variant="outline" size="sm">
              View Profile
            </Button>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
}`,...(ce=(le=g.parameters)==null?void 0:le.docs)==null?void 0:ce.source},description:{story:"Example: User profile popover.",...(he=(pe=g.parameters)==null?void 0:pe.docs)==null?void 0:he.description}}};const Re=["Default","TheSurface","WithForm","Controlled","Alignment","CustomSideOffset","CustomWidth","SettingsExample","ProfileExample"];export{x as Alignment,h as Controlled,u as CustomSideOffset,f as CustomWidth,l as Default,g as ProfileExample,v as SettingsExample,c as TheSurface,p as WithForm,Re as __namedExportsOrder,Ie as default};
//# sourceMappingURL=Popover.stories-DacCTBue.js.map
