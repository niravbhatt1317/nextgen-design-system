import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { UploadFailure, UploadItem, UploadSender } from './Upload.types';

/**
 * Turn whatever the sender threw into one of the eight reasons a row can show.
 *
 * A thrown `Error` whose message is one of those reasons is taken at its word,
 * so `throw new Error('storage-full')` is all a caller needs to write. Anything
 * else falls back on what the browser knows: offline means the connection went,
 * otherwise the server is the thing that failed.
 */
function toFailure(error: unknown): UploadFailure {
  const known: readonly UploadFailure[] = [
    'connection-lost',
    'timed-out',
    'server-error',
    'storage-full',
    'blocked-by-scan',
    'damaged',
    'signed-out',
    'cancelled',
  ];
  if (error instanceof Error && (known as readonly string[]).includes(error.message)) {
    return error.message as UploadFailure;
  }
  if (typeof navigator !== 'undefined' && !navigator.onLine) return 'connection-lost';
  return 'server-error';
}

export interface UseUploadFilesOptions {
  /** Present means the caller is driving the list and this hook only relays. */
  items?: UploadItem[] | undefined;
  defaultItems?: UploadItem[] | undefined;
  /** Given one, the hook drives progress and failure itself. */
  sender?: UploadSender | undefined;
  onChange?: ((items: UploadItem[]) => void) | undefined;
  onRemove?: ((id: string) => void) | undefined;
  onRetry?: ((id: string) => void) | undefined;
}

export interface UseUploadFiles {
  items: UploadItem[];
  add: (files: File[]) => void;
  remove: (id: string) => void;
  retry: (id: string) => void;
}

/**
 * The list, and what happens to it.
 *
 * ## Two ways to use it, one component
 *
 * Pass `items` and you own the list - the component draws exactly what you give
 * it and reports what someone did. Leave `items` out and the component keeps the
 * list itself: adding, removing, retrying and the limit all work with no state
 * of your own.
 *
 * ## The line the design system will not cross
 *
 * Even self-managing, it never sends anything. You hand it **one function** that
 * sends a single file and reports progress; it runs that function, drives the
 * bar, and turns a rejection into a row that says why. Signed URLs, chunking,
 * headers and retry policy are different in every product and belong in the
 * product - but *none of that* is a reason for every team to rewrite the list.
 */
export function useUploadFiles({
  items: controlled,
  defaultItems,
  sender,
  onChange,
  onRemove,
  onRetry,
}: UseUploadFilesOptions): UseUploadFiles {
  const isControlled = controlled !== undefined;
  const [own, setOwn] = useState<UploadItem[]>(defaultItems ?? []);
  const items = isControlled ? controlled : own;

  // The File itself is never put in state - it is not serialisable and nothing
  // renders it. Retry needs it and removal needs the object URL back, so both
  // are kept beside the list, keyed by id, where they are always current.
  const held = useRef(new Map<string, { file: File; previewUrl?: string }>());
  const aborts = useRef(new Map<string, AbortController>());
  const seq = useRef(0);
  const live = useRef(true);

  useEffect(() => {
    live.current = true;
    // Copied inside the effect, as the rule asks. It is the same Map either
    // way - a ref's identity never changes - but the copy makes that explicit.
    const inFlight = aborts.current;
    const resources = held.current;
    return () => {
      live.current = false;
      inFlight.forEach((c) => {
        c.abort();
      });
      inFlight.clear();
      // Nothing is left holding a picture in memory once the field is gone.
      resources.forEach(({ previewUrl }) => {
        if (previewUrl !== undefined) URL.revokeObjectURL(previewUrl);
      });
      resources.clear();
    };
  }, []);

  const write = useCallback(
    (next: (prev: UploadItem[]) => UploadItem[]) => {
      if (!live.current) return;
      setOwn((prev) => {
        const value = next(prev);
        onChange?.(value);
        return value;
      });
    },
    [onChange]
  );

  const patch = useCallback(
    (id: string, changes: Partial<UploadItem>) => {
      write((prev) => prev.map((it) => (it.id === id ? { ...it, ...changes } : it)));
    },
    [write]
  );

  const send = useCallback(
    async (id: string, file: File) => {
      if (!sender) return;
      const controller = new AbortController();
      aborts.current.set(id, controller);
      patch(id, { status: 'uploading', progress: 0, failure: undefined });
      try {
        await sender(file, {
          onProgress: (percent) => {
            patch(id, { progress: Math.min(100, Math.max(0, percent)) });
          },
          signal: controller.signal,
        });
        // A cancelled upload has already left the list; do not resurrect it.
        if (controller.signal.aborted) return;
        patch(id, { status: 'done', progress: 100, size: file.size });
      } catch (error) {
        if (controller.signal.aborted) return;
        patch(id, { status: 'failed', failure: toFailure(error) });
      } finally {
        aborts.current.delete(id);
      }
    },
    [sender, patch]
  );

  const add = useCallback(
    (incoming: File[]) => {
      if (isControlled) return;
      const made = incoming.map((file) => {
        seq.current += 1;
        const id = `upload-${String(seq.current)}`;
        // A picture is previewed straight from the disk, so it shows the moment
        // it is chosen rather than waiting for a round trip.
        const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
        held.current.set(id, { file, ...(previewUrl !== undefined ? { previewUrl } : {}) });
        const item: UploadItem = {
          id,
          name: file.name,
          size: file.size,
          // With no sender there is nothing to wait for, so a file is simply in.
          status: sender ? 'uploading' : 'done',
          ...(sender ? { progress: 0 } : {}),
          ...(previewUrl !== undefined ? { previewUrl } : {}),
        };
        return { item, file };
      });

      write((prev) => [...prev, ...made.map((m) => m.item)]);
      if (sender) {
        made.forEach(({ item, file }) => {
          void send(item.id, file);
        });
      }
    },
    [isControlled, sender, write, send]
  );

  const remove = useCallback(
    (id: string) => {
      onRemove?.(id);
      if (isControlled) return;
      // Cancelling is removing: an upload in flight is stopped, and the object
      // URL this hook created is released here, because this hook created it.
      aborts.current.get(id)?.abort();
      aborts.current.delete(id);
      const resource = held.current.get(id);
      if (resource?.previewUrl !== undefined) URL.revokeObjectURL(resource.previewUrl);
      held.current.delete(id);
      write((prev) => prev.filter((it) => it.id !== id));
    },
    [isControlled, onRemove, write]
  );

  const retry = useCallback(
    (id: string) => {
      onRetry?.(id);
      if (isControlled) return;
      const resource = held.current.get(id);
      if (resource && sender) void send(id, resource.file);
    },
    [isControlled, onRetry, sender, send]
  );

  return useMemo(() => ({ items, add, remove, retry }), [items, add, remove, retry]);
}
