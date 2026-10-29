import type { ReactNode } from 'react';
import type { TreeViewNode } from '../TreeView';

/**
 * Where the tree comes from: the store's path-list endpoint and when it was last read.
 */
export interface PathBrowserSource {
  /** The path-list endpoint, on the card's first line ("https://vault.acme.io/v1/secret/metadata?list=true"). */
  url: string;

  /** The card's second line - "Synced moments ago · auto every 10 min". */
  syncedLabel: ReactNode;
}

/**
 * Props for PathBrowserDialog - a centred dialog that browses a store's paths as a tree and hands one back.
 */
export interface PathBrowserDialogProps {
  /** Whether the dialog is open. */
  open: boolean;

  /** Called when the dialog asks to open or close - Escape, the ✕, a click outside, Cancel. */
  onOpenChange: (open: boolean) => void;

  /** The heading. @default 'Browse vault paths' */
  title?: ReactNode | undefined;

  /** The line under the heading - the store and its type ("platform-vault-prod · HashiCorp Vault"). */
  subtitle?: ReactNode | undefined;

  /** The entries at the top of the tree. */
  tree: TreeViewNode[];

  /** The path already in the field. The dialog opens with it picked, and Use this path stays off until one is. */
  value?: string | undefined;

  /** Called with the picked key's path on Use this path. The dialog does not close itself - close it here. */
  onPick: (path: string) => void;

  /**
   * The folders open when the dialog opens, by their labels from the top ("secret/", "secret/data/").
   * @default every folder on the way to `value`; with none, each folder that stands alone
   */
  defaultExpanded?: string[] | undefined;

  /** The endpoint card above the tree. Left unset, the card is not drawn. */
  source?: PathBrowserSource | undefined;

  /** Shows Sync now on the card; called when it is pressed. */
  onSync?: (() => void) | undefined;

  /**
   * While true, Sync now is off and reads "Syncing…".
   * @default false
   */
  syncing?: boolean | undefined;

  /**
   * The store cannot list its paths. A warning leads the body with this text, Sync now is off and no tree is drawn -
   * the path is typed in the field instead.
   */
  unavailable?: ReactNode | undefined;

  /** The words on the pick button. @default 'Use this path' */
  pickLabel?: string | undefined;

  /** What the selected-path line says before a key is picked. @default '— pick a key, or type one in the field —' */
  emptyHint?: string | undefined;
}
