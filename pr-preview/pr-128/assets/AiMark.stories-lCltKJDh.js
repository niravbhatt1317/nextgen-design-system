import{j as e}from"./iframe-CZ2srKnX.js";import{A as t}from"./AiMark-RY-BTCBD.js";import{C as b}from"./Callout-DaUuLpqY.js";import{B as z}from"./ButtonOld-D9rFwEe1.js";import{B as N}from"./Badge-NpqDSc2l.js";import{I as l}from"./Icon-C1fTGf7Q.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./index-ChEho857.js";import"./index-DWdCQnya.js";const E={title:"Deprecated/AiMark",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'The gradient mark that means "this is AI".\n\n**A mark, not an icon.** Every `<Icon>` in this library is one stroke in\n`currentColor`, which is what lets the system size, tint and audit all 1209\nof them the same way. This is three colours sweeping across itself and\nanswers to none of that — tinting it would destroy the thing that makes it\nrecognisable. Lucide is the only *icon* source; a brand mark is the same\nexception the seventeen kept logos are.\n\nThe gradient is a token — `--mdt-ai-gradient-from`, `-via`, `-to` and\n`-via-position`. Both marks the design owner supplied carried the same ramp,\nwhich is what made it a pattern worth saving rather than two one-off fills.'}}}},n={},a=({label:s,children:w})=>e.jsxs("div",{className:"mdt-flex mdt-w-28 mdt-flex-col mdt-items-center mdt-gap-2",children:[e.jsx("div",{className:"mdt-flex mdt-h-10 mdt-items-center",children:w}),e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:s})]}),i={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-8",children:[e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsx(a,{label:"spark · solid",children:e.jsx(t,{size:"xl"})}),e.jsx(a,{label:"spark · line",children:e.jsx(t,{size:"xl",appearance:"line"})}),e.jsx(a,{label:"trio · solid",children:e.jsx(t,{size:"xl",variant:"trio"})}),e.jsx(a,{label:"trio · line",children:e.jsx(t,{size:"xl",variant:"trio",appearance:"line"})})]}),e.jsx("div",{className:"mdt-flex mdt-items-end mdt-gap-4",children:["xs","sm","md","lg","xl"].map(s=>e.jsx(a,{label:s,children:e.jsx(t,{size:s})},s))})]})},r={render:()=>e.jsxs("div",{className:"mdt-flex mdt-w-[30rem] mdt-flex-col mdt-gap-6",children:[e.jsx(b,{tone:"ai",title:"Summarised by AI",icon:e.jsx(t,{size:"sm"}),children:"Three of the twelve tickets in this view mention the same failing job."}),e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3",children:[e.jsx(z,{variant:"ai",leftIcon:e.jsx(t,{size:"sm"}),children:"Ask AI"}),e.jsxs(N,{tone:"neutral",shape:"pill",children:[e.jsx(t,{size:"xs",className:"mdt-mr-1"}),"Generated"]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-border mdt-p-3",children:[e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"In a row of Lucide icons — the line mark matches the weight"}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-4",children:[e.jsx(l,{name:"search",size:"sm"}),e.jsx(l,{name:"filter",size:"sm"}),e.jsx(t,{size:"sm",appearance:"line"}),e.jsx(l,{name:"settings",size:"sm"})]})]})]})};var d,m,o;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(o=(m=n.parameters)==null?void 0:m.docs)==null?void 0:o.source}}};var c,p,h,x,f;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-8">
      <div className="mdt-flex mdt-gap-4">
        <Cell label="spark · solid">
          <AiMark size="xl" />
        </Cell>
        <Cell label="spark · line">
          <AiMark size="xl" appearance="line" />
        </Cell>
        <Cell label="trio · solid">
          <AiMark size="xl" variant="trio" />
        </Cell>
        <Cell label="trio · line">
          <AiMark size="xl" variant="trio" appearance="line" />
        </Cell>
      </div>

      <div className="mdt-flex mdt-items-end mdt-gap-4">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => <Cell key={size} label={size}>
            <AiMark size={size} />
          </Cell>)}
      </div>
    </div>
}`,...(h=(p=i.parameters)==null?void 0:p.docs)==null?void 0:h.source},description:{story:`Two marks, each filled or drawn as a line.

\`spark\` is the general one. \`trio\` is three stars at a third of the strength
— a texture rather than a glyph.

The line versions stroke the same outline at **1px on the 16px box**, not
Lucide's 2. Lucide draws on a 24px box, so 2 there is 1.33 here, and these
stars have concave curves that close up before a Lucide icon's would — at
1.33 the small star in \`spark\` filled in.`,...(f=(x=i.parameters)==null?void 0:x.docs)==null?void 0:f.description}}};var u,g,v,k,j;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-w-[30rem] mdt-flex-col mdt-gap-6">
      <Callout tone="ai" title="Summarised by AI" icon={<AiMark size="sm" />}>
        Three of the twelve tickets in this view mention the same failing job.
      </Callout>

      <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3">
        <Button variant="ai" leftIcon={<AiMark size="sm" />}>
          Ask AI
        </Button>
        <Badge tone="neutral" shape="pill">
          <AiMark size="xs" className="mdt-mr-1" />
          Generated
        </Badge>
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-border mdt-p-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">
          In a row of Lucide icons — the line mark matches the weight
        </p>
        <div className="mdt-flex mdt-items-center mdt-gap-4">
          <Icon name="search" size="sm" />
          <Icon name="filter" size="sm" />
          <AiMark size="sm" appearance="line" />
          <Icon name="settings" size="sm" />
        </div>
      </div>
    </div>
}`,...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.source},description:{story:"Where it goes.\n\nBeside a Lucide icon, `line` is the one that matches — a solid mark in a row\nof outlines reads as a different weight of thing. On its own, or as the tone\nglyph of an `ai` callout, `solid` carries better at 16px.",...(j=(k=r.parameters)==null?void 0:k.docs)==null?void 0:j.description}}};const O=["Default","Marks","InUse"];export{n as Default,r as InUse,i as Marks,O as __namedExportsOrder,E as default};
//# sourceMappingURL=AiMark.stories-lCltKJDh.js.map
