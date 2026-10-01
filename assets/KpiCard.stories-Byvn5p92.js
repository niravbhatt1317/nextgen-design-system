import{j as e,r as he}from"./iframe-CT2yASfK.js";import{K as t,a as b,b as me}from"./KpiCharts-CXiUXXre.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./Icon-Dk3M_uwZ.js";import"./index-ChEho857.js";import"./Badge-D-ZcA_NT.js";const Ce={title:"New Components/KPI Card",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["**Behaviour reference — Claude artifacts:** [KPI Card](https://claude.ai/code/artifact/c3071fdf-27df-4e5a-8a29-b8de2bea769d) and [KPI Group](https://claude.ai/code/artifact/e93baf81-b8e3-4264-b2a8-d7ec6f717c22), live pages showing how the card and the group behave. Open them to see the intended behaviour — they are what this component was designed and approved from.","","One metric on one card: a label, a big number, one quiet line of context. It can carry a trend chip, and it has an area kept for a chart. By default it is a plain fact. Clickable is a switch that can be turned on for any card, chip or chart included; then it says so on hover.","Give it `items` instead of one metric and it becomes a group: two or more related metrics sharing one card, split by inset hairlines. Each segment is a whole card with its own switch.","Widths: a plain card has a 174px floor and no ceiling; a chart card no floor and 270 natural; a group is the sum. In a KpiStrip the cards grow evenly until the row is full and the strip scrolls past the fit. Dark mode comes from the theme toggle."].join(`

`)}}}},h=({children:m})=>e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-items-start mdt-gap-6",children:m}),i={args:{label:"Total users",value:8200,hint:"across all organisations"}},n={render:()=>e.jsxs(h,{children:[e.jsx(t,{label:"Dormant users",value:256,hint:"no sign-in in 90+ days"}),e.jsx(t,{label:"Active users",value:7640}),e.jsx(t,{label:"Total users",value:8200,hint:"across all organisations",style:{width:220}})]})},s={render:()=>e.jsxs(h,{children:[e.jsx(t,{label:"Active users",value:7640,hint:"93% of total",delta:{label:"3.1%",direction:"up",tone:"good"}}),e.jsx(t,{label:"Failed sign-ins",value:142,hint:"last 24 hours",delta:{label:"12%",direction:"up",tone:"bad"}}),e.jsx(t,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"}}),e.jsx(t,{label:"Pending invites",value:11,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}})]})},r={render:()=>e.jsxs(h,{children:[e.jsx(t,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(b,{percent:82,caption:"capacity"})}),e.jsx(t,{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(me,{values:[56,44,32,38,26,34],base:22,threshold:40})})]})},o={render:function(){const[v,a]=he.useState("Click a card.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs(h,{children:[e.jsx(t,{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{a("Pending invites: the Invitations drawer opens on its Pending tab.")}}),e.jsx(t,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"},onClick:()=>{a("Privileged accounts: the list, filtered to privileged roles.")}}),e.jsx(t,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(b,{percent:82,caption:"capacity"}),onClick:()=>{a("Licensed users limit: the licence page.")}})]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:v})]})}},l={render:()=>e.jsxs(h,{children:[e.jsx(t,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant"}),e.jsx(t,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant",style:{width:270}})]})},c={render:()=>e.jsx(t,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance"},{label:"Active invitation links",value:4,hint:"37 issued"}]})},d={render:()=>e.jsx(t,{label:"Members",items:[{label:"Total",value:68,hint:"members"},{label:"Active",value:48,hint:"signed in this month",delta:{label:"6%",direction:"up",tone:"good"}},{label:"Inactive",value:10,hint:"no sign-in in 90+ days"},{label:"Pending invites",value:10,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}}]})},u={render:()=>e.jsx(t,{label:"Capacity",items:[{label:"Active users",value:7640,hint:"8.2k total"},{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(b,{percent:82,caption:"capacity"})},{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(me,{values:[56,44,32,38,26,34],base:22,threshold:40})}]})},p={render:function(){const[v,a]=he.useState("Click a segment.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(t,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{a("Pending invites: the drawer opens on its Pending tab.")}},{label:"Active invitation links",value:4,hint:"37 issued",onClick:()=>{a("Active invitation links: the drawer opens on its Links tab.")}},{label:"Expired links",value:2,hint:"this month"}]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:v})]})}};var g,w,f,x,y;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Total users',
    value: 8200,
    hint: 'across all organisations'
  }
}`,...(f=(w=i.parameters)==null?void 0:w.docs)==null?void 0:f.source},description:{story:"A plain card at its 174 floor: label, value, supporting line. A number is rounded to one decimal with k or M.",...(y=(x=i.parameters)==null?void 0:x.docs)==null?void 0:y.description}}};var C,k,j,K,A;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Dormant users" value={256} hint="no sign-in in 90+ days" />
      <KpiCard label="Active users" value={7640} />
      <KpiCard label="Total users" value={8200} hint="across all organisations" style={{
      width: 220
    }} />
    </Row>
}`,...(j=(k=n.parameters)==null?void 0:k.docs)==null?void 0:j.source},description:{story:"Whole numbers, no supporting line, a wider card. On its own a card sits at the floor unless given a width.",...(A=(K=n.parameters)==null?void 0:K.docs)==null?void 0:A.description}}};var P,N,S,G,I;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Active users" value={7640} hint="93% of total" delta={{
      label: '3.1%',
      direction: 'up',
      tone: 'good'
    }} />
      <KpiCard label="Failed sign-ins" value={142} hint="last 24 hours" delta={{
      label: '12%',
      direction: 'up',
      tone: 'bad'
    }} />
      <KpiCard label="Privileged accounts" value={12} hint="admin / elevated" delta={{
      label: '4.5%',
      direction: 'up',
      tone: 'caution'
    }} />
      <KpiCard label="Pending invites" value={11} hint="awaiting acceptance" delta={{
      label: '2',
      direction: 'down',
      tone: 'flat'
    }} />
    </Row>
}`,...(S=(N=s.parameters)==null?void 0:N.docs)==null?void 0:S.source},description:{story:"The verdict lives only in the chip: fill, no outline, an arrow up or down. Four tones by meaning. It renders only when the data carries a change.",...(I=(G=s.parameters)==null?void 0:G.docs)==null?void 0:I.description}}};var L,T,R,W,O;r.parameters={...r.parameters,docs:{...(L=r.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Licensed users limit" value={8200} hint="10k allowed" chart={<KpiGauge percent={82} caption="capacity" />} />
      <KpiCard label="Anomalous growth" value={47} hint="users in last 24h" chart={<KpiBars values={[56, 44, 32, 38, 26, 34]} base={22} threshold={40} />} />
    </Row>
}`,...(R=(T=r.parameters)==null?void 0:T.docs)==null?void 0:R.source},description:{story:"The right side of the card is kept for a chart and nothing else. KpiGauge and KpiBars are the first two; any chart drawn to fit 104 × 62 can go there. A chart card has no floor; the chart keeps its size and the text side gives way first.",...(O=(W=r.parameters)==null?void 0:W.docs)==null?void 0:O.description}}};var E,B,D,F,M;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function ClickableStory() {
    const [note, setNote] = useState('Click a card.');
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Row>
          <KpiCard label="Pending invites" value={11} hint="awaiting acceptance" onClick={() => {
          setNote('Pending invites: the Invitations drawer opens on its Pending tab.');
        }} />
          <KpiCard label="Privileged accounts" value={12} hint="admin / elevated" delta={{
          label: '4.5%',
          direction: 'up',
          tone: 'caution'
        }} onClick={() => {
          setNote('Privileged accounts: the list, filtered to privileged roles.');
        }} />
          <KpiCard label="Licensed users limit" value={8200} hint="10k allowed" chart={<KpiGauge percent={82} caption="capacity" />} onClick={() => {
          setNote('Licensed users limit: the licence page.');
        }} />
        </Row>
        <p className="mdt-m-0 mdt-text-xs mdt-text-muted-foreground" aria-live="polite">
          {note}
        </p>
      </div>;
  }
}`,...(D=(B=o.parameters)==null?void 0:B.docs)==null?void 0:D.source},description:{story:"Off by default. With a click the card is a real button, whatever it holds: on hover or keyboard focus the label takes the reading ink and a dotted underline, a gear appears beside it, a soft fill sits 6px inside the edges, and the card presses to 97%.",...(M=(F=o.parameters)==null?void 0:F.docs)==null?void 0:M.description}}};var V,_,q,z,U;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" />
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" style={{
      width: 270
    }} />
    </Row>
}`,...(q=(_=l.parameters)==null?void 0:_.docs)==null?void 0:q.source},description:{story:"The label truncates with an ellipsis at the card's width and never wraps; the supporting line does the same. The number never shrinks.",...(U=(z=l.parameters)==null?void 0:z.docs)==null?void 0:U.description}}};var H,J,Q,X,Y;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <KpiCard label="Invitations" items={[{
    label: 'Pending invites',
    value: 11,
    hint: 'awaiting acceptance'
  }, {
    label: 'Active invitation links',
    value: 4,
    hint: '37 issued'
  }]} />
}`,...(Q=(J=c.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:"Two related metrics sharing one card: the Users invitations pair. One hairline, 12px clear of the edges.",...(Y=(X=c.parameters)==null?void 0:X.docs)==null?void 0:Y.description}}};var Z,$,ee,te,ae;d.parameters={...d.parameters,docs:{...(Z=d.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <KpiCard label="Members" items={[{
    label: 'Total',
    value: 68,
    hint: 'members'
  }, {
    label: 'Active',
    value: 48,
    hint: 'signed in this month',
    delta: {
      label: '6%',
      direction: 'up',
      tone: 'good'
    }
  }, {
    label: 'Inactive',
    value: 10,
    hint: 'no sign-in in 90+ days'
  }, {
    label: 'Pending invites',
    value: 10,
    hint: 'awaiting acceptance',
    delta: {
      label: '2',
      direction: 'down',
      tone: 'flat'
    }
  }]} />
}`,...(ee=($=d.parameters)==null?void 0:$.docs)==null?void 0:ee.source},description:{story:"As many segments as belong together; chips ride inside segments like anywhere else.",...(ae=(te=d.parameters)==null?void 0:te.docs)==null?void 0:ae.description}}};var ie,ne,se,re,oe;u.parameters={...u.parameters,docs:{...(ie=u.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <KpiCard label="Capacity" items={[{
    label: 'Active users',
    value: 7640,
    hint: '8.2k total'
  }, {
    label: 'Licensed users limit',
    value: 8200,
    hint: '10k allowed',
    chart: <KpiGauge percent={82} caption="capacity" />
  }, {
    label: 'Anomalous growth',
    value: 47,
    hint: 'users in last 24h',
    chart: <KpiBars values={[56, 44, 32, 38, 26, 34]} base={22} threshold={40} />
  }]} />
}`,...(se=(ne=u.parameters)==null?void 0:ne.docs)==null?void 0:se.source},description:{story:"A segment may carry a chart in its chart area, exactly as a single card does.",...(oe=(re=u.parameters)==null?void 0:re.docs)==null?void 0:oe.description}}};var le,ce,de,ue,pe;p.parameters={...p.parameters,docs:{...(le=p.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: function GroupClickableStory() {
    const [note, setNote] = useState('Click a segment.');
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <KpiCard label="Invitations" items={[{
        label: 'Pending invites',
        value: 11,
        hint: 'awaiting acceptance',
        onClick: () => {
          setNote('Pending invites: the drawer opens on its Pending tab.');
        }
      }, {
        label: 'Active invitation links',
        value: 4,
        hint: '37 issued',
        onClick: () => {
          setNote('Active invitation links: the drawer opens on its Links tab.');
        }
      }, {
        label: 'Expired links',
        value: 2,
        hint: 'this month'
      }]} />
        <p className="mdt-m-0 mdt-text-xs mdt-text-muted-foreground" aria-live="polite">
          {note}
        </p>
      </div>;
  }
}`,...(de=(ce=p.parameters)==null?void 0:ce.docs)==null?void 0:de.source},description:{story:"Each segment has its own switch. A clickable segment shows the cue on its own; its neighbours do not react and the outer card never lifts.",...(pe=(ue=p.parameters)==null?void 0:ue.docs)==null?void 0:pe.description}}};const ke=["Default","Variations","WithTrendChip","WithChart","Clickable","LongLabel","Group","GroupOfFour","GroupWithCharts","GroupClickable"];export{o as Clickable,i as Default,c as Group,p as GroupClickable,d as GroupOfFour,u as GroupWithCharts,l as LongLabel,n as Variations,r as WithChart,s as WithTrendChip,ke as __namedExportsOrder,Ce as default};
//# sourceMappingURL=KpiCard.stories-Byvn5p92.js.map
