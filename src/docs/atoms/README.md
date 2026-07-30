# Atoms comparison — currently off

The side-by-side comparison of each atom across the four product design systems.
It served its purpose: the atom layer has been decided and built, so the section
was taken out of the Storybook sidebar to stop it competing with the real
components.

**Nothing here was deleted.** The extracted specimens and each team's stylesheet
are still in `atoms-data.json`, and the rendering machinery is still in
`Specimen.tsx` and `Compare.tsx`.

## Bringing it back

Recreate `Atoms.stories.tsx` in this folder:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Compare } from './Compare';

const meta: Meta<typeof Compare> = {
  title: 'Atoms',
  component: Compare,
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = { name: 'Button', args: { atomId: 'button' } };
// ...one export per row
```

The full version is in git history — `git log -- src/docs/atoms/Atoms.stories.tsx`.

## Available rows

`atomRows` is exported from `Compare.tsx` if you want to generate the stories
rather than write them out. The ids are:

```
button                        icon-button
text-input                    select-search-input-textarea
checkbox-radio-switch         status-pill
chip-meta-pill                micro-label-count-badges
test-status-label             protocol-store-badges
avatar-avatar-stack           icon-tile
secret-dots                   code-mono-wells
progress-meters-bars
```

## Note

`atoms-data.json` is imported only by these files, never by `src/index.ts`, so
it is not part of the published library bundle.
