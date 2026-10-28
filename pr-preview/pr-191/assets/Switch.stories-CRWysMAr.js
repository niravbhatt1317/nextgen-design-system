import{j as e,r as ve}from"./iframe-CsXFAE8z.js";import{M as t}from"./Switch-B9VyzA79.js";import{F as g}from"./FormLabel-B-wc_j64.js";import{C as ye,b as je}from"./Card-B6PYyQZD.js";import{T as ke,a as Ce,b as Se,c as Te,d as w,e as N,f as Fe,g as Oe,h as v}from"./Table-DP7vf-AW.js";import"./preload-helper-Dp1pzeXC.js";import"./index-LYGEAKtq.js";import"./index-tSk6q-Q-.js";import"./index-DV_6ziBs.js";import"./index-D2-rcxze.js";import"./index-ChBeNdta.js";import"./index-DtAM47nC.js";import"./index-BFlRmSQE.js";import"./index-Dr-oOCxc.js";import"./index-tJuKVAxJ.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./Icon-BX_oh85T.js";/* empty css              */import"./Checkbox-DEzzn112.js";import"./index-B8350naY.js";import"./DropdownMenu-BgkOqCbT.js";import"./index-x7Vde-17.js";import"./index-syqsmACo.js";import"./index-DeWiAIMA.js";import"./index-C1OtY66Z.js";import"./index-Dvt6hAlR.js";import"./index-BiBaWdtM.js";import"./index-D6JcA-pD.js";import"./index-DYHT9Sj2.js";import"./picked-row-BGnBNViw.js";const ot={title:"New Components/Switch",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["A switch turns one thing on or off, and the change lands the moment it is flipped.","There is no Save behind it, and there must not be one.","","| The question | The control |","| --- | --- |","| It takes effect at once - a setting, a feature, an expiry | `Switch` |","| It is a choice inside a form and lands when the form is submitted | `Checkbox` |","| One of several, and only one | `Radio` |","","**One pill, three sizes.** Fully rounded, never a corner radius (Pranjal, 2026-09-22).","`sm` is 20 × 36 for a table cell, `md` is 24 × 44 everywhere else and the default,","`lg` is 28 × 56. The track is the input grey off and the primary ink on; the thumb is","white with a soft shadow and travels in 150ms. Hover takes the track a step darker;","keyboard focus draws a 2px ring, 2px out; disabled is 50%.","","**Where it sits.** At the *left* of its label in a plain settings list; at the *right*","when it governs a card or a row of text; alone and `sm` in a table cell, where the","column heading names it."].join(`
`)}}},argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Size variant of the switch",table:{defaultValue:{summary:"md"}}},checked:{control:"boolean",description:"The controlled checked state"},defaultChecked:{control:"boolean",description:"The default checked state (uncontrolled mode)"},disabled:{control:"boolean",description:"Whether the switch is disabled",table:{defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Whether the switch is required in a form",table:{defaultValue:{summary:"false"}}},name:{control:"text",description:"The name of the switch (for form submission)"},value:{control:"text",description:"The value submitted with the form",table:{defaultValue:{summary:"on"}}},onCheckedChange:{action:"checked changed",description:"Callback when checked state changes"}}},d="mdt-text-xs mdt-text-muted-foreground",Me=[{size:"sm",caption:"sm · 20 × 36 · thumb 16"},{size:"md",caption:"md · 24 × 44 · thumb 20 · default"},{size:"lg",caption:"lg · 28 × 56 · thumb 24"}],y="mdt-ring-2 mdt-ring-ring mdt-ring-offset-2 mdt-ring-offset-background",m={args:{"aria-label":"Toggle setting"}},o={render:()=>e.jsx("div",{className:"mdt-flex mdt-items-end mdt-gap-8",children:Me.map(a=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx(t,{size:a.size,"aria-label":`${a.size} switch`}),e.jsx("span",{className:d,children:a.caption})]},a.size))})},l={render:()=>e.jsxs("div",{className:"mdt-grid mdt-grid-cols-[120px_auto_auto] mdt-items-center mdt-gap-x-6 mdt-gap-y-4",children:[e.jsx("span",{}),e.jsx("span",{className:d,children:"off"}),e.jsx("span",{className:d,children:"on"}),e.jsx("span",{className:d,children:"Rest"}),e.jsx(t,{"aria-label":"Off"}),e.jsx(t,{defaultChecked:!0,"aria-label":"On"}),e.jsx("span",{className:d,children:"Hover · drawn"}),e.jsx(t,{"aria-label":"Off, hovered",className:"data-[state=unchecked]:mdt-bg-[#B9C3D4]"}),e.jsx(t,{defaultChecked:!0,"aria-label":"On, hovered",className:"data-[state=checked]:mdt-bg-primary/90"}),e.jsx("span",{className:d,children:"Focus · drawn"}),e.jsx(t,{"aria-label":"Off, focused",className:y}),e.jsx(t,{defaultChecked:!0,"aria-label":"On, focused",className:y}),e.jsx("span",{className:d,children:"Disabled"}),e.jsx(t,{disabled:!0,"aria-label":"Off, disabled"}),e.jsx(t,{disabled:!0,defaultChecked:!0,"aria-label":"On, disabled"})]})},c={render:()=>e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2.5",children:[e.jsx(t,{id:"setting-row-switch",defaultChecked:!0}),e.jsx(g,{htmlFor:"setting-row-switch",children:"Enable notifications"})]})},h={render:()=>e.jsx(ye,{surface:"outline",className:"mdt-w-[440px]",children:e.jsx(je,{children:e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-1",children:[e.jsx(g,{htmlFor:"expiry-switch",weight:"medium",children:"Set an expiry"}),e.jsx("span",{className:d,children:"Off means permanent access: it stays until someone revokes it."})]}),e.jsx(t,{id:"expiry-switch"})]})})})},j=[220,140,160],De=[{id:"employee-id",name:"Employee ID",required:!0,shown:!1},{id:"cost-centre",name:"Cost centre",required:!1,shown:!0},{id:"department",name:"Department",required:!0,shown:!0}],u={render:()=>e.jsx(ke,{label:"Fields",expand:!1,className:"mdt-w-[580px]",children:e.jsxs(Ce,{tableWidth:j.reduce((a,s)=>a+s,60),children:[e.jsx(Se,{widths:j}),e.jsx(Te,{children:e.jsxs("tr",{children:[e.jsx(w,{columnKey:"field",label:"Field",width:220}),e.jsx(w,{columnKey:"required",label:"Required",width:140}),e.jsx(w,{columnKey:"shown",label:"Shown in list",width:160}),e.jsx(N,{head:!0})]})}),e.jsx(Fe,{children:De.map(a=>e.jsxs(Oe,{children:[e.jsx(v,{children:a.name}),e.jsx(v,{children:e.jsx(t,{size:"sm",defaultChecked:a.required,"aria-label":`${a.name} is required`})}),e.jsx(v,{children:e.jsx(t,{size:"sm",defaultChecked:a.shown,"aria-label":`${a.name} is shown in the list`})}),e.jsx(N,{})]},a.id))})]})})},p={render:function(){const[s,i]=ve.useState(!1);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2.5",children:[e.jsx(t,{checked:s,onCheckedChange:i,"aria-label":"Controlled switch"}),e.jsx("span",{className:"mdt-text-sm mdt-text-muted-foreground",children:s?"On":"Off"})]}),e.jsx("button",{type:"button",onClick:()=>{i(!s)},className:"mdt-rounded mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90",children:"Toggle from outside"})]})}},f={render:()=>e.jsxs("div",{className:"mdt-w-80 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-6",children:[e.jsx("h3",{className:"mdt-mb-4 mdt-text-lg mdt-font-semibold mdt-text-foreground",children:"Notification Settings"}),e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between",children:[e.jsxs("div",{className:"mdt-space-y-0.5",children:[e.jsx("label",{htmlFor:"email-notifications",className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Email notifications"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Receive notifications via email"})]}),e.jsx(t,{id:"email-notifications",defaultChecked:!0})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between",children:[e.jsxs("div",{className:"mdt-space-y-0.5",children:[e.jsx("label",{htmlFor:"push-notifications",className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Push notifications"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Receive push notifications on your device"})]}),e.jsx(t,{id:"push-notifications"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between",children:[e.jsxs("div",{className:"mdt-space-y-0.5",children:[e.jsx("label",{htmlFor:"sms-notifications",className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:"SMS notifications"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Receive notifications via SMS"})]}),e.jsx(t,{id:"sms-notifications"})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between",children:[e.jsxs("div",{className:"mdt-space-y-0.5",children:[e.jsx("label",{htmlFor:"marketing",className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Marketing emails"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Receive updates about new features"})]}),e.jsx(t,{id:"marketing",disabled:!0})]})]})]})},x={render:function(){const[s,i]=ve.useState({twoFactor:!1,digest:!0,news:!1}),Ne=n=>{n.preventDefault(),alert(JSON.stringify(s,null,2))};return e.jsxs("form",{onSubmit:Ne,className:"mdt-w-96 mdt-space-y-4 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-6",children:[e.jsx("h3",{className:"mdt-mb-4 mdt-text-lg mdt-font-semibold mdt-text-foreground",children:"Sign-in and mail"}),e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx(g,{htmlFor:"two-factor-switch",weight:"medium",required:!0,children:"Two-factor sign-in"}),e.jsx("span",{className:d,children:"Required by the organisation's policy."})]}),e.jsx(t,{id:"two-factor-switch",name:"twoFactor",required:!0,checked:s.twoFactor,onCheckedChange:n=>{i(r=>({...r,twoFactor:n}))}})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx(g,{htmlFor:"digest-switch",weight:"medium",children:"Weekly digest"}),e.jsx("span",{className:d,children:"One mail on Monday with the week's changes."})]}),e.jsx(t,{id:"digest-switch",name:"digest",checked:s.digest,onCheckedChange:n=>{i(r=>({...r,digest:n}))}})]}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1",children:[e.jsx(g,{htmlFor:"news-switch",weight:"medium",children:"Product news"}),e.jsx("span",{className:d,children:"New features, about once a month."})]}),e.jsx(t,{id:"news-switch",name:"news",checked:s.news,onCheckedChange:n=>{i(r=>({...r,news:n}))}})]})]}),e.jsx("button",{type:"submit",disabled:!s.twoFactor,className:"mdt-w-full mdt-rounded mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90 disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50",children:"Continue"})]})}},b={render:()=>e.jsxs("div",{className:"mdt-space-y-8",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Sizes"}),e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx(t,{size:"sm","aria-label":"Small unchecked"}),e.jsx(t,{size:"sm",defaultChecked:!0,"aria-label":"Small checked"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx(t,{size:"md","aria-label":"Medium unchecked"}),e.jsx(t,{size:"md",defaultChecked:!0,"aria-label":"Medium checked"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx(t,{size:"lg","aria-label":"Large unchecked"}),e.jsx(t,{size:"lg",defaultChecked:!0,"aria-label":"Large checked"})]})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Disabled"}),e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsx(t,{disabled:!0,"aria-label":"Disabled unchecked"}),e.jsx(t,{disabled:!0,defaultChecked:!0,"aria-label":"Disabled checked"})]})]})]})};var k,C,S,T,F;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    'aria-label': 'Toggle setting'
  }
}`,...(S=(C=m.parameters)==null?void 0:C.docs)==null?void 0:S.source},description:{story:"The playground: the default switch, `md` and off. Use the controls to try a size, a checked\nstart and disabled. Every other story on this page shows a rule; this one is for trying things.",...(F=(T=m.parameters)==null?void 0:T.docs)==null?void 0:F.description}}};var O,M,D,z,I;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-end mdt-gap-8">
      {SIZES.map(s => <div key={s.size} className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
          <MotadataSwitch size={s.size} aria-label={\`\${s.size} switch\`} />
          <span className={CAPTION}>{s.caption}</span>
        </div>)}
    </div>
}`,...(D=(M=o.parameters)==null?void 0:M.docs)==null?void 0:D.source},description:{story:"The three sizes, off, with their numbers: `sm` 20 × 36 with a 16 thumb, `md` 24 × 44 with a\n20 thumb (the default), `lg` 28 × 56 with a 24 thumb. All three are the same pill - a 2px\ntransparent border inside a fully rounded track, the thumb 2 in from the edge, travelling the\ntrack's width minus its own. `sm` is for a table cell; `md` is everywhere else; `lg` only when\nthe switch has to carry a whole page. There is no fourth size: 20 already fits a 44 row.",...(I=(z=o.parameters)==null?void 0:z.docs)==null?void 0:I.description}}};var A,R,q,E,L;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="mdt-grid mdt-grid-cols-[120px_auto_auto] mdt-items-center mdt-gap-x-6 mdt-gap-y-4">
      <span />
      <span className={CAPTION}>off</span>
      <span className={CAPTION}>on</span>

      <span className={CAPTION}>Rest</span>
      <MotadataSwitch aria-label="Off" />
      <MotadataSwitch defaultChecked aria-label="On" />

      <span className={CAPTION}>Hover · drawn</span>
      <MotadataSwitch aria-label="Off, hovered" className="data-[state=unchecked]:mdt-bg-[#B9C3D4]" />
      <MotadataSwitch defaultChecked aria-label="On, hovered" className="data-[state=checked]:mdt-bg-primary/90" />

      <span className={CAPTION}>Focus · drawn</span>
      <MotadataSwitch aria-label="Off, focused" className={FOCUS_DRAWN} />
      <MotadataSwitch defaultChecked aria-label="On, focused" className={FOCUS_DRAWN} />

      <span className={CAPTION}>Disabled</span>
      <MotadataSwitch disabled aria-label="Off, disabled" />
      <MotadataSwitch disabled defaultChecked aria-label="On, disabled" />
    </div>
}`,...(q=(R=l.parameters)==null?void 0:R.docs)==null?void 0:q.source},description:{story:`Every state, at \`md\`. Rest, then hover: the track goes a step darker so the pointer gets an
answer - the off grey climbs one step up the neutral ramp, the on ink eases to 90%. Focus is
the library's 2px ring with a 2px offset, keyboard only, the same recipe the Checkbox wears.
Disabled is 50% with a not-allowed cursor, on or off. The hover and focus rows are drawn so
the page can show them; move the pointer over any switch, or Tab to one, for the real thing.`,...(L=(E=l.parameters)==null?void 0:E.docs)==null?void 0:L.description}}};var P,H,W,_,B;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-center mdt-gap-2.5">
      <MotadataSwitch id="setting-row-switch" defaultChecked />
      <FormLabel htmlFor="setting-row-switch">Enable notifications</FormLabel>
    </div>
}`,...(W=(H=c.parameters)==null?void 0:H.docs)==null?void 0:W.source},description:{story:'A plain setting: the switch first, then its label, 10 apart, on one centre line. The label is\nthe library\'s `FormLabel`, wired with `htmlFor` so clicking the words flips the switch too.\nThis is the left-hand placement - a settings list, or a single option in a form step\n("Access to all organisations", "VIP"). `md`.',...(B=(_=c.parameters)==null?void 0:_.docs)==null?void 0:B.description}}};var V,K,$,U,G;h.parameters={...h.parameters,docs:{...(V=h.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Card surface="outline" className="mdt-w-[440px]">
      <CardBody>
        <div className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4">
          <div className="mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-1">
            <FormLabel htmlFor="expiry-switch" weight="medium">
              Set an expiry
            </FormLabel>
            <span className={CAPTION}>
              Off means permanent access: it stays until someone revokes it.
            </span>
          </div>
          <MotadataSwitch id="expiry-switch" />
        </div>
      </CardBody>
    </Card>
}`,...($=(K=h.parameters)==null?void 0:K.docs)==null?void 0:$.source},description:{story:'The switch governs a card: the title and its helper line at the left, the switch at the right,\nthe two centred on one line. This is the console\'s expiry card (Add access step 2, Change\nexpiry, Add holders): off means permanent, on reveals the date. `md`, in a `Card` with\n`surface="outline"`. The rule: when the switch rules a block of text, it sits at the right.',...(G=(U=h.parameters)==null?void 0:U.docs)==null?void 0:G.description}}};var J,Z,Q,X,Y;u.parameters={...u.parameters,docs:{...(J=u.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <Table label="Fields" expand={false} className="mdt-w-[580px]">
      <TableViewport tableWidth={FIELD_WIDTHS.reduce((a, b) => a + b, 60)}>
        <TableColGroup widths={FIELD_WIDTHS} />
        <TableHeader>
          <tr>
            <TableHead columnKey="field" label="Field" width={220} />
            <TableHead columnKey="required" label="Required" width={140} />
            <TableHead columnKey="shown" label="Shown in list" width={160} />
            <TableTailCell head />
          </tr>
        </TableHeader>
        <TableBody>
          {FIELDS.map(f => <TableRow key={f.id}>
              <TableCell>{f.name}</TableCell>
              <TableCell>
                <MotadataSwitch size="sm" defaultChecked={f.required} aria-label={\`\${f.name} is required\`} />
              </TableCell>
              <TableCell>
                <MotadataSwitch size="sm" defaultChecked={f.shown} aria-label={\`\${f.name} is shown in the list\`} />
              </TableCell>
              <TableTailCell />
            </TableRow>)}
        </TableBody>
      </TableViewport>
    </Table>
}`,...(Q=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:Q.source},description:{story:"In a table cell the switch is `sm` and sits alone - no label beside it, because the column\nheading already names it. This is the Field drawer's Required and Shown-in-list columns, in\nthe library's own `Table`: its 54 row leaves the 20-high pill clear above and below.",...(Y=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Y.description}}};var ee,te,ae,se,de;p.parameters={...p.parameters,docs:{...(ee=p.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: function ControlledSwitch() {
    const [checked, setChecked] = useState(false);
    return <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <div className="mdt-flex mdt-items-center mdt-gap-2.5">
          <MotadataSwitch checked={checked} onCheckedChange={setChecked} aria-label="Controlled switch" />
          <span className="mdt-text-sm mdt-text-muted-foreground">{checked ? 'On' : 'Off'}</span>
        </div>
        <button type="button" onClick={() => {
        setChecked(!checked);
      }} className="mdt-rounded mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90">
          Toggle from outside
        </button>
      </div>;
  }
}`,...(ae=(te=p.parameters)==null?void 0:te.docs)==null?void 0:ae.source},description:{story:"Controlled: the page owns the value through `checked` and `onCheckedChange`, so something\nelse on the page can flip it too. The switch itself looks and behaves exactly as before.",...(de=(se=p.parameters)==null?void 0:se.docs)==null?void 0:de.description}}};var ne,ie,re,me,oe;f.parameters={...f.parameters,docs:{...(ne=f.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-80 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-6">
      <h3 className="mdt-mb-4 mdt-text-lg mdt-font-semibold mdt-text-foreground">
        Notification Settings
      </h3>
      <div className="mdt-space-y-4">
        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <div className="mdt-space-y-0.5">
            <label htmlFor="email-notifications" className="mdt-text-sm mdt-font-medium mdt-text-foreground">
              Email notifications
            </label>
            <p className="mdt-text-xs mdt-text-muted-foreground">Receive notifications via email</p>
          </div>
          <MotadataSwitch id="email-notifications" defaultChecked />
        </div>
        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <div className="mdt-space-y-0.5">
            <label htmlFor="push-notifications" className="mdt-text-sm mdt-font-medium mdt-text-foreground">
              Push notifications
            </label>
            <p className="mdt-text-xs mdt-text-muted-foreground">
              Receive push notifications on your device
            </p>
          </div>
          <MotadataSwitch id="push-notifications" />
        </div>
        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <div className="mdt-space-y-0.5">
            <label htmlFor="sms-notifications" className="mdt-text-sm mdt-font-medium mdt-text-foreground">
              SMS notifications
            </label>
            <p className="mdt-text-xs mdt-text-muted-foreground">Receive notifications via SMS</p>
          </div>
          <MotadataSwitch id="sms-notifications" />
        </div>
        <div className="mdt-flex mdt-items-center mdt-justify-between">
          <div className="mdt-space-y-0.5">
            <label htmlFor="marketing" className="mdt-text-sm mdt-font-medium mdt-text-foreground">
              Marketing emails
            </label>
            <p className="mdt-text-xs mdt-text-muted-foreground">
              Receive updates about new features
            </p>
          </div>
          <MotadataSwitch id="marketing" disabled />
        </div>
      </div>
    </div>
}`,...(re=(ie=f.parameters)==null?void 0:ie.docs)==null?void 0:re.source},description:{story:`A list of settings in one panel: every row puts its label and help at the left and its
switch at the right - the card rule, repeated down a list. Each change lands at once; there
is no Save button, and there must not be one.`,...(oe=(me=f.parameters)==null?void 0:me.docs)==null?void 0:oe.description}}};var le,ce,he,ue,pe;x.parameters={...x.parameters,docs:{...(le=x.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: function FormIntegrationExample() {
    const [formData, setFormData] = useState({
      twoFactor: false,
      digest: true,
      news: false
    });
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };
    return <form onSubmit={handleSubmit} className="mdt-w-96 mdt-space-y-4 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-6">
        <h3 className="mdt-mb-4 mdt-text-lg mdt-font-semibold mdt-text-foreground">
          Sign-in and mail
        </h3>

        <div className="mdt-space-y-4">
          <div className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4">
            <div className="mdt-flex mdt-flex-col mdt-gap-1">
              <FormLabel htmlFor="two-factor-switch" weight="medium" required>
                Two-factor sign-in
              </FormLabel>
              <span className={CAPTION}>Required by the organisation&apos;s policy.</span>
            </div>
            <MotadataSwitch id="two-factor-switch" name="twoFactor" required checked={formData.twoFactor} onCheckedChange={checked => {
            setFormData(prev => ({
              ...prev,
              twoFactor: checked
            }));
          }} />
          </div>

          <div className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4">
            <div className="mdt-flex mdt-flex-col mdt-gap-1">
              <FormLabel htmlFor="digest-switch" weight="medium">
                Weekly digest
              </FormLabel>
              <span className={CAPTION}>One mail on Monday with the week&apos;s changes.</span>
            </div>
            <MotadataSwitch id="digest-switch" name="digest" checked={formData.digest} onCheckedChange={checked => {
            setFormData(prev => ({
              ...prev,
              digest: checked
            }));
          }} />
          </div>

          <div className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4">
            <div className="mdt-flex mdt-flex-col mdt-gap-1">
              <FormLabel htmlFor="news-switch" weight="medium">
                Product news
              </FormLabel>
              <span className={CAPTION}>New features, about once a month.</span>
            </div>
            <MotadataSwitch id="news-switch" name="news" checked={formData.news} onCheckedChange={checked => {
            setFormData(prev => ({
              ...prev,
              news: checked
            }));
          }} />
          </div>
        </div>

        <button type="submit" disabled={!formData.twoFactor} className="mdt-w-full mdt-rounded mdt-bg-primary mdt-px-4 mdt-py-2 mdt-text-sm mdt-text-primary-foreground hover:mdt-bg-primary/90 disabled:mdt-cursor-not-allowed disabled:mdt-opacity-50">
          Continue
        </button>
      </form>;
  }
}`,...(he=(ce=x.parameters)==null?void 0:ce.docs)==null?void 0:he.source},description:{story:'A switch still submits with a form - `name`, `value` and `required` all work through the\nhidden input Radix renders - for a set-up step that is one form and posts its switches with\nit. Two-factor sign-in is `required` here, so Continue stays off until it is on. This is not a\nplace for a consent line ("I agree to the terms"): that is a choice, not a setting, and it is\na Checkbox.',...(pe=(ue=x.parameters)==null?void 0:ue.docs)==null?void 0:pe.description}}};var fe,xe,be,ge,we;b.parameters={...b.parameters,docs:{...(fe=b.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => <div className="mdt-space-y-8">
      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">Sizes</h4>
        <div className="mdt-flex mdt-gap-4">
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <MotadataSwitch size="sm" aria-label="Small unchecked" />
            <MotadataSwitch size="sm" defaultChecked aria-label="Small checked" />
          </div>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <MotadataSwitch size="md" aria-label="Medium unchecked" />
            <MotadataSwitch size="md" defaultChecked aria-label="Medium checked" />
          </div>
          <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <MotadataSwitch size="lg" aria-label="Large unchecked" />
            <MotadataSwitch size="lg" defaultChecked aria-label="Large checked" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">Disabled</h4>
        <div className="mdt-flex mdt-gap-4">
          <MotadataSwitch disabled aria-label="Disabled unchecked" />
          <MotadataSwitch disabled defaultChecked aria-label="Disabled checked" />
        </div>
      </div>
    </div>
}`,...(be=(xe=b.parameters)==null?void 0:xe.docs)==null?void 0:be.source},description:{story:`Every size in both states, and disabled, in one grid - what the visual tests read. The rule
it shows is that nothing but the size changes between the three: same pill, same colours,
same travel.`,...(we=(ge=b.parameters)==null?void 0:ge.docs)==null?void 0:we.description}}};const lt=["Default","Sizes","States","InASettingRow","InACard","InATableRow","Controlled","SettingsPanel","FormIntegration","AllStates"];export{b as AllStates,p as Controlled,m as Default,x as FormIntegration,h as InACard,c as InASettingRow,u as InATableRow,f as SettingsPanel,o as Sizes,l as States,lt as __namedExportsOrder,ot as default};
//# sourceMappingURL=Switch.stories-CRWysMAr.js.map
