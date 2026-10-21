import{j as e,r as Ke}from"./iframe-C3j6EdMW.js";import{K as a,a as t,b as Se}from"./KpiCharts-C4w5aP34.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./index-C6xV686X.js";import"./Icon-DKIEuqof.js";import"./index-ChEho857.js";import"./Badge-BEOwd9MG.js";const Oe={title:"New Components/KPI Card",component:a,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["**Behaviour reference — Claude artifacts:** [KPI Card](https://claude.ai/code/artifact/c3071fdf-27df-4e5a-8a29-b8de2bea769d) and [KPI Group](https://claude.ai/code/artifact/e93baf81-b8e3-4264-b2a8-d7ec6f717c22), live pages showing how the card and the group behave. Open them to see the intended behaviour — they are what this component was designed and approved from.","","One metric on one card: a label, a big number, one quiet line of context. It can carry a trend chip, and it has an area kept for a chart. By default it is a plain fact. Clickable is a switch that can be turned on for any card, chip or chart included; then it says so on hover.","Give it `items` instead of one metric and it becomes a group: two or more related metrics sharing one card, split by inset hairlines. Each segment is a whole card with its own switch.","Widths: a plain card has a 174px floor and no ceiling; a chart card no floor and 270 natural; a group is the sum. In a KpiStrip the cards grow evenly until the row is full and the strip scrolls past the fit. Dark mode comes from the theme toggle."].join(`

`)}}}},i=({children:v})=>e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-items-start mdt-gap-6",children:v}),n={args:{label:"Total users",value:8200,hint:"across all organisations"}},r={render:()=>e.jsxs(i,{children:[e.jsx(a,{label:"Dormant users",value:256,hint:"no sign-in in 90+ days"}),e.jsx(a,{label:"Active users",value:7640}),e.jsx(a,{label:"Total users",value:8200,hint:"across all organisations",style:{width:220}})]})},o={render:()=>e.jsxs(i,{children:[e.jsx(a,{label:"Active users",value:7640,hint:"93% of total",delta:{label:"3.1%",direction:"up",tone:"good"}}),e.jsx(a,{label:"Failed sign-ins",value:142,hint:"last 24 hours",delta:{label:"12%",direction:"up",tone:"bad"}}),e.jsx(a,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"}}),e.jsx(a,{label:"Pending invites",value:11,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}})]})},l={render:()=>e.jsxs(i,{children:[e.jsx(a,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(t,{percent:82,caption:"capacity"})}),e.jsx(a,{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(Se,{values:[56,44,32,38,26,34],base:22,threshold:40})})]})},c={render:()=>e.jsxs(i,{children:[e.jsx(t,{shape:"ring",percent:0,label:"Configuration health 0%"}),e.jsx(t,{shape:"ring",percent:50,label:"Configuration health 50%"}),e.jsx(t,{shape:"ring",percent:75,label:"Configuration health 75%"}),e.jsx(t,{shape:"ring",percent:100,label:"Configuration health 100%"}),e.jsx(t,{shape:"ring",percent:25,bad:!0,label:"Configuration health 25%, failing"})]})},d={render:function(){const[w,s]=Ke.useState("Click a card.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs(i,{children:[e.jsx(a,{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{s("Pending invites: the Invitations drawer opens on its Pending tab.")}}),e.jsx(a,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"},onClick:()=>{s("Privileged accounts: the list, filtered to privileged roles.")}}),e.jsx(a,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(t,{percent:82,caption:"capacity"}),onClick:()=>{s("Licensed users limit: the licence page.")}})]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:w})]})}},h={render:()=>e.jsxs(i,{children:[e.jsx(a,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant"}),e.jsx(a,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant",style:{width:270}})]})},u={render:()=>e.jsx(a,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance"},{label:"Active invitation links",value:4,hint:"37 issued"}]})},p={render:()=>e.jsx(a,{label:"Members",items:[{label:"Total",value:68,hint:"members"},{label:"Active",value:48,hint:"signed in this month",delta:{label:"6%",direction:"up",tone:"good"}},{label:"Inactive",value:10,hint:"no sign-in in 90+ days"},{label:"Pending invites",value:10,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}}]})},m={render:()=>e.jsx(a,{label:"Capacity",items:[{label:"Active users",value:7640,hint:"8.2k total"},{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(t,{percent:82,caption:"capacity"})},{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(Se,{values:[56,44,32,38,26,34],base:22,threshold:40})}]})},g={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs(i,{children:[e.jsx(a,{label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(a,{size:"sm",label:"Total users",value:8200,hint:"across all organisations"})]}),e.jsxs(i,{children:[e.jsx(a,{label:"Structure",items:[{label:"Sites",value:12,hint:"across three regions"},{label:"Departments",value:48,hint:"6 without a head"}]}),e.jsx(a,{size:"sm",label:"Structure",items:[{label:"Sites",value:12,hint:"across three regions"},{label:"Departments",value:48,hint:"6 without a head",delta:{label:"2",direction:"up",tone:"flat"}}]})]}),e.jsx(i,{children:e.jsx(a,{size:"sm",label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(t,{percent:82,caption:"capacity"})})})]})},b={render:function(){const[w,s]=Ke.useState("Click a segment.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(a,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{s("Pending invites: the drawer opens on its Pending tab.")}},{label:"Active invitation links",value:4,hint:"37 issued",onClick:()=>{s("Active invitation links: the drawer opens on its Links tab.")}},{label:"Expired links",value:2,hint:"this month"}]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:w})]})}};var f,x,C,y,k;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Total users',
    value: 8200,
    hint: 'across all organisations'
  }
}`,...(C=(x=n.parameters)==null?void 0:x.docs)==null?void 0:C.source},description:{story:"A plain card at its 174 floor: label, value, supporting line. A number is rounded to one decimal with k or M.",...(k=(y=n.parameters)==null?void 0:y.docs)==null?void 0:k.description}}};var j,K,S,A,P;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Dormant users" value={256} hint="no sign-in in 90+ days" />
      <KpiCard label="Active users" value={7640} />
      <KpiCard label="Total users" value={8200} hint="across all organisations" style={{
      width: 220
    }} />
    </Row>
}`,...(S=(K=r.parameters)==null?void 0:K.docs)==null?void 0:S.source},description:{story:"Whole numbers, no supporting line, a wider card. On its own a card sits at the floor unless given a width.",...(P=(A=r.parameters)==null?void 0:A.docs)==null?void 0:P.description}}};var G,R,N,T,L;o.parameters={...o.parameters,docs:{...(G=o.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(N=(R=o.parameters)==null?void 0:R.docs)==null?void 0:N.source},description:{story:"The verdict lives only in the chip: fill, no outline, an arrow up or down. Four tones by meaning. It renders only when the data carries a change.",...(L=(T=o.parameters)==null?void 0:T.docs)==null?void 0:L.description}}};var I,O,z,D,W;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Licensed users limit" value={8200} hint="10k allowed" chart={<KpiGauge percent={82} caption="capacity" />} />
      <KpiCard label="Anomalous growth" value={47} hint="users in last 24h" chart={<KpiBars values={[56, 44, 32, 38, 26, 34]} base={22} threshold={40} />} />
    </Row>
}`,...(z=(O=l.parameters)==null?void 0:O.docs)==null?void 0:z.source},description:{story:"The right side of the card is kept for a chart and nothing else. KpiGauge and KpiBars are the first two; any chart drawn to fit 104 × 62 can go there. A chart card has no floor; the chart keeps its size and the text side gives way first.",...(W=(D=l.parameters)==null?void 0:D.docs)==null?void 0:W.description}}};var E,B,F,M,q;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiGauge shape="ring" percent={0} label="Configuration health 0%" />
      <KpiGauge shape="ring" percent={50} label="Configuration health 50%" />
      <KpiGauge shape="ring" percent={75} label="Configuration health 75%" />
      <KpiGauge shape="ring" percent={100} label="Configuration health 100%" />
      <KpiGauge shape="ring" percent={25} bad label="Configuration health 25%, failing" />
    </Row>
}`,...(F=(B=c.parameters)==null?void 0:B.docs)==null?void 0:F.source},description:{story:'`shape="ring"`: the full health ring, ported from the console\'s Overview tab (Pranjal, 2026-10-13). 150 × 150 on its own,\nnot in a card\'s chart area: a pale track, the fill in the success green from twelve o\'clock with a rounded cap, the\nnumber with a smaller "%". At 100% the fill closes into one circle and a thin ring sits just outside it. `bad` turns\nthe fill to the danger colour. The ring draws no caption; the caption and `label` are spoken only.',...(q=(M=c.parameters)==null?void 0:M.docs)==null?void 0:q.description}}};var V,_,U,H,J;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(U=(_=d.parameters)==null?void 0:_.docs)==null?void 0:U.source},description:{story:"Off by default. With a click the card is a real button, whatever it holds: on hover or keyboard focus the label takes the reading ink and a dotted underline, a gear appears beside it, a soft fill sits 6px inside the edges, and the card presses to 97%.",...(J=(H=d.parameters)==null?void 0:H.docs)==null?void 0:J.description}}};var Q,X,Y,Z,$;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" />
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" style={{
      width: 270
    }} />
    </Row>
}`,...(Y=(X=h.parameters)==null?void 0:X.docs)==null?void 0:Y.source},description:{story:"The label truncates with an ellipsis at the card's width and never wraps; the supporting line does the same. The number never shrinks.",...($=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:$.description}}};var ee,ae,te,ie,se;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <KpiCard label="Invitations" items={[{
    label: 'Pending invites',
    value: 11,
    hint: 'awaiting acceptance'
  }, {
    label: 'Active invitation links',
    value: 4,
    hint: '37 issued'
  }]} />
}`,...(te=(ae=u.parameters)==null?void 0:ae.docs)==null?void 0:te.source},description:{story:"Two related metrics sharing one card: the Users invitations pair. One hairline, 12px clear of the edges.",...(se=(ie=u.parameters)==null?void 0:ie.docs)==null?void 0:se.description}}};var ne,re,oe,le,ce;p.parameters={...p.parameters,docs:{...(ne=p.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(oe=(re=p.parameters)==null?void 0:re.docs)==null?void 0:oe.source},description:{story:"As many segments as belong together; chips ride inside segments like anywhere else.",...(ce=(le=p.parameters)==null?void 0:le.docs)==null?void 0:ce.description}}};var de,he,ue,pe,me;m.parameters={...m.parameters,docs:{...(de=m.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(ue=(he=m.parameters)==null?void 0:he.docs)==null?void 0:ue.source},description:{story:"A segment may carry a chart in its chart area, exactly as a single card does.",...(me=(pe=m.parameters)==null?void 0:pe.docs)==null?void 0:me.description}}};var ge,be,ve,we,fe;g.parameters={...g.parameters,docs:{...(ge=g.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(ve=(be=g.parameters)==null?void 0:be.docs)==null?void 0:ve.source},description:{story:`\`size="sm"\`: the quieter figure, 16/24 at 600 instead of 24 at 500, for a card that sits beside a section's
content - the two-column settings pages (Pranjal, 2026-10-15: "use smaller text so that it doesnt get that much
attention just enough to show its there"). Only the number changes. The last card holds a chart, so it keeps the
24 figure whatever it is given: the gauge beside it is drawn to that size.`,...(fe=(we=g.parameters)==null?void 0:we.docs)==null?void 0:fe.description}}};var xe,Ce,ye,ke,je;b.parameters={...b.parameters,docs:{...(xe=b.parameters)==null?void 0:xe.docs,source:{originalSource:`{
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
}`,...(ye=(Ce=b.parameters)==null?void 0:Ce.docs)==null?void 0:ye.source},description:{story:"Each segment has its own switch. A clickable segment shows the cue on its own; its neighbours do not react and the outer card never lifts.",...(je=(ke=b.parameters)==null?void 0:ke.docs)==null?void 0:je.description}}};const ze=["Default","Variations","WithTrendChip","WithChart","GaugeRing","Clickable","LongLabel","Group","GroupOfFour","GroupWithCharts","Small","GroupClickable"];export{d as Clickable,n as Default,c as GaugeRing,u as Group,b as GroupClickable,p as GroupOfFour,m as GroupWithCharts,h as LongLabel,g as Small,r as Variations,l as WithChart,o as WithTrendChip,ze as __namedExportsOrder,Oe as default};
//# sourceMappingURL=KpiCard.stories-BMsr8wBA.js.map
