import{j as e,r as Y}from"./iframe-DTe3Uuey.js";import{T as _,a as K,b as Q,c as Z}from"./index-CcEFDawZ.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BGaZzkxl.js";import"./index-C2nhcip3.js";import"./index-BUyOuuLB.js";import"./index-DurT-TuQ.js";import"./index-Bu-O9xNT.js";import"./index-D_ZLLsBr.js";import"./index-7ZXX3tXl.js";import"./index-CVyGic1a.js";import"./index-BrjyBZb5.js";import"./index-B0tW2ZVL.js";import"./index-51MAS9uk.js";import"./index-CTpb-Nn7.js";import"./index-DGSQvxOD.js";import"./index-BDPBSnpI.js";import"./index-CcRgbaMz.js";const l=[5,10,20,30,40,50,60,70,80,90,100],v=[{key:"neutral",name:"Neutral",role:"Text, borders and surfaces",steps:[10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160],ink:null,added:!1},{key:"red",name:"Red",role:"Danger",steps:[5,10,20,30,40,50,60,65,70,80,90,100],ink:70,added:!1},{key:"orange",name:"Orange",role:"Warning",steps:[5,10,20,30,40,50,60,65,70,80,90,100],ink:80,added:!1},{key:"yellow",name:"Yellow",role:"Caution",steps:l,ink:90,added:!1},{key:"green",name:"Green",role:"Success",steps:l,ink:80,added:!1},{key:"blue",name:"Blue",role:"Brand, information, the focus edge",steps:[5,10,20,30,40,50,55,60,65,70,80,90,100],ink:80,added:!1},{key:"purple",name:"Purple",role:"AI",steps:l,ink:90,added:!1},{key:"indigo",name:"Indigo",role:"Category — the LDAP source chip",steps:l,ink:70,added:!0},{key:"teal",name:"Teal",role:"Category — the SCIM source chip",steps:l,ink:80,added:!0},{key:"magenta",name:"Magenta",role:"Category",steps:l,ink:80,added:!0},{key:"cyan",name:"Cyan",role:"Category",steps:l,ink:80,added:!0},{key:"lime",name:"Lime",role:"Category",steps:l,ink:80,added:!0}],ee={5:["Wash","the faintest possible ground"],10:["Tint","chip and banner backgrounds"],20:["Tint strong","avatar circles, a pressed tint"],30:["Border soft","dividers drawn inside a tint"],40:["Border","outlines and control edges"],50:["Light solid","disabled fills, chart bands"],55:["Half-step","between light and solid"],60:["Solid","the colour itself — dots, icons, fills"],65:["Half-step","between solid and its hover"],70:["Solid dark","hover and pressed"],80:["Ink","text sitting on a tint"],90:["Ink deep","text that needs more weight"],100:["Deepest","dark-mode grounds"],110:["—","deep neutral"],120:["—","deep neutral"],130:["—","deep neutral"],140:["—","deep neutral"],150:["—","deep neutral"],160:["Near-black","the darkest ground"]},te=[{token:"purple-70",console:"#5B27B0"},{token:"purple-60",console:"#6C2ED1"},{token:"blue-70",console:"#0A2666"},{token:"orange-60",console:"#FDB13F"},{token:"green-80",console:"#21823A"},{token:"orange-70",console:"#DA7D0B"},{token:"orange-80",console:"#9F6404"},{token:"neutral-100",console:"#384861"},{token:"blue-55",console:"#036EBA"},{token:"neutral-110",console:"#1D2B3E"},{token:"red-50",console:"#E74536"},{token:"neutral-70",console:"#727283"}],oe=12,ne=t=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue(t).trim(),X=t=>{const n=t.replace(/%/g,"").split(/\s+/).map(Number),[o,r,s]=n;if(o===void 0||r===void 0||s===void 0||Number.isNaN(o))return"";const a=r/100,d=s/100,i=(1-Math.abs(2*d-1))*a,c=i*(1-Math.abs(o/60%2-1)),q=d-i/2;return`#${([[i,c,0],[c,i,0],[0,i,c],[0,c,i],[c,0,i],[i,0,c]][Math.floor(o/60)%6]??[0,0,0]).map(U=>Math.round((U+q)*255).toString(16).padStart(2,"0").toUpperCase()).join("")}`},w=t=>{const n=[1,3,5].map(o=>parseInt(t.slice(o,o+2),16)/255).map(o=>o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4));return .2126*(n[0]??0)+.7152*(n[1]??0)+.0722*(n[2]??0)},J=(t,n)=>{if(t===""||n==="")return 0;const[o,r]=[w(t),w(n)].sort((s,a)=>a-s);return((o??0)+.05)/((r??0)+.05)},x=t=>t<10?`0${String(t)}`:String(t),p=(t,n)=>X(ne(`--mdt-${t}-${x(n)}`)),re=()=>{const t=[];if(typeof document>"u")return t;const n=o=>{for(const r of Array.from(o))r instanceof CSSStyleRule?r.selectorText===":root"&&t.push(r):r instanceof CSSGroupingRule&&n(r.cssRules)};for(const o of Array.from(document.styleSheets))try{n(o.cssRules)}catch{}return t},j=(t,n)=>{let o="";for(const r of t){const s=r.style.getPropertyValue(n).trim();s!==""&&(o=s)}return o},se=(t,n)=>{var r;let o=j(t,n);for(let s=0;s<5&&o.startsWith("var(");s+=1){const a=(r=/var\((--mdt-[a-z0-9-]+)\)/.exec(o))==null?void 0:r[1];if(a===void 0)return"";o=j(t,a)}return o===""?"":o.startsWith("#")?o.toUpperCase():X(o)},f={maxWidth:1080,margin:"0 auto",padding:"32px 24px 72px",fontFamily:'system-ui, -apple-system, "Segoe UI", sans-serif',color:"hsl(var(--mdt-foreground))"},h={fontFamily:'ui-monospace, "Cascadia Mono", Consolas, monospace'},b=({children:t,lead:n})=>e.jsxs("header",{style:{marginBottom:28},children:[e.jsx("h1",{style:{fontSize:24,fontWeight:700,letterSpacing:"-0.01em",margin:0},children:t}),n!==void 0?e.jsx("p",{style:{margin:"10px 0 0",maxWidth:"68ch",fontSize:14.5,lineHeight:1.6,color:"hsl(var(--mdt-muted-foreground))"},children:n}):null]}),k=({children:t})=>e.jsx("div",{style:{borderLeft:"3px solid hsl(var(--mdt-blue-60))",background:"hsl(var(--mdt-muted) / 0.5)",borderRadius:"0 10px 10px 0",padding:"14px 18px",margin:"24px 0",fontSize:13.5,lineHeight:1.65,maxWidth:"80ch"},children:t}),S=t=>{const n=document.createElement("textarea");n.value=t,n.setAttribute("readonly",""),n.style.position="fixed",n.style.opacity="0",document.body.appendChild(n),n.select();let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return n.remove(),o},ae=async t=>{if(typeof navigator<"u"&&navigator.clipboard!==void 0&&window.isSecureContext)try{return await navigator.clipboard.writeText(t),!0}catch{return S(t)}return S(t)},ie=({family:t,step:n,isInk:o})=>{const r=p(t,n),s=`--mdt-${t}-${x(n)}`,[a,d]=Y.useState(!1);return e.jsx(_,{children:e.jsxs(K,{open:a,children:[e.jsx(Q,{asChild:!0,children:e.jsxs("button",{type:"button","data-copied":a?"true":void 0,disabled:r==="",onClick:()=>{ae(r).then(i=>{i&&(d(!0),window.setTimeout(()=>{d(!1)},1200))})},title:`${s} — ${r===""?"MISSING":r}`,style:{all:"unset",cursor:"pointer",borderRadius:8,overflow:"hidden",border:"1px solid hsl(var(--mdt-border))",background:"hsl(var(--mdt-card))"},children:[e.jsx("span",{style:{display:"block",height:46,background:r===""?"repeating-linear-gradient(45deg, hsl(var(--mdt-red-60)) 0 6px, hsl(var(--mdt-card)) 6px 12px)":r}}),e.jsxs("span",{style:{display:"block",padding:"5px 4px 6px",textAlign:"center"},children:[e.jsx("span",{style:{display:"block",fontSize:11,fontWeight:600,color:o?"hsl(var(--mdt-blue-60))":"hsl(var(--mdt-muted-foreground))"},children:x(n)}),e.jsx("span",{style:{...h,display:"block",fontSize:9,color:"hsl(var(--mdt-muted-foreground))"},children:r===""?"missing":r})]})]})}),e.jsx(Z,{side:"top",children:"Copied"})]})})},de=({family:t})=>e.jsxs("section",{style:{marginBottom:26},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:10,flexWrap:"wrap",marginBottom:8},children:[e.jsx("span",{style:{fontSize:14,fontWeight:600},children:t.name}),e.jsx("span",{style:{fontSize:12,color:"hsl(var(--mdt-muted-foreground))"},children:t.role}),t.added?e.jsx("span",{style:{fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:999,background:"hsl(var(--mdt-indigo-10))",color:"hsl(var(--mdt-indigo-70))"},children:"added 2026-09-10"}):null,t.ink!==null?e.jsxs("span",{style:{...h,fontSize:11,color:"hsl(var(--mdt-muted-foreground))"},children:["text at −",t.ink]}):null]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsx("div",{style:{display:"grid",gap:6,minWidth:760,gridTemplateColumns:`repeat(${String(t.steps.length)}, minmax(0, 1fr))`},children:t.steps.map(n=>e.jsx(ie,{family:t.key,step:n,isInk:t.ink===n},n))})})]}),Re={title:"Foundation/Colors",parameters:{layout:"fullscreen",docs:{description:{component:["**Reference — Claude artifact:** [NextGen Colour Palette](https://claude.ai/code/artifact/db469b11-8470-4b45-9128-94b056cc168d), where the five added families, the job of every shade and the text shade per colour were settled. Open it for the reasoning behind the palette on this page.","","Twelve families, 141 shades. **Every swatch is read live from the running stylesheet**,","so this page cannot drift from the tokens it describes — which is how the page it","replaces went wrong. Click any swatch to copy its hex.","","Reach for a token, never a hex code: `hsl(var(--mdt-blue-60))`."].join(`
`)}}}},m={render:()=>e.jsxs("div",{style:f,children:[e.jsx(b,{lead:"Twelve families, 141 shades. Read live from the stylesheet, so nothing here can go stale. Click a swatch to copy its hex.",children:"Colour palette"}),v.map(t=>e.jsx(de,{family:t},t.key)),e.jsxs(k,{children:[e.jsx("b",{children:"The five category families"})," — indigo, teal, magenta, cyan and lime — carry no meaning on purpose, so a source chip or an avatar never reads as success, warning or danger. Their anchor shades are exactly the colours those chips already painted by hand, so nothing on screen moved when they landed."]})]})},u={render:()=>{var t;return e.jsxs("div",{style:f,children:[e.jsx(b,{lead:"Shown on Blue. Nothing here is a new colour — only a name for what each existing shade is good for.",children:"What each shade is for"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",width:"100%",minWidth:560,fontSize:13.5},children:[e.jsx("thead",{children:e.jsx("tr",{children:["","Step","Job","What you draw with it"].map(n=>e.jsx("th",{style:{textAlign:"left",fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"hsl(var(--mdt-muted-foreground))",padding:"0 14px 8px 0",borderBottom:"1px solid hsl(var(--mdt-border))"},children:n},n))})}),e.jsx("tbody",{children:(((t=v[5])==null?void 0:t.steps)??[]).map(n=>{const o=ee[n]??["—",""];return e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)"},children:e.jsx("span",{style:{display:"inline-block",width:34,height:22,borderRadius:5,background:p("blue",n),border:"1px solid hsl(var(--mdt-border))"}})}),e.jsx("td",{style:{...h,padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)",fontVariantNumeric:"tabular-nums"},children:x(n)}),e.jsx("td",{style:{padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)",fontWeight:600},children:o[0]}),e.jsx("td",{style:{padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)",color:"hsl(var(--mdt-muted-foreground))"},children:o[1]})]},n)})})]})})]})}},g={render:()=>e.jsxs("div",{style:f,children:[e.jsx(b,{lead:"Tint at −10, dot at −60, text at the family's own text shade. Every ratio is measured live.",children:"Text on a tint"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:14},children:v.filter(t=>t.ink!==null).map(t=>{const n=p(t.key,10),o=p(t.key,t.ink??80),r=p(t.key,60),s=J(o,n),a=s>=4.5;return e.jsxs("div",{style:{textAlign:"center"},children:[e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:6,padding:"4px 11px",borderRadius:6,fontSize:12.5,fontWeight:500,background:n,color:o},children:[e.jsx("span",{style:{width:6,height:6,borderRadius:999,background:r}}),t.name]}),e.jsxs("span",{style:{...h,display:"block",marginTop:4,fontSize:10.5,fontWeight:600,color:a?"hsl(var(--mdt-green-80))":"hsl(var(--mdt-red-70))"},children:[s.toFixed(2),":1"]}),e.jsxs("span",{style:{...h,display:"block",fontSize:9.5,color:"hsl(var(--mdt-muted-foreground))"},children:["−",t.ink]})]},t.key)})}),e.jsxs(k,{children:["Red reaches 4.5:1 at ",e.jsx("b",{children:"−70"}),". Blue, green, orange and most of the category families need"," ",e.jsx("b",{children:"−80"}),". Yellow and purple have to go all the way to ",e.jsx("b",{children:"−90"}),". Publishing one text shade per family is the only honest answer; a single number across the palette would fail on the bright hues."]})]})},y={render:()=>{const t=re(),n=te.map(o=>{const[r="",s=""]=o.token.split("-"),a=se(t,`--mdt-${o.token}`),d=a===""?p(r,Number(s)):a;return{token:o.token,library:d,console:o.console,apart:J(d,o.console)}}).sort((o,r)=>r.apart-o.apart);return e.jsxs("div",{style:f,children:[e.jsx(b,{lead:"Twenty-four token names paint one colour in this library and another in the console. Nothing on either side moves until each one is ruled on.",children:"Where the console and the library disagree"}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",width:"100%",minWidth:620,fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{children:["Token","This library","The console","Apart"].map(o=>e.jsx("th",{style:{textAlign:"left",fontSize:11,fontWeight:600,letterSpacing:".05em",textTransform:"uppercase",color:"hsl(var(--mdt-muted-foreground))",padding:"0 14px 8px 0",borderBottom:"1px solid hsl(var(--mdt-border))"},children:o},o))})}),e.jsx("tbody",{children:n.map(o=>e.jsxs("tr",{children:[e.jsx("td",{style:{...h,fontWeight:600,padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)"},children:o.token}),[["library",o.library],["console",o.console]].map(([r,s])=>e.jsxs("td",{style:{padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)"},children:[e.jsx("span",{style:{display:"inline-block",width:22,height:22,borderRadius:5,marginRight:8,verticalAlign:"middle",background:s,border:"1px solid hsl(var(--mdt-border))"}}),e.jsx("span",{style:{...h,fontSize:11.5},children:s})]},r)),e.jsxs("td",{style:{...h,fontWeight:600,fontVariantNumeric:"tabular-nums",padding:"9px 14px 9px 0",borderBottom:"1px solid hsl(var(--mdt-border) / 0.5)",color:o.apart>=1.4?"hsl(var(--mdt-red-70))":"hsl(var(--mdt-orange-80))"},children:[o.apart.toFixed(2),"×"]})]},o.token))})]})}),e.jsxs("p",{style:{marginTop:12,fontSize:12.5,color:"hsl(var(--mdt-muted-foreground))"},children:["Plus ",oe," more that differ only slightly — rounding and near-misses, but still two answers to the same name."]}),e.jsxs(k,{children:["Each of these is one of three things: ",e.jsx("b",{children:"the console is right"})," and this library should adopt its value; ",e.jsx("b",{children:"the library is right"})," and the console should drop its override; or"," ",e.jsx("b",{children:"both are right"})," and they are genuinely different colours that need different names. Purple is the loudest — the console’s is more than twice as dark as this one’s."]})]})}};var T,W,B,C,R;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div style={page}>
      <Title lead="Twelve families, 141 shades. Read live from the stylesheet, so nothing here can go stale. Click a swatch to copy its hex.">
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
}`,...(B=(W=m.parameters)==null?void 0:W.docs)==null?void 0:B.source},description:{story:`The whole palette, one family per row. Seven families were already here; five
were added on 10 Sep 2026 because our interface needed colours that carry no
meaning, and there was nothing to reach for — so they had been written by
hand into the chip code instead.

Click any swatch to copy its hex.`,...(R=(C=m.parameters)==null?void 0:C.docs)==null?void 0:R.description}}};var A,N,z,E,I;u.parameters={...u.parameters,docs:{...(A=u.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(z=(N=u.parameters)==null?void 0:N.docs)==null?void 0:z.source},description:{story:`A number on its own is not a system. Every rung has a job, so picking a shade
is a decision about what you are drawing rather than a guess at brightness.`,...(I=(E=u.parameters)==null?void 0:E.docs)==null?void 0:I.description}}};var F,M,H,P,L;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(H=(M=g.parameters)==null?void 0:M.docs)==null?void 0:H.source},description:{story:`Each family publishes its own text shade: the lightest step that still reads
at 4.5:1 on that family's own tint. It is not the same number everywhere,
because a bright hue cannot carry text at a middle shade.

The ratios below are measured on the page as it renders, not typed in.`,...(L=(P=g.parameters)==null?void 0:P.docs)==null?void 0:L.description}}};var D,$,G,O,V;y.parameters={...y.parameters,docs:{...(D=y.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(G=($=y.parameters)==null?void 0:$.docs)==null?void 0:G.source},description:{story:`One name, two colours. The console re-points a set of these tokens in light
mode, so the same token paints differently depending on which side of the
fence you are standing on.

This is not a bug to fix quietly — it is a decision, and it belongs to Nirav.

The library column and the distance are read live from the light stylesheet, so
they cannot go stale; the console column is typed in, because the console's
stylesheet is not loaded here. Both columns are light values, whichever theme is on.`,...(V=(O=y.parameters)==null?void 0:O.docs)==null?void 0:V.description}}};const Ae=["Palette","WhatEachShadeIsFor","TextOnATint","StillDisagreed"];export{m as Palette,y as StillDisagreed,g as TextOnATint,u as WhatEachShadeIsFor,Ae as __namedExportsOrder,Re as default};
//# sourceMappingURL=Colors.stories-DeqG_Pjj.js.map
