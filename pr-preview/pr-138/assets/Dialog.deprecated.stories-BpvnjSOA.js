import{j as e,r as ie}from"./iframe-CTAb7qz-.js";import{D as t,a as i,b as n,c as a,d as s,e as r,f as c,g as d,h as l}from"./Dialog-C0pOZQVC.js";import{B as o}from"./Button-ZDeSGOal.js";import{I as j}from"./Input-B8aVLNRA.js";import"./preload-helper-Dp1pzeXC.js";import"./index-DWPupZ-j.js";import"./index-CkVb7r8q.js";import"./index-xMUZoUI0.js";import"./index-CUeK7S-6.js";import"./index-CXe92F-1.js";import"./index-BSwYXGSM.js";import"./index-Dq71aAWK.js";import"./index-DXiRNgBT.js";import"./index-BuJreCy5.js";import"./index-Cnoe3ucP.js";import"./Combination-CnEp_Afj.js";import"./index-Bm6qN9_D.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./scroll-fade-DWC0drtQ.js";import"./Icon-kGxehJEI.js";const be={title:"Deprecated/Dialog stories",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"## ⚠️ Deprecated Dialog stories\n\nSeven stories that were written one-prop-at-a-time before the Dialog work,\nand are now either **redundant** or **actively wrong** — two of them teach\nthe exact thing the component was rebuilt to remove.\n\nThey are kept, not deleted, for two reasons. A story that still renders\ncannot silently rot: CI builds this file, so if one of these breaks, the\nbreakage is real and visible. And anyone who bookmarked one finds it here\nwith a pointer to what replaced it, rather than a blank page.\n\n**Do not copy anything from this file.** Each story says what to use instead.\n\n| Deprecated | Use instead |\n| --- | --- |\n| `WithForm` | `Default`, `Panel` |\n| `Confirmation` | `Destructive` |\n| `NoCloseButton` | `Blocking` |\n| `Controlled` | any story written since |\n| `ScrollableContent` | `Panel` |\n| `NestedDialogs` | `UnsavedChanges` |\n| `CustomWidth` | `Sizes` |"}}}},g={render:()=>e.jsxs(t,{children:[e.jsx(i,{asChild:!0,children:e.jsx(o,{children:"Edit Profile"})}),e.jsxs(n,{className:"sm:mdt-max-w-[425px]",children:[e.jsxs(a,{children:[e.jsx(s,{children:"Edit Profile"}),e.jsx(r,{children:"Make changes to your profile here. Click save when you're done."})]}),e.jsx(c,{children:e.jsxs("div",{className:"mdt-grid mdt-gap-4 mdt-py-4",children:[e.jsx(j,{label:"Name",defaultValue:"John Doe"}),e.jsx(j,{label:"Username",defaultValue:"@johndoe"}),e.jsx(j,{label:"Email",type:"email",defaultValue:"john@example.com"})]})}),e.jsxs(d,{children:[e.jsx(l,{asChild:!0,children:e.jsx(o,{variant:"outline",children:"Cancel"})}),e.jsx(o,{type:"submit",children:"Save Changes"})]})]})]})},u={render:()=>e.jsxs(t,{children:[e.jsx(i,{asChild:!0,children:e.jsx(o,{variant:"destructive",children:"Delete Account"})}),e.jsxs(n,{children:[e.jsxs(a,{children:[e.jsx(s,{children:"Are you absolutely sure?"}),e.jsx(r,{children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."})]}),e.jsxs(d,{className:"mdt-gap-2",children:[e.jsx(l,{asChild:!0,children:e.jsx(o,{variant:"outline",children:"Cancel"})}),e.jsx(o,{variant:"destructive",children:"Yes, delete my account"})]})]})]})},h={render:()=>e.jsxs(t,{children:[e.jsx(i,{asChild:!0,children:e.jsx(o,{children:"Open Dialog"})}),e.jsxs(n,{showCloseButton:!1,children:[e.jsxs(a,{children:[e.jsx(s,{children:"Terms and Conditions"}),e.jsx(r,{children:"Please read and accept our terms to continue."})]}),e.jsx(c,{children:e.jsx("div",{className:"mdt-max-h-[200px] mdt-overflow-y-auto mdt-py-4",children:e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})})}),e.jsxs(d,{children:[e.jsx(l,{asChild:!0,children:e.jsx(o,{variant:"outline",children:"Decline"})}),e.jsx(l,{asChild:!0,children:e.jsx(o,{children:"Accept"})})]})]})]})},p={render:function(){const[m,v]=ie.useState(!1);return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("div",{className:"mdt-text-sm mdt-text-muted-foreground",children:["Dialog is: ",m?"Open":"Closed"]}),e.jsxs(t,{open:m,onOpenChange:v,children:[e.jsx(i,{asChild:!0,children:e.jsx(o,{children:"Open Controlled Dialog"})}),e.jsxs(n,{children:[e.jsxs(a,{children:[e.jsx(s,{children:"Controlled Dialog"}),e.jsx(r,{children:"This dialog state is controlled externally."})]}),e.jsx(c,{children:e.jsx("div",{className:"mdt-py-4",children:e.jsx(o,{variant:"outline",onClick:()=>{v(!1)},children:"Close via state"})})})]})]})]})}},D={render:()=>e.jsxs(t,{children:[e.jsx(i,{asChild:!0,children:e.jsx(o,{children:"View Long Content"})}),e.jsxs(n,{className:"mdt-max-h-[80vh]",children:[e.jsxs(a,{children:[e.jsx(s,{children:"Privacy Policy"}),e.jsx(r,{children:"Last updated: January 2024"})]}),e.jsx(c,{children:e.jsx("div",{className:"mdt-max-h-[400px] mdt-overflow-y-auto mdt-pr-4",children:Array.from({length:10},(te,m)=>e.jsxs("div",{className:"mdt-mb-4",children:[e.jsxs("h4",{className:"mdt-font-semibold",children:["Section ",m+1]}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]},m))})}),e.jsx(d,{children:e.jsx(l,{asChild:!0,children:e.jsx(o,{children:"I understand"})})})]})]})},x={render:()=>e.jsxs(t,{children:[e.jsx(i,{asChild:!0,children:e.jsx(o,{children:"Open First Dialog"})}),e.jsxs(n,{children:[e.jsxs(a,{children:[e.jsx(s,{children:"First Dialog"}),e.jsx(r,{children:"This dialog contains another dialog."})]}),e.jsx(c,{children:e.jsx("div",{className:"mdt-py-4",children:e.jsxs(t,{children:[e.jsx(i,{asChild:!0,children:e.jsx(o,{variant:"secondary",children:"Open Nested Dialog"})}),e.jsxs(n,{children:[e.jsxs(a,{children:[e.jsx(s,{children:"Nested Dialog"}),e.jsx(r,{children:"This is a nested dialog."})]}),e.jsx(d,{children:e.jsx(l,{asChild:!0,children:e.jsx(o,{children:"Close"})})})]})]})})}),e.jsx(d,{children:e.jsx(l,{asChild:!0,children:e.jsx(o,{variant:"outline",children:"Close"})})})]})]})},C={render:()=>e.jsxs(t,{children:[e.jsx(i,{asChild:!0,children:e.jsx(o,{children:"Open Wide Dialog"})}),e.jsxs(n,{className:"sm:mdt-max-w-[800px]",children:[e.jsxs(a,{children:[e.jsx(s,{children:"Wide Dialog"}),e.jsx(r,{children:"This dialog has a custom maximum width of 800px."})]}),e.jsx(c,{children:e.jsxs("div",{className:"mdt-grid mdt-grid-cols-2 mdt-gap-4 mdt-py-4",children:[e.jsxs("div",{className:"mdt-rounded mdt-border mdt-p-4",children:[e.jsx("h4",{className:"mdt-font-semibold",children:"Column 1"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Content for the first column."})]}),e.jsxs("div",{className:"mdt-rounded mdt-border mdt-p-4",children:[e.jsx("h4",{className:"mdt-font-semibold",children:"Column 2"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Content for the second column."})]})]})}),e.jsx(d,{children:e.jsx(l,{asChild:!0,children:e.jsx(o,{children:"Close"})})})]})]})};var y,f,B,N,b;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:mdt-max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="mdt-grid mdt-gap-4 mdt-py-4">
            <Input label="Name" defaultValue="John Doe" />
            <Input label="Username" defaultValue="@johndoe" />
            <Input label="Email" type="email" defaultValue="john@example.com" />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(B=(f=g.parameters)==null?void 0:f.docs)==null?void 0:B.source},description:{story:"⚠️ Deprecated — use **Default, and Panel**.\n\nA form is just content. Nothing here is about forms - it is `Default` with inputs in it.",...(b=(N=g.parameters)==null?void 0:N.docs)==null?void 0:b.description}}};var T,w,k,S,F;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mdt-gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Yes, delete my account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(k=(w=u.parameters)==null?void 0:w.docs)==null?void 0:k.source},description:{story:"⚠️ Deprecated — use **Destructive**.\n\n`Destructive` is the same dialog and says the thing that matters: why it has no ⏎ chip.",...(F=(S=u.parameters)==null?void 0:S.docs)==null?void 0:F.description}}};var O,H,q,A,P;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>Please read and accept our terms to continue.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="mdt-max-h-[200px] mdt-overflow-y-auto mdt-py-4">
            <p className="mdt-text-sm mdt-text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Decline</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Accept</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(q=(H=h.parameters)==null?void 0:H.docs)==null?void 0:q.source},description:{story:"⚠️ Deprecated — use **Blocking**.\n\n`Blocking` is what this prop is for, and it draws the distinction that matters - removing the X against disabling it. An X that refuses to work reads as broken rather than as deliberate.",...(P=(A=h.parameters)==null?void 0:A.docs)==null?void 0:P.description}}};var E,W,I,U,L;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function ControlledDialog() {
    const [open, setOpen] = useState(false);
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <div className="mdt-text-sm mdt-text-muted-foreground">
          Dialog is: {open ? 'Open' : 'Closed'}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Open Controlled Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>This dialog state is controlled externally.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="mdt-py-4">
                <Button variant="outline" onClick={() => {
                setOpen(false);
              }}>
                  Close via state
                </Button>
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </div>;
  }
}`,...(I=(W=p.parameters)==null?void 0:W.docs)==null?void 0:I.source},description:{story:"⚠️ Deprecated — use **every story written since**.\n\nEvery dialog with behaviour worth showing is controlled. A story to demonstrate `open` and `onOpenChange` is a story to demonstrate that props exist.",...(L=(U=p.parameters)==null?void 0:U.docs)==null?void 0:L.description}}};var V,J,_,z,M;D.parameters={...D.parameters,docs:{...(V=D.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>View Long Content</Button>
      </DialogTrigger>
      <DialogContent className="mdt-max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>Last updated: January 2024</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="mdt-max-h-[400px] mdt-overflow-y-auto mdt-pr-4">
            {Array.from({
            length: 10
          }, (_, i) => <div key={i} className="mdt-mb-4">
                <h4 className="mdt-font-semibold">Section {i + 1}</h4>
                <p className="mdt-text-sm mdt-text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>)}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>I understand</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(_=(J=D.parameters)==null?void 0:J.docs)==null?void 0:_.source},description:{story:'⚠️ Deprecated — use **Panel**.\n\nThis predates `scroll="body"` and shows the worse way: the whole dialog grows and the dimmed area scrolls, which puts the primary action at the bottom of a long form.',...(M=(z=D.parameters)==null?void 0:z.docs)==null?void 0:M.description}}};var X,Y,R,G,K;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Open First Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>First Dialog</DialogTitle>
          <DialogDescription>This dialog contains another dialog.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="mdt-py-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Open Nested Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nested Dialog</DialogTitle>
                  <DialogDescription>This is a nested dialog.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(R=(Y=x.parameters)==null?void 0:Y.docs)==null?void 0:R.source},description:{story:`⚠️ Deprecated — use **UnsavedChanges**.

The same stacked dialogs, with a reason to be stacked. A guard that refuses to close has to be able to ask, and the asking is a dialog.`,...(K=(G=x.parameters)==null?void 0:G.docs)==null?void 0:K.description}}};var Q,Z,$,ee,oe;C.parameters={...C.parameters,docs:{...(Q=C.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Open Wide Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:mdt-max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Wide Dialog</DialogTitle>
          <DialogDescription>This dialog has a custom maximum width of 800px.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="mdt-grid mdt-grid-cols-2 mdt-gap-4 mdt-py-4">
            <div className="mdt-rounded mdt-border mdt-p-4">
              <h4 className="mdt-font-semibold">Column 1</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">Content for the first column.</p>
            </div>
            <div className="mdt-rounded mdt-border mdt-p-4">
              <h4 className="mdt-font-semibold">Column 2</h4>
              <p className="mdt-text-sm mdt-text-muted-foreground">
                Content for the second column.
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...($=(Z=C.parameters)==null?void 0:Z.docs)==null?void 0:$.source},description:{story:"⚠️ Deprecated — use **Sizes**.\n\nThis uses `sm:max-w-[800px]` - the arbitrary value the five-step size scale was built to remove. It teaches the thing the scale replaced.",...(oe=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:oe.description}}};const Te=["WithForm","Confirmation","NoCloseButton","Controlled","ScrollableContent","NestedDialogs","CustomWidth"];export{u as Confirmation,p as Controlled,C as CustomWidth,x as NestedDialogs,h as NoCloseButton,D as ScrollableContent,g as WithForm,Te as __namedExportsOrder,be as default};
//# sourceMappingURL=Dialog.deprecated.stories-BpvnjSOA.js.map
