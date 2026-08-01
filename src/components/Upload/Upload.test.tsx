import { render, screen, fireEvent } from '@testing-library/react';
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
    it('hands the files over rather than adding them itself', () => {
      const onSelect = vi.fn();
      const { container } = render(<Upload label="Pick" onSelect={onSelect} />);
      const file = new File(['x'], 'a.pdf', { type: 'application/pdf' });

      fireEvent.change(screen.getByLabelText('Pick'), { target: { files: [file] } });

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][0][0].name).toBe('a.pdf');
      // it did not put the file in the list on its own
      expect(container.querySelector(ROW)).not.toBeInTheDocument();
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
