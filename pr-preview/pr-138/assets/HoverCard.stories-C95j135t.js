import{j as e}from"./iframe-CTAb7qz-.js";import{H as t,a as r,b as d,c as ne}from"./HoverCard-CfFBggR5.js";import{B as s}from"./Button-ZDeSGOal.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CkVb7r8q.js";import"./index-xMUZoUI0.js";import"./index-CUeK7S-6.js";import"./index-CXe92F-1.js";import"./index-BSwYXGSM.js";import"./index-DXiRNgBT.js";import"./index-CMHELB6-.js";import"./index-Cnoe3ucP.js";import"./index-CRK5PluY.js";import"./index-BuJreCy5.js";import"./index-Bm6qN9_D.js";import"./index-CcRgbaMz.js";import"./index-ChEho857.js";const Ne={title:"Components/HoverCard",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"An accessible hover card component for displaying rich content on hover. Perfect for user profiles, previews, and contextual information."}}},argTypes:{defaultOpen:{control:"boolean",description:"The open state when initially rendered (uncontrolled)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},open:{control:"boolean",description:"Controlled open state of the hover card",table:{type:{summary:"boolean"}}},onOpenChange:{action:"openChanged",description:"Event handler called when the open state changes",table:{type:{summary:"(open: boolean) => void"}}},openDelay:{control:{type:"number",min:0,max:2e3,step:50},description:"The duration from when the mouse enters the trigger until the hover card opens",table:{type:{summary:"number"},defaultValue:{summary:"700"}}},closeDelay:{control:{type:"number",min:0,max:2e3,step:50},description:"The duration from when the mouse leaves the trigger or content until the hover card closes",table:{type:{summary:"number"},defaultValue:{summary:"300"}}},asChild:{control:"boolean",description:"Change the default rendered element for the one passed as a child, merging their props and behavior",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},className:{control:"text",description:'Custom CSS classes for styling the hover card content (e.g., "mdt-w-96" for width, "mdt-max-w-sm" for max-width)',table:{type:{summary:"string"}}},side:{control:{type:"select"},options:["top","right","bottom","left"],description:"The preferred side of the trigger to render against when open",table:{type:{summary:"'top' | 'right' | 'bottom' | 'left'"},defaultValue:{summary:"'bottom'"}}},sideOffset:{control:{type:"number",min:-50,max:50,step:1},description:"The distance in pixels from the trigger",table:{type:{summary:"number"},defaultValue:{summary:"4"}}},align:{control:{type:"select"},options:["start","center","end"],description:"The preferred alignment against the trigger",table:{type:{summary:"'start' | 'center' | 'end'"},defaultValue:{summary:"'center'"}}},alignOffset:{control:{type:"number",min:-50,max:50,step:1},description:'An offset in pixels from the "start" or "end" alignment options',table:{type:{summary:"number"},defaultValue:{summary:"0"}}},avoidCollisions:{control:"boolean",description:"When true, overrides the side and align preferences to prevent collisions with boundary edges",table:{type:{summary:"boolean"},defaultValue:{summary:"true"}}},collisionBoundary:{control:!1,description:"The element used as the collision boundary. By default this is the viewport",table:{type:{summary:"Element | null | (Element | null)[]"},defaultValue:{summary:"[]"}}},collisionPadding:{control:{type:"number",min:0,max:50,step:1},description:"The distance in pixels from the boundary edges where collision detection should occur",table:{type:{summary:"number | Partial<Record<Side, number>>"},defaultValue:{summary:"0"}}},arrowPadding:{control:{type:"number",min:0,max:20,step:1},description:"The padding between the arrow and the edges of the content",table:{type:{summary:"number"},defaultValue:{summary:"0"}}},sticky:{control:{type:"select"},options:["partial","always"],description:'The sticky behavior on the align axis. "partial" will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless',table:{type:{summary:"'partial' | 'always'"},defaultValue:{summary:"'partial'"}}},hideWhenDetached:{control:"boolean",description:"Whether to hide the content when the trigger becomes fully occluded",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},forceMount:{control:"boolean",description:"Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries",table:{type:{summary:"boolean"}}},container:{control:!1,description:"Specify a container element to portal the content into",table:{type:{summary:"HTMLElement"},defaultValue:{summary:"document.body"}}},arrowWidth:{control:{type:"number",min:5,max:30,step:1},description:"The width of the arrow in pixels",table:{type:{summary:"number"},defaultValue:{summary:"10"}}},arrowHeight:{control:{type:"number",min:3,max:20,step:1},description:"The height of the arrow in pixels",table:{type:{summary:"number"},defaultValue:{summary:"5"}}}}},n={render:()=>e.jsx("div",{className:"mdt-p-8",children:e.jsxs("p",{className:"mdt-text-sm",children:["Hover over"," ",e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx("span",{className:"mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80",children:"@nextjs"})}),e.jsx(d,{children:e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsx("div",{className:"mdt-flex mdt-h-12 mdt-w-12 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-primary mdt-text-primary-foreground",children:e.jsx("span",{className:"mdt-text-lg mdt-font-semibold",children:"N"})}),e.jsxs("div",{className:"mdt-space-y-1",children:[e.jsx("h4",{className:"mdt-text-sm mdt-font-semibold",children:"@nextjs"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"The React Framework - created and maintained by @vercel."}),e.jsx("div",{className:"mdt-flex mdt-items-center mdt-pt-2",children:e.jsx("span",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Joined December 2021"})})]})]})})]})," ","to see their profile."]})})},a={render:()=>e.jsx("div",{className:"mdt-p-8",children:e.jsxs("p",{className:"mdt-text-sm",children:["Check out"," ",e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx("span",{className:"mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80",children:"@shadcn"})}),e.jsx(d,{className:"mdt-w-80",children:e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsx("div",{className:"mdt-h-14 mdt-w-14 mdt-overflow-hidden mdt-rounded-full mdt-bg-muted",children:e.jsx("div",{className:"mdt-flex mdt-h-full mdt-w-full mdt-items-center mdt-justify-center mdt-bg-gradient-to-br mdt-from-purple-400 mdt-to-pink-600 mdt-text-white",children:e.jsx("span",{className:"mdt-text-xl mdt-font-bold",children:"S"})})}),e.jsxs("div",{className:"mdt-flex-1 mdt-space-y-1",children:[e.jsx("h4",{className:"mdt-text-sm mdt-font-semibold",children:"shadcn"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Building UI components with Radix UI and Tailwind CSS."}),e.jsxs("div",{className:"mdt-flex mdt-gap-4 mdt-pt-2 mdt-text-xs mdt-text-muted-foreground",children:[e.jsxs("div",{children:[e.jsx("span",{className:"mdt-font-semibold mdt-text-foreground",children:"2.5k"})," followers"]}),e.jsxs("div",{children:[e.jsx("span",{className:"mdt-font-semibold mdt-text-foreground",children:"312"})," following"]})]})]})]})})]}),"'s amazing work!"]})})},m={render:()=>e.jsx("div",{className:"mdt-flex mdt-items-center mdt-justify-center mdt-p-16",children:e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsxs("span",{className:"mdt-inline-flex mdt-cursor-help mdt-items-center mdt-gap-1 mdt-rounded mdt-border mdt-border-border mdt-bg-secondary mdt-px-3 mdt-py-2 mdt-text-sm mdt-font-medium hover:mdt-bg-secondary/80",children:["Hover for details",e.jsx("span",{className:"mdt-text-xs",children:"ⓘ"})]})}),e.jsxs(d,{children:[e.jsx(ne,{}),e.jsxs("div",{className:"mdt-space-y-2",children:[e.jsx("h4",{className:"mdt-font-semibold",children:"Feature Preview"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"This hover card includes an arrow pointing to the trigger element for better visual connection."})]})]})]})})},o={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-16",children:[e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Top"})}),e.jsx(d,{side:"top",children:e.jsx("p",{className:"mdt-text-sm",children:"Content appears above the trigger"})})]}),e.jsxs("div",{className:"mdt-flex mdt-gap-16",children:[e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Left"})}),e.jsx(d,{side:"left",children:e.jsx("p",{className:"mdt-text-sm",children:"Content appears on the left"})})]}),e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Right"})}),e.jsx(d,{side:"right",children:e.jsx("p",{className:"mdt-text-sm",children:"Content appears on the right"})})]})]}),e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Bottom (default)"})}),e.jsx(d,{side:"bottom",children:e.jsx("p",{className:"mdt-text-sm",children:"Content appears below the trigger"})})]})]})},i={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Align Start"})}),e.jsx(d,{align:"start",children:e.jsx("p",{className:"mdt-text-sm",children:"Aligned to the start of the trigger"})})]}),e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Align Center (default)"})}),e.jsx(d,{align:"center",children:e.jsx("p",{className:"mdt-text-sm",children:"Centered with the trigger"})})]}),e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Align End"})}),e.jsx(d,{align:"end",children:e.jsx("p",{className:"mdt-text-sm",children:"Aligned to the end of the trigger"})})]})]})},l={render:()=>e.jsxs("div",{className:"mdt-flex mdt-gap-4",children:[e.jsxs(t,{openDelay:100,closeDelay:100,children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Fast (100ms)"})}),e.jsxs(d,{children:[e.jsx("p",{className:"mdt-text-sm",children:"Opens and closes quickly"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"openDelay: 100ms, closeDelay: 100ms"})]})]}),e.jsxs(t,{openDelay:700,closeDelay:300,children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Default (700ms/300ms)"})}),e.jsxs(d,{children:[e.jsx("p",{className:"mdt-text-sm",children:"Standard timing"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"openDelay: 700ms, closeDelay: 300ms"})]})]}),e.jsxs(t,{openDelay:1500,closeDelay:500,children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Slow (1500ms/500ms)"})}),e.jsxs(d,{children:[e.jsx("p",{className:"mdt-text-sm",children:"Opens and closes slowly"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"openDelay: 1500ms, closeDelay: 500ms"})]})]})]})},c={render:()=>e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"link",children:"react"})}),e.jsx(d,{className:"mdt-w-80",children:e.jsxs("div",{className:"mdt-space-y-3",children:[e.jsxs("div",{className:"mdt-flex mdt-items-start mdt-gap-2",children:[e.jsx("div",{className:"mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-md mdt-bg-blue-500 mdt-text-white",children:e.jsx("span",{className:"mdt-text-lg mdt-font-bold",children:"R"})}),e.jsxs("div",{className:"mdt-flex-1",children:[e.jsx("h4",{className:"mdt-font-semibold",children:"facebook/react"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Public repository"})]})]}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"A declarative, efficient, and flexible JavaScript library for building user interfaces."}),e.jsxs("div",{className:"mdt-flex mdt-gap-4 mdt-text-xs mdt-text-muted-foreground",children:[e.jsxs("div",{className:"mdt-flex mdt-items-center mdt-gap-1",children:[e.jsx("span",{className:"mdt-h-2 mdt-w-2 mdt-rounded-full mdt-bg-blue-500"}),"TypeScript"]}),e.jsx("div",{children:"⭐ 220k"}),e.jsx("div",{children:"🔱 45k forks"})]})]})})]})},p={render:()=>e.jsx("div",{className:"mdt-max-w-md mdt-text-sm",children:e.jsxs("p",{children:["The project was created by"," ",e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx("span",{className:"mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80",children:"@john"})}),e.jsx(d,{children:e.jsxs("div",{className:"mdt-flex mdt-gap-3",children:[e.jsx("div",{className:"mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-green-500 mdt-text-white",children:"J"}),e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-text-sm mdt-font-semibold",children:"John Doe"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Senior Developer"})]})]})})]})," ","and"," ",e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx("span",{className:"mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80",children:"@sarah"})}),e.jsx(d,{children:e.jsxs("div",{className:"mdt-flex mdt-gap-3",children:[e.jsx("div",{className:"mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-purple-500 mdt-text-white",children:"S"}),e.jsxs("div",{children:[e.jsx("h4",{className:"mdt-text-sm mdt-font-semibold",children:"Sarah Smith"}),e.jsx("p",{className:"mdt-text-xs mdt-text-muted-foreground",children:"Lead Designer"})]})]})})]}),". They have been collaborating since 2022."]})})},u={render:()=>e.jsxs(t,{children:[e.jsx(r,{asChild:!0,children:e.jsx(s,{variant:"outline",children:"Premium Feature"})}),e.jsx(d,{className:"mdt-w-96 mdt-border-2 mdt-border-primary mdt-bg-gradient-to-br mdt-from-primary/5 mdt-to-transparent",children:e.jsxs("div",{className:"mdt-space-y-3",children:[e.jsx("div",{className:"mdt-inline-flex mdt-rounded-full mdt-bg-primary mdt-px-3 mdt-py-1 mdt-text-xs mdt-font-semibold mdt-text-primary-foreground",children:"PRO"}),e.jsx("h4",{className:"mdt-text-lg mdt-font-bold",children:"Unlock Premium Features"}),e.jsx("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:"Get access to advanced analytics, priority support, and exclusive templates."}),e.jsx(s,{className:"mdt-w-full",children:"Upgrade Now"})]})})]})};var h,x,v,g,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="mdt-p-8">
      <p className="mdt-text-sm">
        Hover over{' '}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80">
              @nextjs
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="mdt-flex mdt-gap-4">
              <div className="mdt-flex mdt-h-12 mdt-w-12 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-primary mdt-text-primary-foreground">
                <span className="mdt-text-lg mdt-font-semibold">N</span>
              </div>
              <div className="mdt-space-y-1">
                <h4 className="mdt-text-sm mdt-font-semibold">@nextjs</h4>
                <p className="mdt-text-sm mdt-text-muted-foreground">
                  The React Framework - created and maintained by @vercel.
                </p>
                <div className="mdt-flex mdt-items-center mdt-pt-2">
                  <span className="mdt-text-xs mdt-text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>{' '}
        to see their profile.
      </p>
    </div>
}`,...(v=(x=n.parameters)==null?void 0:x.docs)==null?void 0:v.source},description:{story:`Basic hover card with user profile information.
Hover over the username to see the profile card.`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.description}}};var y,C,j,b,N;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="mdt-p-8">
      <p className="mdt-text-sm">
        Check out{' '}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80">
              @shadcn
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="mdt-w-80">
            <div className="mdt-flex mdt-gap-4">
              <div className="mdt-h-14 mdt-w-14 mdt-overflow-hidden mdt-rounded-full mdt-bg-muted">
                <div className="mdt-flex mdt-h-full mdt-w-full mdt-items-center mdt-justify-center mdt-bg-gradient-to-br mdt-from-purple-400 mdt-to-pink-600 mdt-text-white">
                  <span className="mdt-text-xl mdt-font-bold">S</span>
                </div>
              </div>
              <div className="mdt-flex-1 mdt-space-y-1">
                <h4 className="mdt-text-sm mdt-font-semibold">shadcn</h4>
                <p className="mdt-text-sm mdt-text-muted-foreground">
                  Building UI components with Radix UI and Tailwind CSS.
                </p>
                <div className="mdt-flex mdt-gap-4 mdt-pt-2 mdt-text-xs mdt-text-muted-foreground">
                  <div>
                    <span className="mdt-font-semibold mdt-text-foreground">2.5k</span> followers
                  </div>
                  <div>
                    <span className="mdt-font-semibold mdt-text-foreground">312</span> following
                  </div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        's amazing work!
      </p>
    </div>
}`,...(j=(C=a.parameters)==null?void 0:C.docs)==null?void 0:j.source},description:{story:`Hover card with avatar image and social stats.
Hover over the username to see the full profile.`,...(N=(b=a.parameters)==null?void 0:b.docs)==null?void 0:N.description}}};var H,w,T,D,S;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-items-center mdt-justify-center mdt-p-16">
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="mdt-inline-flex mdt-cursor-help mdt-items-center mdt-gap-1 mdt-rounded mdt-border mdt-border-border mdt-bg-secondary mdt-px-3 mdt-py-2 mdt-text-sm mdt-font-medium hover:mdt-bg-secondary/80">
            Hover for details
            <span className="mdt-text-xs">ⓘ</span>
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          <HoverCardArrow />
          <div className="mdt-space-y-2">
            <h4 className="mdt-font-semibold">Feature Preview</h4>
            <p className="mdt-text-sm mdt-text-muted-foreground">
              This hover card includes an arrow pointing to the trigger element for better visual
              connection.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
}`,...(T=(w=m.parameters)==null?void 0:w.docs)==null?void 0:T.source},description:{story:`Hover card with arrow pointer.
The arrow points to the trigger element for better visual connection.`,...(S=(D=m.parameters)==null?void 0:D.docs)==null?void 0:S.description}}};var B,k,A,V,R;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-16">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Top</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <p className="mdt-text-sm">Content appears above the trigger</p>
        </HoverCardContent>
      </HoverCard>

      <div className="mdt-flex mdt-gap-16">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Left</Button>
          </HoverCardTrigger>
          <HoverCardContent side="left">
            <p className="mdt-text-sm">Content appears on the left</p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Right</Button>
          </HoverCardTrigger>
          <HoverCardContent side="right">
            <p className="mdt-text-sm">Content appears on the right</p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Bottom (default)</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom">
          <p className="mdt-text-sm">Content appears below the trigger</p>
        </HoverCardContent>
      </HoverCard>
    </div>
}`,...(A=(k=o.parameters)==null?void 0:k.docs)==null?void 0:A.source},description:{story:"Different side placements.",...(R=(V=o.parameters)==null?void 0:V.docs)==null?void 0:R.description}}};var P,O,F,U,E;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <p className="mdt-text-sm">Aligned to the start of the trigger</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Align Center (default)</Button>
        </HoverCardTrigger>
        <HoverCardContent align="center">
          <p className="mdt-text-sm">Centered with the trigger</p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Align End</Button>
        </HoverCardTrigger>
        <HoverCardContent align="end">
          <p className="mdt-text-sm">Aligned to the end of the trigger</p>
        </HoverCardContent>
      </HoverCard>
    </div>
}`,...(F=(O=i.parameters)==null?void 0:O.docs)==null?void 0:F.source},description:{story:"Different alignments.",...(E=(U=i.parameters)==null?void 0:U.docs)==null?void 0:E.description}}};var I,J,W,L,M;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-gap-4">
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="outline">Fast (100ms)</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="mdt-text-sm">Opens and closes quickly</p>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            openDelay: 100ms, closeDelay: 100ms
          </p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={700} closeDelay={300}>
        <HoverCardTrigger asChild>
          <Button variant="outline">Default (700ms/300ms)</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="mdt-text-sm">Standard timing</p>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            openDelay: 700ms, closeDelay: 300ms
          </p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard openDelay={1500} closeDelay={500}>
        <HoverCardTrigger asChild>
          <Button variant="outline">Slow (1500ms/500ms)</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="mdt-text-sm">Opens and closes slowly</p>
          <p className="mdt-text-xs mdt-text-muted-foreground">
            openDelay: 1500ms, closeDelay: 500ms
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
}`,...(W=(J=l.parameters)==null?void 0:J.docs)==null?void 0:W.source},description:{story:"Custom delays for opening and closing.",...(M=(L=l.parameters)==null?void 0:L.docs)==null?void 0:M.description}}};var q,z,G,_,K;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">react</Button>
      </HoverCardTrigger>
      <HoverCardContent className="mdt-w-80">
        <div className="mdt-space-y-3">
          <div className="mdt-flex mdt-items-start mdt-gap-2">
            <div className="mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-md mdt-bg-blue-500 mdt-text-white">
              <span className="mdt-text-lg mdt-font-bold">R</span>
            </div>
            <div className="mdt-flex-1">
              <h4 className="mdt-font-semibold">facebook/react</h4>
              <p className="mdt-text-xs mdt-text-muted-foreground">Public repository</p>
            </div>
          </div>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            A declarative, efficient, and flexible JavaScript library for building user interfaces.
          </p>
          <div className="mdt-flex mdt-gap-4 mdt-text-xs mdt-text-muted-foreground">
            <div className="mdt-flex mdt-items-center mdt-gap-1">
              <span className="mdt-h-2 mdt-w-2 mdt-rounded-full mdt-bg-blue-500" />
              TypeScript
            </div>
            <div>⭐ 220k</div>
            <div>🔱 45k forks</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
}`,...(G=(z=c.parameters)==null?void 0:z.docs)==null?void 0:G.source},description:{story:"Repository information card.",...(K=(_=c.parameters)==null?void 0:_.docs)==null?void 0:K.description}}};var Q,X,Y,Z,$;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="mdt-max-w-md mdt-text-sm">
      <p>
        The project was created by{' '}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80">
              @john
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="mdt-flex mdt-gap-3">
              <div className="mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-green-500 mdt-text-white">
                J
              </div>
              <div>
                <h4 className="mdt-text-sm mdt-font-semibold">John Doe</h4>
                <p className="mdt-text-xs mdt-text-muted-foreground">Senior Developer</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>{' '}
        and{' '}
        <HoverCard>
          <HoverCardTrigger asChild>
            <span className="mdt-cursor-pointer mdt-font-medium mdt-text-primary mdt-underline mdt-underline-offset-4 hover:mdt-text-primary/80">
              @sarah
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="mdt-flex mdt-gap-3">
              <div className="mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-purple-500 mdt-text-white">
                S
              </div>
              <div>
                <h4 className="mdt-text-sm mdt-font-semibold">Sarah Smith</h4>
                <p className="mdt-text-xs mdt-text-muted-foreground">Lead Designer</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        . They have been collaborating since 2022.
      </p>
    </div>
}`,...(Y=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Y.source},description:{story:"Multiple hover cards in a sentence.",...($=(Z=p.parameters)==null?void 0:Z.docs)==null?void 0:$.description}}};var ee,te,re,de,se;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">Premium Feature</Button>
      </HoverCardTrigger>
      <HoverCardContent className="mdt-w-96 mdt-border-2 mdt-border-primary mdt-bg-gradient-to-br mdt-from-primary/5 mdt-to-transparent">
        <div className="mdt-space-y-3">
          <div className="mdt-inline-flex mdt-rounded-full mdt-bg-primary mdt-px-3 mdt-py-1 mdt-text-xs mdt-font-semibold mdt-text-primary-foreground">
            PRO
          </div>
          <h4 className="mdt-text-lg mdt-font-bold">Unlock Premium Features</h4>
          <p className="mdt-text-sm mdt-text-muted-foreground">
            Get access to advanced analytics, priority support, and exclusive templates.
          </p>
          <Button className="mdt-w-full">Upgrade Now</Button>
        </div>
      </HoverCardContent>
    </HoverCard>
}`,...(re=(te=u.parameters)==null?void 0:te.docs)==null?void 0:re.source},description:{story:"Custom styled content.",...(se=(de=u.parameters)==null?void 0:de.docs)==null?void 0:se.description}}};const He=["Default","WithAvatar","WithArrow","Sides","Alignments","CustomDelays","RepositoryInfo","InlineText","CustomStyling"];export{i as Alignments,l as CustomDelays,u as CustomStyling,n as Default,p as InlineText,c as RepositoryInfo,o as Sides,m as WithArrow,a as WithAvatar,He as __namedExportsOrder,Ne as default};
//# sourceMappingURL=HoverCard.stories-C95j135t.js.map
