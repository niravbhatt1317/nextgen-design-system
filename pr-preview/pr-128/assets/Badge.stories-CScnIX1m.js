import{j as e,r as we}from"./iframe-BtUjxFlt.js";import{B as n}from"./Badge-BcpJnp35.js";import{T as Be}from"./TagPill-BDwSXyfj.js";import{I as k}from"./Icon-CviZHsvv.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";const Re={title:"New Components/Badge",component:n,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A small label the system applies and nobody removes: the status pill with its dot, the","squarer category chip, counts, and the unread marker.","","Ported from the merged console on 4 September 2026: the previous Badge's spacing, the","console's colours, and no stroke by default. The previous component is `BadgeOld`,","deprecated and shown under Deprecated.","","| Rule | |","| --- | --- |","| **Fill only** | No stroke on any badge by default. `outline` is a light tinted stroke, opt-in. `solid` is for counts. |","| **Two shapes** | `pill` for states; `square` (a 4px corner) for categories, sources and counts like +N. |","| **Three sizes** | 20, 24 and 28px tall. |","| **Small is text or dot** | An icon handed to a small badge is dropped. Medium and large take a 14 or 16px icon. |","| **Eight tones with a meaning** | Category colours (LDAP, SCIM…) come in through `palette`, never as new tones. |","| **Capital first letter** | Every label starts with a capital. A lowercase-only word sits in the lower half of the line box and reads as low, whatever the line-height. |",'| **Counts** | `emphasis="solid"`, and `max={99}` renders 1284 as 99+. |',"| **Nobody removes a badge** | The system sets it. A label a person adds and can take away is `TagPill`, which has the ×. |","",'**Coming from `BadgeOld`:** `emphasis="subtle"` is now `fill` (still the default, now',"without a stroke); `slate` and `inverse` join the tones and `ai` stays; the 12px icon at","small is gone; `max`, `truncate` and the dot on its own work as before; `palette` is","new. There is no ×: a label a person can remove is `TagPill`.","","The dot is the strong tone colour, 6px, 8px at large. Every tone colour is a token,","`--mdt-badge-<tone>-fill` / `-ink` / `-dot`, a full colour read with `var()`: light in","`globals.css`, where the six console colours without a palette name are flagged, dark from","the colour map's badge tier (`ai` is not in the map yet and rides the purple ramp, his","ruling pending). `badge.css` holds no theme rule and no typed-in colour."].join(`
`)}}}},v=["success","warning","danger","info","ai","neutral","slate","inverse"],w={success:"Active",warning:"Invited",danger:"Expired",info:"Open",ai:"AI",neutral:"Manual",slate:"Inactive",inverse:"Offboarded"},T=s=>s.charAt(0).toUpperCase()+s.slice(1),fe={fill:"#F2F3FD",ink:"#4F5BC4"},ye={fill:"#EDF8F7",ink:"#1F7A71",dot:"#22857B"},Se=[{name:"LDAP",palette:fe},{name:"SCIM",palette:ye},{name:"Okta",palette:{fill:"#FDE1EE",ink:"#AF1D7A"}}],t=({label:s,children:o})=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,minHeight:40},children:[e.jsx("span",{style:{width:120,flex:"none",fontSize:11,letterSpacing:".08em",textTransform:"uppercase",color:"hsl(var(--mdt-muted-foreground))",fontWeight:600},children:s}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"},children:o})]}),x=({children:s})=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:s});function ve({shape:s}){const o=["sm","md","lg"],f={sm:12,md:14,lg:16};return e.jsx(x,{children:o.map(a=>e.jsxs(t,{label:`${a} · ${String({sm:20,md:24,lg:28}[a])}px`,children:[e.jsx(n,{shape:s,size:a,tone:"success",children:"Active"}),e.jsx(n,{shape:s,size:a,tone:"success",dot:!0,children:"Active"}),a==="sm"?e.jsx("span",{style:{fontSize:12,color:"hsl(var(--mdt-muted-foreground))",fontStyle:"italic"},children:"no icon at small"}):e.jsxs(e.Fragment,{children:[e.jsx(n,{shape:s,size:a,tone:"success",icon:e.jsx(k,{name:"check",size:f[a]}),children:"Verified"}),e.jsx(n,{shape:s,size:a,tone:"success",icon:e.jsx(k,{name:"shield",size:f[a]}),"aria-label":"Protected"})]})]},a))})}const y={args:{children:"Active",tone:"success",dot:!0}},l={render:()=>e.jsx(ve,{shape:"pill"})},d={render:()=>e.jsx(ve,{shape:"square"})},c={render:()=>e.jsxs(x,{children:[v.map(s=>e.jsxs(t,{label:s,children:[e.jsx(n,{tone:s,dot:!0,children:w[s]}),e.jsx(n,{tone:s,shape:"square",children:w[s]}),e.jsx(n,{tone:s,size:"sm",dot:!0,children:w[s]})]},s)),e.jsx(t,{label:"category",children:Se.map(s=>e.jsx(n,{shape:"square",palette:s.palette,children:s.name},s.name))})]})},p={render:()=>e.jsxs(x,{children:[e.jsx(t,{label:"fill · default",children:v.filter(s=>s!=="inverse").map(s=>e.jsx(n,{tone:s,dot:!0,children:T(s)},s))}),e.jsx(t,{label:"outline",children:v.filter(s=>s!=="inverse").map(s=>e.jsx(n,{tone:s,emphasis:"outline",children:T(s)},s))}),e.jsx(t,{label:"solid · counts",children:[["inverse","12"],["info","4"],["success","9"],["warning","7"],["danger","3"],["ai","2"]].map(([s,o])=>e.jsx(n,{tone:s,emphasis:"solid",size:"sm",children:o},s))})]})},m={render:()=>e.jsxs(x,{children:[e.jsxs(t,{label:"counts · small",children:[e.jsx(n,{tone:"inverse",emphasis:"solid",size:"sm",children:"3"}),e.jsx(n,{tone:"info",emphasis:"solid",size:"sm",children:"12"}),e.jsx(n,{tone:"danger",emphasis:"solid",size:"sm",max:99,children:"1284"}),e.jsx(n,{tone:"slate",size:"sm",children:"+2"})]}),e.jsxs(t,{label:"max={99}",children:[e.jsx(n,{tone:"danger",emphasis:"solid",max:99,children:"42"}),e.jsx(n,{tone:"danger",emphasis:"solid",max:99,children:"99"}),e.jsx(n,{tone:"danger",emphasis:"solid",max:99,children:"1284"})]}),e.jsxs(t,{label:"unread marker",children:[e.jsx(n,{tone:"success",dot:!0,size:"sm","aria-label":"Online"}),e.jsx(n,{tone:"success",dot:!0,"aria-label":"Online"}),e.jsx(n,{tone:"success",dot:!0,size:"lg","aria-label":"Online"}),e.jsx(n,{tone:"danger",dot:!0,"aria-label":"Needs attention"}),e.jsx(n,{tone:"info",dot:!0,"aria-label":"Unread"})]})]})},h={render:()=>{const s="Waiting for the identity provider to confirm the invitation";return e.jsxs(x,{children:[e.jsx(t,{label:"truncate off",children:e.jsx(n,{shape:"square",tone:"warning",children:s})}),e.jsxs(t,{label:"truncate",children:[e.jsx(n,{shape:"square",tone:"warning",truncate:!0,children:s}),e.jsx(n,{tone:"info",dot:!0,truncate:!0,children:s}),e.jsx(n,{tone:"info",dot:!0,truncate:!0,size:"lg",children:s})]})]})}},u={render:function(){const[o,f]=we.useState(["Status: Active","Source: LDAP","Team: Platform"]),a="hsl(var(--mdt-foreground))",i="hsl(var(--mdt-muted-foreground))",B="1px solid hsl(var(--mdt-neutral-20))",je=[["Sarah Johnson","sarah.johnson@company.com","success","Active",void 0,"Manual"],["Michael Smith","michael.smith@company.com","slate","Inactive",void 0,"Manual"],["Emily Davis","emily.davis@company.com","warning","Invited",fe,"LDAP"],["Olivia Jones","olivia.jones@company.com","danger","Expired",ye,"SCIM"]];return e.jsxs("div",{style:{display:"grid",gap:18,maxWidth:720,color:a,fontSize:14},children:[e.jsx("div",{children:je.map(([r,j,b,be,S,z])=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,height:44,borderBottom:B},children:[e.jsx("span",{style:{flex:1,fontWeight:500},children:r}),e.jsx("span",{style:{width:200,color:i,fontSize:13},children:j}),e.jsx(n,{size:"sm",tone:b,dot:!0,children:be}),S?e.jsx(n,{size:"sm",shape:"square",palette:S,children:z}):e.jsx(n,{size:"sm",shape:"square",children:z})]},r))}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,height:32,padding:"0 8px",color:i,opacity:.55,fontSize:13},children:[e.jsx("span",{style:{flex:1},children:"Permissions"}),e.jsx(n,{size:"sm",tone:"slate",children:"Soon"})]}),e.jsxs("div",{style:{display:"flex",gap:18,borderBottom:B,fontSize:13},children:[e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 0",boxShadow:`inset 0 -2px 0 ${a}`},children:["Members",e.jsx(n,{size:"sm",tone:"inverse",emphasis:"solid",children:"24"})]}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:8,padding:"8px 0",color:i},children:["Invitations",e.jsx(n,{size:"sm",tone:"slate",children:"11"})]})]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"},children:[e.jsx("span",{style:{color:i,fontSize:12},children:"TagPill, not Badge:"}),o.map(r=>e.jsx(Be,{shape:"square",onRemove:()=>{f(j=>j.filter(b=>b!==r))},children:r},r)),o.length===0?e.jsx("span",{style:{color:i,fontSize:13},children:"No filters"}):null]})]})}},g={args:{children:"Active",tone:"success",emphasis:"fill",shape:"pill",size:"md",dot:!0,truncate:!1},argTypes:{tone:{control:"select",options:v},emphasis:{control:"radio",options:["fill","outline","solid"]},shape:{control:"radio",options:["pill","square"]},size:{control:"radio",options:["sm","md","lg"]},dot:{control:"boolean"},truncate:{control:"boolean"},max:{control:"number"},children:{control:"text"},icon:{control:!1},palette:{control:!1}}};var A,E,I;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: 'Active',
    tone: 'success',
    dot: true
  }
}`,...(I=(E=y.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var P,R,O,q,L;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <Matrix shape="pill" />
}`,...(O=(R=l.parameters)==null?void 0:R.docs)==null?void 0:O.source},description:{story:"Pill: three sizes, every content type. States wear this shape.",...(L=(q=l.parameters)==null?void 0:q.docs)==null?void 0:L.description}}};var C,M,D,N,F;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Matrix shape="square" />
}`,...(D=(M=d.parameters)==null?void 0:M.docs)==null?void 0:D.source},description:{story:'Rounded square: the 4px corner. Categories, sources and "+N" wear this shape.',...(F=(N=d.parameters)==null?void 0:N.docs)==null?void 0:F.description}}};var W,_,J,$,U;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <Stack>
      {TONES.map(tone => <Row key={tone} label={tone}>
          <Badge tone={tone} dot>
            {TONE_LABEL[tone]}
          </Badge>
          <Badge tone={tone} shape="square">
            {TONE_LABEL[tone]}
          </Badge>
          <Badge tone={tone} size="sm" dot>
            {TONE_LABEL[tone]}
          </Badge>
        </Row>)}
      <Row label="category">
        {CATEGORY.map(c => <Badge key={c.name} shape="square" palette={c.palette}>
            {c.name}
          </Badge>)}
      </Row>
    </Stack>
}`,...(J=(_=c.parameters)==null?void 0:_.docs)==null?void 0:J.source},description:{story:"The eight tones with a meaning, in the console's colours, then category\ncolours passed in through `palette`. Every ink passes 4.5:1 on its fill.",...(U=($=c.parameters)==null?void 0:$.docs)==null?void 0:U.description}}};var G,Y,H,V,K;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <Stack>
      <Row label="fill · default">
        {TONES.filter(t => t !== 'inverse').map(tone => <Badge key={tone} tone={tone} dot>
            {cap(tone)}
          </Badge>)}
      </Row>
      <Row label="outline">
        {TONES.filter(t => t !== 'inverse').map(tone => <Badge key={tone} tone={tone} emphasis="outline">
            {cap(tone)}
          </Badge>)}
      </Row>
      <Row label="solid · counts">
        {([['inverse', '12'], ['info', '4'], ['success', '9'], ['warning', '7'], ['danger', '3'], ['ai', '2']] as [BadgeTone, string][]).map(([tone, n]) => <Badge key={tone} tone={tone} emphasis="solid" size="sm">
            {n}
          </Badge>)}
      </Row>
    </Stack>
}`,...(H=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:H.source},description:{story:"Fill is the default. Outline is the light tinted stroke, opt-in. Solid is for counts.",...(K=(V=p.parameters)==null?void 0:V.docs)==null?void 0:K.description}}};var Q,X,Z,ee,se;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <Stack>
      <Row label="counts · small">
        <Badge tone="inverse" emphasis="solid" size="sm">
          3
        </Badge>
        <Badge tone="info" emphasis="solid" size="sm">
          12
        </Badge>
        <Badge tone="danger" emphasis="solid" size="sm" max={99}>
          1284
        </Badge>
        <Badge tone="slate" size="sm">
          +2
        </Badge>
      </Row>
      <Row label="max={99}">
        <Badge tone="danger" emphasis="solid" max={99}>
          42
        </Badge>
        <Badge tone="danger" emphasis="solid" max={99}>
          99
        </Badge>
        <Badge tone="danger" emphasis="solid" max={99}>
          1284
        </Badge>
      </Row>
      <Row label="unread marker">
        <Badge tone="success" dot size="sm" aria-label="Online" />
        <Badge tone="success" dot aria-label="Online" />
        <Badge tone="success" dot size="lg" aria-label="Online" />
        <Badge tone="danger" dot aria-label="Needs attention" />
        <Badge tone="info" dot aria-label="Unread" />
      </Row>
    </Stack>
}`,...(Z=(X=m.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:"Solid is for counts. `max` caps a runaway number. The dot on its own is the unread marker.",...(se=(ee=m.parameters)==null?void 0:ee.docs)==null?void 0:se.description}}};var ne,ae,te,oe,re;h.parameters={...h.parameters,docs:{...(ne=h.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => {
    const long = 'Waiting for the identity provider to confirm the invitation';
    return <Stack>
        <Row label="truncate off">
          <Badge shape="square" tone="warning">
            {long}
          </Badge>
        </Row>
        <Row label="truncate">
          <Badge shape="square" tone="warning" truncate>
            {long}
          </Badge>
          <Badge tone="info" dot truncate>
            {long}
          </Badge>
          <Badge tone="info" dot truncate size="lg">
            {long}
          </Badge>
        </Row>
      </Stack>;
  }
}`,...(te=(ae=h.parameters)==null?void 0:ae.docs)==null?void 0:te.source},description:{story:"`truncate` holds the badge to 128px and cuts the label with an ellipsis. Off by default.",...(re=(oe=h.parameters)==null?void 0:oe.docs)==null?void 0:re.description}}};var ie,le,de,ce,pe;u.parameters={...u.parameters,docs:{...(ie=u.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  render: function InPlaceStory() {
    const [filters, setFilters] = useState(['Status: Active', 'Source: LDAP', 'Team: Platform']);
    const ink = 'hsl(var(--mdt-foreground))';
    const muted = 'hsl(var(--mdt-muted-foreground))';
    const line = '1px solid hsl(var(--mdt-neutral-20))';
    const rows: [string, string, BadgeTone, string, BadgePalette | undefined, string][] = [['Sarah Johnson', 'sarah.johnson@company.com', 'success', 'Active', undefined, 'Manual'], ['Michael Smith', 'michael.smith@company.com', 'slate', 'Inactive', undefined, 'Manual'], ['Emily Davis', 'emily.davis@company.com', 'warning', 'Invited', LDAP, 'LDAP'], ['Olivia Jones', 'olivia.jones@company.com', 'danger', 'Expired', SCIM, 'SCIM']];
    return <div style={{
      display: 'grid',
      gap: 18,
      maxWidth: 720,
      color: ink,
      fontSize: 14
    }}>
        <div>
          {rows.map(([name, mail, tone, status, palette, source]) => <div key={name} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          height: 44,
          borderBottom: line
        }}>
              <span style={{
            flex: 1,
            fontWeight: 500
          }}>{name}</span>
              <span style={{
            width: 200,
            color: muted,
            fontSize: 13
          }}>{mail}</span>
              <Badge size="sm" tone={tone} dot>
                {status}
              </Badge>
              {palette ? <Badge size="sm" shape="square" palette={palette}>
                  {source}
                </Badge> : <Badge size="sm" shape="square">
                  {source}
                </Badge>}
            </div>)}
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 32,
        padding: '0 8px',
        color: muted,
        opacity: 0.55,
        fontSize: 13
      }}>
          <span style={{
          flex: 1
        }}>Permissions</span>
          <Badge size="sm" tone="slate">
            Soon
          </Badge>
        </div>
        <div style={{
        display: 'flex',
        gap: 18,
        borderBottom: line,
        fontSize: 13
      }}>
          <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 0',
          boxShadow: \`inset 0 -2px 0 \${ink}\`
        }}>
            Members
            <Badge size="sm" tone="inverse" emphasis="solid">
              24
            </Badge>
          </span>
          <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 0',
          color: muted
        }}>
            Invitations
            <Badge size="sm" tone="slate">
              11
            </Badge>
          </span>
        </div>
        <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
          <span style={{
          color: muted,
          fontSize: 12
        }}>TagPill, not Badge:</span>
          {filters.map(f => <TagPill key={f} shape="square" onRemove={() => {
          setFilters(cur => cur.filter(x => x !== f));
        }}>
              {f}
            </TagPill>)}
          {filters.length === 0 ? <span style={{
          color: muted,
          fontSize: 13
        }}>No filters</span> : null}
        </div>
      </div>;
  }
}`,...(de=(le=u.parameters)==null?void 0:le.docs)==null?void 0:de.source},description:{story:"Where each one lives in the product: a table row, the sidebar's Soon row, tab counts; and beside them the tags a person can remove, which are TagPill.",...(pe=(ce=u.parameters)==null?void 0:ce.docs)==null?void 0:pe.description}}};var me,he,ue,ge,xe;g.parameters={...g.parameters,docs:{...(me=g.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    children: 'Active',
    tone: 'success',
    emphasis: 'fill',
    shape: 'pill',
    size: 'md',
    dot: true,
    truncate: false
  },
  argTypes: {
    tone: {
      control: 'select',
      options: TONES
    },
    emphasis: {
      control: 'radio',
      options: ['fill', 'outline', 'solid']
    },
    shape: {
      control: 'radio',
      options: ['pill', 'square']
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg']
    },
    dot: {
      control: 'boolean'
    },
    truncate: {
      control: 'boolean'
    },
    max: {
      control: 'number'
    },
    children: {
      control: 'text'
    },
    icon: {
      control: false
    },
    palette: {
      control: false
    }
  }
}`,...(ue=(he=g.parameters)==null?void 0:he.docs)==null?void 0:ue.source},description:{story:"Every option on one page, driven by the Controls panel.",...(xe=(ge=g.parameters)==null?void 0:ge.docs)==null?void 0:xe.description}}};const Oe=["Default","Pill","RoundedSquare","Tones","Emphasis","Counts","LongLabels","InPlace","Playground"];export{m as Counts,y as Default,p as Emphasis,u as InPlace,h as LongLabels,l as Pill,g as Playground,d as RoundedSquare,c as Tones,Oe as __namedExportsOrder,Re as default};
//# sourceMappingURL=Badge.stories-CScnIX1m.js.map
