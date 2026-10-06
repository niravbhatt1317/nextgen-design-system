import{j as e,r as ba}from"./iframe-Bjx_Kh3y.js";import{T as t}from"./Textarea-CgTtGzu4.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-DXf-30mB.js";import"./Icon-S4pcH5d6.js";const{expect:s,fn:S,userEvent:z,within:D}=__STORYBOOK_MODULE_TEST__,Ea={title:"New Components/Textarea",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A multi-line text input component with support for labels, validation states, and character counting."}},controls:{exclude:["class"]}},argTypes:{size:{control:"select",options:["sm","md","lg"],description:"Size variant of the textarea",table:{type:{summary:'"sm" | "md" | "lg"'},defaultValue:{summary:"md"}}},variant:{control:"select",options:["default","filled"],description:"Visual style variant of the textarea",table:{type:{summary:'"default" | "filled"'},defaultValue:{summary:"default"}}},resize:{control:"select",options:["none","vertical","both"],description:"Resize behavior of the textarea",table:{type:{summary:'"none" | "vertical" | "both"'},defaultValue:{summary:"vertical"}}},placeholder:{control:"text",description:"Placeholder text displayed when textarea is empty",table:{type:{summary:"string"}}},value:{control:"text",description:"Controlled value of the textarea",table:{type:{summary:"string"}}},defaultValue:{control:"text",description:"Default value for uncontrolled textarea",table:{type:{summary:"string"}}},className:{control:"text",description:"Custom CSS classes for the textarea element",table:{type:{summary:"string"}}},wrapperClassName:{control:"text",description:"Custom CSS classes for the wrapper container",table:{type:{summary:"string"}}},rows:{control:"number",description:"Number of visible text rows",table:{type:{summary:"number"}}},cols:{control:"number",description:"Visible width in average character widths",table:{type:{summary:"number"}}},label:{control:"text",description:"Label text displayed above the textarea",table:{type:{summary:"string"}}},error:{control:"text",description:"Error message displayed below the textarea (shows red styling)",table:{type:{summary:"string"}}},helperText:{control:"text",description:"Helper text displayed below the textarea (hidden when error is present)",table:{type:{summary:"string"}}},disabled:{control:"boolean",description:"Disables the textarea and prevents user interaction",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},readOnly:{control:"boolean",description:"Makes the textarea read-only (can be focused but not edited)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},required:{control:"boolean",description:"Marks the textarea as required (for form validation)",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},name:{control:"text",description:"Name attribute for form submission",table:{type:{summary:"string"}}},id:{control:"text",description:"Unique identifier for the textarea element",table:{type:{summary:"string"}}},autoFocus:{control:"boolean",description:"Automatically focus the textarea when component mounts",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},maxLength:{control:"number",description:"Maximum number of characters allowed",table:{type:{summary:"number"}}},minLength:{control:"number",description:"Minimum number of characters required",table:{type:{summary:"number"}}},wrap:{control:"select",options:["soft","hard","off"],description:"How the text should be wrapped when submitted in a form",table:{type:{summary:'"soft" | "hard" | "off"'}}},onChange:{action:"changed",description:"Callback fired when the textarea value changes",table:{type:{summary:"(event: ChangeEvent<HTMLTextAreaElement>) => void"}}},onFocus:{action:"focused",description:"Callback fired when the textarea receives focus",table:{type:{summary:"(event: FocusEvent<HTMLTextAreaElement>) => void"}}},onBlur:{action:"blurred",description:"Callback fired when the textarea loses focus",table:{type:{summary:"(event: FocusEvent<HTMLTextAreaElement>) => void"}}},onKeyDown:{action:"keydown",description:"Callback fired when a key is pressed down",table:{type:{summary:"(event: KeyboardEvent<HTMLTextAreaElement>) => void"}}},onKeyUp:{action:"keyup",description:"Callback fired when a key is released",table:{type:{summary:"(event: KeyboardEvent<HTMLTextAreaElement>) => void"}}},"aria-label":{control:"text",description:"Accessible label for screen readers (use when label prop is not provided)",table:{type:{summary:"string"}}},"aria-describedby":{control:"text",description:"ID of element that describes the textarea",table:{type:{summary:"string"}}},"aria-invalid":{control:"boolean",description:"Indicates whether the textarea value is invalid (automatically set when error prop is present)",table:{type:{summary:"boolean"}}}},decorators:[r=>e.jsx("div",{style:{width:"400px"},children:e.jsx(r,{})})]},l={args:{placeholder:"Enter your message...","aria-label":"Message textarea"}},i={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(t,{size:"sm",placeholder:"Small textarea","aria-label":"Small textarea"}),e.jsx(t,{size:"md",placeholder:"Medium textarea (default)","aria-label":"Medium textarea"}),e.jsx(t,{size:"lg",placeholder:"Large textarea","aria-label":"Large textarea"})]})},c={args:{label:"Message",placeholder:"Type your message here..."}},d={args:{label:"Bio",defaultValue:"This is a pre-filled bio text that can be edited."}},p={args:{label:"Comments",disabled:!0,defaultValue:"This textarea is disabled and cannot be edited."}},m={render:()=>{const[r,n]=ba.useState(""),o=200,a=o-r.length;return e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:e.jsx(t,{label:"Bio",placeholder:"Tell us about yourself...",value:r,onChange:ga=>{n(ga.target.value)},maxLength:o,helperText:`${String(a)} characters remaining`})})}},u={render:()=>e.jsxs("form",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(t,{label:"Subject",placeholder:"Enter subject",rows:2,required:!0}),e.jsx(t,{label:"Message",placeholder:"Enter your message",rows:5,helperText:"Please provide detailed information",required:!0}),e.jsx(t,{label:"Additional Notes",placeholder:"Any additional information",rows:3})]})},h={render:()=>{const[r,n]=ba.useState(""),o=a=>{n(a.target.value),a.target.style.height="auto",a.target.style.height=`${String(a.target.scrollHeight)}px`};return e.jsx("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:e.jsx(t,{label:"Auto-resize Textarea",placeholder:"Start typing and watch the textarea grow...",value:r,onChange:o,resize:"none",rows:3,helperText:"This textarea automatically adjusts its height based on content"})})}},x={args:{label:"Description",placeholder:"Enter description..."}},b={args:{label:"Feedback",placeholder:"Share your feedback",helperText:"Your feedback helps us improve our service"}},g={args:{label:"Comment",placeholder:"Enter your comment",error:"Comment is required",defaultValue:""}},y={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(t,{label:"No Resize",placeholder:"This textarea cannot be resized",resize:"none","aria-label":"No resize textarea"}),e.jsx(t,{label:"Vertical Resize (Default)",placeholder:"This textarea can be resized vertically",resize:"vertical","aria-label":"Vertical resize textarea"}),e.jsx(t,{label:"Both Directions",placeholder:"This textarea can be resized in both directions",resize:"both","aria-label":"Both directions resize textarea"})]})},f={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(t,{label:"Default Variant",placeholder:"Default background",variant:"default","aria-label":"Default variant textarea"}),e.jsx(t,{label:"Filled Variant",placeholder:"Filled background",variant:"filled","aria-label":"Filled variant textarea"})]})},v={args:{label:"Terms and Conditions",readOnly:!0,defaultValue:"This is a read-only textarea. You can select and copy the text, but you cannot edit it.",helperText:"This field cannot be edited"}},w={args:{label:"Reason",required:!0,placeholder:"Please provide a reason (required)"}},T={render:()=>e.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-4",children:[e.jsx(t,{label:"2 Rows",rows:2,placeholder:"Two visible rows","aria-label":"2 rows"}),e.jsx(t,{label:"5 Rows",rows:5,placeholder:"Five visible rows","aria-label":"5 rows"}),e.jsx(t,{label:"10 Rows",rows:10,placeholder:"Ten visible rows","aria-label":"10 rows"})]})},C={args:{label:"Message",placeholder:"Enter your message",onChange:S()},play:async({args:r,canvasElement:n})=>{const a=D(n).getByRole("textbox",{name:/message/i});await s(a).toBeInTheDocument(),await s(a).toHaveValue(""),await z.type(a,"Hello, this is a test message!"),await s(a).toHaveValue("Hello, this is a test message!"),await s(r.onChange).toHaveBeenCalled()}},V={args:{label:"Comments",placeholder:"Disabled textarea",disabled:!0,onChange:S()},play:async({args:r,canvasElement:n})=>{const a=D(n).getByRole("textbox",{name:/comments/i});await s(a).toBeDisabled(),await z.type(a,"This should not appear"),await s(a).toHaveValue(""),await s(r.onChange).not.toHaveBeenCalled()}},E={args:{label:"Notes",placeholder:"Enter notes",defaultValue:"Initial notes content",onChange:S()},play:async({args:r,canvasElement:n})=>{const a=D(n).getByRole("textbox",{name:/notes/i});await s(a).toHaveValue("Initial notes content"),await z.clear(a),await s(a).toHaveValue(""),await z.type(a,"New notes content"),await s(a).toHaveValue("New notes content"),await s(r.onChange).toHaveBeenCalled()}};var H,R,j,N,k;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter your message...',
    'aria-label': 'Message textarea'
  }
}`,...(j=(R=l.parameters)==null?void 0:R.docs)==null?void 0:j.source},description:{story:"The default textarea.",...(k=(N=l.parameters)==null?void 0:N.docs)==null?void 0:k.description}}};var B,M,L,A,q;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea size="sm" placeholder="Small textarea" aria-label="Small textarea" />
      <Textarea size="md" placeholder="Medium textarea (default)" aria-label="Medium textarea" />
      <Textarea size="lg" placeholder="Large textarea" aria-label="Large textarea" />
    </div>
}`,...(L=(M=i.parameters)==null?void 0:M.docs)==null?void 0:L.source},description:{story:"Different size variants.",...(q=(A=i.parameters)==null?void 0:A.docs)==null?void 0:q.description}}};var F,I,W,O,_;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    placeholder: 'Type your message here...'
  }
}`,...(W=(I=c.parameters)==null?void 0:I.docs)==null?void 0:W.source},description:{story:"Textarea with placeholder.",...(_=(O=c.parameters)==null?void 0:O.docs)==null?void 0:_.description}}};var P,K,Y,$,U;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    label: 'Bio',
    defaultValue: 'This is a pre-filled bio text that can be edited.'
  }
}`,...(Y=(K=d.parameters)==null?void 0:K.docs)==null?void 0:Y.source},description:{story:"Textarea with default value.",...(U=($=d.parameters)==null?void 0:$.docs)==null?void 0:U.description}}};var G,J,Q,X,Z;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    label: 'Comments',
    disabled: true,
    defaultValue: 'This textarea is disabled and cannot be edited.'
  }
}`,...(Q=(J=p.parameters)==null?void 0:J.docs)==null?void 0:Q.source},description:{story:"Disabled textarea.",...(Z=(X=p.parameters)==null?void 0:X.docs)==null?void 0:Z.description}}};var ee,ae,te,re,se;m.parameters={...m.parameters,docs:{...(ee=m.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');
    const maxLength = 200;
    const remaining = maxLength - value.length;
    return <div className="mdt-flex mdt-flex-col mdt-gap-2">
        <Textarea label="Bio" placeholder="Tell us about yourself..." value={value} onChange={e => {
        setValue(e.target.value);
      }} maxLength={maxLength} helperText={\`\${String(remaining)} characters remaining\`} />
      </div>;
  }
}`,...(te=(ae=m.parameters)==null?void 0:ae.docs)==null?void 0:te.source},description:{story:"Textarea with character count.",...(se=(re=m.parameters)==null?void 0:re.docs)==null?void 0:se.description}}};var ne,oe,le,ie,ce;u.parameters={...u.parameters,docs:{...(ne=u.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => <form className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea label="Subject" placeholder="Enter subject" rows={2} required />
      <Textarea label="Message" placeholder="Enter your message" rows={5} helperText="Please provide detailed information" required />
      <Textarea label="Additional Notes" placeholder="Any additional information" rows={3} />
    </form>
}`,...(le=(oe=u.parameters)==null?void 0:oe.docs)==null?void 0:le.source},description:{story:"Form example with multiple textareas.",...(ce=(ie=u.parameters)==null?void 0:ie.docs)==null?void 0:ce.description}}};var de,pe,me,ue,he;h.parameters={...h.parameters,docs:{...(de=h.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      // Auto-resize logic
      e.target.style.height = 'auto';
      e.target.style.height = \`\${String(e.target.scrollHeight)}px\`;
    };
    return <div className="mdt-flex mdt-flex-col mdt-gap-4">
        <Textarea label="Auto-resize Textarea" placeholder="Start typing and watch the textarea grow..." value={value} onChange={handleChange} resize="none" rows={3} helperText="This textarea automatically adjusts its height based on content" />
      </div>;
  }
}`,...(me=(pe=h.parameters)==null?void 0:pe.docs)==null?void 0:me.source},description:{story:"Auto-resize example.",...(he=(ue=h.parameters)==null?void 0:ue.docs)==null?void 0:he.description}}};var xe,be,ge,ye,fe;x.parameters={...x.parameters,docs:{...(xe=x.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    label: 'Description',
    placeholder: 'Enter description...'
  }
}`,...(ge=(be=x.parameters)==null?void 0:be.docs)==null?void 0:ge.source},description:{story:"Textarea with label.",...(fe=(ye=x.parameters)==null?void 0:ye.docs)==null?void 0:fe.description}}};var ve,we,Te,Ce,Ve;b.parameters={...b.parameters,docs:{...(ve=b.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    label: 'Feedback',
    placeholder: 'Share your feedback',
    helperText: 'Your feedback helps us improve our service'
  }
}`,...(Te=(we=b.parameters)==null?void 0:we.docs)==null?void 0:Te.source},description:{story:"Textarea with helper text.",...(Ve=(Ce=b.parameters)==null?void 0:Ce.docs)==null?void 0:Ve.description}}};var Ee,ze,Se,De,He;g.parameters={...g.parameters,docs:{...(Ee=g.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    label: 'Comment',
    placeholder: 'Enter your comment',
    error: 'Comment is required',
    defaultValue: ''
  }
}`,...(Se=(ze=g.parameters)==null?void 0:ze.docs)==null?void 0:Se.source},description:{story:"Textarea in error state.",...(He=(De=g.parameters)==null?void 0:De.docs)==null?void 0:He.description}}};var Re,je,Ne,ke,Be;y.parameters={...y.parameters,docs:{...(Re=y.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea label="No Resize" placeholder="This textarea cannot be resized" resize="none" aria-label="No resize textarea" />
      <Textarea label="Vertical Resize (Default)" placeholder="This textarea can be resized vertically" resize="vertical" aria-label="Vertical resize textarea" />
      <Textarea label="Both Directions" placeholder="This textarea can be resized in both directions" resize="both" aria-label="Both directions resize textarea" />
    </div>
}`,...(Ne=(je=y.parameters)==null?void 0:je.docs)==null?void 0:Ne.source},description:{story:"Different resize variants.",...(Be=(ke=y.parameters)==null?void 0:ke.docs)==null?void 0:Be.description}}};var Me,Le,Ae,qe,Fe;f.parameters={...f.parameters,docs:{...(Me=f.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea label="Default Variant" placeholder="Default background" variant="default" aria-label="Default variant textarea" />
      <Textarea label="Filled Variant" placeholder="Filled background" variant="filled" aria-label="Filled variant textarea" />
    </div>
}`,...(Ae=(Le=f.parameters)==null?void 0:Le.docs)==null?void 0:Ae.source},description:{story:"Different variant styles.",...(Fe=(qe=f.parameters)==null?void 0:qe.docs)==null?void 0:Fe.description}}};var Ie,We,Oe,_e,Pe;v.parameters={...v.parameters,docs:{...(Ie=v.parameters)==null?void 0:Ie.docs,source:{originalSource:`{
  args: {
    label: 'Terms and Conditions',
    readOnly: true,
    defaultValue: 'This is a read-only textarea. You can select and copy the text, but you cannot edit it.',
    helperText: 'This field cannot be edited'
  }
}`,...(Oe=(We=v.parameters)==null?void 0:We.docs)==null?void 0:Oe.source},description:{story:"Read-only textarea.",...(Pe=(_e=v.parameters)==null?void 0:_e.docs)==null?void 0:Pe.description}}};var Ke,Ye,$e,Ue,Ge;w.parameters={...w.parameters,docs:{...(Ke=w.parameters)==null?void 0:Ke.docs,source:{originalSource:`{
  args: {
    label: 'Reason',
    required: true,
    placeholder: 'Please provide a reason (required)'
  }
}`,...($e=(Ye=w.parameters)==null?void 0:Ye.docs)==null?void 0:$e.source},description:{story:"Required textarea.",...(Ge=(Ue=w.parameters)==null?void 0:Ue.docs)==null?void 0:Ge.description}}};var Je,Qe,Xe,Ze,ea;T.parameters={...T.parameters,docs:{...(Je=T.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  render: () => <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <Textarea label="2 Rows" rows={2} placeholder="Two visible rows" aria-label="2 rows" />
      <Textarea label="5 Rows" rows={5} placeholder="Five visible rows" aria-label="5 rows" />
      <Textarea label="10 Rows" rows={10} placeholder="Ten visible rows" aria-label="10 rows" />
    </div>
}`,...(Xe=(Qe=T.parameters)==null?void 0:Qe.docs)==null?void 0:Xe.source},description:{story:"Textarea with rows attribute.",...(ea=(Ze=T.parameters)==null?void 0:Ze.docs)==null?void 0:ea.description}}};var aa,ta,ra,sa,na;C.parameters={...C.parameters,docs:{...(aa=C.parameters)==null?void 0:aa.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    placeholder: 'Enter your message',
    onChange: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox', {
      name: /message/i
    });

    // Test: Textarea is visible and empty
    await expect(textarea).toBeInTheDocument();
    await expect(textarea).toHaveValue('');

    // Test: Type into the textarea
    await userEvent.type(textarea, 'Hello, this is a test message!');

    // Test: Verify value was typed
    await expect(textarea).toHaveValue('Hello, this is a test message!');

    // Test: Verify onChange was called
    await expect(args.onChange).toHaveBeenCalled();
  }
}`,...(ra=(ta=C.parameters)==null?void 0:ta.docs)==null?void 0:ra.source},description:{story:"Interaction test - Typing text into textarea.",...(na=(sa=C.parameters)==null?void 0:sa.docs)==null?void 0:na.description}}};var oa,la,ia,ca,da;V.parameters={...V.parameters,docs:{...(oa=V.parameters)==null?void 0:oa.docs,source:{originalSource:`{
  args: {
    label: 'Comments',
    placeholder: 'Disabled textarea',
    disabled: true,
    onChange: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox', {
      name: /comments/i
    });

    // Test: Textarea is disabled
    await expect(textarea).toBeDisabled();

    // Test: Try to type (should not work)
    await userEvent.type(textarea, 'This should not appear');

    // Test: Verify no value was entered
    await expect(textarea).toHaveValue('');

    // Test: Verify onChange was NOT called
    await expect(args.onChange).not.toHaveBeenCalled();
  }
}`,...(ia=(la=V.parameters)==null?void 0:la.docs)==null?void 0:ia.source},description:{story:"Interaction test - Disabled textarea should not accept input.",...(da=(ca=V.parameters)==null?void 0:ca.docs)==null?void 0:da.description}}};var pa,ma,ua,ha,xa;E.parameters={...E.parameters,docs:{...(pa=E.parameters)==null?void 0:pa.docs,source:{originalSource:`{
  args: {
    label: 'Notes',
    placeholder: 'Enter notes',
    defaultValue: 'Initial notes content',
    onChange: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox', {
      name: /notes/i
    });

    // Test: Textarea has initial value
    await expect(textarea).toHaveValue('Initial notes content');

    // Test: Clear the textarea
    await userEvent.clear(textarea);

    // Test: Verify textarea is empty
    await expect(textarea).toHaveValue('');

    // Test: Type new value
    await userEvent.type(textarea, 'New notes content');

    // Test: Verify new value
    await expect(textarea).toHaveValue('New notes content');

    // Test: Verify onChange was called
    await expect(args.onChange).toHaveBeenCalled();
  }
}`,...(ua=(ma=E.parameters)==null?void 0:ma.docs)==null?void 0:ua.source},description:{story:"Interaction test - Clear textarea and verify onChange.",...(xa=(ha=E.parameters)==null?void 0:ha.docs)==null?void 0:xa.description}}};const za=["Default","Sizes","WithPlaceholder","WithDefaultValue","Disabled","WithCharacterCount","FormExample","AutoResize","WithLabel","WithHelperText","WithError","ResizeVariants","Variants","ReadOnly","Required","WithRows","InteractionTestTyping","InteractionTestDisabled","InteractionTestClear"];export{h as AutoResize,l as Default,p as Disabled,u as FormExample,E as InteractionTestClear,V as InteractionTestDisabled,C as InteractionTestTyping,v as ReadOnly,w as Required,y as ResizeVariants,i as Sizes,f as Variants,m as WithCharacterCount,d as WithDefaultValue,g as WithError,b as WithHelperText,x as WithLabel,c as WithPlaceholder,T as WithRows,za as __namedExportsOrder,Ea as default};
//# sourceMappingURL=Textarea.stories-BB4JBoYT.js.map
