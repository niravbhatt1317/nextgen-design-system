import{j as e}from"./iframe-DR_89Exp.js";import"./preload-helper-Dp1pzeXC.js";const d=[5,10,20,30,40,50,60,70,80,90,100],v=[{key:"neutral",name:"Neutral",role:"Text, borders and surfaces",steps:[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160],ink:null,added:!1},{key:"red",name:"Red",role:"Danger",steps:[5,10,20,30,40,50,60,65,70,80,90,100],ink:70,added:!1},{key:"orange",name:"Orange",role:"Warning",steps:[5,10,20,30,40,50,60,65,70,80,90,100],ink:80,added:!1},{key:"yellow",name:"Yellow",role:"Caution",steps:d,ink:90,added:!1},{key:"green",name:"Green",role:"Success",steps:d,ink:80,added:!1},{key:"blue",name:"Blue",role:"Brand, information, the focus edge",steps:[5,10,20,30,40,50,55,60,65,70,80,90,100],ink:80,added:!1},{key:"purple",name:"Purple",role:"AI",steps:d,ink:90,added:!1},{key:"indigo",name:"Indigo",role:"Category — the LDAP source chip",steps:d,ink:70,added:!0},{key:"teal",name:"Teal",role:"Category — the SCIM source chip",steps:d,ink:80,added:!0},{key:"magenta",name:"Magenta",role:"Category",steps:d,ink:80,added:!0},{key:"cyan",name:"Cyan",role:"Category",steps:d,ink:80,added:!0},{key:"lime",name:"Lime",role:"Category",steps:d,ink:80,added:!0}],U={5:["Wash","the faintest possible ground"],10:["Tint","chip and banner backgrounds"],20:["Tint strong","avatar circles, a pressed tint"],30:["Border soft","dividers drawn inside a tint"],40:["Border","outlines and control edges"],50:["Light solid","disabled fills, chart bands"],55:["Half-step","between light and solid"],60:["Solid","the colour itself — dots, icons, fills"],65:["Half-step","between solid and its hover"],70:["Solid dark","hover and pressed"],80:["Ink","text sitting on a tint"],90:["Ink deep","text that needs more weight"],100:["Deepest","dark-mode grounds"],110:["—","deep neutral"],120:["—","deep neutral"],130:["—","deep neutral"],140:["—","deep neutral"],150:["—","deep neutral"],160:["Near-black","the darkest ground"]},Y=[{token:"purple-70",console:"#5B27B0"},{token:"purple-60",console:"#6C2ED1"},{token:"blue-70",console:"#0A2666"},{token:"orange-60",console:"#FDB13F"},{token:"green-80",console:"#21823A"},{token:"orange-70",console:"#DA7D0B"},{token:"orange-80",console:"#9F6404"},{token:"neutral-100",console:"#384861"},{token:"blue-55",console:"#036EBA"},{token:"neutral-110",console:"#1D2B3E"},{token:"red-50",console:"#E74536"},{token:"neutral-70",console:"#727283"}],_=12,K=t=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue(t).trim(),V=t=>{const o=t.replace(/%/g,"").split(/\s+/).map(Number),[n,r,s]=o;if(n===void 0||r===void 0||s===void 0||Number.isNaN(n))return"";const a=r/100,p=s/100,i=(1-Math.abs(2*p-1))*a,h=i*(1-Math.abs(n/60%2-1)),J=p-i/2;return`#${([[i,h,0],[h,i,0],[0,i,h],[0,h,i],[h,0,i],[i,0,h]][Math.floor(n/60)%6]??[0,0,0]).map(q=>Math.round((q+J)*255).toString(16).padStart(2,"0").toUpperCase()).join("")}`},w=t=>{const o=[1,3,5].map(n=>parseInt(t.slice(n,n+2),16)/255).map(n=>n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4));return .2126*(o[0]??0)+.7152*(o[1]??0)+.0722*(o[2]??0)},X=(t,o)=>{if(t===""||o==="")return 0;const[n,r]=[w(t),w(o)].sort((s,a)=>a-s);return((n??0)+.05)/((r??0)+.05)},x=t=>t<10?`0${String(t)}`:String(t),c=(t,o)=>V(K(`--mdt-${t}-${x(o)}`)),Q=()=>{const t=[];if(typeof document>"u")return t;const o=n=>{for(const r of Array.from(n))r instanceof CSSStyleRule?r.selectorText===":root"&&t.push(r):r instanceof CSSGroupingRule&&o(r.cssRules)};for(const n of Array.from(document.styleSheets))try{o(n.cssRules)}catch{}return t},j=(t,o)=>{let n="";for(const r of t){const s=r.style.getPropertyValue(o).trim();s!==""&&(n=s)}return n},Z=(t,o)=>{var r;let n=j(t,o);for(let s=0;s<5&&n.startsWith("var(");s+=1){const a=(r=/var\((--mdt-[a-z0-9-]+)\)/.exec(n))==null?void 0:r[1];if(a===void 0)return"";n=j(t,a)}return n===""?"":n.startsWith("#")?n.toUpperCase():V(n)},f={maxWidth:1080,margin:"0 auto",padding:"32px 24px 72px",fontFamily:'system-ui, -apple-system, "Segoe UI", sans-serif',color:"hsl(var(--mdt-foreground))"},l={fontFamily:'ui-monospace, "Cascadia Mono", Consolas, monospace'},b=({children:t,lead:o})=>e.jsxs("header",{style:{marginBottom:28},children:[e.jsx("h1",{style:{fontSize:24,fontWeight:700,letterSpacing:"-0.01em",margin:0},children:t}),o!==void 0?e.jsx("p",{style:{margin:"10px 0 0",maxWidth:"68ch",fontSize:14.5,lineHeight:1.6,color:"hsl(var(--mdt-muted-foreground))"},children:o}):null]}),k=({children:t})=>e.jsx("div",{style:{borderLeft:"3px solid hsl(var(--mdt-blue-60))",background:"hsl(var(--mdt-muted) / 0.5)",borderRadius:"0 10px 10px 0",padding:"14px 18px",margin:"24px 0",fontSize:13.5,lineHeight:1.65,maxWidth:"80ch"},children:t}),ee=t=>{typeof navigator<"u"&&navigator.clipboard!==void 0&&navigator.clipboard.writeText(t)},te=({family:t,step:o,isInk:n})=>{const r=c(t,o),s=`--mdt-${t}-${x(o)}`;return e.jsxs("button",{type:"button",onClick:()=>{ee(s)},title:`${s} — ${r===""?"MISSING":r}`,style:{all:"unset",cursor:"pointer",borderRadius:8,overflow:"hidden",border:"1px solid hsl(var(--mdt-border))",background:"hsl(var(--mdt-card))"},children:[e.jsx("span",{style:{display:"block",height:46,background:r===""?"repeating-linear-gradient(45deg, hsl(var(--mdt-red-60)) 0 6px, hsl(var(--mdt-card)) 6px 12px)":r}}),e.jsxs("span",{style:{display:"block",padding:"5px 4px 6px",textAlign:"center"},children:[e.jsx("span",{style:{display:"block",fontSize:11,fontWeight:600,color:n?"hsl(var(--mdt-blue-60))":"hsl(var(--mdt-muted-foreground))"},children:x(o)}),e.jsx("span",{style:{...l,display:"block",fontSize:9,color:"hsl(var(--mdt-muted-foreground))"},children:r===""?"missing":r})]})]})},ne=({family:t})=>e.jsxs("section",{style:{marginBottom:26},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:10,flexWrap:"wrap",marginBottom:8},children:[e.jsx("span",{style:{fontSize:14,fontWeight:600},children:t.name}),e.jsx("span",{style:{fontSize:12,color:"hsl(var(--mdt-muted-foreground))"},children:t.role}),t.added?e.jsx("span",{style:{fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:999,background:"hsl(var(--mdt-indigo-10))",color:"hsl(var(--mdt-indigo-70))"},children:"added 2026-09-10"}):null,t.ink!==null?e.jsxs("span",{style:{...l,fontSize:11,color:"hsl(var(--mdt-muted-foreground))"},children:["text at −",t.ink]}):null]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsx("div",{style:{display:"grid",gap:6,minWidth:760,gridTemplateColumns:`repeat(${String(t.steps.length)}, minmax(0, 1fr))`},children:t.steps.map(o=>e.jsx(te,{family:t.key,step:o,isInk:t.ink===o},o))})})]}),ie={title:"Foundation/Colors",parameters:{layout:"fullscreen",docs:{description:{component:["**Reference — Claude artifact:** [NextGen Colour Palette](https://claude.ai/code/artifact/db469b11-8470-4b45-9128-94b056cc168d), where the five added families, the job of every shade and the text shade per colour were settled. Open it for the reasoning behind the palette on this page.","","Twelve families, 141 shades. **Every swatch is read live from the running stylesheet**,","so this page cannot drift from the tokens it describes — which is how the page it","replaces went wrong. Click any swatch to copy its token name.","","Reach for a token, never a hex code: `hsl(var(--mdt-blue-60))`."].join(`
`)}}}},m={render:()=>e.jsxs("div",{style:f,children:[e.jsx(b,{lead:"Twelve families, 141 shades. Read live from the stylesheet, so nothing here can go stale. Click a swatch to copy its token name.",children:"Colour palette"}),v.map(t=>e.jsx(ne,{family:t},t.key)),e.jsxs(k,{children:[e.jsx("b",{children:"The five category families"})," — indigo, teal, magenta, cyan and lime — carry no meaning on purpose, so a source chip or an avatar never reads as success, warning or danger. Their anchor shades are exactly the colours those chips already painted by hand, so nothing on screen moved when they landed."]})]})},u={render:()=>{var t;return e.jsxs("div",{style:f,children:[e.jsx(b,{lead:"Shown on Blue. Nothing here is a new colour — only a name for what each existing shade is good for.",children:"What each shade is for"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",width:"100%",minWidth:560,fontSize:13.5},children:[e.jsx("thead",{children:e.jsx("tr",{children:["","Step","Job","What you draw with it"].map(o=>e.jsx("th",{style:{textAlign:"left",fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"hsl(var(--mdt-muted-foreground))",padding:"0 14px 8px 0",borderBottom:"1px solid hsl(var(--mdt-border))"},children:o},o))})}),e.jsx("tbody",{children:(((t=v[5])==null?void 0:t.steps)??[]).map(o=>{const n=U[o]??["—",""];return e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)"},children:e.jsx("span",{style:{display:"inline-block",width:34,height:22,borderRadius:5,background:c("blue",o),border:"1px solid hsl(var(--mdt-border))"}})}),e.jsx("td",{style:{...l,padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)",fontVariantNumeric:"tabular-nums"},children:x(o)}),e.jsx("td",{style:{padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)",fontWeight:600},children:n[0]}),e.jsx("td",{style:{padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)",color:"hsl(var(--mdt-muted-foreground))"},children:n[1]})]},o)})})]})})]})}},g={render:()=>e.jsxs("div",{style:f,children:[e.jsx(b,{lead:"Tint at −10, dot at −60, text at the family's own text shade. Every ratio is measured live.",children:"Text on a tint"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:14},children:v.filter(t=>t.ink!==null).map(t=>{const o=c(t.key,10),n=c(t.key,t.ink??80),r=c(t.key,60),s=X(n,o),a=s>=4.5;return e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 11px",borderRadius:6,fontSize:12.5,fontWeight:500,background:o,color:n},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:999,background:r}}),t.name]}),e.jsxs("span",{style:{...l,display:"block",marginTop:4,fontSize:10.5,fontWeight:600,color:a?"hsl(var(--mdt-green-80))":"hsl(var(--mdt-red-70))"},children:[s.toFixed(2),":1"]}),e.jsxs("span",{style:{...l,display:"block",fontSize:9.5,color:"hsl(var(--mdt-muted-foreground))"},children:["−",t.ink]})]},t.key)})}),e.jsxs(k,{children:["Red reaches 4.5:1 at ",e.jsx("b",{children:"−70"}),". Blue, green, orange and most of the category families need"," ",e.jsx("b",{children:"−80"}),". Yellow and purple have to go all the way to ",e.jsx("b",{children:"−90"}),". Publishing one text shade per family is the only honest answer; a single number across the palette would fail on the bright hues."]})]})},y={render:()=>{const t=Q(),o=Y.map(n=>{const[r="",s=""]=n.token.split("-"),a=Z(t,`--mdt-${n.token}`),p=a===""?c(r,Number(s)):a;return{token:n.token,library:p,console:n.console,apart:X(p,n.console)}}).sort((n,r)=>r.apart-n.apart);return e.jsxs("div",{style:f,children:[e.jsx(b,{lead:"Twenty-four token names paint one colour in this library and another in the console. Nothing on either side moves until each one is ruled on.",children:"Where the console and the library disagree"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",width:"100%",minWidth:620,fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{children:["Token","This library","The console","Apart"].map(n=>e.jsx("th",{style:{textAlign:"left",fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"hsl(var(--mdt-muted-foreground))",padding:"0 14px 8px 0",borderBottom:"1px solid hsl(var(--mdt-border))"},children:n},n))})}),e.jsx("tbody",{children:o.map(n=>e.jsxs("tr",{children:[e.jsx("td",{style:{...l,fontWeight:600,padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)"},children:n.token}),[["library",n.library],["console",n.console]].map(([r,s])=>e.jsxs("td",{style:{padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)"},children:[e.jsx("span",{style:{display:"inline-block",width:22,height:22,borderRadius:5,marginRight:8,verticalAlign:"middle",background:s,border:"1px solid hsl(var(--mdt-border))"}}),e.jsx("span",{style:{...l,fontSize:11.5},children:s})]},r)),e.jsxs("td",{style:{...l,fontWeight:600,fontVariantNumeric:"tabular-nums",padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)",color:n.apart>=1.4?"hsl(var(--mdt-red-70))":"hsl(var(--mdt-orange-80))"},children:[n.apart.toFixed(2),"×"]})]},n.token))})]})}),e.jsxs("p",{style:{marginTop:12,fontSize:12.5,color:"hsl(var(--mdt-muted-foreground))"},children:["Plus ",_," more that differ only slightly — rounding and near-misses, but still two answers to the same name."]}),e.jsxs(k,{children:["Each of these is one of three things: ",e.jsx("b",{children:"the console is right"})," and this library should adopt its value; ",e.jsx("b",{children:"the library is right"})," and the console should drop its override; or"," ",e.jsx("b",{children:"both are right"})," and they are genuinely different colours that need different names. Purple is the loudest — the console’s is more than twice as dark as this one’s."]})]})}};var S,T,W,B,R;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div style={page}>
      <Title lead="Twelve families, 141 shades. Read live from the stylesheet, so nothing here can go stale. Click a swatch to copy its token name.">
        Colour palette
      </Title>
      {FAMILIES.map(family => <Ladder key={family.key} family={family} />)}
      <Note>
        <b>The five category families</b> — indigo, teal, magenta, cyan and lime — carry no meaning
        on purpose, so a source chip or an avatar never reads as success, warning or danger. Their
        anchor shades are exactly the colours those chips already painted by hand, so nothing on
        screen moved when they landed.
      </Note>
    </div>
}`,...(W=(T=m.parameters)==null?void 0:T.docs)==null?void 0:W.source},description:{story:`The whole palette, one family per row. Seven families were already here; five
were added on 10 Sep 2026 because our interface needed colours that carry no
meaning, and there was nothing to reach for — so they had been written by
hand into the chip code instead.

Click any swatch to copy its token name.`,...(R=(B=m.parameters)==null?void 0:B.docs)==null?void 0:R.description}}};var C,N,A,z,I;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={page}>
      <Title lead="Shown on Blue. Nothing here is a new colour — only a name for what each existing shade is good for.">
        What each shade is for
      </Title>
      <div style={{
      overflowX: 'auto'
    }}>
        <table style={{
        borderCollapse: 'collapse',
        width: '100%',
        minWidth: 560,
        fontSize: 13.5
      }}>
          <thead>
            <tr>
              {['', 'Step', 'Job', 'What you draw with it'].map(h => <th key={h} style={{
              textAlign: 'left',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.05em',
              textTransform: 'uppercase',
              color: 'hsl(var(--mdt-muted-foreground))',
              padding: '0 14px 8px 0',
              borderBottom: '1px solid hsl(var(--mdt-border))'
            }}>
                  {h}
                </th>)}
            </tr>
          </thead>
          <tbody>
            {(FAMILIES[5]?.steps ?? []).map(step => {
            const job = JOBS[step] ?? ['—', ''];
            return <tr key={step}>
                  <td style={{
                padding: '9px 14px 9px 0',
                borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)'
              }}>
                    <span style={{
                  display: 'inline-block',
                  width: 34,
                  height: 22,
                  borderRadius: 5,
                  background: shadeHex('blue', step),
                  border: '1px solid hsl(var(--mdt-border))'
                }} />
                  </td>
                  <td style={{
                ...mono,
                padding: '9px 14px 9px 0',
                borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                fontVariantNumeric: 'tabular-nums'
              }}>
                    {stepName(step)}
                  </td>
                  <td style={{
                padding: '9px 14px 9px 0',
                borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                fontWeight: 600
              }}>
                    {job[0]}
                  </td>
                  <td style={{
                padding: '9px 14px 9px 0',
                borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                color: 'hsl(var(--mdt-muted-foreground))'
              }}>
                    {job[1]}
                  </td>
                </tr>;
          })}
          </tbody>
        </table>
      </div>
    </div>
}`,...(A=(N=u.parameters)==null?void 0:N.docs)==null?void 0:A.source},description:{story:`A number on its own is not a system. Every rung has a job, so picking a shade
is a decision about what you are drawing rather than a guess at brightness.`,...(I=(z=u.parameters)==null?void 0:z.docs)==null?void 0:I.description}}};var E,F,M,H,P;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={page}>
      <Title lead="Tint at −10, dot at −60, text at the family's own text shade. Every ratio is measured live.">
        Text on a tint
      </Title>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14
    }}>
        {FAMILIES.filter(f => f.ink !== null).map(family => {
        const tint = shadeHex(family.key, 10);
        const ink = shadeHex(family.key, family.ink ?? 80);
        const dot = shadeHex(family.key, 60);
        const ratio = contrast(ink, tint);
        const passes = ratio >= 4.5;
        return <div key={family.key} style={{
          textAlign: 'center'
        }}>
              <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 11px',
            borderRadius: 6,
            fontSize: 12.5,
            fontWeight: 500,
            background: tint,
            color: ink
          }}>
                <span style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: dot
            }} />
                {family.name}
              </span>
              <span style={{
            ...mono,
            display: 'block',
            marginTop: 4,
            fontSize: 10.5,
            fontWeight: 600,
            color: passes ? 'hsl(var(--mdt-green-80))' : 'hsl(var(--mdt-red-70))'
          }}>
                {ratio.toFixed(2)}:1
              </span>
              <span style={{
            ...mono,
            display: 'block',
            fontSize: 9.5,
            color: 'hsl(var(--mdt-muted-foreground))'
          }}>
                −{family.ink}
              </span>
            </div>;
      })}
      </div>
      <Note>
        Red reaches 4.5:1 at <b>−70</b>. Blue, green, orange and most of the category families need{' '}
        <b>−80</b>. Yellow and purple have to go all the way to <b>−90</b>. Publishing one text
        shade per family is the only honest answer; a single number across the palette would fail on
        the bright hues.
      </Note>
    </div>
}`,...(M=(F=g.parameters)==null?void 0:F.docs)==null?void 0:M.source},description:{story:`Each family publishes its own text shade: the lightest step that still reads
at 4.5:1 on that family's own tint. It is not the same number everywhere,
because a bright hue cannot carry text at a middle shade.

The ratios below are measured on the page as it renders, not typed in.`,...(P=(H=g.parameters)==null?void 0:H.docs)==null?void 0:P.description}}};var L,D,$,G,O;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => {
    const light = rootRules();
    const rows = DISAGREEMENTS.map(row => {
      const [family = '', step = ''] = row.token.split('-');
      const fromRules = lightHex(light, \`--mdt-\${row.token}\`);
      const library = fromRules === '' ? shadeHex(family, Number(step)) : fromRules;
      return {
        token: row.token,
        library,
        console: row.console,
        apart: contrast(library, row.console)
      };
    }).sort((a, b) => b.apart - a.apart);
    return <div style={page}>
        <Title lead="Twenty-four token names paint one colour in this library and another in the console. Nothing on either side moves until each one is ruled on.">
          Where the console and the library disagree
        </Title>
        <div style={{
        overflowX: 'auto'
      }}>
          <table style={{
          borderCollapse: 'collapse',
          width: '100%',
          minWidth: 620,
          fontSize: 13
        }}>
            <thead>
              <tr>
                {['Token', 'This library', 'The console', 'Apart'].map(h => <th key={h} style={{
                textAlign: 'left',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.05em',
                textTransform: 'uppercase',
                color: 'hsl(var(--mdt-muted-foreground))',
                padding: '0 14px 8px 0',
                borderBottom: '1px solid hsl(var(--mdt-border))'
              }}>
                    {h}
                  </th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => <tr key={row.token}>
                  <td style={{
                ...mono,
                fontWeight: 600,
                padding: '9px 14px 9px 0',
                borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)'
              }}>
                    {row.token}
                  </td>
                  {([['library', row.library], ['console', row.console]] as const).map(([side, hex]) => <td key={side} style={{
                padding: '9px 14px 9px 0',
                borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)'
              }}>
                      <span style={{
                  display: 'inline-block',
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  marginRight: 8,
                  verticalAlign: 'middle',
                  background: hex,
                  border: '1px solid hsl(var(--mdt-border))'
                }} />
                      <span style={{
                  ...mono,
                  fontSize: 11.5
                }}>{hex}</span>
                    </td>)}
                  <td style={{
                ...mono,
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                padding: '9px 14px 9px 0',
                borderBottom: '1px solid hsl(var(--mdt-border) / 0.5)',
                color: row.apart >= 1.4 ? 'hsl(var(--mdt-red-70))' : 'hsl(var(--mdt-orange-80))'
              }}>
                    {row.apart.toFixed(2)}×
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <p style={{
        marginTop: 12,
        fontSize: 12.5,
        color: 'hsl(var(--mdt-muted-foreground))'
      }}>
          Plus {SLIGHT} more that differ only slightly — rounding and near-misses, but still two
          answers to the same name.
        </p>
        <Note>
          Each of these is one of three things: <b>the console is right</b> and this library should
          adopt its value; <b>the library is right</b> and the console should drop its override; or{' '}
          <b>both are right</b> and they are genuinely different colours that need different names.
          Purple is the loudest — the console&rsquo;s is more than twice as dark as this
          one&rsquo;s.
        </Note>
      </div>;
  }
}`,...($=(D=y.parameters)==null?void 0:D.docs)==null?void 0:$.source},description:{story:`One name, two colours. The console re-points a set of these tokens in light
mode, so the same token paints differently depending on which side of the
fence you are standing on.

This is not a bug to fix quietly — it is a decision, and it belongs to Nirav.

The library column and the distance are read live from the light stylesheet, so
they cannot go stale; the console column is typed in, because the console's
stylesheet is not loaded here. Both columns are light values, whichever theme is on.`,...(O=(G=y.parameters)==null?void 0:G.docs)==null?void 0:O.description}}};const de=["Palette","WhatEachShadeIsFor","TextOnATint","StillDisagreed"];export{m as Palette,y as StillDisagreed,g as TextOnATint,u as WhatEachShadeIsFor,de as __namedExportsOrder,ie as default};
//# sourceMappingURL=Colors.stories-C5PkW2Ev.js.map
