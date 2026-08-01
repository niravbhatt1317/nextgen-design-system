import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Upload, UploadFileRow, formatFileSize } from './Upload';
import type { UploadItem } from './Upload.types';

const BOX = '[data-slot="upload-box"]';
const ROW = '[data-slot="upload-file"]';

const done = (over: Partial<UploadItem> = {}): UploadItem => ({
  id: '1',
  name: 'rollback-plan.pdf',
  size: 2_306_867,
  status: 'done',
  ...over,
});

describe('Upload', () => {
  describe('the box', () => {
    it('shows the box when nothing has been chosen', () => {
      const { container } = render(<Upload label="Choose a file" />);
      expect(container.querySelector(BOX)).toBeInTheDocument();
    });

    it('holds its 180px floor by default', () => {
      const { container } = render(<Upload />);
      expect(container.querySelector(BOX)).toHaveStyle({ minHeight: '180px' });
    });

    it('takes a taller floor but keeps it a minimum, not a height', () => {
      const { container } = render(<Upload minHeight={240} />);
      const box = container.querySelector(BOX);
      expect(box).toHaveStyle({ minHeight: '240px' });
      expect(box).not.toHaveStyle({ height: '240px' });
    });

    it('is a label over a real file input, so a keyboard can reach it', () => {
      render(<Upload label="Choose a file or drop it here" />);
      const input = screen.getByLabelText('Choose a file or drop it here');
      expect(input).toHaveAttribute('type', 'file');
    });

    it('passes accept straight through', () => {
      render(<Upload label="Pick" accept="image/png" />);
      expect(screen.getByLabelText('Pick')).toHaveAttribute('accept', 'image/png');
    });
  });

  describe('choosing files', () => {
    it('hands the files over, and adds them when it is keeping the list', () => {
      const onSelect = vi.fn();
      const { container } = render(<Upload label="Pick" onSelect={onSelect} />);
      const file = new File(['x'], 'a.pdf', { type: 'application/pdf' });

      fireEvent.change(screen.getByLabelText('Pick'), { target: { files: [file] } });

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][0][0].name).toBe('a.pdf');
      // no `items` prop, so the component owns the list and the row is there
      expect(container.querySelector(ROW)).toBeInTheDocument();
    });

    it('reports a drop the same way it reports a pick', () => {
      const onSelect = vi.fn();
      const { container } = render(<Upload onSelect={onSelect} />);
      const file = new File(['x'], 'dropped.pdf');

      fireEvent.drop(container.querySelector(BOX)!, { dataTransfer: { files: [file] } });

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][0][0].name).toBe('dropped.pdf');
    });

    it('marks the box mid-drag, and clears it when the cursor leaves', () => {
      const { container } = render(<Upload />);
      const box = container.querySelector(BOX)!;

      fireEvent.dragOver(box);
      expect(box).toHaveAttribute('data-state', 'over');

      fireEvent.dragLeave(box);
      expect(box).toHaveAttribute('data-state', 'rest');
    });

    it('ignores a drop once the limit is reached', () => {
      const onSelect = vi.fn();
      const { container } = render(
        <Upload multiple maxFiles={1} items={[done()]} onSelect={onSelect} />
      );
      fireEvent.drop(container.querySelector(BOX)!, {
        dataTransfer: { files: [new File(['x'], 'b.pdf')] },
      });
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('ignores a drop while disabled', () => {
      const onSelect = vi.fn();
      const { container } = render(<Upload disabled onSelect={onSelect} />);
      fireEvent.drop(container.querySelector(BOX)!, {
        dataTransfer: { files: [new File(['x'], 'b.pdf')] },
      });
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('one file', () => {
    it('replaces the box with the file, and keeps the same floor', () => {
      const { container } = render(<Upload items={[done()]} />);
      expect(container.querySelector(BOX)).not.toBeInTheDocument();
      expect(container.querySelector('[data-slot="upload-single"]')).toHaveStyle({
        minHeight: '180px',
      });
      expect(screen.getByText('rollback-plan.pdf')).toBeInTheDocument();
    });

    it('keeps the frame for an image, because there is something to look at', () => {
      const { container } = render(
        <Upload kind="image" items={[done({ name: 'logo.png', previewUrl: 'data:,x' })]} />
      );
      expect(container.querySelector('[data-slot="upload-preview"]')).toBeInTheDocument();
      expect(screen.getByAltText('logo.png')).toBeInTheDocument();
    });

    it('shows the cross from the moment the file is there, with no hover', () => {
      render(<Upload items={[done()]} />);
      expect(screen.getByLabelText('Remove rollback-plan.pdf')).toBeVisible();
    });
  });

  describe('the file row', () => {
    it('shows the size when the file has landed', () => {
      render(<UploadFileRow item={done({ size: 2_306_867 })} />);
      expect(screen.getByText('2.2 MB')).toBeInTheDocument();
    });

    it('shows a bar instead of the size while it is going', () => {
      render(<UploadFileRow item={done({ status: 'uploading', progress: 64, size: 100 })} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '64');
      expect(screen.queryByText('100 B')).not.toBeInTheDocument();
    });

    it('cancels rather than removes while it is going', () => {
      render(<UploadFileRow item={done({ status: 'uploading', progress: 10 })} />);
      expect(screen.getByLabelText('Cancel rollback-plan.pdf')).toBeInTheDocument();
    });

    it('says the reason, not the word Failed', () => {
      render(<UploadFileRow item={done({ status: 'failed', failure: 'connection-lost' })} />);
      expect(screen.getByText('Connection lost')).toBeInTheDocument();
      expect(screen.queryByText('Failed')).not.toBeInTheDocument();
    });

    it("turns the file's border, not the field's", () => {
      const { container } = render(
        <Upload items={[done({ status: 'failed', failure: 'server-error' })]} />
      );
      expect(container.querySelector(ROW)).toHaveClass('mdt-border-destructive');
      expect(container.querySelector('[data-slot="upload-single"]')).toHaveClass(
        'mdt-border-border'
      );
    });

    it('offers Retry when retrying could work', () => {
      render(<UploadFileRow item={done({ status: 'failed', failure: 'connection-lost' })} />);
      expect(screen.getByLabelText('Try rollback-plan.pdf again')).toBeInTheDocument();
    });

    it.each(['storage-full', 'blocked-by-scan', 'damaged'] as const)(
      'offers no Retry for %s, because it cannot succeed',
      (failure) => {
        render(<UploadFileRow item={done({ status: 'failed', failure })} />);
        expect(screen.queryByLabelText('Try rollback-plan.pdf again')).not.toBeInTheDocument();
        expect(screen.getByLabelText('Remove rollback-plan.pdf')).toBeInTheDocument();
      }
    );

    it('shows a reason of your own as written, and still offers Retry', () => {
      render(<UploadFileRow item={done({ status: 'failed', failure: 'Rejected by policy' })} />);
      expect(screen.getByText('Rejected by policy')).toBeInTheDocument();
      expect(screen.getByLabelText('Try rollback-plan.pdf again')).toBeInTheDocument();
    });

    it('hands back the id, not the file', () => {
      const onRemove = vi.fn();
      const onRetry = vi.fn();
      render(
        <UploadFileRow
          item={done({ id: 'abc', status: 'failed', failure: 'timed-out' })}
          onRemove={onRemove}
          onRetry={onRetry}
        />
      );
      fireEvent.click(screen.getByLabelText('Try rollback-plan.pdf again'));
      fireEvent.click(screen.getByLabelText('Remove rollback-plan.pdf'));
      expect(onRetry).toHaveBeenCalledWith('abc');
      expect(onRemove).toHaveBeenCalledWith('abc');
    });
  });

  describe('many files', () => {
    const three: UploadItem[] = [
      done({ id: '1', name: 'a.pdf' }),
      done({ id: '2', name: 'b.log' }),
      done({ id: '3', name: 'c.xlsx' }),
    ];

    it('names the rows and says how much room is left', () => {
      render(<Upload multiple maxFiles={5} items={three} />);
      expect(screen.getByText('Uploaded files')).toBeInTheDocument();
      expect(screen.getByText('Limit 3 of 5')).toBeInTheDocument();
    });

    it('leaves the count out when there is no limit', () => {
      render(<Upload multiple items={three} />);
      expect(screen.queryByText(/^Limit /)).not.toBeInTheDocument();
    });

    it('keeps the box while the list grows', () => {
      const { container } = render(<Upload multiple maxFiles={5} items={three} />);
      expect(container.querySelector(BOX)).toBeInTheDocument();
      expect(container.querySelectorAll(ROW)).toHaveLength(3);
    });

    it('goes firm rather than red once it is full, because full is not an error', () => {
      render(<Upload multiple maxFiles={3} items={three} />);
      const count = screen.getByText('Limit 3 of 3');
      expect(count).toHaveClass('mdt-text-foreground');
      expect(count).not.toHaveClass('mdt-text-destructive');
    });

    it('stops accepting at the limit and says so', () => {
      const { container } = render(<Upload multiple maxFiles={3} items={three} />);
      expect(container.querySelector(BOX)).toHaveAttribute('data-state', 'disabled');
      expect(screen.getByText('All 3 files added')).toBeInTheDocument();
      expect(screen.getByText('Remove one to add another')).toBeInTheDocument();
    });
  });

  describe('the hint slot', () => {
    it('states the rules while nothing is wrong', () => {
      render(<Upload hint="PDF or DOCX up to 10 MB" />);
      const hint = screen.getByText('PDF or DOCX up to 10 MB');
      expect(hint).toHaveClass('mdt-text-muted-foreground');
      expect(hint).not.toHaveAttribute('role', 'alert');
    });

    it('turns and announces itself on a field error, in the same slot', () => {
      render(
        <Upload hint="PDF or DOCX up to 10 MB" error="That file is 24 MB. The limit is 10 MB." />
      );
      expect(screen.queryByText('PDF or DOCX up to 10 MB')).not.toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent(
        'That file is 24 MB. The limit is 10 MB.'
      );
    });

    it('turns the box border and nothing else', () => {
      const { container } = render(<Upload error="Wrong format" />);
      const box = container.querySelector(BOX);
      expect(box).toHaveAttribute('data-state', 'error');
      expect(box).toHaveClass('mdt-border-destructive');
      expect(box).toHaveClass('mdt-bg-background');
    });
  });

  describe('formatFileSize', () => {
    it.each([
      [512, '512 B'],
      [1024, '1 KB'],
      [2_306_867, '2.2 MB'],
      [12_058_624, '12 MB'],
    ])('turns %i bytes into %s', (bytes, text) => {
      expect(formatFileSize(bytes)).toBe(text);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// What the box refuses, and what it does on its own
// ─────────────────────────────────────────────────────────────────────────────

const file = (name: string, size = 1000, type = ''): File => {
  const f = new File(['x'], name, { type });
  Object.defineProperty(f, 'size', { value: size });
  return f;
};

const pick = (files: File[], label = 'Choose a file or drop it here') => {
  fireEvent.change(screen.getByLabelText(label), { target: { files } });
};

describe('Upload · what it refuses', () => {
  it('turns a file away for being too big, naming both numbers', () => {
    const onSelect = vi.fn();
    render(<Upload maxSize={10 * 1024 * 1024} onSelect={onSelect} />);

    pick([file('huge.pdf', 24 * 1024 * 1024)]);

    expect(screen.getByRole('alert')).toHaveTextContent('huge.pdf is 24 MB. The limit is 10 MB.');
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('turns a file away for its format, naming what is accepted', () => {
    render(<Upload accept=".pdf,.docx" />);
    pick([file('photo.bmp')]);
    expect(screen.getByRole('alert')).toHaveTextContent(
      '.bmp files are not accepted. Use PDF or DOCX.'
    );
  });

  it('takes the good files and refuses only the bad, rather than all or nothing', () => {
    const onSelect = vi.fn();
    render(<Upload multiple maxSize={1000} onSelect={onSelect} />);

    pick([file('a.pdf', 500), file('b.pdf', 500), file('huge.pdf', 9999)]);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toHaveLength(2);
    expect(screen.getByRole('alert')).toHaveTextContent('huge.pdf');
  });

  it('says how many were left out when there is not enough room', () => {
    render(<Upload multiple maxFiles={2} />);
    pick([file('a.pdf'), file('b.pdf'), file('c.pdf'), file('d.pdf')]);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'You picked 4 files. 2 is the limit, so 2 were left out.'
    );
  });

  it('turns the box border when it refuses something', () => {
    const { container } = render(<Upload accept=".pdf" />);
    pick([file('photo.bmp')]);
    expect(container.querySelector(BOX)).toHaveAttribute('data-state', 'error');
  });

  it('lets a caller error win, so the two can never contradict each other', () => {
    render(<Upload accept=".pdf" error="Pick a plan first." />);
    pick([file('photo.bmp')]);
    expect(screen.getByRole('alert')).toHaveTextContent('Pick a plan first.');
  });

  it('takes only one file when multiple is off, whatever the OS sent', () => {
    const onSelect = vi.fn();
    render(<Upload onSelect={onSelect} />);
    pick([file('a.pdf'), file('b.pdf')]);
    expect(onSelect.mock.calls[0][0]).toHaveLength(1);
  });

  it('clears the message once a good file arrives', () => {
    render(<Upload accept=".pdf" />);
    pick([file('photo.bmp')]);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    pick([file('plan.pdf')]);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('Upload · reachable by keyboard and screen reader', () => {
  it('draws a ring on the box when the field takes focus', () => {
    const { container } = render(<Upload label="Pick" />);
    expect(container.querySelector(BOX)).not.toHaveClass('mdt-ring-2');

    fireEvent.focus(screen.getByLabelText('Pick'));
    expect(container.querySelector(BOX)).toHaveClass('mdt-ring-2');

    fireEvent.blur(screen.getByLabelText('Pick'));
    expect(container.querySelector(BOX)).not.toHaveClass('mdt-ring-2');
  });

  it('reads the rules out along with the field', () => {
    render(<Upload label="Pick" hint="PDF or DOCX up to 10 MB" />);
    const describedBy = screen.getByLabelText('Pick').getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent(
      'PDF or DOCX up to 10 MB'
    );
  });

  it('marks the field invalid once it has refused something', () => {
    render(<Upload label="Pick" accept=".pdf" />);
    pick([file('photo.bmp')], 'Pick');
    expect(screen.getByLabelText('Pick')).toHaveAttribute('aria-invalid', 'true');
  });
});

describe('Upload · keeping its own list', () => {
  it('adds a chosen file with no state of your own', () => {
    const { container } = render(<Upload multiple />);
    pick([file('plan.pdf', 2048)]);
    expect(container.querySelectorAll(ROW)).toHaveLength(1);
    expect(screen.getByText('plan.pdf')).toBeInTheDocument();
  });

  it('removes on its own, and says so', () => {
    const onChange = vi.fn();
    const { container } = render(<Upload multiple onChange={onChange} />);
    pick([file('plan.pdf')]);
    fireEvent.click(screen.getByLabelText('Remove plan.pdf'));
    expect(container.querySelectorAll(ROW)).toHaveLength(0);
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('counts what it holds against the limit', () => {
    render(<Upload multiple maxFiles={2} />);
    pick([file('a.pdf')]);
    expect(screen.getByText('Limit 1 of 2')).toBeInTheDocument();
    pick([file('b.pdf')]);
    expect(screen.getByText('Limit 2 of 2')).toBeInTheDocument();
  });

  it('starts from defaultItems', () => {
    const { container } = render(<Upload multiple defaultItems={[done({ id: 'x' })]} />);
    expect(container.querySelectorAll(ROW)).toHaveLength(1);
  });

  it('does nothing itself while the caller owns the list', () => {
    const onSelect = vi.fn();
    const { container } = render(<Upload multiple items={[]} onSelect={onSelect} />);
    pick([file('plan.pdf')]);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(container.querySelectorAll(ROW)).toHaveLength(0);
  });
});

describe('Upload · driving a sender', () => {
  it('shows the bar, follows progress, then lands', async () => {
    let report: ((p: number) => void) | undefined;
    let finish: (() => void) | undefined;
    const sender = vi.fn(
      (_f: File, ctx: { onProgress: (p: number) => void }) =>
        new Promise<void>((resolve) => {
          report = ctx.onProgress;
          finish = resolve;
        })
    );

    render(<Upload multiple sender={sender} />);
    pick([file('plan.pdf', 2048)]);

    expect(await screen.findByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');

    await act(async () => {
      report?.(42);
      await Promise.resolve();
    });
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '42');

    await act(async () => {
      finish?.();
      await Promise.resolve();
    });
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByText('2 KB')).toBeInTheDocument();
  });

  it('turns a thrown reason into the row that says it', async () => {
    const sender = vi.fn(() => Promise.reject(new Error('storage-full')));
    render(<Upload multiple sender={sender} />);

    await act(async () => {
      pick([file('plan.pdf')]);
      await Promise.resolve();
    });

    expect(await screen.findByText('Storage full')).toBeInTheDocument();
    // and it is one of the three that cannot be retried
    expect(screen.queryByLabelText('Try plan.pdf again')).not.toBeInTheDocument();
  });

  it('offers Retry for a reason that could work, and runs the sender again', async () => {
    const sender = vi.fn(() => Promise.reject(new Error('server-error')));
    render(<Upload multiple sender={sender} />);

    await act(async () => {
      pick([file('plan.pdf')]);
      await Promise.resolve();
    });
    expect(await screen.findByText('Server error')).toBeInTheDocument();
    expect(sender).toHaveBeenCalledTimes(1);

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Try plan.pdf again'));
      await Promise.resolve();
    });
    expect(sender).toHaveBeenCalledTimes(2);
  });

  it('aborts the sender when an upload in flight is cancelled', async () => {
    let signal: AbortSignal | undefined;
    const sender = vi.fn(
      (_f: File, ctx: { signal: AbortSignal }) =>
        new Promise<void>(() => {
          signal = ctx.signal;
        })
    );

    render(<Upload multiple sender={sender} />);
    pick([file('plan.pdf')]);
    await screen.findByRole('progressbar');

    fireEvent.click(screen.getByLabelText('Cancel plan.pdf'));
    expect(signal?.aborted).toBe(true);
  });
});

describe('Upload · the buttons on top of a picture', () => {
  const withImage = (extra = {}) =>
    render(
      <Upload
        kind="image"
        defaultItems={[{ id: 'i1', name: 'logo.png', status: 'done', previewUrl: 'data:,x' }]}
        {...extra}
      />
    );

  it('puts the actions above the picture rather than trusting paint order', () => {
    const { container } = withImage();
    const img = container.querySelector('[data-slot="upload-preview"] img');
    const overlay = container.querySelector('[data-slot="upload-preview"] > div');
    expect(img).toHaveClass('mdt-z-0');
    expect(overlay).toHaveClass('mdt-z-10');
  });

  it('does not let invisible buttons swallow a click on the picture', () => {
    const { container } = withImage();
    const overlay = container.querySelector('[data-slot="upload-preview"] > div');
    expect(overlay).toHaveClass('mdt-pointer-events-none');
    expect(overlay).toHaveClass('group-hover:mdt-pointer-events-auto');
    // and a keyboard, which never hovers, still reaches them
    expect(overlay).toHaveClass('focus-within:mdt-pointer-events-auto');
  });

  it('moves the edge as well as the fill, because the fill is competing with a photo', () => {
    withImage();
    const change = screen.getByRole('button', { name: 'Change image' });
    expect(change).toHaveClass('mdt-shadow-sm');
    expect(change).toHaveClass('hover:mdt-border-neutral-100');
    expect(change).toHaveClass('hover:mdt-bg-muted');
  });

  it('removes the picture when Remove is pressed, with no state of your own', () => {
    const { container } = withImage();
    fireEvent.click(screen.getByRole('button', { name: 'Remove image' }));
    expect(container.querySelector('[data-slot="upload-preview"]')).not.toBeInTheDocument();
    expect(container.querySelector(BOX)).toBeInTheDocument();
  });

  it('opens the picker when Change is pressed', () => {
    withImage();
    const input = document.querySelector('input[type=file]') as HTMLInputElement;
    const opened = vi.spyOn(input, 'click');
    fireEvent.click(screen.getByRole('button', { name: 'Change image' }));
    expect(opened).toHaveBeenCalled();
  });
});
