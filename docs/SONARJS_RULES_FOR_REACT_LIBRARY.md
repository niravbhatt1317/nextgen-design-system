# SonarJS Rules for React Library

This document provides a curated reference of **SonarJS rules specifically relevant to this React component library**. Rules related to backend operations, databases, file systems, and server-side code have been excluded as this is a **pure client-side UI component library**.

> **Source:** [SonarSource TypeScript Rules](https://rules.sonarsource.com/typescript/)

---

## Table of Contents

1. [Overview](#overview)
2. [Rule Categories Summary](#rule-categories-summary)
3. [React-Specific Rules (24 rules)](#-react-specific-rules-24-rules)
4. [Accessibility Rules (31 rules)](#-accessibility-rules-31-rules)
5. [TypeScript-Specific Rules (27 rules)](#-typescript-specific-rules-27-rules)
6. [Code Quality Rules (45 rules)](#-code-quality-rules-45-rules)
7. [Testing Rules (12 rules)](#-testing-rules-12-rules)
8. [Bug Detection Rules (35 rules)](#-bug-detection-rules-35-rules)
9. [Modern JavaScript/ES6+ Rules (15 rules)](#-modern-javascriptes6-rules-15-rules)
10. [Regular Expression Rules (12 rules)](#-regular-expression-rules-12-rules)
11. [Client-Side Security Rules (8 rules)](#-client-side-security-rules-8-rules)
12. [ESLint Integration](#eslint-integration)
13. [Recommended Configuration](#recommended-configuration-for-this-library)

---

## Overview

This reference covers **~209 SonarJS rules** relevant to a React UI component library. The following categories have been **excluded** as they don't apply to this codebase:

| Excluded Category           | Reason                  |
| --------------------------- | ----------------------- |
| Server-side vulnerabilities | No backend code         |
| Database/SQL injection      | No database operations  |
| File system operations      | No file I/O             |
| Authentication/Session      | No auth logic           |
| AWS/Cloud security          | No cloud infrastructure |
| API security                | No API endpoints        |
| Cryptography                | No encryption needs     |

---

## Rule Categories Summary

| Category             | Count    | Priority                   |
| -------------------- | -------- | -------------------------- |
| React-Specific       | 24       | Critical - Core patterns   |
| Accessibility        | 31       | Critical - WCAG compliance |
| TypeScript-Specific  | 27       | High - Type safety         |
| Code Quality         | 45       | High - Maintainability     |
| Testing              | 12       | High - Test coverage       |
| Bug Detection        | 35       | High - Prevent defects     |
| Modern JS/ES6+       | 15       | Medium - Best practices    |
| Regular Expressions  | 12       | Medium - Pattern safety    |
| Client-Side Security | 8        | Medium - XSS prevention    |
| **Total**            | **~209** |                            |

---

## 🔵 React-Specific Rules (24 rules)

These rules ensure proper React patterns and prevent common React mistakes.

### Component Lifecycle & Hooks

#### S6440 - React Hooks should be properly called

**Severity:** Blocker | **Type:** Bug

Hooks must be called in the same order on every render.

```tsx
// ❌ Non-compliant - Conditional hook
function Toggle({ enabled }: { enabled: boolean }) {
  if (enabled) {
    useEffect(() => {}, []); // Hook called conditionally
  }
  return <div />;
}

// ✅ Compliant
function Toggle({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (enabled) {
      // Effect logic here
    }
  }, [enabled]);
  return <div />;
}
```

#### S6756 - "setState" should use a callback when referencing the previous state

**Severity:** Major | **Type:** Bug

State updates may be batched, causing stale state issues.

```tsx
// ❌ Non-compliant - May use stale state
const [count, setCount] = useState(0);
setCount(count + 1);
setCount(count + 1); // Both may use same 'count'

// ✅ Compliant - Use callback form
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // Correctly increments twice
```

#### S6443 - React state setter function should not be called with its matching state variable

**Severity:** Major | **Type:** Bug

Setting state to itself is a no-op and likely a mistake.

```tsx
// ❌ Non-compliant
const [value, setValue] = useState(0);
setValue(value); // No-op, likely a bug

// ✅ Compliant
setValue(newValue);
setValue((prev) => prev + 1);
```

#### S6442 - React's useState hook should not be used directly in the render function

**Severity:** Major | **Type:** Bug

Using useState during render causes infinite re-renders.

```tsx
// ❌ Non-compliant
function Counter() {
  if (condition) {
    const [state, setState] = useState(0); // Called conditionally
  }
  return <div />;
}

// ✅ Compliant - Always call hooks at top level
function Counter() {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
}
```

### JSX Best Practices

#### S6761 - "children" and "dangerouslySetInnerHTML" should not be used together

**Severity:** Major | **Type:** Bug

Using both props together causes React to throw an error.

```tsx
// ❌ Non-compliant
<Card dangerouslySetInnerHTML={{ __html: html }}>
  {children}
</Card>

// ✅ Compliant - Use one or the other
<Card dangerouslySetInnerHTML={{ __html: html }} />
// OR
<Card>{children}</Card>
```

#### S6439 - React components should not render non-boolean condition values

**Severity:** Major | **Type:** Bug

Falsy values like `0` will be rendered.

```tsx
// ❌ Non-compliant - 0 will be rendered
{
  items.length && <List items={items} />;
}

// ✅ Compliant - Use explicit boolean
{
  items.length > 0 && <List items={items} />;
}
{
  items.length ? <List items={items} /> : null;
}
```

#### S6438 - Comments inside JSX expressions should be enclosed in curly braces

**Severity:** Major | **Type:** Bug

HTML comments don't work inside JSX.

```tsx
// ❌ Non-compliant
<Button>
  <!-- This won't work -->
  Click
</Button>

// ✅ Compliant
<Button>
  {/* This is a JSX comment */}
  Click
</Button>
```

#### S6435 - React "render" functions should return a value

**Severity:** Major | **Type:** Bug

Render functions must return something renderable.

```tsx
// ❌ Non-compliant - No return
function Header() {
  <header className="mdt-header">Title</header>; // Missing return
}

// ✅ Compliant
function Header() {
  return <header className="mdt-header">Title</header>;
}
```

#### S6477 - JSX list components should have a key property

**Severity:** Major | **Type:** Code Smell

Keys help React identify which items changed.

```tsx
// ❌ Non-compliant
{
  items.map((item) => (
    <ListItem data={item} /> // Missing key
  ));
}

// ✅ Compliant
{
  items.map((item) => <ListItem key={item.id} data={item} />);
}
```

#### S6479 - JSX list components should not use array indexes as key

**Severity:** Major | **Type:** Code Smell

Index keys cause issues when list order changes.

```tsx
// ❌ Non-compliant
{
  items.map((item, index) => <ListItem key={index} data={item} />);
}

// ✅ Compliant
{
  items.map((item) => <ListItem key={item.id} data={item} />);
}
```

#### S6486 - JSX list components keys should match up between renders

**Severity:** Major | **Type:** Code Smell

Keys should be stable across renders.

```tsx
// ❌ Non-compliant - Key changes on every render
{
  items.map((item) => <Item key={Math.random()} data={item} />);
}

// ✅ Compliant - Stable key
{
  items.map((item) => <Item key={item.id} data={item} />);
}
```

### Component Patterns

#### S6478 - React components should not be nested

**Severity:** Major | **Type:** Code Smell

Nested components are recreated on every render.

```tsx
// ❌ Non-compliant
function Parent() {
  function ChildComponent() {
    // Created every render
    return <div>Child</div>;
  }
  return <ChildComponent />;
}

// ✅ Compliant - Define outside
function ChildComponent() {
  return <div>Child</div>;
}

function Parent() {
  return <ChildComponent />;
}
```

#### S6770 - User-defined JSX components should use Pascal case

**Severity:** Minor | **Type:** Code Smell

React distinguishes components by casing.

```tsx
// ❌ Non-compliant
function motadataButton() {
  return <button />;
}
<motadataButton />; // Treated as HTML tag

// ✅ Compliant
function Button() {
  return <button />;
}
<Button />;
```

#### S6747 - JSX elements should not use unknown properties and attributes

**Severity:** Major | **Type:** Code Smell

Unknown props may indicate typos or confusion.

```tsx
// ❌ Non-compliant
<div class="mdt-container">  // Should be className
<input autofocus />          // Should be autoFocus

// ✅ Compliant
<div className="mdt-container">
<input autoFocus />
```

#### S6766 - JSX special characters should be escaped

**Severity:** Minor | **Type:** Code Smell

Special characters need escaping in JSX.

```tsx
// ❌ Non-compliant
<Text>5 > 3</Text>
<Text>Tom & Jerry</Text>

// ✅ Compliant
<Text>5 &gt; 3</Text>
<Text>Tom &amp; Jerry</Text>
// Or use expressions
<Text>{`5 > 3`}</Text>
```

### Performance Optimization

#### S6481 - React Context Provider values should have stable identities

**Severity:** Major | **Type:** Code Smell

Unstable values cause unnecessary re-renders.

```tsx
// ❌ Non-compliant - New object every render
function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={{ theme: 'dark' }}>{children}</ThemeContext.Provider>;
}

// ✅ Compliant - Memoized value
function ThemeProvider({ children }) {
  const value = useMemo(() => ({ theme: 'dark' }), []);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
```

#### S6480 - Disallow `.bind()` and arrow functions in JSX props

**Severity:** Major | **Type:** Code Smell

Creates new functions on every render.

```tsx
// ❌ Non-compliant
<Button onClick={() => handleClick(id)}>Click</Button>
<Button onClick={handleClick.bind(this, id)}>Click</Button>

// ✅ Compliant - Use useCallback
const handleButtonClick = useCallback(() => {
  handleClick(id);
}, [id]);
<Button onClick={handleButtonClick}>Click</Button>
```

### State & Props

#### S6746 - In React "this.state" should not be mutated directly

**Severity:** Major | **Type:** Code Smell

Direct state mutation doesn't trigger re-renders.

```tsx
// ❌ Non-compliant
this.state.count = 5;
this.state.items.push(newItem);

// ✅ Compliant
this.setState({ count: 5 });
this.setState((prev) => ({
  items: [...prev.items, newItem],
}));
```

#### S6759 - React props should be read-only

**Severity:** Major | **Type:** Code Smell

Props should never be mutated.

```tsx
// ❌ Non-compliant
function Input(props) {
  props.value = 'new value'; // Mutating props
  return <input value={props.value} />;
}

// ✅ Compliant
function Input(props) {
  const [value, setValue] = useState(props.value);
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

#### S6754 - The return value of "useState" should be destructured and named symmetrically

**Severity:** Minor | **Type:** Code Smell

Consistent naming improves readability.

```tsx
// ❌ Non-compliant
const [count, updateCount] = useState(0);
const result = useState('');

// ✅ Compliant
const [count, setCount] = useState(0);
const [value, setValue] = useState('');
```

#### S6767 - Unused React typed props should be removed

**Severity:** Minor | **Type:** Code Smell

Unused props add noise and confusion.

```tsx
// ❌ Non-compliant
interface ButtonProps {
  label: string;
  size: string; // Never used
}
function Button({ label }: ButtonProps) {
  return <button>{label}</button>;
}

// ✅ Compliant
interface ButtonProps {
  label: string;
}
function Button({ label }: ButtonProps) {
  return <button>{label}</button>;
}
```

### Fragments & Children

#### S6749 - Redundant React fragments should be removed

**Severity:** Minor | **Type:** Code Smell

Fragments with single children are unnecessary.

```tsx
// ❌ Non-compliant
<>
  <Button>Only child</Button>
</>

// ✅ Compliant
<Button>Only child</Button>

// Fragments needed for multiple children
<>
  <Button>First</Button>
  <Button>Second</Button>
</>
```

#### S6748 - React "children" should not be passed as prop

**Severity:** Minor | **Type:** Code Smell

Children should be passed between tags.

```tsx
// ❌ Non-compliant
<Card children={<Text>Content</Text>} />

// ✅ Compliant
<Card>
  <Text>Content</Text>
</Card>
```

### Deprecated APIs

#### S6957 - Deprecated React APIs should not be used

**Severity:** Minor | **Type:** Code Smell

Deprecated APIs will be removed in future versions.

```tsx
// ❌ Non-compliant
import { render } from 'react-dom';
render(<App />, document.getElementById('root'));

// ✅ Compliant
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);
```

---

## ♿ Accessibility Rules (31 rules)

These rules ensure WCAG 2.1 AA compliance for your components.

### Labels & Text

#### S6853 - Label elements should have a text label and an associated control

**Severity:** Major | **Type:** Code Smell

Labels without text or association are useless.

```tsx
// ❌ Non-compliant
<label htmlFor="email"></label>  // Empty label
<label>Name</label>               // Not associated

// ✅ Compliant
<label htmlFor="email">Email</label>
<Input id="email" type="email" />

// Or with nesting
<label>
  Email
  <Input type="email" />
</label>
```

#### S6850 - Heading elements should have accessible content

**Severity:** Major | **Type:** Code Smell

Empty headings don't help navigation.

```tsx
// ❌ Non-compliant
<h1></h1>
<h2><span aria-hidden="true">★</span></h2>

// ✅ Compliant
<h1>Page Title</h1>
<h2>
  <span aria-hidden="true">★</span>
  Rating
</h2>
```

#### S6827 - Anchors should contain accessible content

**Severity:** Major | **Type:** Code Smell

Links need descriptive text.

```tsx
// ❌ Non-compliant
<a href="/page"></a>
<a href="/page"><Icon name="home" /></a>  // Icon without label

// ✅ Compliant
<a href="/page">Read more about accessibility</a>
<a href="/page">
  <Icon name="home" aria-hidden="true" />
  <span>Home</span>
</a>
<a href="/page" aria-label="Home page">
  <Icon name="home" aria-hidden="true" />
</a>
```

### Interactive Elements

#### S6852 - Elements with an interactive role should support focus

**Severity:** Major | **Type:** Code Smell

Interactive elements must be focusable.

```tsx
// ❌ Non-compliant
<div role="button">Click me</div>  // Not focusable

// ✅ Compliant
<div role="button" tabIndex={0}>Click me</div>

// Or use semantic HTML (preferred)
<Button>Click me</Button>
```

#### S6848 - Non-interactive DOM elements should not have an interactive handler

**Severity:** Major | **Type:** Code Smell

Non-interactive elements with handlers are inaccessible.

```tsx
// ❌ Non-compliant
<div onClick={handleClick}>Click me</div>

// ✅ Compliant - Use button
<Button onClick={handleClick}>Click me</Button>

// Or add full accessibility
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === "Enter" && handleClick()}
>
  Click me
</div>
```

#### S6844 - Anchor tags should not be used as buttons

**Severity:** Major | **Type:** Code Smell

Links navigate, buttons perform actions.

```tsx
// ❌ Non-compliant
<a href="#" onClick={handleAction}>Submit</a>
<a href="javascript:void(0)">Delete</a>

// ✅ Compliant
<Button onClick={handleAction}>Submit</Button>
<a href="/page">Go to page</a>
```

### ARIA Attributes

#### S6841 - "tabIndex" values should be 0 or -1

**Severity:** Major | **Type:** Code Smell

Positive tabIndex creates unpredictable tab order.

```tsx
// ❌ Non-compliant
<Button tabIndex={5}>First</Button>
<Button tabIndex={10}>Second</Button>

// ✅ Compliant
<Button tabIndex={0}>Focusable</Button>
<Button tabIndex={-1}>Programmatically focusable only</Button>
```

#### S6821 - DOM elements with ARIA roles should have a valid non-abstract role

**Severity:** Major | **Type:** Code Smell

Invalid roles don't work with assistive technology.

```tsx
// ❌ Non-compliant
<div role="commandd">Invalid role</div>  // Typo
<div role="widget">Abstract role</div>

// ✅ Compliant
<div role="button">...</div>
<div role="listbox">...</div>
```

#### S6807 - DOM elements with ARIA roles should have the required properties

**Severity:** Major | **Type:** Code Smell

Missing required properties break accessibility.

```tsx
// ❌ Non-compliant
<div role="checkbox">Check me</div>  // Missing aria-checked
<div role="slider">Value</div>       // Missing aria-valuenow, etc.

// ✅ Compliant
<div role="checkbox" aria-checked="false">Check me</div>
<div
  role="slider"
  aria-valuenow={50}
  aria-valuemin={0}
  aria-valuemax={100}
>
  Value
</div>
```

#### S6793 - ARIA properties in DOM elements should have valid values

**Severity:** Major | **Type:** Code Smell

Invalid ARIA values don't work.

```tsx
// ❌ Non-compliant
<div aria-hidden="yes">Hidden</div>  // Should be true/false
<div aria-level="high">Level</div>   // Should be number

// ✅ Compliant
<div aria-hidden="true">Hidden</div>
<div aria-level="2">Level</div>
```

#### S6822 - No redundant ARIA role

**Severity:** Minor | **Type:** Code Smell

Don't add roles that elements already have.

```tsx
// ❌ Non-compliant - Redundant
<button role="button">Click</button>
<nav role="navigation">Menu</nav>
<a href="/" role="link">Home</a>

// ✅ Compliant
<button>Click</button>
<nav>Menu</nav>
<a href="/">Home</a>
```

#### S6819 - Prefer tag over ARIA role

**Severity:** Minor | **Type:** Code Smell

Semantic HTML is more robust than ARIA.

```tsx
// ❌ Non-compliant - Use semantic HTML instead
<div role="button">Click</div>
<span role="heading" aria-level={1}>Title</span>
<div role="list"><div role="listitem">Item</div></div>

// ✅ Compliant
<Button>Click</Button>
<h1>Title</h1>
<ul><li>Item</li></ul>
```

#### S6825 - Focusable elements should not have "aria-hidden" attribute

**Severity:** Major | **Type:** Code Smell

aria-hidden elements shouldn't be focusable.

```tsx
// ❌ Non-compliant
<Button aria-hidden="true">Hidden but focusable</Button>
<div aria-hidden="true">
  <Input type="text" />
</div>

// ✅ Compliant
<Button aria-hidden="true" tabIndex={-1}>Hidden</Button>
<div aria-hidden="true">
  <Input type="text" tabIndex={-1} />
</div>
```

#### S6811 - DOM elements with ARIA role should only have supported properties

**Severity:** Minor | **Type:** Code Smell

Invalid ARIA properties are ignored.

```tsx
// ❌ Non-compliant
<Checkbox role="checkbox" aria-checked="true" aria-pressed="true" />
// aria-pressed not supported on checkbox

// ✅ Compliant
<Checkbox role="checkbox" aria-checked="true" />
```

### Keyboard Navigation

#### S1082 - Mouse events should have corresponding keyboard events

**Severity:** Major | **Type:** Bug

Mouse-only handlers make content inaccessible.

```tsx
// ❌ Non-compliant - Keyboard users can't trigger
<div onMouseDown={handleAction}>Click me</div>

// ✅ Compliant - Add keyboard support
<div
  onMouseDown={handleAction}
  onKeyDown={(e) => e.key === "Enter" && handleAction()}
  tabIndex={0}
  role="button"
>
  Click me
</div>

// Or use a button (preferred)
<Button onMouseDown={handleAction}>Click me</Button>
```

### Non-Interactive Elements

#### S6845 - Non-interactive DOM elements should not have the `tabIndex` property

**Severity:** Minor | **Type:** Code Smell

Adding tabIndex to non-interactive elements confuses users.

```tsx
// ❌ Non-compliant
<div tabIndex={0}>Just text</div>
<span tabIndex={0}>Read only</span>

// ✅ Compliant
<div>Just text</div>
<Button tabIndex={0}>Interactive</Button>
```

#### S6842 - Non-interactive DOM elements should not have interactive ARIA roles

**Severity:** Major | **Type:** Code Smell

Adding interactive roles requires full accessibility implementation.

```tsx
// ❌ Non-compliant - Missing keyboard support
<div role="button">Click</div>

// ✅ Compliant - Full implementation
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === "Enter" && handleClick()}
>
  Click
</div>

// Better: use semantic HTML
<Button onClick={handleClick}>Click</Button>
```

#### S6843 - Interactive DOM elements should not have non-interactive ARIA roles

**Severity:** Major | **Type:** Code Smell

Don't remove interactivity from interactive elements.

```tsx
// ❌ Non-compliant
<Button role="presentation">Click</Button>
<a href="/page" role="text">Link</a>

// ✅ Compliant
<Button>Click</Button>
<span role="presentation">Decorative</span>
```

#### S6846 - DOM elements should not use the "accesskey" property

**Severity:** Minor | **Type:** Code Smell

Access keys conflict with assistive technology.

```tsx
// ❌ Non-compliant
<Button accessKey="s">Save</Button>

// ✅ Compliant
<Button>Save (Ctrl+S)</Button>  // Document shortcut separately
```

### Images & Media

#### S6851 - Images should have a non-redundant alternate description

**Severity:** Minor | **Type:** Code Smell

Alt text shouldn't repeat nearby content.

```tsx
// ❌ Non-compliant
<img src="cat.jpg" alt="image" />      // Generic
<img src="cat.jpg" alt="cat.jpg" />    // Filename
<h2>Cute Cat</h2>
<img src="cat.jpg" alt="Cute Cat" />   // Redundant

// ✅ Compliant
<img src="cat.jpg" alt="Orange tabby cat sleeping on sofa" />
<img src="decoration.jpg" alt="" role="presentation" />  // Decorative
```

#### S1077 - Image, area, button with image and object elements should have an alternative text

**Severity:** Major | **Type:** Code Smell

Images need alternative text for accessibility.

```tsx
// ❌ Non-compliant
<img src="photo.jpg" />
<Icon name="search" />

// ✅ Compliant
<img src="photo.jpg" alt="Team photo from 2024 retreat" />
<img src="decoration.jpg" alt="" role="presentation" />
<Icon name="search" aria-label="Search" />
// Or if decorative
<Icon name="chevron" aria-hidden="true" />
```

#### S4084 - Media elements should have captions

**Severity:** Major | **Type:** Code Smell

Captions make audio/video accessible.

```tsx
// ❌ Non-compliant
<video src="video.mp4"></video>

// ✅ Compliant
<video src="video.mp4">
  <track kind="captions" src="captions.vtt" />
</video>
```

#### S1090 - iFrames must have a title

**Severity:** Major | **Type:** Code Smell

iframe title helps screen reader users.

```tsx
// ❌ Non-compliant
<iframe src="https://example.com"></iframe>

// ✅ Compliant
<iframe src="https://example.com" title="Example website"></iframe>
```

### Form Controls

#### S6840 - DOM elements should use the "autocomplete" attribute correctly

**Severity:** Minor | **Type:** Code Smell

Correct autocomplete values help users and password managers.

```tsx
// ❌ Non-compliant
<Input type="text" autoComplete="on" />  // Generic
<Input type="email" autoComplete="off" />  // Reduces usability

// ✅ Compliant
<Input type="email" autoComplete="email" />
<Input type="password" autoComplete="current-password" />
<Input type="text" autoComplete="name" />
```

### Tables

#### S5257 - HTML "<table>" should not be used for layout purposes

**Severity:** Major | **Type:** Code Smell

Tables should only be used for data.

```tsx
// ❌ Non-compliant - Layout table
<table>
  <tr>
    <td>Sidebar</td>
    <td>Main content</td>
  </tr>
</table>

// ✅ Compliant - Use CSS for layout
<div className="mdt-flex">
  <aside>Sidebar</aside>
  <main>Main content</main>
</div>

// Data table is fine
<Table>
  <thead><tr><th>Name</th><th>Age</th></tr></thead>
  <tbody><tr><td>John</td><td>30</td></tr></tbody>
</Table>
```

#### S5256 - Tables should have headers

**Severity:** Major | **Type:** Bug

Tables need headers for accessibility.

```tsx
// ❌ Non-compliant
<Table>
  <tbody>
    <tr><td>John</td><td>30</td></tr>
  </tbody>
</Table>

// ✅ Compliant
<Table>
  <thead>
    <tr><th>Name</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>John</td><td>30</td></tr>
  </tbody>
</Table>
```

#### S5260 - Table cells should reference their headers

**Severity:** Major | **Type:** Bug

Complex tables need explicit header associations.

```tsx
// ✅ Compliant - Simple table (implicit association)
<Table>
  <thead><tr><th>Name</th><th>Age</th></tr></thead>
  <tbody><tr><td>John</td><td>30</td></tr></tbody>
</Table>

// ✅ Compliant - Complex table (explicit association)
<Table>
  <thead>
    <tr><th id="name">Name</th><th id="age">Age</th></tr>
  </thead>
  <tbody>
    <tr><td headers="name">John</td><td headers="age">30</td></tr>
  </tbody>
</Table>
```

### Language

#### S5254 - HTML elements should have a valid language attribute

**Severity:** Minor | **Type:** Code Smell

Language attribute helps screen readers.

```tsx
// ❌ Non-compliant
<html>...</html>
<html lang="">...</html>
<html lang="invalid">...</html>

// ✅ Compliant
<html lang="en">...</html>
<span lang="fr">Bonjour</span>
```

---

## 📘 TypeScript-Specific Rules (27 rules)

These rules ensure proper TypeScript usage and type safety.

### Type Safety

#### S4204 - The "any" type should not be used

**Severity:** Major | **Type:** Code Smell

`any` defeats the purpose of TypeScript.

```typescript
// ❌ Non-compliant
function processProps(props: any) {
  return props.value; // No type checking
}

// ✅ Compliant
interface ProcessProps {
  value: string;
}
function processProps(props: ProcessProps) {
  return props.value;
}

// Or use unknown for truly unknown types
function processUnknown(data: unknown) {
  if (typeof data === 'object' && data && 'value' in data) {
    return (data as { value: string }).value;
  }
}
```

#### S2966 - Non-null assertions should not be used

**Severity:** Minor | **Type:** Code Smell

Non-null assertions bypass type checking.

```typescript
// ❌ Non-compliant
const value = obj!.property;
const element = document.getElementById('id')!;

// ✅ Compliant
const value = obj?.property;
const element = document.getElementById('id');
if (element) {
  // Use element
}
```

#### S6568 - Non-null assertions should not be used misleadingly

**Severity:** Major | **Type:** Code Smell

Non-null assertions that don't match runtime behavior.

```typescript
// ❌ Non-compliant
const items: string[] | undefined = getItems();
items!.forEach((item) => {}); // Could throw

// ✅ Compliant
const items = getItems();
items?.forEach((item) => {});
```

#### S4325 - Redundant casts and non-null assertions should be avoided

**Severity:** Minor | **Type:** Code Smell

Unnecessary casts add noise.

```typescript
// ❌ Non-compliant
const str: string = 'hello';
const cast = str as string; // Already a string
const num: number = 42;
const nonNull = num!; // number is not nullable

// ✅ Compliant
const str = 'hello';
const num = 42;
```

### Optional & Nullish

#### S6582 - Optional chaining should be preferred

**Severity:** Minor | **Type:** Code Smell

Optional chaining is more concise and safe.

```typescript
// ❌ Non-compliant
const value = obj && obj.property;
const nested = obj && obj.a && obj.a.b;

// ✅ Compliant
const value = obj?.property;
const nested = obj?.a?.b;
```

#### S6606 - Nullish coalescing should be preferred

**Severity:** Minor | **Type:** Code Smell

Nullish coalescing preserves falsy values.

```typescript
// ❌ Non-compliant - Treats 0, "", false as falsy
const value = obj.value || 'default';

// ✅ Compliant - Only null/undefined trigger default
const value = obj.value ?? 'default';
```

### Enums

#### S6572 - Enum member values should be either all initialized or none

**Severity:** Minor | **Type:** Code Smell

Mixing initialized and uninitialized is confusing.

```typescript
// ❌ Non-compliant
enum Size {
  Small = 1,
  Medium, // Implicitly 2
  Large = 5,
  XLarge, // Implicitly 6
}

// ✅ Compliant - All initialized
enum Size {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  XLarge = 'xl',
}

// Or none initialized
enum Size {
  Small,
  Medium,
  Large,
  XLarge,
}
```

#### S6578 - Enum values should be unique

**Severity:** Major | **Type:** Code Smell

Duplicate values make reverse lookup unreliable.

```typescript
// ❌ Non-compliant
enum Status {
  Active = 1,
  Running = 1, // Duplicate value
}

// ✅ Compliant
enum Status {
  Active = 1,
  Running = 2,
}
```

#### S6583 - Enum members should not mix value types

**Severity:** Minor | **Type:** Code Smell

Mixed types are confusing and error-prone.

```typescript
// ❌ Non-compliant
enum Mixed {
  A = 1,
  B = 'two', // Number and string
}

// ✅ Compliant
enum Numbers {
  A = 1,
  B = 2,
}

enum Strings {
  A = 'one',
  B = 'two',
}
```

#### S6550 - All enum members should be literals

**Severity:** Minor | **Type:** Code Smell

Computed enum values are harder to understand.

```typescript
// ❌ Non-compliant
const getValue = () => 1;
enum Status {
  Active = getValue(), // Computed
}

// ✅ Compliant
enum Status {
  Active = 1,
}
```

### Type Declarations

#### S4322 - Type predicates should be used

**Severity:** Minor | **Type:** Code Smell

Type predicates improve type narrowing.

```typescript
// ❌ Non-compliant
function isString(value: unknown): boolean {
  return typeof value === 'string';
}
const val: unknown = 'hello';
if (isString(val)) {
  val.toUpperCase(); // Error: val is still unknown
}

// ✅ Compliant
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
const val: unknown = 'hello';
if (isString(val)) {
  val.toUpperCase(); // Works: val is narrowed to string
}
```

#### S4323 - Type aliases should be used

**Severity:** Minor | **Type:** Code Smell

Type aliases improve readability for complex types.

```typescript
// ❌ Non-compliant
function handleEvent(
  callback: (event: React.MouseEvent | React.KeyboardEvent, data: unknown) => void
): void {}

// ✅ Compliant
type EventHandler = (event: React.MouseEvent | React.KeyboardEvent, data: unknown) => void;

function handleEvent(callback: EventHandler): void {}
```

#### S6598 - Function types should be preferred

**Severity:** Minor | **Type:** Code Smell

Function types are more concise than call signatures.

```typescript
// ❌ Non-compliant
interface Callback {
  (value: string): void;
}

type Handler = {
  (event: Event): void;
};

// ✅ Compliant
type Callback = (value: string) => void;
type Handler = (event: Event) => void;
```

#### S6564 - Redundant type aliases should not be used

**Severity:** Minor | **Type:** Code Smell

Type aliases that don't add meaning are noise.

```typescript
// ❌ Non-compliant
type MyString = string;
type MyNumber = number;

// ✅ Compliant - Meaningful aliases
type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';
```

#### S4324 - Primitive return types should be used

**Severity:** Minor | **Type:** Code Smell

Use primitives instead of wrapper objects.

```typescript
// ❌ Non-compliant
function getName(): String {
  return new String('John');
}
function getAge(): Number {
  return new Number(30);
}

// ✅ Compliant
function getName(): string {
  return 'John';
}
function getAge(): number {
  return 30;
}
```

### Type Inference

#### S3257 - Primitive types should be omitted from initialized or defaulted declarations

**Severity:** Minor | **Type:** Code Smell

TypeScript infers types from initialization.

```typescript
// ❌ Non-compliant - Redundant type annotations
const name: string = 'John';
const age: number = 30;
const active: boolean = true;

// ✅ Compliant - Let TypeScript infer
const name = 'John';
const age = 30;
const active = true;
```

#### S4157 - Default type parameters should be omitted

**Severity:** Minor | **Type:** Code Smell

Specifying defaults is redundant.

```typescript
// ❌ Non-compliant
function identity<T = unknown>(value: T): T {
  return value;
}
identity<unknown>('test'); // Redundant type argument

// ✅ Compliant
identity('test'); // Let inference work
```

### Classes & Members

#### S2933 - Fields that are only assigned in the constructor should be "readonly"

**Severity:** Minor | **Type:** Code Smell

readonly prevents accidental mutation.

```typescript
// ❌ Non-compliant
class Component {
  private config: Config;
  constructor(config: Config) {
    this.config = config; // Only assigned here
  }
}

// ✅ Compliant
class Component {
  private readonly config: Config;
  constructor(config: Config) {
    this.config = config;
  }
}
```

#### S4136 - Method overloads should be grouped together

**Severity:** Minor | **Type:** Code Smell

Scattered overloads reduce readability.

```typescript
// ❌ Non-compliant
class Utils {
  process(x: string): string;
  other(): void {}
  process(x: number): number; // Not adjacent to other overload
  process(x: any): any {
    return x;
  }
}

// ✅ Compliant
class Utils {
  process(x: string): string;
  process(x: number): number;
  process(x: any): any {
    return x;
  }

  other(): void {}
}
```

### Type Assertions

#### S4137 - Type assertions should use "as"

**Severity:** Minor | **Type:** Code Smell

`as` syntax is less ambiguous in JSX.

```typescript
// ❌ Non-compliant
const value = <string>someValue;

// ✅ Compliant
const value = someValue as string;
```

#### S6590 - "as const" assertions should be preferred

**Severity:** Minor | **Type:** Code Smell

`as const` creates more precise types.

```typescript
// ❌ Non-compliant
const motadataConfig = {
  variant: 'primary' as 'primary',
  size: 'md' as 'md',
};

// ✅ Compliant
const motadataConfig = {
  variant: 'primary',
  size: 'md',
} as const;
```

### Union & Intersection Types

#### S6571 - Type constituents of unions and intersections should not be redundant

**Severity:** Minor | **Type:** Code Smell

Redundant types add confusion.

```typescript
// ❌ Non-compliant
type Variant = 'primary' | 'primary'; // Duplicate
type Value = number | 1; // 1 is subtype of number

// ✅ Compliant
type Variant = 'primary' | 'secondary';
type Value = number;
```

#### S6569 - Unnecessary type constraints should be removed

**Severity:** Minor | **Type:** Code Smell

Default constraints are unnecessary.

```typescript
// ❌ Non-compliant
function identity<T extends unknown>(value: T): T {
  return value;
}

// ✅ Compliant
function identity<T>(value: T): T {
  return value;
}
```

### Props & Parameters

#### S4782 - Optional property declarations should not use both '?' and 'undefined' syntax

**Severity:** Minor | **Type:** Code Smell

Using both is redundant.

```typescript
// ❌ Non-compliant
interface ButtonProps {
  label?: string | undefined; // Redundant
}

// ✅ Compliant
interface ButtonProps {
  label?: string;
}
// Or if undefined should be explicit
interface ButtonProps {
  label: string | undefined;
}
```

#### S4798 - Optional boolean parameters should have default value

**Severity:** Minor | **Type:** Code Smell

Default values make API clearer.

```typescript
// ❌ Non-compliant
function Toggle({ disabled }: { disabled?: boolean }) {
  if (disabled === undefined) {
    // Ambiguous behavior
  }
}

// ✅ Compliant
function Toggle({ disabled = false }: { disabled?: boolean }) {
  if (disabled) {
    // Clear behavior
  }
}
```

### Async/Await

#### S4123 - "await" should only be used with promises

**Severity:** Minor | **Type:** Code Smell

Awaiting non-promises is unnecessary.

```typescript
// ❌ Non-compliant
async function process() {
  const value = await 42; // Not a promise
  const str = await 'hello';
}

// ✅ Compliant
async function process() {
  const value = 42;
  const data = await fetchData(); // Actual promise
}
```

---

## 🔧 Code Quality Rules (45 rules)

These rules ensure maintainable, readable code.

### Complexity

#### S3776 - Cognitive Complexity of functions should not be too high

**Severity:** Critical | **Type:** Code Smell

High complexity makes code hard to understand. **Threshold: 15**

```typescript
// ❌ Non-compliant - Cognitive complexity 20+
function processVariant(variant, size, disabled, loading) {
  if (variant) {
    // +1
    if (size === 'sm') {
      // +2 (nesting)
      if (disabled) {
        // +3 (nesting)
        if (loading) {
          // +4 (nesting)
          // ...
        }
      }
    } else if (size === 'md') {
      // +1
      // ...
    }
  }
}

// ✅ Compliant - Extract methods to reduce complexity
function processVariant(variant, size, disabled, loading) {
  if (!variant) return getDefaultClasses();
  return cn(
    getVariantClasses(variant),
    getSizeClasses(size),
    disabled && getDisabledClasses(),
    loading && getLoadingClasses()
  );
}
```

#### S134 - Control flow statements should not be nested too deeply

**Severity:** Critical | **Type:** Code Smell

Deep nesting indicates need for refactoring. **Threshold: 4 levels**

```typescript
// ❌ Non-compliant - Too deeply nested
if (a) {
  if (b) {
    if (c) {
      if (d) {
        // 4 levels deep
        // ...
      }
    }
  }
}

// ✅ Compliant - Use early returns or extract
if (!a || !b || !c || !d) return;
// ...
```

#### S2004 - Functions should not be nested too deeply

**Severity:** Major | **Type:** Code Smell

Deeply nested functions are hard to follow.

```typescript
// ❌ Non-compliant
function outer() {
  function inner1() {
    function inner2() {
      function inner3() {
        // Too deep
        // ...
      }
    }
  }
}

// ✅ Compliant - Flatten structure
function outer() {
  inner1();
}
function inner1() {
  inner2();
}
function inner2() {
  inner3();
}
function inner3() {
  /* ... */
}
```

### Parameters

#### S107 - Functions should not have too many parameters

**Severity:** Major | **Type:** Code Smell

Too many parameters indicate need for object parameter. **Threshold: 7**

```typescript
// ❌ Non-compliant
function Button(
  variant: string,
  size: string,
  disabled: boolean,
  loading: boolean,
  fullWidth: boolean,
  leftIcon: ReactNode,
  rightIcon: ReactNode,
  onClick: () => void
) {}

// ✅ Compliant - Use props object (standard React pattern)
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
}

function Button(props: ButtonProps) {}
```

### Duplication

#### S1192 - String literals should not be duplicated

**Severity:** Minor | **Type:** Code Smell

Duplicate strings should be constants. **Threshold: 3 occurrences**

```typescript
// ❌ Non-compliant
function getVariantClasses(variant: string) {
  if (variant === 'primary') {
  }
  if (variant === 'primary') {
  } // Duplicate
  console.log('primary'); // Duplicate
}

// ✅ Compliant
const VARIANT_PRIMARY = 'primary';
function getVariantClasses(variant: string) {
  if (variant === VARIANT_PRIMARY) {
  }
  if (variant === VARIANT_PRIMARY) {
  }
  console.log(VARIANT_PRIMARY);
}
```

#### S4144 - Functions should not have identical implementations

**Severity:** Major | **Type:** Code Smell

Duplicate functions should be consolidated.

```typescript
// ❌ Non-compliant
function validateEmail(email: string) {
  return email.includes('@');
}

function checkEmail(email: string) {
  // Same as validateEmail
  return email.includes('@');
}

// ✅ Compliant - Use single function
function validateEmail(email: string) {
  return email.includes('@');
}
```

#### S1871 - Two branches in a conditional structure should not have exactly the same implementation

**Severity:** Major | **Type:** Code Smell

Identical branches are usually copy-paste errors.

```typescript
// ❌ Non-compliant
if (variant === 'primary') {
  return 'mdt-bg-primary';
} else if (variant === 'secondary') {
  return 'mdt-bg-primary'; // Same as if branch - bug?
}

// ✅ Compliant
if (variant === 'primary' || variant === 'secondary') {
  return 'mdt-bg-primary';
}
```

### Dead Code

#### S1172 - Unused function parameters should be removed

**Severity:** Minor | **Type:** Code Smell

Unused parameters are noise.

```typescript
// ❌ Non-compliant
function Button({ label, unused }: Props) {
  return <button>{label}</button>;  // 'unused' never used
}

// ✅ Compliant
function Button({ label }: Props) {
  return <button>{label}</button>;
}

// If parameter must exist for signature, use underscore
const handleChange = (_event: Event, value: string) => {
  process(value);
};
```

#### S1068 - Unused private class members should be removed

**Severity:** Minor | **Type:** Code Smell

Dead code adds maintenance burden.

```typescript
// ❌ Non-compliant
class Component {
  private unused = 42;  // Never used

  render() {
    return <div />;
  }
}

// ✅ Compliant
class Component {
  render() {
    return <div />;
  }
}
```

#### S1854 - Unused assignments should be removed

**Severity:** Major | **Type:** Code Smell

Assigned but unused values are often bugs.

```typescript
// ❌ Non-compliant
function getClasses() {
  let result = 'mdt-base';
  result = 'mdt-primary'; // First assignment unused
  return result;
}

// ✅ Compliant
function getClasses() {
  const result = 'mdt-primary';
  return result;
}
```

### Redundant Code

#### S3626 - Jump statements should not be redundant

**Severity:** Minor | **Type:** Code Smell

Redundant returns, continues, and breaks add noise.

```typescript
// ❌ Non-compliant
function process() {
  doSomething();
  return; // Redundant
}

// ✅ Compliant
function process() {
  doSomething();
}
```

#### S1488 - Local variables should not be declared and then immediately returned or thrown

**Severity:** Minor | **Type:** Code Smell

Direct return is cleaner.

```typescript
// ❌ Non-compliant
function getClasses(variant: string) {
  const classes = cn('mdt-base', variant);
  return classes;
}

// ✅ Compliant
function getClasses(variant: string) {
  return cn('mdt-base', variant);
}
```

#### S1066 - Mergeable "if" statements should be combined

**Severity:** Minor | **Type:** Code Smell

Nested ifs with same body should be merged.

```typescript
// ❌ Non-compliant
if (disabled) {
  if (loading) {
    return 'mdt-disabled';
  }
}

// ✅ Compliant
if (disabled && loading) {
  return 'mdt-disabled';
}
```

### Switch Statements

#### S1821 - "switch" statements should not be nested

**Severity:** Major | **Type:** Code Smell

Nested switches are hard to follow.

```typescript
// ❌ Non-compliant
switch (variant) {
  case 'primary':
    switch (
      size // Nested switch
    ) {
      case 'sm':
        return 'mdt-p-2';
    }
    break;
}

// ✅ Compliant - Extract to function
switch (variant) {
  case 'primary':
    return getSizeClasses(size);
}

function getSizeClasses(size: string) {
  switch (size) {
    case 'sm':
      return 'mdt-p-2';
    case 'md':
      return 'mdt-p-4';
    default:
      return 'mdt-p-3';
  }
}
```

#### S131 - "switch" statements should have "default" clauses

**Severity:** Major | **Type:** Code Smell

Default ensures all cases handled.

```typescript
// ❌ Non-compliant
switch (variant) {
  case 'primary':
    return 'mdt-bg-primary';
  case 'secondary':
    return 'mdt-bg-secondary';
  // What if variant is something else?
}

// ✅ Compliant
switch (variant) {
  case 'primary':
    return 'mdt-bg-primary';
  case 'secondary':
    return 'mdt-bg-secondary';
  default:
    return 'mdt-bg-primary'; // Fallback
}
```

#### S128 - Switch cases should end with an unconditional "break" statement

**Severity:** Critical | **Type:** Code Smell

Fall-through is usually a bug.

```typescript
// ❌ Non-compliant
switch (variant) {
  case 'primary':
    classes.push('mdt-bg-primary');
  // Missing break - falls through
  case 'secondary':
    classes.push('mdt-text-white');
    break;
}

// ✅ Compliant
switch (variant) {
  case 'primary':
    classes.push('mdt-bg-primary');
    break;
  case 'secondary':
    classes.push('mdt-bg-secondary');
    break;
}

// If fall-through is intentional, comment it
switch (variant) {
  case 'primary':
  case 'default': // Intentional fall-through
    classes.push('mdt-bg-primary');
    break;
}
```

#### S1479 - "switch" statements should not have too many "case" clauses

**Severity:** Major | **Type:** Code Smell

Too many cases indicate need for refactoring. **Threshold: 30**

```typescript
// ❌ Non-compliant - Too many cases
switch (iconName) {
  case "add": return <AddIcon />;
  case "edit": return <EditIcon />;
  // ... 50 more cases
}

// ✅ Compliant - Use object mapping
const iconMap = {
  add: AddIcon,
  edit: EditIcon,
  // ...
};

function Icon({ name }: { name: string }) {
  const Icon = iconMap[name];
  return Icon ? <Icon /> : null;
}
```

### Ternary Operators

#### S3358 - Ternary operators should not be nested

**Severity:** Major | **Type:** Code Smell

Nested ternaries are hard to read.

```typescript
// ❌ Non-compliant
const size = isSmall ? 'sm' : isMedium ? 'md' : isLarge ? 'lg' : 'md';

// ✅ Compliant
let size: string;
if (isSmall) {
  size = 'sm';
} else if (isMedium) {
  size = 'md';
} else if (isLarge) {
  size = 'lg';
} else {
  size = 'md';
}

// Or use a function
function getSize(isSmall, isMedium, isLarge) {
  if (isSmall) return 'sm';
  if (isMedium) return 'md';
  if (isLarge) return 'lg';
  return 'md';
}
```

### Variables

#### S1117 - Variables should not be shadowed

**Severity:** Major | **Type:** Code Smell

Shadowing causes confusion about which variable is used.

```typescript
// ❌ Non-compliant
const variant = 'primary';
function Button({ variant }: Props) {
  // Shadows outer variant
  console.log(variant);
}

// ✅ Compliant
const defaultVariant = 'primary';
function Button({ variant }: Props) {
  console.log(variant);
}
```

#### S2392 - Variables should be used in the blocks where they are declared

**Severity:** Minor | **Type:** Code Smell

Variables should be declared close to usage.

```typescript
// ❌ Non-compliant
function Button(props: Props) {
  let classes;  // Declared too early

  // ... 50 lines of code ...

  classes = cn("mdt-btn", props.variant);
  return <button className={classes} />;
}

// ✅ Compliant
function Button(props: Props) {
  // ... 50 lines of code ...

  const classes = cn("mdt-btn", props.variant);
  return <button className={classes} />;
}
```

### Boolean Expressions

#### S1125 - Boolean literals should not be used in comparisons

**Severity:** Minor | **Type:** Code Smell

Direct boolean use is cleaner.

```typescript
// ❌ Non-compliant
if (disabled === true) {
}
if (loading === false) {
}
return isActive ? true : false;

// ✅ Compliant
if (disabled) {
}
if (!loading) {
}
return isActive;
```

#### S2589 - Boolean expressions should not be gratuitous

**Severity:** Major | **Type:** Code Smell

Always-true or always-false expressions are bugs.

```typescript
// ❌ Non-compliant
const x = true;
if (x) {
} // Always true

const disabled = false;
if (disabled) {
} // Never executes

// ✅ Compliant
if (someCondition) {
}
```

### Equality

#### S1440 - "===" and "!==" should be used instead of "==" and "!="

**Severity:** Major | **Type:** Code Smell

Strict equality prevents type coercion bugs.

```typescript
// ❌ Non-compliant
if (variant == null) {
}
if (size != 'sm') {
}

// ✅ Compliant
if (variant === null || variant === undefined) {
}
if (size !== 'sm') {
}

// Note: == null is sometimes acceptable for null/undefined check
if (value == null) {
} // Checks both null and undefined
```

### Error Handling

#### S2486 - Exceptions should not be ignored

**Severity:** Major | **Type:** Code Smell

Silent catch blocks hide errors.

```typescript
// ❌ Non-compliant
try {
  parseJSON(data);
} catch (e) {
  // Ignored
}

// ✅ Compliant
try {
  parseJSON(data);
} catch (e) {
  console.error('Failed to parse JSON:', e);
  // Or handle appropriately
}
```

#### S2737 - "catch" clauses should do more than rethrow

**Severity:** Major | **Type:** Code Smell

Catch that only rethrows is pointless.

```typescript
// ❌ Non-compliant
try {
  riskyOperation();
} catch (e) {
  throw e;
}

// ✅ Compliant - Just don't catch
riskyOperation();

// Or add value
try {
  riskyOperation();
} catch (e) {
  console.error('Operation failed', e);
  throw e;
}
```

### Comments & Documentation

#### S1135 - Track uses of "TODO" tags

**Severity:** Info | **Type:** Code Smell

TODOs should be tracked and addressed.

```typescript
// ⚠️ Tracked - Address before release
// TODO: Add loading state
// FIXME: Handle edge case for empty array
```

#### S125 - Sections of code should not be commented out

**Severity:** Major | **Type:** Code Smell

Commented code should be removed; use version control.

```typescript
// ❌ Non-compliant
function Button(props: Props) {
  // const oldClasses = getOldClasses();
  // return <button className={oldClasses} />;
  return <button className={getClasses(props)} />;
}

// ✅ Compliant - Remove commented code
function Button(props: Props) {
  return <button className={getClasses(props)} />;
}
```

### Functions

#### S1186 - Functions should not be empty

**Severity:** Major | **Type:** Code Smell

Empty functions often indicate incomplete code.

```tsx
// ❌ Non-compliant
function handleClick() {}
const onChange = () => {};

// ✅ Compliant
function handleClick() {
  // Intentionally empty - used as no-op callback
}

// Or provide meaningful implementation
function handleClick() {
  console.log('Button clicked');
}
```

#### S138 - Functions should not have too many lines of code

**Severity:** Major | **Type:** Code Smell

Long functions should be split. **Threshold: 200 lines**

```typescript
// ❌ Non-compliant - 300 line function
function ComplexComponent() {
  // ... 300 lines of code ...
}

// ✅ Compliant - Split into smaller functions
function ComplexComponent() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}
```

#### S3801 - Functions should use "return" consistently

**Severity:** Major | **Type:** Code Smell

Mixed return styles are confusing.

```typescript
// ❌ Non-compliant
function getClasses(variant: string) {
  if (variant === 'primary') {
    return 'mdt-bg-primary';
  }
  // Implicit undefined return
}

// ✅ Compliant
function getClasses(variant: string): string {
  if (variant === 'primary') {
    return 'mdt-bg-primary';
  }
  return 'mdt-bg-default';
}
```

### Lines & Formatting

#### S104 - Files should not have too many lines of code

**Severity:** Major | **Type:** Code Smell

Large files should be split. **Threshold: 1000 lines**

```typescript
// ❌ Non-compliant - 1500 line file
// src/components/Everything.tsx

// ✅ Compliant - Split into focused files
// src/components/Button/Button.tsx
// src/components/Input/Input.tsx
// src/components/Select/Select.tsx
```

#### S103 - Lines should not be too long

**Severity:** Minor | **Type:** Code Smell

Long lines are hard to read. **Threshold: 180 characters**

```typescript
// ❌ Non-compliant
const classes = cn(
  'mdt-inline-flex mdt-items-center mdt-justify-center mdt-rounded-md mdt-font-medium mdt-transition-colors focus-visible:mdt-outline-none focus-visible:mdt-ring-2 disabled:mdt-pointer-events-none disabled:mdt-opacity-50'
);

// ✅ Compliant - Break into multiple lines
const classes = cn(
  'mdt-inline-flex mdt-items-center mdt-justify-center',
  'mdt-rounded-md mdt-font-medium mdt-transition-colors',
  'focus-visible:mdt-outline-none focus-visible:mdt-ring-2',
  'disabled:mdt-pointer-events-none disabled:mdt-opacity-50'
);
```

#### S122 - Statements should be on separate lines

**Severity:** Minor | **Type:** Code Smell

Multiple statements per line reduce readability.

```typescript
// ❌ Non-compliant
const a = 1;
const b = 2;
const c = 3;

// ✅ Compliant
const a = 1;
const b = 2;
const c = 3;
```

---

## 🧪 Testing Rules (12 rules)

These rules ensure effective tests with Vitest and React Testing Library.

### Test Structure

#### S2699 - Tests should include assertions

**Severity:** Major | **Type:** Code Smell

Tests without assertions don't verify anything.

```typescript
// ❌ Non-compliant
it("should render", () => {
  render(<Button>Click</Button>);
  // No assertion
});

// ✅ Compliant
it("should render", () => {
  render(<Button>Click</Button>);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
```

#### S2187 - Test files should contain at least one test case

**Severity:** Major | **Type:** Code Smell

Empty test files are noise.

```typescript
// ❌ Non-compliant
describe("Button", () => {
  // No tests
});

// ✅ Compliant
describe("Button", () => {
  it("should render with default props", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

#### S6426 - Exclusive tests should not be committed to version control

**Severity:** Blocker | **Type:** Bug

`.only()` skips other tests and should not be committed.

```typescript
// ❌ Non-compliant
it.only('should work', () => {}); // Skips all other tests
describe.only('feature', () => {});

// ✅ Compliant
it('should work', () => {});
describe('feature', () => {});
```

### Assertions

#### S2970 - Assertions should be complete

**Severity:** Major | **Type:** Code Smell

Incomplete assertions don't verify anything.

```typescript
// ❌ Non-compliant
expect(result).toBe; // Missing call
expect(result).toEqual; // Missing call

// ✅ Compliant
expect(result).toBe(expected);
expect(result).toEqual(expected);
```

#### S3415 - Assertion arguments should be passed in the correct order

**Severity:** Major | **Type:** Code Smell

Swapped arguments give confusing error messages.

```typescript
// ❌ Non-compliant - Swapped order
expect('expected').toBe(actual);

// ✅ Compliant
expect(actual).toBe('expected');
```

#### S5863 - Assertions should not be given twice the same argument

**Severity:** Major | **Type:** Bug

Comparing value to itself is meaningless.

```typescript
// ❌ Non-compliant
expect(value).toBe(value);
expect(obj).toEqual(obj);

// ✅ Compliant
expect(value).toBe(expected);
expect(obj).toEqual(expectedObj);
```

### Test Quality

#### S5973 - Tests should be stable

**Severity:** Major | **Type:** Code Smell

Flaky tests undermine confidence.

```typescript
// ❌ Non-compliant - Time-dependent
it('should have recent timestamp', () => {
  const item = createItem();
  expect(item.createdAt).toBe(new Date()); // May fail
});

// ✅ Compliant
it('should have recent timestamp', () => {
  const before = Date.now();
  const item = createItem();
  const after = Date.now();
  expect(item.createdAt.getTime()).toBeGreaterThanOrEqual(before);
  expect(item.createdAt.getTime()).toBeLessThanOrEqual(after);
});
```

#### S5958 - Tests should check which exception is thrown

**Severity:** Major | **Type:** Code Smell

Generic exception checking may pass for wrong reason.

```typescript
// ❌ Non-compliant
it('should throw', () => {
  expect(() => validateProps(null)).toThrow(); // Any error passes
});

// ✅ Compliant
it('should throw validation error', () => {
  expect(() => validateProps(null)).toThrow('Props cannot be null');
  // Or check error type
  expect(() => validateProps(null)).toThrow(ValidationError);
});
```

### Async Tests

#### S6079 - Tests should not execute any code after "done()" is called

**Severity:** Major | **Type:** Code Smell

Code after done() may not execute or cause issues.

```typescript
// ❌ Non-compliant
it('async test', (done) => {
  fetchData().then((data) => {
    done();
    expect(data).toBeDefined(); // After done()
  });
});

// ✅ Compliant
it('async test', (done) => {
  fetchData().then((data) => {
    expect(data).toBeDefined();
    done();
  });
});

// Better: Use async/await
it('async test', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

### Timeouts

#### S6080 - Disabling Mocha/Vitest timeouts should be explicit

**Severity:** Major | **Type:** Bug

Disabled timeouts can cause hanging tests.

```typescript
// ❌ Non-compliant - Implicit infinite timeout
it('long test', () => {
  // Very long operation
}, 0);

// ✅ Compliant - Explicit timeout
it('long test', () => {
  // Very long operation
}, 30000); // 30 seconds

// Or use Vitest config for global timeout
```

---

## 🐛 Bug Detection Rules (35 rules)

These rules catch common programming errors.

### Control Flow

#### S3923 - All branches in a conditional structure should not have exactly the same implementation

**Severity:** Major | **Type:** Bug

Identical branches indicate a copy-paste error.

```typescript
// ❌ Non-compliant
if (variant === 'primary') {
  return 'mdt-bg-blue-500';
} else {
  return 'mdt-bg-blue-500'; // Same as if branch
}

// ✅ Compliant
if (variant === 'primary') {
  return 'mdt-bg-primary';
} else {
  return 'mdt-bg-secondary';
}
```

#### S1862 - "if/else if" chains and "switch" cases should not have the same condition

**Severity:** Major | **Type:** Bug

Duplicate conditions mean dead code.

```typescript
// ❌ Non-compliant
if (size === 'sm') {
  return 'mdt-p-2';
} else if (size === 'sm') {
  // Duplicate, never reached
  return 'mdt-p-3';
}

// ✅ Compliant
if (size === 'sm') {
  return 'mdt-p-2';
} else if (size === 'md') {
  return 'mdt-p-3';
}
```

#### S1763 - All code should be reachable

**Severity:** Major | **Type:** Bug

Unreachable code is usually a bug.

```typescript
// ❌ Non-compliant
function getClasses(variant: string) {
  return 'mdt-base';
  return 'mdt-' + variant; // Unreachable
}

// ✅ Compliant
function getClasses(variant: string) {
  return cn('mdt-base', `mdt-${variant}`);
}
```

#### S1751 - Loops with at most one iteration should be refactored

**Severity:** Major | **Type:** Bug

A loop that executes at most once is probably a bug.

```typescript
// ❌ Non-compliant
for (const item of items) {
  return item; // Loop always exits on first iteration
}

// ✅ Compliant - Use direct access
return items[0];
```

### Arrays & Collections

#### S4158 - Empty collections should not be accessed or iterated

**Severity:** Major | **Type:** Bug

Accessing elements of collections known to be empty is a bug.

```typescript
// ❌ Non-compliant
const items: string[] = [];
const first = items[0]; // Always undefined
for (const item of []) {
  // Never executes
  process(item);
}

// ✅ Compliant - Check before access
if (items.length > 0) {
  const first = items[0];
}
```

#### S4143 - Collection elements should not be replaced unconditionally

**Severity:** Major | **Type:** Bug

Overwriting collection elements in a loop is usually a bug.

```typescript
// ❌ Non-compliant
const classMap = new Map();
for (const variant of variants) {
  classMap.set('class', variant); // Always overwrites
}

// ✅ Compliant
const classMap = new Map();
for (const variant of variants) {
  classMap.set(variant.name, variant.class); // Unique keys
}
```

### Type & Value Errors

#### S1764 - Identical expressions should not be used on both sides of a binary operator

**Severity:** Major | **Type:** Bug

This is usually a copy-paste error.

```typescript
// ❌ Non-compliant
if (size === size) {
} // Always true
const result = padding - padding; // Always 0

// ✅ Compliant
if (size === expectedSize) {
}
const result = padding - margin;
```

#### S2688 - "NaN" should not be used in comparisons

**Severity:** Major | **Type:** Bug

NaN is not equal to anything, including itself.

```typescript
// ❌ Non-compliant - Always false
if (value === NaN) {
}
if (value !== NaN) {
} // Always true

// ✅ Compliant
if (Number.isNaN(value)) {
}
if (!Number.isNaN(value)) {
}
```

#### S2757 - Non-existent operators '=+', '=-' and '=!' should not be used

**Severity:** Major | **Type:** Bug

These are likely typos for compound assignment operators.

```typescript
// ❌ Non-compliant - Probably meant +=
padding = +10; // Assigns +10 to padding
margin = -5; // Assigns -5 to margin

// ✅ Compliant
padding += 10;
margin -= 5;
```

#### S6534 - Numbers should not lose precision

**Severity:** Major | **Type:** Bug

Large integers lose precision in JavaScript.

```typescript
// ❌ Non-compliant - Loses precision
const id = 9999999999999999; // Becomes 10000000000000000

// ✅ Compliant - Use BigInt for large integers
const id = 9999999999999999n;
const id = BigInt('9999999999999999');
```

### Promises & Async

#### S6544 - Promises should not be misused

**Severity:** Major | **Type:** Bug

Misusing promises leads to unhandled rejections.

```typescript
// ❌ Non-compliant - Floating promise
async function loadData() {
  fetchData(); // Promise not awaited
}

// ❌ Non-compliant - Promise in condition
if (fetchData()) {
  // Always truthy (Promise object)
  console.log('Loaded');
}

// ✅ Compliant
async function loadData() {
  await fetchData();
}

if (await fetchData()) {
  console.log('Loaded');
}
```

#### S4822 - Promise rejections should not be caught by "try" blocks

**Severity:** Major | **Type:** Bug

Without await, try-catch won't catch promise rejections.

```typescript
// ❌ Non-compliant - Won't catch rejection
try {
  fetchData(); // Returns promise
} catch (e) {
  console.error(e); // Never reached
}

// ✅ Compliant
try {
  await fetchData();
} catch (e) {
  console.error(e);
}
```

### Functions & Methods

#### S3699 - The return value of void functions should not be used

**Severity:** Major | **Type:** Bug

Using the return value of void functions is meaningless.

```typescript
// ❌ Non-compliant
const result = console.log('Hello'); // undefined
if (arr.push(item)) {
} // Returns length, not boolean

// ✅ Compliant
console.log('Hello');
arr.push(item);
if (arr.includes(item)) {
}
```

#### S3984 - Errors should not be created without being thrown

**Severity:** Major | **Type:** Bug

Creating an error without throwing it is usually a mistake.

```typescript
// ❌ Non-compliant
function validateProps(props: Props) {
  if (!props.label) {
    new Error('Label is required'); // Not thrown
  }
}

// ✅ Compliant
function validateProps(props: Props) {
  if (!props.label) {
    throw new Error('Label is required');
  }
}
```

#### S2201 - Return values from functions without side effects should not be ignored

**Severity:** Major | **Type:** Bug

Ignoring return values of pure functions is usually a bug.

```typescript
// ❌ Non-compliant
const classes = 'mdt-base';
classes.concat(' mdt-primary'); // Return value ignored, string unchanged

// ✅ Compliant
const classes = 'mdt-base';
const newClasses = classes.concat(' mdt-primary');
```

#### S1154 - Results of operations on strings should not be ignored

**Severity:** Major | **Type:** Bug

String methods don't mutate, they return new strings.

```typescript
// ❌ Non-compliant
let className = 'mdt-button';
className.replace('button', 'btn'); // Return value ignored

// ✅ Compliant
let className = 'mdt-button';
className = className.replace('button', 'btn');
```

### Variables & Assignments

#### S1656 - Variables should not be self-assigned

**Severity:** Major | **Type:** Bug

Self-assignment is a no-op and likely a typo.

```typescript
// ❌ Non-compliant
let variant = 'primary';
variant = variant; // Self-assignment

// ✅ Compliant
let variant = 'primary';
variant = newVariant;
```

#### S2123 - Values should not be uselessly incremented

**Severity:** Major | **Type:** Bug

Post-increment return value ignored at statement end.

```typescript
// ❌ Non-compliant
function getIndex(index: number) {
  return index++; // Returns original value, increment is lost
}

// ✅ Compliant
function getIndex(index: number) {
  return index + 1;
}
```

### Classes & Constructors

#### S4275 - Getters and setters should access the expected fields

**Severity:** Major | **Type:** Bug

Getters/setters accessing wrong fields is a bug.

```typescript
// ❌ Non-compliant
class Theme {
  private _primary: string;
  private _secondary: string;

  get primary() {
    return this._secondary; // Wrong field
  }
}

// ✅ Compliant
class Theme {
  private _primary: string;

  get primary() {
    return this._primary;
  }
}
```

### Destructuring

#### S3799 - Destructuring patterns should not be empty

**Severity:** Major | **Type:** Bug

Empty destructuring is meaningless.

```typescript
// ❌ Non-compliant
const {} = props;
const [] = items;

// ✅ Compliant
const { variant, size } = props;
const [first, second] = items;
```

### Built-ins

#### S2424 - Built-in objects should not be overridden

**Severity:** Major | **Type:** Bug

Overriding built-ins causes global issues.

```typescript
// ❌ Non-compliant
Object = null;
Array.prototype.map = function () {};
String = class {};

// ✅ Compliant - Don't override built-ins
// Create your own utilities instead
function mapItems(items, fn) {}
```

---

## 🚀 Modern JavaScript/ES6+ Rules (15 rules)

These rules encourage modern JavaScript patterns.

### Variable Declarations

#### S3504 - Variables should be declared with "let" or "const"

**Severity:** Major | **Type:** Code Smell

`var` has function scope, which causes bugs.

```typescript
// ❌ Non-compliant
var variant = 'primary';
for (var i = 0; i < 10; i++) {}

// ✅ Compliant
const variant = 'primary';
for (let i = 0; i < 10; i++) {}
```

#### S3353 - Unchanged variables should be marked as "const"

**Severity:** Minor | **Type:** Code Smell

`const` communicates intent and prevents bugs.

```typescript
// ❌ Non-compliant
let variant = 'primary'; // Never reassigned
let classes = cn('mdt-base'); // Never reassigned

// ✅ Compliant
const variant = 'primary';
const classes = cn('mdt-base');
```

### Template Literals

#### S3512 - Template strings should be used instead of concatenation

**Severity:** Minor | **Type:** Code Smell

Template literals are more readable.

```typescript
// ❌ Non-compliant
const classes = 'mdt-' + variant + '-' + size;
const message = 'Button ' + label + ' clicked';

// ✅ Compliant
const classes = `mdt-${variant}-${size}`;
const message = `Button ${label} clicked`;
```

#### S4624 - Template literals should not be nested

**Severity:** Major | **Type:** Code Smell

Nested template literals are hard to read.

```typescript
// ❌ Non-compliant
const classes = `mdt-${`btn-${variant}`}`;

// ✅ Compliant
const btnClass = `btn-${variant}`;
const classes = `mdt-${btnClass}`;
```

### Object & Array Syntax

#### S3498 - Object literal shorthand syntax should be used

**Severity:** Minor | **Type:** Code Smell

Shorthand is more concise.

```typescript
// ❌ Non-compliant
const variant = 'primary';
const size = 'md';
const props = { variant: variant, size: size };

// ✅ Compliant
const props = { variant, size };
```

#### S3514 - Destructuring syntax should be used for assignments

**Severity:** Minor | **Type:** Code Smell

Destructuring is more concise.

```typescript
// ❌ Non-compliant
const variant = props.variant;
const size = props.size;
const first = items[0];
const second = items[1];

// ✅ Compliant
const { variant, size } = props;
const [first, second] = items;
```

#### S6661 - Object spread syntax should be used instead of "Object.assign"

**Severity:** Minor | **Type:** Code Smell

Spread is more readable.

```typescript
// ❌ Non-compliant
const merged = Object.assign({}, defaultProps, props);
const copy = Object.assign({}, original);

// ✅ Compliant
const merged = { ...defaultProps, ...props };
const copy = { ...original };
```

#### S6666 - Spread syntax should be used instead of "apply()"

**Severity:** Minor | **Type:** Code Smell

Spread is cleaner for function calls.

```typescript
// ❌ Non-compliant
Math.max.apply(null, numbers);
fn.apply(this, args);

// ✅ Compliant
Math.max(...numbers);
fn(...args);
```

### String Methods

#### S6557 - Ends of strings should be checked with "startsWith()" and "endsWith()"

**Severity:** Minor | **Type:** Code Smell

Built-in methods are more readable.

```typescript
// ❌ Non-compliant
className.indexOf('mdt-') === 0;
className.slice(-3) === 'btn';

// ✅ Compliant
className.startsWith('mdt-');
className.endsWith('btn');
```

### Imports

#### S3533 - "import" should be used to include external code

**Severity:** Major | **Type:** Code Smell

ES modules are standard.

```typescript
// ❌ Non-compliant
const React = require('react');
const { cn } = require('../utils');

// ✅ Compliant
import React from 'react';
import { cn } from '../utils';
```

#### S3863 - Imports from the same module should be merged

**Severity:** Minor | **Type:** Code Smell

Merged imports are cleaner.

```typescript
// ❌ Non-compliant
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

// ✅ Compliant
import { useState, useEffect, useRef } from 'react';
```

#### S6522 - Import variables should not be reassigned

**Severity:** Major | **Type:** Bug

Imports are read-only bindings.

```typescript
// ❌ Non-compliant
import { cn } from '../utils';
cn = () => {}; // Error: Cannot assign to import

// ✅ Compliant
import { cn } from '../utils';
const customCn = (...args) => cn(...args, 'custom');
```

### Modules

#### S6859 - Imports should not use absolute paths

**Severity:** Minor | **Type:** Code Smell

Relative paths are more portable.

```typescript
// ❌ Non-compliant
import { Button } from '/Users/dev/project/src/components/Button';

// ✅ Compliant
import { Button } from '../components/Button';
import { Button } from '@/components/Button'; // Path alias OK
```

#### S6861 - Mutable variables should not be exported

**Severity:** Major | **Type:** Code Smell

Exported mutable state is hard to track.

```typescript
// ❌ Non-compliant
export let currentTheme = 'light';

// ✅ Compliant
let currentTheme = 'light';
export const getTheme = () => currentTheme;
export const setTheme = (theme: string) => {
  currentTheme = theme;
};
```

---

## 🔍 Regular Expression Rules (12 rules)

These rules ensure safe and readable regular expressions.

### Complexity

#### S5843 - Regular expressions should not be too complicated

**Severity:** Critical | **Type:** Code Smell

Complex regex is hard to understand and maintain.

```typescript
// ❌ Non-compliant - Too complex
const email =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

// ✅ Compliant - Use library or simpler regex
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### Syntax

#### S5856 - Regular expressions should be syntactically valid

**Severity:** Blocker | **Type:** Bug

Invalid regex throws at runtime.

```typescript
// ❌ Non-compliant - Invalid regex
const re = new RegExp('['); // Throws SyntaxError

// ✅ Compliant
const re = new RegExp('\\[');
const re = /\[/;
```

#### S2639 - Empty character classes should not be used

**Severity:** Major | **Type:** Bug

Empty character classes `[]` never match anything.

```typescript
// ❌ Non-compliant
const re = /mdt-[]button/; // Empty class, never matches

// ✅ Compliant
const re = /mdt-[a-z]button/;
```

### Style

#### S6325 - Regular expression literals should be used when possible

**Severity:** Minor | **Type:** Code Smell

Literals are more readable than RegExp constructor.

```typescript
// ❌ Non-compliant
const re = new RegExp('mdt-\\w+');
const re2 = new RegExp('button', 'i');

// ✅ Compliant
const re = /mdt-\w+/;
const re2 = /button/i;

// Constructor OK when pattern is dynamic
const re = new RegExp(userPattern);
```

#### S6326 - Regular expressions should not contain multiple spaces

**Severity:** Minor | **Type:** Code Smell

Multiple spaces are hard to count.

```typescript
// ❌ Non-compliant
const re = /hello   world/; // How many spaces?

// ✅ Compliant
const re = /hello {3}world/;
const re = /hello\s{3}world/;
```

#### S6397 - Character classes in regular expressions should not contain only one character

**Severity:** Minor | **Type:** Code Smell

Single-character classes are unnecessary.

```typescript
// ❌ Non-compliant
const re = /[a]bc/; // Just use 'a'

// ✅ Compliant
const re = /abc/;
```

#### S5869 - Character classes in regular expressions should not contain the same character twice

**Severity:** Major | **Type:** Code Smell

Duplicate characters in character classes are noise.

```typescript
// ❌ Non-compliant
const re = /[abca]/; // 'a' is duplicated

// ✅ Compliant
const re = /[abc]/;
```

### Groups

#### S5860 - Names of regular expressions named groups should be used

**Severity:** Major | **Type:** Code Smell

Unused named groups add noise.

```typescript
// ❌ Non-compliant
const re = /(?<variant>primary|secondary)-(?<size>sm|md|lg)/;
const match = str.match(re);
console.log(match[1], match[2]); // Not using named groups

// ✅ Compliant
const re = /(?<variant>primary|secondary)-(?<size>sm|md|lg)/;
const match = str.match(re);
console.log(match.groups.variant, match.groups.size);
```

#### S6323 - Alternation in regular expressions should not contain empty alternatives

**Severity:** Major | **Type:** Bug

Empty alternatives are usually mistakes.

```typescript
// ❌ Non-compliant
const re = /mdt-|button/; // Empty alternative before pipe

// ✅ Compliant
const re = /mdt-button|btn/;
```

### Security

#### S2631 - Regular expressions should not be vulnerable to Denial of Service attacks

**Severity:** Major | **Type:** Vulnerability

ReDoS attacks use malicious input to cause regex backtracking.

```typescript
// ❌ Non-compliant - ReDoS vulnerable (catastrophic backtracking)
const re = /^(a+)+$/;
re.test(userInput);

// ✅ Compliant
const re = /^a+$/;
// Or validate input length first
if (userInput.length < 100) {
  re.test(userInput);
}
```

---

## 🔒 Client-Side Security Rules (8 rules)

These rules prevent client-side security vulnerabilities relevant to UI components.

### XSS Prevention

#### S6696 - DOM updates should not lead to cross-site scripting (XSS) attacks

**Severity:** Critical | **Type:** Vulnerability

DOM-based XSS occurs when untrusted data is used to update the DOM.

```tsx
// ❌ Non-compliant - XSS vulnerable
element.innerHTML = userInput;
<div dangerouslySetInnerHTML={{ __html: userInput }} />;

// ✅ Compliant - Use textContent
element.textContent = userInput;

// Or sanitize if HTML is needed
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />;
```

### Link Security

#### S5148 - Authorizing an opened window to access back to the originating window is security-sensitive

**Severity:** Medium | **Type:** Security Hotspot

Opened windows can manipulate the opener.

```tsx
// ❌ Non-compliant
window.open(url);
<a href={url} target="_blank">
  Link
</a>;

// ✅ Compliant
window.open(url, '_blank', 'noopener,noreferrer');
<a href={url} target="_blank" rel="noopener noreferrer">
  Link
</a>;
```

### Debugging

#### S1525 - Debugger statements should not be used

**Severity:** Major | **Type:** Vulnerability

Debugger statements should not be in production code.

```typescript
// ❌ Non-compliant
function Button(props: Props) {
  debugger;  // Should not be in production
  return <button>{props.label}</button>;
}

// ✅ Compliant - Remove debugger
function Button(props: Props) {
  return <button>{props.label}</button>;
}
```

### Prototype Pollution

#### S6643 - Prototypes of builtin objects should not be modified

**Severity:** Major | **Type:** Code Smell

Modifying prototypes affects all instances and can cause security issues.

```typescript
// ❌ Non-compliant
Array.prototype.customMethod = function () {};
Object.prototype.toString = function () {};

// ✅ Compliant - Don't modify built-in prototypes
// Create utility functions instead
function customArrayMethod(arr) {}
```

### Deprecated APIs

#### S2817 - Web SQL databases should not be used

**Severity:** Major | **Type:** Vulnerability

Web SQL is deprecated and has security issues.

```typescript
// ❌ Non-compliant
const db = openDatabase('mydb', '1.0', 'My Database', 2 * 1024 * 1024);

// ✅ Compliant - Use IndexedDB or localStorage
const data = localStorage.getItem('key');
```

### Hardcoded Values

#### S1313 - Using hardcoded IP addresses is security-sensitive

**Severity:** Low | **Type:** Security Hotspot

Hardcoded IPs reduce flexibility.

```typescript
// ⚠️ Review Required
const apiUrl = 'http://192.168.1.100/api';

// ✅ Compliant - Use environment variables or config
const apiUrl = process.env.REACT_APP_API_URL;
```

### Execution

#### S1523 - Dynamically executing code is security-sensitive

**Severity:** Medium | **Type:** Security Hotspot

Dynamic code execution can lead to injection.

```typescript
// ⚠️ Review Required
eval(code);
new Function(code)();
setTimeout(code, 1000); // When code is a string

// ✅ Compliant - Avoid dynamic execution
setTimeout(() => {
  /* function */
}, 1000);
```

---

## ESLint Integration

### Installation

```bash
npm install -D eslint-plugin-sonarjs
```

### Configuration (ESLint 9+ / Flat Config)

```javascript
// eslint.config.js
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  sonarjs.configs.recommended,
  {
    plugins: { sonarjs },
    rules: {
      // Customize rules here
    },
  },
];
```

### Configuration (ESLint 8 / Legacy)

```json
{
  "plugins": ["sonarjs"],
  "extends": ["plugin:sonarjs/recommended-legacy"],
  "rules": {
    // Customize rules here
  }
}
```

---

## Recommended Configuration for This Library

Based on this React component library's requirements:

```javascript
// eslint.config.js
import sonarjs from 'eslint-plugin-sonarjs';

export default [
  sonarjs.configs.recommended,
  {
    plugins: { sonarjs },
    rules: {
      // === CRITICAL - Must Fix ===
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': ['error', { threshold: 3 }],
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-all-duplicated-branches': 'error',
      'sonarjs/no-collapsible-if': 'error',
      'sonarjs/no-redundant-jump': 'error',

      // === HIGH - Should Fix ===
      'sonarjs/no-nested-switch': 'error',
      'sonarjs/no-nested-template-literals': 'error',
      'sonarjs/prefer-immediate-return': 'warn',
      'sonarjs/prefer-single-boolean-return': 'warn',

      // === REACT SPECIFIC ===
      // These are covered by eslint-plugin-react-hooks
      // but SonarJS provides additional checks

      // === ACCESSIBILITY ===
      // Most a11y rules are covered by eslint-plugin-jsx-a11y
      // SonarJS provides additional checks

      // === TESTING ===
      'sonarjs/no-identical-expressions': 'error',

      // === DISABLED - Not applicable ===
      // Server-side rules are disabled as this is client-only
    },
  },
];
```

### Run Analysis

```bash
# Run ESLint with SonarJS rules
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

---

## Summary

This reference covers **~209 SonarJS rules** specifically relevant to the React Library:

| Category             | Count | Focus                                    |
| -------------------- | ----- | ---------------------------------------- |
| React-Specific       | 24    | Component patterns, hooks, JSX           |
| Accessibility        | 31    | WCAG compliance, ARIA, keyboard          |
| TypeScript           | 27    | Type safety, proper typing               |
| Code Quality         | 45    | Complexity, duplication, maintainability |
| Testing              | 12    | Test coverage, assertions                |
| Bug Detection        | 35    | Common programming errors                |
| Modern JS/ES6+       | 15    | Best practices                           |
| Regular Expressions  | 12    | Pattern safety                           |
| Client-Side Security | 8     | XSS prevention                           |

### Excluded Rules (Not Applicable)

The following categories were **excluded** as they don't apply to this client-side component library:

- Server-side vulnerabilities (SQL injection, command injection, SSRF)
- Database operations
- File system operations
- Authentication/session management
- AWS/Cloud security
- Cryptography
- API security

---

## References

- [SonarSource TypeScript Rules](https://rules.sonarsource.com/typescript/)
- [eslint-plugin-sonarjs GitHub](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [npm: eslint-plugin-sonarjs](https://www.npmjs.com/package/eslint-plugin-sonarjs)
