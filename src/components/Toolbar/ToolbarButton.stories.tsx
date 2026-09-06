import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Toolbar, ToolbarSection, ToolbarSpacer } from './Toolbar';
import { ToolbarButton } from './ToolbarButton';

const meta: Meta<typeof ToolbarButton> = {
  title: 'Components/ToolbarButton',
  component: ToolbarButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'The 32px control that lives in a Toolbar strip: Filters, a quick filter, Sort, Columns.',
          'Ported from the merged console on 4 September 2026.',
          '',
          '| State | Ground | Edge | Marker |',
          '| --- | --- | --- | --- |',
          '| Rest | White | Neutral-30 | None |',
          '| Hover, keyboard focus | Lifts to neutral-10 | Slate | None |',
          '| Open, the menu or drawer is showing | Same as hover | Slate | None |',
          '| Active, something is applied | White | Slate | A `count` after the label, or a `dot` on the top-right corner |',
          '',
          '**No filter chips.** Applying a filter draws nothing new in the strip or under it. The lit',
          'button and its count are the whole signal; the drawer or menu shows which filters are on.',
          '',
          '**Which marker.** Filters carries a count. The quick filter and Sort carry a dot. Columns has',
          'no applied state at all, by ruling. The edge is always 1px, and the three "on" looks share',
          'one slate so the strip never shows two darknesses side by side.',
          '',
          'A Radix trigger (Popover, DropdownMenu) reports `open` on its own through `data-state`, so',
          'the `open` prop is only needed for a drawer.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, minHeight: 44 }}>
    <span
      style={{
        width: 160,
        flex: 'none',
        fontSize: 11,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: 'hsl(var(--mdt-muted-foreground))',
        fontWeight: 600,
      }}
    >
      {label}
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

export const Default: Story = {
  args: { children: 'Filters', icon: <Icon name="list-filter" />, count: 0 },
};

/** Rest, open, active. Hover the rest ones to see the ground lift and the edge turn slate. */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Row label="rest · hover me">
        <ToolbarButton icon={<Icon name="list-filter" />}>Filters</ToolbarButton>
        <ToolbarButton icon={<Icon name="check-circle" />} aria-label="Status" />
        <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
        <ToolbarButton icon={<Icon name="columns" />} aria-label="Columns" />
      </Row>
      <Row label="open">
        <ToolbarButton icon={<Icon name="list-filter" />} open>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="check-circle" />} open aria-label="Status" />
        <ToolbarButton icon={<Icon name="arrow-up-down" />} open aria-label="Sort" />
        <ToolbarButton icon={<Icon name="columns" />} open aria-label="Columns" />
      </Row>
      <Row label="active">
        <ToolbarButton icon={<Icon name="list-filter" />} count={2}>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="check-circle" />} dot aria-label="Status" />
        <ToolbarButton icon={<Icon name="arrow-up-down" />} dot aria-label="Sort" />
        <span
          style={{ fontSize: 12, color: 'hsl(var(--mdt-muted-foreground))', fontStyle: 'italic' }}
        >
          Columns has no active state
        </span>
      </Row>
      <Row label="count caps at 9+">
        <ToolbarButton icon={<Icon name="list-filter" />} count={1}>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="list-filter" />} count={9}>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="list-filter" />} count={14}>
          Filters
        </ToolbarButton>
      </Row>
      <Row label="disabled">
        <ToolbarButton icon={<Icon name="list-filter" />} disabled>
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="arrow-up-down" />} disabled aria-label="Sort" />
      </Row>
    </div>
  ),
};

/** Inside a Popover the trigger reports open on its own; nothing to wire. */
export const AsATrigger: Story = {
  render: function AsATriggerStory() {
    const [sorted, setSorted] = useState(false);
    return (
      <Popover>
        <PopoverTrigger asChild>
          <ToolbarButton icon={<Icon name="arrow-up-down" />} dot={sorted} aria-label="Sort" />
        </PopoverTrigger>
        <PopoverContent align="start" className="mdt-w-56 mdt-p-2">
          <button
            type="button"
            className="mdt-w-full mdt-rounded-md mdt-px-2 mdt-py-1.5 mdt-text-left mdt-text-sm hover:mdt-bg-muted"
            onClick={() => {
              setSorted((s) => !s);
            }}
          >
            {sorted ? 'Clear sort' : 'Sort by name'}
          </button>
        </PopoverContent>
      </Popover>
    );
  },
};

/**
 * The Users toolbar: the strip's `band` variant, 60px tall with a 24px inset,
 * 10px between the controls on the left and 8px on the right. Filters has two
 * applied, the status quick filter one, and a sort is on. No chips.
 */
export const InTheBand: Story = {
  parameters: { layout: 'fullscreen' },
  render: function InTheBandStory() {
    const [open, setOpen] = useState(false);
    return (
      <Toolbar variant="band">
        <Input
          size="sm"
          placeholder="Search by name or email"
          aria-label="Search by name or email"
          startAdornment={<Icon name="search" size={14} />}
          className="mdt-w-[300px]"
        />
        <ToolbarButton
          icon={<Icon name="list-filter" />}
          count={2}
          open={open}
          onClick={() => {
            setOpen((o) => !o);
          }}
        >
          Filters
        </ToolbarButton>
        <ToolbarButton icon={<Icon name="check-circle" />} dot aria-label="Status" />
        <ToolbarSpacer />
        <ToolbarSection>
          <ToolbarButton icon={<Icon name="arrow-up-down" />} dot aria-label="Sort" />
          <ToolbarButton icon={<Icon name="columns" />} aria-label="Columns" />
        </ToolbarSection>
      </Toolbar>
    );
  },
};

/** Every option on one page, driven by the Controls panel. */
export const Playground: Story = {
  args: {
    children: 'Filters',
    icon: <Icon name="list-filter" />,
    count: 2,
    open: false,
    dot: false,
    disabled: false,
  },
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 20 } },
    open: { control: 'boolean' },
    dot: { control: 'boolean' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    icon: { control: false },
  },
};
