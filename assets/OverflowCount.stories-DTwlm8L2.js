import{j as t}from"./iframe-BbiOq-r-.js";import{O as x}from"./OverflowCount-Dg4-J27_.js";import{B as a}from"./Badge-BDlIM5QY.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CcRgbaMz.js";import"./Tooltip-BZi0zBVg.js";import"./index-CqjkyW53.js";import"./index-CaF1tktN.js";import"./index-CSsJcwE_.js";import"./index-CSvFHHO3.js";import"./index-rpxRR4p4.js";import"./index-Drhy73Tu.js";import"./index-B-6biim1.js";import"./index-D1HLm8M_.js";import"./index-CIhRJmj7.js";import"./index-DUylKu2o.js";import"./index-wEiajLQ4.js";import"./index-sbsVsEZG.js";import"./index-QrbG077a.js";import"./index-DqXkLkHP.js";import"./index-ChEho857.js";const R={title:"New Components/OverflowCount",component:x,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:['The quiet "+N" after the values a row has room for — scopes, teams, members, roles.',"Ported from the console's MoreCount (2026-10-13).","","**The value wears the badge; the counter does not.** It is muted 12px text with no pill,",`drawn exactly like the "+N" inside the Table's TagList. Hover or focus it and an instant`,"tooltip lists the hidden values. When only the number is known, the tooltip says what it","counts instead. Nothing renders at zero.","","| Prop | What it does |","| --- | --- |","| `items` | the hidden values; the tooltip lists them, and their number is the N |","| `count` | the N, when it is known but the values are not (wins over `items.length`) |",'| `label` | what it counts, shown when there is no list · default "More assigned" |'].join(`
`)}}},args:{items:["Network","Security","Billing"]}},s={},r={name:"Count only",args:{items:void 0,count:12,label:"More members"}},o={name:"Long list (scrolls past seven)",args:{items:["Platform","Network","Security","Billing","Support","Facilities","Legal","Finance","Marketing"]}},e={name:"After badges",render:y=>t.jsxs("span",{className:"mdt-inline-flex mdt-items-center mdt-gap-1",children:[t.jsx(a,{size:"sm",shape:"square",children:"Support"}),t.jsx(a,{size:"sm",shape:"square",children:"Platform"}),t.jsx(x,{...y})]})};var n,i,m;s.parameters={...s.parameters,docs:{...(n=s.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(m=(i=s.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var p,l,c;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'Count only',
  args: {
    items: undefined,
    count: 12,
    label: 'More members'
  }
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,u,h;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Long list (scrolls past seven)',
  args: {
    items: ['Platform', 'Network', 'Security', 'Billing', 'Support', 'Facilities', 'Legal', 'Finance', 'Marketing']
  }
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var g,f,w,b,v;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'After badges',
  render: args => <span className="mdt-inline-flex mdt-items-center mdt-gap-1">
      <Badge size="sm" shape="square">
        Support
      </Badge>
      <Badge size="sm" shape="square">
        Platform
      </Badge>
      <OverflowCount {...args} />
    </span>
}`,...(w=(f=e.parameters)==null?void 0:f.docs)==null?void 0:w.source},description:{story:"In place: two values wear the badge, the counter stays quiet.",...(v=(b=e.parameters)==null?void 0:b.docs)==null?void 0:v.description}}};const G=["Default","CountOnly","LongList","AfterBadges"];export{e as AfterBadges,r as CountOnly,s as Default,o as LongList,G as __namedExportsOrder,R as default};
//# sourceMappingURL=OverflowCount.stories-DTwlm8L2.js.map
