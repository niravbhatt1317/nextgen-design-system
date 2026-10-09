import{j as e,r as h}from"./iframe-D3L_AnZa.js";import{D as r}from"./DateInput-Cx_jgJRf.js";import{t as W}from"./DatePicker-CACs87ZM.js";import{I as _}from"./Input-tBX3WOsA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./Popover-Cte_AVwZ.js";import"./index-CPMGFkTY.js";import"./index-aJxLFKE2.js";import"./index-DRUA48A3.js";import"./index-BdSqhxDN.js";import"./index-DkkbFPYq.js";import"./index-C8XH1Saf.js";import"./index-CfH6n4xF.js";import"./index-retS0xqV.js";import"./Combination-DR26Rniv.js";import"./index-C4-KIcLT.js";import"./index-B7fcxO3w.js";import"./index-B2qj-pDA.js";import"./index-A1AWFnZD.js";import"./index-B_-eZSry.js";import"./Icon-BcXiq_tR.js";import"./index-ChEho857.js";import"./Button-wbBTUN8e.js";const xe={title:"New Components/DateInput",component:r,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:'The date field: the Input\'s box (32 high, corners 8, 13 text in neutral-90, placeholder neutral-70, neutral-30 edge, 12 at the sides) as a button, with the 16 calendar glyph at the right, 12 from the edge. Hover turns the border primary; focus and open add the 3-px 8% halo; disabled sits on neutral-10 in the placeholder colour; held swaps the glyph for the 14 lock and truncates the value before it; error is the danger border with the red halo and a 12 message under. Click, Enter or Space opens the DatePicker below in the library Popover; a pick, Clear, Done or Escape closes it. The value is a day, "YYYY-MM-DD", shown as "22 Oct 2026". There is no time option; `withTime` is a later addition, not built.'}}}};function p({initial:t,...a}){const[c,m]=h.useState(t??"");return e.jsx(r,{...a,value:c,onChange:m})}const M=t=>W({y:t.getFullYear(),mo:t.getMonth(),d:t.getDate()}),U=t=>{const a=new Date;return a.setDate(a.getDate()+t),M(a)},o={render:()=>e.jsx("div",{className:"mdt-w-[220px]",children:e.jsx(p,{label:"Expires on"})})},n={render:()=>e.jsx("div",{className:"mdt-w-[220px]",children:e.jsx(p,{label:"Expires on",initial:"2026-10-22"})})};function s({children:t}){return e.jsx("div",{className:"mdt-mb-2 mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-wide mdt-text-neutral-90",children:t})}const i={render:()=>e.jsxs("div",{className:"mdt-grid mdt-grid-cols-3 mdt-gap-6",children:[e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(s,{children:"Rest · hover"}),e.jsx(p,{label:"Expires on"})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(s,{children:"Focus · open"}),e.jsx(p,{label:"Expires on",initial:"2026-10-22"})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(s,{children:"Disabled"}),e.jsx(r,{label:"Expires on",value:"2026-10-22",disabled:!0})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(s,{children:"Held"}),e.jsx(r,{label:"Expires on",value:"2026-10-22",locked:!0})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(s,{children:"Error"}),e.jsx(r,{label:"Expires on",error:"Pick a day after today"})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(s,{children:"Error · filled"}),e.jsx(r,{label:"Expires on",value:"2026-01-05",error:"That day has passed"})]})]})},d={render:()=>e.jsx("div",{className:"mdt-w-[220px]",children:e.jsx(p,{label:"Expires on",min:M(new Date),max:U(90),helperText:"Today to 90 days out"})})},l={render:function(){const[a,c]=h.useState("Night shift access"),[m,G]=h.useState("2026-10-22");return e.jsxs("div",{className:"mdt-flex mdt-w-[320px] mdt-flex-col mdt-gap-4",children:[e.jsx(_,{label:"Grant name",value:a,onChange:L=>{c(L.target.value)}}),e.jsx(r,{label:"Expires on",value:m,onChange:G,clearable:!0,helperText:"Leave empty and the grant never expires"})]})}};var u,x,v,b,y;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-[220px]">
      <Demo label="Expires on" />
    </div>
}`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.source},description:{story:'Empty: "Pick a date" in the placeholder colour (neutral-70), the calendar glyph 16 at the right. Click it - the calendar opens below, 4 under the field.',...(y=(b=o.parameters)==null?void 0:b.docs)==null?void 0:y.description}}};var g,f,w,D,j;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-[220px]">
      <Demo label="Expires on" initial="2026-10-22" />
    </div>
}`,...(w=(f=n.parameters)==null?void 0:f.docs)==null?void 0:w.source},description:{story:'Holding a day: "22 Oct 2026" in neutral-90 - the day, the three-letter month, the year. Open it and the calendar starts on that month with the day filled.',...(j=(D=n.parameters)==null?void 0:D.docs)==null?void 0:j.description}}};var E,N,C,I,k;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="mdt-grid mdt-grid-cols-3 mdt-gap-6">
      <div className="mdt-w-[220px]">
        <Caption>Rest · hover</Caption>
        <Demo label="Expires on" />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Focus · open</Caption>
        <Demo label="Expires on" initial="2026-10-22" />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Disabled</Caption>
        <DateInput label="Expires on" value="2026-10-22" disabled />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Held</Caption>
        <DateInput label="Expires on" value="2026-10-22" locked />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Error</Caption>
        <DateInput label="Expires on" error="Pick a day after today" />
      </div>
      <div className="mdt-w-[220px]">
        <Caption>Error · filled</Caption>
        <DateInput label="Expires on" value="2026-01-05" error="That day has passed" />
      </div>
    </div>
}`,...(C=(N=i.parameters)==null?void 0:N.docs)==null?void 0:C.source},description:{story:"The ruled states side by side. Rest: neutral-30 edge. Hover: move the pointer over the first field - the border turns primary. Focus: click into or tab to it - the primary border with the 3-px 8% halo, kept while the calendar is open. Disabled: the neutral-10 ground, the text in the placeholder colour, no lock, and it does not open. Held: disabled with the 14 lock at the right in place of the glyph, the value truncating 8 before it; it does not open. Error: the danger border, the halo red on focus, the message under at 12.",...(k=(I=i.parameters)==null?void 0:I.docs)==null?void 0:k.description}}};var S,T,F,H,P;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-[220px]">
      <Demo label="Expires on" min={iso(new Date())} max={plusDays(90)} helperText="Today to 90 days out" />
    </div>
}`,...(F=(T=d.parameters)==null?void 0:T.docs)==null?void 0:F.source},description:{story:"Bounds from today to 90 days out: the calendar greys every earlier and later day and its month nav stops at the bound. Useful for an expiry that cannot sit in the past.",...(P=(H=d.parameters)==null?void 0:H.docs)==null?void 0:P.description}}};var Y,A,O,R,B;l.parameters={...l.parameters,docs:{...(Y=l.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: function InAFormStory() {
    const [name, setName] = useState('Night shift access');
    const [day, setDay] = useState('2026-10-22');
    return <div className="mdt-flex mdt-w-[320px] mdt-flex-col mdt-gap-4">
        <Input label="Grant name" value={name} onChange={e => {
        setName(e.target.value);
      }} />
        <DateInput label="Expires on" value={day} onChange={setDay} clearable helperText="Leave empty and the grant never expires" />
      </div>;
  }
}`,...(O=(A=l.parameters)==null?void 0:A.docs)==null?void 0:O.source},description:{story:'In a form beside a text field: the same label (13 in neutral-90, 6 under it), the same 32 box, the same edge. `clearable` adds Clear to the calendar, which reports "" and closes.',...(B=(R=l.parameters)==null?void 0:R.docs)==null?void 0:B.description}}};const ve=["Default","Filled","States","WithBounds","InAForm"];export{o as Default,n as Filled,l as InAForm,i as States,d as WithBounds,ve as __namedExportsOrder,xe as default};
//# sourceMappingURL=DateInput.stories-BdwGS-lj.js.map
