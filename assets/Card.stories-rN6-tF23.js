import{j as e}from"./iframe-Bcp0jvqN.js";import{C as d,a as n,b as r,c as k,d as Je,e as Qe,f as z}from"./Card-wv8YcA81.js";import{I as B}from"./IconTile-B5aj36U1.js";import{I as i}from"./Icon-LNs7tufD.js";import{B as N}from"./Badge-DYQucMwn.js";import{B as s}from"./Button-CaZaEUAI.js";import{I as Xe}from"./InfoTip-CvLf0R1T.js";import{P as Ze}from"./PickCard-B08sVsBW.js";import{K as Ue}from"./KpiCard-CXIMmyvE.js";import{M as et}from"./Switch-CMTv-LrM.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-D6_0qy-D.js";import"./index-CLaAAKUG.js";import"./index-ylFQZu3j.js";import"./index-WUDgSEXI.js";import"./index-ezZFqyJB.js";import"./index-DZfvXieZ.js";import"./index-B2kLQY2k.js";import"./index-FFzo61q-.js";import"./index-Cy_RCQl9.js";import"./index-DHgOOOee.js";import"./index-LZjNjoDe.js";import"./index-DWERMT9H.js";import"./index-CnFAbKJz.js";import"./index-DX3uDCTG.js";import"./index-DORIdboQ.js";import"./icon-at-drawn-size-eKXhrsG1.js";import"./selectableCardEdge-B-9AOtxl.js";import"./index-CuR4-aRN.js";import"./index-VWVfhYKn.js";const{fn:Ye}=__STORYBOOK_MODULE_TEST__,Ht={title:"New Components/Card",component:d,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A surface that holds related content in the page.","","**It does not open, close, float, or freeze the page behind it.** Those are Modal","and Popover, which borrow this surface and add their own behaviour on top. The","one-line test: if it *opens*, it is not a Card.","","| Prop | What it does |","| --- | --- |","| `surface` | borderless / filled / secondary / outline / elevated |","| `padding` | normal 20px / medium 16px / compact 14px / none |","","**One inset governs every part**, which is why the eyebrow, the heading, the body","text and the footer all start on the same vertical line.","","**The header is a region, not a label - so it carries a line.** Collapse a card and","the header is the whole card, so its edge has to be real. `plain` opts out, for the","rarer case where the title only names the rows directly beneath it.","","**Clickable and collapsible are separate components.** A control inside a control is","invalid and unreachable by keyboard, so `ClickableCard` and `CollapsibleCard` make","that combination impossible to write rather than merely discouraged.","","**A nested card is never the answer.** To group content inside a card, use a quiet","block with no border and no shadow of its own, so it reads as a section of that card","rather than a competing object.","","**The problem card, the org card and the module card at the end are this card**, with","different things inside, not components of their own. The pick card, the contact strip","and the KPI card sit with them, and are parts the library already has."].join(`
`)}}}},O=({children:t,cols:a=2})=>e.jsx("div",{className:"mdt-grid mdt-items-start mdt-gap-5",style:{gridTemplateColumns:`repeat(${String(a)}, minmax(0, 1fr))`},children:t}),C=()=>e.jsx("dl",{className:"mdt-m-0 mdt-flex mdt-flex-col mdt-gap-2",children:[["Hostname","dc-west-04"],["Owner","Network Ops"],["Warranty","14 Mar 2027"]].map(([t,a])=>e.jsxs("div",{className:"mdt-flex mdt-items-baseline mdt-justify-between mdt-gap-4",children:[e.jsx("dt",{className:"mdt-m-0 mdt-text-muted-foreground",children:t}),e.jsx("dd",{className:"mdt-m-0 mdt-font-semibold",children:a})]},t))}),tt=[{surface:"borderless",name:"Background only",says:"A tint with no border, for a block that should stand out without an edge.",warns:"A neutral pill is this same colour in light, so it melts in.",facts:[["Fill","neutral-20"],["Edge","None"],["Against the page","1.13 light, 1.32 dark"]]},{surface:"filled",name:"With border",says:"The default. Any section or list item on the page.",facts:[["Fill","card"],["Edge","1 px, neutral-20"],["Edge against page","1.13 light, 1.32 dark"]]},{surface:"secondary",name:"Secondary",says:"For a quiet block that should recede, like the Users drawer contact strip.",warns:"On a tinted area of the same colour it disappears.",facts:[["Fill","secondary"],["Edge","None"],["Against the page","1.05 light, 1.05 dark"]]},{surface:"outline",name:"Outline",says:"An edge and no fill, so a tinted area shows through. The org card uses it.",facts:[["Fill","None"],["Edge","1 px, neutral-20"]]},{surface:"elevated",name:"Elevated",says:"A shadow in place of an edge, for anything you pick up and move.",facts:[["Fill","card"],["Edge","None, a shadow, and a faint ring in dark"]]}],S=({surface:t,tinted:a})=>e.jsxs("div",{className:"mdt-flex mdt-min-w-0 mdt-flex-col mdt-gap-2","data-ground":a?"tinted":"page",children:[e.jsx("span",{className:"mdt-text-xs mdt-leading-4 mdt-text-neutral-60",children:a?"On a tinted area":"On the page"}),e.jsx("div",{className:["mdt-flex mdt-flex-1 mdt-flex-col mdt-justify-center mdt-rounded-[8px] mdt-border mdt-border-dashed mdt-border-neutral-40 mdt-p-4",a?"mdt-bg-secondary":"mdt-bg-background"].join(" "),children:e.jsx(d,{surface:t,children:e.jsx(n,{heading:"What it carries",supporting:"184 agents and 6 scans go through col-iad-01."})})})]}),m={render:()=>e.jsx("div",{className:"mdt-flex mdt-flex-col",children:tt.map(t=>e.jsxs("div",{"data-look":t.surface,className:"mdt-grid mdt-gap-x-5 mdt-gap-y-4 mdt-border-0 mdt-border-t mdt-border-solid mdt-border-neutral-20 mdt-py-5",style:{gridTemplateColumns:"minmax(0, 268px) minmax(0, 1fr) minmax(0, 1fr)"},children:[e.jsxs("div",{className:"mdt-min-w-0",children:[e.jsx("h3",{className:"mdt-m-0 mdt-text-sm mdt-font-semibold mdt-leading-5",children:t.name}),e.jsx("p",{className:"mdt-m-0 mdt-mt-1 mdt-text-[13px] mdt-leading-5 mdt-text-neutral-90",children:t.says}),t.warns?e.jsx("p",{className:"mdt-m-0 mdt-mt-2 mdt-text-[13px] mdt-leading-5 mdt-text-orange-80",children:t.warns}):null,e.jsx("dl",{className:"mdt-m-0 mdt-mt-2.5 mdt-grid mdt-gap-x-3 mdt-gap-y-0.5 mdt-text-xs mdt-leading-[18px]",style:{gridTemplateColumns:"auto minmax(0, 1fr)"},children:t.facts.map(([a,o])=>e.jsxs("div",{className:"mdt-contents",children:[e.jsx("dt",{className:"mdt-text-neutral-60",children:a}),e.jsx("dd",{className:"mdt-m-0 mdt-min-w-0",children:o})]},a))})]}),e.jsx(S,{surface:t.surface}),e.jsx(S,{surface:t.surface,tinted:!0})]},t.surface))})},l={render:()=>e.jsx("div",{className:"mdt-max-w-md",children:e.jsxs(d,{children:[e.jsx(n,{leading:e.jsx(B,{icon:e.jsx(i,{name:"server","aria-hidden":!0}),tone:"blue"}),heading:"Firewall rule update, DC-West",supporting:"Raised by Riya Kulkarni, 2 days ago"}),e.jsx(r,{children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-start mdt-gap-3",children:[e.jsx(N,{tone:"warning",children:"Awaiting CAB"}),e.jsx("p",{className:"mdt-m-0",children:"Nine rules affected across two clusters. Rollback plan attached and verified in staging."})]})}),e.jsx(k,{meta:"3 approvals needed",actions:e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"outline",size:"sm",children:"Details"}),e.jsx(s,{size:"sm",children:"Approve"})]})})]})})},c={render:()=>e.jsx("div",{className:"mdt-max-w-md",children:e.jsxs(d,{children:[e.jsx(Je,{children:e.jsx("div",{className:"mdt-h-32 mdt-w-full mdt-bg-gradient-to-br mdt-from-blue-70 mdt-to-purple-80"})}),e.jsx(n,{heading:"Firewall rule update, DC-West",supporting:"Nine rules affected across two clusters. Rollback plan attached and verified in staging."}),e.jsx(k,{meta:"3 approvals needed",actions:e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"outline",size:"sm",children:"Details"}),e.jsx(s,{size:"sm",children:"Approve"})]})})]})})},p={render:()=>e.jsxs(O,{cols:3,children:[e.jsxs(d,{children:[e.jsx(n,{heading:"Asset summary",supporting:"Dell PowerEdge R750, rack 12."}),e.jsx(r,{children:e.jsx(C,{})})]}),e.jsxs(d,{children:[e.jsx(n,{heading:"Asset summary",plain:!0}),e.jsx(r,{children:e.jsx(C,{})})]}),e.jsxs(d,{children:[e.jsx(n,{heading:"Asset summary",trailing:e.jsx(s,{variant:"ghost",size:"sm","aria-label":"More options",children:e.jsx(i,{name:"more-vertical",size:"sm","aria-hidden":!0})})}),e.jsx(r,{children:e.jsx(C,{})}),e.jsx(k,{meta:"Synced 4 min ago",actions:e.jsx(s,{variant:"outline",size:"sm",children:"Open asset"})})]})]})},at=[{padding:"normal",name:"Normal, 20",says:"The default."},{padding:"medium",name:"Medium, 16",says:"For cards that repeat in a stack."},{padding:"compact",name:"Compact, 14",says:"For long lists and narrow side areas."},{padding:"none",name:"None, 0",says:"For a table or image that must reach the edges."}],h={render:()=>e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:at.map(({padding:t,name:a,says:o})=>e.jsx(d,{padding:t,"data-inset":t,children:e.jsxs(r,{children:[e.jsx("span",{className:"mdt-block mdt-text-sm mdt-font-semibold mdt-leading-5",children:a}),e.jsx("span",{className:"mdt-block mdt-text-[13px] mdt-leading-5 mdt-text-neutral-90",children:o})]})},t))})},u={render:()=>e.jsx("div",{className:"mdt-max-w-sm",children:e.jsxs(d,{children:[e.jsx(n,{leading:e.jsx(B,{icon:e.jsx(i,{name:"shield-check","aria-hidden":!0}),tone:"green"}),heading:"Identity provider",supporting:"Checked 4 minutes ago"}),e.jsx(r,{children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-bg-secondary mdt-p-3",children:[e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground",children:"Last 30 days"}),[["Uptime","99.98%"],["Requests today","1.24M"]].map(([t,a])=>e.jsxs("div",{className:"mdt-flex mdt-items-baseline mdt-justify-between mdt-gap-4",children:[e.jsx("span",{className:"mdt-text-muted-foreground",children:t}),e.jsx("span",{className:"mdt-font-semibold",children:a})]},t))]})}),e.jsx(k,{actions:e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"outline",size:"sm",children:"Logs"}),e.jsx(s,{variant:"outline",size:"sm",children:"Configure"})]})})]})})},g={args:{onClick:Ye()},render:t=>e.jsx(O,{cols:1,children:[["INC-4468","VPN drops for remote staff","Network"],["INC-4469","Printer offline, 3rd floor","Hardware"],["INC-4470","SSO login loop after update","Identity"]].map(([a,o,$e])=>e.jsxs(Qe,{onClick:t.onClick,children:[e.jsx(n,{heading:o,supporting:a}),e.jsx(r,{children:e.jsx(N,{tone:"neutral",children:$e})})]},a))})},x={args:{onOpenChange:Ye()},render:t=>e.jsxs(O,{cols:1,children:[e.jsx(z,{header:{heading:"Related changes",supporting:"3 linked to this incident"},onOpenChange:t.onOpenChange,children:e.jsx(C,{})}),e.jsx(z,{defaultOpen:!0,header:{heading:"Related changes",supporting:"3 linked to this incident"},onOpenChange:t.onOpenChange,children:e.jsx(C,{})})]})},dt=["mdt-group mdt-relative mdt-box-border mdt-grid mdt-w-auto mdt-cursor-pointer mdt-grid-cols-[32px_minmax(0,1fr)_auto]","mdt-items-center mdt-gap-x-4 mdt-gap-y-3 -mdt-mx-2.5 mdt-rounded-[8px] mdt-border-0 mdt-bg-transparent","mdt-py-2.5 mdt-pl-2.5 mdt-pr-[18px] mdt-text-left mdt-font-[inherit] mdt-text-sm mdt-leading-normal mdt-text-foreground","hover:mdt-bg-accent focus-visible:mdt-bg-accent","focus-visible:mdt-outline focus-visible:mdt-outline-2 focus-visible:-mdt-outline-offset-2 focus-visible:mdt-outline-ring","before:[&+&]:mdt-absolute before:[&+&]:mdt-left-2.5 before:[&+&]:mdt-right-2.5 before:[&+&]:mdt-top-0 before:[&+&]:mdt-content-['']","before:[&+&]:mdt-border-0 before:[&+&]:mdt-border-t before:[&+&]:mdt-border-solid before:[&+&]:mdt-border-neutral-20","before:[&+&:hover]:mdt-border-transparent before:[&+&:focus-visible]:mdt-border-transparent","before:[&:hover+&]:mdt-border-transparent before:[&:focus-visible+&]:mdt-border-transparent"].join(" "),st=[["125","hosts with a crashing module","Metrics on 40 · Logs on 30 · Patch on 19"],["32","agents silent","18 silent for more than a day · the longest for 47h"],["26","agents holding data","Cannot reach the platform · 348,117 events waiting on the hosts"],["24","hosts over the agent's resource budget","CPU on 20 · memory on 22 · network on 6"]],f={render:()=>e.jsx("div",{className:"mdt-max-w-[436px]",children:e.jsxs(d,{"data-frame":"problem-card",children:[e.jsx(n,{plain:!0,heading:e.jsxs("span",{className:"mdt-inline-flex mdt-items-center mdt-gap-2",children:["Needs attention",e.jsx(Xe,{label:"What needs attention",children:"The worst problems in the fleet, worst first."})]})}),e.jsxs(r,{children:[e.jsx("div",{className:"mdt-flex mdt-flex-col",children:st.map(([t,a,o])=>e.jsxs("button",{type:"button",className:dt,"data-frame":"problem-row",children:[e.jsx(B,{size:"md",shape:"circle",tone:"amber","aria-label":"Warning",icon:e.jsx(i,{name:"alert-triangle",size:16})}),e.jsxs("span",{className:"mdt-flex mdt-min-w-0 mdt-flex-col",children:[e.jsxs("span",{className:"mdt-truncate mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-foreground",children:[e.jsx("span",{className:"mdt-font-semibold",children:t})," ",a]}),e.jsx("span",{className:"mdt-truncate mdt-text-xs mdt-leading-4 mdt-text-faint",children:o})]}),e.jsx("span",{"aria-hidden":"true",className:"mdt-whitespace-nowrap mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-neutral-90 mdt-underline mdt-underline-offset-[3px] mdt-opacity-0 group-hover:mdt-opacity-100 group-focus-visible:mdt-opacity-100",children:"View"})]},a))}),e.jsx(s,{variant:"outline",className:"mdt-mt-2.5 mdt-w-full","data-frame":"problem-all",children:"View all 7"})]})]})})},b={render:()=>e.jsx(d,{surface:"outline",padding:"none","data-frame":"org-card",children:e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3 mdt-p-2",children:[e.jsx("span",{"aria-hidden":"true",className:"mdt-grid mdt-h-10 mdt-w-10 mdt-flex-none mdt-place-items-center mdt-rounded-[10px]",style:{background:"hsl(var(--mdt-avatar-blue-fill))",color:"hsl(var(--mdt-avatar-blue-ink))"},children:e.jsx(i,{name:"building",size:20,"aria-hidden":!0})}),e.jsxs("span",{className:"mdt-flex mdt-min-w-0 mdt-flex-col",children:[e.jsx("span",{className:"mdt-text-sm mdt-font-medium",children:"MSP owner organization"}),e.jsx("span",{className:"mdt-mt-px mdt-text-xs mdt-leading-[1.5] mdt-text-faint",children:"Owned in the active frame; its access can still reach client organizations below."})]})]})})},w={name:"Pick card",render:()=>e.jsx(Ze,{icon:e.jsx(i,{name:"radio"}),title:"Via the collector mapped in its network zone",description:"Only through its zone's collector; waits if it is down","aria-label":"How it ships: via the collector mapped in its network zone. Change"})},I=({name:t,core:a})=>e.jsx(d,{padding:"medium","data-frame":"module-card",children:e.jsxs(r,{className:"mdt-grid mdt-items-center mdt-gap-x-4 mdt-gap-y-1.5",style:{gridTemplateColumns:"minmax(0, 1fr) 120px 168px 128px"},children:[e.jsxs("span",{className:"mdt-inline-flex mdt-min-w-0 mdt-items-center mdt-gap-2",children:[e.jsx("span",{className:"mdt-truncate mdt-text-sm mdt-font-medium mdt-leading-5 mdt-text-neutral-150",children:t}),a?e.jsx(N,{size:"sm",tone:"neutral",shape:"square",children:"Core"}):null]}),e.jsx("span",{className:"mdt-inline-flex mdt-min-w-0 mdt-items-center",children:e.jsx(N,{size:"sm",tone:"success",dot:!0,children:"Healthy"})}),a?e.jsxs("span",{className:"-mdt-ml-1 mdt-inline-flex mdt-min-h-7 mdt-items-center mdt-gap-2 mdt-px-1 mdt-text-xs mdt-font-medium mdt-leading-4 mdt-text-neutral-70",children:[e.jsx(i,{name:"lock",size:14,"aria-hidden":!0}),"Always on"]}):e.jsxs("span",{className:"-mdt-ml-1 mdt-inline-flex mdt-min-h-7 mdt-items-center mdt-gap-2 mdt-px-1 mdt-text-xs mdt-font-medium mdt-leading-4 mdt-text-neutral-90",children:[e.jsx(et,{size:"sm",defaultChecked:!0,"aria-label":t}),"Enabled"]}),e.jsx("span",{className:"mdt-inline-flex mdt-justify-self-end",children:e.jsx(s,{variant:"ghost",size:"sm",rightIcon:e.jsx(i,{name:"arrow-right",size:16,"aria-hidden":!0}),children:"View details"})})]})}),y={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx(I,{name:"Metrics",core:!0}),e.jsx(I,{name:"Patch"})]})},v={render:()=>e.jsx(Ue,{style:{width:"100%",background:"hsl(var(--mdt-secondary))",border:"none"},items:[{label:"Email",value:e.jsx("span",{className:"mdt-block mdt-min-w-0 mdt-truncate mdt-text-[13px] mdt-leading-[1.5]",children:"sarah.johnson@acme.com"})},{label:"Phone number",value:e.jsx("span",{className:"mdt-block mdt-min-w-0 mdt-truncate mdt-text-[13px] mdt-leading-[1.5]",children:"+1 415 555 0142"})}]})},j={name:"KPI card",render:()=>e.jsx(Ue,{label:"Agents sending data",value:"2,102",hint:"of 2,134"})};var T,P,A,R,M;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col">
      {LOOKS.map(look => <div key={look.surface} data-look={look.surface} className="mdt-grid mdt-gap-x-5 mdt-gap-y-4 mdt-border-0 mdt-border-t mdt-border-solid mdt-border-neutral-20 mdt-py-5" style={{
      gridTemplateColumns: 'minmax(0, 268px) minmax(0, 1fr) minmax(0, 1fr)'
    }}>
          <div className="mdt-min-w-0">
            <h3 className="mdt-m-0 mdt-text-sm mdt-font-semibold mdt-leading-5">{look.name}</h3>
            <p className="mdt-m-0 mdt-mt-1 mdt-text-[13px] mdt-leading-5 mdt-text-neutral-90">
              {look.says}
            </p>
            {look.warns ? <p className="mdt-m-0 mdt-mt-2 mdt-text-[13px] mdt-leading-5 mdt-text-orange-80">
                {look.warns}
              </p> : null}
            <dl className="mdt-m-0 mdt-mt-2.5 mdt-grid mdt-gap-x-3 mdt-gap-y-0.5 mdt-text-xs mdt-leading-[18px]" style={{
          gridTemplateColumns: 'auto minmax(0, 1fr)'
        }}>
              {look.facts.map(([k, v]) => <div key={k} className="mdt-contents">
                  <dt className="mdt-text-neutral-60">{k}</dt>
                  <dd className="mdt-m-0 mdt-min-w-0">{v}</dd>
                </div>)}
            </dl>
          </div>
          <Ground surface={look.surface} />
          <Ground surface={look.surface} tinted />
        </div>)}
    </div>
}`,...(A=(P=m.parameters)==null?void 0:P.docs)==null?void 0:A.source},description:{story:"One row per look, the same card on both grounds. Only the surface changes: the corner and the inset do not.",...(M=(R=m.parameters)==null?void 0:R.docs)==null?void 0:M.description}}};var F,H,E,W,K;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div className="mdt-max-w-md">
      <Card>
        <CardHeader leading={<IconTile icon={<Icon name="server" aria-hidden />} tone="blue" />} heading="Firewall rule update, DC-West" supporting="Raised by Riya Kulkarni, 2 days ago" />
        <CardBody>
          {/* items-start, or the badge stretches to the column's full width */}
          <div className="mdt-flex mdt-flex-col mdt-items-start mdt-gap-3">
            <Badge tone="warning">Awaiting CAB</Badge>
            <p className="mdt-m-0">
              Nine rules affected across two clusters. Rollback plan attached and verified in
              staging.
            </p>
          </div>
        </CardBody>
        <CardFooter meta="3 approvals needed" actions={<>
              <Button variant="outline" size="sm">
                Details
              </Button>
              <Button size="sm">Approve</Button>
            </>} />
      </Card>
    </div>
}`,...(E=(H=l.parameters)==null?void 0:H.docs)==null?void 0:E.source},description:{story:`Header, body and footer. Three regions, so two lines: each one marks where a
region ends and the next begins.`,...(K=(W=l.parameters)==null?void 0:W.docs)==null?void 0:K.description}}};var L,D,G,V,_;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="mdt-max-w-md">
      <Card>
        <CardMedia>
          <div className="mdt-h-32 mdt-w-full mdt-bg-gradient-to-br mdt-from-blue-70 mdt-to-purple-80" />
        </CardMedia>
        <CardHeader heading="Firewall rule update, DC-West" supporting="Nine rules affected across two clusters. Rollback plan attached and verified in staging." />
        <CardFooter meta="3 approvals needed" actions={<>
              <Button variant="outline" size="sm">
                Details
              </Button>
              <Button size="sm">Approve</Button>
            </>} />
      </Card>
    </div>
}`,...(G=(D=c.parameters)==null?void 0:D.docs)==null?void 0:G.source},description:{story:`**Media and the block under it are one unit.** The image already separates the
top of the card, so the header after it drops its line automatically. Without
that you get four stacked bands and the card reads as a stack of strips.

There is nothing to remember and no prop to set: the four-band version cannot
be built by accident.`,...(_=(V=c.parameters)==null?void 0:V.docs)==null?void 0:_.description}}};var q,U,Y,$,J;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <Grid cols={3}>
      <Card>
        <CardHeader heading="Asset summary" supporting="Dell PowerEdge R750, rack 12." />
        <CardBody>
          <Rows />
        </CardBody>
      </Card>
      <Card>
        <CardHeader heading="Asset summary" plain />
        <CardBody>
          <Rows />
        </CardBody>
      </Card>
      <Card>
        <CardHeader heading="Asset summary" trailing={<Button variant="ghost" size="sm" aria-label="More options">
              <Icon name="more-vertical" size="sm" aria-hidden />
            </Button>} />
        <CardBody>
          <Rows />
        </CardBody>
        <CardFooter meta="Synced 4 min ago" actions={<Button variant="outline" size="sm">
              Open asset
            </Button>} />
      </Card>
    </Grid>
}`,...(Y=(U=p.parameters)==null?void 0:U.docs)==null?void 0:Y.source},description:{story:"The header is a region, not a label, so the line is on by default. `plain` is\nthe opt-out, for a title that only names the rows directly beneath it.",...(J=($=p.parameters)==null?void 0:$.docs)==null?void 0:J.description}}};var Q,X,Z,ee,te;h.parameters={...h.parameters,docs:{...(Q=h.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-2">
      {INSETS.map(({
      padding,
      name,
      says
    }) => <Card key={padding} padding={padding} data-inset={padding}>
          <CardBody>
            <span className="mdt-block mdt-text-sm mdt-font-semibold mdt-leading-5">{name}</span>
            <span className="mdt-block mdt-text-[13px] mdt-leading-5 mdt-text-neutral-90">
              {says}
            </span>
          </CardBody>
        </Card>)}
    </div>
}`,...(Z=(X=h.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:"One setting moves the header, body and footer together, so everything starts on the same line.",...(te=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:te.description}}};var ae,de,se,ne,re;u.parameters={...u.parameters,docs:{...(ae=u.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <div className="mdt-max-w-sm">
      <Card>
        <CardHeader leading={<IconTile icon={<Icon name="shield-check" aria-hidden />} tone="green" />} heading="Identity provider" supporting="Checked 4 minutes ago" />
        <CardBody>
          <div className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-bg-secondary mdt-p-3">
            <p className="mdt-m-0 mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground">
              Last 30 days
            </p>
            {[['Uptime', '99.98%'], ['Requests today', '1.24M']].map(([k, v]) => <div key={k} className="mdt-flex mdt-items-baseline mdt-justify-between mdt-gap-4">
                <span className="mdt-text-muted-foreground">{k}</span>
                <span className="mdt-font-semibold">{v}</span>
              </div>)}
          </div>
        </CardBody>
        <CardFooter actions={<>
              <Button variant="outline" size="sm">
                Logs
              </Button>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </>} />
      </Card>
    </div>
}`,...(se=(de=u.parameters)==null?void 0:de.docs)==null?void 0:se.source},description:{story:`To group content inside a card, use a quiet block, **not a nested card.** A
nested card brings its own edge and competes with its parent.`,...(re=(ne=u.parameters)==null?void 0:ne.docs)==null?void 0:re.description}}};var ie,oe,me,le,ce;g.parameters={...g.parameters,docs:{...(ie=g.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    onClick: fn()
  } as never,
  render: args => <Grid cols={1}>
      {[['INC-4468', 'VPN drops for remote staff', 'Network'], ['INC-4469', 'Printer offline, 3rd floor', 'Hardware'], ['INC-4470', 'SSO login loop after update', 'Identity']].map(([id, title, team]) => <ClickableCard key={id} onClick={(args as {
      onClick?: () => void;
    }).onClick}>
          <CardHeader heading={title} supporting={id} />
          <CardBody>
            <Badge tone="neutral">{team}</Badge>
          </CardBody>
        </ClickableCard>)}
    </Grid>
}`,...(me=(oe=g.parameters)==null?void 0:oe.docs)==null?void 0:me.source},description:{story:`The whole card is one target. **It cannot contain buttons.** That is why it is
its own component rather than a switch.`,...(ce=(le=g.parameters)==null?void 0:le.docs)==null?void 0:ce.description}}};var pe,he,ue,ge,xe;x.parameters={...x.parameters,docs:{...(pe=x.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    onOpenChange: fn()
  } as never,
  render: args =>
  // Stacked, not side by side: a shut card is 79px and an open one is 199px,
  // so putting them in a row leaves a dead strip beside the shut one.
  <Grid cols={1}>
      <CollapsibleCard header={{
      heading: 'Related changes',
      supporting: '3 linked to this incident'
    }} onOpenChange={(args as {
      onOpenChange?: (o: boolean) => void;
    }).onOpenChange}>
        <Rows />
      </CollapsibleCard>
      <CollapsibleCard defaultOpen header={{
      heading: 'Related changes',
      supporting: '3 linked to this incident'
    }} onOpenChange={(args as {
      onOpenChange?: (o: boolean) => void;
    }).onOpenChange}>
        <Rows />
      </CollapsibleCard>
    </Grid>
}`,...(ue=(he=x.parameters)==null?void 0:he.docs)==null?void 0:ue.source},description:{story:`The header **is** the control. Collapsed, the header is the whole card, and its
line drops because there is nothing left underneath for it to divide. The header
is 16 top and bottom in both states, so a shut card's words sit in its middle and
the title does not move when it opens.`,...(xe=(ge=x.parameters)==null?void 0:ge.docs)==null?void 0:xe.description}}};var fe,be,we,ye,ve;f.parameters={...f.parameters,docs:{...(fe=f.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => <div className="mdt-max-w-[436px]">
      <Card data-frame="problem-card">
        <CardHeader plain heading={<span className="mdt-inline-flex mdt-items-center mdt-gap-2">
              Needs attention
              <InfoTip label="What needs attention">
                The worst problems in the fleet, worst first.
              </InfoTip>
            </span>} />
        <CardBody>
          <div className="mdt-flex mdt-flex-col">
            {PROBLEMS.map(([count, title, detail]) => <button key={title} type="button" className={ROW} data-frame="problem-row">
                <IconTile size="md" shape="circle" tone="amber" aria-label="Warning" icon={<Icon name="alert-triangle" size={16} />} />
                <span className="mdt-flex mdt-min-w-0 mdt-flex-col">
                  <span className="mdt-truncate mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-foreground">
                    <span className="mdt-font-semibold">{count}</span> {title}
                  </span>
                  <span className="mdt-truncate mdt-text-xs mdt-leading-4 mdt-text-faint">
                    {detail}
                  </span>
                </span>
                <span aria-hidden="true" className="mdt-whitespace-nowrap mdt-text-[13px] mdt-font-medium mdt-leading-5 mdt-text-neutral-90 mdt-underline mdt-underline-offset-[3px] mdt-opacity-0 group-hover:mdt-opacity-100 group-focus-visible:mdt-opacity-100">
                  View
                </span>
              </button>)}
          </div>
          <Button variant="outline" className="mdt-mt-2.5 mdt-w-full" data-frame="problem-all">
            View all 7
          </Button>
        </CardBody>
      </Card>
    </div>
}`,...(we=(be=f.parameters)==null?void 0:be.docs)==null?void 0:we.source},description:{story:`Health's Needs attention, in both fleets: **With border**, a plain header, then rows. A row is one button: a round
32 tile tinted by its level (rose, amber, blue), a title with its count in 600, one detail line, and View on hover.`,...(ve=(ye=f.parameters)==null?void 0:ye.docs)==null?void 0:ve.description}}};var je,Ce,Ne,ke,Be;b.parameters={...b.parameters,docs:{...(je=b.parameters)==null?void 0:je.docs,source:{originalSource:`{
  render: () => <Card surface="outline" padding="none" data-frame="org-card">
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-p-2">
        <span aria-hidden="true" className="mdt-grid mdt-h-10 mdt-w-10 mdt-flex-none mdt-place-items-center mdt-rounded-[10px]" style={{
        background: 'hsl(var(--mdt-avatar-blue-fill))',
        color: 'hsl(var(--mdt-avatar-blue-ink))'
      }}>
          <Icon name="building" size={20} aria-hidden />
        </span>
        <span className="mdt-flex mdt-min-w-0 mdt-flex-col">
          <span className="mdt-text-sm mdt-font-medium">MSP owner organization</span>
          <span className="mdt-mt-px mdt-text-xs mdt-leading-[1.5] mdt-text-faint">
            Owned in the active frame; its access can still reach client organizations below.
          </span>
        </span>
      </div>
    </Card>
}`,...(Ne=(Ce=b.parameters)==null?void 0:Ce.docs)==null?void 0:Ne.source},description:{story:"Says which organization a thing belongs to: **Outline**, 8 in, a 40 blue tile, the name, one line under it.",...(Be=(ke=b.parameters)==null?void 0:ke.docs)==null?void 0:Be.description}}};var Oe,ze,Se,Ie,Te;w.parameters={...w.parameters,docs:{...(Oe=w.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  name: 'Pick card',
  render: () => <PickCard icon={<Icon name="radio" />} title="Via the collector mapped in its network zone" description="Only through its zone's collector; waits if it is down" aria-label="How it ships: via the collector mapped in its network zone. Change" />
}`,...(Se=(ze=w.parameters)==null?void 0:ze.docs)==null?void 0:Se.source},description:{story:"A choice already made, with Change on hover. It is the library's own PickCard, so it is reused here, not redrawn.",...(Te=(Ie=w.parameters)==null?void 0:Ie.docs)==null?void 0:Te.description}}};var Pe,Ae,Re,Me,Fe;y.parameters={...y.parameters,docs:{...(Pe=y.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-2">
      <ModuleRow name="Metrics" core />
      <ModuleRow name="Patch" />
    </div>
}`,...(Re=(Ae=y.parameters)==null?void 0:Ae.docs)==null?void 0:Re.source},description:{story:"One module in a stack, 8 apart: **With border** at the 16 inset, its name, health, its switch or lock, and a door.",...(Fe=(Me=y.parameters)==null?void 0:Me.docs)==null?void 0:Fe.description}}};var He,Ee,We,Ke,Le;v.parameters={...v.parameters,docs:{...(He=v.parameters)==null?void 0:He.docs,source:{originalSource:`{
  render: () => <KpiCard style={{
    width: '100%',
    background: 'hsl(var(--mdt-secondary))',
    border: 'none'
  }} items={[{
    label: 'Email',
    value: <span className="mdt-block mdt-min-w-0 mdt-truncate mdt-text-[13px] mdt-leading-[1.5]">
              sarah.johnson@acme.com
            </span>
  }, {
    label: 'Phone number',
    value: <span className="mdt-block mdt-min-w-0 mdt-truncate mdt-text-[13px] mdt-leading-[1.5]">
              +1 415 555 0142
            </span>
  }]} />
}`,...(We=(Ee=v.parameters)==null?void 0:Ee.docs)==null?void 0:We.source},description:{story:"The Users drawer's contact strip, where the Secondary colour came from. It is the library's KPI group, with no edge.",...(Le=(Ke=v.parameters)==null?void 0:Ke.docs)==null?void 0:Le.description}}};var De,Ge,Ve,_e,qe;j.parameters={...j.parameters,docs:{...(De=j.parameters)==null?void 0:De.docs,source:{originalSource:`{
  name: 'KPI card',
  render: () => <KpiCard label="Agents sending data" value="2,102" hint="of 2,134" />
}`,...(Ve=(Ge=j.parameters)==null?void 0:Ge.docs)==null?void 0:Ve.source},description:{story:"A figure with its label. It stays its own library part, because it also carries charts and a verdict chip.",...(qe=(_e=j.parameters)==null?void 0:_e.docs)==null?void 0:qe.description}}};const Et=["Surfaces","HeaderBodyFooter","WithMedia","TheHeaderLine","Padding","AnInsetPanel","Clickable","Collapsible","ProblemCard","OrgCard","PickCardLook","ModuleCard","ContactStrip","KpiFigure"];export{u as AnInsetPanel,g as Clickable,x as Collapsible,v as ContactStrip,l as HeaderBodyFooter,j as KpiFigure,y as ModuleCard,b as OrgCard,h as Padding,w as PickCardLook,f as ProblemCard,m as Surfaces,p as TheHeaderLine,c as WithMedia,Et as __namedExportsOrder,Ht as default};
//# sourceMappingURL=Card.stories-rN6-tF23.js.map
