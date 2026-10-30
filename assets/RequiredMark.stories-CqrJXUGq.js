import{j as e}from"./iframe-DKAJBvvF.js";import{R as f}from"./RequiredMark-DFAQijgn.js";import{I as a}from"./Input-D19aU4rW.js";import{S as x}from"./Select-DVhUwc_4.js";import{C as w}from"./Combobox-Sk6jmTyA.js";import{T as y}from"./Textarea-BAP2ALHT.js";import{F as q}from"./FormLabel-B1r5azR5.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./index-ChEho857.js";import"./Icon-DlGK8Scp.js";import"./picked-row-BGnBNViw.js";import"./index-W8JdHtq6.js";import"./index-BhBo85RC.js";import"./index-fzdaBiIN.js";import"./index-BdQq_4o_.js";import"./index-BbiYqKy_.js";import"./index-Bn35FPNz.js";import"./index-CTXm85uq.js";import"./index-DE0K16wH.js";import"./index-B1owMzOv.js";import"./index-BmEHkrqK.js";import"./index-BZnVSO_w.js";import"./index-BKAp66_I.js";import"./index-DehFSuKz.js";import"./index-CHXm5Yro.js";import"./index-BOND74i0.js";import"./index-1rClfGpa.js";import"./index-D_P1M71m.js";import"./index-B4Fy5LjE.js";import"./index-DyLVVKBC.js";import"./index-Df-tTHIN.js";import"./HoverCard-JSEm8vA-.js";import"./index-BYInICiR.js";import"./index-DBhJr9Yb.js";import"./Popover-B1cPd1Gy.js";import"./DropdownMenu-CQFCYE_a.js";import"./index-Ujdj7DuV.js";import"./Checkbox-CeEXK4Zy.js";const le={title:"New Components/RequiredMark",component:f,tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:["The red asterisk after the label of a field that must be filled in. 3 off the word, in the danger red.",'The star is for the eye only; a screen reader hears the word "required" instead.',"","**Every library field draws it by itself** when given `required` - Input, Textarea, Select, Combobox and","FormLabel. Put `<RequiredMark />` after the text of a label you draw yourself.","","`announce={false}` keeps the star and drops the hidden word, for a label whose field already tells a screen","reader it is required (`required` or `aria-required` on the control) - so the word is not heard twice.","",`**Ported from the console's RequiredMark (Pranjal, 2026-10-22)**: "In many forms we have mandatory fields but`,'we are not showing asterisk, so give that symbol beside label".'].join(`
`)}}},argTypes:{announce:{control:"boolean"}}},r={render:b=>e.jsxs("span",{className:"mdt-text-[13px] mdt-font-medium mdt-text-neutral-90","data-testid":"hand-label",children:["Organization name",e.jsx(f,{...b})]})},o=[{value:"admin",label:"Administrator"},{value:"viewer",label:"Viewer"}],t={parameters:{controls:{disable:!0}},render:()=>e.jsxs("div",{className:"mdt-flex mdt-w-[22rem] mdt-max-w-full mdt-flex-col mdt-gap-4",children:[e.jsx(a,{label:"Full name",placeholder:"Enter full name",required:!0}),e.jsx(x,{label:"Role",options:o,placeholder:"Select a role",required:!0}),e.jsx(w,{label:"Owner",options:o,placeholder:"Select an owner",required:!0}),e.jsx(y,{label:"Reason",placeholder:"Why this change",required:!0}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-1.5",children:[e.jsx(q,{htmlFor:"story-email",weight:"medium",required:!0,children:"Email"}),e.jsx(a,{id:"story-email",placeholder:"name@company.com",required:!0})]})]})};var i,l,m,s,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => <span className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90" data-testid="hand-label">
      Organization name
      <RequiredMark {...args} />
    </span>
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source},description:{story:"After the words of a label you draw yourself.",...(d=(s=r.parameters)==null?void 0:s.docs)==null?void 0:d.description}}};var n,p,c,u,h;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="mdt-flex mdt-w-[22rem] mdt-max-w-full mdt-flex-col mdt-gap-4">
      <Input label="Full name" placeholder="Enter full name" required />
      <Select label="Role" options={OPTIONS} placeholder="Select a role" required />
      <Combobox label="Owner" options={OPTIONS} placeholder="Select an owner" required />
      <Textarea label="Reason" placeholder="Why this change" required />
      <div className="mdt-flex mdt-flex-col mdt-gap-1.5">
        <FormLabel htmlFor="story-email" weight="medium" required>
          Email
        </FormLabel>
        <Input id="story-email" placeholder="name@company.com" required />
      </div>
    </div>
}`,...(c=(p=t.parameters)==null?void 0:p.docs)==null?void 0:c.source},description:{story:"The same mark in every library field that takes `required`.",...(h=(u=t.parameters)==null?void 0:u.docs)==null?void 0:h.description}}};const me=["Default","InTheFields"];export{r as Default,t as InTheFields,me as __namedExportsOrder,le as default};
//# sourceMappingURL=RequiredMark.stories-CqrJXUGq.js.map
