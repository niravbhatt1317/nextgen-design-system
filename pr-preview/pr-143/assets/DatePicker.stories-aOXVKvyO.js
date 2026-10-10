import{j as e,r as i}from"./iframe-DQursvEH.js";import"./index-BgugIDqY.js";import{D as m,f as z}from"./DatePicker-DYgbhptS.js";import{B as l}from"./Button-Cshedlc1.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./Icon-CuII0BIc.js";import"./index-ChEho857.js";const R={title:"New Components/DatePicker",component:m,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'The calendar on its own. A 296 grid: seven columns, 2-px gap, weekday initials 11 / 600 in neutral-50, days 34 high with corners 8 at 13 / 500, the month name 14 / 600 between two 28 icon-only ghost buttons. The chosen day is the primary fill; today is a 1-px neutral-40 ring; days outside min / max grey to neutral-50 and are not clickable, and the month nav stops at a bound. Clear (ghost, sm) and Done (primary, sm) show only when a handler is given. The value is a day, "YYYY-MM-DD" - there is no time; a `withTime` option is a later addition, not built.'}}},decorators:[a=>e.jsx("div",{className:"mdt-rounded-2xl mdt-border mdt-border-border mdt-bg-popover mdt-p-5 mdt-text-popover-foreground mdt-shadow-md",children:e.jsx(a,{})})]};function E({initial:a,...t}){const[o,c]=i.useState(a??"");return e.jsx(m,{...t,value:o,onChange:c})}const r={render:()=>e.jsx(E,{})},s={render:()=>e.jsx(E,{initial:"2026-10-12",min:"2026-10-05",max:"2026-11-20"})},n={render:function(){const[t,o]=i.useState("2026-10-22"),[c,Y]=i.useState("");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsx(m,{value:t,onChange:o,onClear:()=>{o("")},onDone:()=>{Y(t?`Done - ${z(t)}`:"Done - no day")}}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:c||"Pick, then Done."})]})}},d={render:function(){const[t,o]=i.useState("2026-10-22");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsx(m,{value:t,onChange:o}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(l,{variant:"outline",size:"sm",onClick:()=>{o("2026-12-01")},children:"Jump to 1 Dec 2026"}),e.jsx(l,{variant:"ghost",size:"sm",onClick:()=>{o("")},children:"Unset"})]}),e.jsxs("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:["Value: ",t||"none",t?` - shown as "${z(t)}"`:""]})]})}};var u,p,h,y,x;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <Demo />
}`,...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source},description:{story:"No value: the calendar opens on today's month with today ringed (1 px, neutral-40). Pick a day and it fills with the primary colour.",...(x=(y=r.parameters)==null?void 0:y.docs)==null?void 0:x.description}}};var f,g,D,v,C;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <Demo initial="2026-10-12" min="2026-10-05" max="2026-11-20" />
}`,...(D=(g=s.parameters)==null?void 0:g.docs)==null?void 0:D.source},description:{story:"Bounds: min 5 Oct 2026, max 20 Nov 2026. Days before and after grey to neutral-50 and do not click; the prev arrow stops at October and the next at November.",...(C=(v=s.parameters)==null?void 0:v.docs)==null?void 0:C.description}}};var w,N,j,k,S;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: function WithClearStory() {
    const [day, setDay] = useState('2026-10-22');
    const [note, setNote] = useState('');
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <DatePicker value={day} onChange={setDay} onClear={() => {
        setDay('');
      }} onDone={() => {
        setNote(day ? \`Done - \${formatDay(day)}\` : 'Done - no day');
      }} />
        <p className="mdt-text-xs mdt-text-muted-foreground">{note || 'Pick, then Done.'}</p>
      </div>;
  }
}`,...(j=(N=n.parameters)==null?void 0:N.docs)==null?void 0:j.source},description:{story:"Clear (ghost, sm) at the left of the footer and Done (primary, sm) at the right, 12 above them. Each shows only when its handler is given.",...(S=(k=n.parameters)==null?void 0:k.docs)==null?void 0:S.description}}};var b,B,P,W,T;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: function ControlledStory() {
    const [day, setDay] = useState('2026-10-22');
    return <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <DatePicker value={day} onChange={setDay} />
        <div className="mdt-flex mdt-items-center mdt-gap-2">
          <Button variant="outline" size="sm" onClick={() => {
          setDay('2026-12-01');
        }}>
            Jump to 1 Dec 2026
          </Button>
          <Button variant="ghost" size="sm" onClick={() => {
          setDay('');
        }}>
            Unset
          </Button>
        </div>
        <p className="mdt-text-xs mdt-text-muted-foreground">
          Value: {day || 'none'}
          {day ? \` - shown as "\${formatDay(day)}"\` : ''}
        </p>
      </div>;
  }
}`,...(P=(B=d.parameters)==null?void 0:B.docs)==null?void 0:P.source},description:{story:"The value owned outside: change it from the buttons and the calendar follows into that month and marks the day.",...(T=(W=d.parameters)==null?void 0:W.docs)==null?void 0:T.description}}};const q=["Default","WithBounds","WithClear","Controlled"];export{d as Controlled,r as Default,s as WithBounds,n as WithClear,q as __namedExportsOrder,R as default};
//# sourceMappingURL=DatePicker.stories-aOXVKvyO.js.map
