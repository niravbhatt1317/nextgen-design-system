import{j as e,r as p}from"./iframe-C-MieS_u.js";import{P as n}from"./PhoneInput-CPFWlZIy.js";import"./preload-helper-Dp1pzeXC.js";import"./Input-xoKNi0H4.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./Icon-DJ4zWy3r.js";import"./Combobox-CSc7YKQn.js";import"./picked-row-BGnBNViw.js";import"./index-519c8RwP.js";import"./index-DLSrKNuk.js";import"./index-Bkryxoso.js";import"./index-CTNUnx1m.js";import"./index-CmpYjZrT.js";import"./index-R4ollT2R.js";import"./index-DKNf8pUc.js";import"./index-CDR9iOls.js";import"./index-xd6ivzJK.js";import"./index-Dm-zHMrV.js";import"./index-B46fM1VY.js";import"./index-Cj0Q1Iju.js";import"./index-ClkcLQjt.js";import"./index-DsnX5OqL.js";import"./index-CkNxaRf1.js";import"./index-DvWgGjnj.js";import"./Select-DRDmRZ88.js";import"./index-C_Gkrxg8.js";import"./index-BdQq_4o_.js";import"./index-DOqUfdK0.js";import"./index-Ddq7-oKl.js";import"./index-xaipi3Jp.js";import"./index-9kNYGQFV.js";import"./HoverCard-DocrCoC5.js";import"./Popover--ldWZI6s.js";const Le={title:"New Components/PhoneInput",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:'One field joining a searchable country-code picker (the library Combobox) and the national number (the library Input), with the Input\'s label, help, error, held state and sizes. The value is `{ country, number }` or a stored phone string ("+44 20 7946 0958"); `onChange` hands back both the parts and the joined "+<dial> <national>" string. The field hints the chosen country\'s own number format. Without `renderFlag` a country shows its two-letter code in a small tile.'}}},argTypes:{size:{control:"select",options:["sm","md","lg"]},disabled:{control:"boolean"},locked:{control:"boolean"}},args:{label:"Phone",defaultValue:{country:"IN",number:""}},decorators:[r=>e.jsx("div",{className:"mdt-w-80",children:e.jsx(r,{})})]},c={},ee=r=>{const[K,Q]=p.useState({country:"GB",number:"20 7946 0958"}),[X,Y]=p.useState("+44 20 7946 0958");return e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-3",children:[e.jsx(n,{...r,value:K,onChange:(Z,$)=>{Q(Z),Y($)}}),e.jsxs("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:["Stored: ",X||"(empty)"]})]})},o={render:r=>e.jsx(ee,{...r})},t={args:{defaultValue:"+1868 555 0100"}},i={args:{helperText:"Used for account recovery only"}},d={args:{defaultValue:{country:"US",number:"555"},error:"Enter a full phone number"}},s={args:{defaultValue:"+91 98765 43210",locked:!0}},l={args:{defaultValue:{country:"DE",number:"030 1234567"},disabled:!0}},a={args:{defaultValue:{country:"",number:""}}},m={render:r=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(n,{...r,size:"sm",label:"Small"}),e.jsx(n,{...r,size:"md",label:"Medium"}),e.jsx(n,{...r,size:"lg",label:"Large"})]})};var u,h,g;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(g=(h=c.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var b,y,f,x,S;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <ControlledDemo {...args} />
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source},description:{story:"Controlled with the two parts; the joined string is what a record keeps.",...(S=(x=o.parameters)==null?void 0:x.docs)==null?void 0:S.description}}};var j,V,C,w,z;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    defaultValue: '+1868 555 0100'
  }
}`,...(C=(V=t.parameters)==null?void 0:V.docs)==null?void 0:C.source},description:{story:"A stored string in: split into the country and the national number.",...(z=(w=t.parameters)==null?void 0:w.docs)==null?void 0:z.description}}};var N,k,v;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    helperText: 'Used for account recovery only'
  }
}`,...(v=(k=i.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var E,D,I;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    defaultValue: {
      country: 'US',
      number: '555'
    },
    error: 'Enter a full phone number'
  }
}`,...(I=(D=d.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var P,T,W,L,U;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    defaultValue: '+91 98765 43210',
    locked: true
  }
}`,...(W=(T=s.parameters)==null?void 0:T.docs)==null?void 0:W.source},description:{story:"Held: a directory-managed person's phone - disabled with the lock, and the country closed too.",...(U=(L=s.parameters)==null?void 0:L.docs)==null?void 0:U.description}}};var F,H,M;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    defaultValue: {
      country: 'DE',
      number: '030 1234567'
    },
    disabled: true
  }
}`,...(M=(H=l.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var O,_,A,B,G;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    defaultValue: {
      country: '',
      number: ''
    }
  }
}`,...(A=(_=a.parameters)==null?void 0:_.docs)==null?void 0:A.source},description:{story:"No country chosen yet: a dash in the tile, the generic format.",...(G=(B=a.parameters)==null?void 0:B.docs)==null?void 0:G.description}}};var R,q,J;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <PhoneInput {...args} size="sm" label="Small" />
      <PhoneInput {...args} size="md" label="Medium" />
      <PhoneInput {...args} size="lg" label="Large" />
    </div>
}`,...(J=(q=m.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};const Ue=["Default","Controlled","FromString","WithHelperText","WithError","Locked","Disabled","NoCountry","Sizes"];export{o as Controlled,c as Default,l as Disabled,t as FromString,s as Locked,a as NoCountry,m as Sizes,d as WithError,i as WithHelperText,Ue as __namedExportsOrder,Le as default};
//# sourceMappingURL=PhoneInput.stories-BZNUFK5N.js.map
