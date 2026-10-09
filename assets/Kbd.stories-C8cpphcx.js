import{j as e}from"./iframe-BwSID9ZV.js";import{K as t,u as I,B as o}from"./ButtonOld-DyKJBZxW.js";import{D as S,a as C,b as B,c as i,e as z}from"./DropdownMenu-CoBqMEJ9.js";import{I as E}from"./Input-CYTjoGgI.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CIGTSak1.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-DXf-30mB.js";import"./Icon-D4ge1zZ0.js";import"./index-BkwXEBw1.js";import"./index-C5QEnpt8.js";import"./index-Dz0jOHHK.js";import"./index-h2oqOUvF.js";import"./index-DYEBmD7I.js";import"./index-BPtiFtwl.js";import"./index-CQnRR3lc.js";import"./index-B7gJQvJV.js";import"./index-DALbGSTD.js";import"./Combination-BJeO3lAD.js";import"./index-DlAWUTP5.js";import"./index-RBmc_RiW.js";import"./index-B5kVzkIK.js";import"./index-D2xon4jl.js";import"./index-BPd1l3ju.js";const re={title:"Components/Kbd",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"`Kbd` draws a keyboard shortcut as keys.\n\n**Keys go in as data** — `keys={['mod', 'shift', 'e']}`, not a hand-assembled\nrow of icons. That is what makes it something a model can write correctly,\nand it is also what lets the component know which keys are modifiers, which\nglyph each one takes, and what to say out loud.\n\n**`'mod'` is the one to reach for.** Command on a Mac, Control everywhere\nelse — which is what almost every shortcut actually means.\n\nIt replaced five different drawings of the same idea: `CommandShortcut`,\n`DropdownMenuShortcut`, a hand-written `<kbd>` in `Sidebar`, the chip inside\na dialog's primary button, and a trial of five more."}}},args:{keys:["mod","k"]}},s=({label:d,children:l})=>e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-4",children:[e.jsx("span",{className:"mdt-w-44 mdt-shrink-0 mdt-text-xs mdt-text-muted-foreground",children:d}),e.jsx("div",{className:"mdt-flex mdt-items-center mdt-gap-4",children:l})]}),n={},a={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs(s,{label:"separate — the default",children:[e.jsx(t,{keys:["mod","enter"]}),e.jsx(t,{keys:["mod","shift","e"]})]}),e.jsxs(s,{label:"separate, tight",children:[e.jsx(t,{keys:["mod","enter"],tight:!0}),e.jsx(t,{keys:["mod","shift","e"],tight:!0})]}),e.jsxs(s,{label:"joined",children:[e.jsx(t,{keys:["mod","enter"],layout:"joined"}),e.jsx(t,{keys:["mod","shift","e"],layout:"joined"})]}),e.jsxs(s,{label:"joined, dimModifiers",children:[e.jsx(t,{keys:["mod","enter"],layout:"joined",dimModifiers:!0}),e.jsx(t,{keys:["mod","shift","e"],layout:"joined",dimModifiers:!0})]}),e.jsxs(s,{label:"filled",children:[e.jsx(t,{keys:["mod","enter"],variant:"filled"}),e.jsx(t,{keys:["mod","shift","e"],variant:"filled",layout:"joined"})]}),e.jsxs(s,{label:"sm · md · lg",children:[e.jsx(t,{keys:["mod","k"],size:"sm"}),e.jsx(t,{keys:["mod","k"],size:"md"}),e.jsx(t,{keys:["mod","k"],size:"lg"})]}),e.jsxs(s,{label:"words and letters",children:[e.jsx(t,{keys:["esc"]}),e.jsx(t,{keys:["shift","tab"]}),e.jsx(t,{keys:["ctrl","alt","delete"]}),e.jsx(t,{keys:["g","g"]}),e.jsx(t,{keys:["F5"]})]})]})},r={render:function(){const l=I();return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs(s,{label:`this machine — ${l}`,children:[e.jsx(t,{keys:["mod","enter"]}),e.jsx(t,{keys:["mod","alt","i"]})]}),e.jsxs(s,{label:"forced: mac",children:[e.jsx(t,{keys:["mod","enter"],platform:"mac"}),e.jsx(t,{keys:["mod","alt","i"],platform:"mac"})]}),e.jsxs(s,{label:"forced: windows",children:[e.jsx(t,{keys:["mod","enter"],platform:"windows"}),e.jsx(t,{keys:["mod","alt","i"],platform:"windows"})]})]})}},m={render:()=>e.jsxs("div",{className:"mdt-flex mdt-w-[34rem] mdt-flex-col mdt-gap-8",children:[e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsxs("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:["In a button — ",e.jsx("code",{children:"shortcut"}),", not a nested ",e.jsx("code",{children:"<Kbd>"})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3",children:[e.jsx(o,{shortcut:["mod","enter"],children:"Send invite"}),e.jsx(o,{variant:"outline",shortcut:["esc"],children:"Cancel"}),e.jsx(o,{size:"sm",shortcut:["mod","enter"],children:"Small"}),e.jsx(o,{variant:"destructive",children:"Delete — no shortcut, deliberately"})]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"In a menu row"}),e.jsxs(S,{children:[e.jsx(C,{asChild:!0,children:e.jsx(o,{variant:"outline",children:"Open menu"})}),e.jsxs(B,{className:"mdt-w-56",children:[e.jsxs(i,{children:["New file",e.jsx(t,{keys:["mod","n"],className:"mdt-ml-auto"})]}),e.jsxs(i,{children:["Edit",e.jsx(t,{keys:["mod","shift","e"],className:"mdt-ml-auto",dimModifiers:!0})]}),e.jsx(z,{}),e.jsxs(i,{children:["Close",e.jsx(t,{keys:["mod","w"],className:"mdt-ml-auto"})]})]})]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"In a search field"}),e.jsxs("div",{className:"mdt-relative",children:[e.jsx(E,{placeholder:"Search…","aria-label":"Search",className:"mdt-pr-16"}),e.jsx(t,{keys:["mod","k"],size:"sm",variant:"filled",className:"mdt-absolute mdt-right-2 mdt-top-1/2 mdt--translate-y-1/2"})]})]}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"In a legend — here the keys are the information, so they are announced"}),e.jsx("dl",{className:"mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-border mdt-p-3",children:[{keys:["mod","k"],what:"Open the command palette"},{keys:["mod","enter"],what:"Submit the form you are in"},{keys:["esc"],what:"Close whatever is open"},{keys:["g","g"],what:"Jump to the top"}].map(d=>e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-justify-between",children:[e.jsx("dt",{className:"mdt-text-sm",children:d.what}),e.jsx("dd",{children:e.jsx(t,{keys:d.keys,variant:"filled",size:"sm"})})]},d.what))})]})]})};var c,h,p;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(p=(h=n.parameters)==null?void 0:h.docs)==null?void 0:p.source}}};var u,x,f,y,w;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Row label="separate — the default">
        <Kbd keys={['mod', 'enter']} />
        <Kbd keys={['mod', 'shift', 'e']} />
      </Row>
      <Row label="separate, tight">
        <Kbd keys={['mod', 'enter']} tight />
        <Kbd keys={['mod', 'shift', 'e']} tight />
      </Row>
      <Row label="joined">
        <Kbd keys={['mod', 'enter']} layout="joined" />
        <Kbd keys={['mod', 'shift', 'e']} layout="joined" />
      </Row>
      <Row label="joined, dimModifiers">
        <Kbd keys={['mod', 'enter']} layout="joined" dimModifiers />
        <Kbd keys={['mod', 'shift', 'e']} layout="joined" dimModifiers />
      </Row>
      <Row label="filled">
        <Kbd keys={['mod', 'enter']} variant="filled" />
        <Kbd keys={['mod', 'shift', 'e']} variant="filled" layout="joined" />
      </Row>
      <Row label="sm · md · lg">
        <Kbd keys={['mod', 'k']} size="sm" />
        <Kbd keys={['mod', 'k']} size="md" />
        <Kbd keys={['mod', 'k']} size="lg" />
      </Row>
      <Row label="words and letters">
        <Kbd keys={['esc']} />
        <Kbd keys={['shift', 'tab']} />
        <Kbd keys={['ctrl', 'alt', 'delete']} />
        <Kbd keys={['g', 'g']} />
        <Kbd keys={['F5']} />
      </Row>
    </div>
}`,...(f=(x=a.parameters)==null?void 0:x.docs)==null?void 0:f.source},description:{story:`Everything the component can be, in one place.

The first four rows are the arrangement; the last three are the surface it is
drawn on. \`separate\` is the default because it is the only arrangement where
a three-key shortcut still reads as three things rather than as a word.`,...(w=(y=a.parameters)==null?void 0:y.docs)==null?void 0:w.description}}};var k,b,j,g,v;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function PlatformDemo() {
    const detected = usePlatform();
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Row label={\`this machine — \${detected}\`}>
          <Kbd keys={['mod', 'enter']} />
          <Kbd keys={['mod', 'alt', 'i']} />
        </Row>
        <Row label="forced: mac">
          <Kbd keys={['mod', 'enter']} platform="mac" />
          <Kbd keys={['mod', 'alt', 'i']} platform="mac" />
        </Row>
        <Row label="forced: windows">
          <Kbd keys={['mod', 'enter']} platform="windows" />
          <Kbd keys={['mod', 'alt', 'i']} platform="windows" />
        </Row>
      </div>;
  }
}`,...(j=(b=r.parameters)==null?void 0:b.docs)==null?void 0:j.source},description:{story:"`mod` is Command on a Mac and Control everywhere else.\n\nThe row marked **this machine** is what you actually get — the component\nreads the platform itself, so one `keys={['mod', 'enter']}` is correct on\nboth. The two rows below force it, which is what `platform` is for when you\nare documenting a shortcut for a machine you are not on.\n\n`useSubmitShortcut` already accepts ⌘ *or* Ctrl at the event level, so a hint\nthat named one of them was telling half the people the wrong thing.",...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.description}}};var N,K,M,D,R;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-w-[34rem] mdt-flex-col mdt-gap-8">
      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">
          In a button — <code>shortcut</code>, not a nested <code>&lt;Kbd&gt;</code>
        </p>
        <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3">
          <Button shortcut={['mod', 'enter']}>Send invite</Button>
          <Button variant="outline" shortcut={['esc']}>
            Cancel
          </Button>
          <Button size="sm" shortcut={['mod', 'enter']}>
            Small
          </Button>
          <Button variant="destructive">Delete — no shortcut, deliberately</Button>
        </div>
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">In a menu row</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mdt-w-56">
            <DropdownMenuItem>
              New file
              <Kbd keys={['mod', 'n']} className="mdt-ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              Edit
              <Kbd keys={['mod', 'shift', 'e']} className="mdt-ml-auto" dimModifiers />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Close
              <Kbd keys={['mod', 'w']} className="mdt-ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">In a search field</p>
        <div className="mdt-relative">
          <Input placeholder="Search…" aria-label="Search" className="mdt-pr-16" />
          <Kbd keys={['mod', 'k']} size="sm" variant="filled" className="mdt-absolute mdt-right-2 mdt-top-1/2 mdt--translate-y-1/2" />
        </div>
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">
          In a legend — here the keys are the information, so they are announced
        </p>
        <dl className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-border mdt-p-3">
          {[{
          keys: ['mod', 'k'],
          what: 'Open the command palette'
        }, {
          keys: ['mod', 'enter'],
          what: 'Submit the form you are in'
        }, {
          keys: ['esc'],
          what: 'Close whatever is open'
        }, {
          keys: ['g', 'g'],
          what: 'Jump to the top'
        }].map(row => <div key={row.what} className="mdt-flex mdt-items-center mdt-justify-between">
              <dt className="mdt-text-sm">{row.what}</dt>
              <dd>
                <Kbd keys={row.keys} variant="filled" size="sm" />
              </dd>
            </div>)}
        </dl>
      </div>
    </div>
}`,...(M=(K=m.parameters)==null?void 0:K.docs)==null?void 0:M.source},description:{story:`Where it goes.

**In a button, do not compose it by hand** — \`Button\` has a \`shortcut\` prop
that seats the caps in the trailing padding and picks the ink from the
button's own variant. Both are things the button knows and a caller would
have to guess.

**Never on a destructive action.** Nobody should be able to delete something
by muscle memory, and a keyboard path to an irreversible act is exactly that.

Everywhere else it is \`<Kbd>\` directly: at the end of a menu row, inside a
search field, in a legend. In a menu and a legend the keys *are* the
information, so they are announced; in a button the label already says what
it does, so \`Button\` passes \`decorative\`.`,...(R=(D=m.parameters)==null?void 0:D.docs)==null?void 0:R.description}}};const me=["Default","Every","Platform","Usage"];export{n as Default,a as Every,r as Platform,m as Usage,me as __namedExportsOrder,re as default};
//# sourceMappingURL=Kbd.stories-C8cpphcx.js.map
