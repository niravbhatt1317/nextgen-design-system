import{j as e,r as i}from"./iframe-D3L_AnZa.js";import{S as a}from"./Select-Cw5hx8pZ.js";import{c as q}from"./index-CcRgbaMz.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CvHgjhhl.js";import"./index-DRUA48A3.js";import"./index-BdSqhxDN.js";import"./index-BdQq_4o_.js";import"./index-aJxLFKE2.js";import"./index-DkkbFPYq.js";import"./index-CIRsCgyy.js";import"./index-C8XH1Saf.js";import"./index-CFyXC-WR.js";import"./index-CfH6n4xF.js";import"./index-retS0xqV.js";import"./Combination-DR26Rniv.js";import"./index-C4-KIcLT.js";import"./index-B7fcxO3w.js";import"./index-B2qj-pDA.js";import"./index-B_-eZSry.js";import"./index-DgxxNiGX.js";import"./index-Ct5FMcLs.js";import"./index-CPMGFkTY.js";import"./index-A1AWFnZD.js";import"./Icon-BcXiq_tR.js";import"./HoverCard-DZ4HywWm.js";const na={title:"New Components/Select",component:a,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A versatile select component for single and multiple value selection with search, grouping, and performance features."}},a11y:{config:{rules:[{id:"nested-interactive",enabled:!1}]}}},decorators:[l=>e.jsx("div",{style:{width:"400px"},children:e.jsx(l,{})})],argTypes:{options:{control:"object",description:"Array of selectable options",table:{type:{summary:"SelectOption[]"}}},value:{control:"object",description:"Currently selected value(s) - string for single, string[] for multiple",table:{type:{summary:"string | string[] | null"}}},onChange:{action:"changed",description:"Callback when selection changes",table:{type:{summary:"(value: string | string[] | null) => void"}}},mode:{control:"select",options:["single","multiple"],description:"Selection mode - single or multiple values",table:{defaultValue:{summary:"single"}}},placeholder:{control:"text",description:"Placeholder text when no value selected",table:{type:{summary:"string"}}},label:{control:"text",description:"Label text displayed above the select",table:{type:{summary:"string"}}},helperText:{control:"text",description:"Helper text displayed below the select",table:{type:{summary:"string"}}},error:{control:"text",description:"Error message - displays error state when provided",table:{type:{summary:"string"}}},size:{control:"select",options:["sm","md","lg"],description:"Size variant of the select",table:{defaultValue:{summary:"md"}}},variant:{control:"select",options:["default","borderless"],description:"Trigger border variant - default has border, borderless shows border on hover only",table:{defaultValue:{summary:"default"}}},placement:{control:"select",options:["bottom","overlay"],description:"Options placement - bottom appears below trigger, overlay appears over trigger hiding it",table:{defaultValue:{summary:"bottom"}}},disabled:{control:"boolean",description:"Whether the select is disabled",table:{defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Whether the field is required (shows asterisk)",table:{defaultValue:{summary:"false"}}},clearable:{control:"boolean",description:"Shows clear button to reset selection",table:{defaultValue:{summary:"false"}}},loading:{control:"boolean",description:"Shows loading state",table:{defaultValue:{summary:"false"}}},searchable:{control:"boolean",description:"Enables search/filter functionality",table:{defaultValue:{summary:"false"}}},searchPlaceholder:{control:"text",description:"Placeholder text for search input",table:{type:{summary:"string"}}},onSearch:{action:"searched",description:"Callback when search value changes",table:{type:{summary:"(searchTerm: string) => void"}}},showPills:{control:"boolean",description:"Shows selected values as pills/chips (multi-select)",table:{defaultValue:{summary:"false"}}},maxPills:{control:"number",description:'Maximum pills to display before showing "+N more"',table:{type:{summary:"number"}}},selectAll:{control:"boolean",description:'Shows "Select All" option (multi-select)',table:{defaultValue:{summary:"false"}}},pillHoverCard:{control:"boolean",description:"Enable hover card on pills (multi-select)",table:{defaultValue:{summary:"false"}}},onRemovePill:{action:"pill-removed",description:"Handler when pill is removed",table:{type:{summary:"(value: string) => void"}}},grouped:{control:"boolean",description:"Enables option grouping (requires group property in options)",table:{defaultValue:{summary:"false"}}},showSelectedOnTop:{control:"boolean",description:"Shows selected items at the top with a visual separator",table:{defaultValue:{summary:"false"}}},virtual:{control:"boolean",description:"Enables virtual scrolling for large datasets (1000+ items)",table:{defaultValue:{summary:"false"}}},itemHeight:{control:"number",description:"Height of each item in pixels (required for virtual scrolling)",table:{defaultValue:{summary:"40"}}},renderTrigger:{control:!1,description:"Custom render function for the trigger/input area",table:{type:{summary:"(props: TriggerRenderProps) => ReactNode"}}},renderItem:{control:!1,description:"Custom render function for each option item",table:{type:{summary:"(props: SelectItemRenderProps) => ReactNode"}}},renderValue:{control:!1,description:"Custom render function for value display",table:{type:{summary:"(option: SelectOption) => ReactNode"}}},renderPillHoverCard:{control:!1,description:"Custom render function for pill hover cards",table:{type:{summary:"(props: SelectPillHoverCardRenderProps) => ReactNode"}}},prefixIcon:{control:!1,description:"Prefix icon for trigger",table:{type:{summary:"ReactNode"}}},showAvatar:{control:"boolean",description:"Show avatar in options",table:{defaultValue:{summary:"false"}}},closeOnSelect:{control:"boolean",description:"Close dropdown on selection (single-select default: true)",table:{defaultValue:{summary:"true"}}},autoFocus:{control:"boolean",description:"Auto-focus search on open",table:{defaultValue:{summary:"false"}}},position:{control:"select",options:["popper","item-aligned"],description:"Position of dropdown",table:{defaultValue:{summary:"popper"}}},maxHeight:{control:"number",description:"Maximum height of dropdown in pixels",table:{type:{summary:"number"}}},emptyMessage:{control:"text",description:"Empty message text when no options",table:{type:{summary:"string"}}},renderEmpty:{control:!1,description:"Custom empty state renderer",table:{type:{summary:"() => ReactNode"}}},renderError:{control:!1,description:"Custom error state renderer",table:{type:{summary:"(error: Error) => ReactNode"}}},sortOptions:{control:!1,description:"Custom sort function for options",table:{type:{summary:"(a: SelectOption, b: SelectOption) => number"}}},filterFn:{control:!1,description:"Custom filter function for search",table:{type:{summary:"(option: SelectOption, query: string) => boolean"}}},searchDebounce:{control:"number",description:"Search debounce delay in milliseconds",table:{type:{summary:"number"}}},wrapperClassName:{control:"text",description:"Custom CSS classes for the wrapper",table:{type:{summary:"string"}}},onOpen:{action:"opened",description:"Callback when dropdown opens",table:{type:{summary:"() => void"}}},onClose:{action:"closed",description:"Callback when dropdown closes",table:{type:{summary:"() => void"}}},onFocus:{action:"focused",description:"Callback when select receives focus",table:{type:{summary:"() => void"}}},onBlur:{action:"blurred",description:"Callback when select loses focus",table:{type:{summary:"() => void"}}},loadMore:{action:"load-more",description:"Load more handler for infinite scroll",table:{type:{summary:"() => Promise<void>"}}},hasMore:{control:"boolean",description:"Whether more items can be loaded",table:{defaultValue:{summary:"false"}}},onLoadOptions:{action:"load-options",description:"Async options loader",table:{type:{summary:"(query: string) => Promise<SelectOption[]>"}}},className:{control:"text",description:"Custom CSS classes for the container",table:{type:{summary:"string"}}},name:{control:"text",description:"Name attribute for form integration",table:{type:{summary:"string"}}},id:{control:"text",description:"ID attribute for the select",table:{type:{summary:"string"}}},"aria-label":{control:"text",description:"Accessibility label",table:{type:{summary:"string"}}},"aria-describedby":{control:"text",description:"ARIA described by",table:{type:{summary:"string"}}},"aria-invalid":{control:"boolean",description:"ARIA invalid state",table:{type:{summary:"boolean"}}}}},H=[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"in",label:"India"},{value:"au",label:"Australia"}],o=[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"orange",label:"Orange"},{value:"grape",label:"Grape"},{value:"mango",label:"Mango"}],G=[{value:"critical",label:"Critical",icon:e.jsx("span",{children:"🔴"})},{value:"high",label:"High",icon:e.jsx("span",{children:"🟠"})},{value:"medium",label:"Medium",icon:e.jsx("span",{children:"🟡"})},{value:"low",label:"Low",icon:e.jsx("span",{children:"🟢"})}],I=[{value:"1",label:"John Doe",avatar:"https://i.pravatar.cc/150?img=1"},{value:"2",label:"Jane Smith",avatar:"https://i.pravatar.cc/150?img=2"},{value:"3",label:"Mike Johnson",avatar:"https://i.pravatar.cc/150?img=3"},{value:"4",label:"Sarah Williams",avatar:"https://i.pravatar.cc/150?img=4"}],c={args:{options:H,placeholder:"Select country","aria-label":"Country selection"}},m={args:{options:o,placeholder:"Choose your favorite",label:"Favorite Fruit",helperText:"This helps us personalize your experience"}},p={args:{options:o,placeholder:"Select...",label:"Required Field",error:"This field is required",required:!0}},u={args:{options:o,size:"sm",placeholder:"Small size","aria-label":"Small size select"}},h={args:{options:o,size:"md",placeholder:"Medium size","aria-label":"Medium size select"}},g={args:{options:o,size:"lg",placeholder:"Large size","aria-label":"Large size select"}},b={args:{options:G,label:"Priority",placeholder:"Select priority"}},v={args:{options:I,label:"Assign to",placeholder:"Select team member"}},y={args:{options:I,label:"Search Team Members",searchable:!0,searchPlaceholder:"Type to search..."}},f={args:{mode:"multiple",options:o,label:"Select Fruits",placeholder:"Choose multiple fruits",showPills:!0,maxPills:3}},x={args:{mode:"multiple",options:I,label:"Team Members",searchable:!0,clearable:!0,showPills:!0,selectAll:!0}},S={render:function(){const[r,s]=i.useState(["1","3"]);return e.jsx(a,{mode:"multiple",options:I,value:r,onChange:t=>{s(t)},label:"Team Members with Details",showPills:!0,pillHoverCard:!0,renderPillHoverCard:({option:t})=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3",children:[t.avatar&&e.jsx("img",{src:t.avatar,alt:t.label,className:"mdt-h-12 mdt-w-12 mdt-rounded-full"}),e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-font-semibold",children:t.label}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Team Member"})]})]}),e.jsx("div",{className:"mdt-text-xs mdt-text-muted-foreground",children:e.jsx("p",{children:"Click the X to remove from selection"})})]})})}},w={render:function(){const[r,s]=i.useState(null),t=[{value:"basic",label:"Basic Plan",description:"For individuals and small teams"},{value:"pro",label:"Pro Plan",description:"For growing teams and businesses"},{value:"enterprise",label:"Enterprise Plan",description:"For large organizations"}];return e.jsx(a,{options:t,value:r,onChange:n=>{s(n)},placeholder:"Select plan...",label:"Subscription Plan"})}},C={render:function(){const[r,s]=i.useState([]);return e.jsx(a,{mode:"multiple",options:G,value:r,onChange:t=>{s(t)},placeholder:"Select priorities...",label:"Priority Filters",selectAll:!0,clearable:!0,showPills:!0})}},j={render:function(){const[r,s]=i.useState(["apple","banana"]);return e.jsx(a,{mode:"multiple",options:o,value:r,onChange:t=>{s(t)},placeholder:"Select fruits...",label:"Fruits (count display)",showPills:!1,clearable:!0})}},N={args:{mode:"multiple",options:[{value:"apple",label:"Apple",group:"Fruits"},{value:"banana",label:"Banana",group:"Fruits"},{value:"carrot",label:"Carrot",group:"Vegetables"},{value:"broccoli",label:"Broccoli",group:"Vegetables"},{value:"chicken",label:"Chicken",group:"Protein"},{value:"fish",label:"Fish",group:"Protein"}],label:"Grocery Items",grouped:!0,showPills:!0}},P={args:{options:o,label:"Disabled Field",disabled:!0}},V={args:{options:[],label:"Loading Data",loading:!0}},M={args:{options:Array.from({length:1e3},(l,r)=>({value:String(r),label:`Item ${String(r+1)}`})),label:"1000 Items with Virtual Scroll",searchable:!0,virtual:!0,itemHeight:40}},O={render:function(){const[r,s]=i.useState("in");return e.jsx(a,{options:H,value:r,onChange:t=>{s(t)},label:"Country",placeholder:"Select country",clearable:!0})}},T={args:{options:H,label:"Country",placeholder:"Select country",required:!0}},B={render:()=>e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsx(a,{options:o,size:"sm",placeholder:"Small","aria-label":"Small select"}),e.jsx(a,{options:o,size:"md",placeholder:"Medium (default)","aria-label":"Medium select"}),e.jsx(a,{options:o,size:"lg",placeholder:"Large","aria-label":"Large select"})]})},R={render:()=>e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-text-muted-foreground",children:"Default (with border)"}),e.jsx(a,{options:o,variant:"default",placeholder:"Select fruit...","aria-label":"Default variant select"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-text-muted-foreground",children:"Borderless (border on hover)"}),e.jsx(a,{options:o,variant:"borderless",placeholder:"Select fruit...","aria-label":"Borderless variant select"})]})]})},W={render:function(){const[r,s]=i.useState("apple");return e.jsxs("div",{className:"mdt-space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Single Select - Borderless"}),e.jsx(a,{variant:"borderless",options:o,value:r,onChange:t=>{s(t)},placeholder:"Select fruit...","aria-label":"Borderless single select"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"With Label - Borderless"}),e.jsx(a,{variant:"borderless",options:o,label:"Favorite Fruit",placeholder:"Select fruit...","aria-label":"Borderless with label"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Clearable - Borderless"}),e.jsx(a,{variant:"borderless",options:o,clearable:!0,placeholder:"Select fruit...","aria-label":"Borderless clearable"})]})]})}},z={render:function(){const[r,s]=i.useState("apple"),[t,n]=i.useState(["apple","banana"]);return e.jsxs("div",{className:"mdt-space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Single Select - Overlay Placement"}),e.jsx(a,{placement:"overlay",options:o,value:r,onChange:d=>{s(d)},placeholder:"Select fruit...","aria-label":"Overlay placement single select"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Multi Select - Overlay Placement"}),e.jsx(a,{mode:"multiple",placement:"overlay",options:o,value:t,onChange:d=>{n(d)},placeholder:"Select fruits...",showPills:!0,"aria-label":"Overlay placement multi select"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Borderless + Overlay (Clean Look)"}),e.jsx(a,{variant:"borderless",placement:"overlay",options:o,placeholder:"Select fruit...","aria-label":"Borderless with overlay"})]})]})}},k={render:function(){const[r,s]=i.useState(["apple","banana","orange"]);return e.jsx(a,{mode:"multiple",options:o,value:r,onChange:t=>{s(t)},renderTrigger:({selectedOptions:t,placeholder:n,open:d})=>e.jsxs("button",{type:"button","aria-label":"Select fruits",className:q("mdt-flex mdt-h-10 mdt-w-full mdt-items-center mdt-justify-between","mdt-rounded-lg mdt-border-2 mdt-border-primary mdt-bg-primary/10","mdt-px-4 mdt-text-sm mdt-font-medium",d&&"mdt-ring-2 mdt-ring-primary mdt-ring-offset-2"),children:[t.length>0?e.jsxs("span",{className:"mdt-text-primary",children:[t.length," fruits selected"]}):e.jsx("span",{className:"mdt-text-muted-foreground",children:n}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:q("mdt-transition-transform",d&&"mdt-rotate-180"),"aria-hidden":"true",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})})]})})}},A={render:function(){const[r,s]=i.useState([]);return e.jsx(a,{mode:"multiple",options:I,value:r,onChange:t=>{s(t)},label:"Custom Item Renderer",renderItem:({option:t,selected:n,disabled:d})=>e.jsxs("div",{className:q("mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-p-3","mdt-transition-colors",n&&"mdt-border mdt-border-primary mdt-bg-primary/10",!n&&"mdt-hover:bg-accent",d&&"mdt-cursor-not-allowed mdt-opacity-50"),children:[t.avatar&&e.jsx("img",{src:t.avatar,alt:t.label,className:"mdt-h-10 mdt-w-10 mdt-rounded-full"}),e.jsxs("div",{className:"mdt-flex-1",children:[e.jsx("div",{className:"mdt-font-medium",children:t.label}),t.description&&e.jsx("div",{className:"mdt-text-xs mdt-text-muted-foreground",children:t.description})]}),n&&e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"mdt-text-primary","aria-hidden":"true",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})})]})})}},Rr=()=>{const[l,r]=i.useState("2"),s=[{value:"1",label:"Natasha Manglore",avatar:"https://i.pravatar.cc/150?img=1"},{value:"2",label:"John Doe",avatar:"https://i.pravatar.cc/150?img=2"},{value:"3",label:"Liam Johnson",avatar:"https://i.pravatar.cc/150?img=3"},{value:"4",label:"Chloe Bennett",avatar:"https://i.pravatar.cc/150?img=4"},{value:"5",label:"Olivia Hart",avatar:"https://i.pravatar.cc/150?img=5"},{value:"6",label:"Emma Garcia",avatar:"https://i.pravatar.cc/150?img=6"},{value:"7",label:"Nina Parker",avatar:"https://i.pravatar.cc/150?img=7"}];return e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"With showSelectedOnTop"}),e.jsx(a,{mode:"single",options:s,value:l,onChange:t=>{r(t)},placeholder:"Select user...","aria-label":"Select user with showSelectedOnTop",showAvatar:!0,showSelectedOnTop:!0}),e.jsx("p",{className:"mdt-mt-2 mdt-text-xs mdt-text-muted-foreground",children:"Selected item appears at the top with a separator line"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Without showSelectedOnTop (default)"}),e.jsx(a,{mode:"single",options:s,value:l,onChange:t=>{r(t)},placeholder:"Select user...","aria-label":"Select user without showSelectedOnTop",showAvatar:!0}),e.jsx("p",{className:"mdt-mt-2 mdt-text-xs mdt-text-muted-foreground",children:"Items maintain their original order"})]})]})},L={render:()=>e.jsx(Rr,{}),parameters:{docs:{description:{story:"Use `showSelectedOnTop={true}` to display the selected item at the top of the dropdown with a visual separator. This makes it easy to see the current selection."}}}},Wr=()=>{const[l,r]=i.useState(["high","medium"]),s=[{value:"critical",label:"Critical",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-red-500"})},{value:"high",label:"High",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-orange-500"})},{value:"medium",label:"Medium",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-blue-500"})},{value:"low",label:"Low",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-gray-400"})},{value:"none",label:"None",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-border-2 mdt-border-gray-300"})}];return e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"With showSelectedOnTop"}),e.jsx(a,{mode:"multiple",options:s,value:l,onChange:t=>{r(t)},placeholder:"Select priorities...",showPills:!0,showSelectedOnTop:!0}),e.jsxs("p",{className:"mdt-mt-2 mdt-text-xs mdt-text-muted-foreground",children:["Selected: ",l.length," item",l.length!==1?"s":""]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Without showSelectedOnTop (default)"}),e.jsx(a,{mode:"multiple",options:s,value:l,onChange:t=>{r(t)},placeholder:"Select priorities...",showPills:!0}),e.jsx("p",{className:"mdt-mt-2 mdt-text-xs mdt-text-muted-foreground",children:"Items maintain their original order"})]})]})},D={render:()=>e.jsx(Wr,{}),parameters:{docs:{description:{story:"In multi-select mode, `showSelectedOnTop={true}` groups all selected items at the top with a separator. Perfect for quickly seeing all your selections."}}}},zr=()=>{const[l,r]=i.useState("high"),s=[{value:"critical",label:"Critical",icon:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"mdt-text-red-500","aria-hidden":"true",children:[e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),e.jsx("line",{x1:"4",x2:"4",y1:"22",y2:"15"})]})},{value:"high",label:"High",icon:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"mdt-text-orange-500","aria-hidden":"true",children:[e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),e.jsx("line",{x1:"4",x2:"4",y1:"22",y2:"15"})]})},{value:"medium",label:"Medium",icon:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"mdt-text-blue-500","aria-hidden":"true",children:[e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),e.jsx("line",{x1:"4",x2:"4",y1:"22",y2:"15"})]})},{value:"low",label:"Low",icon:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"mdt-text-gray-400","aria-hidden":"true",children:[e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),e.jsx("line",{x1:"4",x2:"4",y1:"22",y2:"15"})]})}];return e.jsx(a,{mode:"single",options:s,value:l,onChange:t=>{r(t)},placeholder:"Change priority",showSelectedOnTop:!0,label:"Issue Priority",helperText:"Selected priority appears at the top for easy access"})},E={render:()=>e.jsx(zr,{}),parameters:{docs:{description:{story:"Real-world example: Priority selector with colored flag icons. The selected priority stays at the top, matching the design from your screenshot."}}}},F={render:()=>e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsx(a,{options:H,label:"Country",placeholder:"Select country",required:!0,helperText:"Select your country of residence"}),e.jsx(a,{options:G,label:"Priority",placeholder:"Select priority"}),e.jsx(a,{mode:"multiple",options:o,label:"Interests",placeholder:"Select your interests",showPills:!0,maxPills:2})]})};var J,U,_,X,$;c.parameters={...c.parameters,docs:{...(J=c.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    options: countries,
    placeholder: 'Select country',
    'aria-label': 'Country selection'
  }
}`,...(_=(U=c.parameters)==null?void 0:U.docs)==null?void 0:_.source},description:{story:"Default single-select dropdown.",...($=(X=c.parameters)==null?void 0:X.docs)==null?void 0:$.description}}};var K,Q,Y,Z,ee;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    options: fruits,
    placeholder: 'Choose your favorite',
    label: 'Favorite Fruit',
    helperText: 'This helps us personalize your experience'
  }
}`,...(Y=(Q=m.parameters)==null?void 0:Q.docs)==null?void 0:Y.source},description:{story:"Select with label and helper text.",...(ee=(Z=m.parameters)==null?void 0:Z.docs)==null?void 0:ee.description}}};var te,re,ae,se,le;p.parameters={...p.parameters,docs:{...(te=p.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    options: fruits,
    placeholder: 'Select...',
    label: 'Required Field',
    error: 'This field is required',
    required: true
  }
}`,...(ae=(re=p.parameters)==null?void 0:re.docs)==null?void 0:ae.source},description:{story:"Error state with validation message.",...(le=(se=p.parameters)==null?void 0:se.docs)==null?void 0:le.description}}};var oe,ie,ne,de,ce;u.parameters={...u.parameters,docs:{...(oe=u.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    options: fruits,
    size: 'sm',
    placeholder: 'Small size',
    'aria-label': 'Small size select'
  }
}`,...(ne=(ie=u.parameters)==null?void 0:ie.docs)==null?void 0:ne.source},description:{story:"Small size variant.",...(ce=(de=u.parameters)==null?void 0:de.docs)==null?void 0:ce.description}}};var me,pe,ue,he,ge;h.parameters={...h.parameters,docs:{...(me=h.parameters)==null?void 0:me.docs,source:{originalSource:`{
  args: {
    options: fruits,
    size: 'md',
    placeholder: 'Medium size',
    'aria-label': 'Medium size select'
  }
}`,...(ue=(pe=h.parameters)==null?void 0:pe.docs)==null?void 0:ue.source},description:{story:"Medium size variant (default).",...(ge=(he=h.parameters)==null?void 0:he.docs)==null?void 0:ge.description}}};var be,ve,ye,fe,xe;g.parameters={...g.parameters,docs:{...(be=g.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    options: fruits,
    size: 'lg',
    placeholder: 'Large size',
    'aria-label': 'Large size select'
  }
}`,...(ye=(ve=g.parameters)==null?void 0:ve.docs)==null?void 0:ye.source},description:{story:"Large size variant.",...(xe=(fe=g.parameters)==null?void 0:fe.docs)==null?void 0:xe.description}}};var Se,we,Ce,je,Ne;b.parameters={...b.parameters,docs:{...(Se=b.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  args: {
    options: priorities,
    label: 'Priority',
    placeholder: 'Select priority'
  }
}`,...(Ce=(we=b.parameters)==null?void 0:we.docs)==null?void 0:Ce.source},description:{story:"Options with icon indicators.",...(Ne=(je=b.parameters)==null?void 0:je.docs)==null?void 0:Ne.description}}};var Pe,Ve,Me,Oe,Te;v.parameters={...v.parameters,docs:{...(Pe=v.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  args: {
    options: teamMembers,
    label: 'Assign to',
    placeholder: 'Select team member'
  }
}`,...(Me=(Ve=v.parameters)==null?void 0:Ve.docs)==null?void 0:Me.source},description:{story:"Options with user avatars.",...(Te=(Oe=v.parameters)==null?void 0:Oe.docs)==null?void 0:Te.description}}};var Be,Re,We,ze,ke;y.parameters={...y.parameters,docs:{...(Be=y.parameters)==null?void 0:Be.docs,source:{originalSource:`{
  args: {
    options: teamMembers,
    label: 'Search Team Members',
    searchable: true,
    searchPlaceholder: 'Type to search...'
  }
}`,...(We=(Re=y.parameters)==null?void 0:Re.docs)==null?void 0:We.source},description:{story:"Searchable select for filtering options.",...(ke=(ze=y.parameters)==null?void 0:ze.docs)==null?void 0:ke.description}}};var Ae,Fe,Ie,Le,De;f.parameters={...f.parameters,docs:{...(Ae=f.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  args: {
    mode: 'multiple',
    options: fruits,
    label: 'Select Fruits',
    placeholder: 'Choose multiple fruits',
    showPills: true,
    maxPills: 3
  }
}`,...(Ie=(Fe=f.parameters)==null?void 0:Fe.docs)==null?void 0:Ie.source},description:{story:"Multi-select mode with pills display.",...(De=(Le=f.parameters)==null?void 0:Le.docs)==null?void 0:De.description}}};var Ee,He,qe,Ge,Je;x.parameters={...x.parameters,docs:{...(Ee=x.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    mode: 'multiple',
    options: teamMembers,
    label: 'Team Members',
    searchable: true,
    clearable: true,
    showPills: true,
    selectAll: true
  }
}`,...(qe=(He=x.parameters)==null?void 0:He.docs)==null?void 0:qe.source},description:{story:"Multi-select with search and select all features.",...(Je=(Ge=x.parameters)==null?void 0:Ge.docs)==null?void 0:Je.description}}};var Ue,_e,Xe,$e,Ke;S.parameters={...S.parameters,docs:{...(Ue=S.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  render: function RenderPillHoverCards() {
    const [value, setValue] = useState<string[]>(['1', '3']);
    return <Select mode="multiple" options={teamMembers} value={value} onChange={val => {
      setValue(val as string[]);
    }} label="Team Members with Details" showPills pillHoverCard renderPillHoverCard={({
      option
    }) => <div className="mdt-flex mdt-flex-col mdt-gap-2">
            <div className="mdt-flex mdt-items-center mdt-gap-3">
              {option.avatar && <img src={option.avatar} alt={option.label} className="mdt-h-12 mdt-w-12 mdt-rounded-full" />}
              <div>
                <h4 className="mdt-font-semibold">{option.label}</h4>
                <p className="mdt-text-sm mdt-text-muted-foreground">Team Member</p>
              </div>
            </div>
            <div className="mdt-text-xs mdt-text-muted-foreground">
              <p>Click the X to remove from selection</p>
            </div>
          </div>} />;
  }
}`,...(Xe=(_e=S.parameters)==null?void 0:_e.docs)==null?void 0:Xe.source},description:{story:"Pills with hover cards showing detailed information.",...(Ke=($e=S.parameters)==null?void 0:$e.docs)==null?void 0:Ke.description}}};var Qe,Ye,Ze,et,tt;w.parameters={...w.parameters,docs:{...(Qe=w.parameters)==null?void 0:Qe.docs,source:{originalSource:`{
  render: function RenderWithDescriptions() {
    const [value, setValue] = useState<string | null>(null);
    const optionsWithDesc: SelectOption[] = [{
      value: 'basic',
      label: 'Basic Plan',
      description: 'For individuals and small teams'
    }, {
      value: 'pro',
      label: 'Pro Plan',
      description: 'For growing teams and businesses'
    }, {
      value: 'enterprise',
      label: 'Enterprise Plan',
      description: 'For large organizations'
    }];
    return <Select options={optionsWithDesc} value={value} onChange={val => {
      setValue(val as string);
    }} placeholder="Select plan..." label="Subscription Plan" />;
  }
}`,...(Ze=(Ye=w.parameters)==null?void 0:Ye.docs)==null?void 0:Ze.source},description:{story:"Options with descriptions for detailed information.",...(tt=(et=w.parameters)==null?void 0:et.docs)==null?void 0:tt.description}}};var rt,at,st,lt,ot;C.parameters={...C.parameters,docs:{...(rt=C.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  render: function RenderMultiSelectWithSelectAll() {
    const [value, setValue] = useState<string[]>([]);
    return <Select mode="multiple" options={priorities} value={value} onChange={val => {
      setValue(val as string[]);
    }} placeholder="Select priorities..." label="Priority Filters" selectAll clearable showPills />;
  }
}`,...(st=(at=C.parameters)==null?void 0:at.docs)==null?void 0:st.source},description:{story:"Multi-select with select all checkbox.",...(ot=(lt=C.parameters)==null?void 0:lt.docs)==null?void 0:ot.description}}};var it,nt,dt,ct,mt;j.parameters={...j.parameters,docs:{...(it=j.parameters)==null?void 0:it.docs,source:{originalSource:`{
  render: function RenderMultiSelectWithoutPills() {
    const [value, setValue] = useState<string[]>(['apple', 'banana']);
    return <Select mode="multiple" options={fruits} value={value} onChange={val => {
      setValue(val as string[]);
    }} placeholder="Select fruits..." label="Fruits (count display)" showPills={false} clearable />;
  }
}`,...(dt=(nt=j.parameters)==null?void 0:nt.docs)==null?void 0:dt.source},description:{story:"Multi-select without pills showing count.",...(mt=(ct=j.parameters)==null?void 0:ct.docs)==null?void 0:mt.description}}};var pt,ut,ht,gt,bt;N.parameters={...N.parameters,docs:{...(pt=N.parameters)==null?void 0:pt.docs,source:{originalSource:`{
  args: {
    mode: 'multiple',
    options: [{
      value: 'apple',
      label: 'Apple',
      group: 'Fruits'
    }, {
      value: 'banana',
      label: 'Banana',
      group: 'Fruits'
    }, {
      value: 'carrot',
      label: 'Carrot',
      group: 'Vegetables'
    }, {
      value: 'broccoli',
      label: 'Broccoli',
      group: 'Vegetables'
    }, {
      value: 'chicken',
      label: 'Chicken',
      group: 'Protein'
    }, {
      value: 'fish',
      label: 'Fish',
      group: 'Protein'
    }],
    label: 'Grocery Items',
    grouped: true,
    showPills: true
  }
}`,...(ht=(ut=N.parameters)==null?void 0:ut.docs)==null?void 0:ht.source},description:{story:"Grouped options by category.",...(bt=(gt=N.parameters)==null?void 0:gt.docs)==null?void 0:bt.description}}};var vt,yt,ft,xt,St;P.parameters={...P.parameters,docs:{...(vt=P.parameters)==null?void 0:vt.docs,source:{originalSource:`{
  args: {
    options: fruits,
    label: 'Disabled Field',
    disabled: true
  }
}`,...(ft=(yt=P.parameters)==null?void 0:yt.docs)==null?void 0:ft.source},description:{story:"Disabled state.",...(St=(xt=P.parameters)==null?void 0:xt.docs)==null?void 0:St.description}}};var wt,Ct,jt,Nt,Pt;V.parameters={...V.parameters,docs:{...(wt=V.parameters)==null?void 0:wt.docs,source:{originalSource:`{
  args: {
    options: [],
    label: 'Loading Data',
    loading: true
  }
}`,...(jt=(Ct=V.parameters)==null?void 0:Ct.docs)==null?void 0:jt.source},description:{story:"Loading state while fetching data.",...(Pt=(Nt=V.parameters)==null?void 0:Nt.docs)==null?void 0:Pt.description}}};var Vt,Mt,Ot,Tt,Bt;M.parameters={...M.parameters,docs:{...(Vt=M.parameters)==null?void 0:Vt.docs,source:{originalSource:`{
  args: {
    options: Array.from({
      length: 1000
    }, (_, i) => ({
      value: String(i),
      label: \`Item \${String(i + 1)}\`
    })),
    label: '1000 Items with Virtual Scroll',
    searchable: true,
    virtual: true,
    itemHeight: 40
  }
}`,...(Ot=(Mt=M.parameters)==null?void 0:Mt.docs)==null?void 0:Ot.source},description:{story:"Virtual scrolling for large datasets (1000+ items).",...(Bt=(Tt=M.parameters)==null?void 0:Tt.docs)==null?void 0:Bt.description}}};var Rt,Wt,zt,kt,At;O.parameters={...O.parameters,docs:{...(Rt=O.parameters)==null?void 0:Rt.docs,source:{originalSource:`{
  render: function RenderClearable() {
    const [value, setValue] = useState<string | null>('in');
    return <Select options={countries} value={value} onChange={val => {
      setValue(val as string);
    }} label="Country" placeholder="Select country" clearable />;
  }
}`,...(zt=(Wt=O.parameters)==null?void 0:Wt.docs)==null?void 0:zt.source},description:{story:"Clearable select with clear button.",...(At=(kt=O.parameters)==null?void 0:kt.docs)==null?void 0:At.description}}};var Ft,It,Lt,Dt,Et;T.parameters={...T.parameters,docs:{...(Ft=T.parameters)==null?void 0:Ft.docs,source:{originalSource:`{
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Select country',
    required: true
  }
}`,...(Lt=(It=T.parameters)==null?void 0:It.docs)==null?void 0:Lt.source},description:{story:"Required field indicator.",...(Et=(Dt=T.parameters)==null?void 0:Dt.docs)==null?void 0:Et.description}}};var Ht,qt,Gt,Jt,Ut;B.parameters={...B.parameters,docs:{...(Ht=B.parameters)==null?void 0:Ht.docs,source:{originalSource:`{
  render: () => <div className="mdt-space-y-4">
      <Select options={fruits} size="sm" placeholder="Small" aria-label="Small select" />
      <Select options={fruits} size="md" placeholder="Medium (default)" aria-label="Medium select" />
      <Select options={fruits} size="lg" placeholder="Large" aria-label="Large select" />
    </div>
}`,...(Gt=(qt=B.parameters)==null?void 0:qt.docs)==null?void 0:Gt.source},description:{story:"All size variants displayed together.",...(Ut=(Jt=B.parameters)==null?void 0:Jt.docs)==null?void 0:Ut.description}}};var _t,Xt,$t,Kt,Qt;R.parameters={...R.parameters,docs:{...(_t=R.parameters)==null?void 0:_t.docs,source:{originalSource:`{
  render: () => <div className="mdt-space-y-4">
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-text-muted-foreground">Default (with border)</p>
        <Select options={fruits} variant="default" placeholder="Select fruit..." aria-label="Default variant select" />
      </div>
      <div>
        <p className="mdt-mb-2 mdt-text-sm mdt-text-muted-foreground">
          Borderless (border on hover)
        </p>
        <Select options={fruits} variant="borderless" placeholder="Select fruit..." aria-label="Borderless variant select" />
      </div>
    </div>
}`,...($t=(Xt=R.parameters)==null?void 0:Xt.docs)==null?void 0:$t.source},description:{story:"Trigger variants - default has visible border, borderless shows border only on hover.",...(Qt=(Kt=R.parameters)==null?void 0:Kt.docs)==null?void 0:Qt.description}}};var Yt,Zt,er,tr,rr;W.parameters={...W.parameters,docs:{...(Yt=W.parameters)==null?void 0:Yt.docs,source:{originalSource:`{
  render: function RenderBorderlessExample() {
    const [value, setValue] = useState<string | null>('apple');
    return <div className="mdt-space-y-6">
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">Single Select - Borderless</h3>
          <Select variant="borderless" options={fruits} value={value} onChange={val => {
          setValue(val as string | null);
        }} placeholder="Select fruit..." aria-label="Borderless single select" />
        </div>
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">With Label - Borderless</h3>
          <Select variant="borderless" options={fruits} label="Favorite Fruit" placeholder="Select fruit..." aria-label="Borderless with label" />
        </div>
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">Clearable - Borderless</h3>
          <Select variant="borderless" options={fruits} clearable placeholder="Select fruit..." aria-label="Borderless clearable" />
        </div>
      </div>;
  }
}`,...(er=(Zt=W.parameters)==null?void 0:Zt.docs)==null?void 0:er.source},description:{story:"Borderless variant example - clean appearance with border and chevron appearing on hover.",...(rr=(tr=W.parameters)==null?void 0:tr.docs)==null?void 0:rr.description}}};var ar,sr,lr,or,ir;z.parameters={...z.parameters,docs:{...(ar=z.parameters)==null?void 0:ar.docs,source:{originalSource:`{
  render: function RenderOverlayPlacement() {
    const [singleValue, setSingleValue] = useState<string | null>('apple');
    const [multiValue, setMultiValue] = useState<string[]>(['apple', 'banana']);
    return <div className="mdt-space-y-6">
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">
            Single Select - Overlay Placement
          </h3>
          <Select placement="overlay" options={fruits} value={singleValue} onChange={val => {
          setSingleValue(val as string | null);
        }} placeholder="Select fruit..." aria-label="Overlay placement single select" />
        </div>
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">Multi Select - Overlay Placement</h3>
          <Select mode="multiple" placement="overlay" options={fruits} value={multiValue} onChange={val => {
          setMultiValue(val as string[]);
        }} placeholder="Select fruits..." showPills aria-label="Overlay placement multi select" />
        </div>
        <div>
          <h3 className="mdt-mb-2 mdt-text-sm mdt-font-medium">
            Borderless + Overlay (Clean Look)
          </h3>
          <Select variant="borderless" placement="overlay" options={fruits} placeholder="Select fruit..." aria-label="Borderless with overlay" />
        </div>
      </div>;
  }
}`,...(lr=(sr=z.parameters)==null?void 0:sr.docs)==null?void 0:lr.source},description:{story:"Overlay placement - options appear over the trigger, hiding it.",...(ir=(or=z.parameters)==null?void 0:or.docs)==null?void 0:ir.description}}};var nr,dr,cr,mr,pr;k.parameters={...k.parameters,docs:{...(nr=k.parameters)==null?void 0:nr.docs,source:{originalSource:`{
  render: function RenderCustomTrigger() {
    const [value, setValue] = useState<string[]>(['apple', 'banana', 'orange']);
    return <Select mode="multiple" options={fruits} value={value} onChange={val => {
      setValue(val as string[]);
    }} renderTrigger={({
      selectedOptions,
      placeholder,
      open
    }) => <button type="button" aria-label="Select fruits" className={cn('mdt-flex mdt-h-10 mdt-w-full mdt-items-center mdt-justify-between', 'mdt-rounded-lg mdt-border-2 mdt-border-primary mdt-bg-primary/10', 'mdt-px-4 mdt-text-sm mdt-font-medium', open && 'mdt-ring-2 mdt-ring-primary mdt-ring-offset-2')}>
            {selectedOptions.length > 0 ? <span className="mdt-text-primary">{selectedOptions.length} fruits selected</span> : <span className="mdt-text-muted-foreground">{placeholder}</span>}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn('mdt-transition-transform', open && 'mdt-rotate-180')} aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>} />;
  }
}`,...(cr=(dr=k.parameters)==null?void 0:dr.docs)==null?void 0:cr.source},description:{story:"Custom trigger renderer for complete control over appearance.",...(pr=(mr=k.parameters)==null?void 0:mr.docs)==null?void 0:pr.description}}};var ur,hr,gr,br,vr;A.parameters={...A.parameters,docs:{...(ur=A.parameters)==null?void 0:ur.docs,source:{originalSource:`{
  render: function RenderCustomItem() {
    const [value, setValue] = useState<string[]>([]);
    return <Select mode="multiple" options={teamMembers} value={value} onChange={val => {
      setValue(val as string[]);
    }} label="Custom Item Renderer" renderItem={({
      option,
      selected,
      disabled
    }) => <div className={cn('mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-p-3', 'mdt-transition-colors', selected && 'mdt-border mdt-border-primary mdt-bg-primary/10', !selected && 'mdt-hover:bg-accent', disabled && 'mdt-cursor-not-allowed mdt-opacity-50')}>
            {option.avatar && <img src={option.avatar} alt={option.label} className="mdt-h-10 mdt-w-10 mdt-rounded-full" />}
            <div className="mdt-flex-1">
              <div className="mdt-font-medium">{option.label}</div>
              {option.description && <div className="mdt-text-xs mdt-text-muted-foreground">{option.description}</div>}
            </div>
            {selected && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mdt-text-primary" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>}
          </div>} />;
  }
}`,...(gr=(hr=A.parameters)==null?void 0:hr.docs)==null?void 0:gr.source},description:{story:"Custom item renderer for rich option display.",...(vr=(br=A.parameters)==null?void 0:br.docs)==null?void 0:vr.description}}};var yr,fr,xr;L.parameters={...L.parameters,docs:{...(yr=L.parameters)==null?void 0:yr.docs,source:{originalSource:`{
  render: () => <SelectedOnTopSingleComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Use \`showSelectedOnTop={true}\` to display the selected item at the top of the dropdown with a visual separator. This makes it easy to see the current selection.'
      }
    }
  }
}`,...(xr=(fr=L.parameters)==null?void 0:fr.docs)==null?void 0:xr.source}}};var Sr,wr,Cr;D.parameters={...D.parameters,docs:{...(Sr=D.parameters)==null?void 0:Sr.docs,source:{originalSource:`{
  render: () => <SelectedOnTopMultipleComponent />,
  parameters: {
    docs: {
      description: {
        story: 'In multi-select mode, \`showSelectedOnTop={true}\` groups all selected items at the top with a separator. Perfect for quickly seeing all your selections.'
      }
    }
  }
}`,...(Cr=(wr=D.parameters)==null?void 0:wr.docs)==null?void 0:Cr.source}}};var jr,Nr,Pr;E.parameters={...E.parameters,docs:{...(jr=E.parameters)==null?void 0:jr.docs,source:{originalSource:`{
  render: () => <PrioritySelectorComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Priority selector with colored flag icons. The selected priority stays at the top, matching the design from your screenshot.'
      }
    }
  }
}`,...(Pr=(Nr=E.parameters)==null?void 0:Nr.docs)==null?void 0:Pr.source}}};var Vr,Mr,Or,Tr,Br;F.parameters={...F.parameters,docs:{...(Vr=F.parameters)==null?void 0:Vr.docs,source:{originalSource:`{
  render: () => <div className="mdt-space-y-4">
      <Select options={countries} label="Country" placeholder="Select country" required helperText="Select your country of residence" />
      <Select options={priorities} label="Priority" placeholder="Select priority" />
      <Select mode="multiple" options={fruits} label="Interests" placeholder="Select your interests" showPills maxPills={2} />
    </div>
}`,...(Or=(Mr=F.parameters)==null?void 0:Mr.docs)==null?void 0:Or.source},description:{story:"Form integration example with multiple fields.",...(Br=(Tr=F.parameters)==null?void 0:Tr.docs)==null?void 0:Br.description}}};const da=["Default","WithLabel","WithError","Small","Medium","Large","WithIcons","WithAvatars","Searchable","MultiSelect","MultiSelectAdvanced","PillHoverCards","WithDescriptions","MultiSelectWithSelectAll","MultiSelectWithoutPills","Grouped","Disabled","Loading","VirtualScrolling","Clearable","Required","AllSizes","TriggerVariants","BorderlessExample","OverlayPlacement","CustomTrigger","CustomItem","SelectedOnTopSingle","SelectedOnTopMultiple","PrioritySelector","FormExample"];export{B as AllSizes,W as BorderlessExample,O as Clearable,A as CustomItem,k as CustomTrigger,c as Default,P as Disabled,F as FormExample,N as Grouped,g as Large,V as Loading,h as Medium,f as MultiSelect,x as MultiSelectAdvanced,C as MultiSelectWithSelectAll,j as MultiSelectWithoutPills,z as OverlayPlacement,S as PillHoverCards,E as PrioritySelector,T as Required,y as Searchable,D as SelectedOnTopMultiple,L as SelectedOnTopSingle,u as Small,R as TriggerVariants,M as VirtualScrolling,v as WithAvatars,w as WithDescriptions,p as WithError,b as WithIcons,m as WithLabel,da as __namedExportsOrder,na as default};
//# sourceMappingURL=Select.stories-Bq0depJV.js.map
