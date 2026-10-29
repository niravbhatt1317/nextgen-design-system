import{j as e,r as i}from"./iframe-CY4JUnHh.js";import{S as s}from"./Select-BEs0Mzn5.js";import{c as J}from"./index-CcRgbaMz.js";import{I as Gr}from"./Icon-CI6J2VGR.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./picked-row-BGnBNViw.js";import"./index-Cwd7YI1w.js";import"./index-CtBQFXvl.js";import"./index-CKi-M4HB.js";import"./index-BdQq_4o_.js";import"./index-Br73_tbo.js";import"./index-D9vJgNhO.js";import"./index-Ck6-Byz6.js";import"./index-DIFpWrw4.js";import"./index-BRkX9Um-.js";import"./index-BTonuK9m.js";import"./index-DysLJa87.js";import"./index-CJxBv3Vd.js";import"./index-Da6p0Idl.js";import"./index-Bk2bjM1K.js";import"./index-CTFXRmHb.js";import"./index-BvZ9dBnX.js";import"./index-DIQAGLxS.js";import"./index-DpXoWGRf.js";import"./index-Chb3yN5O.js";import"./index-o9jlw0U-.js";import"./Input-Dm9lJKZt.js";import"./HoverCard-D0Vs3YHd.js";const Pa={title:"New Components/Select",component:s,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A versatile select component for single and multiple value selection with search, grouping, and performance features."}},a11y:{config:{rules:[{id:"nested-interactive",enabled:!1}]}}},decorators:[l=>e.jsx("div",{style:{width:"400px"},children:e.jsx(l,{})})],argTypes:{options:{control:"object",description:"Array of selectable options",table:{type:{summary:"SelectOption[]"}}},value:{control:"object",description:"Currently selected value(s) - string for single, string[] for multiple",table:{type:{summary:"string | string[] | null"}}},onChange:{action:"changed",description:"Callback when selection changes",table:{type:{summary:"(value: string | string[] | null) => void"}}},mode:{control:"select",options:["single","multiple"],description:"Selection mode - single or multiple values",table:{defaultValue:{summary:"single"}}},placeholder:{control:"text",description:"Placeholder text when no value selected",table:{type:{summary:"string"}}},label:{control:"text",description:"Label text displayed above the select",table:{type:{summary:"string"}}},helperText:{control:"text",description:"Helper text displayed below the select",table:{type:{summary:"string"}}},error:{control:"text",description:"Error message - displays error state when provided",table:{type:{summary:"string"}}},size:{control:"select",options:["sm","md","lg"],description:"Size variant of the select",table:{defaultValue:{summary:"md"}}},variant:{control:"select",options:["default","borderless"],description:"Trigger border variant - default has border, borderless shows border on hover only",table:{defaultValue:{summary:"default"}}},placement:{control:"select",options:["bottom","overlay"],description:"Options placement - bottom appears below trigger, overlay appears over trigger hiding it",table:{defaultValue:{summary:"bottom"}}},disabled:{control:"boolean",description:"Whether the select is disabled",table:{defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Whether the field is required (shows asterisk)",table:{defaultValue:{summary:"false"}}},clearable:{control:"boolean",description:"Shows clear button to reset selection",table:{defaultValue:{summary:"false"}}},loading:{control:"boolean",description:"Shows loading state",table:{defaultValue:{summary:"false"}}},searchable:{control:"boolean",description:"Enables search/filter functionality",table:{defaultValue:{summary:"false"}}},searchPlaceholder:{control:"text",description:"Placeholder text for search input",table:{type:{summary:"string"}}},onSearch:{action:"searched",description:"Callback when search value changes",table:{type:{summary:"(searchTerm: string) => void"}}},showPills:{control:"boolean",description:"Shows selected values as pills/chips (multi-select)",table:{defaultValue:{summary:"false"}}},maxPills:{control:"number",description:'Maximum pills to display before showing "+N more"',table:{type:{summary:"number"}}},selectAll:{control:"boolean",description:'Shows "Select All" option (multi-select)',table:{defaultValue:{summary:"false"}}},pillHoverCard:{control:"boolean",description:"Enable hover card on pills (multi-select)",table:{defaultValue:{summary:"false"}}},onRemovePill:{action:"pill-removed",description:"Handler when pill is removed",table:{type:{summary:"(value: string) => void"}}},grouped:{control:"boolean",description:"Enables option grouping (requires group property in options)",table:{defaultValue:{summary:"false"}}},showSelectedOnTop:{control:"boolean",description:"Shows selected items at the top with a visual separator",table:{defaultValue:{summary:"false"}}},virtual:{control:"boolean",description:"Enables virtual scrolling for large datasets (1000+ items)",table:{defaultValue:{summary:"false"}}},itemHeight:{control:"number",description:"Height of each item in pixels (required for virtual scrolling)",table:{defaultValue:{summary:"40"}}},renderTrigger:{control:!1,description:"Custom render function for the trigger/input area",table:{type:{summary:"(props: TriggerRenderProps) => ReactNode"}}},renderItem:{control:!1,description:"Custom render function for each option item",table:{type:{summary:"(props: SelectItemRenderProps) => ReactNode"}}},renderValue:{control:!1,description:"Custom render function for value display",table:{type:{summary:"(option: SelectOption) => ReactNode"}}},renderPillHoverCard:{control:!1,description:"Custom render function for pill hover cards",table:{type:{summary:"(props: SelectPillHoverCardRenderProps) => ReactNode"}}},prefixIcon:{control:!1,description:"Prefix icon for trigger",table:{type:{summary:"ReactNode"}}},showAvatar:{control:"boolean",description:"Show avatar in options",table:{defaultValue:{summary:"false"}}},closeOnSelect:{control:"boolean",description:"Close dropdown on selection (single-select default: true)",table:{defaultValue:{summary:"true"}}},autoFocus:{control:"boolean",description:"Auto-focus search on open",table:{defaultValue:{summary:"false"}}},position:{control:"select",options:["popper","item-aligned"],description:"Position of dropdown",table:{defaultValue:{summary:"popper"}}},maxHeight:{control:"number",description:"Maximum height of dropdown in pixels",table:{type:{summary:"number"}}},emptyMessage:{control:"text",description:"Empty message text when no options",table:{type:{summary:"string"}}},renderEmpty:{control:!1,description:"Custom empty state renderer",table:{type:{summary:"() => ReactNode"}}},renderError:{control:!1,description:"Custom error state renderer",table:{type:{summary:"(error: Error) => ReactNode"}}},sortOptions:{control:!1,description:"Custom sort function for options",table:{type:{summary:"(a: SelectOption, b: SelectOption) => number"}}},filterFn:{control:!1,description:"Custom filter function for search",table:{type:{summary:"(option: SelectOption, query: string) => boolean"}}},searchDebounce:{control:"number",description:"Search debounce delay in milliseconds",table:{type:{summary:"number"}}},wrapperClassName:{control:"text",description:"Custom CSS classes for the wrapper",table:{type:{summary:"string"}}},onOpen:{action:"opened",description:"Callback when dropdown opens",table:{type:{summary:"() => void"}}},onClose:{action:"closed",description:"Callback when dropdown closes",table:{type:{summary:"() => void"}}},onFocus:{action:"focused",description:"Callback when select receives focus",table:{type:{summary:"() => void"}}},onBlur:{action:"blurred",description:"Callback when select loses focus",table:{type:{summary:"() => void"}}},loadMore:{action:"load-more",description:"Load more handler for infinite scroll",table:{type:{summary:"() => Promise<void>"}}},hasMore:{control:"boolean",description:"Whether more items can be loaded",table:{defaultValue:{summary:"false"}}},onLoadOptions:{action:"load-options",description:"Async options loader",table:{type:{summary:"(query: string) => Promise<SelectOption[]>"}}},className:{control:"text",description:"Custom CSS classes for the container",table:{type:{summary:"string"}}},name:{control:"text",description:"Name attribute for form integration",table:{type:{summary:"string"}}},id:{control:"text",description:"ID attribute for the select",table:{type:{summary:"string"}}},"aria-label":{control:"text",description:"Accessibility label",table:{type:{summary:"string"}}},"aria-describedby":{control:"text",description:"ARIA described by",table:{type:{summary:"string"}}},"aria-invalid":{control:"boolean",description:"ARIA invalid state",table:{type:{summary:"boolean"}}}}},G=[{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"},{value:"ca",label:"Canada"},{value:"in",label:"India"},{value:"au",label:"Australia"}],o=[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"orange",label:"Orange"},{value:"grape",label:"Grape"},{value:"mango",label:"Mango"}],U=[{value:"critical",label:"Critical",icon:e.jsx("span",{children:"🔴"})},{value:"high",label:"High",icon:e.jsx("span",{children:"🟠"})},{value:"medium",label:"Medium",icon:e.jsx("span",{children:"🟡"})},{value:"low",label:"Low",icon:e.jsx("span",{children:"🟢"})}],D=[{value:"1",label:"John Doe",avatar:"https://i.pravatar.cc/150?img=1"},{value:"2",label:"Jane Smith",avatar:"https://i.pravatar.cc/150?img=2"},{value:"3",label:"Mike Johnson",avatar:"https://i.pravatar.cc/150?img=3"},{value:"4",label:"Sarah Williams",avatar:"https://i.pravatar.cc/150?img=4"}],d={args:{options:G,placeholder:"Select country","aria-label":"Country selection"}},m={args:{options:o,placeholder:"Choose your favorite",label:"Favorite Fruit",helperText:"This helps us personalize your experience"}},p={args:{options:o,placeholder:"Select...",label:"Required Field",error:"This field is required",required:!0}},u={args:{options:o,size:"sm",placeholder:"Small size","aria-label":"Small size select"}},h={args:{options:o,size:"md",placeholder:"Medium size","aria-label":"Medium size select"}},g={args:{options:o,size:"lg",placeholder:"Large size","aria-label":"Large size select"}},b={args:{options:U,label:"Priority",placeholder:"Select priority"}},v={args:{options:D,label:"Assign to",placeholder:"Select team member"}},f={args:{options:D,label:"Search Team Members",searchable:!0,searchPlaceholder:"Type to search..."}},y={args:{mode:"multiple",options:o,label:"Select Fruits",placeholder:"Choose multiple fruits",showPills:!0,maxPills:3}},x={args:{mode:"multiple",options:D,label:"Team Members",searchable:!0,clearable:!0,showPills:!0,selectAll:!0}},S={render:function(){const[r,a]=i.useState(["1","3"]);return e.jsx(s,{mode:"multiple",options:D,value:r,onChange:t=>{a(t)},label:"Team Members with Details",showPills:!0,pillHoverCard:!0,renderPillHoverCard:({option:t})=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-3",children:[t.avatar&&e.jsx("img",{src:t.avatar,alt:t.label,className:"mdt-h-12 mdt-w-12 mdt-rounded-full"}),e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-font-semibold",children:t.label}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Team Member"})]})]}),e.jsx("div",{className:"mdt-text-xs mdt-text-muted-foreground",children:e.jsx("p",{children:"Click the X to remove from selection"})})]})})}},w={render:function(){const[r,a]=i.useState(null),t=[{value:"basic",label:"Basic Plan",description:"For individuals and small teams"},{value:"pro",label:"Pro Plan",description:"For growing teams and businesses"},{value:"enterprise",label:"Enterprise Plan",description:"For large organizations"}];return e.jsx(s,{options:t,value:r,onChange:n=>{a(n)},placeholder:"Select plan...",label:"Subscription Plan"})}},Jr=[{value:"auto",label:"Runs at once, without waiting for anyone to approve the change",description:"Default · nobody is asked before the change goes out to the fleet"},{value:"one",label:"One approver from the platform operations team",description:"6 people can approve"},{value:"two",label:"Two approvers, one of them from security and compliance",description:"11 people can approve"},{value:"owner",label:"The agent owner"}],Ur=[{value:"mum",label:"Mumbai data centre, rack row C (primary production)"},{value:"blr",label:"Bengaluru disaster-recovery site"},{value:"fra",label:"Frankfurt edge collectors"},{value:"sgp",label:"Singapore"},{value:"nyc",label:"New York branch office"}],C={render:function(){const[r,a]=i.useState("auto");return e.jsx("div",{style:{width:"240px"},children:e.jsx(s,{options:Jr,value:r,onChange:t=>{a(t)},label:"Approval",placeholder:"Pick who approves"})})}},j={render:function(){const[r,a]=i.useState(["mum","blr","fra","nyc"]);return e.jsx("div",{style:{width:"260px"},children:e.jsx(s,{mode:"multiple",options:Ur,value:r,onChange:t=>{a(t)},label:"Where it applies",placeholder:"Pick sites",showPills:!0,maxPills:1,clearable:!0})})}},P={render:function(){const[r,a]=i.useState([]);return e.jsx(s,{mode:"multiple",options:U,value:r,onChange:t=>{a(t)},placeholder:"Select priorities...",label:"Priority Filters",selectAll:!0,clearable:!0,showPills:!0})}},N={render:function(){const[r,a]=i.useState(["apple","banana"]);return e.jsx(s,{mode:"multiple",options:o,value:r,onChange:t=>{a(t)},placeholder:"Select fruits...",label:"Fruits (count display)",showPills:!1,clearable:!0})}},V={args:{mode:"multiple",options:[{value:"apple",label:"Apple",group:"Fruits"},{value:"banana",label:"Banana",group:"Fruits"},{value:"carrot",label:"Carrot",group:"Vegetables"},{value:"broccoli",label:"Broccoli",group:"Vegetables"},{value:"chicken",label:"Chicken",group:"Protein"},{value:"fish",label:"Fish",group:"Protein"}],label:"Grocery Items",grouped:!0,showPills:!0}},O={args:{options:o,label:"Disabled Field",disabled:!0}},M={args:{options:[],label:"Loading Data",loading:!0}},T={args:{options:Array.from({length:1e3},(l,r)=>({value:String(r),label:`Item ${String(r+1)}`})),label:"1000 Items with Virtual Scroll",searchable:!0,virtual:!0,itemHeight:40}},k={render:function(){const[r,a]=i.useState("in");return e.jsx(s,{options:G,value:r,onChange:t=>{a(t)},label:"Country",placeholder:"Select country",clearable:!0})}},R={args:{options:G,label:"Country",placeholder:"Select country",required:!0}},z={render:()=>e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsx(s,{options:o,size:"sm",placeholder:"Small","aria-label":"Small select"}),e.jsx(s,{options:o,size:"md",placeholder:"Medium (default)","aria-label":"Medium select"}),e.jsx(s,{options:o,size:"lg",placeholder:"Large","aria-label":"Large select"})]})},A={render:()=>e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsxs("div",{children:[e.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-text-muted-foreground",children:"Default (with border)"}),e.jsx(s,{options:o,variant:"default",placeholder:"Select fruit...","aria-label":"Default variant select"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"mdt-mb-2 mdt-text-sm mdt-text-muted-foreground",children:"Borderless (border on hover)"}),e.jsx(s,{options:o,variant:"borderless",placeholder:"Select fruit...","aria-label":"Borderless variant select"})]})]})},B={render:function(){const[r,a]=i.useState("apple");return e.jsxs("div",{className:"mdt-space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Single Select - Borderless"}),e.jsx(s,{variant:"borderless",options:o,value:r,onChange:t=>{a(t)},placeholder:"Select fruit...","aria-label":"Borderless single select"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"With Label - Borderless"}),e.jsx(s,{variant:"borderless",options:o,label:"Favorite Fruit",placeholder:"Select fruit...","aria-label":"Borderless with label"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Clearable - Borderless"}),e.jsx(s,{variant:"borderless",options:o,clearable:!0,placeholder:"Select fruit...","aria-label":"Borderless clearable"})]})]})}},W={render:function(){const[r,a]=i.useState("apple"),[t,n]=i.useState(["apple","banana"]);return e.jsxs("div",{className:"mdt-space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Single Select - Overlay Placement"}),e.jsx(s,{placement:"overlay",options:o,value:r,onChange:c=>{a(c)},placeholder:"Select fruit...","aria-label":"Overlay placement single select"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Multi Select - Overlay Placement"}),e.jsx(s,{mode:"multiple",placement:"overlay",options:o,value:t,onChange:c=>{n(c)},placeholder:"Select fruits...",showPills:!0,"aria-label":"Overlay placement multi select"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Borderless + Overlay (Clean Look)"}),e.jsx(s,{variant:"borderless",placement:"overlay",options:o,placeholder:"Select fruit...","aria-label":"Borderless with overlay"})]})]})}},F={render:function(){const[r,a]=i.useState(["apple","banana","orange"]);return e.jsx(s,{mode:"multiple",options:o,value:r,onChange:t=>{a(t)},renderTrigger:({selectedOptions:t,placeholder:n,open:c})=>e.jsxs("button",{type:"button","aria-label":"Select fruits",className:J("mdt-flex mdt-h-10 mdt-w-full mdt-items-center mdt-justify-between","mdt-rounded-lg mdt-border-2 mdt-border-primary mdt-bg-primary/10","mdt-px-4 mdt-text-sm mdt-font-medium",c&&"mdt-ring-2 mdt-ring-primary mdt-ring-offset-2"),children:[t.length>0?e.jsxs("span",{className:"mdt-text-primary",children:[t.length," fruits selected"]}):e.jsx("span",{className:"mdt-text-muted-foreground",children:n}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:J("mdt-transition-transform",c&&"mdt-rotate-180"),"aria-hidden":"true",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})})]})})}},L={render:function(){const[r,a]=i.useState([]);return e.jsx(s,{mode:"multiple",options:D,value:r,onChange:t=>{a(t)},label:"Custom Item Renderer",renderItem:({option:t,selected:n,disabled:c})=>e.jsxs("div",{className:J("mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-sm mdt-p-3","mdt-transition-colors",n?"mdt-bg-blue-10":"hover:mdt-bg-neutral-10",c&&"mdt-cursor-not-allowed mdt-opacity-50"),children:[t.avatar&&e.jsx("img",{src:t.avatar,alt:t.label,className:"mdt-h-10 mdt-w-10 mdt-rounded-full"}),e.jsxs("div",{className:"mdt-flex-1",children:[e.jsx("div",{className:"mdt-font-medium",children:t.label}),t.description&&e.jsx("div",{className:"mdt-text-xs mdt-text-muted-foreground",children:t.description})]}),e.jsx("span",{className:"mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center",children:n&&e.jsx(Gr,{name:"check",size:16,"aria-hidden":!0})})]})})}},_r=()=>{const[l,r]=i.useState("2"),a=[{value:"1",label:"Natasha Manglore",avatar:"https://i.pravatar.cc/150?img=1"},{value:"2",label:"John Doe",avatar:"https://i.pravatar.cc/150?img=2"},{value:"3",label:"Liam Johnson",avatar:"https://i.pravatar.cc/150?img=3"},{value:"4",label:"Chloe Bennett",avatar:"https://i.pravatar.cc/150?img=4"},{value:"5",label:"Olivia Hart",avatar:"https://i.pravatar.cc/150?img=5"},{value:"6",label:"Emma Garcia",avatar:"https://i.pravatar.cc/150?img=6"},{value:"7",label:"Nina Parker",avatar:"https://i.pravatar.cc/150?img=7"}];return e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"With showSelectedOnTop"}),e.jsx(s,{mode:"single",options:a,value:l,onChange:t=>{r(t)},placeholder:"Select user...","aria-label":"Select user with showSelectedOnTop",showAvatar:!0,showSelectedOnTop:!0}),e.jsx("p",{className:"mdt-mt-2 mdt-text-xs mdt-text-muted-foreground",children:"Selected item appears at the top with a separator line"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Without showSelectedOnTop (default)"}),e.jsx(s,{mode:"single",options:a,value:l,onChange:t=>{r(t)},placeholder:"Select user...","aria-label":"Select user without showSelectedOnTop",showAvatar:!0}),e.jsx("p",{className:"mdt-mt-2 mdt-text-xs mdt-text-muted-foreground",children:"Items maintain their original order"})]})]})},E={render:()=>e.jsx(_r,{}),parameters:{docs:{description:{story:"Use `showSelectedOnTop={true}` to display the selected item at the top of the dropdown with a visual separator. This makes it easy to see the current selection."}}}},Xr=()=>{const[l,r]=i.useState(["high","medium"]),a=[{value:"critical",label:"Critical",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-red-500"})},{value:"high",label:"High",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-orange-500"})},{value:"medium",label:"Medium",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-blue-500"})},{value:"low",label:"Low",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-bg-gray-400"})},{value:"none",label:"None",icon:e.jsx("div",{className:"mdt-h-4 mdt-w-4 mdt-rounded mdt-border-2 mdt-border-gray-300"})}];return e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"With showSelectedOnTop"}),e.jsx(s,{mode:"multiple",options:a,value:l,onChange:t=>{r(t)},placeholder:"Select priorities...",showPills:!0,showSelectedOnTop:!0}),e.jsxs("p",{className:"mdt-mt-2 mdt-text-xs mdt-text-muted-foreground",children:["Selected: ",l.length," item",l.length!==1?"s":""]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"mdt-mb-2 mdt-text-sm mdt-font-medium",children:"Without showSelectedOnTop (default)"}),e.jsx(s,{mode:"multiple",options:a,value:l,onChange:t=>{r(t)},placeholder:"Select priorities...",showPills:!0}),e.jsx("p",{className:"mdt-mt-2 mdt-text-xs mdt-text-muted-foreground",children:"Items maintain their original order"})]})]})},H={render:()=>e.jsx(Xr,{}),parameters:{docs:{description:{story:"In multi-select mode, `showSelectedOnTop={true}` groups all selected items at the top with a separator. Perfect for quickly seeing all your selections."}}}},$r=()=>{const[l,r]=i.useState("high"),a=[{value:"critical",label:"Critical",icon:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"mdt-text-red-500","aria-hidden":"true",children:[e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),e.jsx("line",{x1:"4",x2:"4",y1:"22",y2:"15"})]})},{value:"high",label:"High",icon:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"mdt-text-orange-500","aria-hidden":"true",children:[e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),e.jsx("line",{x1:"4",x2:"4",y1:"22",y2:"15"})]})},{value:"medium",label:"Medium",icon:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"mdt-text-blue-500","aria-hidden":"true",children:[e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),e.jsx("line",{x1:"4",x2:"4",y1:"22",y2:"15"})]})},{value:"low",label:"Low",icon:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"mdt-text-gray-400","aria-hidden":"true",children:[e.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),e.jsx("line",{x1:"4",x2:"4",y1:"22",y2:"15"})]})}];return e.jsx(s,{mode:"single",options:a,value:l,onChange:t=>{r(t)},placeholder:"Change priority",showSelectedOnTop:!0,label:"Issue Priority",helperText:"Selected priority appears at the top for easy access"})},q={render:()=>e.jsx($r,{}),parameters:{docs:{description:{story:"Real-world example: Priority selector with colored flag icons. The selected priority stays at the top, matching the design from your screenshot."}}}},I={render:()=>e.jsxs("div",{className:"mdt-space-y-4",children:[e.jsx(s,{options:G,label:"Country",placeholder:"Select country",required:!0,helperText:"Select your country of residence"}),e.jsx(s,{options:U,label:"Priority",placeholder:"Select priority"}),e.jsx(s,{mode:"multiple",options:o,label:"Interests",placeholder:"Select your interests",showPills:!0,maxPills:2})]})};var _,X,$,K,Y;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    options: countries,
    placeholder: 'Select country',
    'aria-label': 'Country selection'
  }
}`,...($=(X=d.parameters)==null?void 0:X.docs)==null?void 0:$.source},description:{story:"Default single-select dropdown.",...(Y=(K=d.parameters)==null?void 0:K.docs)==null?void 0:Y.description}}};var Q,Z,ee,te,re;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    options: fruits,
    placeholder: 'Choose your favorite',
    label: 'Favorite Fruit',
    helperText: 'This helps us personalize your experience'
  }
}`,...(ee=(Z=m.parameters)==null?void 0:Z.docs)==null?void 0:ee.source},description:{story:"Select with label and helper text.",...(re=(te=m.parameters)==null?void 0:te.docs)==null?void 0:re.description}}};var ae,se,le,oe,ie;p.parameters={...p.parameters,docs:{...(ae=p.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    options: fruits,
    placeholder: 'Select...',
    label: 'Required Field',
    error: 'This field is required',
    required: true
  }
}`,...(le=(se=p.parameters)==null?void 0:se.docs)==null?void 0:le.source},description:{story:"Error state with validation message.",...(ie=(oe=p.parameters)==null?void 0:oe.docs)==null?void 0:ie.description}}};var ne,ce,de,me,pe;u.parameters={...u.parameters,docs:{...(ne=u.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    options: fruits,
    size: 'sm',
    placeholder: 'Small size',
    'aria-label': 'Small size select'
  }
}`,...(de=(ce=u.parameters)==null?void 0:ce.docs)==null?void 0:de.source},description:{story:"Small size variant.",...(pe=(me=u.parameters)==null?void 0:me.docs)==null?void 0:pe.description}}};var ue,he,ge,be,ve;h.parameters={...h.parameters,docs:{...(ue=h.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    options: fruits,
    size: 'md',
    placeholder: 'Medium size',
    'aria-label': 'Medium size select'
  }
}`,...(ge=(he=h.parameters)==null?void 0:he.docs)==null?void 0:ge.source},description:{story:"Medium size variant (default).",...(ve=(be=h.parameters)==null?void 0:be.docs)==null?void 0:ve.description}}};var fe,ye,xe,Se,we;g.parameters={...g.parameters,docs:{...(fe=g.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    options: fruits,
    size: 'lg',
    placeholder: 'Large size',
    'aria-label': 'Large size select'
  }
}`,...(xe=(ye=g.parameters)==null?void 0:ye.docs)==null?void 0:xe.source},description:{story:"Large size variant.",...(we=(Se=g.parameters)==null?void 0:Se.docs)==null?void 0:we.description}}};var Ce,je,Pe,Ne,Ve;b.parameters={...b.parameters,docs:{...(Ce=b.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    options: priorities,
    label: 'Priority',
    placeholder: 'Select priority'
  }
}`,...(Pe=(je=b.parameters)==null?void 0:je.docs)==null?void 0:Pe.source},description:{story:"Options with icon indicators.",...(Ve=(Ne=b.parameters)==null?void 0:Ne.docs)==null?void 0:Ve.description}}};var Oe,Me,Te,ke,Re;v.parameters={...v.parameters,docs:{...(Oe=v.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    options: teamMembers,
    label: 'Assign to',
    placeholder: 'Select team member'
  }
}`,...(Te=(Me=v.parameters)==null?void 0:Me.docs)==null?void 0:Te.source},description:{story:"Options with user avatars.",...(Re=(ke=v.parameters)==null?void 0:ke.docs)==null?void 0:Re.description}}};var ze,Ae,Be,We,Fe;f.parameters={...f.parameters,docs:{...(ze=f.parameters)==null?void 0:ze.docs,source:{originalSource:`{
  args: {
    options: teamMembers,
    label: 'Search Team Members',
    searchable: true,
    searchPlaceholder: 'Type to search...'
  }
}`,...(Be=(Ae=f.parameters)==null?void 0:Ae.docs)==null?void 0:Be.source},description:{story:"Searchable select for filtering options.",...(Fe=(We=f.parameters)==null?void 0:We.docs)==null?void 0:Fe.description}}};var Le,Ie,De,Ee,He;y.parameters={...y.parameters,docs:{...(Le=y.parameters)==null?void 0:Le.docs,source:{originalSource:`{
  args: {
    mode: 'multiple',
    options: fruits,
    label: 'Select Fruits',
    placeholder: 'Choose multiple fruits',
    showPills: true,
    maxPills: 3
  }
}`,...(De=(Ie=y.parameters)==null?void 0:Ie.docs)==null?void 0:De.source},description:{story:"Multi-select mode with pills display.",...(He=(Ee=y.parameters)==null?void 0:Ee.docs)==null?void 0:He.description}}};var qe,Ge,Je,Ue,_e;x.parameters={...x.parameters,docs:{...(qe=x.parameters)==null?void 0:qe.docs,source:{originalSource:`{
  args: {
    mode: 'multiple',
    options: teamMembers,
    label: 'Team Members',
    searchable: true,
    clearable: true,
    showPills: true,
    selectAll: true
  }
}`,...(Je=(Ge=x.parameters)==null?void 0:Ge.docs)==null?void 0:Je.source},description:{story:"Multi-select with search and select all features.",...(_e=(Ue=x.parameters)==null?void 0:Ue.docs)==null?void 0:_e.description}}};var Xe,$e,Ke,Ye,Qe;S.parameters={...S.parameters,docs:{...(Xe=S.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
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
}`,...(Ke=($e=S.parameters)==null?void 0:$e.docs)==null?void 0:Ke.source},description:{story:"Pills with hover cards showing detailed information.",...(Qe=(Ye=S.parameters)==null?void 0:Ye.docs)==null?void 0:Qe.description}}};var Ze,et,tt,rt,at;w.parameters={...w.parameters,docs:{...(Ze=w.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
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
}`,...(tt=(et=w.parameters)==null?void 0:et.docs)==null?void 0:tt.source},description:{story:"Options with descriptions for detailed information.",...(at=(rt=w.parameters)==null?void 0:rt.docs)==null?void 0:at.description}}};var st,lt,ot,it,nt;C.parameters={...C.parameters,docs:{...(st=C.parameters)==null?void 0:st.docs,source:{originalSource:`{
  render: function RenderOneLineSingle() {
    const [value, setValue] = useState<string | null>('auto');
    return <div style={{
      width: '240px'
    }}>
        <Select options={approvalPolicies} value={value} onChange={val => {
        setValue(val as string);
      }} label="Approval" placeholder="Pick who approves" />
      </div>;
  }
}`,...(ot=(lt=C.parameters)==null?void 0:lt.docs)==null?void 0:ot.source},description:{story:`**One line, always.** A closed field shows the chosen label only - never its description - on one line, from the
left, ending in "…" when it does not fit. Open, the list is at least as wide as the field and grows to fit its
longest option up to 320; every option reads from the left on one line, its name 14/500 in the reading ink and its
description one step lighter, 2 below it.`,...(nt=(it=C.parameters)==null?void 0:it.docs)==null?void 0:nt.description}}};var ct,dt,mt,pt,ut;j.parameters={...j.parameters,docs:{...(ct=j.parameters)==null?void 0:ct.docs,source:{originalSource:`{
  render: function RenderOneLineMulti() {
    const [value, setValue] = useState<string[]>(['mum', 'blr', 'fra', 'nyc']);
    return <div style={{
      width: '260px'
    }}>
        <Select mode="multiple" options={fleetSites} value={value} onChange={val => {
        setValue(val as string[]);
      }} label="Where it applies" placeholder="Pick sites" showPills maxPills={1} clearable />
      </div>;
  }
}`,...(mt=(dt=j.parameters)==null?void 0:dt.docs)==null?void 0:mt.source},description:{story:'**A multi-pick never grows past its height.** One pick shows (`maxPills` is 1 by default), then "+N"; the pill\nshrinks to "…" and the "+N" never does. The open list follows the single list\'s width rule.',...(ut=(pt=j.parameters)==null?void 0:pt.docs)==null?void 0:ut.description}}};var ht,gt,bt,vt,ft;P.parameters={...P.parameters,docs:{...(ht=P.parameters)==null?void 0:ht.docs,source:{originalSource:`{
  render: function RenderMultiSelectWithSelectAll() {
    const [value, setValue] = useState<string[]>([]);
    return <Select mode="multiple" options={priorities} value={value} onChange={val => {
      setValue(val as string[]);
    }} placeholder="Select priorities..." label="Priority Filters" selectAll clearable showPills />;
  }
}`,...(bt=(gt=P.parameters)==null?void 0:gt.docs)==null?void 0:bt.source},description:{story:"Multi-select with select all checkbox.",...(ft=(vt=P.parameters)==null?void 0:vt.docs)==null?void 0:ft.description}}};var yt,xt,St,wt,Ct;N.parameters={...N.parameters,docs:{...(yt=N.parameters)==null?void 0:yt.docs,source:{originalSource:`{
  render: function RenderMultiSelectWithoutPills() {
    const [value, setValue] = useState<string[]>(['apple', 'banana']);
    return <Select mode="multiple" options={fruits} value={value} onChange={val => {
      setValue(val as string[]);
    }} placeholder="Select fruits..." label="Fruits (count display)" showPills={false} clearable />;
  }
}`,...(St=(xt=N.parameters)==null?void 0:xt.docs)==null?void 0:St.source},description:{story:"Multi-select without pills showing count.",...(Ct=(wt=N.parameters)==null?void 0:wt.docs)==null?void 0:Ct.description}}};var jt,Pt,Nt,Vt,Ot;V.parameters={...V.parameters,docs:{...(jt=V.parameters)==null?void 0:jt.docs,source:{originalSource:`{
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
}`,...(Nt=(Pt=V.parameters)==null?void 0:Pt.docs)==null?void 0:Nt.source},description:{story:"Grouped options by category.",...(Ot=(Vt=V.parameters)==null?void 0:Vt.docs)==null?void 0:Ot.description}}};var Mt,Tt,kt,Rt,zt;O.parameters={...O.parameters,docs:{...(Mt=O.parameters)==null?void 0:Mt.docs,source:{originalSource:`{
  args: {
    options: fruits,
    label: 'Disabled Field',
    disabled: true
  }
}`,...(kt=(Tt=O.parameters)==null?void 0:Tt.docs)==null?void 0:kt.source},description:{story:"Disabled state.",...(zt=(Rt=O.parameters)==null?void 0:Rt.docs)==null?void 0:zt.description}}};var At,Bt,Wt,Ft,Lt;M.parameters={...M.parameters,docs:{...(At=M.parameters)==null?void 0:At.docs,source:{originalSource:`{
  args: {
    options: [],
    label: 'Loading Data',
    loading: true
  }
}`,...(Wt=(Bt=M.parameters)==null?void 0:Bt.docs)==null?void 0:Wt.source},description:{story:"Loading state while fetching data.",...(Lt=(Ft=M.parameters)==null?void 0:Ft.docs)==null?void 0:Lt.description}}};var It,Dt,Et,Ht,qt;T.parameters={...T.parameters,docs:{...(It=T.parameters)==null?void 0:It.docs,source:{originalSource:`{
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
}`,...(Et=(Dt=T.parameters)==null?void 0:Dt.docs)==null?void 0:Et.source},description:{story:"Virtual scrolling for large datasets (1000+ items).",...(qt=(Ht=T.parameters)==null?void 0:Ht.docs)==null?void 0:qt.description}}};var Gt,Jt,Ut,_t,Xt;k.parameters={...k.parameters,docs:{...(Gt=k.parameters)==null?void 0:Gt.docs,source:{originalSource:`{
  render: function RenderClearable() {
    const [value, setValue] = useState<string | null>('in');
    return <Select options={countries} value={value} onChange={val => {
      setValue(val as string);
    }} label="Country" placeholder="Select country" clearable />;
  }
}`,...(Ut=(Jt=k.parameters)==null?void 0:Jt.docs)==null?void 0:Ut.source},description:{story:"Clearable select with clear button.",...(Xt=(_t=k.parameters)==null?void 0:_t.docs)==null?void 0:Xt.description}}};var $t,Kt,Yt,Qt,Zt;R.parameters={...R.parameters,docs:{...($t=R.parameters)==null?void 0:$t.docs,source:{originalSource:`{
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Select country',
    required: true
  }
}`,...(Yt=(Kt=R.parameters)==null?void 0:Kt.docs)==null?void 0:Yt.source},description:{story:"Required field indicator.",...(Zt=(Qt=R.parameters)==null?void 0:Qt.docs)==null?void 0:Zt.description}}};var er,tr,rr,ar,sr;z.parameters={...z.parameters,docs:{...(er=z.parameters)==null?void 0:er.docs,source:{originalSource:`{
  render: () => <div className="mdt-space-y-4">
      <Select options={fruits} size="sm" placeholder="Small" aria-label="Small select" />
      <Select options={fruits} size="md" placeholder="Medium (default)" aria-label="Medium select" />
      <Select options={fruits} size="lg" placeholder="Large" aria-label="Large select" />
    </div>
}`,...(rr=(tr=z.parameters)==null?void 0:tr.docs)==null?void 0:rr.source},description:{story:"All size variants displayed together.",...(sr=(ar=z.parameters)==null?void 0:ar.docs)==null?void 0:sr.description}}};var lr,or,ir,nr,cr;A.parameters={...A.parameters,docs:{...(lr=A.parameters)==null?void 0:lr.docs,source:{originalSource:`{
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
}`,...(ir=(or=A.parameters)==null?void 0:or.docs)==null?void 0:ir.source},description:{story:"Trigger variants - default has visible border, borderless shows border only on hover.",...(cr=(nr=A.parameters)==null?void 0:nr.docs)==null?void 0:cr.description}}};var dr,mr,pr,ur,hr;B.parameters={...B.parameters,docs:{...(dr=B.parameters)==null?void 0:dr.docs,source:{originalSource:`{
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
}`,...(pr=(mr=B.parameters)==null?void 0:mr.docs)==null?void 0:pr.source},description:{story:"Borderless variant example - clean appearance with border and chevron appearing on hover.",...(hr=(ur=B.parameters)==null?void 0:ur.docs)==null?void 0:hr.description}}};var gr,br,vr,fr,yr;W.parameters={...W.parameters,docs:{...(gr=W.parameters)==null?void 0:gr.docs,source:{originalSource:`{
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
}`,...(vr=(br=W.parameters)==null?void 0:br.docs)==null?void 0:vr.source},description:{story:"Overlay placement - options appear over the trigger, hiding it.",...(yr=(fr=W.parameters)==null?void 0:fr.docs)==null?void 0:yr.description}}};var xr,Sr,wr,Cr,jr;F.parameters={...F.parameters,docs:{...(xr=F.parameters)==null?void 0:xr.docs,source:{originalSource:`{
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
}`,...(wr=(Sr=F.parameters)==null?void 0:Sr.docs)==null?void 0:wr.source},description:{story:"Custom trigger renderer for complete control over appearance.",...(jr=(Cr=F.parameters)==null?void 0:Cr.docs)==null?void 0:jr.description}}};var Pr,Nr,Vr,Or,Mr;L.parameters={...L.parameters,docs:{...(Pr=L.parameters)==null?void 0:Pr.docs,source:{originalSource:`{
  render: function RenderCustomItem() {
    const [value, setValue] = useState<string[]>([]);
    return <Select mode="multiple" options={teamMembers} value={value} onChange={val => {
      setValue(val as string[]);
    }} label="Custom Item Renderer" renderItem={({
      option,
      selected,
      disabled
    }) => <div className={cn('mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-sm mdt-p-3', 'mdt-transition-colors', selected ? 'mdt-bg-blue-10' : 'hover:mdt-bg-neutral-10', disabled && 'mdt-cursor-not-allowed mdt-opacity-50')}>
            {option.avatar && <img src={option.avatar} alt={option.label} className="mdt-h-10 mdt-w-10 mdt-rounded-full" />}
            <div className="mdt-flex-1">
              <div className="mdt-font-medium">{option.label}</div>
              {option.description && <div className="mdt-text-xs mdt-text-muted-foreground">{option.description}</div>}
            </div>
            <span className="mdt-flex mdt-h-4 mdt-w-4 mdt-shrink-0 mdt-items-center mdt-justify-center">
              {selected && <Icon name="check" size={16} aria-hidden />}
            </span>
          </div>} />;
  }
}`,...(Vr=(Nr=L.parameters)==null?void 0:Nr.docs)==null?void 0:Vr.source},description:{story:`Custom item renderer for rich option display. A hand-drawn row still follows the one selection rule (Pranjal,
2026-10-21): the picked row on the pale blue-10 ground with the tick on the RIGHT in the reading ink; the row under
the pointer takes only the grey ground and no tick.`,...(Mr=(Or=L.parameters)==null?void 0:Or.docs)==null?void 0:Mr.description}}};var Tr,kr,Rr;E.parameters={...E.parameters,docs:{...(Tr=E.parameters)==null?void 0:Tr.docs,source:{originalSource:`{
  render: () => <SelectedOnTopSingleComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Use \`showSelectedOnTop={true}\` to display the selected item at the top of the dropdown with a visual separator. This makes it easy to see the current selection.'
      }
    }
  }
}`,...(Rr=(kr=E.parameters)==null?void 0:kr.docs)==null?void 0:Rr.source}}};var zr,Ar,Br;H.parameters={...H.parameters,docs:{...(zr=H.parameters)==null?void 0:zr.docs,source:{originalSource:`{
  render: () => <SelectedOnTopMultipleComponent />,
  parameters: {
    docs: {
      description: {
        story: 'In multi-select mode, \`showSelectedOnTop={true}\` groups all selected items at the top with a separator. Perfect for quickly seeing all your selections.'
      }
    }
  }
}`,...(Br=(Ar=H.parameters)==null?void 0:Ar.docs)==null?void 0:Br.source}}};var Wr,Fr,Lr;q.parameters={...q.parameters,docs:{...(Wr=q.parameters)==null?void 0:Wr.docs,source:{originalSource:`{
  render: () => <PrioritySelectorComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Priority selector with colored flag icons. The selected priority stays at the top, matching the design from your screenshot.'
      }
    }
  }
}`,...(Lr=(Fr=q.parameters)==null?void 0:Fr.docs)==null?void 0:Lr.source}}};var Ir,Dr,Er,Hr,qr;I.parameters={...I.parameters,docs:{...(Ir=I.parameters)==null?void 0:Ir.docs,source:{originalSource:`{
  render: () => <div className="mdt-space-y-4">
      <Select options={countries} label="Country" placeholder="Select country" required helperText="Select your country of residence" />
      <Select options={priorities} label="Priority" placeholder="Select priority" />
      <Select mode="multiple" options={fruits} label="Interests" placeholder="Select your interests" showPills maxPills={2} />
    </div>
}`,...(Er=(Dr=I.parameters)==null?void 0:Dr.docs)==null?void 0:Er.source},description:{story:"Form integration example with multiple fields.",...(qr=(Hr=I.parameters)==null?void 0:Hr.docs)==null?void 0:qr.description}}};const Na=["Default","WithLabel","WithError","Small","Medium","Large","WithIcons","WithAvatars","Searchable","MultiSelect","MultiSelectAdvanced","PillHoverCards","WithDescriptions","OneLineSingle","OneLineMulti","MultiSelectWithSelectAll","MultiSelectWithoutPills","Grouped","Disabled","Loading","VirtualScrolling","Clearable","Required","AllSizes","TriggerVariants","BorderlessExample","OverlayPlacement","CustomTrigger","CustomItem","SelectedOnTopSingle","SelectedOnTopMultiple","PrioritySelector","FormExample"];export{z as AllSizes,B as BorderlessExample,k as Clearable,L as CustomItem,F as CustomTrigger,d as Default,O as Disabled,I as FormExample,V as Grouped,g as Large,M as Loading,h as Medium,y as MultiSelect,x as MultiSelectAdvanced,P as MultiSelectWithSelectAll,N as MultiSelectWithoutPills,j as OneLineMulti,C as OneLineSingle,W as OverlayPlacement,S as PillHoverCards,q as PrioritySelector,R as Required,f as Searchable,H as SelectedOnTopMultiple,E as SelectedOnTopSingle,u as Small,A as TriggerVariants,T as VirtualScrolling,v as WithAvatars,w as WithDescriptions,p as WithError,b as WithIcons,m as WithLabel,Na as __namedExportsOrder,Pa as default};
//# sourceMappingURL=Select.stories-DwG85gCc.js.map
