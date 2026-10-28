import{j as e,r as k}from"./iframe-CCgwJbt2.js";import{c as $e}from"./index-CcRgbaMz.js";import{K as a,a as n,b as We}from"./KpiCharts-D9uzhcT_.js";import{B as j}from"./Badge-BxbalwNv.js";import"./preload-helper-Dp1pzeXC.js";import"./Icon-BKTarBaZ.js";import"./index-ChEho857.js";const Xe={title:"New Components/KPI Card",component:a,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["**Behaviour reference — Claude artifacts:** [KPI Card](https://claude.ai/code/artifact/c3071fdf-27df-4e5a-8a29-b8de2bea769d) and [KPI Group](https://claude.ai/code/artifact/e93baf81-b8e3-4264-b2a8-d7ec6f717c22), live pages showing how the card and the group behave. Open them to see the intended behaviour — they are what this component was designed and approved from.","","One metric on one card: a label, a big number, one quiet line of context. It can carry a trend chip, and it has an area kept for a chart. By default it is a plain fact. Clickable is a switch that can be turned on for any card, chip or chart included; then it says so on hover.","Give it `items` instead of one metric and it becomes a group: two or more related metrics sharing one card, split by inset hairlines. Each segment is a whole card with its own switch.","Widths: a plain card has a 174px floor and no ceiling; a chart card no floor and 270 natural; a group is the sum. In a KpiStrip the cards grow evenly until the row is full and the strip scrolls past the fit. Dark mode comes from the theme toggle.","Two surfaces: `outlined` (the default) is the card on the page, the card ground inside a hairline; `filled` is the card inside a drawer, a grey ground with no edge. A segment whose value is a line of text rather than a number sizes to the line, with no floor in height or width."].join(`

`)}}}},s=({children:r})=>e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-items-start mdt-gap-6",children:r}),d={args:{label:"Total users",value:8200,hint:"across all organisations"}},c={render:()=>e.jsxs(s,{children:[e.jsx(a,{label:"Dormant users",value:256,hint:"no sign-in in 90+ days"}),e.jsx(a,{label:"Active users",value:7640}),e.jsx(a,{label:"Total users",value:8200,hint:"across all organisations",style:{width:220}})]})},u={render:()=>e.jsxs(s,{children:[e.jsx(a,{label:"Active users",value:7640,hint:"93% of total",delta:{label:"3.1%",direction:"up",tone:"good"}}),e.jsx(a,{label:"Failed sign-ins",value:142,hint:"last 24 hours",delta:{label:"12%",direction:"up",tone:"bad"}}),e.jsx(a,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"}}),e.jsx(a,{label:"Pending invites",value:11,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}})]})},h={render:()=>e.jsxs(s,{children:[e.jsx(a,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(n,{percent:82,caption:"capacity"})}),e.jsx(a,{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(We,{values:[56,44,32,38,26,34],base:22,threshold:40})})]})},p={render:()=>e.jsxs(s,{children:[e.jsx(n,{shape:"ring",percent:0,label:"Configuration health 0%"}),e.jsx(n,{shape:"ring",percent:50,label:"Configuration health 50%"}),e.jsx(n,{shape:"ring",percent:75,label:"Configuration health 75%"}),e.jsx(n,{shape:"ring",percent:100,label:"Configuration health 100%"}),e.jsx(n,{shape:"ring",percent:25,bad:!0,label:"Configuration health 25%, failing"})]})},m={render:function(){const[t,l]=k.useState("Click a card.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs(s,{children:[e.jsx(a,{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{l("Pending invites: the Invitations drawer opens on its Pending tab.")}}),e.jsx(a,{label:"Privileged accounts",value:12,hint:"admin / elevated",delta:{label:"4.5%",direction:"up",tone:"caution"},onClick:()=>{l("Privileged accounts: the list, filtered to privileged roles.")}}),e.jsx(a,{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(n,{percent:82,caption:"capacity"}),onClick:()=>{l("Licensed users limit: the licence page.")}})]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:t})]})}},g={render:()=>e.jsxs(s,{children:[e.jsx(a,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant"}),e.jsx(a,{label:"Accounts without multi-factor authentication",value:1204,hint:"across every organisation in the tenant",style:{width:270}})]})},v={render:()=>e.jsx(a,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance"},{label:"Active invitation links",value:4,hint:"37 issued"}]})},b={render:()=>e.jsx(a,{label:"Members",items:[{label:"Total",value:68,hint:"members"},{label:"Active",value:48,hint:"signed in this month",delta:{label:"6%",direction:"up",tone:"good"}},{label:"Inactive",value:10,hint:"no sign-in in 90+ days"},{label:"Pending invites",value:10,hint:"awaiting acceptance",delta:{label:"2",direction:"down",tone:"flat"}}]})},f={render:()=>e.jsx(a,{label:"Capacity",items:[{label:"Active users",value:7640,hint:"8.2k total"},{label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(n,{percent:82,caption:"capacity"})},{label:"Anomalous growth",value:47,hint:"users in last 24h",chart:e.jsx(We,{values:[56,44,32,38,26,34],base:22,threshold:40})}]})},w={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs(s,{children:[e.jsx(a,{label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(a,{size:"sm",label:"Total users",value:8200,hint:"across all organisations"})]}),e.jsxs(s,{children:[e.jsx(a,{label:"Structure",items:[{label:"Sites",value:12,hint:"across three regions"},{label:"Departments",value:48,hint:"6 without a head"}]}),e.jsx(a,{size:"sm",label:"Structure",items:[{label:"Sites",value:12,hint:"across three regions"},{label:"Departments",value:48,hint:"6 without a head",delta:{label:"2",direction:"up",tone:"flat"}}]})]}),e.jsx(s,{children:e.jsx(a,{size:"sm",label:"Licensed users limit",value:8200,hint:"10k allowed",chart:e.jsx(n,{percent:82,caption:"capacity"})})})]})},x={render:function(){const[t,l]=k.useState("Click a segment.");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(a,{label:"Invitations",items:[{label:"Pending invites",value:11,hint:"awaiting acceptance",onClick:()=>{l("Pending invites: the drawer opens on its Pending tab.")}},{label:"Active invitation links",value:4,hint:"37 issued",onClick:()=>{l("Active invitation links: the drawer opens on its Links tab.")}},{label:"Expired links",value:2,hint:"this month"}]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:t})]})}},C={render:()=>e.jsxs(s,{children:[e.jsx(a,{label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(a,{variant:"filled",label:"Total users",value:8200,hint:"across all organisations"}),e.jsx(a,{variant:"filled",label:"Active users",value:7640,hint:"93% of total",delta:{label:"3.1%",direction:"up",tone:"good"}})]})},i=(r,t)=>e.jsx("span",{className:$e("mdt-block mdt-truncate mdt-text-[13px] mdt-font-medium mdt-leading-[1.5]",t==="faint"&&"mdt-text-faint"),style:t&&t!=="faint"?{color:`var(--mdt-badge-${t}-ink)`}:void 0,children:r}),K=r=>e.jsx("span",{className:"mdt-flex mdt-h-[1.5em] mdt-items-center mdt-text-[13px]",children:r}),y={name:"Filled Group",render:function(){const[t,l]=k.useState("Click a count."),o=Me=>()=>{l(`${Me}: the drawer shows the targets behind it.`)};return e.jsxs("div",{className:"mdt-flex mdt-w-[670px] mdt-max-w-full mdt-flex-col mdt-gap-2",children:[e.jsx(a,{variant:"filled",label:"Yield",style:{width:"100%"},items:[{label:"Targets",value:i("1,180"),onClick:o("Targets")},{label:"Discovered",value:i("402","success"),onClick:o("Discovered")},{label:"New",value:i("23"),onClick:o("New")},{label:"Updated",value:i("379"),onClick:o("Updated")}]}),e.jsx(a,{variant:"filled",label:"Misses and coverage",style:{width:"100%"},items:[{label:"Unreachable",value:i("27","warning"),onClick:o("Unreachable")},{label:"Auth failed",value:i("14","danger"),onClick:o("Auth failed")},{label:"Excluded",value:i("6","faint"),onClick:o("Excluded")},{label:"Coverage",value:i("34%","danger")}]}),e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-text-muted-foreground","aria-live":"polite",children:t}),e.jsx(a,{variant:"filled",label:"Profile facts",style:{width:"100%",marginTop:16},items:[{label:"Type",value:i("SNMP v2c")},{label:"Status",value:K(e.jsx(j,{size:"sm",tone:"success",dot:!0,children:"Active"}))},{label:"Test status",value:K(e.jsx(j,{size:"sm",tone:"success",dot:!0,children:"Passed"}))},{label:"Secret source",value:i("Local")}]})]})}};var S,A,N,P,T;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Total users',
    value: 8200,
    hint: 'across all organisations'
  }
}`,...(N=(A=d.parameters)==null?void 0:A.docs)==null?void 0:N.source},description:{story:"A plain card at its 174 floor: label, value, supporting line. A number is rounded to one decimal with k or M.",...(T=(P=d.parameters)==null?void 0:P.docs)==null?void 0:T.description}}};var G,R,L,z,I;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Dormant users" value={256} hint="no sign-in in 90+ days" />
      <KpiCard label="Active users" value={7640} />
      <KpiCard label="Total users" value={8200} hint="across all organisations" style={{
      width: 220
    }} />
    </Row>
}`,...(L=(R=c.parameters)==null?void 0:R.docs)==null?void 0:L.source},description:{story:"Whole numbers, no supporting line, a wider card. On its own a card sits at the floor unless given a width.",...(I=(z=c.parameters)==null?void 0:z.docs)==null?void 0:I.description}}};var D,F,B,E,O;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(B=(F=u.parameters)==null?void 0:F.docs)==null?void 0:B.source},description:{story:"The verdict lives only in the chip: fill, no outline, an arrow up or down. Four tones by meaning. It renders only when the data carries a change.",...(O=(E=u.parameters)==null?void 0:E.docs)==null?void 0:O.description}}};var U,W,M,$,q;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Licensed users limit" value={8200} hint="10k allowed" chart={<KpiGauge percent={82} caption="capacity" />} />
      <KpiCard label="Anomalous growth" value={47} hint="users in last 24h" chart={<KpiBars values={[56, 44, 32, 38, 26, 34]} base={22} threshold={40} />} />
    </Row>
}`,...(M=(W=h.parameters)==null?void 0:W.docs)==null?void 0:M.source},description:{story:"The right side of the card is kept for a chart and nothing else. KpiGauge and KpiBars are the first two; any chart drawn to fit 104 × 62 can go there. A chart card has no floor; the chart keeps its size and the text side gives way first.",...(q=($=h.parameters)==null?void 0:$.docs)==null?void 0:q.description}}};var V,Y,_,H,J;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiGauge shape="ring" percent={0} label="Configuration health 0%" />
      <KpiGauge shape="ring" percent={50} label="Configuration health 50%" />
      <KpiGauge shape="ring" percent={75} label="Configuration health 75%" />
      <KpiGauge shape="ring" percent={100} label="Configuration health 100%" />
      <KpiGauge shape="ring" percent={25} bad label="Configuration health 25%, failing" />
    </Row>
}`,...(_=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:_.source},description:{story:'`shape="ring"`: the full health ring, ported from the console\'s Overview tab (Pranjal, 2026-10-13). 150 × 150 on its own,\nnot in a card\'s chart area: a pale track, the fill in the success green from twelve o\'clock with a rounded cap, the\nnumber with a smaller "%". At 100% the fill closes into one circle and a thin ring sits just outside it. `bad` turns\nthe fill to the danger colour. The ring draws no caption; the caption and `label` are spoken only.',...(J=(H=p.parameters)==null?void 0:H.docs)==null?void 0:J.description}}};var Q,X,Z,ee,ae;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Z=(X=m.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:"Off by default. With a click the card is a real button, whatever it holds: on hover or keyboard focus the label takes the reading ink and a dotted underline, a gear appears beside it, a soft fill sits 6px inside the edges, and the card presses to 97%.",...(ae=(ee=m.parameters)==null?void 0:ee.docs)==null?void 0:ae.description}}};var te,ie,se,ne,re;g.parameters={...g.parameters,docs:{...(te=g.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" />
      <KpiCard label="Accounts without multi-factor authentication" value={1204} hint="across every organisation in the tenant" style={{
      width: 270
    }} />
    </Row>
}`,...(se=(ie=g.parameters)==null?void 0:ie.docs)==null?void 0:se.source},description:{story:"The label truncates with an ellipsis at the card's width and never wraps; the supporting line does the same. The number never shrinks.",...(re=(ne=g.parameters)==null?void 0:ne.docs)==null?void 0:re.description}}};var le,oe,de,ce,ue;v.parameters={...v.parameters,docs:{...(le=v.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => <KpiCard label="Invitations" items={[{
    label: 'Pending invites',
    value: 11,
    hint: 'awaiting acceptance'
  }, {
    label: 'Active invitation links',
    value: 4,
    hint: '37 issued'
  }]} />
}`,...(de=(oe=v.parameters)==null?void 0:oe.docs)==null?void 0:de.source},description:{story:"Two related metrics sharing one card: the Users invitations pair. One hairline, 12px clear of the edges.",...(ue=(ce=v.parameters)==null?void 0:ce.docs)==null?void 0:ue.description}}};var he,pe,me,ge,ve;b.parameters={...b.parameters,docs:{...(he=b.parameters)==null?void 0:he.docs,source:{originalSource:`{
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
}`,...(me=(pe=b.parameters)==null?void 0:pe.docs)==null?void 0:me.source},description:{story:"As many segments as belong together; chips ride inside segments like anywhere else.",...(ve=(ge=b.parameters)==null?void 0:ge.docs)==null?void 0:ve.description}}};var be,fe,we,xe,Ce;f.parameters={...f.parameters,docs:{...(be=f.parameters)==null?void 0:be.docs,source:{originalSource:`{
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
}`,...(we=(fe=f.parameters)==null?void 0:fe.docs)==null?void 0:we.source},description:{story:"A segment may carry a chart in its chart area, exactly as a single card does.",...(Ce=(xe=f.parameters)==null?void 0:xe.docs)==null?void 0:Ce.description}}};var ye,ke,je,Ke,Se;w.parameters={...w.parameters,docs:{...(ye=w.parameters)==null?void 0:ye.docs,source:{originalSource:`{
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
}`,...(je=(ke=w.parameters)==null?void 0:ke.docs)==null?void 0:je.source},description:{story:`\`size="sm"\`: the quieter figure, 16/24 at 600 instead of 24 at 500, for a card that sits beside a section's
content - the two-column settings pages (Pranjal, 2026-10-15: "use smaller text so that it doesnt get that much
attention just enough to show its there"). Only the number changes. The last card holds a chart, so it keeps the
24 figure whatever it is given: the gauge beside it is drawn to that size.`,...(Se=(Ke=w.parameters)==null?void 0:Ke.docs)==null?void 0:Se.description}}};var Ae,Ne,Pe,Te,Ge;x.parameters={...x.parameters,docs:{...(Ae=x.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
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
}`,...(Pe=(Ne=x.parameters)==null?void 0:Ne.docs)==null?void 0:Pe.source},description:{story:"Each segment has its own switch. A clickable segment shows the cue on its own; its neighbours do not react and the outer card never lifts.",...(Ge=(Te=x.parameters)==null?void 0:Te.docs)==null?void 0:Ge.description}}};var Re,Le,ze,Ie,De;C.parameters={...C.parameters,docs:{...(Re=C.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: () => <Row>
      <KpiCard label="Total users" value={8200} hint="across all organisations" />
      <KpiCard variant="filled" label="Total users" value={8200} hint="across all organisations" />
      <KpiCard variant="filled" label="Active users" value={7640} hint="93% of total" delta={{
      label: '3.1%',
      direction: 'up',
      tone: 'good'
    }} />
    </Row>
}`,...(ze=(Le=C.parameters)==null?void 0:Le.docs)==null?void 0:ze.source},description:{story:'`variant="filled"`: the card inside a drawer - the neutral-10 ground and no edge - beside the default `outlined`\ncard on the page, the card ground inside its hairline. Nothing else changes: the corners, the label, the figure,\nthe supporting line, the chip and the click are the same on both.',...(De=(Ie=C.parameters)==null?void 0:Ie.docs)==null?void 0:De.description}}};var Fe,Be,Ee,Oe,Ue;y.parameters={...y.parameters,docs:{...(Fe=y.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
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
}`,...(Ee=(Be=y.parameters)==null?void 0:Be.docs)==null?void 0:Ee.source},description:{story:`A group on the filled ground: the facts card every drawer draws under its identity band. A segment whose value is
a line of text (a node, no hint) sizes to the line: no 98 floor and no 174 width floor, so four fit a 670 drawer
side by side. The first two cards are a run's yield and its misses, each count with a list behind it a click; the
third a profile's facts, with pills on the line. Shown with the discovery run and credential profile it was ported
from.`,...(Ue=(Oe=y.parameters)==null?void 0:Oe.docs)==null?void 0:Ue.description}}};const Ze=["Default","Variations","WithTrendChip","WithChart","GaugeRing","Clickable","LongLabel","Group","GroupOfFour","GroupWithCharts","Small","GroupClickable","Filled","FilledGroup"];export{m as Clickable,d as Default,C as Filled,y as FilledGroup,p as GaugeRing,v as Group,x as GroupClickable,b as GroupOfFour,f as GroupWithCharts,g as LongLabel,w as Small,c as Variations,h as WithChart,u as WithTrendChip,Ze as __namedExportsOrder,Xe as default};
//# sourceMappingURL=KpiCard.stories-BHVJ2KnZ.js.map
