import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { IconName } from '../Icon';

export interface OrgCardProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title' | 'children'> {
  /** The organization's name: "MSP owner organization". */
  name: ReactNode;

  /**
   * One faint line under the name - what belonging to it means here: "The team
   * belongs to the active frame. Switch to a client frame to create a client team."
   */
  line?: ReactNode | undefined;

  /**
   * The field label above the card, on the form ladder (13 / 500, the secondary
   * ink): "Organization". It also names the card for a screen reader.
   */
  label?: ReactNode | undefined;

  /**
   * The glyph in the tile: an icon name from the library's set, or a node of
   * your own. Defaults to `building`. A node is drawn at the tile's 20px.
   */
  icon?: IconName | Exclude<ReactNode, string> | undefined;
}
