import{j as e}from"./iframe-DGfO5Tky.js";import{B as t}from"./ButtonOld-BOq7Woiw.js";import{I as s}from"./Icon-DdgFfEyY.js";import"./preload-helper-Dp1pzeXC.js";import"./index-6n8FiUgv.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";const{expect:r,fn:N,userEvent:pn,within:V}=__STORYBOOK_MODULE_TEST__,Bn={title:"Deprecated/Button Old",component:t,tags:["autodocs"],parameters:{status:{type:"deprecated",since:"0.4.0",deprecation:{deprecatedSince:"0.4.0",removalIn:"1.0.0",replacement:"Button",message:"Button is now the merged console button (10 September 2026): seven variants, three heights of 28, 32 and 36, one text size of 13/20, a 16 glyph at 1.5, gap 6, corner 8, and padding decided by what meets each edge. This earlier one keeps the wider surface — the success and AI families, the pill and circle shapes, elevation, uppercase, ripple, badges, shortcut chips and the built-in tooltip — and stays for anything that still needs them until the removal pull request."}},layout:"centered",docs:{description:{component:"## ⚠️ Deprecated — use `Button`. Button is now the merged console button (10 September 2026): seven variants, three heights, one text size. This earlier one keeps the wider surface — success and AI families, pill and circle shapes, elevation, uppercase, ripple, badges, shortcut chips, built-in tooltip — and stays for anything that still needs them. A versatile button component with multiple variants, sizes, and states."}},controls:{exclude:["class"]}},argTypes:{children:{control:"text",description:"ButtonOld content",table:{type:{summary:"ReactNode"}}},style:{control:"object",description:"Inline CSS styles",table:{type:{summary:"CSSProperties"}}},variant:{control:"select",options:["primary","secondary","outline","ghost","link","destructive","destructiveSoft","destructiveOutline","destructiveGhost","success","successSoft","successOutline","successGhost","ai"],description:"Visual style variant. Destructive and success each run solid → soft → outline → ghost, loudest to quietest.",table:{defaultValue:{summary:"primary"}}},size:{control:"select",options:["xs","sm","md","lg","xl","icon"],description:"Size variant of the button",table:{defaultValue:{summary:"md"}}},className:{control:"text",description:"Add custom Tailwind classes here to test",table:{type:{summary:"string"}}},shape:{control:"select",options:["square","rounded","pill","circle"],description:"Corner style of the button",table:{defaultValue:{summary:"rounded"}}},iconOnly:{control:"boolean",description:"Renders button as a square icon-only button",table:{defaultValue:{summary:"false"}}},loadingText:{control:"text",description:"Custom text to display during loading state",table:{type:{summary:"string | ReactNode"}}},active:{control:"boolean",description:"Active/selected state styling",table:{defaultValue:{summary:"false"}}},type:{control:"select",options:["button","submit","reset"],description:"HTML button type attribute",table:{defaultValue:{summary:"button"}}},ariaLabel:{control:"text",description:"Accessibility label for screen readers",table:{type:{summary:"string"}}},href:{control:"text",description:"When provided, renders as an anchor link",table:{type:{summary:"string"}}},badge:{control:"text",description:"Badge indicator (number, text, or ReactNode)",table:{type:{summary:"string | number | ReactNode"}}},color:{control:"select",options:["primary","secondary","success","warning","error","info"],description:"Semantic color override (takes precedence over variant)",table:{type:{summary:"ButtonOldColor"}}},elevation:{control:"select",options:[0,1,2,3],description:"Shadow depth level",table:{defaultValue:{summary:"0"}}},loadingPosition:{control:"select",options:["left","right","center"],description:"Position of loading spinner",table:{defaultValue:{summary:"left"}}},success:{control:"boolean",description:"Success state with checkmark icon",table:{defaultValue:{summary:"false"}}},successIcon:{control:!1,description:"Custom success icon to display instead of default checkmark",table:{type:{summary:"ReactNode"}}},successText:{control:"text",description:"Custom success text to display with success state",table:{type:{summary:"string | ReactNode"}}},error:{control:"boolean",description:"Error state styling",table:{defaultValue:{summary:"false"}}},tooltipContent:{control:"text",description:"Tooltip text on hover",table:{type:{summary:"string | ReactNode"}}},onFocus:{action:"focused",description:"Focus event handler",table:{type:{summary:"(event: FocusEvent) => void"}}},onBlur:{action:"blurred",description:"Blur event handler",table:{type:{summary:"(event: FocusEvent) => void"}}},iconSize:{control:"select",options:["xs","sm","md","lg"],description:"Icon size override",table:{type:{summary:"IconSize"}}},badgePosition:{control:"select",options:["top-right","top-left","bottom-right"],description:"Position of badge indicator",table:{defaultValue:{summary:"top-right"}}},target:{control:"select",options:["_blank","_self","_parent","_top"],description:"Link target (only with href)",table:{type:{summary:"string"}}},uppercase:{control:"boolean",description:"Transform text to uppercase",table:{defaultValue:{summary:"false"}}},preventDefaultOnClick:{control:"boolean",description:"Prevent default click behavior",table:{defaultValue:{summary:"false"}}},iconClassName:{control:"text",description:"Custom classes for icon wrapper",table:{type:{summary:"string"}}},iconSpacing:{control:"select",options:["compact","normal","relaxed"],description:"Gap spacing between icon and text",table:{defaultValue:{summary:"normal"}}},rotateIcon:{control:"boolean",description:"Rotate icon 180 degrees",table:{defaultValue:{summary:"false"}}},ripple:{control:"boolean",description:"Material-style ripple effect on click",table:{defaultValue:{summary:"false"}}},leftIcon:{control:!1,description:"Icon to display on the left side",table:{type:{summary:"ReactNode"}}},rightIcon:{control:!1,description:"Icon to display on the right side",table:{type:{summary:"ReactNode"}}},disabled:{control:"boolean",description:"Whether the button is disabled",table:{defaultValue:{summary:"false"}}},loading:{control:"boolean",description:"Shows loading spinner and disables the button",table:{defaultValue:{summary:"false"}}},fullWidth:{control:"boolean",description:"Whether the button should take full width",table:{defaultValue:{summary:"false"}}},asChild:{control:"boolean",description:"Merge props into child element (Radix Slot)",table:{defaultValue:{summary:"false"}}},onClick:{action:"clicked",description:"Click event handler",table:{type:{summary:"(event: MouseEvent) => void"}}}},args:{children:"ButtonOld"}},l={args:{children:"ButtonOld"}},d={args:{variant:"primary",children:"Primary ButtonOld"}},c={args:{variant:"secondary",children:"Secondary ButtonOld"}},u={args:{variant:"outline",children:"Outline ButtonOld"}},p={args:{variant:"ghost",children:"Ghost ButtonOld"}},m={args:{variant:"destructive",children:"Delete Item"}},v={args:{variant:"success",children:"Approve request"}},h={args:{variant:"ai",children:"Ask AI"}},g={args:{variant:"link",children:"Link ButtonOld"}},x={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-4",children:[e.jsx(t,{size:"xs",children:"Extra Small"}),e.jsx(t,{size:"sm",children:"Small"}),e.jsx(t,{size:"md",children:"Medium"}),e.jsx(t,{size:"lg",children:"Large"}),e.jsx(t,{size:"xl",children:"Extra Large"})]})},b={args:{size:"icon",children:e.jsx(s,{name:"plus",size:"sm","aria-hidden":!0}),"aria-label":"Add item"}},O={args:{children:"Add Item",leftIcon:e.jsx(s,{name:"plus",size:"sm","aria-hidden":!0})}},B={args:{children:"Next",rightIcon:e.jsx(s,{name:"arrow-right",size:"sm","aria-hidden":!0})}},y={args:{disabled:!0,children:"Disabled ButtonOld"}},f={args:{loading:!0,children:"Loading..."}},A={args:{fullWidth:!0,children:"Full Width ButtonOld"},decorators:[a=>e.jsx("div",{style:{width:"400px"},children:e.jsx(a,{})})]},n=({label:a,children:o})=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsx("span",{className:"mdt-text-xs mdt-font-medium mdt-uppercase mdt-tracking-wider mdt-text-muted-foreground",children:a}),e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3",children:o})]}),S={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs(n,{label:"Neutral",children:[e.jsx(t,{variant:"primary",children:"Primary"}),e.jsx(t,{variant:"secondary",children:"Secondary"}),e.jsx(t,{variant:"outline",children:"Outline"}),e.jsx(t,{variant:"ghost",children:"Ghost"}),e.jsx(t,{variant:"link",children:"Link"})]}),e.jsxs(n,{label:"Destructive — solid to quiet",children:[e.jsx(t,{variant:"destructive",children:"Destructive"}),e.jsx(t,{variant:"destructiveSoft",children:"Soft"}),e.jsx(t,{variant:"destructiveOutline",children:"Outline"}),e.jsx(t,{variant:"destructiveGhost",children:"Ghost"})]}),e.jsxs(n,{label:"Success — solid to quiet",children:[e.jsx(t,{variant:"success",children:"Success"}),e.jsx(t,{variant:"successSoft",children:"Soft"}),e.jsx(t,{variant:"successOutline",children:"Outline"}),e.jsx(t,{variant:"successGhost",children:"Ghost"})]}),e.jsx(n,{label:"AI",children:e.jsx(t,{variant:"ai",children:"Ask AI"})}),e.jsxs(n,{label:"Disabled",children:[e.jsx(t,{variant:"primary",disabled:!0,children:"Primary"}),e.jsx(t,{variant:"destructive",disabled:!0,children:"Destructive"}),e.jsx(t,{variant:"destructiveSoft",disabled:!0,children:"Soft"}),e.jsx(t,{variant:"success",disabled:!0,children:"Success"}),e.jsx(t,{variant:"successOutline",disabled:!0,children:"Outline"}),e.jsx(t,{variant:"ai",disabled:!0,children:"Ask AI"})]})]})},w={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs(n,{label:"Volume",children:[e.jsx(t,{variant:"success",children:"Approve"}),e.jsx(t,{variant:"successSoft",children:"Approve"}),e.jsx(t,{variant:"successOutline",children:"Approve"}),e.jsx(t,{variant:"successGhost",children:"Approve"})]}),e.jsxs(n,{label:"Sizes",children:[e.jsx(t,{variant:"success",size:"xs",children:"xs"}),e.jsx(t,{variant:"success",size:"sm",children:"sm"}),e.jsx(t,{variant:"success",size:"md",children:"md"}),e.jsx(t,{variant:"success",size:"lg",children:"lg"}),e.jsx(t,{variant:"success",size:"xl",children:"xl"}),e.jsx(t,{variant:"success",iconOnly:!0,ariaLabel:"Approve",leftIcon:e.jsx(s,{name:"check",size:"sm"}),children:"Approve"})]}),e.jsxs(n,{label:"States",children:[e.jsx(t,{variant:"success",children:"Approve"}),e.jsx(t,{variant:"success",disabled:!0,children:"Approve"}),e.jsx(t,{variant:"success",loading:!0,loadingText:"Approving…",children:"Approve"}),e.jsx(t,{variant:"success",success:!0,successText:"Approved",children:"Approve"})]}),e.jsxs(n,{label:"Icons and shapes",children:[e.jsx(t,{variant:"success",leftIcon:e.jsx(s,{name:"check",size:"sm"}),children:"Approve"}),e.jsx(t,{variant:"success",rightIcon:e.jsx(s,{name:"arrow-right",size:"sm"}),children:"Approve"}),e.jsx(t,{variant:"success",shape:"pill",children:"Approve"}),e.jsx(t,{variant:"success",shape:"square",children:"Approve"})]})]})},j={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs(n,{label:"Volume",children:[e.jsx(t,{variant:"destructive",children:"Delete"}),e.jsx(t,{variant:"destructiveSoft",children:"Delete"}),e.jsx(t,{variant:"destructiveOutline",children:"Delete"}),e.jsx(t,{variant:"destructiveGhost",children:"Delete"})]}),e.jsxs(n,{label:"Sizes",children:[e.jsx(t,{variant:"destructive",size:"xs",children:"xs"}),e.jsx(t,{variant:"destructive",size:"sm",children:"sm"}),e.jsx(t,{variant:"destructive",size:"md",children:"md"}),e.jsx(t,{variant:"destructive",size:"lg",children:"lg"}),e.jsx(t,{variant:"destructive",size:"xl",children:"xl"}),e.jsx(t,{variant:"destructive",iconOnly:!0,ariaLabel:"Delete",leftIcon:e.jsx(s,{name:"trash",size:"sm"}),children:"Delete"})]}),e.jsxs(n,{label:"States",children:[e.jsx(t,{variant:"destructive",children:"Delete"}),e.jsx(t,{variant:"destructive",disabled:!0,children:"Delete"}),e.jsx(t,{variant:"destructive",loading:!0,loadingText:"Deleting…",children:"Delete"})]})]})},k={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs(n,{label:"Sizes",children:[e.jsx(t,{variant:"ai",size:"xs",children:"Ask AI"}),e.jsx(t,{variant:"ai",size:"sm",children:"Ask AI"}),e.jsx(t,{variant:"ai",size:"md",children:"Ask AI"}),e.jsx(t,{variant:"ai",size:"lg",children:"Ask AI"}),e.jsx(t,{variant:"ai",size:"xl",children:"Ask AI"})]}),e.jsxs(n,{label:"States",children:[e.jsx(t,{variant:"ai",children:"Ask AI"}),e.jsx(t,{variant:"ai",disabled:!0,children:"Ask AI"}),e.jsx(t,{variant:"ai",loading:!0,loadingText:"Thinking…",children:"Ask AI"}),e.jsx(t,{variant:"ai",success:!0,successText:"Done",children:"Ask AI"})]}),e.jsxs(n,{label:"Shapes and your own icon",children:[e.jsx(t,{variant:"ai",shape:"pill",children:"Ask AI"}),e.jsx(t,{variant:"ai",iconOnly:!0,ariaLabel:"Ask AI",children:"Ask AI"}),e.jsx(t,{variant:"ai",leftIcon:e.jsx(s,{name:"wand",size:"sm"}),children:"Summarise"})]})]})},I={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[e.jsxs(n,{label:"Neutral",children:[e.jsx(t,{variant:"primary",loading:!0,loadingText:"Saving…",children:"Save"}),e.jsx(t,{variant:"secondary",loading:!0,loadingText:"Saving…",children:"Save"}),e.jsx(t,{variant:"outline",loading:!0,loadingText:"Saving…",children:"Save"}),e.jsx(t,{variant:"ghost",loading:!0,loadingText:"Saving…",children:"Save"})]}),e.jsxs(n,{label:"Destructive",children:[e.jsx(t,{variant:"destructive",loading:!0,loadingText:"Deleting…",children:"Delete"}),e.jsx(t,{variant:"destructiveSoft",loading:!0,loadingText:"Deleting…",children:"Delete"}),e.jsx(t,{variant:"destructiveOutline",loading:!0,loadingText:"Deleting…",children:"Delete"}),e.jsx(t,{variant:"destructiveGhost",loading:!0,loadingText:"Deleting…",children:"Delete"})]}),e.jsxs(n,{label:"Success",children:[e.jsx(t,{variant:"success",loading:!0,loadingText:"Approving…",children:"Approve"}),e.jsx(t,{variant:"successSoft",loading:!0,loadingText:"Approving…",children:"Approve"}),e.jsx(t,{variant:"successOutline",loading:!0,loadingText:"Approving…",children:"Approve"}),e.jsx(t,{variant:"successGhost",loading:!0,loadingText:"Approving…",children:"Approve"})]}),e.jsxs(n,{label:"AI",children:[e.jsx(t,{variant:"ai",loading:!0,loadingText:"Thinking…",children:"Ask AI"}),e.jsx(t,{variant:"ai",loading:!0,size:"sm",loadingText:"Thinking…",children:"Ask AI"}),e.jsx(t,{variant:"ai",loading:!0,iconOnly:!0,ariaLabel:"Thinking",children:"Ask AI"})]})]})},T={args:{children:"Click Me",onClick:N()},play:async({args:a,canvasElement:o})=>{const C=V(o).getByRole("button",{name:/click me/i});await r(C).toBeInTheDocument(),await pn.click(C),await r(a.onClick).toHaveBeenCalled(),await r(a.onClick).toHaveBeenCalledTimes(1)}},D={args:{children:"Disabled ButtonOld",disabled:!0,onClick:N()},play:async({canvasElement:a})=>{const i=V(a).getByRole("button",{name:/disabled button/i});await r(i).toBeDisabled(),await r(i).toHaveAttribute("disabled")}},z={args:{children:"Loading ButtonOld",loading:!0,onClick:N()},play:async({canvasElement:a})=>{const i=V(a).getByRole("button");await r(i).toBeDisabled(),await r(i).toHaveAttribute("aria-busy","true");const C=i.querySelector("svg");await r(C).toBeInTheDocument()}},R={args:{children:"Experimental ButtonOld"},parameters:{status:{type:"experimental",since:"1.5.0",message:"This API may change in future releases"}}},E={args:{children:"Beta ButtonOld"},parameters:{status:{type:"beta",since:"2.0.0-beta.1",message:"Testing phase - stable API expected soon"}}},L={args:{children:"Deprecated ButtonOld",variant:"outline"},parameters:{status:{type:"deprecated",deprecation:{deprecatedSince:"2.0.0",removalIn:"3.0.0",replacement:"MotadataNewButton",migrationGuide:"?path=/docs/documentation-deprecations--docs",message:"This variant has been replaced with a new implementation"}}}};var G,P,q,W,F;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    children: 'ButtonOld'
  }
}`,...(q=(P=l.parameters)==null?void 0:P.docs)==null?void 0:q.source},description:{story:"The default button with primary variant.",...(F=(W=l.parameters)==null?void 0:W.docs)==null?void 0:F.description}}};var M,H,_,K,U;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary ButtonOld'
  }
}`,...(_=(H=d.parameters)==null?void 0:H.docs)==null?void 0:_.source},description:{story:"Primary variant - used for main call-to-action buttons.",...(U=(K=d.parameters)==null?void 0:K.docs)==null?void 0:U.description}}};var Y,J,Q,X,Z;c.parameters={...c.parameters,docs:{...(Y=c.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary ButtonOld'
  }
}`,...(Q=(J=c.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:"Secondary variant - used for less prominent actions.",...(Z=(X=c.parameters)==null?void 0:X.docs)==null?void 0:Z.description}}};var $,ee,te,ne,ae;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline ButtonOld'
  }
}`,...(te=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:te.source},description:{story:"Outline variant - used for bordered buttons with transparent background.",...(ae=(ne=u.parameters)==null?void 0:ne.docs)==null?void 0:ae.description}}};var se,re,ie,oe,le;p.parameters={...p.parameters,docs:{...(se=p.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost ButtonOld'
  }
}`,...(ie=(re=p.parameters)==null?void 0:re.docs)==null?void 0:ie.source},description:{story:"Ghost variant - minimal styling, appears on hover.",...(le=(oe=p.parameters)==null?void 0:oe.docs)==null?void 0:le.description}}};var de,ce,ue,pe,me;m.parameters={...m.parameters,docs:{...(de=m.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Delete Item'
  }
}`,...(ue=(ce=m.parameters)==null?void 0:ce.docs)==null?void 0:ue.source},description:{story:"Destructive variant - used for dangerous/irreversible actions.",...(me=(pe=m.parameters)==null?void 0:pe.docs)==null?void 0:me.description}}};var ve,he,ge,xe,be;v.parameters={...v.parameters,docs:{...(ve=v.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'Approve request'
  }
}`,...(ge=(he=v.parameters)==null?void 0:he.docs)==null?void 0:ge.source},description:{story:'Success variant - used for confirming, approving, and completing.\n\nThe positive counterpart to `destructive`, and the same weight: a solid fill\ncarrying white text. It is a different thing from the `success` *prop*, which\nis the momentary "that worked" state any variant can enter.',...(be=(xe=v.parameters)==null?void 0:xe.docs)==null?void 0:be.description}}};var Oe,Be,ye,fe,Ae;h.parameters={...h.parameters,docs:{...(Oe=h.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    variant: 'ai',
    children: 'Ask AI'
  }
}`,...(ye=(Be=h.parameters)==null?void 0:Be.docs)==null?void 0:ye.source},description:{story:`AI variant - for actions handed to the assistant rather than performed directly.

Deliberately not a recoloured primary. Three of the four product systems built
an AI button independently and all three landed on the same treatment: a pale
purple ground, deep purple text, a faint purple edge and a sparkle on the left.
The sparkle comes with the variant - pass \`leftIcon\` and yours wins.`,...(Ae=(fe=h.parameters)==null?void 0:fe.docs)==null?void 0:Ae.description}}};var Se,we,je,ke,Ie;g.parameters={...g.parameters,docs:{...(Se=g.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    variant: 'link',
    children: 'Link ButtonOld'
  }
}`,...(je=(we=g.parameters)==null?void 0:we.docs)==null?void 0:je.source},description:{story:"Link variant - appears as a text link.",...(Ie=(ke=g.parameters)==null?void 0:ke.docs)==null?void 0:Ie.description}}};var Te,De,ze,Re,Ee;x.parameters={...x.parameters,docs:{...(Te=x.parameters)==null?void 0:Te.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-4">
      <ButtonOld size="xs">Extra Small</ButtonOld>
      <ButtonOld size="sm">Small</ButtonOld>
      <ButtonOld size="md">Medium</ButtonOld>
      <ButtonOld size="lg">Large</ButtonOld>
      <ButtonOld size="xl">Extra Large</ButtonOld>
    </div>
}`,...(ze=(De=x.parameters)==null?void 0:De.docs)==null?void 0:ze.source},description:{story:"Different size variants.",...(Ee=(Re=x.parameters)==null?void 0:Re.docs)==null?void 0:Ee.description}}};var Le,Ce,Ne,Ve,Ge;b.parameters={...b.parameters,docs:{...(Le=b.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    size: 'icon',
    children: <Icon name="plus" size="sm" aria-hidden />,
    'aria-label': 'Add item'
  }
}`,...(Ne=(Ce=b.parameters)==null?void 0:Ce.docs)==null?void 0:Ne.source},description:{story:"Icon-only button.",...(Ge=(Ve=b.parameters)==null?void 0:Ve.docs)==null?void 0:Ge.description}}};var Pe,qe,We,Fe,Me;O.parameters={...O.parameters,docs:{...(Pe=O.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    children: 'Add Item',
    leftIcon: <Icon name="plus" size="sm" aria-hidden />
  }
}`,...(We=(qe=O.parameters)==null?void 0:qe.docs)==null?void 0:We.source},description:{story:"ButtonOld with left icon.",...(Me=(Fe=O.parameters)==null?void 0:Fe.docs)==null?void 0:Me.description}}};var He,_e,Ke,Ue,Ye;B.parameters={...B.parameters,docs:{...(He=B.parameters)==null?void 0:He.docs,source:{originalSource:`{
  args: {
    children: 'Next',
    rightIcon: <Icon name="arrow-right" size="sm" aria-hidden />
  }
}`,...(Ke=(_e=B.parameters)==null?void 0:_e.docs)==null?void 0:Ke.source},description:{story:"ButtonOld with right icon.",...(Ye=(Ue=B.parameters)==null?void 0:Ue.docs)==null?void 0:Ye.description}}};var Je,Qe,Xe,Ze,$e;y.parameters={...y.parameters,docs:{...(Je=y.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled ButtonOld'
  }
}`,...(Xe=(Qe=y.parameters)==null?void 0:Qe.docs)==null?void 0:Xe.source},description:{story:"Disabled state.",...($e=(Ze=y.parameters)==null?void 0:Ze.docs)==null?void 0:$e.description}}};var et,tt,nt,at,st;f.parameters={...f.parameters,docs:{...(et=f.parameters)==null?void 0:et.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Loading...'
  }
}`,...(nt=(tt=f.parameters)==null?void 0:tt.docs)==null?void 0:nt.source},description:{story:"Loading state with spinner.",...(st=(at=f.parameters)==null?void 0:at.docs)==null?void 0:st.description}}};var rt,it,ot,lt,dt;A.parameters={...A.parameters,docs:{...(rt=A.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    children: 'Full Width ButtonOld'
  },
  decorators: [(Story: React.ComponentType) => <div style={{
    width: '400px'
  }}>
        <Story />
      </div>]
}`,...(ot=(it=A.parameters)==null?void 0:it.docs)==null?void 0:ot.source},description:{story:"Full width button.",...(dt=(lt=A.parameters)==null?void 0:lt.docs)==null?void 0:dt.description}}};var ct,ut,pt,mt,vt;S.parameters={...S.parameters,docs:{...(ct=S.parameters)==null?void 0:ct.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Neutral">
        <ButtonOld variant="primary">Primary</ButtonOld>
        <ButtonOld variant="secondary">Secondary</ButtonOld>
        <ButtonOld variant="outline">Outline</ButtonOld>
        <ButtonOld variant="ghost">Ghost</ButtonOld>
        <ButtonOld variant="link">Link</ButtonOld>
      </Row>
      <Row label="Destructive — solid to quiet">
        <ButtonOld variant="destructive">Destructive</ButtonOld>
        <ButtonOld variant="destructiveSoft">Soft</ButtonOld>
        <ButtonOld variant="destructiveOutline">Outline</ButtonOld>
        <ButtonOld variant="destructiveGhost">Ghost</ButtonOld>
      </Row>
      <Row label="Success — solid to quiet">
        <ButtonOld variant="success">Success</ButtonOld>
        <ButtonOld variant="successSoft">Soft</ButtonOld>
        <ButtonOld variant="successOutline">Outline</ButtonOld>
        <ButtonOld variant="successGhost">Ghost</ButtonOld>
      </Row>
      <Row label="AI">
        <ButtonOld variant="ai">Ask AI</ButtonOld>
      </Row>
      <Row label="Disabled">
        <ButtonOld variant="primary" disabled>
          Primary
        </ButtonOld>
        <ButtonOld variant="destructive" disabled>
          Destructive
        </ButtonOld>
        <ButtonOld variant="destructiveSoft" disabled>
          Soft
        </ButtonOld>
        <ButtonOld variant="success" disabled>
          Success
        </ButtonOld>
        <ButtonOld variant="successOutline" disabled>
          Outline
        </ButtonOld>
        <ButtonOld variant="ai" disabled>
          Ask AI
        </ButtonOld>
      </Row>
    </div>
}`,...(pt=(ut=S.parameters)==null?void 0:ut.docs)==null?void 0:pt.source},description:{story:"All variants displayed together.",...(vt=(mt=S.parameters)==null?void 0:mt.docs)==null?void 0:vt.description}}};var ht,gt,xt,bt,Ot;w.parameters={...w.parameters,docs:{...(ht=w.parameters)==null?void 0:ht.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Volume">
        <ButtonOld variant="success">Approve</ButtonOld>
        <ButtonOld variant="successSoft">Approve</ButtonOld>
        <ButtonOld variant="successOutline">Approve</ButtonOld>
        <ButtonOld variant="successGhost">Approve</ButtonOld>
      </Row>
      <Row label="Sizes">
        <ButtonOld variant="success" size="xs">
          xs
        </ButtonOld>
        <ButtonOld variant="success" size="sm">
          sm
        </ButtonOld>
        <ButtonOld variant="success" size="md">
          md
        </ButtonOld>
        <ButtonOld variant="success" size="lg">
          lg
        </ButtonOld>
        <ButtonOld variant="success" size="xl">
          xl
        </ButtonOld>
        {/* iconOnly hides children - the glyph has to arrive as leftIcon */}
        <ButtonOld variant="success" iconOnly ariaLabel="Approve" leftIcon={<Icon name="check" size="sm" />}>
          Approve
        </ButtonOld>
      </Row>
      <Row label="States">
        <ButtonOld variant="success">Approve</ButtonOld>
        <ButtonOld variant="success" disabled>
          Approve
        </ButtonOld>
        <ButtonOld variant="success" loading loadingText="Approving…">
          Approve
        </ButtonOld>
        <ButtonOld variant="success" success successText="Approved">
          Approve
        </ButtonOld>
      </Row>
      <Row label="Icons and shapes">
        <ButtonOld variant="success" leftIcon={<Icon name="check" size="sm" />}>
          Approve
        </ButtonOld>
        <ButtonOld variant="success" rightIcon={<Icon name="arrow-right" size="sm" />}>
          Approve
        </ButtonOld>
        <ButtonOld variant="success" shape="pill">
          Approve
        </ButtonOld>
        <ButtonOld variant="success" shape="square">
          Approve
        </ButtonOld>
      </Row>
    </div>
}`,...(xt=(gt=w.parameters)==null?void 0:gt.docs)==null?void 0:xt.source},description:{story:`The success family at every volume, size and state.

Success mirrors destructive step for step, so a positive action can be pitched
as loudly or as quietly as a dangerous one.`,...(Ot=(bt=w.parameters)==null?void 0:bt.docs)==null?void 0:Ot.description}}};var Bt,yt,ft,At,St;j.parameters={...j.parameters,docs:{...(Bt=j.parameters)==null?void 0:Bt.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Volume">
        <ButtonOld variant="destructive">Delete</ButtonOld>
        <ButtonOld variant="destructiveSoft">Delete</ButtonOld>
        <ButtonOld variant="destructiveOutline">Delete</ButtonOld>
        <ButtonOld variant="destructiveGhost">Delete</ButtonOld>
      </Row>
      <Row label="Sizes">
        <ButtonOld variant="destructive" size="xs">
          xs
        </ButtonOld>
        <ButtonOld variant="destructive" size="sm">
          sm
        </ButtonOld>
        <ButtonOld variant="destructive" size="md">
          md
        </ButtonOld>
        <ButtonOld variant="destructive" size="lg">
          lg
        </ButtonOld>
        <ButtonOld variant="destructive" size="xl">
          xl
        </ButtonOld>
        {/* iconOnly hides children - the glyph has to arrive as leftIcon */}
        <ButtonOld variant="destructive" iconOnly ariaLabel="Delete" leftIcon={<Icon name="trash" size="sm" />}>
          Delete
        </ButtonOld>
      </Row>
      <Row label="States">
        <ButtonOld variant="destructive">Delete</ButtonOld>
        <ButtonOld variant="destructive" disabled>
          Delete
        </ButtonOld>
        <ButtonOld variant="destructive" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
      </Row>
    </div>
}`,...(ft=(yt=j.parameters)==null?void 0:yt.docs)==null?void 0:ft.source},description:{story:`The destructive family, now matching success step for step.

The quieter three are new — destructive used to be solid-only, which meant a
"Remove domain" link in a table had no correct treatment.`,...(St=(At=j.parameters)==null?void 0:At.docs)==null?void 0:St.description}}};var wt,jt,kt,It,Tt;k.parameters={...k.parameters,docs:{...(wt=k.parameters)==null?void 0:wt.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Sizes">
        <ButtonOld variant="ai" size="xs">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" size="sm">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" size="md">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" size="lg">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" size="xl">
          Ask AI
        </ButtonOld>
      </Row>
      <Row label="States">
        <ButtonOld variant="ai">Ask AI</ButtonOld>
        <ButtonOld variant="ai" disabled>
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" loading loadingText="Thinking…">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" success successText="Done">
          Ask AI
        </ButtonOld>
      </Row>
      <Row label="Shapes and your own icon">
        <ButtonOld variant="ai" shape="pill">
          Ask AI
        </ButtonOld>
        {/* An ai button supplies its own sparkle, so iconOnly needs nothing extra */}
        <ButtonOld variant="ai" iconOnly ariaLabel="Ask AI">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" leftIcon={<Icon name="wand" size="sm" />}>
          Summarise
        </ButtonOld>
      </Row>
    </div>
}`,...(kt=(jt=k.parameters)==null?void 0:jt.docs)==null?void 0:kt.source},description:{story:`The AI button.

The sparkle arrives with the variant. Its loading state matters more than most
— an AI action is the one users expect to take a moment.`,...(Tt=(It=k.parameters)==null?void 0:It.docs)==null?void 0:Tt.description}}};var Dt,zt,Rt,Et,Lt;I.parameters={...I.parameters,docs:{...(Dt=I.parameters)==null?void 0:Dt.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <Row label="Neutral">
        <ButtonOld variant="primary" loading loadingText="Saving…">
          Save
        </ButtonOld>
        <ButtonOld variant="secondary" loading loadingText="Saving…">
          Save
        </ButtonOld>
        <ButtonOld variant="outline" loading loadingText="Saving…">
          Save
        </ButtonOld>
        <ButtonOld variant="ghost" loading loadingText="Saving…">
          Save
        </ButtonOld>
      </Row>
      <Row label="Destructive">
        <ButtonOld variant="destructive" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
        <ButtonOld variant="destructiveSoft" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
        <ButtonOld variant="destructiveOutline" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
        <ButtonOld variant="destructiveGhost" loading loadingText="Deleting…">
          Delete
        </ButtonOld>
      </Row>
      <Row label="Success">
        <ButtonOld variant="success" loading loadingText="Approving…">
          Approve
        </ButtonOld>
        <ButtonOld variant="successSoft" loading loadingText="Approving…">
          Approve
        </ButtonOld>
        <ButtonOld variant="successOutline" loading loadingText="Approving…">
          Approve
        </ButtonOld>
        <ButtonOld variant="successGhost" loading loadingText="Approving…">
          Approve
        </ButtonOld>
      </Row>
      <Row label="AI">
        <ButtonOld variant="ai" loading loadingText="Thinking…">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" loading size="sm" loadingText="Thinking…">
          Ask AI
        </ButtonOld>
        <ButtonOld variant="ai" loading iconOnly ariaLabel="Thinking">
          Ask AI
        </ButtonOld>
      </Row>
    </div>
}`,...(Rt=(zt=I.parameters)==null?void 0:zt.docs)==null?void 0:Rt.source},description:{story:`Loading on every variant.

The spinner takes its colour from the button's own text, so it works on a
solid fill and a pale one without any per-variant handling.`,...(Lt=(Et=I.parameters)==null?void 0:Et.docs)==null?void 0:Lt.description}}};var Ct,Nt,Vt,Gt,Pt;T.parameters={...T.parameters,docs:{...(Ct=T.parameters)==null?void 0:Ct.docs,source:{originalSource:`{
  args: {
    children: 'Click Me',
    onClick: fn()
  },
  play: async ({
    args,
    canvasElement
  }: {
    args: ButtonOldProps;
    canvasElement: HTMLElement;
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /click me/i
    });

    // Test: ButtonOld is visible
    await expect(button).toBeInTheDocument();

    // Test: Click the button
    await userEvent.click(button);

    // Test: Verify onClick was called
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect((args as any).onClick).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect((args as any).onClick).toHaveBeenCalledTimes(1);
  }
}`,...(Vt=(Nt=T.parameters)==null?void 0:Nt.docs)==null?void 0:Vt.source},description:{story:`Interaction test example - Click button and verify handler is called.
This story demonstrates how to test user interactions in Storybook.`,...(Pt=(Gt=T.parameters)==null?void 0:Gt.docs)==null?void 0:Pt.description}}};var qt,Wt,Ft,Mt,Ht;D.parameters={...D.parameters,docs:{...(qt=D.parameters)==null?void 0:qt.docs,source:{originalSource:`{
  args: {
    children: 'Disabled ButtonOld',
    disabled: true,
    onClick: fn()
  },
  play: async ({
    canvasElement
  }: {
    args: ButtonOldProps;
    canvasElement: HTMLElement;
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /disabled button/i
    });

    // Test: ButtonOld is disabled
    await expect(button).toBeDisabled();

    // Test: ButtonOld has disabled attribute
    await expect(button).toHaveAttribute('disabled');

    // Note: We don't attempt to click because disabled buttons have pointer-events: none
    // The disabled state itself ensures onClick cannot be triggered
  }
}`,...(Ft=(Wt=D.parameters)==null?void 0:Wt.docs)==null?void 0:Ft.source},description:{story:"Interaction test - Disabled button should not trigger onClick.",...(Ht=(Mt=D.parameters)==null?void 0:Mt.docs)==null?void 0:Ht.description}}};var _t,Kt,Ut,Yt,Jt;z.parameters={...z.parameters,docs:{...(_t=z.parameters)==null?void 0:_t.docs,source:{originalSource:`{
  args: {
    children: 'Loading ButtonOld',
    loading: true,
    onClick: fn()
  },
  play: async ({
    canvasElement
  }: {
    args: ButtonOldProps;
    canvasElement: HTMLElement;
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test: ButtonOld is disabled when loading
    await expect(button).toBeDisabled();

    // Test: ButtonOld has aria-busy attribute
    await expect(button).toHaveAttribute('aria-busy', 'true');

    // Test: Loading spinner should be visible
    const spinner = button.querySelector('svg');
    await expect(spinner).toBeInTheDocument();

    // Note: We don't attempt to click because loading buttons have pointer-events: none
    // The disabled state ensures onClick cannot be triggered during loading
  }
}`,...(Ut=(Kt=z.parameters)==null?void 0:Kt.docs)==null?void 0:Ut.source},description:{story:"Interaction test - Loading state should disable button.",...(Jt=(Yt=z.parameters)==null?void 0:Yt.docs)==null?void 0:Jt.description}}};var Qt,Xt,Zt,$t,en;R.parameters={...R.parameters,docs:{...(Qt=R.parameters)==null?void 0:Qt.docs,source:{originalSource:`{
  args: {
    children: 'Experimental ButtonOld'
  },
  parameters: {
    status: {
      type: 'experimental',
      since: '1.5.0',
      message: 'This API may change in future releases'
    }
  }
}`,...(Zt=(Xt=R.parameters)==null?void 0:Xt.docs)==null?void 0:Zt.source},description:{story:`Example: Experimental Status
Shows how to mark a component as experimental with a badge`,...(en=($t=R.parameters)==null?void 0:$t.docs)==null?void 0:en.description}}};var tn,nn,an,sn,rn;E.parameters={...E.parameters,docs:{...(tn=E.parameters)==null?void 0:tn.docs,source:{originalSource:`{
  args: {
    children: 'Beta ButtonOld'
  },
  parameters: {
    status: {
      type: 'beta',
      since: '2.0.0-beta.1',
      message: 'Testing phase - stable API expected soon'
    }
  }
}`,...(an=(nn=E.parameters)==null?void 0:nn.docs)==null?void 0:an.source},description:{story:`Example: Beta Status
Shows how to mark a component as beta`,...(rn=(sn=E.parameters)==null?void 0:sn.docs)==null?void 0:rn.description}}};var on,ln,dn,cn,un;L.parameters={...L.parameters,docs:{...(on=L.parameters)==null?void 0:on.docs,source:{originalSource:`{
  args: {
    children: 'Deprecated ButtonOld',
    variant: 'outline'
  },
  parameters: {
    status: {
      type: 'deprecated',
      deprecation: {
        deprecatedSince: '2.0.0',
        removalIn: '3.0.0',
        replacement: 'MotadataNewButton',
        migrationGuide: '?path=/docs/documentation-deprecations--docs',
        message: 'This variant has been replaced with a new implementation'
      }
    }
  }
}`,...(dn=(ln=L.parameters)==null?void 0:ln.docs)==null?void 0:dn.source},description:{story:`Example: Deprecated Status
Shows how to mark a component as deprecated with full information`,...(un=(cn=L.parameters)==null?void 0:cn.docs)==null?void 0:un.description}}};const yn=["Default","Primary","Secondary","Outline","Ghost","Destructive","Success","AskAI","Link","Sizes","IconButton","WithLeftIcon","WithRightIcon","Disabled","Loading","FullWidth","AllVariants","SuccessFamily","DestructiveFamily","AiFamily","LoadingEveryVariant","InteractionTest","InteractionTestDisabled","InteractionTestLoading","ExperimentalExample","BetaExample","DeprecatedExample"];export{k as AiFamily,S as AllVariants,h as AskAI,E as BetaExample,l as Default,L as DeprecatedExample,m as Destructive,j as DestructiveFamily,y as Disabled,R as ExperimentalExample,A as FullWidth,p as Ghost,b as IconButton,T as InteractionTest,D as InteractionTestDisabled,z as InteractionTestLoading,g as Link,f as Loading,I as LoadingEveryVariant,u as Outline,d as Primary,c as Secondary,x as Sizes,v as Success,w as SuccessFamily,O as WithLeftIcon,B as WithRightIcon,yn as __namedExportsOrder,Bn as default};
//# sourceMappingURL=ButtonOld.stories-UHh29bfk.js.map
