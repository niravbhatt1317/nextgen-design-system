import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import {
  Button,
  Input,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './components';

/**
 * Development playground for testing components
 * Run: npm run dev
 * For full documentation, use: npm run storybook
 */
function DevApp() {
  return (
    <div className="mdt-min-h-screen mdt-bg-background mdt-p-8">
      <div className="mdt-mx-auto mdt-max-w-4xl mdt-space-y-8">
        <h1 className="mdt-text-3xl mdt-font-bold mdt-text-foreground">
          Motadata React Library - Dev Playground
        </h1>
        <p className="mdt-text-muted-foreground">
          This is a development playground. For full documentation, run{' '}
          <code className="mdt-rounded mdt-bg-muted mdt-px-2 mdt-py-1">npm run storybook</code>
        </p>

        {/* Buttons Section */}
        <section className="mdt-space-y-4">
          <h2 className="mdt-text-xl mdt-font-semibold mdt-text-foreground">Button</h2>
          <div className="mdt-flex mdt-flex-wrap mdt-gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="mdt-flex mdt-flex-wrap mdt-gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Input Section */}
        <section className="mdt-space-y-4">
          <h2 className="mdt-text-xl mdt-font-semibold mdt-text-foreground">Input</h2>
          <div className="mdt-max-w-md mdt-space-y-4">
            <Input label="Email" placeholder="Enter your email" type="email" />
            <Input
              label="Password"
              placeholder="Enter password"
              type="password"
              helperText="Must be at least 8 characters"
            />
            <Input label="With Error" placeholder="Enter value" error="This field is required" />
          </div>
        </section>

        {/* Dialog Section */}
        <section className="mdt-space-y-4">
          <h2 className="mdt-text-xl mdt-font-semibold mdt-text-foreground">Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a dialog description. It provides context about the dialog.
                </DialogDescription>
              </DialogHeader>
              <div className="mdt-py-4">
                <p>Dialog content goes here.</p>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Dropdown Section */}
        <section className="mdt-space-y-4">
          <h2 className="mdt-text-xl mdt-font-semibold mdt-text-foreground">DropdownMenu</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <DevApp />
    </React.StrictMode>
  );
}
