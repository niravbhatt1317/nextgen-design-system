/**
 * The option card's three edges, each a 1px border plus a 0.5px inset ring of
 * the same colour - so the edge is 1.5 in every state and a choice never moves
 * anything: the hairline at rest, the field edge under the pointer, the ink edge
 * when chosen. Shared by `SelectableCard` and `PickCard`, which wear one card.
 */
export const SELECTABLE_CARD_EDGE = {
  rest: 'mdt-border-neutral-20 mdt-shadow-[inset_0_0_0_0.5px_hsl(var(--mdt-neutral-20))]',
  hover: 'hover:mdt-border-input hover:mdt-shadow-[inset_0_0_0_0.5px_hsl(var(--mdt-input))]',
  chosen: 'mdt-border-foreground mdt-shadow-[inset_0_0_0_0.5px_hsl(var(--mdt-foreground))]',
} as const;
