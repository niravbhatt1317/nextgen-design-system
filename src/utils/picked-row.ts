/**
 * The ground a picked option wears in every dropdown, list and menu (Pranjal, 2026-10-21: every selection looks the
 * same everywhere). The picked row sits on the pale blue-10 ground with its tick on the RIGHT in the reading ink; the
 * row under the pointer or the keyboard takes only the neutral-10 ground and no tick; a picked row keeps its pale
 * ground under the pointer too. No tick on the left anywhere, and no picked row without the ground.
 *
 * For a row whose picked state is known in code. Put it LAST in `cn()`, after the row's own hover / highlight / focus
 * grounds: the class merger then drops those, so the pale ground holds in every state.
 */
export const PICKED_ROW_CLASSES = [
  'mdt-bg-blue-10 hover:mdt-bg-blue-10 focus:mdt-bg-blue-10',
  'data-[highlighted]:mdt-bg-blue-10 aria-selected:mdt-bg-blue-10',
].join(' ');

/**
 * The same ground for a Radix row that stamps its own `data-state="checked"` (a checkbox or radio menu item, a Select
 * item), where the picked state is not known in code. Every state is doubled with `data-[state=checked]`, so it
 * outranks the plain hover / highlight / focus grounds whatever order the stylesheet prints them in.
 */
export const CHECKED_ROW_CLASSES = [
  'data-[state=checked]:mdt-bg-blue-10 data-[state=checked]:hover:mdt-bg-blue-10',
  'data-[state=checked]:focus:mdt-bg-blue-10 data-[state=checked]:data-[highlighted]:mdt-bg-blue-10',
].join(' ');
