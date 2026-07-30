import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icon';
import { iconNames } from './icons';
import type { IconProps } from './Icon.types';

/**
 * Copy notification component that renders in a portal
 */
function CopyNotification({ message, onClose }: { message: string | null; onClose: () => void }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [message, onClose]);

  if (!message) return null;

  return createPortal(
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        borderRadius: '8px',
        backgroundColor: '#10b981',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 500,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span>Copied: </span>
      <code
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '2px 8px',
          borderRadius: '4px',
          fontFamily: 'monospace',
        }}
      >
        {message}
      </code>
    </div>,
    document.body
  );
}

/**
 * Icon Gallery component with search functionality and click-to-copy
 */
function IconGalleryComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredIcons = iconNames.filter((iconName) =>
    iconName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = async (iconName: string) => {
    const code = `<Icon name="${iconName}" />`;
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
    } catch {
      console.warn('Clipboard API not available');
    }
  };

  const handleCloseNotification = () => {
    setCopiedCode(null);
  };

  return (
    <div className="mdt-w-full mdt-max-w-6xl">
      {/* Copy Notification Portal */}
      <CopyNotification message={copiedCode} onClose={handleCloseNotification} />

      {/* Search Input */}
      <div className="mdt-mb-4 mdt-flex mdt-items-center mdt-gap-4">
        <div className="mdt-relative mdt-flex-1">
          <Icon
            name="search"
            size="sm"
            color="muted"
            className="mdt-absolute mdt-left-3 mdt-top-1/2 mdt--translate-y-1/2"
            aria-hidden
          />
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="mdt-h-9 mdt-w-full mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-pl-9 mdt-pr-3 mdt-text-sm mdt-text-foreground placeholder:mdt-text-muted-foreground focus:mdt-outline-none focus:mdt-ring-2 focus:mdt-ring-ring"
            aria-label="Search icons"
          />
        </div>
        <span className="mdt-whitespace-nowrap mdt-text-sm mdt-text-muted-foreground">
          {filteredIcons.length} of {iconNames.length} icons
        </span>
      </div>

      {/* Icon Grid - Compact Layout */}
      {filteredIcons.length > 0 ? (
        <div className="mdt-grid mdt-grid-cols-6 mdt-gap-2 sm:mdt-grid-cols-8 md:mdt-grid-cols-10 lg:mdt-grid-cols-12">
          {filteredIcons.map((iconName) => (
            <button
              key={iconName}
              type="button"
              onClick={() => {
                void copyToClipboard(iconName);
              }}
              className="mdt-group mdt-flex mdt-cursor-pointer mdt-flex-col mdt-items-center mdt-gap-1 mdt-rounded-md mdt-border mdt-border-transparent mdt-p-2 mdt-transition-all hover:mdt-border-border hover:mdt-bg-muted"
              title={`Click to copy: <Icon name="${iconName}" />`}
              aria-label={`Copy ${iconName} icon code`}
            >
              <Icon name={iconName} size="md" aria-hidden />
              <span className="mdt-w-full mdt-truncate mdt-text-center mdt-text-[10px] mdt-leading-tight mdt-text-muted-foreground">
                {iconName}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="mdt-flex mdt-flex-col mdt-items-center mdt-justify-center mdt-py-12 mdt-text-muted-foreground">
          <Icon name="search" size="xl" color="muted" aria-hidden />
          <p className="mdt-mt-2 mdt-text-sm">No icons found for "{searchQuery}"</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
            }}
            className="mdt-mt-2 mdt-text-sm mdt-text-primary hover:mdt-underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible icon component system for custom SVG icons designed by your UX team. No third-party dependencies required. All icons use consistent sizing, colors from the theme system, and support full accessibility.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
      description: 'Name of the icon to display',
      table: {
        type: { summary: 'IconName' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the icon (or custom number in pixels)',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg | xl | number' },
      },
    },
    color: {
      control: 'select',
      options: [
        'current',
        'primary',
        'secondary',
        'success',
        'destructive',
        'warning',
        'info',
        'muted',
        'foreground',
      ],
      description: 'Semantic color from the theme',
      table: {
        defaultValue: { summary: 'current' },
      },
    },
    strokeWidth: {
      control: 'number',
      description: 'Stroke width of the icon',
      table: {
        defaultValue: { summary: '2' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for screen readers (required if icon conveys meaning)',
    },
    'aria-hidden': {
      control: 'boolean',
      description: 'Whether icon is decorative (hidden from screen readers)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<IconProps>;

/**
 * Default icon with medium size.
 */
export const Default: Story = {
  args: {
    name: 'user',
    'aria-label': 'User icon',
  },
};

/**
 * Icon Gallery - All available icons with search functionality.
 * Use the search box to find icons by name.
 */
export const IconGallery: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => <IconGalleryComponent />,
};

/**
 * All size variants displayed together.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-end mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="xs" aria-label="Extra small user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">xs (12px)</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="sm" aria-label="Small user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">sm (16px)</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="md" aria-label="Medium user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">md (20px)</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="lg" aria-label="Large user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">lg (24px)</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="user" size="xl" aria-label="Extra large user icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">xl (32px)</span>
      </div>
    </div>
  ),
};

/**
 * Custom numeric size (in pixels).
 */
export const CustomSize: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-end mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="settings" size={18} aria-label="18px settings icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">18px</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="settings" size={28} aria-label="28px settings icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">28px</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="settings" size={48} aria-label="48px settings icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">48px</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="settings" size={64} aria-label="64px settings icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">64px</span>
      </div>
    </div>
  ),
};

/**
 * All color variants from the theme system.
 */
export const Colors: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="current" aria-label="Current color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">current</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="primary" aria-label="Primary color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">primary</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="secondary" aria-label="Secondary color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">secondary</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="success" aria-label="Success color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">success</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon
          name="check"
          size="lg"
          color="destructive"
          aria-label="Destructive color check icon"
        />
        <span className="mdt-text-xs mdt-text-muted-foreground">destructive</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="warning" aria-label="Warning color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">warning</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="info" aria-label="Info color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">info</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="check" size="lg" color="muted" aria-label="Muted color check icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">muted</span>
      </div>
    </div>
  ),
};

/**
 * Different stroke widths.
 */
export const StrokeWidth: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-end mdt-gap-6">
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="search" size="xl" strokeWidth={1} aria-label="Thin stroke search icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">strokeWidth: 1</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="search" size="xl" strokeWidth={2} aria-label="Normal stroke search icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">strokeWidth: 2</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="search" size="xl" strokeWidth={3} aria-label="Bold stroke search icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">strokeWidth: 3</span>
      </div>
      <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
        <Icon name="search" size="xl" strokeWidth={4} aria-label="Extra bold stroke search icon" />
        <span className="mdt-text-xs mdt-text-muted-foreground">strokeWidth: 4</span>
      </div>
    </div>
  ),
};

/**
 * Icons used in buttons.
 */
export const InButtons: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <button
        className="mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-bg-primary mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-primary-foreground hover:mdt-bg-primary/90"
        aria-label="Add new item"
      >
        <Icon name="plus" size="sm" aria-hidden />
        Add Item
      </button>
      <button
        className="mdt-inline-flex mdt-h-9 mdt-items-center mdt-gap-2 mdt-rounded-md mdt-border mdt-border-input mdt-bg-background mdt-px-4 mdt-text-sm mdt-font-medium mdt-text-foreground hover:mdt-bg-muted"
        aria-label="Search"
      >
        <Icon name="search" size="sm" aria-hidden />
        Search
      </button>
      <button
        className="mdt-inline-flex mdt-h-9 mdt-w-9 mdt-items-center mdt-justify-center mdt-rounded-md mdt-bg-destructive mdt-text-destructive-foreground hover:mdt-bg-destructive/90"
        aria-label="Close"
      >
        <Icon name="x" size="sm" aria-hidden />
      </button>
    </div>
  ),
};

/**
 * Icons in list items.
 */
export const InListItems: Story = {
  render: () => (
    <div className="mdt-w-64 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-card">
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted">
        <Icon name="home" size="sm" color="muted" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">Home</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted">
        <Icon name="user" size="sm" color="muted" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">Profile</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-border-b mdt-border-border mdt-p-3 hover:mdt-bg-muted">
        <Icon name="settings" size="sm" color="muted" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">Settings</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-p-3 hover:mdt-bg-muted">
        <Icon name="bell" size="sm" color="muted" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">Notifications</span>
      </div>
    </div>
  ),
};

/**
 * Icons with status indicators.
 */
export const WithStatusColors: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-success mdt-bg-green-10 mdt-p-3">
        <Icon name="check" size="md" color="success" aria-hidden />
        <span className="mdt-text-sm mdt-text-green-80">Operation successful</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-destructive mdt-bg-red-10 mdt-p-3">
        <Icon name="x" size="md" color="destructive" aria-hidden />
        <span className="mdt-text-sm mdt-text-red-80">Operation failed</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-warning mdt-bg-orange-10 mdt-p-3">
        <Icon name="bell" size="md" color="warning" aria-hidden />
        <span className="mdt-text-sm mdt-text-orange-80">Warning: Check your settings</span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-lg mdt-border mdt-border-info mdt-bg-blue-10 mdt-p-3">
        <Icon name="file" size="md" color="info" aria-hidden />
        <span className="mdt-text-sm mdt-text-blue-80">New file uploaded</span>
      </div>
    </div>
  ),
};

/**
 * Navigation icons with chevron.
 */
export const Navigation: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-2">
      <button
        className="mdt-inline-flex mdt-items-center mdt-gap-2 mdt-rounded-md mdt-p-2 mdt-text-sm mdt-text-foreground hover:mdt-bg-muted"
        aria-label="Navigate forward"
      >
        <Icon name="chevron-right" size="sm" aria-hidden />
        <span>Next Page</span>
      </button>
      <div className="mdt-flex mdt-items-center mdt-gap-2 mdt-text-sm mdt-text-muted-foreground">
        <Icon name="home" size="sm" aria-hidden />
        <span>/</span>
        <Icon name="chevron-right" size="xs" aria-hidden />
        <span>Projects</span>
        <Icon name="chevron-right" size="xs" aria-hidden />
        <span>Settings</span>
      </div>
    </div>
  ),
};

/**
 * Decorative icons (aria-hidden for accessibility).
 */
export const DecorativeIcons: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-items-center mdt-gap-2">
        <Icon name="user" size="md" aria-hidden />
        <span className="mdt-text-sm mdt-text-foreground">
          The icon here is decorative because the text already conveys the meaning
        </span>
      </div>
      <div className="mdt-flex mdt-items-center mdt-gap-2">
        <Icon name="check" size="md" color="success" aria-label="Completed task" />
        <span className="mdt-text-sm mdt-text-foreground">
          This icon has aria-label because it conveys additional meaning
        </span>
      </div>
    </div>
  ),
};

/**
 * Custom SVG via src prop.
 * Load external or custom SVG icons from a URL or path.
 */
export const CustomSvgFromUrl: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">
          Custom SVG from URL (src prop)
        </h4>
        <p className="mdt-mb-4 mdt-text-xs mdt-text-muted-foreground">
          Use the src prop to load SVGs from external URLs or local paths. The icon will be fetched,
          cached, and rendered with full styling support.
        </p>
        <div className="mdt-flex mdt-items-end mdt-gap-6">
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/heart.svg"
              size="lg"
              color="destructive"
              aria-label="Heart icon from CDN"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">CDN URL</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/star.svg"
              size="lg"
              color="warning"
              aria-label="Star icon from CDN"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">CDN URL</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/globe.svg"
              size="lg"
              color="info"
              aria-label="Globe icon from CDN"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">CDN URL</span>
          </div>
        </div>
      </div>

      <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-bg-muted/30 mdt-p-4">
        <h5 className="mdt-mb-2 mdt-text-xs mdt-font-medium mdt-text-foreground">Usage Example:</h5>
        <pre className="mdt-text-xs mdt-text-muted-foreground">
          {`// From CDN
<Icon src="https://cdn.example.com/icon.svg" />

// From local public folder
<Icon src="/icons/custom-icon.svg" />

// With size and color
<Icon src="/icons/logo.svg" size="lg" color="primary" />`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * Custom SVG with different sizes and colors.
 */
export const CustomSvgVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">Size Variants</h4>
        <div className="mdt-flex mdt-items-end mdt-gap-6">
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/rocket.svg"
              size="xs"
              aria-label="Extra small rocket"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">xs</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/rocket.svg"
              size="sm"
              aria-label="Small rocket"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">sm</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/rocket.svg"
              size="md"
              aria-label="Medium rocket"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">md</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/rocket.svg"
              size="lg"
              aria-label="Large rocket"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">lg</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/rocket.svg"
              size="xl"
              aria-label="Extra large rocket"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">xl</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mdt-mb-3 mdt-text-sm mdt-font-medium mdt-text-foreground">Color Variants</h4>
        <div className="mdt-flex mdt-flex-wrap mdt-gap-6">
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/zap.svg"
              size="lg"
              color="primary"
              aria-label="Primary zap"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">primary</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/zap.svg"
              size="lg"
              color="success"
              aria-label="Success zap"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">success</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/zap.svg"
              size="lg"
              color="destructive"
              aria-label="Destructive zap"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">destructive</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/zap.svg"
              size="lg"
              color="warning"
              aria-label="Warning zap"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">warning</span>
          </div>
          <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-2">
            <Icon
              src="https://unpkg.com/lucide-static@latest/icons/zap.svg"
              size="lg"
              color="info"
              aria-label="Info zap"
            />
            <span className="mdt-text-xs mdt-text-muted-foreground">info</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Comparison: Registered vs Custom SVG icons side by side.
 */
export const RegisteredVsCustom: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-6">
      <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-4">
        <h4 className="mdt-mb-4 mdt-text-sm mdt-font-medium mdt-text-foreground">
          Comparison: name prop vs src prop
        </h4>
        <div className="mdt-grid mdt-grid-cols-2 mdt-gap-8">
          <div>
            <h5 className="mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
              Registered Icon (name prop)
            </h5>
            <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-bg-muted/50 mdt-p-3">
              <Icon name="user" size="lg" color="primary" aria-label="Registered user icon" />
              <div>
                <code className="mdt-text-xs">{`<Icon name="user" />`}</code>
                <p className="mdt-mt-1 mdt-text-xs mdt-text-muted-foreground">
                  Type-safe, tree-shakeable, instant render
                </p>
              </div>
            </div>
          </div>
          <div>
            <h5 className="mdt-mb-3 mdt-text-xs mdt-font-medium mdt-text-muted-foreground">
              Custom SVG (src prop)
            </h5>
            <div className="mdt-flex mdt-items-center mdt-gap-3 mdt-rounded-md mdt-bg-muted/50 mdt-p-3">
              <Icon
                src="https://unpkg.com/lucide-static@latest/icons/user.svg"
                size="lg"
                color="primary"
                aria-label="Custom user icon from URL"
              />
              <div>
                <code className="mdt-text-xs">{`<Icon src="..." />`}</code>
                <p className="mdt-mt-1 mdt-text-xs mdt-text-muted-foreground">
                  Flexible, dynamic, fetched & cached
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
