import{j as e,r as p}from"./iframe-Bb4_GmgH.js";import{P as n}from"./PhoneInput-Bc_H-doa.js";import"./preload-helper-Dp1pzeXC.js";import"./index-C6xV686X.js";import"./Input-B-0rOcz4.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./RequiredMark-DhHUkbU8.js";import"./Icon-BQSN7qIS.js";import"./Combobox-B5n7yxvZ.js";import"./picked-row-BGnBNViw.js";import"./index-DoX0Y1d6.js";import"./index-IBxsLoxn.js";import"./index-CGfN8xkL.js";import"./index-CZ_Wpqrj.js";import"./index-C97tDV9F.js";import"./index-CpwHX8Os.js";import"./index-DkePJOoA.js";import"./index-CcfFjRaE.js";import"./index-1w5V8weg.js";import"./index-0njS-AQ1.js";import"./index-CNNxSx_H.js";import"./index-D48VcMGA.js";import"./index-BAAU0d0v.js";import"./index-qXGCbgAz.js";import"./index-C1F6AEPj.js";import"./index-tvpItA-s.js";import"./Select-DLuwwx89.js";import"./index-Dja7rRz_.js";import"./index-BdQq_4o_.js";import"./index-KIC5YH7P.js";import"./index-PxlLHLrC.js";import"./index-Bx4nJ0i9.js";import"./index-Dh5VO5MU.js";import"./HoverCard-DUfjxKjr.js";import"./Popover-Ds8mrIdt.js";import"./DropdownMenu-B2BNFCvN.js";import"./index-BAzWqEQR.js";import"./Checkbox-CQyeZL3U.js";const Oe={title:"New Components/PhoneInput",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'One field joining a searchable country-code picker (the library Combobox) and the national number (the library Input), with the Input\'s label, help, error, held state and sizes. The value is `{ country, number }` or a stored phone string ("+44 20 7946 0958"); `onChange` hands back both the parts and the joined "+<dial> <national>" string. The field hints the chosen country\'s own number format. Without `renderFlag` a country shows its two-letter code in a small tile.'}}},argTypes:{size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"},locked:{control:"boolean"}},args:{label:"Phone",defaultValue:{country:"IN",number:""}},decorators:[r=>e.jsx("div",{className:"mdt-w-80",children:e.jsx(r,{})})]},i={},ee=r=>{const[K,Q]=p.useState({country:"GB",number:"20 7946 0958"}),[X,Y]=p.useState("+44 20 7946 0958");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsx(n,{...r,value:K,onChange:(Z,$)=>{Q(Z),Y($)}}),e.jsxs("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:["Stored: ",X||"(empty)"]})]})},o={render:r=>e.jsx(ee,{...r})},t={args:{defaultValue:"+1868 555 0100"}},c={args:{helperText:"Used for account recovery only"}},m={args:{defaultValue:{country:"US",number:"555"},error:"Enter a full phone number"}},s={args:{defaultValue:"+91 98765 43210",locked:!0}},d={args:{defaultValue:{country:"DE",number:"030 1234567"},disabled:!0}},a={args:{defaultValue:{country:"",number:""}}},l={render:r=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(n,{...r,size:"sm",label:"Small"}),e.jsx(n,{...r,size:"md",label:"Medium"}),e.jsx(n,{...r,size:"lg",label:"Large"})]})};var u,h,g;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(g=(h=i.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var b,y,f,x,S;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <ControlledDemo {...args} />
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source},description:{story:"Controlled with the two parts; the joined string is what a record keeps.",...(S=(x=o.parameters)==null?void 0:x.docs)==null?void 0:S.description}}};var j,V,C,w,z;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    defaultValue: '+1868 555 0100'
  }
}`,...(C=(V=t.parameters)==null?void 0:V.docs)==null?void 0:C.source},description:{story:"A stored string in: split into the country and the national number.",...(z=(w=t.parameters)==null?void 0:w.docs)==null?void 0:z.description}}};var N,k,v;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    helperText: 'Used for account recovery only'
  }
}`,...(v=(k=c.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var E,D,I;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    defaultValue: {
      country: 'US',
      number: '555'
    },
    error: 'Enter a full phone number'
  }
}`,...(I=(D=m.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var P,T,W,L,U;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    defaultValue: '+91 98765 43210',
    locked: true
  }
}`,...(W=(T=s.parameters)==null?void 0:T.docs)==null?void 0:W.source},description:{story:"Held: a directory-managed person's phone - disabled with the lock, and the country closed too.",...(U=(L=s.parameters)==null?void 0:L.docs)==null?void 0:U.description}}};var F,H,M;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    defaultValue: {
      country: 'DE',
      number: '030 1234567'
    },
    disabled: true
  }
}`,...(M=(H=d.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var O,_,A,B,G;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    defaultValue: {
      country: '',
      number: ''
    }
  }
}`,...(A=(_=a.parameters)==null?void 0:_.docs)==null?void 0:A.source},description:{story:"No country chosen yet: a dash in the tile, the generic format.",...(G=(B=a.parameters)==null?void 0:B.docs)==null?void 0:G.description}}};var R,q,J;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <PhoneInput {...args} size="sm" label="Small" />
      <PhoneInput {...args} size="md" label="Medium" />
      <PhoneInput {...args} size="lg" label="Large" />
    </div>
}`,...(J=(q=l.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};const _e=["Default","Controlled","FromString","WithHelperText","WithError","Locked","Disabled","NoCountry","Sizes"];export{o as Controlled,i as Default,d as Disabled,t as FromString,s as Locked,a as NoCountry,l as Sizes,m as WithError,c as WithHelperText,_e as __namedExportsOrder,Oe as default};
//# sourceMappingURL=PhoneInput.stories-BuyjG3ls.js.map
