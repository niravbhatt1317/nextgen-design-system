'use client';

import { useEffect, useState } from 'react';
import { ActionCard } from '../ActionCard';
import { Banner } from '../Banner';
import { Button } from '../Button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../Dialog';
import { Icon } from '../Icon';
import { TreeView } from '../TreeView';
import type { PathBrowserDialogProps } from './PathBrowserDialog.types';

/* PORTED FROM THE CONSOLE (Ronak, 2026-10-09 to 2026-10-13): next-gen-ui features/credential-profiles/CredentialForm.jsx
 * PathBrowserModal - what Browse opens on the Reference path field (InputAction). The console's dialog is the library
 * Dialog with the console header (compat/om Modal: the title 16/600/24, not 18; the header's hairline), 560 wide.
 *
 *   the endpoint card   ActionCard's compact face - the store's path-list URL over "Synced … · auto every N min", the globe LEADING the pair on the
 *                       URL's line (2 down, so the sync line starts under the URL's first letter - Ronak 2026-10-13),
 *                       2 between the lines (2026-10-09: "reduce the spacing between the url and time line"), Sync now
 *                       the console's outline button at its default size beside them
 *   the tree            TreeView, 10 under the card - keys with their paths at the row's end. It mounts with the
 *                       dialog's content, so each opening starts again from the field's path
 *   the selected line   "Selected path:" and the pick in mono, or the hint
 *   no path-list API    a warning leads the body, ABOVE the card, and no tree (O3)
 *
 * Colours are the console's, by the library's names: the console's --mdt-border and muted-foreground are its
 * neutral-20 and neutral-50. */

/** The dialog's width: the console's md modal. */
const WIDTH = 560;
const DEFAULT_HINT = '— pick a key, or type one in the field —';

/**
 * PathBrowserDialog - a centred dialog that browses a store's paths as a tree - folders that open, keys that are
 * picked - under the store's endpoint card with Sync now, and hands the picked path back on Use this path. What an
 * InputAction "Browse" opens.
 *
 * @example
 * ```tsx
 * <PathBrowserDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   subtitle="platform-vault-prod · HashiCorp Vault"
 *   source={{ url: store.pathApi, syncedLabel: 'Synced moments ago · auto every 10 min' }}
 *   onSync={sync}
 *   tree={paths}
 *   value={refPath}
 *   onPick={(path) => { setRefPath(path); setOpen(false); }}
 * />
 * ```
 */
function PathBrowserDialog({
  open,
  onOpenChange,
  title = 'Browse vault paths',
  subtitle,
  tree,
  value = '',
  onPick,
  defaultExpanded,
  source,
  onSync,
  syncing = false,
  unavailable,
  pickLabel = 'Use this path',
  emptyHint = DEFAULT_HINT,
}: PathBrowserDialogProps) {
  const [selected, setSelected] = useState(value);

  /* every opening starts from the field: its path picked (the tree opens the folders to it as it mounts) */
  useEffect(() => {
    if (open) setSelected(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset on opening only, not on every parent render
  }, [open]);

  const listable = unavailable === undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        scroll="body"
        style={{ width: WIDTH, maxWidth: 'calc(100vw - 48px)' }}
        {...(subtitle === undefined ? { 'aria-describedby': undefined } : {})}
      >
        {/* the console header: its hairline in neutral-20, 2 between the title and the store line (the library's 8 is
         * the gap of a title over a sentence; this line is the title's caption) */}
        <DialogHeader className="mdt-space-y-0.5 mdt-border-neutral-20">
          <DialogTitle className="mdt-text-base mdt-leading-6">{title}</DialogTitle>
          {subtitle !== undefined ? (
            <DialogDescription className="mdt-text-neutral-50">{subtitle}</DialogDescription>
          ) : null}
        </DialogHeader>

        <DialogBody>
          {listable ? null : (
            <div className="mdt-mb-2.5">
              <Banner tone="warning" description={unavailable} />
            </div>
          )}

          {source ? (
            <ActionCard
              variant="compact"
              icon={<Icon name="globe" />}
              title={source.url}
              description={source.syncedLabel}
              actions={
                onSync ? (
                  <Button
                    variant="outline"
                    leftIcon={<Icon name="refresh-cw" size={16} aria-hidden />}
                    disabled={syncing || !listable}
                    onClick={onSync}
                  >
                    {syncing ? 'Syncing…' : 'Sync now'}
                  </Button>
                ) : undefined
              }
            />
          ) : null}

          {listable ? (
            <TreeView
              aria-label={typeof title === 'string' ? title : 'Paths'}
              className="mdt-mt-2.5"
              nodes={tree}
              value={selected}
              onSelect={setSelected}
              defaultExpanded={defaultExpanded}
              itemIcon="key"
              showValues
            />
          ) : null}

          <div className="mdt-mt-2.5 mdt-text-[11px] mdt-leading-[1.4] mdt-text-neutral-50">
            Selected path:{' '}
            {selected ? (
              <span className="mdt-font-mono mdt-text-neutral-130">{selected}</span>
            ) : (
              <span>{emptyHint}</span>
            )}
          </div>
        </DialogBody>

        <DialogFooter className="mdt-border-neutral-20">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            leftIcon={<Icon name="check" size={16} aria-hidden />}
            disabled={!selected}
            onClick={() => {
              onPick(selected);
            }}
          >
            {pickLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

PathBrowserDialog.displayName = 'PathBrowserDialog';

export { PathBrowserDialog };
