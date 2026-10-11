import{j as e,r as y}from"./iframe-BzHAYFl_.js";import{D as s}from"./DateInput-DWjCZqnP.js";import{t as ue}from"./DatePicker-L6c5OSg2.js";import{I as xe}from"./Input--NbUkjh3.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./index-DXf-30mB.js";import"./Popover-DTm1LPOi.js";import"./index-ujcLXMPj.js";import"./index-D7_eloDL.js";import"./index-WNJkPD_J.js";import"./index-CgaYO192.js";import"./index-DdnFb5ne.js";import"./index-UE-jXJxi.js";import"./index-CbXWHpsT.js";import"./index-BrZFzpgq.js";import"./Combination-BXDvjALE.js";import"./index-CeVE4V9f.js";import"./index-dPAEJctF.js";import"./index-CvoHO0ZP.js";import"./index-CnsYtuX0.js";import"./index-CtulHkt8.js";import"./Icon-Bny4tyZp.js";import"./index-ChEho857.js";import"./Button-B6xCzJJV.js";const{userEvent:le,within:pe}=__STORYBOOK_MODULE_TEST__,Le={title:"New Components/DateInput",component:s,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:'The date field: the Input\'s box (32 high, corners 8, 13 text in neutral-90, placeholder neutral-70, neutral-30 edge, 12 at the sides) as a button, with the 16 calendar glyph at the right, 12 from the edge. Hover turns the border primary; focus and open add the 3-px 8% halo; disabled sits on neutral-10 in the placeholder colour; held swaps the glyph for the 14 lock and truncates the value before it; error is the danger border with the red halo and a 12 message under. Click, Enter or Space opens the DatePicker below the field in the library Popover (above it when there is no room), the focus on the picked day. Choices there are a draft: Apply saves and closes; Escape or a press outside closes without saving; the focus returns to the field. The value is a day, "YYYY-MM-DD", shown as "22 Oct 2026"; with `withTime` (a developer setting) it is "YYYY-MM-DDTHH:mm", shown as "13 Oct 2026, 14:30", and the popover gains the time column. `clearable` lets Reset + Apply empty the field ("").'}}}};function a({initial:t,...r}){const[x,v]=y.useState(t??"");return e.jsx(s,{...r,value:x,onChange:v})}const me=t=>ue({y:t.getFullYear(),mo:t.getMonth(),d:t.getDate()}),ve=t=>{const r=new Date;return r.setDate(r.getDate()+t),me(r)},i={name:"Date",render:()=>e.jsx("div",{className:"mdt-w-[220px]",children:e.jsx(a,{label:"Expires on"})})},n={render:()=>e.jsx("div",{className:"mdt-w-[220px]",children:e.jsx(a,{label:"Expires on",initial:"2026-10-22"})})};function o({children:t}){return e.jsx("div",{className:"mdt-mb-2 mdt-text-[11px] mdt-font-semibold mdt-uppercase mdt-tracking-wide mdt-text-neutral-90",children:t})}const d={render:()=>e.jsxs("div",{className:"mdt-grid mdt-grid-cols-3 mdt-gap-6",children:[e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(o,{children:"Rest · hover"}),e.jsx(a,{label:"Expires on"})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(o,{children:"Focus · open"}),e.jsx(a,{label:"Expires on",initial:"2026-10-22"})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(o,{children:"Disabled"}),e.jsx(s,{label:"Expires on",value:"2026-10-22",disabled:!0})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(o,{children:"Held"}),e.jsx(s,{label:"Expires on",value:"2026-10-22",locked:!0})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(o,{children:"Error"}),e.jsx(s,{label:"Expires on",error:"Pick a day after today"})]}),e.jsxs("div",{className:"mdt-w-[220px]",children:[e.jsx(o,{children:"Error · filled"}),e.jsx(s,{label:"Expires on",value:"2026-01-05",error:"That day has passed"})]})]})},l={name:"Date & time",render:()=>e.jsx("div",{className:"mdt-w-[240px]",children:e.jsx(a,{label:"Starts at",withTime:!0,initial:"2026-10-13T14:30"})})},p={name:"Date · open",render:()=>e.jsx("div",{className:"mdt-h-[440px] mdt-w-[240px]",children:e.jsx(a,{label:"Expires on",initial:"2026-10-13"})}),play:async({canvasElement:t})=>{await le.click(pe(t).getByRole("button",{name:"Expires on"}))}},m={name:"Date & time · open",render:()=>e.jsx("div",{className:"mdt-h-[480px] mdt-w-[240px]",children:e.jsx(a,{label:"Starts at",withTime:!0,initial:"2026-10-13T14:30"})}),play:async({canvasElement:t})=>{await le.click(pe(t).getByRole("button",{name:"Starts at"}))}},c={name:"Flips above",render:()=>e.jsx("div",{className:"mdt-flex mdt-h-[560px] mdt-w-[240px] mdt-flex-col mdt-justify-end",children:e.jsx(a,{label:"Expires on",initial:"2026-10-13"})})},h={name:"With min / max",render:()=>e.jsx("div",{className:"mdt-w-[220px]",children:e.jsx(a,{label:"Expires on",min:me(new Date),max:ve(90),helperText:"Today to 90 days out"})})},u={render:function(){const[r,x]=y.useState("Night shift access"),[v,ce]=y.useState("2026-10-22");return e.jsxs("div",{className:"mdt-flex mdt-w-[320px] mdt-flex-col mdt-gap-4",children:[e.jsx(xe,{label:"Grant name",value:r,onChange:he=>{x(he.target.value)}}),e.jsx(s,{label:"Expires on",value:v,onChange:ce,clearable:!0,helperText:"Leave empty and the grant never expires"})]})}};var b,g,w,f,D;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  name: 'Date',
  render: () => <div className="mdt-w-[220px]">
      <Demo label="Expires on" />
    </div>
}`,...(w=(g=i.parameters)==null?void 0:g.docs)==null?void 0:w.source},description:{story:'Empty: "Pick a date" in the placeholder colour, the calendar glyph 16 at the right. Click it - the picker opens below, 4 under the field.',...(D=(f=i.parameters)==null?void 0:f.docs)==null?void 0:D.description}}};var E,j,N,T,S;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="mdt-w-[220px]">
      <Demo label="Expires on" initial="2026-10-22" />
    </div>
}`,...(N=(j=n.parameters)==null?void 0:j.docs)==null?void 0:N.source},description:{story:'Holding a day: "22 Oct 2026" in neutral-90 - the day, the three-letter month, the year. Open it and the calendar starts on that month with the day filled.',...(S=(T=n.parameters)==null?void 0:T.docs)==null?void 0:S.description}}};var C,k,I,O,A;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(I=(k=d.parameters)==null?void 0:k.docs)==null?void 0:I.source},description:{story:"The ruled states side by side. Rest: neutral-30 edge. Hover: move the pointer over the first field - the border turns primary. Focus: click into or tab to it - the primary border with the 3-px 8% halo, kept while the calendar is open. Disabled: the neutral-10 ground, the text in the placeholder colour, no lock, and it does not open. Held: disabled with the 14 lock at the right in place of the glyph, the value truncating 8 before it; it does not open. Error: the danger border, the halo red on focus, the message under at 12.",...(A=(O=d.parameters)==null?void 0:O.docs)==null?void 0:A.description}}};var F,R,Y,B,H;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  name: 'Date & time',
  render: () => <div className="mdt-w-[240px]">
      <Demo label="Starts at" withTime initial="2026-10-13T14:30" />
    </div>
}`,...(Y=(R=l.parameters)==null?void 0:R.docs)==null?void 0:Y.source},description:{story:'`withTime`: "13 Oct 2026, 14:30". Open it - the calendar and the time column side by side, the list opened on 14:30; pick, then Apply.',...(H=(B=l.parameters)==null?void 0:B.docs)==null?void 0:H.description}}};var _,M,P,W,L;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  name: 'Date · open',
  render: () => <div className="mdt-h-[440px] mdt-w-[240px]">
      <Demo label="Expires on" initial="2026-10-13" />
    </div>,
  play: async ({
    canvasElement
  }) => {
    await userEvent.click(within(canvasElement).getByRole('button', {
      name: 'Expires on'
    }));
  }
}`,...(P=(M=p.parameters)==null?void 0:M.docs)==null?void 0:P.source},description:{story:"The popover open, date only - the panel hugs its days.",...(L=(W=p.parameters)==null?void 0:W.docs)==null?void 0:L.description}}};var G,U,K,V,q;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: 'Date & time · open',
  render: () => <div className="mdt-h-[480px] mdt-w-[240px]">
      <Demo label="Starts at" withTime initial="2026-10-13T14:30" />
    </div>,
  play: async ({
    canvasElement
  }) => {
    await userEvent.click(within(canvasElement).getByRole('button', {
      name: 'Starts at'
    }));
  }
}`,...(K=(U=m.parameters)==null?void 0:U.docs)==null?void 0:K.source},description:{story:"The popover open with time - one fixed height, the time column beside the calendar.",...(q=(V=m.parameters)==null?void 0:V.docs)==null?void 0:q.description}}};var z,J,Q,X,Z;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  name: 'Flips above',
  render: () => <div className="mdt-flex mdt-h-[560px] mdt-w-[240px] mdt-flex-col mdt-justify-end">
      <Demo label="Expires on" initial="2026-10-13" />
    </div>
}`,...(Q=(J=c.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:"Near the bottom of the page the popover opens ABOVE the field (the library Popover flips when there is no room below).",...(Z=(X=c.parameters)==null?void 0:X.docs)==null?void 0:Z.description}}};var $,ee,te,ae,re;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  name: 'With min / max',
  render: () => <div className="mdt-w-[220px]">
      <Demo label="Expires on" min={iso(new Date())} max={plusDays(90)} helperText="Today to 90 days out" />
    </div>
}`,...(te=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:te.source},description:{story:"Bounds from today to 90 days out: the calendar greys every earlier and later day, month and year, and its arrows stop at the bound. Useful for an expiry that cannot sit in the past.",...(re=(ae=h.parameters)==null?void 0:ae.docs)==null?void 0:re.description}}};var se,oe,ie,ne,de;u.parameters={...u.parameters,docs:{...(se=u.parameters)==null?void 0:se.docs,source:{originalSource:`{
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
}`,...(ie=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:ie.source},description:{story:'In a form beside a text field: the same label (13 in neutral-90, 6 under it), the same 32 box, the same edge. `clearable` lets Reset then Apply empty the field, reporting "".',...(de=(ne=u.parameters)==null?void 0:ne.docs)==null?void 0:de.description}}};const Ge=["Default","Filled","States","DateAndTime","DateOpen","DateAndTimeOpen","FlipsAbove","WithBounds","InAForm"];export{l as DateAndTime,m as DateAndTimeOpen,p as DateOpen,i as Default,n as Filled,c as FlipsAbove,u as InAForm,d as States,h as WithBounds,Ge as __namedExportsOrder,Le as default};
//# sourceMappingURL=DateInput.stories-C0OLgPva.js.map
