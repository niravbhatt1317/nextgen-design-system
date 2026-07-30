import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '../Separator';
import { ScrollArea, ScrollBar } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Augments native scroll functionality for custom, cross-browser styling. Built on top of Radix UI ScrollArea.',
      },
    },
    controls: {
      exclude: ['class'],
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
      },
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal', 'both'],
      description: 'Scrollbar orientation',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    type: {
      control: 'select',
      options: ['auto', 'always', 'scroll', 'hover'],
      description: 'Scrollbar visibility behavior',
      table: {
        defaultValue: { summary: 'hover' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tags for horizontal scroll demo
const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${String(a.length - i)}`);

/**
 * Default vertical scroll area with a list of items.
 */
export const Default: Story = {
  render: () => (
    <ScrollArea className="mdt-h-72 mdt-w-48 mdt-rounded-md mdt-border mdt-border-border">
      <div className="mdt-p-4">
        <h4 className="mdt-mb-4 mdt-text-sm mdt-font-medium mdt-leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="mdt-text-sm">{tag}</div>
            <Separator className="mdt-my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

/**
 * Horizontal scroll area for wide content.
 */
export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="mdt-w-96 mdt-whitespace-nowrap mdt-rounded-md mdt-border mdt-border-border">
      <div className="mdt-flex mdt-w-max mdt-space-x-4 mdt-p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <figure key={`photo-${String(i)}`} className="mdt-shrink-0">
            <div className="mdt-flex mdt-h-24 mdt-w-36 mdt-items-center mdt-justify-center mdt-overflow-hidden mdt-rounded-md mdt-bg-muted">
              <span className="mdt-text-xl mdt-font-semibold mdt-text-foreground">{i + 1}</span>
            </div>
            <figcaption className="mdt-pt-2 mdt-text-xs mdt-text-muted-foreground">
              Photo by Artist {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

/**
 * Both vertical and horizontal scrolling.
 */
export const BothDirections: Story = {
  render: () => (
    <ScrollArea
      className="mdt-h-72 mdt-w-96 mdt-rounded-md mdt-border mdt-border-border"
      orientation="both"
    >
      <div className="mdt-w-[600px] mdt-p-4">
        <h4 className="mdt-mb-4 mdt-text-sm mdt-font-medium mdt-leading-none">
          Wide & Tall Content
        </h4>
        <div className="mdt-space-y-4">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={`row-${String(i)}`} className="mdt-flex mdt-space-x-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <div
                  key={`cell-${String(i)}-${String(j)}`}
                  className="mdt-flex mdt-h-12 mdt-w-24 mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded mdt-bg-muted"
                >
                  <span className="mdt-text-xs mdt-text-foreground">
                    {i + 1}-{j + 1}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};

/**
 * Always visible scrollbars.
 */
export const AlwaysVisible: Story = {
  render: () => (
    <ScrollArea
      type="always"
      className="mdt-h-72 mdt-w-48 mdt-rounded-md mdt-border mdt-border-border"
    >
      <div className="mdt-p-4">
        <h4 className="mdt-mb-4 mdt-text-sm mdt-font-medium mdt-leading-none">Always Visible</h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={`item-${String(i)}`}>
            <div className="mdt-text-sm">Item {i + 1}</div>
            <Separator className="mdt-my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

/**
 * Scroll area with chat messages example.
 */
export const ChatMessages: Story = {
  render: () => {
    const messages = [
      { id: 1, sender: 'Alice', message: 'Hey, how are you?', time: '10:00 AM', isMe: false },
      { id: 2, sender: 'Me', message: "I'm doing great, thanks!", time: '10:01 AM', isMe: true },
      {
        id: 3,
        sender: 'Alice',
        message: 'Did you see the new design specs?',
        time: '10:02 AM',
        isMe: false,
      },
      {
        id: 4,
        sender: 'Me',
        message: 'Yes, they look amazing! Great work on the UI.',
        time: '10:03 AM',
        isMe: true,
      },
      {
        id: 5,
        sender: 'Alice',
        message: 'Thanks! I spent a lot of time on the details.',
        time: '10:05 AM',
        isMe: false,
      },
      {
        id: 6,
        sender: 'Me',
        message: 'It really shows. The color palette is perfect.',
        time: '10:06 AM',
        isMe: true,
      },
      {
        id: 7,
        sender: 'Alice',
        message: "Let's schedule a meeting to discuss implementation.",
        time: '10:08 AM',
        isMe: false,
      },
      {
        id: 8,
        sender: 'Me',
        message: 'Sounds good! How about 2 PM?',
        time: '10:09 AM',
        isMe: true,
      },
      { id: 9, sender: 'Alice', message: 'Perfect, see you then!', time: '10:10 AM', isMe: false },
      {
        id: 10,
        sender: 'Me',
        message: "Great, I'll send a calendar invite.",
        time: '10:11 AM',
        isMe: true,
      },
      {
        id: 11,
        sender: 'Alice',
        message: 'By the way, have you checked the latest analytics?',
        time: '10:15 AM',
        isMe: false,
      },
      {
        id: 12,
        sender: 'Me',
        message: 'Not yet, anything interesting?',
        time: '10:16 AM',
        isMe: true,
      },
      {
        id: 13,
        sender: 'Alice',
        message: 'User engagement is up 25% this month!',
        time: '10:17 AM',
        isMe: false,
      },
      { id: 14, sender: 'Me', message: "That's fantastic news!", time: '10:18 AM', isMe: true },
    ];

    return (
      <div className="mdt-w-80 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background">
        <div className="mdt-border-b mdt-border-border mdt-p-3">
          <h4 className="mdt-font-semibold">Chat with Alice</h4>
          <p className="mdt-text-xs mdt-text-muted-foreground">Online</p>
        </div>
        <ScrollArea className="mdt-h-80">
          <div className="mdt-space-y-4 mdt-p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mdt-flex ${msg.isMe ? 'mdt-justify-end' : 'mdt-justify-start'}`}
              >
                <div
                  className={`mdt-max-w-[70%] mdt-rounded-lg mdt-px-3 mdt-py-2 ${
                    msg.isMe
                      ? 'mdt-bg-primary mdt-text-primary-foreground'
                      : 'mdt-bg-muted mdt-text-foreground'
                  }`}
                >
                  <p className="mdt-text-sm">{msg.message}</p>
                  <p
                    className={`mdt-mt-1 mdt-text-xs ${msg.isMe ? 'mdt-text-primary-foreground/70' : 'mdt-text-muted-foreground'}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  },
};

/**
 * Scroll area with a menu list.
 */
export const MenuList: Story = {
  render: () => {
    const menuItems = [
      { section: 'Getting Started', items: ['Introduction', 'Installation', 'Quick Start'] },
      {
        section: 'Components',
        items: [
          'Button',
          'Input',
          'Select',
          'Checkbox',
          'Radio',
          'Switch',
          'Tabs',
          'Dialog',
          'Popover',
          'Tooltip',
        ],
      },
      {
        section: 'Layout',
        items: ['Container', 'Grid', 'Flex', 'Stack', 'Separator', 'ScrollArea', 'Resizable'],
      },
      { section: 'Forms', items: ['Form', 'FormField', 'FormLabel', 'FormMessage', 'Validation'] },
      {
        section: 'Advanced',
        items: ['Theming', 'Dark Mode', 'Customization', 'TypeScript', 'Testing'],
      },
    ];

    return (
      <ScrollArea className="mdt-h-80 mdt-w-64 mdt-rounded-md mdt-border mdt-border-border mdt-bg-background">
        <div className="mdt-p-4">
          {menuItems.map((menu) => (
            <div key={menu.section} className="mdt-mb-4">
              <h4 className="mdt-mb-2 mdt-text-sm mdt-font-semibold mdt-text-foreground">
                {menu.section}
              </h4>
              <div className="mdt-space-y-1">
                {menu.items.map((item) => (
                  <div
                    key={item}
                    className="mdt-cursor-pointer mdt-rounded-md mdt-px-2 mdt-py-1.5 mdt-text-sm mdt-text-muted-foreground hover:mdt-bg-muted hover:mdt-text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  },
};

/**
 * Code block with scroll.
 */
export const CodeBlock: Story = {
  render: () => (
    <ScrollArea className="mdt-h-64 mdt-w-96 mdt-rounded-lg mdt-border mdt-border-border mdt-bg-zinc-950">
      <div className="mdt-p-4 mdt-font-mono mdt-text-sm">
        <pre className="mdt-text-zinc-100">
          {`import { ScrollArea } from '@/components';

function App() {
  const items = Array.from({ length: 50 })
    .map((_, i) => \`Item \${i + 1}\`);

  return (
    <ScrollArea className="h-72 w-48">
      <div className="p-4">
        {items.map((item) => (
          <div key={item} className="py-2">
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default App;`}
        </pre>
      </div>
    </ScrollArea>
  ),
};

/**
 * Card list with scroll.
 */
export const CardList: Story = {
  render: () => {
    const cards = [
      {
        title: 'Project Alpha',
        description: 'A revolutionary new approach to data processing',
        status: 'Active',
      },
      {
        title: 'Project Beta',
        description: 'Machine learning pipeline optimization',
        status: 'In Progress',
      },
      {
        title: 'Project Gamma',
        description: 'Real-time analytics dashboard',
        status: 'Completed',
      },
      {
        title: 'Project Delta',
        description: 'Cloud infrastructure migration',
        status: 'Planning',
      },
      {
        title: 'Project Epsilon',
        description: 'Mobile app redesign initiative',
        status: 'Active',
      },
      {
        title: 'Project Zeta',
        description: 'Security audit and improvements',
        status: 'In Progress',
      },
      {
        title: 'Project Eta',
        description: 'Performance optimization sprint',
        status: 'Completed',
      },
      {
        title: 'Project Theta',
        description: 'API versioning and documentation',
        status: 'Planning',
      },
    ];

    const statusColors: Record<string, string> = {
      Active: 'mdt-bg-success mdt-text-success-foreground',
      'In Progress': 'mdt-bg-warning mdt-text-warning-foreground',
      Completed: 'mdt-bg-primary mdt-text-primary-foreground',
      Planning: 'mdt-bg-muted mdt-text-muted-foreground',
    };

    return (
      <ScrollArea className="mdt-h-80 mdt-w-80">
        <div className="mdt-space-y-3 mdt-pr-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background mdt-p-4"
            >
              <div className="mdt-flex mdt-items-start mdt-justify-between">
                <h4 className="mdt-font-semibold">{card.title}</h4>
                <span
                  className={`mdt-rounded-full mdt-px-2 mdt-py-0.5 mdt-text-xs ${statusColors[card.status] ?? ''}`}
                >
                  {card.status}
                </span>
              </div>
              <p className="mdt-mt-2 mdt-text-sm mdt-text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  },
};

/**
 * Image gallery with horizontal scroll.
 */
export const ImageGallery: Story = {
  render: () => {
    const images = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      title: `Image ${String(i + 1)}`,
      aspectRatio: i % 2 === 0 ? 'portrait' : 'landscape',
    }));

    return (
      <ScrollArea className="mdt-w-full mdt-max-w-2xl mdt-rounded-lg mdt-border mdt-border-border mdt-bg-background">
        <div className="mdt-flex mdt-gap-4 mdt-p-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={`mdt-shrink-0 ${image.aspectRatio === 'portrait' ? 'mdt-w-32' : 'mdt-w-48'}`}
            >
              <div
                className={`mdt-flex mdt-items-center mdt-justify-center mdt-rounded-lg mdt-bg-gradient-to-br mdt-from-primary/20 mdt-to-primary/5 ${
                  image.aspectRatio === 'portrait' ? 'mdt-h-48' : 'mdt-h-32'
                }`}
              >
                <span className="mdt-text-2xl mdt-font-bold mdt-text-primary">{image.id}</span>
              </div>
              <p className="mdt-mt-2 mdt-text-center mdt-text-sm mdt-text-muted-foreground">
                {image.title}
              </p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  },
};

/**
 * Table with scroll.
 */
export const TableWithScroll: Story = {
  render: () => {
    const data = Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      name: `User ${String(i + 1)}`,
      email: `user${String(i + 1)}@example.com`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      status: ['Active', 'Inactive', 'Pending'][i % 3],
    }));

    return (
      <ScrollArea className="mdt-h-80 mdt-w-full mdt-max-w-lg mdt-rounded-lg mdt-border mdt-border-border">
        <table className="mdt-w-full">
          <thead className="mdt-sticky mdt-top-0 mdt-bg-muted">
            <tr>
              <th className="mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium">ID</th>
              <th className="mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium">Name</th>
              <th className="mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium">Role</th>
              <th className="mdt-px-4 mdt-py-3 mdt-text-left mdt-text-sm mdt-font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="mdt-border-t mdt-border-border">
                <td className="mdt-px-4 mdt-py-3 mdt-text-sm">{row.id}</td>
                <td className="mdt-px-4 mdt-py-3 mdt-text-sm">{row.name}</td>
                <td className="mdt-px-4 mdt-py-3 mdt-text-sm">{row.role}</td>
                <td className="mdt-px-4 mdt-py-3 mdt-text-sm">
                  <span
                    className={`mdt-rounded-full mdt-px-2 mdt-py-0.5 mdt-text-xs ${
                      row.status === 'Active'
                        ? 'mdt-bg-green-80 mdt-text-white'
                        : row.status === 'Inactive'
                          ? 'mdt-bg-red-80 mdt-text-white'
                          : 'mdt-bg-orange-80 mdt-text-white'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    );
  },
};
