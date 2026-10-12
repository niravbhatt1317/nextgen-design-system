import{j as e,r as Q}from"./iframe-D-E7BoCI.js";import{c as X}from"./index-CcRgbaMz.js";import{D as I,f as Z}from"./DatePicker-BT99uI1p.js";import{p as ee}from"./Popover-C4QuX0-W.js";import"./preload-helper-Dp1pzeXC.js";import"./Button-C4bqVuTg.js";import"./index-ChEho857.js";import"./icon-at-drawn-size-ydhhrPUp.js";import"./Icon-DRAPLjAk.js";import"./index-eTje8Nnc.js";import"./index-Q6cHrTZ1.js";import"./index-BInFQtXf.js";import"./index-DzxThuNj.js";import"./index-JHl9tmz8.js";import"./index-t1q4Tyle.js";import"./index-Ct0qL4iO.js";import"./index--YuAuwfY.js";import"./Combination-HNbAbVTt.js";import"./index-CulxkFIv.js";import"./index-Ck-xo2G0.js";import"./index-DwJ4pp5I.js";import"./index-BHBA_bvN.js";import"./index-1Hd2KPDX.js";const{userEvent:d,within:h}=__STORYBOOK_MODULE_TEST__,ke={title:"New Components/DatePicker",component:I,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'The calendar, 300 wide: the month title between two ghost chevrons (28, a hover fill only). The title is a button - "October 2026 ⌄" opens the months (3 × 4, 36 boxes, 8 / 12 apart, arrows step a year); "2026" opens twenty years (4 × 5, 36 boxes, arrows step twenty); "2020 – 2039" is not a button. Days 36 × 36, 8 between rows, every number in the secondary ink (neutral-90), the neighbouring months faint, today / this month / this year a thin neutral-40 outline, the pick the info badge\'s pale blue under its blue ink at 600 with no outline, the hover the overlay hover (neutral-10 in light, a step above the panel in dark). `withTime` - a developer setting, never a switch people see - adds the 184-wide time column: the picked day ("Tue, 13 Oct", 14 / 600) over "Local time · 24-hour" (12, faint), then a time every `timeStep` minutes (default 30), rows 32, 2 apart. Everything is a draft until Apply (primary, sm); Reset (ghost, sm) empties it; Apply stays off until a day (and a time) is picked. The size never changes between levels. The value is "YYYY-MM-DD", or "YYYY-MM-DDTHH:mm" with `withTime`. `onClear` / `onDone` from the older Clear / Done footer still work: `onClear` fires on Reset and makes the picker clearable; `onDone` fires after Apply.'}}},decorators:[t=>e.jsx("div",{className:X(ee,"mdt-rounded-xl"),children:e.jsx(t,{})})]};function o({initial:t,...a}){const[p,J]=Q.useState(t??"");return e.jsxs("div",{children:[e.jsx(I,{...a,value:p,onChange:J}),e.jsxs("p",{className:"mdt-m-0 mdt-border-0 mdt-border-t mdt-border-solid mdt-border-neutral-30 mdt-px-4 mdt-py-2 mdt-text-xs mdt-text-faint",children:["Saved: ",p?`${p} - "${Z(p)}"`:"nothing yet"]})]})}const r={name:"Date",render:()=>e.jsx(o,{initial:"2026-10-13"})},n={name:"Date & time",render:()=>e.jsx(o,{withTime:!0,initial:"2026-10-13T14:30"})},s={render:()=>e.jsx(o,{})},i={name:"With min / max",render:()=>e.jsx(o,{initial:"2026-10-12",min:"2026-10-05",max:"2026-11-20"})},m={name:"Month level",render:()=>e.jsx(o,{initial:"2026-10-13"}),play:async({canvasElement:t})=>{const a=h(t);await d.click(a.getByRole("button",{name:"October 2026, choose a month"}))}},c={name:"Year level",render:()=>e.jsx(o,{initial:"2026-10-13"}),play:async({canvasElement:t})=>{const a=h(t);await d.click(a.getByRole("button",{name:"October 2026, choose a month"})),await d.click(a.getByRole("button",{name:"2026, choose a year"}))}},l={name:"Date & time · month level",render:()=>e.jsx(o,{withTime:!0,initial:"2026-10-13T14:30"}),play:async({canvasElement:t})=>{const a=h(t);await d.click(a.getByRole("button",{name:"October 2026, choose a month"}))}};var u,y,v,w,b;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: 'Date',
  render: () => <Demo initial="2026-10-13" />
}`,...(v=(y=r.parameters)==null?void 0:y.docs)==null?void 0:v.source},description:{story:"Date only: the panel hugs its days. Pick a day - it turns pale blue - then Apply; Reset empties the draft.",...(b=(w=r.parameters)==null?void 0:w.docs)==null?void 0:b.description}}};var D,g,x,f,T;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  name: 'Date & time',
  render: () => <Demo withTime initial="2026-10-13T14:30" />
}`,...(x=(g=n.parameters)==null?void 0:g.docs)==null?void 0:x.source},description:{story:"`withTime`: the 184-wide time column at the right, one fixed height at every level. The list opens with 14:30 in view.",...(T=(f=n.parameters)==null?void 0:f.docs)==null?void 0:T.description}}};var k,E,O,M,j;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Demo />
}`,...(O=(E=s.parameters)==null?void 0:E.docs)==null?void 0:O.source},description:{story:"No value yet: the calendar opens on today's month with today outlined; Apply stays off until a day is picked.",...(j=(M=s.parameters)==null?void 0:M.docs)==null?void 0:j.description}}};var R,S,Y,B,A;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  name: 'With min / max',
  render: () => <Demo initial="2026-10-12" min="2026-10-05" max="2026-11-20" />
}`,...(Y=(S=i.parameters)==null?void 0:S.docs)==null?void 0:Y.source},description:{story:"Bounds, min 5 Oct 2026 and max 20 Nov 2026: days, months and years outside grey out and do not click; the arrows stop at the bound.",...(A=(B=i.parameters)==null?void 0:B.docs)==null?void 0:A.description}}};var L,_,C,N,W;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  name: 'Month level',
  render: () => <Demo initial="2026-10-13" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'October 2026, choose a month'
    }));
  }
}`,...(C=(_=m.parameters)==null?void 0:_.docs)==null?void 0:C.source},description:{story:`The month level: the title "2026" (no chevron, still a button), three columns of four months, arrows step a year. The panel keeps the day level's height.`,...(W=(N=m.parameters)==null?void 0:N.docs)==null?void 0:W.description}}};var P,H,$,z,K;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  name: 'Year level',
  render: () => <Demo initial="2026-10-13" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'October 2026, choose a month'
    }));
    await userEvent.click(canvas.getByRole('button', {
      name: '2026, choose a year'
    }));
  }
}`,...($=(H=c.parameters)==null?void 0:H.docs)==null?void 0:$.source},description:{story:'The year level: "2020 – 2039" (not a button), twenty years four across, arrows step twenty.',...(K=(z=c.parameters)==null?void 0:z.docs)==null?void 0:K.description}}};var U,V,q,F,G;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  name: 'Date & time · month level',
  render: () => <Demo withTime initial="2026-10-13T14:30" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'October 2026, choose a month'
    }));
  }
}`,...(q=(V=l.parameters)==null?void 0:V.docs)==null?void 0:q.source},description:{story:"The month level with time: the same fixed height as the days, the time column beside it.",...(G=(F=l.parameters)==null?void 0:F.docs)==null?void 0:G.description}}};const Ee=["DateOnly","DateAndTime","Empty","WithMinMax","MonthLevel","YearLevel","DateAndTimeMonthLevel"];export{n as DateAndTime,l as DateAndTimeMonthLevel,r as DateOnly,s as Empty,m as MonthLevel,i as WithMinMax,c as YearLevel,Ee as __namedExportsOrder,ke as default};
//# sourceMappingURL=DatePicker.stories-B8WetSXu.js.map
