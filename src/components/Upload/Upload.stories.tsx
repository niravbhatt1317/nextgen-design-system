import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Upload, UploadFileRow } from './Upload';
import type { UploadItem } from './Upload.types';
import { Input } from '../Input';
import { Label } from '../Label';

const meta: Meta<typeof Upload> = {
  title: 'Components/Upload',
  component: Upload,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A form field for attaching files. It sits beside inputs and selects, so it takes',
          "the input's width and the input's 6px corner rather than a card's 8px.",
          '',
          '**It never talks to a server.** You give it the state, it tells you when someone',
          "acts. Chunking, retries, signed URLs and virus scanning are every product's own",
          'rules and none of them belong in a design system.',
          '',
          '| Prop | What it does |',
          '| --- | --- |',
          '| `kind` | `image` keeps the frame and shows the picture · `file` collapses to a row |',
          '| `multiple` | turns on the list, its heading and its count |',
          '| `maxFiles` | shown as `Limit 3 of 5`; the box stops accepting at the limit |',
          '| `items` | the files, as they stand |',
          '| `hint` / `error` | one slot under the box - rules while nothing is wrong |',
          '',
          '### Where each kind of problem is reported',
          '',
          '| What went wrong | Where it is said |',
          '| --- | --- |',
          '| Too big, wrong format, too many | The **box** turns, message beneath. No row appears |',
          '| Anything after the file was accepted | The **row** turns, reason inside it |',
          '',
          'The first group is known before a byte moves, so those files never become rows.',
          'The second can only be found later, and with several files in flight there is no',
          'single message that could serve them all.',
          '',
          '**180px is a floor and it never bends.** A crowded screen is not a reason to make a',
          'drop target too small to aim at.',
          '',
          '**Not blue.** Blue is the accent; a surface reacting to a cursor is not an accent',
          'moment. Dragging is told apart without colour - the dashed edge closes up solid.',
        ].join('\n'),
      },
    },
  },
  args: {
    onSelect: fn(),
    onRemove: fn(),
    onRetry: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Upload>;

const DOC_SUPPORTING = 'PDF, DOC or XLSX · up to 10 MB';

/** Nothing chosen yet. Hover it: the sentence gives way to the action. */
export const Resting: Story = {
  args: {
    label: 'Choose a file or drop it here',
    supporting: DOC_SUPPORTING,
    hint: DOC_SUPPORTING,
    accept: '.pdf,.doc,.docx,.xlsx',
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
    </div>
  ),
};

/** It lines up with the field above it, because it takes the same width. */
export const InAForm: Story = {
  render: (args) => (
    <div className="mdt-flex mdt-max-w-[460px] mdt-flex-col mdt-gap-4">
      <div className="mdt-flex mdt-flex-col mdt-gap-1.5">
        <Label>Change title</Label>
        <Input id="upload-story-name" placeholder="Roll back the mail relay" />
      </div>
      <div className="mdt-flex mdt-flex-col mdt-gap-1.5">
        <Label>Rollback plan</Label>
        <Upload {...args} supporting={DOC_SUPPORTING} hint={DOC_SUPPORTING} />
      </div>
    </div>
  ),
};

/** The box keeps its shape and the file moves in. Every control is visible from the start. */
export const OneFileDone: Story = {
  args: {
    hint: DOC_SUPPORTING,
    items: [{ id: '1', name: 'rollback-plan-CHG-0912.pdf', size: 2_306_867, status: 'done' }],
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
    </div>
  ),
};

/** The bar sits where the size will be, so nothing shifts when it lands. */
export const OneFileUploading: Story = {
  args: {
    hint: DOC_SUPPORTING,
    items: [{ id: '1', name: 'rollback-plan-CHG-0912.pdf', status: 'uploading', progress: 64 }],
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
    </div>
  ),
};

/**
 * The file's border turns, not the field's - the field did nothing wrong. The
 * second line is the reason, not the word "Failed": the red border already says
 * it failed.
 */
export const OneFileFailed: Story = {
  args: {
    hint: DOC_SUPPORTING,
    items: [
      {
        id: '1',
        name: 'rollback-plan-CHG-0912.pdf',
        status: 'failed',
        failure: 'connection-lost',
      },
    ],
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
    </div>
  ),
};

/** The border turns and nothing else, which is what `Input` does. */
export const FieldError: Story = {
  args: {
    label: 'Choose a file or drop it here',
    supporting: DOC_SUPPORTING,
    error: 'That file is 24 MB. The limit is 10 MB.',
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
    </div>
  ),
};

/** A picture is worth a frame, so the 180px stays and the image sits 20px in from every side. */
export const OneImage: Story = {
  args: {
    kind: 'image',
    accept: 'image/*',
    hint: 'company-logo.svg · 48 KB · PNG, JPG or SVG up to 2 MB',
    items: [
      {
        id: '1',
        name: 'company-logo.svg',
        size: 49_152,
        status: 'done',
        previewUrl:
          'data:image/svg+xml;utf8,' +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100">
               <rect width="160" height="100" fill="#2563eb"/>
               <circle cx="52" cy="34" r="16" fill="#ffffff" opacity=".92"/>
               <path d="M0 100 46 52l24 26 20-18 70 40z" fill="#ffffff" opacity=".82"/>
             </svg>`
          ),
      },
    ],
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
      <p className="mdt-mt-3 mdt-text-xs mdt-text-muted-foreground">
        Hover the picture: it blurs and offers Change and Remove. The blur is the whole treatment -
        no dark panel over the top.
      </p>
    </div>
  ),
};

/** The box stays, a list grows under it, and every row is the single-file card. */
export const ManyFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    label: 'Choose files or drop them here',
    supporting: 'PDF, DOC or XLSX · up to 5 files, 10 MB each',
    hint: 'PDF, DOC or XLSX · up to 5 files, 10 MB each',
    items: [
      { id: '1', name: 'rollback-plan-CHG-0912.pdf', size: 2_306_867, status: 'done' },
      { id: '2', name: 'mail-relay-2026-07-31.log', status: 'uploading', progress: 38 },
      { id: '3', name: 'asset-export-full.xlsx', status: 'failed', failure: 'server-error' },
    ],
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
    </div>
  ),
};

/** At the limit the count goes firm, not red - being full is not a mistake. */
export const AtTheLimit: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    hint: 'PDF, DOC or XLSX · up to 3 files, 10 MB each',
    items: [
      { id: '1', name: 'rollback-plan-CHG-0912.pdf', size: 2_306_867, status: 'done' },
      { id: '2', name: 'mail-relay-2026-07-31.log', size: 884_736, status: 'done' },
      { id: '3', name: 'asset-export-full.xlsx', size: 12_058_624, status: 'done' },
    ],
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
    </div>
  ),
};

/**
 * Every reason a row can carry, and which of them offer a Retry.
 *
 * Storage full, blocked by scan and damaged get the cross alone: offering a
 * button that cannot succeed is worse than not offering one.
 */
export const EveryFailure: Story = {
  render: (args) => {
    const failures: UploadItem[] = [
      { id: 'a', name: 'rollback-plan.pdf', status: 'failed', failure: 'connection-lost' },
      { id: 'b', name: 'mail-relay.log', status: 'failed', failure: 'timed-out' },
      { id: 'c', name: 'asset-export.xlsx', status: 'failed', failure: 'server-error' },
      { id: 'd', name: 'quarterly-assets.zip', status: 'failed', failure: 'storage-full' },
      { id: 'e', name: 'agent-installer.zip', status: 'failed', failure: 'blocked-by-scan' },
      { id: 'f', name: 'network-map.docx', status: 'failed', failure: 'damaged' },
      { id: 'g', name: 'audit-trail.csv', status: 'failed', failure: 'signed-out' },
      { id: 'h', name: 'screenshot.png', status: 'failed', failure: 'cancelled' },
    ];
    return (
      <div className="mdt-flex mdt-max-w-[460px] mdt-flex-col mdt-gap-2">
        {failures.map((item) => (
          <UploadFileRow
            key={item.id}
            item={item}
            onRemove={args.onRemove ?? fn()}
            onRetry={args.onRetry ?? fn()}
          />
        ))}
      </div>
    );
  },
};

/** Wired up, so you can pick files and watch them go. */
export const Interactive: Story = {
  render: () => {
    const Demo = () => {
      const [items, setItems] = useState<UploadItem[]>([]);
      return (
        <div className="mdt-max-w-[460px]">
          <Upload
            multiple
            maxFiles={5}
            label="Choose files or drop them here"
            supporting="Anything · up to 5 files"
            hint="Anything · up to 5 files"
            items={items}
            onSelect={(files) => {
              setItems((prev) => [
                ...prev,
                ...files.map((f, i) => ({
                  id: `${String(Date.now())}-${String(i)}`,
                  name: f.name,
                  size: f.size,
                  status: 'done' as const,
                })),
              ]);
            }}
            onRemove={(id) => {
              setItems((prev) => prev.filter((f) => f.id !== id));
            }}
          />
        </div>
      );
    };
    return <Demo />;
  },
};
