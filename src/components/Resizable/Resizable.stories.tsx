import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './Resizable';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A resizable panel group component that allows users to resize panels by dragging handles. Built on top of react-resizable-panels.',
      },
    },
    controls: {
      exclude: ['class'],
    },
    // Disable aria-allowed-attr rule as react-resizable-panels library
    // sets aria-orientation on div elements which is not allowed.
    // This is a known third-party library limitation.
    a11y: {
      config: {
        rules: [{ id: 'aria-allowed-attr', enabled: false }],
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the panels layout',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default horizontal resizable layout.
 */
export const Default: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="mdt-min-h-[200px] mdt-max-w-md mdt-rounded-lg mdt-border mdt-border-border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * Vertical resizable layout.
 */
export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="mdt-min-h-[300px] mdt-max-w-md mdt-rounded-lg mdt-border mdt-border-border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * Resizable panels with visible handle grip.
 */
export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="mdt-min-h-[200px] mdt-max-w-md mdt-rounded-lg mdt-border mdt-border-border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * Three panel layout.
 */
export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="mdt-min-h-[200px] mdt-rounded-lg mdt-border mdt-border-border"
    >
      <ResizablePanel defaultSize={20} minSize={15}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-bg-muted/30 mdt-p-6">
          <span className="mdt-font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">Main Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20} minSize={15}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-bg-muted/30 mdt-p-6">
          <span className="mdt-font-semibold">Details</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * Nested resizable panels.
 */
export const NestedPanels: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="mdt-min-h-[400px] mdt-rounded-lg mdt-border mdt-border-border"
    >
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-bg-muted/30 mdt-p-6">
          <span className="mdt-font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
              <span className="mdt-font-semibold">Main Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-bg-muted/30 mdt-p-6">
              <span className="mdt-font-semibold">Terminal / Output</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * Collapsible sidebar example.
 */
export const CollapsibleSidebar: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="mdt-min-h-[300px] mdt-rounded-lg mdt-border mdt-border-border"
    >
      <ResizablePanel defaultSize={20} minSize={10} collapsible collapsedSize={5}>
        <div className="mdt-flex mdt-h-full mdt-flex-col mdt-items-center mdt-justify-center mdt-bg-muted/30 mdt-p-6">
          <span className="mdt-text-sm mdt-font-semibold">Navigation</span>
          <span className="mdt-mt-2 mdt-text-xs mdt-text-foreground/70">Drag to collapse</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">Main Content Area</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * Code editor layout example.
 */
export const CodeEditorLayout: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="mdt-min-h-[500px] mdt-rounded-lg mdt-border mdt-border-border"
    >
      <ResizablePanel defaultSize={15} minSize={10}>
        <div className="mdt-flex mdt-h-full mdt-flex-col mdt-bg-muted/50">
          <div className="mdt-border-b mdt-border-border mdt-p-3 mdt-text-sm mdt-font-semibold">
            Explorer
          </div>
          <div className="mdt-flex-1 mdt-p-2">
            <div className="mdt-space-y-1 mdt-text-sm">
              <div className="mdt-rounded mdt-px-2 mdt-py-1 hover:mdt-bg-muted">src/</div>
              <div className="mdt-ml-3 mdt-rounded mdt-px-2 mdt-py-1 mdt-text-foreground/70 hover:mdt-bg-muted">
                components/
              </div>
              <div className="mdt-ml-3 mdt-rounded mdt-px-2 mdt-py-1 mdt-text-foreground/70 hover:mdt-bg-muted">
                utils/
              </div>
              <div className="mdt-ml-3 mdt-rounded mdt-bg-primary/10 mdt-px-2 mdt-py-1 mdt-text-primary">
                index.ts
              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="mdt-flex mdt-h-full mdt-flex-col">
              <div className="mdt-border-b mdt-border-border mdt-px-3 mdt-py-2 mdt-text-sm">
                <span className="mdt-rounded mdt-bg-muted mdt-px-2 mdt-py-1">index.ts</span>
              </div>
              <div className="mdt-flex-1 mdt-bg-background mdt-p-4 mdt-font-mono mdt-text-sm">
                <div className="mdt-text-foreground/70">// Your code here</div>
                <div className="mdt-mt-2">
                  <span className="mdt-text-purple-90">export</span>{' '}
                  <span className="mdt-text-blue-80">function</span>{' '}
                  <span className="mdt-text-orange-80">main</span>() {'{'}
                </div>
                <div className="mdt-ml-4">
                  <span className="mdt-text-purple-90">return</span>{' '}
                  <span className="mdt-text-green-80">&quot;Hello World&quot;</span>;
                </div>
                <div>{'}'}</div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={15}>
            <div className="mdt-flex mdt-h-full mdt-flex-col mdt-bg-muted/30">
              <div className="mdt-border-b mdt-border-border mdt-px-3 mdt-py-2 mdt-text-sm mdt-font-medium">
                Terminal
              </div>
              <div className="mdt-flex-1 mdt-p-3 mdt-font-mono mdt-text-sm">
                <div className="mdt-text-green-80">$</div>
                <div className="mdt-text-foreground/70">npm run dev</div>
                <div className="mdt-mt-2 mdt-text-foreground/70">
                  Server running at http://localhost:3000
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <div className="mdt-flex mdt-h-full mdt-flex-col mdt-bg-muted/30">
          <div className="mdt-border-b mdt-border-border mdt-p-3 mdt-text-sm mdt-font-semibold">
            Properties
          </div>
          <div className="mdt-flex-1 mdt-p-4">
            <div className="mdt-space-y-3">
              <div>
                <div className="mdt-text-xs mdt-font-medium mdt-text-foreground/70">File</div>
                <div className="mdt-text-sm">index.ts</div>
              </div>
              <div>
                <div className="mdt-text-xs mdt-font-medium mdt-text-foreground/70">Size</div>
                <div className="mdt-text-sm">2.4 KB</div>
              </div>
              <div>
                <div className="mdt-text-xs mdt-font-medium mdt-text-foreground/70">Modified</div>
                <div className="mdt-text-sm">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * Dashboard layout with widgets.
 */
export const DashboardLayout: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="mdt-min-h-[500px] mdt-rounded-lg mdt-border mdt-border-border"
    >
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize={50}>
            <div className="mdt-flex mdt-h-full mdt-flex-col mdt-rounded-tl-lg mdt-border-b mdt-border-r mdt-border-border mdt-bg-background mdt-p-4">
              <h3 className="mdt-text-sm mdt-font-semibold">Revenue</h3>
              <div className="mdt-mt-2 mdt-flex mdt-flex-1 mdt-items-center mdt-justify-center">
                <span className="mdt-text-3xl mdt-font-bold mdt-text-primary">$45,231</span>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="mdt-flex mdt-h-full mdt-flex-col mdt-rounded-tr-lg mdt-border-b mdt-border-border mdt-bg-background mdt-p-4">
              <h3 className="mdt-text-sm mdt-font-semibold">Subscriptions</h3>
              <div className="mdt-mt-2 mdt-flex mdt-flex-1 mdt-items-center mdt-justify-center">
                <span className="mdt-text-3xl mdt-font-bold mdt-text-green-70">+2,350</span>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize={33}>
            <div className="mdt-flex mdt-h-full mdt-flex-col mdt-rounded-bl-lg mdt-border-r mdt-border-border mdt-bg-background mdt-p-4">
              <h3 className="mdt-text-sm mdt-font-semibold">Active Users</h3>
              <div className="mdt-mt-2 mdt-flex mdt-flex-1 mdt-items-center mdt-justify-center">
                <span className="mdt-text-2xl mdt-font-bold">1,234</span>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={34}>
            <div className="mdt-flex mdt-h-full mdt-flex-col mdt-border-r mdt-border-border mdt-bg-background mdt-p-4">
              <h3 className="mdt-text-sm mdt-font-semibold">Sales</h3>
              <div className="mdt-mt-2 mdt-flex mdt-flex-1 mdt-items-center mdt-justify-center">
                <span className="mdt-text-2xl mdt-font-bold">567</span>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={33}>
            <div className="mdt-flex mdt-h-full mdt-flex-col mdt-rounded-br-lg mdt-bg-background mdt-p-4">
              <h3 className="mdt-text-sm mdt-font-semibold">Conversion</h3>
              <div className="mdt-mt-2 mdt-flex mdt-flex-1 mdt-items-center mdt-justify-center">
                <span className="mdt-text-2xl mdt-font-bold mdt-text-destructive">12.4%</span>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/**
 * Min and max size constraints.
 */
export const WithSizeConstraints: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="mdt-min-h-[200px] mdt-max-w-md mdt-rounded-lg mdt-border mdt-border-border"
    >
      <ResizablePanel defaultSize={50} minSize={20} maxSize={80}>
        <div className="mdt-flex mdt-h-full mdt-flex-col mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">Constrained Panel</span>
          <span className="mdt-mt-1 mdt-text-xs mdt-text-foreground/70">Min: 20%, Max: 80%</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="mdt-flex mdt-h-full mdt-items-center mdt-justify-center mdt-p-6">
          <span className="mdt-font-semibold">Flexible Panel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
