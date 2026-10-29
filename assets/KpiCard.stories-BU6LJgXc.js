import{j as e,r as N}from"./iframe-Bb4_GmgH.js";import{c as ct}from"./index-CcRgbaMz.js";import{K as t,a,b as ot}from"./KpiCharts-BvlU6Thw.js";import{B as G}from"./Badge-DvIj1K0L.js";import"./preload-helper-Dp1pzeXC.js";import"./index-C6xV686X.js";import"./Icon-BQSN7qIS.js";import"./index-ChEho857.js";const Ct={title:"New Components/KPI Card",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["**Behaviour reference — Claude artifacts:** [KPI Card](https://claude.ai/code/artifact/c3071fdf-27df-4e5a-8a29-b8de2bea769d) and [KPI Group](https://claude.ai/code/artifact/e93baf81-b8e3-4264-b2a8-d7ec6f717c22), live pages showing how the card and the group behave. Open them to see the intended behaviour — they are what this component was designed and approved from.","","One metric on one card: a label, a big number, one quiet line of context. It can carry a trend chip, and it has an area kept for a chart. By default it is a plain fact. Clickable is a switch that can be turned on for any card, chip or chart included; then it says so on hover.","Give it `items` instead of one metric and it becomes a group: two or more related metrics sharing one card, split by inset hairlines. Each segment is a whole card with its own switch.","Widths: a plain card has a 174px floor and no ceiling; a chart card no floor and 270 natural; a group is the sum. In a KpiStrip the cards grow evenly until the row is full and the strip scrolls past the fit. Dark mode comes from the theme toggle.","Two surfaces: `outlined` (the default) is the card on the page, the card ground inside a hairline; `filled` is the card inside a drawer, a grey ground with no edge. A segment whose value is a line of text rather than a number sizes to the line, with no floor in height or width."].join(`

`)}}}},i=({children:n})=>e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-items-start mdt-gap-6",children:n}),d={args:{label:"Total users",value:8200,hint:"across all organisations"}},c={render:()=>e.jsxs(i,{children:[e.jsx(t,{label:"Dormant users",value:256,hint:"no sign-in in 90+ days"}),e.jsx(t,{label:"Active users",value:7640}),e.jsx(t,{label:"Total users",value:8200,hint:"across all organisations",style:{width:220}})]})},h={render:()=>e.jsxs(i,{children:[e.jsx(t,{label:"Active users",value:7640,hint:"93% of total",delta:{label:"3.1%",direction:"up",tone:"good"}}),e.jsx(t,{label:"Failed sign-ins",value:142,hint:"last 24 hours",delta:{label:"12%",direction:"up",tone:"bad"}}),e.jsx(t,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"}}),e.jsx(t,{label:"Pending invites",value:11,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}})]})},u={render:()=>e.jsxs(i,{children:[e.jsx(t,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(a,{percent:82,caption:"capacity"})}),e.jsx(t,{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(ot,{values:[56,44,32,38,26,34],base:22,threshold:40})})]})},p={render:()=>e.jsxs(i,{children:[e.jsx(a,{shape:"ring",percent:0,label:"Configuration health 0%"}),e.jsx(a,{shape:"ring",percent:50,label:"Configuration health 50%"}),e.jsx(a,{shape:"ring",percent:75,label:"Configuration health 75%"}),e.jsx(a,{shape:"ring",percent:100,label:"Configuration health 100%"}),e.jsx(a,{shape:"ring",percent:25,bad:!0,label:"Configuration health 25%, failing"})]})},K=[{from:90,to:96,tone:"crit",word:"Low"},{from:96,to:98,tone:"warn",word:"Below target"},{from:98,to:100,tone:"good",word:"On target"}],ht=[{from:90,to:95,tone:"crit",word:"Low"},{from:95,to:98,tone:"warn",word:"Below target"},{from:98,to:100,tone:"good",word:"On target"}],lt=[{from:0,to:80,tone:"info",word:"Rolling out"},{from:80,to:100,tone:"good",word:"On target"}],ut=({children:n})=>e.jsx("div",{className:"mdt-grid mdt-max-w-[884px] mdt-grid-cols-3 mdt-gap-3",children:n}),m={render:()=>e.jsxs(ut,{children:[e.jsx(t,{label:"Agents sending data",value:"2,102",hint:"of 2,134",style:{width:"100%"},chart:e.jsx(a,{shape:"zones",percent:98.5,min:90,zones:K,caption:"sending data"})}),e.jsx(t,{label:"Working normally",value:"2,052",hint:"of 2,134",style:{width:"100%"},chart:e.jsx(a,{shape:"zones",percent:96.2,min:90,zones:ht,caption:"working normally"})}),e.jsx(t,{label:"On the current version",value:"1,086",hint:"of 2,134",style:{width:"100%"},chart:e.jsx(a,{shape:"zones",percent:50.9,zones:lt,caption:"on 7.4.0"})})]})},g={render:()=>e.jsxs(i,{children:[e.jsx(a,{shape:"zones",percent:92.9,min:90,zones:K,caption:"reporting"}),e.jsx(a,{shape:"zones",percent:97,min:90,zones:K,caption:"reporting"}),e.jsx(a,{shape:"zones",percent:100,min:90,zones:K,caption:"reporting"}),e.jsx(a,{shape:"zones",percent:12,zones:lt,caption:"on 7.4.0"})]})},v={render:()=>e.jsxs(i,{children:[e.jsx(a,{percent:98.5,caption:"sending data",tone:"good",target:98}),e.jsx(a,{percent:96.2,caption:"normal",tone:"warn",target:98}),e.jsx(a,{percent:88.4,caption:"reporting",tone:"crit",target:95}),e.jsx(a,{percent:50.9,caption:"on 7.4.0",tone:"info",target:80})]})},b={render:function(){const[s,o]=N.useState("Click a card.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs(i,{children:[e.jsx(t,{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{o("Pending invites: the Invitations drawer opens on its Pending tab.")}}),e.jsx(t,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"},onClick:()=>{o("Privileged accounts: the list, filtered to privileged roles.")}}),e.jsx(t,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(a,{percent:82,caption:"capacity"}),onClick:()=>{o("Licensed users limit: the licence page.")}})]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:s})]})}},f={render:()=>e.jsxs(i,{children:[e.jsx(t,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant"}),e.jsx(t,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant",style:{width:270}})]})},w={render:()=>e.jsx(t,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance"},{label:"Active invitation links",value:4,hint:"37 issued"}]})},x={render:()=>e.jsx(t,{label:"Members",items:[{label:"Total",value:68,hint:"members"},{label:"Active",value:48,hint:"signed in this month",delta:{label:"6%",direction:"up",tone:"good"}},{label:"Inactive",value:10,hint:"no sign-in in 90+ days"},{label:"Pending invites",value:10,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}}]})},C={render:()=>e.jsx(t,{label:"Capacity",items:[{label:"Active users",value:7640,hint:"8.2k total"},{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(a,{percent:82,caption:"capacity"})},{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(ot,{values:[56,44,32,38,26,34],base:22,threshold:40})}]})},y={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs(i,{children:[e.jsx(t,{label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(t,{size:"sm",label:"Total users",value:8200,hint:"across all organisations"})]}),e.jsxs(i,{children:[e.jsx(t,{label:"Structure",items:[{label:"Sites",value:12,hint:"across three regions"},{label:"Departments",value:48,hint:"6 without a head"}]}),e.jsx(t,{size:"sm",label:"Structure",items:[{label:"Sites",value:12,hint:"across three regions"},{label:"Departments",value:48,hint:"6 without a head",delta:{label:"2",direction:"up",tone:"flat"}}]})]}),e.jsx(i,{children:e.jsx(t,{size:"sm",label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(a,{percent:82,caption:"capacity"})})})]})},j={render:function(){const[s,o]=N.useState("Click a segment.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(t,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{o("Pending invites: the drawer opens on its Pending tab.")}},{label:"Active invitation links",value:4,hint:"37 issued",onClick:()=>{o("Active invitation links: the drawer opens on its Links tab.")}},{label:"Expired links",value:2,hint:"this month"}]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:s})]})}},k={render:()=>e.jsxs(i,{children:[e.jsx(t,{label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(t,{variant:"filled",label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(t,{variant:"filled",label:"Active users",value:7640,hint:"93% of total",delta:{label:"3.1%",direction:"up",tone:"good"}})]})},r=(n,s)=>e.jsx("span",{className:ct("mdt-block mdt-truncate mdt-text-[13px] mdt-font-medium mdt-leading-[1.5]",s==="faint"&&"mdt-text-faint"),style:s&&s!=="faint"?{color:`var(--mdt-badge-${s}-ink)`}:void 0,children:n}),z=n=>e.jsx("span",{className:"mdt-flex mdt-h-[1.5em] mdt-items-center mdt-text-[13px]",children:n}),S={name:"Filled Group",render:function(){const[s,o]=N.useState("Click a count."),l=dt=>()=>{o(`${dt}: the drawer shows the targets behind it.`)};return e.jsxs("div",{className:"mdt-flex mdt-w-[670px] mdt-max-w-full mdt-flex-col mdt-gap-2",children:[e.jsx(t,{variant:"filled",label:"Yield",style:{width:"100%"},items:[{label:"Targets",value:r("1,180"),onClick:l("Targets")},{label:"Discovered",value:r("402","success"),onClick:l("Discovered")},{label:"New",value:r("23"),onClick:l("New")},{label:"Updated",value:r("379"),onClick:l("Updated")}]}),e.jsx(t,{variant:"filled",label:"Misses and coverage",style:{width:"100%"},items:[{label:"Unreachable",value:r("27","warning"),onClick:l("Unreachable")},{label:"Auth failed",value:r("14","danger"),onClick:l("Auth failed")},{label:"Excluded",value:r("6","faint"),onClick:l("Excluded")},{label:"Coverage",value:r("34%","danger")}]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:s}),e.jsx(t,{variant:"filled",label:"Profile facts",style:{width:"100%",marginTop:16},items:[{label:"Type",value:r("SNMP v2c")},{label:"Status",value:z(e.jsx(G,{size:"sm",tone:"success",dot:!0,children:"Active"}))},{label:"Test status",value:z(e.jsx(G,{size:"sm",tone:"success",dot:!0,children:"Passed"}))},{label:"Secret source",value:r("Local")}]})]})}};var A,T,P,R,O;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Total users',
    value: 8200,
    hint: 'across all organisations'
  }
}`,...(P=(T=d.parameters)==null?void 0:T.docs)==null?void 0:P.source},description:{story:"A plain card at its 174 floor: label, value, supporting line. A number is rounded to one decimal with k or M.",...(O=(R=d.parameters)==null?void 0:R.docs)==null?void 0:O.description}}};var E,I,L,D,B;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Dormant users" value={256} hint="no sign-in in 90+ days" />
      <KpiCard label="Active users" value={7640} />
      <KpiCard label="Total users" value={8200} hint="across all organisations" style={{
      width: 220
    }} />
    </Row>
}`,...(L=(I=c.parameters)==null?void 0:I.docs)==null?void 0:L.source},description:{story:"Whole numbers, no supporting line, a wider card. On its own a card sits at the floor unless given a width.",...(B=(D=c.parameters)==null?void 0:D.docs)==null?void 0:B.description}}};var F,Z,_,W,M;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(_=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:_.source},description:{story:"The verdict lives only in the chip: fill, no outline, an arrow up or down. Four tones by meaning. It renders only when the data carries a change.",...(M=(W=h.parameters)==null?void 0:W.docs)==null?void 0:M.description}}};var U,V,H,$,q;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Licensed users limit" value={8200} hint="10k allowed" chart={<KpiGauge percent={82} caption="capacity" />} />
      <KpiCard label="Anomalous growth" value={47} hint="users in last 24h" chart={<KpiBars values={[56, 44, 32, 38, 26, 34]} base={22} threshold={40} />} />
    </Row>
}`,...(H=(V=u.parameters)==null?void 0:V.docs)==null?void 0:H.source},description:{story:"The right side of the card is kept for a chart and nothing else. KpiGauge and KpiBars are the first two; any chart drawn to fit 104 × 62 can go there. A chart card has no floor; the chart keeps its size and the text side gives way first.",...(q=($=u.parameters)==null?void 0:$.docs)==null?void 0:q.description}}};var Y,J,Q,X,ee;p.parameters={...p.parameters,docs:{...(Y=p.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiGauge shape="ring" percent={0} label="Configuration health 0%" />
      <KpiGauge shape="ring" percent={50} label="Configuration health 50%" />
      <KpiGauge shape="ring" percent={75} label="Configuration health 75%" />
      <KpiGauge shape="ring" percent={100} label="Configuration health 100%" />
      <KpiGauge shape="ring" percent={25} bad label="Configuration health 25%, failing" />
    </Row>
}`,...(Q=(J=p.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:'`shape="ring"`: the full health ring, ported from the console\'s Overview tab (Pranjal, 2026-10-13). 150 × 150 on its own,\nnot in a card\'s chart area: a pale track, the fill in the success green from twelve o\'clock with a rounded cap, the\nnumber with a smaller "%". At 100% the fill closes into one circle and a thin ring sits just outside it. `bad` turns\nthe fill to the danger colour. The ring draws no caption; the caption and `label` are spoken only.',...(ee=(X=p.parameters)==null?void 0:X.docs)==null?void 0:ee.description}}};var te,ae,ie,ne,se;m.parameters={...m.parameters,docs:{...(te=m.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => <Three>
      <KpiCard label="Agents sending data" value="2,102" hint="of 2,134" style={{
      width: '100%'
    }} chart={<KpiGauge shape="zones" percent={98.5} min={90} zones={ZONES_SENDING} caption="sending data" />} />
      <KpiCard label="Working normally" value="2,052" hint="of 2,134" style={{
      width: '100%'
    }} chart={<KpiGauge shape="zones" percent={96.2} min={90} zones={ZONES_NORMAL} caption="working normally" />} />
      <KpiCard label="On the current version" value="1,086" hint="of 2,134" style={{
      width: '100%'
    }} chart={<KpiGauge shape="zones" percent={50.9} zones={ZONES_VERSION} caption="on 7.4.0" />} />
    </Three>
}`,...(ie=(ae=m.parameters)==null?void 0:ae.docs)==null?void 0:ie.source},description:{story:'`shape="zones"`: the console Health\'s headline gauge (Pranjal, 2026-10-26: "the chart makes less sense so improve the\nchart"), in a card\'s chart area. The half ring is split into its `zones`, each faint in its status colour; a dot in\nthe full colour sits where the value is; the value and its zone\'s word are in the middle; the ends say where the\nscale starts and stops (`min`, `max`). The target is the green zone, so the card needs no "good at" line. These are\nAgent Fleet\'s three figures, as the Health Overview shows them.',...(se=(ne=m.parameters)==null?void 0:ne.docs)==null?void 0:se.description}}};var re,oe,le,de,ce;g.parameters={...g.parameters,docs:{...(re=g.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiGauge shape="zones" percent={92.9} min={90} zones={ZONES_SENDING} caption="reporting" />
      <KpiGauge shape="zones" percent={97} min={90} zones={ZONES_SENDING} caption="reporting" />
      <KpiGauge shape="zones" percent={100} min={90} zones={ZONES_SENDING} caption="reporting" />
      <KpiGauge shape="zones" percent={12} zones={ZONES_VERSION} caption="on 7.4.0" />
    </Row>
}`,...(le=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:le.source},description:{story:"Every zone tone, and a value in each zone: red, amber, green, and the neutral blue of a figure still rolling out.",...(ce=(de=g.parameters)==null?void 0:de.docs)==null?void 0:ce.description}}};var he,ue,pe,me,ge;v.parameters={...v.parameters,docs:{...(he=v.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiGauge percent={98.5} caption="sending data" tone="good" target={98} />
      <KpiGauge percent={96.2} caption="normal" tone="warn" target={98} />
      <KpiGauge percent={88.4} caption="reporting" tone="crit" target={95} />
      <KpiGauge percent={50.9} caption="on 7.4.0" tone="info" target={80} />
    </Row>
}`,...(pe=(ue=v.parameters)==null?void 0:ue.docs)==null?void 0:pe.source},description:{story:'`tone` and `target` on the half gauge: the console Health\'s status gauge. The fill wears a status colour from the\nchart palette (`good`, `warn`, `crit`, `info`) instead of the neutral ladder, the number keeps one decimal, and the\ntarget is a tick across the ring in the ink colour, spoken as "good at 98% or more".',...(ge=(me=v.parameters)==null?void 0:me.docs)==null?void 0:ge.description}}};var ve,be,fe,we,xe;b.parameters={...b.parameters,docs:{...(ve=b.parameters)==null?void 0:ve.docs,source:{originalSource:`{
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
}`,...(fe=(be=b.parameters)==null?void 0:be.docs)==null?void 0:fe.source},description:{story:"Off by default. With a click the card is a real button, whatever it holds: on hover or keyboard focus the label takes the reading ink and a dotted underline, a gear appears beside it, a soft fill sits 6px inside the edges, and the card presses to 97%.",...(xe=(we=b.parameters)==null?void 0:we.docs)==null?void 0:xe.description}}};var Ce,ye,je,ke,Se;f.parameters={...f.parameters,docs:{...(Ce=f.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" />
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" style={{
      width: 270
    }} />
    </Row>
}`,...(je=(ye=f.parameters)==null?void 0:ye.docs)==null?void 0:je.source},description:{story:"The label truncates with an ellipsis at the card's width and never wraps; the supporting line does the same. The number never shrinks.",...(Se=(ke=f.parameters)==null?void 0:ke.docs)==null?void 0:Se.description}}};var Ke,Ne,Ge,ze,Ae;w.parameters={...w.parameters,docs:{...(Ke=w.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  render: () => <KpiCard label="Invitations" items={[{
    label: 'Pending invites',
    value: 11,
    hint: 'awaiting acceptance'
  }, {
    label: 'Active invitation links',
    value: 4,
    hint: '37 issued'
  }]} />
}`,...(Ge=(Ne=w.parameters)==null?void 0:Ne.docs)==null?void 0:Ge.source},description:{story:"Two related metrics sharing one card: the Users invitations pair. One hairline, 12px clear of the edges.",...(Ae=(ze=w.parameters)==null?void 0:ze.docs)==null?void 0:Ae.description}}};var Te,Pe,Re,Oe,Ee;x.parameters={...x.parameters,docs:{...(Te=x.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
}`,...(Re=(Pe=x.parameters)==null?void 0:Pe.docs)==null?void 0:Re.source},description:{story:"As many segments as belong together; chips ride inside segments like anywhere else.",...(Ee=(Oe=x.parameters)==null?void 0:Oe.docs)==null?void 0:Ee.description}}};var Ie,Le,De,Be,Fe;C.parameters={...C.parameters,docs:{...(Ie=C.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
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
}`,...(De=(Le=C.parameters)==null?void 0:Le.docs)==null?void 0:De.source},description:{story:"A segment may carry a chart in its chart area, exactly as a single card does.",...(Fe=(Be=C.parameters)==null?void 0:Be.docs)==null?void 0:Fe.description}}};var Ze,_e,We,Me,Ue;y.parameters={...y.parameters,docs:{...(Ze=y.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row>
        <KpiCard label="Total users" value={8200} hint="across all organisations" />
        <KpiCard size="sm" label="Total users" value={8200} hint="across all organisations" />
      </Row>
      <Row>
        <KpiCard label="Structure" items={[{
        label: 'Sites',
        value: 12,
        hint: 'across three regions'
      }, {
        label: 'Departments',
        value: 48,
        hint: '6 without a head'
      }]} />
        <KpiCard size="sm" label="Structure" items={[{
        label: 'Sites',
        value: 12,
        hint: 'across three regions'
      }, {
        label: 'Departments',
        value: 48,
        hint: '6 without a head',
        delta: {
          label: '2',
          direction: 'up',
          tone: 'flat'
        }
      }]} />
      </Row>
      <Row>
        <KpiCard size="sm" label="Licensed users limit" value={8200} hint="10k allowed" chart={<KpiGauge percent={82} caption="capacity" />} />
      </Row>
    </div>
}`,...(We=(_e=y.parameters)==null?void 0:_e.docs)==null?void 0:We.source},description:{story:`\`size="sm"\`: the quieter figure, 16/24 at 600 instead of 24 at 500, for a card that sits beside a section's
content - the two-column settings pages (Pranjal, 2026-10-15: "use smaller text so that it doesnt get that much
attention just enough to show its there"). Only the number changes. The last card holds a chart, so it keeps the
24 figure whatever it is given: the gauge beside it is drawn to that size.`,...(Ue=(Me=y.parameters)==null?void 0:Me.docs)==null?void 0:Ue.description}}};var Ve,He,$e,qe,Ye;j.parameters={...j.parameters,docs:{...(Ve=j.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
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
}`,...($e=(He=j.parameters)==null?void 0:He.docs)==null?void 0:$e.source},description:{story:"Each segment has its own switch. A clickable segment shows the cue on its own; its neighbours do not react and the outer card never lifts.",...(Ye=(qe=j.parameters)==null?void 0:qe.docs)==null?void 0:Ye.description}}};var Je,Qe,Xe,et,tt;k.parameters={...k.parameters,docs:{...(Je=k.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Total users" value={8200} hint="across all organisations" />
      <KpiCard variant="filled" label="Total users" value={8200} hint="across all organisations" />
      <KpiCard variant="filled" label="Active users" value={7640} hint="93% of total" delta={{
      label: '3.1%',
      direction: 'up',
      tone: 'good'
    }} />
    </Row>
}`,...(Xe=(Qe=k.parameters)==null?void 0:Qe.docs)==null?void 0:Xe.source},description:{story:'`variant="filled"`: the card inside a drawer - the neutral-10 ground and no edge - beside the default `outlined`\ncard on the page, the card ground inside its hairline. Nothing else changes: the corners, the label, the figure,\nthe supporting line, the chip and the click are the same on both.',...(tt=(et=k.parameters)==null?void 0:et.docs)==null?void 0:tt.description}}};var at,it,nt,st,rt;S.parameters={...S.parameters,docs:{...(at=S.parameters)==null?void 0:at.docs,source:{originalSource:`{
  name: 'Filled Group',
  render: function FilledGroupStory() {
    const [note, setNote] = useState('Click a count.');
    const door = (what: string) => () => {
      setNote(\`\${what}: the drawer shows the targets behind it.\`);
    };
    return <div className="mdt-flex mdt-w-[670px] mdt-max-w-full mdt-flex-col mdt-gap-2">
        <KpiCard variant="filled" label="Yield" style={{
        width: '100%'
      }} items={[{
        label: 'Targets',
        value: line('1,180'),
        onClick: door('Targets')
      }, {
        label: 'Discovered',
        value: line('402', 'success'),
        onClick: door('Discovered')
      }, {
        label: 'New',
        value: line('23'),
        onClick: door('New')
      }, {
        label: 'Updated',
        value: line('379'),
        onClick: door('Updated')
      }]} />
        <KpiCard variant="filled" label="Misses and coverage" style={{
        width: '100%'
      }} items={[{
        label: 'Unreachable',
        value: line('27', 'warning'),
        onClick: door('Unreachable')
      }, {
        label: 'Auth failed',
        value: line('14', 'danger'),
        onClick: door('Auth failed')
      }, {
        label: 'Excluded',
        value: line('6', 'faint'),
        onClick: door('Excluded')
      }, {
        label: 'Coverage',
        value: line('34%', 'danger')
      }]} />
        <p className="mdt-m-0 mdt-text-xs mdt-text-muted-foreground" aria-live="polite">
          {note}
        </p>
        <KpiCard variant="filled" label="Profile facts" style={{
        width: '100%',
        marginTop: 16
      }} items={[{
        label: 'Type',
        value: line('SNMP v2c')
      }, {
        label: 'Status',
        value: pill(<Badge size="sm" tone="success" dot>
                  Active
                </Badge>)
      }, {
        label: 'Test status',
        value: pill(<Badge size="sm" tone="success" dot>
                  Passed
                </Badge>)
      }, {
        label: 'Secret source',
        value: line('Local')
      }]} />
      </div>;
  }
}`,...(nt=(it=S.parameters)==null?void 0:it.docs)==null?void 0:nt.source},description:{story:`A group on the filled ground: the facts card every drawer draws under its identity band. A segment whose value is
a line of text (a node, no hint) sizes to the line: no 98 floor and no 174 width floor, so four fit a 670 drawer
side by side. The first two cards are a run's yield and its misses, each count with a list behind it a click; the
third a profile's facts, with pills on the line. Shown with the discovery run and credential profile it was ported
from.`,...(rt=(st=S.parameters)==null?void 0:st.docs)==null?void 0:rt.description}}};const yt=["Default","Variations","WithTrendChip","WithChart","GaugeRing","GaugeZones","GaugeZonesTones","GaugeStatus","Clickable","LongLabel","Group","GroupOfFour","GroupWithCharts","Small","GroupClickable","Filled","FilledGroup"];export{b as Clickable,d as Default,k as Filled,S as FilledGroup,p as GaugeRing,v as GaugeStatus,m as GaugeZones,g as GaugeZonesTones,w as Group,j as GroupClickable,x as GroupOfFour,C as GroupWithCharts,f as LongLabel,y as Small,c as Variations,u as WithChart,h as WithTrendChip,yt as __namedExportsOrder,Ct as default};
//# sourceMappingURL=KpiCard.stories-BU6LJgXc.js.map
