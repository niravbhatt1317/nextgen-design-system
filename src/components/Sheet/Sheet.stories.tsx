import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ArgTypes } from '@storybook/react-vite';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';
import { Button } from '../Button';
import { Input } from '../Input';
import { Checkbox } from '../Checkbox';
import { Select } from '../Select';
import { Icon } from '../Icon';
import type { SheetContentProps } from './Sheet.types';

// Extended argTypes to include SheetContent props for documentation
type SheetArgTypes = ArgTypes<React.ComponentProps<typeof Sheet> & SheetContentProps>;

const meta: Meta<typeof Sheet> & { argTypes: SheetArgTypes } = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sheet is a panel that slides in from the edge of the screen. It is commonly used for navigation menus, forms, filters, and other content that requires user interaction without leaving the current page. Default width for left/right sheets is 75% on mobile, max 24rem on larger screens. Use className with width classes (e.g., mdt-w-[500px], mdt-w-1/2, mdt-w-full) to customize.',
      },
    },
  },
  argTypes: {
    // === Sheet Root Props ===
    open: {
      control: 'boolean',
      description: 'Controlled open state of the sheet',
      table: {
        type: { summary: 'boolean' },
        category: 'Sheet',
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The open state when initially rendered (uncontrolled)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Sheet',
      },
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Event handler called when the open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
        category: 'Sheet',
      },
    },
    modal: {
      control: 'boolean',
      description:
        'Whether the sheet should be modal. When true, interaction with outside elements is disabled and only sheet content is visible to screen readers.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Sheet',
      },
    },
    // === SheetContent Props ===
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'The side of the screen from which the sheet slides in',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'right' },
        category: 'SheetContent',
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to display the close button (X) in the top-right corner',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'SheetContent',
      },
    },
    className: {
      control: 'text',
      description:
        'Additional CSS classes for SheetContent. Use to customize width (e.g., "mdt-w-[400px]", "sm:mdt-max-w-lg", "mdt-w-1/2")',
      table: {
        type: { summary: 'string' },
        category: 'SheetContent',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default sheet that slides in from the right side.
 */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="mdt-grid mdt-gap-4 mdt-py-4">
          <Input id="name" label="Name" defaultValue="John Doe" />
          <Input id="username" label="Username" defaultValue="@johndoe" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet that slides in from the left side. Commonly used for navigation menus.
 */
export const LeftSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse through the application sections.</SheetDescription>
        </SheetHeader>
        <nav className="mdt-mt-6 mdt-space-y-1">
          {[
            { name: 'Dashboard', icon: 'layout-dashboard' as const },
            { name: 'Projects', icon: 'folder' as const },
            { name: 'Team', icon: 'users' as const },
            { name: 'Settings', icon: 'settings' as const },
            { name: 'Help', icon: 'help-circle' as const },
          ].map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              fullWidth
              className="mdt-justify-start"
              leftIcon={<Icon name={item.icon} size="sm" />}
            >
              {item.name}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet that slides in from the top. Useful for notifications or alerts.
 */
export const TopSide: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Show Notification</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>System Update Available</SheetTitle>
          <SheetDescription>
            A new version of the application is available. Would you like to update now?
          </SheetDescription>
        </SheetHeader>
        <div className="mdt-mt-4 mdt-flex mdt-justify-end mdt-gap-2">
          <SheetClose asChild>
            <Button variant="outline">Later</Button>
          </SheetClose>
          <Button>Update Now</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet that slides in from the bottom. Common on mobile for action sheets.
 */
export const BottomSide: Story = {
  render: () => {
    const shareOptions = [
      { name: 'Email', icon: 'mail' as const },
      { name: 'Twitter', icon: 'twitter' as const },
      { name: 'LinkedIn', icon: 'linkedin' as const },
      { name: 'Copy Link', icon: 'link' as const },
    ];

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Share</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Share</SheetTitle>
            <SheetDescription>Share this content with others.</SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-4 mdt-grid mdt-grid-cols-4 mdt-gap-4">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                type="button"
                className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2 mdt-rounded-md mdt-p-4 mdt-transition-colors hover:mdt-bg-muted"
              >
                <div className="mdt-flex mdt-h-10 mdt-w-10 mdt-items-center mdt-justify-center mdt-rounded-full mdt-bg-primary mdt-text-primary-foreground">
                  <Icon name={option.icon} size="md" />
                </div>
                <span className="mdt-text-xs mdt-font-medium mdt-text-foreground">
                  {option.name}
                </span>
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * Sheet with a form for editing settings.
 */
export const WithForm: Story = {
  render: () => {
    const languageOptions = [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
    ];

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Edit Settings</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Account Settings</SheetTitle>
            <SheetDescription>Update your account preferences and settings.</SheetDescription>
          </SheetHeader>
          <form className="mdt-mt-6 mdt-space-y-6">
            <Input id="email" label="Email" type="email" defaultValue="john@example.com" />
            <Select
              label="Language"
              options={languageOptions}
              defaultValue="en"
              placeholder="Select language"
            />
            <div className="mdt-flex mdt-items-center mdt-gap-2">
              <Checkbox id="notifications" />
              <label htmlFor="notifications" className="mdt-text-sm mdt-text-foreground">
                Enable email notifications
              </label>
            </div>
          </form>
          <SheetFooter className="mdt-mt-6">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit">Save Settings</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * Sheet without the close button.
 */
export const WithoutCloseButton: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Custom Close</SheetTitle>
          <SheetDescription>
            This sheet has the default close button hidden. Use the button below to close.
          </SheetDescription>
        </SheetHeader>
        <div className="mdt-mt-6 mdt-flex mdt-justify-center">
          <SheetClose asChild>
            <Button>Close Sheet</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Shopping cart sheet example.
 */
export const ShoppingCart: Story = {
  render: () => {
    const cartItems = [
      { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1 },
      { id: 2, name: 'USB-C Cable', price: 19.99, quantity: 2 },
      { id: 3, name: 'Phone Case', price: 29.99, quantity: 1 },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button leftIcon={<Icon name="shopping-cart" size="sm" />} badge={cartItems.length}>
            Cart
          </Button>
        </SheetTrigger>
        <SheetContent className="mdt-flex mdt-flex-col">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>{cartItems.length} items in your cart</SheetDescription>
          </SheetHeader>
          <div className="mdt-flex-1 mdt-overflow-auto mdt-py-4">
            <div className="mdt-space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="mdt-flex mdt-items-center mdt-justify-between mdt-border-b mdt-border-border mdt-pb-4"
                >
                  <div>
                    <p className="mdt-font-medium mdt-text-foreground">{item.name}</p>
                    <p className="mdt-text-sm mdt-text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="mdt-font-medium mdt-text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mdt-border-t mdt-border-border mdt-pt-4">
            <div className="mdt-flex mdt-justify-between mdt-text-lg mdt-font-semibold mdt-text-foreground">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="mdt-mt-4" fullWidth>
              Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * Filter panel sheet for data tables or lists.
 */
export const FilterPanel: Story = {
  render: () => {
    const categoryOptions = [
      { value: 'all', label: 'All Categories' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'books', label: 'Books' },
    ];

    const statusFilters = ['Active', 'Pending', 'Completed', 'Cancelled'];

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" leftIcon={<Icon name="filter" size="sm" />}>
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Refine your search results.</SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-6 mdt-space-y-6">
            <div className="mdt-space-y-3">
              <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Status</h4>
              <div className="mdt-space-y-2">
                {statusFilters.map((status) => (
                  <div key={status} className="mdt-flex mdt-items-center mdt-gap-2">
                    <Checkbox id={`status-${status}`} />
                    <label
                      htmlFor={`status-${status}`}
                      className="mdt-cursor-pointer mdt-text-sm mdt-text-foreground"
                    >
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Select
              label="Category"
              options={categoryOptions}
              defaultValue="all"
              placeholder="Select category"
            />
            <div className="mdt-space-y-2">
              <h4 className="mdt-text-sm mdt-font-medium mdt-text-foreground">Price Range</h4>
              <div className="mdt-flex mdt-gap-2">
                <Input type="number" placeholder="Min" />
                <Input type="number" placeholder="Max" />
              </div>
            </div>
          </div>
          <SheetFooter className="mdt-mt-6">
            <SheetClose asChild>
              <Button variant="outline">Reset</Button>
            </SheetClose>
            <Button>Apply Filters</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

/**
 * Showcase of all sheet sides.
 */
export const AllSides: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side.charAt(0).toUpperCase() + side.slice(1)}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{side.charAt(0).toUpperCase() + side.slice(1)} Sheet</SheetTitle>
              <SheetDescription>This sheet slides in from the {side}.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

/**
 * Custom width examples for left/right sheets.
 * Pass any width class via className to override the default width.
 */
export const CustomWidth: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Narrow (300px)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-[300px]">
          <SheetHeader>
            <SheetTitle>Narrow Sheet</SheetTitle>
            <SheetDescription>This sheet has a fixed width of 300px.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Medium (480px)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-[480px]">
          <SheetHeader>
            <SheetTitle>Medium Sheet</SheetTitle>
            <SheetDescription>This sheet has a fixed width of 480px.</SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-4 mdt-space-y-4">
            <Input label="Name" placeholder="Enter your name" />
            <Input label="Email" type="email" placeholder="Enter your email" />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Wide (640px)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-[640px]">
          <SheetHeader>
            <SheetTitle>Wide Sheet</SheetTitle>
            <SheetDescription>
              This sheet has a fixed width of 640px. Great for detailed forms or content.
            </SheetDescription>
          </SheetHeader>
          <div className="mdt-mt-4 mdt-grid mdt-grid-cols-2 mdt-gap-4">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Doe" />
            <Input label="Email" type="email" placeholder="john@example.com" />
            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Half Screen (50%)</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-1/2">
          <SheetHeader>
            <SheetTitle>Half Screen Sheet</SheetTitle>
            <SheetDescription>This sheet takes up 50% of the screen width.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Full Screen</Button>
        </SheetTrigger>
        <SheetContent className="mdt-w-full">
          <SheetHeader>
            <SheetTitle>Full Screen Sheet</SheetTitle>
            <SheetDescription>
              This sheet takes up the entire screen width. Useful for complex workflows.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
};
