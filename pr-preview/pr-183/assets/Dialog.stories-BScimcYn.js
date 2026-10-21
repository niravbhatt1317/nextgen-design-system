import{j as e,r}from"./iframe-NsmySND1.js";import{u as oe}from"./useTypedConfirmation-DQNXHsfM.js";import{D as s,e as ae,a as l,b as c,c as d,d as h,f as v,g as p,h as ie}from"./Dialog-CXQYA_Fo.js";import{B as n}from"./ButtonOld-q3ptTS4a.js";import{I as b}from"./Input-dr1eRxsl.js";import{C as ee}from"./Callout-0lfF92e6.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BuottIc8.js";import"./index-BfeUULBV.js";import"./index-BRPnWMUb.js";import"./index-BZh4Mq47.js";import"./index-BzjKmCPK.js";import"./index-CwirirR1.js";import"./index-CwhIvWjD.js";import"./index-BcKZMj9B.js";import"./index-BpqiKeq0.js";import"./index-Dn3JpAfw.js";import"./index-BbObuwvv.js";import"./index-Qll-OK_y.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./scroll-fade-DWC0drtQ.js";import"./Icon-CfPFBusi.js";import"./feedback-tones-CRXuhnAx.js";import"./AiMark-CaRttjQH.js";const ze={title:"New Components/Dialog",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:["An accessible modal dialog built with Radix UI primitives.","","### Dialog or Sheet?","","They share an overlay, a focus trap, escape handling and an animation, so the","mechanics will not tell you which to reach for. One question does:","","> **Does the task need the thing behind it?**","","**No — a Dialog.** It interrupts, and the background is dimmed because it has","stopped mattering. **Yes — a `Sheet`.** It attends to something on screen, which","stays legible because you are going back to it.","","| | |","| --- | --- |","| Destructive confirm | **Dialog**, always |","| Blocking — session expired, forced upgrade | **Dialog** |","| Compare options side by side | **Dialog** |","| Settings, or picking from a grid | **Dialog**, full size |","| Wizard or onboarding sequence | **Dialog** |","| Inspect a record clicked in a list | `Sheet` |","| Filters | `Sheet` |","| A long form of stacked fields | `Sheet` |","","**Shape follows content**, and it settles more cases than any principle. A Dialog","is wide, so it suits horizontal composition — three plan cards, a grid, a form","beside a preview. A Sheet is tall and narrow. Three pricing tiers physically do","not fit in a drawer.","","**Creating something new depends on where you came from.** From a list, a Sheet",'keeps the list visible. From a global "New" button there is no context to',"preserve, so a Dialog is right — Linear's new issue is a modal, Attio's new","record is a drawer, and both are correct.","","**Never:** a destructive confirm or a wizard in a Sheet; a Sheet stacked on a","Sheet. A Dialog over a Sheet is the one legitimate stack."].join(`
`)}}},argTypes:{open:{control:"boolean",description:"Controlled open state of the dialog",table:{type:{summary:"boolean"}}},defaultOpen:{control:"boolean",description:"Default open state (uncontrolled)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},onOpenChange:{action:"openChanged",description:"Callback when open state changes",table:{type:{summary:"(open: boolean) => void"}}},modal:{control:"boolean",description:"Whether dialog is modal (traps focus)",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}}}},m={render:()=>e.jsxs(s,{children:[e.jsx(ae,{asChild:!0,children:e.jsx(n,{children:"Open Dialog"})}),e.jsxs(l,{children:[e.jsxs(c,{children:[e.jsx(d,{children:"Dialog Title"}),e.jsx(h,{children:"This is a description of the dialog. It provides additional context about the content."})]}),e.jsx(v,{children:e.jsx("div",{className:"mdt-py-4",children:e.jsx("p",{children:"Dialog content goes here. You can put any content inside."})})}),e.jsxs(p,{children:[e.jsx(ie,{asChild:!0,children:e.jsx(n,{variant:"outline",children:"Cancel"})}),e.jsx(n,{children:"Confirm"})]})]})]})},g={render:function(){const[a,t]=r.useState(!1),[i,o]=r.useState(!1),[u,k]=r.useState(""),te=u.trim()!=="";return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>{t(!0)},children:"Edit name"}),e.jsx(s,{open:a,onOpenChange:t,children:e.jsxs(l,{onRequestClose:()=>te?(o(!0),!1):!0,children:[e.jsxs(c,{children:[e.jsx(d,{children:"Edit name"}),e.jsx(h,{children:"Type something, then try to close it."})]}),e.jsx(v,{children:e.jsx(b,{label:"Name",value:u,onChange:ne=>{k(ne.target.value)}})}),e.jsxs(p,{children:[e.jsx(n,{variant:"outline",onClick:()=>{t(!1)},children:"Cancel"}),e.jsx(n,{onClick:()=>{t(!1)},children:"Save"})]}),e.jsx(s,{open:i,onOpenChange:o,children:e.jsxs(l,{className:"sm:mdt-max-w-[420px]",children:[e.jsxs(c,{children:[e.jsx(d,{children:"Discard your changes?"}),e.jsx(h,{children:"What you have typed will not be kept."})]}),e.jsxs(p,{children:[e.jsx(n,{variant:"outline",onClick:()=>{o(!1)},children:"Keep editing"}),e.jsx(n,{variant:"destructive",onClick:()=>{o(!1),k(""),t(!1)},children:"Discard"})]})]})})]})})]})}},D={render:function(){const[a,t]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"destructive",onClick:()=>{t(!0)},children:"Delete user"}),e.jsx(s,{open:a,onOpenChange:t,children:e.jsxs(l,{size:"sm",children:[e.jsxs(c,{children:[e.jsx(d,{children:"Delete this user?"}),e.jsx(h,{children:"This permanently removes their access, data and assigned permissions from the workspace."})]}),e.jsxs(p,{children:[e.jsx(n,{variant:"outline",onClick:()=>{t(!1)},children:"Cancel"}),e.jsx(n,{variant:"destructive",onClick:()=>{t(!1)},children:"Permanently delete"})]})]})})]})}},f={render:function(){const[a,t]=r.useState(null);return e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-gap-2",children:[["sm","md"].map(i=>e.jsx(n,{variant:"outline",onClick:()=>{t(i)},children:i},i)),e.jsx(s,{open:a!==null,onOpenChange:()=>{t(null)},children:e.jsxs(l,{size:a??"md",children:[e.jsxs(c,{children:[e.jsxs(d,{children:["Size ",a]}),e.jsx(h,{children:"Each step is named for the job rather than the pixels."})]}),e.jsx(p,{children:e.jsx(n,{onClick:()=>{t(null)},shortcut:["enter"],children:"Close"})})]})})]})}},y={render:function(){const[a,t]=r.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>{t(!0)},children:"Add a field"}),e.jsx(s,{open:a,onOpenChange:t,children:e.jsxs(l,{size:"lg",scroll:"body",children:[e.jsxs(c,{children:[e.jsx(d,{children:"Add a field"}),e.jsx(h,{children:"Fields appear on every ticket in this project."})]}),e.jsxs(v,{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(ee,{tone:"info",size:"sm",children:"A field cannot be deleted once tickets have used it — it can only be hidden."}),Array.from({length:9},(i,o)=>e.jsx(b,{label:`Attribute ${String(o+1)}`,placeholder:"Enough rows that it has to scroll…"},o))]}),e.jsxs(p,{align:"between",children:[e.jsx(n,{variant:"ghost",onClick:()=>{t(!1)},children:"Cancel"}),e.jsx(n,{shortcut:["mod","enter"],onClick:()=>{t(!1)},children:"Add field"})]})]})})]})}},x={render:function(){const[a,t]=r.useState(!1),i="Acme Production",o=oe({phrase:i}),u=()=>{t(!1),o.reset()};return e.jsxs(e.Fragment,{children:[e.jsx(n,{variant:"destructive",onClick:()=>{t(!0)},children:"Delete workspace"}),e.jsx(s,{open:a,onOpenChange:u,children:e.jsxs(l,{size:"sm",children:[e.jsxs(c,{children:[e.jsxs(d,{children:["Delete ",i,"?"]}),e.jsx(h,{children:"This cannot be undone."})]}),e.jsxs(v,{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs(ee,{tone:"danger",size:"sm",children:["Deleting it removes:",e.jsxs("ul",{className:"mdt-mt-1.5 mdt-list-disc mdt-space-y-0.5 mdt-pl-4",children:[e.jsx("li",{children:"3 members, immediately"}),e.jsx("li",{children:"12 files, permanently"}),e.jsx("li",{children:"Every API key issued to this workspace"})]})]}),e.jsx(b,{label:`Type ${i} to confirm`,value:o.value,onChange:o.onChange,placeholder:i,autoComplete:"off"})]}),e.jsxs(p,{children:[e.jsx(n,{variant:"outline",onClick:u,children:"Cancel"}),e.jsx(n,{variant:"destructive",disabled:!o.confirmed,onClick:u,children:"Delete workspace"})]})]})})]})}};var j,w,S,B,O;m.parameters={...m.parameters,docs:{...(j=m.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog. It provides additional context about the content.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="mdt-py-4">
            <p>Dialog content goes here. You can put any content inside.</p>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...(S=(w=m.parameters)==null?void 0:w.docs)==null?void 0:S.source},description:{story:"Basic dialog with title, description, and content.",...(O=(B=m.parameters)==null?void 0:B.docs)==null?void 0:O.description}}};var T,A,z,F,N;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: function UnsavedChangesDemo() {
    const [open, setOpen] = useState(false);
    const [asking, setAsking] = useState(false);
    const [value, setValue] = useState('');
    const dirty = value.trim() !== '';
    return <>
        <Button onClick={() => {
        setOpen(true);
      }}>
          Edit name
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent onRequestClose={() => {
          if (!dirty) return true;
          setAsking(true);
          return false;
        }}>
            <DialogHeader>
              <DialogTitle>Edit name</DialogTitle>
              <DialogDescription>Type something, then try to close it.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Input label="Name" value={value} onChange={event => {
              setValue(event.target.value);
            }} />
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
              setOpen(false);
            }}>
                Cancel
              </Button>
              <Button onClick={() => {
              setOpen(false);
            }}>
                Save
              </Button>
            </DialogFooter>
            <Dialog open={asking} onOpenChange={setAsking}>
              <DialogContent className="sm:mdt-max-w-[420px]">
                <DialogHeader>
                  <DialogTitle>Discard your changes?</DialogTitle>
                  <DialogDescription>What you have typed will not be kept.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                  setAsking(false);
                }}>
                    Keep editing
                  </Button>
                  <Button variant="destructive" onClick={() => {
                  setAsking(false);
                  setValue('');
                  setOpen(false);
                }}>
                    Discard
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </>;
  }
}`,...(z=(A=g.parameters)==null?void 0:A.docs)==null?void 0:z.source},description:{story:`Closing a half-filled form should ask first.

Type something, then try every way out — Escape, the X, a click on the
overlay. All three are one question, answered in one place: \`onRequestClose\`
returns \`false\` and a confirmation opens instead. Answering it in three
places is how they drift, and the one that gets forgotten is the overlay.

The confirmation is a second \`Dialog\` **on top of the first** — supported
deliberately, because a guard that refuses to close has to be able to ask,
and the asking is a dialog. Both stay in the DOM; only the top one is
reachable by a screen reader, so nobody is offered a form they cannot get to.`,...(N=(F=g.parameters)==null?void 0:F.docs)==null?void 0:N.description}}};var E,H,I,P,q;D.parameters={...D.parameters,docs:{...(E=D.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: function DestructiveDemo() {
    const [open, setOpen] = useState(false);
    return <>
        <Button variant="destructive" onClick={() => {
        setOpen(true);
      }}>
          Delete user
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Delete this user?</DialogTitle>
              <DialogDescription>
                This permanently removes their access, data and assigned permissions from the
                workspace.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
              setOpen(false);
            }}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => {
              setOpen(false);
            }}>
                Permanently delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>;
  }
}`,...(I=(H=D.parameters)==null?void 0:H.docs)==null?void 0:I.source},description:{story:`Destructive, and deliberately without the shortcut.

Red fill rather than the dark primary, Cancel on the left of it, and **no ⏎
chip** — the one place in the system where the keyboard path is withheld on
purpose. Nobody should be able to delete something by muscle memory, and a
keyboard route to an irreversible act is exactly that.

The same rule applies to \`useSubmitShortcut\`: leave both off anything that
destroys.`,...(q=(P=D.parameters)==null?void 0:P.docs)==null?void 0:q.description}}};var R,V,W,U,_;f.parameters={...f.parameters,docs:{...(R=f.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function SizesDemo() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | null>(null);
    return <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
        {/* the console's MODAL_WIDTHS: sm 448 and md 512; lg, xl and full have no console twin */}
        {(['sm', 'md'] as const).map(option => <Button key={option} variant="outline" onClick={() => {
        setSize(option);
      }}>
            {option}
          </Button>)}
        <Dialog open={size !== null} onOpenChange={() => {
        setSize(null);
      }}>
          <DialogContent size={size ?? 'md'}>
            <DialogHeader>
              <DialogTitle>Size {size}</DialogTitle>
              <DialogDescription>
                Each step is named for the job rather than the pixels.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => {
              setSize(null);
            }} shortcut={['enter']}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>;
  }
}`,...(W=(V=f.parameters)==null?void 0:V.docs)==null?void 0:W.source},description:{story:"Five widths, because the product clusters at five.\n\n`sm` a single decision · `md` the default · `lg` a form · `xl` something with\ntwo columns or a builder in it · `full` a surface with its own navigation.\n\nBefore this there was one width, and the stories escaped it with\n`sm:max-w-[425px]` and `sm:max-w-[800px]` — arbitrary values, which is always\nthe tell that a scale is missing.",...(_=(U=f.parameters)==null?void 0:U.docs)==null?void 0:_.description}}};var L,$,Y,K,M;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: function PanelDemo() {
    const [open, setOpen] = useState(false);
    return <>
        <Button onClick={() => {
        setOpen(true);
      }}>
          Add a field
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="lg" scroll="body">
            <DialogHeader>
              <DialogTitle>Add a field</DialogTitle>
              <DialogDescription>Fields appear on every ticket in this project.</DialogDescription>
            </DialogHeader>
            <DialogBody className="mdt-flex mdt-flex-col mdt-gap-4">
              <Callout tone="info" size="sm">
                A field cannot be deleted once tickets have used it — it can only be hidden.
              </Callout>
              {Array.from({
              length: 9
            }, (_, index) => <Input key={index} label={\`Attribute \${String(index + 1)}\`} placeholder="Enough rows that it has to scroll…" />)}
            </DialogBody>
            <DialogFooter align="between">
              <Button variant="ghost" onClick={() => {
              setOpen(false);
            }}>
                Cancel
              </Button>
              <Button shortcut={['mod', 'enter']} onClick={() => {
              setOpen(false);
            }}>
                Add field
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>;
  }
}`,...(Y=($=y.parameters)==null?void 0:$.docs)==null?void 0:Y.source},description:{story:`**Panel — the workhorse.** Seven of the twelve product screens this was read
from are this shape: a header that stays, a body that scrolls, a footer that
stays.

\`scroll="body"\` is what makes it. Without it a long dialog grows past the
screen and the dimmed area behind it scrolls instead — which works, but puts
the primary action at the bottom of a long form, where somebody filling it in
has to scroll past everything to reach it. Here the action never moves.

Scroll the body and watch the title and the buttons stay put.`,...(M=(K=y.parameters)==null?void 0:K.docs)==null?void 0:M.description}}};var X,G,J,Q,Z;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: function PromptDemo() {
    const [open, setOpen] = useState(false);
    const workspace = 'Acme Production';
    const confirm = useTypedConfirmation({
      phrase: workspace
    });
    const close = () => {
      setOpen(false);
      confirm.reset();
    };
    return <>
        <Button variant="destructive" onClick={() => {
        setOpen(true);
      }}>
          Delete workspace
        </Button>
        <Dialog open={open} onOpenChange={close}>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Delete {workspace}?</DialogTitle>
              <DialogDescription>This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogBody className="mdt-flex mdt-flex-col mdt-gap-4">
              <Callout tone="danger" size="sm">
                Deleting it removes:
                <ul className="mdt-mt-1.5 mdt-list-disc mdt-space-y-0.5 mdt-pl-4">
                  <li>3 members, immediately</li>
                  <li>12 files, permanently</li>
                  <li>Every API key issued to this workspace</li>
                </ul>
              </Callout>
              <Input label={\`Type \${workspace} to confirm\`} value={confirm.value} onChange={confirm.onChange} placeholder={workspace} autoComplete="off" />
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button variant="destructive" disabled={!confirm.confirmed} onClick={close}>
                Delete workspace
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>;
  }
}`,...(J=(G=x.parameters)==null?void 0:G.docs)==null?void 0:J.source},description:{story:`**Prompt — one decision, and the two things that make a destructive one safe.**

A \`Callout\` lists what is about to go. Not prose: a list is countable, and
*"3 members, 12 files, every API key"* is a different sentence from *"this
will delete your data"*.

Then \`useTypedConfirmation\` makes you type the workspace's own name. **Its
name, not the word DELETE** — a name has to be read off the screen and copied
deliberately, where \`DELETE\` is the same five letters on every dialog anybody
has ever seen and gets typed from memory without looking at what it is about
to destroy.

It is a speed bump, not a security control. Anybody determined will be past
it in two seconds, and that is fine: the job is to turn an automatic click
into a deliberate one.

**No ⏎ chip and no \`useSubmitShortcut\`**, deliberately and for the same
reason — a keyboard path *is* muscle memory, and this dialog exists to
interrupt it.`,...(Z=(Q=x.parameters)==null?void 0:Q.docs)==null?void 0:Z.description}}};const Fe=["Default","UnsavedChanges","Destructive","Sizes","Panel","Prompt"];export{m as Default,D as Destructive,y as Panel,x as Prompt,f as Sizes,g as UnsavedChanges,Fe as __namedExportsOrder,ze as default};
//# sourceMappingURL=Dialog.stories-BScimcYn.js.map
