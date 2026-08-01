import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Upload, UploadFileRow } from './Upload';
import type { UploadItem, UploadSender } from './Upload.types';
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
          '### Two ways to use it',
          '',
          'Leave `items` out and **the component keeps the list itself** - adding, removing,',
          'retrying, the limit and the messages all work with no state of your own. Hand it a',
          '`sender` and it drives the bar, the failure and the cancel too.',
          '',
          'Pass `items` and you are in charge: it draws what you give it and reports what',
          'someone did, and nothing else.',
          '',
          '**It never sends the bytes itself.** Signed URLs, chunking and headers differ in',
          'every product - but none of that is a reason for every team to rewrite the list.',
          '',
          '**It refuses files before they become rows.** Too big, wrong format and too many',
          'are checked at the box, and every message names the number.',
          '',
          '| Prop | What it does |',
          '| --- | --- |',
          '| `kind` | `image` keeps the frame and shows the picture · `file` collapses to a row |',
          '| `multiple` | turns on the list, its heading and its count |',
          '| `maxFiles` | shown as `Limit 3 of 5`; the box stops accepting at the limit |',
          '| `items` | the files, as they stand - **passing this puts you in charge** |',
          '| `sender` | one function that sends a single file; the component does the rest |',
          '| `maxSize` | the biggest a single file may be, in bytes |',
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

/**
 * **Start here.** A working field - pick real files off your desktop and watch
 * them go.
 *
 * It takes anything, keeps its own list, previews pictures, shows live progress
 * and fails one file in three on purpose so the failure and its Retry can be
 * seen. There is no state behind this story: it is the component doing all of
 * it.
 */
export const TryIt: Story = {
  name: 'Try it',
  args: {
    multiple: true,
    maxFiles: 5,
    maxSize: 20 * 1024 * 1024,
    label: 'Choose files or drop them here',
    supporting: 'Anything · up to 5 files, 20 MB each',
    hint: 'Anything · up to 5 files, 20 MB each',
  },
  render: (args) => {
    let call = 0;
    const sender: UploadSender = (_file, { onProgress, signal }) =>
      new Promise((resolve, reject) => {
        call += 1;
        const failThisOne = call % 3 === 0;
        let percent = 0;
        const tick = setInterval(() => {
          if (signal.aborted) {
            clearInterval(tick);
            return;
          }
          percent += 6;
          if (percent >= 100) {
            clearInterval(tick);
            if (failThisOne) reject(new Error('server-error'));
            else resolve();
            return;
          }
          onProgress(percent);
        }, 160);
        signal.addEventListener('abort', () => {
          clearInterval(tick);
        });
      });

    return (
      <div className="mdt-max-w-[460px]">
        <Upload {...args} sender={sender} />
        <p className="mdt-mt-4 mdt-text-xs mdt-leading-relaxed mdt-text-muted-foreground">
          <b className="mdt-text-foreground">Things to try.</b> Drop a few files at once. Cancel one
          while its bar is still moving. Every third upload fails on purpose, so keep going to see
          the reason and the Retry. Add a sixth and it tells you the limit. For a picture with a
          preview, see <b className="mdt-text-foreground">Picks its own image</b> below - a list of
          several files shows marks rather than thumbnails.
        </p>
      </div>
    );
  },
};

/**
 * An image, chosen and previewed straight from the disk.
 *
 * No `previewUrl` is passed in - the component makes one for any file the
 * browser calls an image, and releases it again when the file is removed.
 */
export const PicksItsOwnImage: Story = {
  args: {
    kind: 'image',
    accept: 'image/*',
    maxSize: 2 * 1024 * 1024,
    label: 'Choose an image or drop it here',
    supporting: 'PNG, JPG or SVG · up to 2 MB',
    hint: 'PNG, JPG or SVG · up to 2 MB',
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
      <p className="mdt-mt-3 mdt-text-xs mdt-text-muted-foreground">
        Pick a real picture. Hover it once it lands.
      </p>
    </div>
  ),
};

/**
 * Working, with no state of your own.
 *
 * No `items`, so the component keeps the list: adding, removing and the count
 * all work as they are. This is five lines of markup and nothing else.
 */
export const KeepsItsOwnList: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    label: 'Choose files or drop them here',
    supporting: 'Anything · up to 5 files',
    hint: 'Anything · up to 5 files',
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
    </div>
  ),
};

/**
 * It refuses a file before the file becomes a row.
 *
 * Pick something that is not a PDF, or anything over 2 MB. The border turns,
 * the message names the number, and nothing joins the list. **Every one of
 * these messages is written by the component** - no team has to word them.
 */
export const RefusesWhatItShould: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    maxSize: 2 * 1024 * 1024,
    accept: '.pdf,.docx',
    label: 'Choose files or drop them here',
    supporting: 'PDF or DOCX · up to 3 files, 2 MB each',
    hint: 'PDF or DOCX · up to 3 files, 2 MB each',
  },
  render: (args) => (
    <div className="mdt-max-w-[460px]">
      <Upload {...args} />
      <p className="mdt-mt-3 mdt-text-xs mdt-text-muted-foreground">
        Try a .png, a file over 2 MB, or four files at once.
      </p>
    </div>
  ),
};

/**
 * The other way round: you own the list.
 *
 * Pass `items` and the component draws exactly what you give it and reports
 * what someone did. Nothing is added, removed or retried without you.
 */
export const YouOwnTheList: Story = {
  render: (args) => {
    const Demo = () => {
      const [items, setItems] = useState<UploadItem[]>([]);
      return (
        <div className="mdt-max-w-[460px]">
          <Upload
            {...args}
            multiple
            maxFiles={5}
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
          <p className="mdt-mt-3 mdt-text-xs mdt-text-muted-foreground">
            Same field, but every change goes through your own state.
          </p>
        </div>
      );
    };
    return <Demo />;
  },
};

/** Nothing chosen yet. Hover it: the sentence gives way to the action. */
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
 *
 * **A fixed picture, not a working field** - it is given a list, so it ignores
 * what you pick. Use *Try it* at the top for that.
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
 *
 * **A fixed picture, not a working field** - it is given a list, so it ignores
 * what you pick. Use *Try it* at the top for that.
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
