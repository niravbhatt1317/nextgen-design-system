import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TreeView } from './TreeView';
import type { TreeViewNode } from './TreeView.types';

/* the console's HashiCorp Vault tree (credential-profiles data.js pathTreeFor) */
const VAULT_TREE: TreeViewNode[] = [
  {
    label: 'secret/',
    kind: 'folder',
    children: [
      {
        label: 'data/',
        kind: 'folder',
        children: [
          {
            label: 'db/',
            kind: 'folder',
            children: [
              { label: 'postgres-prod-ro', kind: 'item', value: 'secret/data/db/postgres-prod-ro' },
              { label: 'mysql-billing', kind: 'item', value: 'secret/data/db/mysql-billing' },
            ],
          },
          {
            label: 'network/',
            kind: 'folder',
            children: [
              { label: 'cisco-ro', kind: 'item', value: 'secret/data/network/cisco-ro' },
              { label: 'snmp-v3-dc', kind: 'item', value: 'secret/data/network/snmp-v3-dc' },
            ],
          },
        ],
      },
    ],
  },
];

/* ten levels down - the box scrolls sideways */
const DEEP_TREE: TreeViewNode[] = [
  'secret/',
  'data/',
  'prod/',
  'eu-west/',
  'dc-01/',
  'rack-12/',
  'linux/',
  'web/',
  'nginx/',
  'tls/',
].reduceRight<TreeViewNode[]>(
  (inner, label) => [{ label, kind: 'folder', children: inner }],
  [
    {
      label: 'svc-discovery',
      kind: 'item',
      value: 'secret/data/prod/eu-west/dc-01/rack-12/linux/web/nginx/tls/svc-discovery',
    },
  ]
);

const meta: Meta<typeof TreeView> = {
  title: 'New Components/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A bordered box of **folders that open and shut** and **items that are picked**, each level indented 19 under its folder so a child’s glyph sits under its parent’s folder. Folders carry a chevron and a folder glyph (blue while open, faint while shut); items carry their own glyph (`itemIcon`, or the node’s `icon`), and with `showValues` their full value in small mono at the row’s end. At most 320 tall, then it scrolls - and across, for a tree deeper than the box is wide.',
          '',
          'On mount it opens the folders down to the picked `value`; with nothing picked, each folder that stands alone at its level. Click, Enter or Space opens a folder or picks an item. Rows 12/500, 5 above and below, 6 corners; the picked item in blue on a light blue wash; an item that has just arrived (`fresh`) in the success ink.',
          '',
          '**Ported from the console (Ronak, 2026-10-09)**: the path tree in the credential form’s Browse popup (PathBrowserDialog).',
        ].join('\n'),
      },
    },
  },
  args: { itemIcon: 'key', showValues: true },
  argTypes: {
    itemIcon: { control: 'text' },
    showValues: { control: 'boolean' },
    onSelect: { action: 'selected' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** The vault’s paths, as the Browse popup shows them: click a folder to open it, click a key to pick it. */
export const Default: Story = {
  render: function Default(args) {
    const [value, setValue] = useState('');
    return (
      <div className="mdt-w-[526px] mdt-max-w-full">
        <TreeView
          {...args}
          aria-label="Vault paths"
          nodes={VAULT_TREE}
          value={value}
          onSelect={(picked) => {
            setValue(picked);
            args.onSelect?.(picked);
          }}
        />
      </div>
    );
  },
};

/** Ten levels deep: the rows never wrap, and the box scrolls sideways. */
export const DeepTree: Story = {
  render: function DeepTree(args) {
    const [value, setValue] = useState(
      'secret/data/prod/eu-west/dc-01/rack-12/linux/web/nginx/tls/svc-discovery'
    );
    return (
      <div className="mdt-w-[526px] mdt-max-w-full">
        <TreeView
          {...args}
          aria-label="Vault paths"
          nodes={DEEP_TREE}
          value={value}
          onSelect={setValue}
        />
      </div>
    );
  },
};
