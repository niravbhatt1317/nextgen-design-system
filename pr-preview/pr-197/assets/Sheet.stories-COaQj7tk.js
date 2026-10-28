import{j as e,r as we}from"./iframe-CH2_8cO_.js";import{S as a,e as r,a as n,b as i,c as o,d as m,f as u,g as x,h as D,i as S,j as Te}from"./Sheet-CEtaIagb.js";import{B as t}from"./ButtonOld-B42sPLTK.js";import{I as l}from"./Input-DVaKQBWo.js";import{S as Be}from"./Select-CHtls9KP.js";import{C as Ne}from"./Checkbox-l90BP67V.js";import{I as E}from"./Icon-BCOTw1cv.js";import{B as h}from"./Button-HJq6Df4u.js";import{D as Fe,a as ke,b as Ee,d as I}from"./DropdownMenu-ruU03gWY.js";import{T as Ie,a as He,b as ze}from"./Tabs-J8mL-o2H.js";import{S as Ae}from"./Stepper-C9hA1zYG.js";import"./preload-helper-Dp1pzeXC.js";import"./index-Chk7FZWK.js";import"./index-x3iD3wJO.js";import"./index-DB7yGzIL.js";import"./index-Dycvs6x_.js";import"./index-Bze5njmV.js";import"./index-B3BmlGN0.js";import"./index-C6K-ybRl.js";import"./index-CDp1pyu9.js";import"./index-CEyOv_Z1.js";import"./index-Dq47sYjr.js";import"./index-CIHvRBos.js";import"./index-CWsdyKc7.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./picked-row-BGnBNViw.js";import"./index-BDMQvjGu.js";import"./index-BdQq_4o_.js";import"./index-BwNg4B3B.js";import"./index-DgyivPUh.js";import"./index-BdpCxT-r.js";import"./index-Cm6kGBZx.js";import"./index-Dj7xJTsD.js";import"./index-DKcC9-cX.js";import"./index-BFwKw5Yx.js";import"./HoverCard-hD3ptrsy.js";import"./icon-at-drawn-size-r_4Zydte.js";import"./index-DZUyxn9Z.js";import"./index-6iDI8mKZ.js";const wt={title:"New Components/Sheet",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["A panel — a drawer, in most vocabularies — that slides in from the edge of the","screen, for a record you clicked,","a set of filters, a form of stacked fields. Default width for left and right","sheets is 75% on mobile, capped at 24rem above that.","","### Sheet or Dialog?","","They share an overlay, a focus trap, escape handling and an animation, so the","mechanics will not tell you which to reach for. One question does:","","> **Does the task need the thing behind it?**","","**Yes — a Sheet.** You came from a list, a record, a canvas, and you are going","back to it. **No — a `Dialog`.** It interrupts, and the background is dimmed","because it has stopped mattering.","","| | |","| --- | --- |","| Inspect a record clicked in a list | **Sheet** |","| Filters | **Sheet** |","| A long form of stacked fields | **Sheet** |","| Anything opened dozens of times a session | **Sheet** — the gentler interruption |","| Destructive confirm | `Dialog`, always |","| Blocking — session expired, forced upgrade | `Dialog` |","| Compare options side by side | `Dialog` |","| Settings, or picking from a grid | `Dialog`, full size |","| Wizard or onboarding sequence | `Dialog` |","","**Shape follows content**, and it settles more cases than any principle. A Sheet","is tall and narrow, so it suits a vertical stack — fields, properties, an","activity feed. Three pricing tiers physically do not fit in one.","","**Never:** a destructive confirm or a wizard in a Sheet; a Sheet stacked on a","Sheet. A Dialog over a Sheet is the one legitimate stack — a confirmation","interrupting a panel."].join(`
`)}}},argTypes:{open:{control:"boolean",description:"Controlled open state of the sheet",table:{type:{summary:"boolean"},category:"Sheet"}},defaultOpen:{control:"boolean",description:"The open state when initially rendered (uncontrolled)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"},category:"Sheet"}},onOpenChange:{action:"openChanged",description:"Event handler called when the open state changes",table:{type:{summary:"(open: boolean) => void"},category:"Sheet"}},modal:{control:"boolean",description:"Whether the sheet should be modal. When true, interaction with outside elements is disabled and only sheet content is visible to screen readers.",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"Sheet"}},side:{control:"select",options:["top","right","bottom","left"],description:"The side of the screen from which the sheet slides in",table:{type:{summary:"'top' | 'right' | 'bottom' | 'left'"},defaultValue:{summary:"right"},category:"SheetContent"}},showCloseButton:{control:"boolean",description:"Whether to display the close button (X) in the top-right corner",table:{type:{summary:"boolean"},defaultValue:{summary:"true"},category:"SheetContent"}},size:{control:"select",options:["sm","md","lg","xl"],description:"The width from the drawer scale (left and right sheets): sm 480 · md 560 · lg 720 · xl 780. Unset keeps the original width.",table:{type:{summary:"'sm' | 'md' | 'lg' | 'xl'"},category:"SheetContent"}},layout:{control:"select",options:["stack","drawer"],description:"`drawer` is the console drawer frame: a header row (title, actions, ✕), a band, a scrolling body and a pinned footer. The corner ✕ is off in it.",table:{type:{summary:"'stack' | 'drawer'"},defaultValue:{summary:"stack"},category:"SheetContent"}},inset:{control:"select",options:[16,20,24],description:"The drawer frame's side inset in px (20 for the Users and Organizations drawers).",table:{type:{summary:"16 | 20 | 24"},defaultValue:{summary:"24"},category:"SheetContent"}},className:{control:"text",description:'Additional CSS classes for SheetContent. Use to customize width (e.g., "mdt-w-[400px]", "sm:mdt-max-w-lg", "mdt-w-1/2")',table:{type:{summary:"string"},category:"SheetContent"}}}},j={render:()=>e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{children:"Open Sheet"})}),e.jsxs(n,{children:[e.jsxs(i,{children:[e.jsx(o,{children:"Edit Profile"}),e.jsx(m,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsxs("div",{className:"mdt-grid mdt-gap-4 mdt-py-4",children:[e.jsx(l,{id:"name",label:"Name",defaultValue:"John Doe"}),e.jsx(l,{id:"username",label:"Username",defaultValue:"@johndoe"})]}),e.jsxs(u,{children:[e.jsx(x,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Cancel"})}),e.jsx(t,{type:"submit",children:"Save changes"})]})]})]})},f={render:()=>{const s=[{value:"en",label:"English"},{value:"es",label:"Spanish"},{value:"fr",label:"French"},{value:"de",label:"German"}];return e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{children:"Edit Settings"})}),e.jsxs(n,{children:[e.jsxs(i,{children:[e.jsx(o,{children:"Account Settings"}),e.jsx(m,{children:"Update your account preferences and settings."})]}),e.jsxs("form",{className:"mdt-mt-6 mdt-space-y-6",children:[e.jsx(l,{id:"email",label:"Email",type:"email",defaultValue:"john@example.com"}),e.jsx(Be,{label:"Language",options:s,defaultValue:"en",placeholder:"Select language"}),e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(Ne,{id:"notifications"}),e.jsx("label",{htmlFor:"notifications",className:"mdt-text-sm mdt-text-foreground",children:"Enable email notifications"})]})]}),e.jsxs(u,{className:"mdt-mt-6",children:[e.jsx(x,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Cancel"})}),e.jsx(t,{type:"submit",children:"Save Settings"})]})]})]})}},b={render:()=>e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{children:"Open Sheet"})}),e.jsxs(n,{showCloseButton:!1,children:[e.jsxs(i,{children:[e.jsx(o,{children:"Custom Close"}),e.jsx(m,{children:"This sheet has the default close button hidden. Use the button below to close."})]}),e.jsx("div",{className:"mdt-mt-6 mdt-flex mdt-justify-center",children:e.jsx(x,{asChild:!0,children:e.jsx(t,{children:"Close Sheet"})})})]})]})},y={render:()=>{const s=[{value:"all",label:"All Categories"},{value:"electronics",label:"Electronics"},{value:"clothing",label:"Clothing"},{value:"books",label:"Books"}],p=["Active","Pending","Completed","Cancelled"];return e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{variant:"outline",leftIcon:e.jsx(E,{name:"filter",size:"sm"}),children:"Filters"})}),e.jsxs(n,{side:"left",children:[e.jsxs(i,{children:[e.jsx(o,{children:"Filters"}),e.jsx(m,{children:"Refine your search results."})]}),e.jsxs("div",{className:"mdt-mt-6 mdt-space-y-6",children:[e.jsxs("div",{className:"mdt-space-y-3",children:[e.jsx("h4",{className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Status"}),e.jsx("div",{className:"mdt-space-y-2",children:p.map(c=>e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx(Ne,{id:`status-${c}`}),e.jsx("label",{htmlFor:`status-${c}`,className:"mdt-cursor-pointer mdt-text-sm mdt-text-foreground",children:c})]},c))})]}),e.jsx(Be,{label:"Category",options:s,defaultValue:"all",placeholder:"Select category"}),e.jsxs("div",{className:"mdt-space-y-2",children:[e.jsx("h4",{className:"mdt-text-sm mdt-font-medium mdt-text-foreground",children:"Price Range"}),e.jsxs("div",{className:"mdt-flex mdt-gap-2",children:[e.jsx(l,{type:"number",placeholder:"Min"}),e.jsx(l,{type:"number",placeholder:"Max"})]})]})]}),e.jsxs(u,{className:"mdt-mt-6",children:[e.jsx(x,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Reset"})}),e.jsx(t,{children:"Apply Filters"})]})]})]})}},v={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-4",children:[e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Narrow (300px)"})}),e.jsx(n,{className:"mdt-w-[300px]",children:e.jsxs(i,{children:[e.jsx(o,{children:"Narrow Sheet"}),e.jsx(m,{children:"This sheet has a fixed width of 300px."})]})})]}),e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Medium (480px)"})}),e.jsxs(n,{className:"mdt-w-[480px]",children:[e.jsxs(i,{children:[e.jsx(o,{children:"Medium Sheet"}),e.jsx(m,{children:"This sheet has a fixed width of 480px."})]}),e.jsxs("div",{className:"mdt-mt-4 mdt-space-y-4",children:[e.jsx(l,{label:"Name",placeholder:"Enter your name"}),e.jsx(l,{label:"Email",type:"email",placeholder:"Enter your email"})]})]})]}),e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Wide (640px)"})}),e.jsxs(n,{className:"mdt-w-[640px]",children:[e.jsxs(i,{children:[e.jsx(o,{children:"Wide Sheet"}),e.jsx(m,{children:"This sheet has a fixed width of 640px. Great for detailed forms or content."})]}),e.jsxs("div",{className:"mdt-mt-4 mdt-grid mdt-grid-cols-2 mdt-gap-4",children:[e.jsx(l,{label:"First Name",placeholder:"John"}),e.jsx(l,{label:"Last Name",placeholder:"Doe"}),e.jsx(l,{label:"Email",type:"email",placeholder:"john@example.com"}),e.jsx(l,{label:"Phone",type:"tel",placeholder:"+1 (555) 000-0000"})]})]})]}),e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Half Screen (50%)"})}),e.jsx(n,{className:"mdt-w-1/2",children:e.jsxs(i,{children:[e.jsx(o,{children:"Half Screen Sheet"}),e.jsx(m,{children:"This sheet takes up 50% of the screen width."})]})})]}),e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Full Screen"})}),e.jsx(n,{className:"mdt-w-full",children:e.jsxs(i,{children:[e.jsx(o,{children:"Full Screen Sheet"}),e.jsx(m,{children:"This sheet takes up the entire screen width. Useful for complex workflows."})]})})]})]})},De=()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(l,{label:"Name",defaultValue:"Platform admins"}),e.jsx(l,{label:"Description",placeholder:"What this team is for"})]}),N=()=>e.jsx(x,{asChild:!0,children:e.jsx(h,{variant:"ghost",children:"Cancel"})}),C={name:"Drawer: sizes",render:()=>e.jsx("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-4",children:Object.keys(D).map(s=>e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsxs(t,{variant:"outline",children:[s," · ",D[s]]})}),e.jsxs(n,{layout:"drawer",size:s,"aria-describedby":void 0,children:[e.jsx(i,{children:e.jsxs(o,{children:["Drawer at ",D[s]]})}),e.jsx(S,{children:e.jsx(De,{})}),e.jsx(u,{start:e.jsx(N,{}),children:e.jsx(h,{children:"Save"})})]})]},s))})},F=[{key:"details",label:"Details"},{key:"teams",label:"Teams",count:3},{key:"access",label:"Access profiles",count:12}],Oe=()=>{const[s,p]=we.useState("details"),c=F.find(d=>d.key===s)??F[0];return e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{children:"Open profile"})}),e.jsxs(n,{layout:"drawer",size:"lg",inset:20,"aria-describedby":void 0,children:[e.jsx(i,{actions:e.jsxs(Fe,{children:[e.jsx(ke,{asChild:!0,children:e.jsx(h,{iconOnly:!0,variant:"ghost",size:"sm",ariaLabel:"More actions",leftIcon:e.jsx(E,{name:"more-vertical",size:"sm"})})}),e.jsxs(Ee,{align:"end",className:"mdt-w-48",children:[e.jsx(I,{children:"Reset password"}),e.jsx(I,{variant:"destructive",children:"Disable user"})]})]}),children:e.jsx(o,{children:"Asha Rao"})}),e.jsx(Te,{children:e.jsx(Ie,{value:s,onValueChange:p,className:"-mdt-mb-px",children:e.jsx(He,{type:"underline",hairline:!0,children:F.map(d=>e.jsx(ze,{value:d.key,..."count"in d?{count:d.count}:{},children:d.label},d.key))})})}),e.jsx(S,{children:e.jsxs("p",{className:"mdt-text-sm mdt-text-neutral-90",children:["The ",c.label," tab's content."]})}),e.jsx(u,{start:e.jsx(N,{}),children:e.jsx(h,{children:"Save changes"})})]})]})},w={name:"Drawer: tabs band",render:()=>e.jsx(Oe,{})},k=[{id:"details",label:"Details"},{id:"access",label:"Access"},{id:"review",label:"Review"}],Ve=()=>{var d;const[s,p]=we.useState(0),c=s===k.length-1;return e.jsxs(a,{onOpenChange:g=>{g||p(0)},children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{children:"Invite users"})}),e.jsxs(n,{layout:"drawer",size:"md","aria-describedby":void 0,children:[e.jsx(i,{children:e.jsx(o,{children:"Invite users"})}),e.jsx(Te,{children:e.jsx("div",{className:"mdt-py-3",children:e.jsx(Ae,{layout:"underline",current:s,steps:k,"aria-label":"Steps"})})}),e.jsx(S,{children:e.jsxs("p",{className:"mdt-text-sm mdt-text-neutral-90",children:["Step ",s+1,": ",(d=k[s])==null?void 0:d.label]})}),e.jsxs(u,{start:e.jsx(N,{}),children:[e.jsx(h,{variant:"ghost",disabled:s===0,onClick:()=>{p(g=>Math.max(0,g-1))},children:"Back"}),e.jsx(h,{onClick:()=>{c||p(g=>g+1)},children:c?"Send invitations":"Next"})]})]})]})},T={name:"Drawer: stepper band",render:()=>e.jsx(Ve,{})},B={name:"Drawer: footer slots",render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-4",children:[e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Start + end"})}),e.jsxs(n,{layout:"drawer",size:"md","aria-describedby":void 0,children:[e.jsx(i,{children:e.jsx(o,{children:"Edit team"})}),e.jsx(S,{children:e.jsx(De,{})}),e.jsxs(u,{start:e.jsx(h,{variant:"destructiveGhost",leftIcon:e.jsx(E,{name:"trash",size:"sm"}),children:"Delete team"}),children:[e.jsx(N,{}),e.jsx(h,{children:"Save changes"})]})]})]}),e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"Start only"})}),e.jsxs(n,{layout:"drawer",size:"sm","aria-describedby":void 0,children:[e.jsx(i,{children:e.jsx(o,{children:"Saved views"})}),e.jsx(S,{children:e.jsx("p",{className:"mdt-text-sm mdt-text-neutral-90",children:"Nothing to save here - only a way out."})}),e.jsx(u,{start:e.jsx(x,{asChild:!0,children:e.jsx(h,{variant:"ghost",children:"Close"})})})]})]}),e.jsxs(a,{children:[e.jsx(r,{asChild:!0,children:e.jsx(t,{variant:"outline",children:"End only"})}),e.jsxs(n,{layout:"drawer",size:"sm","aria-describedby":void 0,children:[e.jsx(i,{children:e.jsx(o,{children:"Rename group"})}),e.jsx(S,{children:e.jsx(l,{label:"Name",defaultValue:"Edge collectors"})}),e.jsxs(u,{children:[e.jsx(N,{}),e.jsx(h,{children:"Rename"})]})]})]})]})};var H,z,A,O,V;j.parameters={...j.parameters,docs:{...(H=j.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="mdt-grid mdt-gap-4 mdt-py-4">
          <Input id="name" label="Name" defaultValue="John Doe" />
          <Input id="username" label="Username" defaultValue="@johndoe" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
}`,...(A=(z=j.parameters)==null?void 0:z.docs)==null?void 0:A.source},description:{story:"Default sheet that slides in from the right side.",...(V=(O=j.parameters)==null?void 0:O.docs)==null?void 0:V.description}}};var W,M,P,R,U;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const languageOptions = [{
      value: 'en',
      label: 'English'
    }, {
      value: 'es',
      label: 'Spanish'
    }, {
      value: 'fr',
      label: 'French'
    }, {
      value: 'de',
      label: 'German'
    }];
    return <Sheet>
        <SheetTrigger asChild>
          <Button>Edit Settings</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Account Settings</SheetTitle>
            <SheetDescription>Update your account preferences and settings.</SheetDescription>
          </SheetHeader>
          <form className="mdt-mt-6 mdt-space-y-6">
            <Input id="email" label="Email" type="email" defaultValue="john@example.com" />
            <Select label="Language" options={languageOptions} defaultValue="en" placeholder="Select language" />
            <div className="mdt-flex mdt-items-center mdt-gap-2">
              <Checkbox id="notifications" />
              <label htmlFor="notifications" className="mdt-text-sm mdt-text-foreground">
                Enable email notifications
              </label>
            </div>
          </form>
          <SheetFooter className="mdt-mt-6">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit">Save Settings</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>;
  }
}`,...(P=(M=f.parameters)==null?void 0:M.docs)==null?void 0:P.source},description:{story:"Sheet with a form for editing settings.",...(U=(R=f.parameters)==null?void 0:R.docs)==null?void 0:U.description}}};var L,G,_,J,Z;b.parameters={...b.parameters,docs:{...(L=b.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Custom Close</SheetTitle>
          <SheetDescription>
            This sheet has the default close button hidden. Use the button below to close.
          </SheetDescription>
        </SheetHeader>
        <div className="mdt-mt-6 mdt-flex mdt-justify-center">
          <SheetClose asChild>
            <Button>Close Sheet</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
}`,...(_=(G=b.parameters)==null?void 0:G.docs)==null?void 0:_.source},description:{story:"Sheet without the close button.",...(Z=(J=b.parameters)==null?void 0:J.docs)==null?void 0:Z.description}}};var $,q,Y,X,K;y.parameters={...y.parameters,docs:{...($=y.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => {
    const categoryOptions = [{
      value: 'all',
      label: 'All Categories'
    }, {
      value: 'electronics',
      label: 'Electronics'
    }, {
      value: 'clothing',
      label: 'Clothing'
    }, {
      value: 'books',
      label: 'Books'
    }];
    const statusFilters = ['Active', 'Pending', 'Completed', 'Cancelled'];
    return <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" leftIcon={<Icon name="filter" size="sm" />}>
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Refine your search results.</SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-6 mdt-space-y-6">
            <div className="mdt-space-y-3">
              <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Status</h4>
              <div className="mdt-space-y-2">
                {statusFilters.map(status => <div key={status} className="mdt-flex mdt-items-center mdt-gap-2">
                    <Checkbox id={\`status-\${status}\`} />
                    <label htmlFor={\`status-\${status}\`} className="mdt-cursor-pointer mdt-text-sm mdt-text-foreground">
                      {status}
                    </label>
                  </div>)}
              </div>
            </div>
            <Select label="Category" options={categoryOptions} defaultValue="all" placeholder="Select category" />
            <div className="mdt-space-y-2">
              <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Price Range</h4>
              <div className="mdt-flex mdt-gap-2">
                <Input type="number" placeholder="Min" />
                <Input type="number" placeholder="Max" />
              </div>
            </div>
          </div>
          <SheetFooter className="mdt-mt-6">
            <SheetClose asChild>
              <Button variant="outline">Reset</Button>
            </SheetClose>
            <Button>Apply Filters</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>;
  }
}`,...(Y=(q=y.parameters)==null?void 0:q.docs)==null?void 0:Y.source},description:{story:"Filter panel sheet for data tables or lists.",...(K=(X=y.parameters)==null?void 0:X.docs)==null?void 0:K.description}}};var Q,ee,te,se,ae;v.parameters={...v.parameters,docs:{...(Q=v.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-wrap mdt-gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Narrow (300px)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-[300px]">
          <SheetHeader>
            <SheetTitle>Narrow Sheet</SheetTitle>
            <SheetDescription>This sheet has a fixed width of 300px.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Medium (480px)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-[480px]">
          <SheetHeader>
            <SheetTitle>Medium Sheet</SheetTitle>
            <SheetDescription>This sheet has a fixed width of 480px.</SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-4 mdt-space-y-4">
            <Input label="Name" placeholder="Enter your name" />
            <Input label="Email" type="email" placeholder="Enter your email" />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Wide (640px)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-[640px]">
          <SheetHeader>
            <SheetTitle>Wide Sheet</SheetTitle>
            <SheetDescription>
              This sheet has a fixed width of 640px. Great for detailed forms or content.
            </SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-4 mdt-grid mdt-grid-cols-2 mdt-gap-4">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Doe" />
            <Input label="Email" type="email" placeholder="john@example.com" />
            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Half Screen (50%)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-1/2">
          <SheetHeader>
            <SheetTitle>Half Screen Sheet</SheetTitle>
            <SheetDescription>This sheet takes up 50% of the screen width.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Full Screen</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-full">
          <SheetHeader>
            <SheetTitle>Full Screen Sheet</SheetTitle>
            <SheetDescription>
              This sheet takes up the entire screen width. Useful for complex workflows.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
}`,...(te=(ee=v.parameters)==null?void 0:ee.docs)==null?void 0:te.source},description:{story:`Custom width examples for left/right sheets.
Pass any width class via className to override the default width.`,...(ae=(se=v.parameters)==null?void 0:se.docs)==null?void 0:ae.description}}};var re,ne,ie,oe,le;C.parameters={...C.parameters,docs:{...(re=C.parameters)==null?void 0:re.docs,source:{originalSource:`{
  name: 'Drawer: sizes',
  render: () => <div className="mdt-flex mdt-flex-wrap mdt-gap-4">
      {(Object.keys(SHEET_SIZES) as SheetSize[]).map(size => <Sheet key={size}>
          <SheetTrigger asChild>
            <Button variant="outline">
              {size} · {SHEET_SIZES[size]}
            </Button>
          </SheetTrigger>
          <SheetContent layout="drawer" size={size} aria-describedby={undefined}>
            <SheetHeader>
              <SheetTitle>Drawer at {SHEET_SIZES[size]}</SheetTitle>
            </SheetHeader>
            <SheetBody>
              <DrawerForm />
            </SheetBody>
            <SheetFooter start={<CancelInFooter />}>
              <ActionButton>Save</ActionButton>
            </SheetFooter>
          </SheetContent>
        </Sheet>)}
    </div>
}`,...(ie=(ne=C.parameters)==null?void 0:ne.docs)==null?void 0:ie.source},description:{story:'The drawer width scale - the only widths a side sheet takes: sm 480 (a simple form),\nmd 560 (the default form), lg 720 (tabs, a diff, an object drawer), xl 780 (deep inspection).\n`layout="drawer"` puts the ✕ in the header row, centred on the title.',...(le=(oe=C.parameters)==null?void 0:oe.docs)==null?void 0:le.description}}};var de,he,ce,me,ue;w.parameters={...w.parameters,docs:{...(de=w.parameters)==null?void 0:de.docs,source:{originalSource:`{
  name: 'Drawer: tabs band',
  render: () => <TabsBandDrawer />
}`,...(ce=(he=w.parameters)==null?void 0:he.docs)==null?void 0:ce.source},description:{story:`Level-3 tabs in the band under the header, at the lg width (720) with the 20 inset the Users and
Organizations drawers use. A ⋮ menu sits in the header's actions slot, before the ✕. The tab strip
carries its own hairline, so the band draws none of its own - one line, never two.`,...(ue=(me=w.parameters)==null?void 0:me.docs)==null?void 0:ue.description}}};var pe,Se,xe,ge,je;T.parameters={...T.parameters,docs:{...(pe=T.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  name: 'Drawer: stepper band',
  render: () => <StepperBandDrawer />
}`,...(xe=(Se=T.parameters)==null?void 0:Se.docs)==null?void 0:xe.source},description:{story:`The underline stepper in the band. Its own bars are the line, so the band draws no hairline
under it (Pranjal, 2026-09-25). The footer drives the steps: Cancel pinned left, Back and the
concrete verb right.`,...(je=(ge=T.parameters)==null?void 0:ge.docs)==null?void 0:je.description}}};var fe,be,ye,ve,Ce;B.parameters={...B.parameters,docs:{...(fe=B.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  name: 'Drawer: footer slots',
  render: () => <div className="mdt-flex mdt-flex-wrap mdt-gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Start + end</Button>
        </SheetTrigger>
        <SheetContent layout="drawer" size="md" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>Edit team</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <DrawerForm />
          </SheetBody>
          <SheetFooter start={<ActionButton variant="destructiveGhost" leftIcon={<Icon name="trash" size="sm" />}>
                Delete team
              </ActionButton>}>
            <CancelInFooter />
            <ActionButton>Save changes</ActionButton>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Start only</Button>
        </SheetTrigger>
        <SheetContent layout="drawer" size="sm" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>Saved views</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <p className="mdt-text-sm mdt-text-neutral-90">
              Nothing to save here - only a way out.
            </p>
          </SheetBody>
          <SheetFooter start={<SheetClose asChild>
                <ActionButton variant="ghost">Close</ActionButton>
              </SheetClose>} />
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">End only</Button>
        </SheetTrigger>
        <SheetContent layout="drawer" size="sm" aria-describedby={undefined}>
          <SheetHeader>
            <SheetTitle>Rename group</SheetTitle>
          </SheetHeader>
          <SheetBody>
            <Input label="Name" defaultValue="Edge collectors" />
          </SheetBody>
          <SheetFooter>
            <CancelInFooter />
            <ActionButton>Rename</ActionButton>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
}`,...(ye=(be=B.parameters)==null?void 0:be.docs)==null?void 0:ye.source},description:{story:"The three-part footer: `start` pinned left - here a destructive action - a spacer the footer\nowns, then the children as the end group: the escape and the primary verb. Without `start` the\nchildren sit right-aligned, as they always have.",...(Ce=(ve=B.parameters)==null?void 0:ve.docs)==null?void 0:Ce.description}}};const Tt=["Default","WithForm","WithoutCloseButton","FilterPanel","CustomWidth","DrawerSizes","DrawerWithTabsBand","DrawerWithStepperBand","DrawerFooterSlots"];export{v as CustomWidth,j as Default,B as DrawerFooterSlots,C as DrawerSizes,T as DrawerWithStepperBand,w as DrawerWithTabsBand,y as FilterPanel,f as WithForm,b as WithoutCloseButton,Tt as __namedExportsOrder,wt as default};
//# sourceMappingURL=Sheet.stories-COaQj7tk.js.map
