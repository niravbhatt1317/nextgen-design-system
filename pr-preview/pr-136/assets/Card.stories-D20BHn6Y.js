import{j as e}from"./iframe-3aDErp2w.js";import{C as a,a as r,b as n,c as x,d as de,e as pe,f as b}from"./Card-3yjYZjIk.js";import"./index-DkSUl2wM.js";import"./index-BgugIDqY.js";import"./index-DXf-30mB.js";import{I as oe}from"./IconTile-BpxP7e1L.js";import{I as f}from"./Icon-y-zWa_Ic.js";import{B as ie}from"./Badge-DpoFXxTL.js";import{B as d}from"./Button-Bf3_7zSS.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";const{fn:le}=__STORYBOOK_MODULE_TEST__,Be={title:"Components/Card",component:a,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["A surface that holds related content in the page.","","**It does not open, close, float, or freeze the page behind it.** Those are Modal","and Popover, which borrow this surface and add their own behaviour on top. The","one-line test: if it *opens*, it is not a Card.","","| Prop | What it does |","| --- | --- |","| `surface` | filled / secondary / outline / elevated |","| `padding` | normal 20px / compact 14px / none |","","**One inset governs every part**, which is why the eyebrow, the heading, the body","text and the footer all start on the same vertical line.","","**The header is a region, not a label - so it carries a line.** Collapse a card and","the header is the whole card, so its edge has to be real. `plain` opts out, for the","rarer case where the title only names the rows directly beneath it.","","**Clickable and collapsible are separate components.** A control inside a control is","invalid and unreachable by keyboard, so `ClickableCard` and `CollapsibleCard` make","that combination impossible to write rather than merely discouraged.","","**A nested card is never the answer.** To group content inside a card, use a quiet","block with no border and no shadow of its own, so it reads as a section of that card","rather than a competing object."].join(`
`)}}}},C=({children:t,cols:s=2})=>e.jsx("div",{className:"mdt-grid mdt-items-start mdt-gap-5",style:{gridTemplateColumns:`repeat(${String(s)}, minmax(0, 1fr))`},children:t}),u=()=>e.jsx("dl",{className:"mdt-m-0 mdt-flex mdt-flex-col mdt-gap-2",children:[["Hostname","dc-west-04"],["Owner","Network Ops"],["Warranty","14 Mar 2027"]].map(([t,s])=>e.jsxs("div",{className:"mdt-flex mdt-items-baseline mdt-justify-between mdt-gap-4",children:[e.jsx("dt",{className:"mdt-m-0 mdt-text-muted-foreground",children:t}),e.jsx("dd",{className:"mdt-m-0 mdt-font-semibold",children:s})]},t))}),o={render:()=>e.jsxs(C,{children:[e.jsxs(a,{children:[e.jsx(r,{heading:"Filled",supporting:"The default. White on white, so the border is the only thing giving it a shape."}),e.jsx(n,{children:"Contrast against the page: 1.00. Its border cannot be removed."})]}),e.jsxs(a,{surface:"secondary",children:[e.jsx(r,{heading:"Secondary",supporting:"A quiet block inside a busier area. The fill does the work."}),e.jsx(n,{children:"1.14 light, 1.26 dark, so it needs no border at all."})]}),e.jsxs(a,{surface:"outline",children:[e.jsx(r,{heading:"Outline",supporting:"Border only, no fill. It sits on whatever colour is behind it."}),e.jsx(n,{children:"For an already-tinted area, where a white card looks like a patch."})]}),e.jsxs(a,{surface:"elevated",children:[e.jsx(r,{heading:"Elevated",supporting:"A shadow instead of a border, for anything you pick up and move."}),e.jsx(n,{children:"In dark it lifts by making the surface lighter, not the shadow darker."})]})]})},i={render:()=>e.jsx("div",{className:"mdt-max-w-md",children:e.jsxs(a,{children:[e.jsx(r,{leading:e.jsx(oe,{icon:e.jsx(f,{name:"server","aria-hidden":!0}),tone:"blue"}),heading:"Firewall rule update, DC-West",supporting:"Raised by Riya Kulkarni, 2 days ago"}),e.jsx(n,{children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-start mdt-gap-3",children:[e.jsx(ie,{tone:"warning",children:"Awaiting CAB"}),e.jsx("p",{className:"mdt-m-0",children:"Nine rules affected across two clusters. Rollback plan attached and verified in staging."})]})}),e.jsx(x,{meta:"3 approvals needed",actions:e.jsxs(e.Fragment,{children:[e.jsx(d,{variant:"outline",size:"sm",children:"Details"}),e.jsx(d,{size:"sm",children:"Approve"})]})})]})})},l={render:()=>e.jsx("div",{className:"mdt-max-w-md",children:e.jsxs(a,{children:[e.jsx(de,{children:e.jsx("div",{className:"mdt-h-32 mdt-w-full mdt-bg-gradient-to-br mdt-from-blue-70 mdt-to-purple-80"})}),e.jsx(r,{heading:"Firewall rule update, DC-West",supporting:"Nine rules affected across two clusters. Rollback plan attached and verified in staging."}),e.jsx(x,{meta:"3 approvals needed",actions:e.jsxs(e.Fragment,{children:[e.jsx(d,{variant:"outline",size:"sm",children:"Details"}),e.jsx(d,{size:"sm",children:"Approve"})]})})]})})},c={render:()=>e.jsxs(C,{cols:3,children:[e.jsxs(a,{children:[e.jsx(r,{heading:"Asset summary",supporting:"Dell PowerEdge R750, rack 12."}),e.jsx(n,{children:e.jsx(u,{})})]}),e.jsxs(a,{children:[e.jsx(r,{heading:"Asset summary",plain:!0}),e.jsx(n,{children:e.jsx(u,{})})]}),e.jsxs(a,{children:[e.jsx(r,{heading:"Asset summary",trailing:e.jsx(d,{variant:"ghost",size:"sm","aria-label":"More options",children:e.jsx(f,{name:"more-vertical",size:"sm","aria-hidden":!0})})}),e.jsx(n,{children:e.jsx(u,{})}),e.jsx(x,{meta:"Synced 4 min ago",actions:e.jsx(d,{variant:"outline",size:"sm",children:"Open asset"})})]})]})},m={render:()=>e.jsxs(C,{cols:3,children:[e.jsx(a,{children:e.jsx(r,{heading:"Payment gateway",supporting:"normal, 20px, the default."})}),e.jsx(a,{padding:"compact",children:e.jsx(r,{heading:"Payment gateway",supporting:"compact, 14px, for dense lists."})}),e.jsx(a,{padding:"none",children:e.jsx(de,{children:e.jsx("div",{className:"mdt-h-24 mdt-w-full mdt-bg-gradient-to-br mdt-from-green-70 mdt-to-blue-70"})})})]})},p={render:()=>e.jsx("div",{className:"mdt-max-w-sm",children:e.jsxs(a,{children:[e.jsx(r,{leading:e.jsx(oe,{icon:e.jsx(f,{name:"shield-check","aria-hidden":!0}),tone:"green"}),heading:"Identity provider",supporting:"Checked 4 minutes ago"}),e.jsx(n,{children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-bg-secondary mdt-p-3",children:[e.jsx("p",{className:"mdt-m-0 mdt-text-xs mdt-font-semibold mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground",children:"Last 30 days"}),[["Uptime","99.98%"],["Requests today","1.24M"]].map(([t,s])=>e.jsxs("div",{className:"mdt-flex mdt-items-baseline mdt-justify-between mdt-gap-4",children:[e.jsx("span",{className:"mdt-text-muted-foreground",children:t}),e.jsx("span",{className:"mdt-font-semibold",children:s})]},t))]})}),e.jsx(x,{actions:e.jsxs(e.Fragment,{children:[e.jsx(d,{variant:"outline",size:"sm",children:"Logs"}),e.jsx(d,{variant:"outline",size:"sm",children:"Configure"})]})})]})})},h={args:{onClick:le()},render:t=>e.jsx(C,{cols:3,children:[["INC-4468","VPN drops for remote staff","Network"],["INC-4469","Printer offline, 3rd floor","Hardware"],["INC-4470","SSO login loop after update","Identity"]].map(([s,ce,me])=>e.jsxs(pe,{onClick:t.onClick,children:[e.jsx(r,{heading:ce,supporting:s}),e.jsx(n,{children:e.jsx(ie,{tone:"neutral",children:me})})]},s))})},g={args:{onOpenChange:le()},render:t=>e.jsxs(C,{cols:1,children:[e.jsx(b,{header:{heading:"Related changes",supporting:"3 linked to this incident"},onOpenChange:t.onOpenChange,children:e.jsx(u,{})}),e.jsx(b,{defaultOpen:!0,header:{heading:"Related changes",supporting:"3 linked to this incident"},onOpenChange:t.onOpenChange,children:e.jsx(u,{})})]})};var y,j,w,v,k;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Grid>
      <Card>
        <CardHeader heading="Filled" supporting="The default. White on white, so the border is the only thing giving it a shape." />
        <CardBody>Contrast against the page: 1.00. Its border cannot be removed.</CardBody>
      </Card>
      <Card surface="secondary">
        <CardHeader heading="Secondary" supporting="A quiet block inside a busier area. The fill does the work." />
        <CardBody>1.14 light, 1.26 dark, so it needs no border at all.</CardBody>
      </Card>
      <Card surface="outline">
        <CardHeader heading="Outline" supporting="Border only, no fill. It sits on whatever colour is behind it." />
        <CardBody>For an already-tinted area, where a white card looks like a patch.</CardBody>
      </Card>
      <Card surface="elevated">
        <CardHeader heading="Elevated" supporting="A shadow instead of a border, for anything you pick up and move." />
        <CardBody>In dark it lifts by making the surface lighter, not the shadow darker.</CardBody>
      </Card>
    </Grid>
}`,...(w=(j=o.parameters)==null?void 0:j.docs)==null?void 0:w.source},description:{story:"The four surfaces, on the page colour. A tinted panel flatters every border.",...(k=(v=o.parameters)==null?void 0:v.docs)==null?void 0:k.description}}};var B,N,I,O,T;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(I=(N=i.parameters)==null?void 0:N.docs)==null?void 0:I.source},description:{story:`Header, body and footer. Three regions, so two lines: each one marks where a
region ends and the next begins.`,...(T=(O=i.parameters)==null?void 0:O.docs)==null?void 0:T.description}}};var A,R,H,S,z;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(H=(R=l.parameters)==null?void 0:R.docs)==null?void 0:H.source},description:{story:`**Media and the block under it are one unit.** The image already separates the
top of the card, so the header after it drops its line automatically. Without
that you get four stacked bands and the card reads as a stack of strips.

There is nothing to remember and no prop to set: the four-band version cannot
be built by accident.`,...(z=(S=l.parameters)==null?void 0:S.docs)==null?void 0:z.description}}};var F,P,M,D,G;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(M=(P=c.parameters)==null?void 0:P.docs)==null?void 0:M.source},description:{story:"The header is a region, not a label, so the line is on by default. `plain` is\nthe opt-out, for a title that only names the rows directly beneath it.",...(G=(D=c.parameters)==null?void 0:D.docs)==null?void 0:G.description}}};var W,E,_,L,q;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <Grid cols={3}>
      <Card>
        <CardHeader heading="Payment gateway" supporting="normal, 20px, the default." />
      </Card>
      <Card padding="compact">
        <CardHeader heading="Payment gateway" supporting="compact, 14px, for dense lists." />
      </Card>
      <Card padding="none">
        <CardMedia>
          <div className="mdt-h-24 mdt-w-full mdt-bg-gradient-to-br mdt-from-green-70 mdt-to-blue-70" />
        </CardMedia>
      </Card>
    </Grid>
}`,...(_=(E=m.parameters)==null?void 0:E.docs)==null?void 0:_.source},description:{story:"20px, 14px, or none, for content that brings its own spacing.",...(q=(L=m.parameters)==null?void 0:L.docs)==null?void 0:q.description}}};var K,U,V,Y,$;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(V=(U=p.parameters)==null?void 0:U.docs)==null?void 0:V.source},description:{story:`To group content inside a card, use a quiet block, **not a nested card.** A
nested card brings its own edge and competes with its parent.`,...($=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:$.description}}};var J,Q,X,Z,ee;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    onClick: fn()
  } as never,
  render: args => <Grid cols={3}>
      {[['INC-4468', 'VPN drops for remote staff', 'Network'], ['INC-4469', 'Printer offline, 3rd floor', 'Hardware'], ['INC-4470', 'SSO login loop after update', 'Identity']].map(([id, title, team]) => <ClickableCard key={id} onClick={(args as {
      onClick?: () => void;
    }).onClick}>
          <CardHeader heading={title} supporting={id} />
          <CardBody>
            <Badge tone="neutral">{team}</Badge>
          </CardBody>
        </ClickableCard>)}
    </Grid>
}`,...(X=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:X.source},description:{story:`The whole card is one target. **It cannot contain buttons.** That is why it is
its own component rather than a switch.`,...(ee=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:ee.description}}};var ae,re,te,ne,se;g.parameters={...g.parameters,docs:{...(ae=g.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    onOpenChange: fn()
  } as never,
  render: args =>
  // Stacked, not side by side: a shut card is 67px and an open one is 207px,
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
}`,...(te=(re=g.parameters)==null?void 0:re.docs)==null?void 0:te.source},description:{story:`The header **is** the control. Collapsed, the header is the whole card, and its
line drops because there is nothing left underneath for it to divide.`,...(se=(ne=g.parameters)==null?void 0:ne.docs)==null?void 0:se.description}}};const Ne=["Surfaces","HeaderBodyFooter","WithMedia","TheHeaderLine","Padding","AnInsetPanel","Clickable","Collapsible"];export{p as AnInsetPanel,h as Clickable,g as Collapsible,i as HeaderBodyFooter,m as Padding,o as Surfaces,c as TheHeaderLine,l as WithMedia,Ne as __namedExportsOrder,Be as default};
//# sourceMappingURL=Card.stories-D20BHn6Y.js.map
