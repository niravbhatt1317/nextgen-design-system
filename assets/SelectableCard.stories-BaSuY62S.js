import{r as h,j as e}from"./iframe-BZKVIHi7.js";import{a,S as m}from"./SelectableCard-DkHOXycW.js";import{S as V}from"./Select-BHtyF198.js";import{I as p}from"./Icon-BF6zgblk.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./index-ChEho857.js";import"./index-BGWh6M9i.js";import"./index-BCs0fDqA.js";import"./index-CUDQRJH4.js";import"./index-BdQq_4o_.js";import"./index-BX2BM9Iz.js";import"./index-B_4Iad7J.js";import"./index-vEJ-XXbM.js";import"./index-JXsg6yrZ.js";import"./index-5ekqYCLx.js";import"./index-YCqdBqwi.js";import"./index-Lfb6aHOa.js";import"./index-Bp_Jmt9l.js";import"./index-CSpS5iqM.js";import"./index-C-y5PaXt.js";import"./index-CUxWVG-Y.js";import"./index-CqVSmy7M.js";import"./index-Cyax9JJj.js";import"./index-CG8IlN6G.js";import"./index-BcyfhrVF.js";import"./index-DEyVE27u.js";import"./Input-83m65qbu.js";import"./HoverCard-DXde8HrY.js";const{expect:H,userEvent:u,within:N}=__STORYBOOK_MODULE_TEST__,ue={title:"New Components/SelectableCard",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"An answer drawn as a card, its radio or checkbox at the top right - the console's option card. The whole card is the control: press it, or Space / Enter; in a radio set the arrows move the answer. A picker or button in the card's body keeps its press to itself, so the chosen answer can ask its follow-up in place. The edge is 1.5 in every state, so a choice never moves anything."}}}},O=({children:o,width:t=560})=>e.jsx("div",{style:{width:t},children:o}),i={render:function(){const[t,s]=h.useState("existing"),[r,l]=h.useState("");return e.jsx(O,{children:e.jsxs(m,{"aria-label":"How should its holders be handled?",value:t,onValueChange:s,children:[e.jsx(a,{value:"existing",title:"Replace with an existing access profile",description:"Every holder moves to the chosen profile with the end date they have today.",children:t==="existing"&&e.jsx(V,{"aria-label":"Replacement access profile",placeholder:"Select an access profile…",options:[{value:"helpdesk",label:"Helpdesk Access"},{value:"special",label:"Special Access"}],value:r,onChange:d=>{l(typeof d=="string"?d:"")}})}),e.jsx(a,{value:"fresh",title:"Replace with a new access profile",description:"Open the create drawer prefilled from this one - shape the replacement, and its holders move to it when you create it."}),e.jsx(a,{value:"remove",title:"Remove without replacement",description:"Every holder loses this access. The record stays in the audit trail."})]})})},play:async({canvasElement:o})=>{const t=N(o);await u.click(t.getByRole("radio",{name:"Remove without replacement"})),await H(t.getByRole("radio",{name:"Remove without replacement"})).toHaveAttribute("aria-checked","true"),await u.click(t.getByRole("radio",{name:"Replace with an existing access profile"}))}},c={render:function(){const[t,s]=h.useState({email:!0}),r=(l,d,T,G,I={})=>e.jsx(a,{title:d,description:T,icon:e.jsx(p,{name:G}),checked:t[l]??!1,onCheckedChange:M=>{s(_=>({..._,[l]:M}))},...I});return e.jsx(O,{children:e.jsxs(m,{type:"checkbox",columns:2,"aria-label":"Notify by",children:[r("email","Email","A message to the address on file.","mail",{tag:"Fastest"}),r("sms","SMS","A text to the verified number.","phone"),r("slack","Slack","A direct message in the workspace.","slack"),r("pager","Pager","Not set up for this organization.","bell",{disabled:!0})]})})}},n={render:function(){const[t,s]=h.useState("saml");return e.jsxs(m,{layout:"chips","aria-label":"Protocol",value:t,onValueChange:s,children:[e.jsx(a,{value:"saml",title:"SAML 2.0",icon:e.jsx(p,{name:"shield"})}),e.jsx(a,{value:"oidc",title:"OpenID Connect",icon:e.jsx(p,{name:"key-round"})}),e.jsx(a,{value:"ldap",title:"LDAP",icon:e.jsx(p,{name:"server"})})]})}};var v,g,x,S,b;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: function RadioStory() {
    const [mode, setMode] = useState('existing');
    const [target, setTarget] = useState('');
    return <Box>
        <SelectableCardGroup aria-label="How should its holders be handled?" value={mode} onValueChange={setMode}>
          <SelectableCard value="existing" title="Replace with an existing access profile" description="Every holder moves to the chosen profile with the end date they have today.">
            {mode === 'existing' && <Select aria-label="Replacement access profile" placeholder="Select an access profile…" options={[{
            value: 'helpdesk',
            label: 'Helpdesk Access'
          }, {
            value: 'special',
            label: 'Special Access'
          }]} value={target} onChange={v => {
            setTarget(typeof v === 'string' ? v : '');
          }} />}
          </SelectableCard>
          <SelectableCard value="fresh" title="Replace with a new access profile" description="Open the create drawer prefilled from this one - shape the replacement, and its holders move to it when you create it." />
          <SelectableCard value="remove" title="Remove without replacement" description="Every holder loses this access. The record stays in the audit trail." />
        </SelectableCardGroup>
      </Box>;
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Remove without replacement'
    }));
    await expect(canvas.getByRole('radio', {
      name: 'Remove without replacement'
    })).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(canvas.getByRole('radio', {
      name: 'Replace with an existing access profile'
    }));
  }
}`,...(x=(g=i.parameters)==null?void 0:g.docs)==null?void 0:x.source},description:{story:"A radio set: one answer, and the chosen one asks its follow-up in place.",...(b=(S=i.parameters)==null?void 0:S.docs)==null?void 0:b.description}}};var y,w,f,C,k;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: function CheckboxStory() {
    const [on, setOn] = useState<Record<string, boolean>>({
      email: true
    });
    const card = (key: string, title: string, description: string, icon: IconName, extra = {}) => <SelectableCard title={title} description={description} icon={<Icon name={icon} />} checked={on[key] ?? false} onCheckedChange={next => {
      setOn(s => ({
        ...s,
        [key]: next
      }));
    }} {...extra} />;
    return <Box>
        <SelectableCardGroup type="checkbox" columns={2} aria-label="Notify by">
          {card('email', 'Email', 'A message to the address on file.', 'mail', {
          tag: 'Fastest'
        })}
          {card('sms', 'SMS', 'A text to the verified number.', 'phone')}
          {card('slack', 'Slack', 'A direct message in the workspace.', 'slack')}
          {card('pager', 'Pager', 'Not set up for this organization.', 'bell', {
          disabled: true
        })}
        </SelectableCardGroup>
      </Box>;
  }
}`,...(f=(w=c.parameters)==null?void 0:w.docs)==null?void 0:f.source},description:{story:"A checkbox set in a grid of two, with an icon, a tag and a held card.",...(k=(C=c.parameters)==null?void 0:C.docs)==null?void 0:k.description}}};var R,j,A,E,B;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: function ChipsStory() {
    const [value, setValue] = useState('saml');
    return <SelectableCardGroup layout="chips" aria-label="Protocol" value={value} onValueChange={setValue}>
        <SelectableCard value="saml" title="SAML 2.0" icon={<Icon name="shield" />} />
        <SelectableCard value="oidc" title="OpenID Connect" icon={<Icon name="key-round" />} />
        <SelectableCard value="ldap" title="LDAP" icon={<Icon name="server" />} />
      </SelectableCardGroup>;
  }
}`,...(A=(j=n.parameters)==null?void 0:j.docs)==null?void 0:A.source},description:{story:"Chips: one row as wide as their words, no line under the title.",...(B=(E=n.parameters)==null?void 0:E.docs)==null?void 0:B.description}}};const ve=["RadioWithFollowUp","CheckboxGrid","Chips"];export{c as CheckboxGrid,n as Chips,i as RadioWithFollowUp,ve as __namedExportsOrder,ue as default};
//# sourceMappingURL=SelectableCard.stories-BaSuY62S.js.map
