import{j as e,r as s}from"./iframe-C4Nw8L5l.js";import"./index-C6xV686X.js";import{C as v}from"./ConfirmDialog-D6zcFw0F.js";import{B as j}from"./Banner-2YJjO8oB.js";import{B as C}from"./Button-BREjf7k1.js";import{I as x}from"./Icon-D2AIiw_z.js";import{S as ye,a as D}from"./SelectableCard-B-oHxB-N.js";import{S as xe}from"./Select-BAO54K_7.js";import{I as we}from"./Input-BCaydtp8.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./Dialog-wpBvBZjQ.js";import"./index-Bi_DG00U.js";import"./index-DAo_gcBw.js";import"./index-CdDsU3FE.js";import"./index-BWqtU_e8.js";import"./index-B7eH-pGv.js";import"./index-CcP-KfA2.js";import"./index-BRC7oEd0.js";import"./index-BOFDUh6K.js";import"./index-BoO9uHb1.js";import"./index-_3Z2KzNs.js";import"./index-BiJN4I26.js";import"./index-CPfQQKRi.js";import"./index-ChEho857.js";import"./scroll-fade-DWC0drtQ.js";import"./useTypedConfirmation-Cx_95JYu.js";import"./feedback-tones-CRXuhnAx.js";import"./icon-at-drawn-size-CB2Euyg8.js";import"./picked-row-BGnBNViw.js";import"./index-C7WBkvgu.js";import"./index-BdQq_4o_.js";import"./index-CBvKMa7D.js";import"./index-BOqgshQ9.js";import"./index-BmYzY2UC.js";import"./index-5HUKGx-J.js";import"./index-CFEsk10U.js";import"./index-9Yy754jD.js";import"./index-CAmdHFE4.js";import"./HoverCard-CtSNoMNK.js";const mt={title:"New Components/ConfirmDialog",component:v,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'A ready-made confirm dialog: title, what will happen or be lost, an optional "type the word to confirm" field, Cancel as the safe default and the action busy while it runs. Ported from the console (Pranjal, 2026-10-13), built on `Dialog` and `useTypedConfirmation`.'}}},args:{title:"Disable user",confirmLabel:"Disable user",tone:"default",width:"sm"}};function i({trigger:t,...r}){const[o,n]=s.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(C,{variant:r.tone==="destructive"?"destructive":"outline",onClick:()=>{n(!0)},children:t}),e.jsx(v,{onConfirm:()=>{},...r,open:o,onOpenChange:n})]})}const d={render:t=>e.jsxs(i,{...t,trigger:"Disable user",children:["Disabling ",e.jsx("b",{children:"Emily Davis"})," will take effect across the organization. This is reversible - you can enable the user again later with access intact."]})},c={args:{open:!0},render:t=>e.jsxs(v,{...t,onConfirm:()=>{},children:["Disabling ",e.jsx("b",{children:"Emily Davis"})," will take effect across the organization. This is reversible - you can enable the user again later with access intact."]})},m={render:()=>e.jsxs(i,{trigger:"Delete team",title:"Delete team",tone:"destructive",typedWord:"delete",confirmLabel:"Delete team",children:["This will permanently delete ",e.jsx("b",{children:"Platform engineering"})," and revoke the access it grants to 12 members. This action cannot be undone."]})},p={render:()=>e.jsx(i,{trigger:"Delete attribute",title:"Delete attribute",tone:"destructive",typedWord:"delete",confirmLabel:"Permanently delete",children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3.5",children:[e.jsxs("p",{children:["This will permanently delete ",e.jsx("b",{children:"Employee ID"})," and purge its values. This action cannot be undone."]}),e.jsx(j,{tone:"danger",title:"Values will be purged",description:"Applies across all client organizations · 214 memberships currently hold a value."})]})})},h={render:()=>e.jsx(i,{trigger:"Delete role",title:"Delete Helpdesk agent",description:"Roles are definitions - retiring one means deciding what happens to its holders.",width:"md",tone:"destructive",typedWord:"delete",confirmLabel:"Delete role",children:"This role isn't referenced by any access profile - deleting it is permanent and affects no one."})},u={render:()=>e.jsxs(i,{trigger:"Delete service account",title:"Delete service account",tone:"destructive",confirmLabel:"Delete account",onConfirm:()=>new Promise(t=>{setTimeout(t,2e3)}),children:["This will permanently delete ",e.jsx("b",{children:"ci-deployer"})," and revoke its 3 credentials."]})},f={render:()=>e.jsxs(i,{trigger:"Disable owner",title:"Can't disable the Tenant Owner",hideCancel:!0,confirmLabel:"Got it",children:[e.jsx("b",{children:"Emily Davis"})," holds the Tenant Owner designation. Transfer it via"," ",e.jsx("b",{children:"Tenant Management"})," first, then this action can proceed."]})},De=[{value:"helpdesk",label:"Helpdesk Access"},{value:"special",label:"Special Access"},{value:"vendor",label:"Vendor Portal Access"}],S=({danger:t=!1,children:r})=>e.jsxs("li",{className:"mdt-flex mdt-items-start mdt-gap-2",children:[e.jsx("span",{"aria-hidden":!0,className:`mdt-mt-1.5 mdt-size-1.5 mdt-shrink-0 mdt-rounded-full ${t?"mdt-bg-destructive":"mdt-bg-neutral-90"}`}),e.jsx("span",{children:r})]}),g={render:function(){const[r,o]=s.useState(!1),[n,w]=s.useState("existing"),[l,y]=s.useState(""),a=n==="remove",ve={existing:"Delete & reassign",fresh:"Delete & build replacement"}[n];return e.jsxs(e.Fragment,{children:[e.jsx(C,{variant:"destructive",onClick:()=>{o(!0)},children:"Delete access profile"}),e.jsx(v,{open:r,onOpenChange:o,title:"Delete Security Operations Access",description:"An access profile is an assignment - deleting one means deciding what happens to the people and teams who hold it.",width:"md",typedWord:"delete",tone:a?"destructive":"default",confirmLabel:ve??"Delete access profile",confirmDisabled:n==="existing"&&l==="",onConfirm:()=>{},children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(j,{tone:"info",icon:e.jsx(x,{name:"tabler-info-circle"}),title:"Held by 2 people and 1 team",description:e.jsxs("ul",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsxs(S,{danger:!0,children:[e.jsx("b",{className:"mdt-text-destructive",children:"Removed without a replacement,"})," every holder loses what this profile opens, immediately - 4 roles in 6 organizations."]}),e.jsxs(S,{children:[e.jsx("b",{children:"Replaced,"})," every holder moves to the other profile and keeps their own end date."]})]})}),e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2.5",children:[e.jsx("span",{id:"holders-mode",className:"mdt-text-[13px] mdt-font-medium mdt-text-neutral-90",children:"How should its holders be handled?"}),e.jsxs(ye,{"aria-labelledby":"holders-mode",value:n,onValueChange:w,children:[e.jsx(D,{value:"existing",title:"Replace with an existing access profile",description:"Every holder moves to the chosen profile with the end date they have today.",children:n==="existing"&&e.jsx(xe,{"aria-label":"Replacement access profile",placeholder:"Select an access profile…",options:De,value:l,onChange:O=>{y(typeof O=="string"?O:"")}})}),e.jsx(D,{value:"fresh",title:"Replace with a new access profile",description:"Open the create drawer prefilled from this one - shape the replacement, and its holders move to it when you create it."}),e.jsx(D,{value:"remove",title:"Remove without replacement",description:"Every holder loses this access. The record stays in the audit trail."})]})]})]})})]})}},je=/^(?!-)[a-z0-9-]{1,63}(\.[a-z0-9-]{1,63})+$/,Ce=["Access your platform using your own branded domain","Provide a professional and trusted experience","Maintain a consistent brand presence"],b={render:function(){const[r,o]=s.useState(!1),[n,w]=s.useState(""),l=n.trim().toLowerCase(),y=je.test(l);return e.jsxs(e.Fragment,{children:[e.jsx(C,{variant:"outline",onClick:()=>{o(!0)},children:"Use your own domain"}),e.jsx(v,{open:r,onOpenChange:o,title:"Domain configuration",confirmLabel:"Add domain",confirmDisabled:!y,onConfirm:()=>{},children:e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs("section",{"aria-label":"About custom domains",className:"mdt-flex mdt-flex-col mdt-gap-3 mdt-rounded-lg mdt-bg-secondary mdt-p-4",children:[e.jsx("p",{children:"Set up a custom domain where your platform will be directly accessible. Once connected, your platform will be available on the domain entered below."}),e.jsx("b",{className:"mdt-text-foreground",children:"Why use a custom domain"}),e.jsx("ul",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:Ce.map(a=>e.jsxs("li",{className:"mdt-flex mdt-items-center mdt-gap-2",children:[e.jsx("span",{"aria-hidden":!0,className:"mdt-inline-flex mdt-size-4 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-azure-60 mdt-text-background",children:e.jsx(x,{name:"check",size:10,strokeWidth:3})}),a]},a))})]}),e.jsx(we,{label:"Domain name",placeholder:"Eg. support.yourcompany.com",startAdornment:e.jsx(x,{name:"globe",size:14}),value:n,onChange:a=>{w(a.target.value)},...l&&!y?{error:"Enter a domain like support.yourcompany.com"}:{}}),e.jsx(j,{tone:"info",icon:e.jsx(x,{name:"bulb"}),title:"Make sure you have access to your domain provider or DNS settings to complete the setup."})]})})]})}};var k,T,N,A,E;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <Opener {...args} trigger="Disable user">
      Disabling <b>Emily Davis</b> will take effect across the organization. This is reversible -
      you can enable the user again later with access intact.
    </Opener>
}`,...(N=(T=d.parameters)==null?void 0:T.docs)==null?void 0:N.source},description:{story:"The plain confirm: a reversible step, so the primary button and no typed word.",...(E=(A=d.parameters)==null?void 0:A.docs)==null?void 0:E.description}}};var R,W,z,L,I;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    open: true
  },
  render: args => <ConfirmDialog {...args} onConfirm={() => undefined}>
      Disabling <b>Emily Davis</b> will take effect across the organization. This is reversible -
      you can enable the user again later with access intact.
    </ConfirmDialog>
}`,...(z=(W=c.parameters)==null?void 0:W.docs)==null?void 0:z.source},description:{story:"Open from the start, for the docs page and visual checks.",...(I=(L=c.parameters)==null?void 0:L.docs)==null?void 0:I.description}}};var B,P,M,F,V;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <Opener trigger="Delete team" title="Delete team" tone="destructive" typedWord="delete" confirmLabel="Delete team">
      This will permanently delete <b>Platform engineering</b> and revoke the access it grants to 12
      members. This action cannot be undone.
    </Opener>
}`,...(M=(P=m.parameters)==null?void 0:P.docs)==null?void 0:M.source},description:{story:`Irreversible, so the red action, the bin, and "delete" typed to unlock it -
the console's Delete team.`,...(V=(F=m.parameters)==null?void 0:F.docs)==null?void 0:V.description}}};var q,H,G,U,_;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <Opener trigger="Delete attribute" title="Delete attribute" tone="destructive" typedWord="delete" confirmLabel="Permanently delete">
      <div className="mdt-flex mdt-flex-col mdt-gap-3.5">
        <p>
          This will permanently delete <b>Employee ID</b> and purge its values. This action cannot
          be undone.
        </p>
        <Banner tone="danger" title="Values will be purged" description="Applies across all client organizations · 214 memberships currently hold a value." />
      </div>
    </Opener>
}`,...(G=(H=p.parameters)==null?void 0:H.docs)==null?void 0:G.source},description:{story:`What will be lost, spelled out in a Banner inside the body - the console's
Delete attribute.`,...(_=(U=p.parameters)==null?void 0:U.docs)==null?void 0:_.description}}};var $,J,K,Q,X;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <Opener trigger="Delete role" title="Delete Helpdesk agent" description="Roles are definitions - retiring one means deciding what happens to its holders." width="md" tone="destructive" typedWord="delete" confirmLabel="Delete role">
      This role isn&apos;t referenced by any access profile - deleting it is permanent and affects
      no one.
    </Opener>
}`,...(K=(J=h.parameters)==null?void 0:J.docs)==null?void 0:K.source},description:{story:`A supporting line in the header and the wider 560 - the console's Delete role,
which also asks what happens to the holders.`,...(X=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:X.description}}};var Y,Z,ee,te,ne;u.parameters={...u.parameters,docs:{...(Y=u.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <Opener trigger="Delete service account" title="Delete service account" tone="destructive" confirmLabel="Delete account" onConfirm={() => new Promise<void>(resolve => {
    setTimeout(resolve, 2000);
  })}>
      This will permanently delete <b>ci-deployer</b> and revoke its 3 credentials.
    </Opener>
}`,...(ee=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:ee.source},description:{story:"The action takes two seconds: it spins, and nothing closes the dialog meanwhile.",...(ne=(te=u.parameters)==null?void 0:te.docs)==null?void 0:ne.description}}};var re,oe,ae,se,ie;f.parameters={...f.parameters,docs:{...(re=f.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <Opener trigger="Disable owner" title="Can't disable the Tenant Owner" hideCancel confirmLabel="Got it">
      <b>Emily Davis</b> holds the Tenant Owner designation. Transfer it via{' '}
      <b>Tenant Management</b> first, then this action can proceed.
    </Opener>
}`,...(ae=(oe=f.parameters)==null?void 0:oe.docs)==null?void 0:ae.source},description:{story:`One button, for a notice - the console's "Can't disable the Tenant Owner".`,...(ie=(se=f.parameters)==null?void 0:se.docs)==null?void 0:ie.description}}};var le,de,ce,me,pe;g.parameters={...g.parameters,docs:{...(le=g.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: function DeleteWithReplacementStory() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('existing');
    const [target, setTarget] = useState('');
    const remove = mode === 'remove';
    const label = {
      existing: 'Delete & reassign',
      fresh: 'Delete & build replacement'
    }[mode];
    return <>
        <Button variant="destructive" onClick={() => {
        setOpen(true);
      }}>
          Delete access profile
        </Button>
        <ConfirmDialog open={open} onOpenChange={setOpen} title="Delete Security Operations Access" description="An access profile is an assignment - deleting one means deciding what happens to the people and teams who hold it." width="md" typedWord="delete" tone={remove ? 'destructive' : 'default'} confirmLabel={label ?? 'Delete access profile'} confirmDisabled={mode === 'existing' && target === ''} onConfirm={() => undefined}>
          <div className="mdt-flex mdt-flex-col mdt-gap-4">
            <Banner tone="info" icon={<Icon name="tabler-info-circle" />} title="Held by 2 people and 1 team" description={<ul className="mdt-flex mdt-flex-col mdt-gap-2">
                  <Consequence danger>
                    <b className="mdt-text-destructive">Removed without a replacement,</b> every
                    holder loses what this profile opens, immediately - 4 roles in 6 organizations.
                  </Consequence>
                  <Consequence>
                    <b>Replaced,</b> every holder moves to the other profile and keeps their own end
                    date.
                  </Consequence>
                </ul>} />
            <div className="mdt-flex mdt-flex-col mdt-gap-2.5">
              <span id="holders-mode" className="mdt-text-[13px] mdt-font-medium mdt-text-neutral-90">
                How should its holders be handled?
              </span>
              <SelectableCardGroup aria-labelledby="holders-mode" value={mode} onValueChange={setMode}>
                <SelectableCard value="existing" title="Replace with an existing access profile" description="Every holder moves to the chosen profile with the end date they have today.">
                  {mode === 'existing' && <Select aria-label="Replacement access profile" placeholder="Select an access profile…" options={PROFILES} value={target} onChange={v => {
                  setTarget(typeof v === 'string' ? v : '');
                }} />}
                </SelectableCard>
                <SelectableCard value="fresh" title="Replace with a new access profile" description="Open the create drawer prefilled from this one - shape the replacement, and its holders move to it when you create it." />
                <SelectableCard value="remove" title="Remove without replacement" description="Every holder loses this access. The record stays in the audit trail." />
              </SelectableCardGroup>
            </div>
          </div>
        </ConfirmDialog>
      </>;
  }
}`,...(ce=(de=g.parameters)==null?void 0:de.docs)==null?void 0:ce.source},description:{story:`Deleting something people hold: a banner says who is affected, three answer
cards say what happens to them, and the first card asks its follow-up in
place. The action unlocks once an answer is complete and "delete" is typed;
its words and colour follow the answer. The console's Delete access profile.`,...(pe=(me=g.parameters)==null?void 0:me.docs)==null?void 0:pe.description}}};var he,ue,fe,ge,be;b.parameters={...b.parameters,docs:{...(he=b.parameters)==null?void 0:he.docs,source:{originalSource:`{
  render: function FormDialogStory() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const domain = value.trim().toLowerCase();
    const valid = DOMAIN.test(domain);
    return <>
        <Button variant="outline" onClick={() => {
        setOpen(true);
      }}>
          Use your own domain
        </Button>
        <ConfirmDialog open={open} onOpenChange={setOpen} title="Domain configuration" confirmLabel="Add domain" confirmDisabled={!valid} onConfirm={() => undefined}>
          <div className="mdt-flex mdt-flex-col mdt-gap-4">
            <section aria-label="About custom domains" className="mdt-flex mdt-flex-col mdt-gap-3 mdt-rounded-lg mdt-bg-secondary mdt-p-4">
              <p>
                Set up a custom domain where your platform will be directly accessible. Once
                connected, your platform will be available on the domain entered below.
              </p>
              <b className="mdt-text-foreground">Why use a custom domain</b>
              <ul className="mdt-flex mdt-flex-col mdt-gap-2">
                {REASONS.map(reason => <li key={reason} className="mdt-flex mdt-items-center mdt-gap-2">
                    <span aria-hidden className="mdt-inline-flex mdt-size-4 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-azure-60 mdt-text-background">
                      <Icon name="check" size={10} strokeWidth={3} />
                    </span>
                    {reason}
                  </li>)}
              </ul>
            </section>
            <Input label="Domain name" placeholder="Eg. support.yourcompany.com" startAdornment={<Icon name="globe" size={14} />} value={value} onChange={e => {
            setValue(e.target.value);
          }} {...domain && !valid ? {
            error: 'Enter a domain like support.yourcompany.com'
          } : {}} />
            <Banner tone="info" icon={<Icon name="bulb" />} title="Make sure you have access to your domain provider or DNS settings to complete the setup." />
          </div>
        </ConfirmDialog>
      </>;
  }
}`,...(fe=(ue=b.parameters)==null?void 0:ue.docs)==null?void 0:fe.source},description:{story:`A short form in a dialog: why, on the sunken panel with its ticked reasons;
the one field; and a tip. The action unlocks once the field holds a domain.
The console's Domain configuration.`,...(be=(ge=b.parameters)==null?void 0:ge.docs)==null?void 0:be.description}}};const pt=["Default","Open","TypedDelete","WithConsequences","WithDescription","Busy","NoticeOnly","DeleteWithReplacement","FormDialog"];export{u as Busy,d as Default,g as DeleteWithReplacement,b as FormDialog,f as NoticeOnly,c as Open,m as TypedDelete,p as WithConsequences,h as WithDescription,pt as __namedExportsOrder,mt as default};
//# sourceMappingURL=ConfirmDialog.stories-wpHRxFNB.js.map
