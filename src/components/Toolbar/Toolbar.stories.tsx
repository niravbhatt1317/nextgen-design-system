import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Icon } from '../Icon';
import { Input } from '../Input';
import { Toolbar, ToolbarSection, ToolbarSpacer } from './Toolbar';
import { ToolbarButton } from './ToolbarButton';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'The strip above a list: search and filters on the left, sort and columns on the right.',
          'Ported from the merged console on 4 September 2026. The previous general-purpose strip is',
          '`ToolbarOld`, deprecated.',
          '',
          '| Rule | |',
          '| --- | --- |',
          '| **One strip** | 60px tall, a 24px inset, 10px between controls, on the page ground. No sizes. |',
          '| **Two runs** | Controls on the left as direct children. The right-hand run in a `ToolbarSection` after a `ToolbarSpacer`; a section keeps 8px. |',
          '| **One control** | Every button in it is a `ToolbarButton`: 32px, four states. The search box is a small `Input`, parked with the fields decision. |',
          '| **No filter chips** | Applying a filter lights the Filters button and its count. Nothing else appears. |',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Search = () => (
  <Input
    size="sm"
    placeholder="Search by name or email"
    aria-label="Search by name or email"
    startAdornment={<Icon name="search" size={14} />}
    className="mdt-w-[300px]"
  />
);

/** The Users strip at rest. */
export const Default: Story = {
  render: () => (
    <Toolbar label="User controls">
      <Search />
      <ToolbarButton icon={<Icon name="list-filter" />}>Filters</ToolbarButton>
      <ToolbarButton icon={<Icon name="check-circle" />} aria-label="Status" />
      <ToolbarSpacer />
      <ToolbarSection>
        <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
        <ToolbarButton icon={<Icon name="columns" />} aria-label="Columns" />
      </ToolbarSection>
    </Toolbar>
  ),
};

/** Two filters, a status and a sort applied. Each control says so itself; no chips. */
export const WithThingsApplied: Story = {
  render: function WithThingsAppliedStory() {
    const [open, setOpen] = useState(false);
    return (
      <Toolbar label="User controls">
        <Search />
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

/** With the hairline, for a table that has no card of its own beneath it. */
export const WithBorder: Story = {
  render: () => (
    <Toolbar label="User controls" border>
      <Search />
      <ToolbarButton icon={<Icon name="list-filter" />}>Filters</ToolbarButton>
      <ToolbarSpacer />
      <ToolbarSection>
        <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
        <ToolbarButton icon={<Icon name="columns" />} aria-label="Columns" />
      </ToolbarSection>
    </Toolbar>
  ),
};

/** A page with nothing to search: the strip still holds, controls only. */
export const ControlsOnly: Story = {
  render: () => (
    <Toolbar label="Role controls">
      <ToolbarButton icon={<Icon name="list-filter" />}>Filters</ToolbarButton>
      <ToolbarSpacer />
      <ToolbarSection>
        <ToolbarButton icon={<Icon name="arrow-up-down" />} aria-label="Sort" />
      </ToolbarSection>
    </Toolbar>
  ),
};
