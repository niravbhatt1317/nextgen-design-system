import{j as e,r as Me}from"./iframe-B0hKx_zD.js";import{K as t,a,b as Ve}from"./KpiCharts-BAqcRIjv.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./Icon-BiyJvuOA.js";import"./index-ChEho857.js";import"./Badge-BuZDOmTP.js";const at={title:"New Components/KPI Card",component:t,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["**Behaviour reference — Claude artifacts:** [KPI Card](https://claude.ai/code/artifact/c3071fdf-27df-4e5a-8a29-b8de2bea769d) and [KPI Group](https://claude.ai/code/artifact/e93baf81-b8e3-4264-b2a8-d7ec6f717c22), live pages showing how the card and the group behave. Open them to see the intended behaviour — they are what this component was designed and approved from.","","One metric on one card: a label, a big number, one quiet line of context. It can carry a trend chip, and it has an area kept for a chart. By default it is a plain fact. Clickable is a switch that can be turned on for any card, chip or chart included; then it says so on hover.","Give it `items` instead of one metric and it becomes a group: two or more related metrics sharing one card, split by inset hairlines. Each segment is a whole card with its own switch.","Widths: a plain card has a 174px floor and no ceiling; a chart card no floor and 270 natural; a group is the sum. In a KpiStrip the cards grow evenly until the row is full and the strip scrolls past the fit. Dark mode comes from the theme toggle."].join(`

`)}}}},n=({children:s})=>e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-items-start mdt-gap-6",children:s}),r={args:{label:"Total users",value:8200,hint:"across all organisations"}},o={render:()=>e.jsxs(n,{children:[e.jsx(t,{label:"Dormant users",value:256,hint:"no sign-in in 90+ days"}),e.jsx(t,{label:"Active users",value:7640}),e.jsx(t,{label:"Total users",value:8200,hint:"across all organisations",style:{width:220}})]})},l={render:()=>e.jsxs(n,{children:[e.jsx(t,{label:"Active users",value:7640,hint:"93% of total",delta:{label:"3.1%",direction:"up",tone:"good"}}),e.jsx(t,{label:"Failed sign-ins",value:142,hint:"last 24 hours",delta:{label:"12%",direction:"up",tone:"bad"}}),e.jsx(t,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"}}),e.jsx(t,{label:"Pending invites",value:11,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}})]})},c={render:()=>e.jsxs(n,{children:[e.jsx(t,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(a,{percent:82,caption:"capacity"})}),e.jsx(t,{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(Ve,{values:[56,44,32,38,26,34],base:22,threshold:40})})]})},d={render:()=>e.jsxs(n,{children:[e.jsx(a,{shape:"ring",percent:0,label:"Configuration health 0%"}),e.jsx(a,{shape:"ring",percent:50,label:"Configuration health 50%"}),e.jsx(a,{shape:"ring",percent:75,label:"Configuration health 75%"}),e.jsx(a,{shape:"ring",percent:100,label:"Configuration health 100%"}),e.jsx(a,{shape:"ring",percent:25,bad:!0,label:"Configuration health 25%, failing"})]})},j=[{from:90,to:96,tone:"crit",word:"Low"},{from:96,to:98,tone:"warn",word:"Below target"},{from:98,to:100,tone:"good",word:"On target"}],qe=[{from:90,to:95,tone:"crit",word:"Low"},{from:95,to:98,tone:"warn",word:"Below target"},{from:98,to:100,tone:"good",word:"On target"}],He=[{from:0,to:80,tone:"info",word:"Rolling out"},{from:80,to:100,tone:"good",word:"On target"}],Ue=({children:s})=>e.jsx("div",{className:"mdt-grid mdt-max-w-[884px] mdt-grid-cols-3 mdt-gap-3",children:s}),p={render:()=>e.jsxs(Ue,{children:[e.jsx(t,{label:"Agents sending data",value:"2,102",hint:"of 2,134",style:{width:"100%"},chart:e.jsx(a,{shape:"zones",percent:98.5,min:90,zones:j,caption:"sending data"})}),e.jsx(t,{label:"Working normally",value:"2,052",hint:"of 2,134",style:{width:"100%"},chart:e.jsx(a,{shape:"zones",percent:96.2,min:90,zones:qe,caption:"working normally"})}),e.jsx(t,{label:"On the current version",value:"1,086",hint:"of 2,134",style:{width:"100%"},chart:e.jsx(a,{shape:"zones",percent:50.9,zones:He,caption:"on 7.4.0"})})]})},h={render:()=>e.jsxs(n,{children:[e.jsx(a,{shape:"zones",percent:92.9,min:90,zones:j,caption:"reporting"}),e.jsx(a,{shape:"zones",percent:97,min:90,zones:j,caption:"reporting"}),e.jsx(a,{shape:"zones",percent:100,min:90,zones:j,caption:"reporting"}),e.jsx(a,{shape:"zones",percent:12,zones:He,caption:"on 7.4.0"})]})},u={render:()=>e.jsxs(n,{children:[e.jsx(a,{percent:98.5,caption:"sending data",tone:"good",target:98}),e.jsx(a,{percent:96.2,caption:"normal",tone:"warn",target:98}),e.jsx(a,{percent:88.4,caption:"reporting",tone:"crit",target:95}),e.jsx(a,{percent:50.9,caption:"on 7.4.0",tone:"info",target:80})]})},m={render:function(){const[y,i]=Me.useState("Click a card.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs(n,{children:[e.jsx(t,{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{i("Pending invites: the Invitations drawer opens on its Pending tab.")}}),e.jsx(t,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"},onClick:()=>{i("Privileged accounts: the list, filtered to privileged roles.")}}),e.jsx(t,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(a,{percent:82,caption:"capacity"}),onClick:()=>{i("Licensed users limit: the licence page.")}})]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:y})]})}},g={render:()=>e.jsxs(n,{children:[e.jsx(t,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant"}),e.jsx(t,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant",style:{width:270}})]})},v={render:()=>e.jsx(t,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance"},{label:"Active invitation links",value:4,hint:"37 issued"}]})},b={render:()=>e.jsx(t,{label:"Members",items:[{label:"Total",value:68,hint:"members"},{label:"Active",value:48,hint:"signed in this month",delta:{label:"6%",direction:"up",tone:"good"}},{label:"Inactive",value:10,hint:"no sign-in in 90+ days"},{label:"Pending invites",value:10,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}}]})},w={render:()=>e.jsx(t,{label:"Capacity",items:[{label:"Active users",value:7640,hint:"8.2k total"},{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(a,{percent:82,caption:"capacity"})},{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(Ve,{values:[56,44,32,38,26,34],base:22,threshold:40})}]})},f={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs(n,{children:[e.jsx(t,{label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(t,{size:"sm",label:"Total users",value:8200,hint:"across all organisations"})]}),e.jsxs(n,{children:[e.jsx(t,{label:"Structure",items:[{label:"Sites",value:12,hint:"across three regions"},{label:"Departments",value:48,hint:"6 without a head"}]}),e.jsx(t,{size:"sm",label:"Structure",items:[{label:"Sites",value:12,hint:"across three regions"},{label:"Departments",value:48,hint:"6 without a head",delta:{label:"2",direction:"up",tone:"flat"}}]})]}),e.jsx(n,{children:e.jsx(t,{size:"sm",label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(a,{percent:82,caption:"capacity"})})})]})},x={render:function(){const[y,i]=Me.useState("Click a segment.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(t,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{i("Pending invites: the drawer opens on its Pending tab.")}},{label:"Active invitation links",value:4,hint:"37 issued",onClick:()=>{i("Active invitation links: the drawer opens on its Links tab.")}},{label:"Expired links",value:2,hint:"this month"}]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:y})]})}};var C,k,K,S,G;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: 'Total users',
    value: 8200,
    hint: 'across all organisations'
  }
}`,...(K=(k=r.parameters)==null?void 0:k.docs)==null?void 0:K.source},description:{story:"A plain card at its 174 floor: label, value, supporting line. A number is rounded to one decimal with k or M.",...(G=(S=r.parameters)==null?void 0:S.docs)==null?void 0:G.description}}};var N,z,A,R,O;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Dormant users" value={256} hint="no sign-in in 90+ days" />
      <KpiCard label="Active users" value={7640} />
      <KpiCard label="Total users" value={8200} hint="across all organisations" style={{
      width: 220
    }} />
    </Row>
}`,...(A=(z=o.parameters)==null?void 0:z.docs)==null?void 0:A.source},description:{story:"Whole numbers, no supporting line, a wider card. On its own a card sits at the floor unless given a width.",...(O=(R=o.parameters)==null?void 0:R.docs)==null?void 0:O.description}}};var P,T,E,I,L;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(E=(T=l.parameters)==null?void 0:T.docs)==null?void 0:E.source},description:{story:"The verdict lives only in the chip: fill, no outline, an arrow up or down. Four tones by meaning. It renders only when the data carries a change.",...(L=(I=l.parameters)==null?void 0:I.docs)==null?void 0:L.description}}};var D,Z,_,W,B;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Licensed users limit" value={8200} hint="10k allowed" chart={<KpiGauge percent={82} caption="capacity" />} />
      <KpiCard label="Anomalous growth" value={47} hint="users in last 24h" chart={<KpiBars values={[56, 44, 32, 38, 26, 34]} base={22} threshold={40} />} />
    </Row>
}`,...(_=(Z=c.parameters)==null?void 0:Z.docs)==null?void 0:_.source},description:{story:"The right side of the card is kept for a chart and nothing else. KpiGauge and KpiBars are the first two; any chart drawn to fit 104 × 62 can go there. A chart card has no floor; the chart keeps its size and the text side gives way first.",...(B=(W=c.parameters)==null?void 0:W.docs)==null?void 0:B.description}}};var F,M,V,H,q;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiGauge shape="ring" percent={0} label="Configuration health 0%" />
      <KpiGauge shape="ring" percent={50} label="Configuration health 50%" />
      <KpiGauge shape="ring" percent={75} label="Configuration health 75%" />
      <KpiGauge shape="ring" percent={100} label="Configuration health 100%" />
      <KpiGauge shape="ring" percent={25} bad label="Configuration health 25%, failing" />
    </Row>
}`,...(V=(M=d.parameters)==null?void 0:M.docs)==null?void 0:V.source},description:{story:'`shape="ring"`: the full health ring, ported from the console\'s Overview tab (Pranjal, 2026-10-13). 150 × 150 on its own,\nnot in a card\'s chart area: a pale track, the fill in the success green from twelve o\'clock with a rounded cap, the\nnumber with a smaller "%". At 100% the fill closes into one circle and a thin ring sits just outside it. `bad` turns\nthe fill to the danger colour. The ring draws no caption; the caption and `label` are spoken only.',...(q=(H=d.parameters)==null?void 0:H.docs)==null?void 0:q.description}}};var U,J,Q,X,Y;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
}`,...(Q=(J=p.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:'`shape="zones"`: the console Health\'s headline gauge (Pranjal, 2026-10-26: "the chart makes less sense so improve the\nchart"), in a card\'s chart area. The half ring is split into its `zones`, each faint in its status colour; a dot in\nthe full colour sits where the value is; the value and its zone\'s word are in the middle; the ends say where the\nscale starts and stops (`min`, `max`). The target is the green zone, so the card needs no "good at" line. These are\nAgent Fleet\'s three figures, as the Health Overview shows them.',...(Y=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Y.description}}};var $,ee,te,ae,ne;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiGauge shape="zones" percent={92.9} min={90} zones={ZONES_SENDING} caption="reporting" />
      <KpiGauge shape="zones" percent={97} min={90} zones={ZONES_SENDING} caption="reporting" />
      <KpiGauge shape="zones" percent={100} min={90} zones={ZONES_SENDING} caption="reporting" />
      <KpiGauge shape="zones" percent={12} zones={ZONES_VERSION} caption="on 7.4.0" />
    </Row>
}`,...(te=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:te.source},description:{story:"Every zone tone, and a value in each zone: red, amber, green, and the neutral blue of a figure still rolling out.",...(ne=(ae=h.parameters)==null?void 0:ae.docs)==null?void 0:ne.description}}};var ie,se,re,oe,le;u.parameters={...u.parameters,docs:{...(ie=u.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiGauge percent={98.5} caption="sending data" tone="good" target={98} />
      <KpiGauge percent={96.2} caption="normal" tone="warn" target={98} />
      <KpiGauge percent={88.4} caption="reporting" tone="crit" target={95} />
      <KpiGauge percent={50.9} caption="on 7.4.0" tone="info" target={80} />
    </Row>
}`,...(re=(se=u.parameters)==null?void 0:se.docs)==null?void 0:re.source},description:{story:'`tone` and `target` on the half gauge: the console Health\'s status gauge. The fill wears a status colour from the\nchart palette (`good`, `warn`, `crit`, `info`) instead of the neutral ladder, the number keeps one decimal, and the\ntarget is a tick across the ring in the ink colour, spoken as "good at 98% or more".',...(le=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:le.description}}};var ce,de,pe,he,ue;m.parameters={...m.parameters,docs:{...(ce=m.parameters)==null?void 0:ce.docs,source:{originalSource:`{
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
}`,...(pe=(de=m.parameters)==null?void 0:de.docs)==null?void 0:pe.source},description:{story:"Off by default. With a click the card is a real button, whatever it holds: on hover or keyboard focus the label takes the reading ink and a dotted underline, a gear appears beside it, a soft fill sits 6px inside the edges, and the card presses to 97%.",...(ue=(he=m.parameters)==null?void 0:he.docs)==null?void 0:ue.description}}};var me,ge,ve,be,we;g.parameters={...g.parameters,docs:{...(me=g.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" />
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" style={{
      width: 270
    }} />
    </Row>
}`,...(ve=(ge=g.parameters)==null?void 0:ge.docs)==null?void 0:ve.source},description:{story:"The label truncates with an ellipsis at the card's width and never wraps; the supporting line does the same. The number never shrinks.",...(we=(be=g.parameters)==null?void 0:be.docs)==null?void 0:we.description}}};var fe,xe,je,ye,Ce;v.parameters={...v.parameters,docs:{...(fe=v.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => <KpiCard label="Invitations" items={[{
    label: 'Pending invites',
    value: 11,
    hint: 'awaiting acceptance'
  }, {
    label: 'Active invitation links',
    value: 4,
    hint: '37 issued'
  }]} />
}`,...(je=(xe=v.parameters)==null?void 0:xe.docs)==null?void 0:je.source},description:{story:"Two related metrics sharing one card: the Users invitations pair. One hairline, 12px clear of the edges.",...(Ce=(ye=v.parameters)==null?void 0:ye.docs)==null?void 0:Ce.description}}};var ke,Ke,Se,Ge,Ne;b.parameters={...b.parameters,docs:{...(ke=b.parameters)==null?void 0:ke.docs,source:{originalSource:`{
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
}`,...(Se=(Ke=b.parameters)==null?void 0:Ke.docs)==null?void 0:Se.source},description:{story:"As many segments as belong together; chips ride inside segments like anywhere else.",...(Ne=(Ge=b.parameters)==null?void 0:Ge.docs)==null?void 0:Ne.description}}};var ze,Ae,Re,Oe,Pe;w.parameters={...w.parameters,docs:{...(ze=w.parameters)==null?void 0:ze.docs,source:{originalSource:`{
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
}`,...(Re=(Ae=w.parameters)==null?void 0:Ae.docs)==null?void 0:Re.source},description:{story:"A segment may carry a chart in its chart area, exactly as a single card does.",...(Pe=(Oe=w.parameters)==null?void 0:Oe.docs)==null?void 0:Pe.description}}};var Te,Ee,Ie,Le,De;f.parameters={...f.parameters,docs:{...(Te=f.parameters)==null?void 0:Te.docs,source:{originalSource:`{
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
}`,...(Ie=(Ee=f.parameters)==null?void 0:Ee.docs)==null?void 0:Ie.source},description:{story:`\`size="sm"\`: the quieter figure, 16/24 at 600 instead of 24 at 500, for a card that sits beside a section's
content - the two-column settings pages (Pranjal, 2026-10-15: "use smaller text so that it doesnt get that much
attention just enough to show its there"). Only the number changes. The last card holds a chart, so it keeps the
24 figure whatever it is given: the gauge beside it is drawn to that size.`,...(De=(Le=f.parameters)==null?void 0:Le.docs)==null?void 0:De.description}}};var Ze,_e,We,Be,Fe;x.parameters={...x.parameters,docs:{...(Ze=x.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
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
}`,...(We=(_e=x.parameters)==null?void 0:_e.docs)==null?void 0:We.source},description:{story:"Each segment has its own switch. A clickable segment shows the cue on its own; its neighbours do not react and the outer card never lifts.",...(Fe=(Be=x.parameters)==null?void 0:Be.docs)==null?void 0:Fe.description}}};const nt=["Default","Variations","WithTrendChip","WithChart","GaugeRing","GaugeZones","GaugeZonesTones","GaugeStatus","Clickable","LongLabel","Group","GroupOfFour","GroupWithCharts","Small","GroupClickable"];export{m as Clickable,r as Default,d as GaugeRing,u as GaugeStatus,p as GaugeZones,h as GaugeZonesTones,v as Group,x as GroupClickable,b as GroupOfFour,w as GroupWithCharts,g as LongLabel,f as Small,o as Variations,c as WithChart,l as WithTrendChip,nt as __namedExportsOrder,at as default};
//# sourceMappingURL=KpiCard.stories-7SP5ZgjO.js.map
