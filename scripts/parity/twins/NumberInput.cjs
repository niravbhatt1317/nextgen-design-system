/* Parity twins: where the same frame lives in the story, the console and the mock. */
const M = (n) => `.matrix > div:nth-child(${n}) > .fld`; // the number row of the inputs mock: cells 23..28
const FIELD = ['height', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopColor', 'borderRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight', 'boxShadow', 'cursor', 'opacity'];
/* the console's own number field lives in the Users selection menu (K-Field-25); it was not reached in this audit - console: null until a driver is written */
module.exports = {
  component: 'NumberInput',
  frames: [
    { name: 'sm · rest (padded 0 30 0 12)', props: FIELD, story: { id: 'new-components-input--kinds', select: 'input[type=number]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(23) } },
    { name: 'sm · hover', props: FIELD, state: 'hover', story: { id: 'new-components-input--kinds', select: 'input[type=number]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: M(24) } },
    { name: 'the stepper (two 18 x 11, gap 1, 4 from the right)', props: ['width', 'height', 'gap'], story: { id: 'new-components-input--kinds', select: 'div:has(> input[type=number]) > span' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(23)} .step` } },
    { name: 'a step button at rest (18 x 11, corners 3, faint)', props: ['width', 'height', 'borderRadius', 'backgroundColor', 'color'], story: { id: 'new-components-input--kinds', select: 'button[aria-label="Increase"]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(23)} .step span` } },
    { name: 'a step button under the pointer (neutral-20, neutral-90)', props: ['backgroundColor', 'color'], state: 'hover', story: { id: 'new-components-input--kinds', select: 'button[aria-label="Increase"]' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: '.matrix > div:nth-child(24) .step span:first-child' } },
    { name: 'the 9 chevron', props: ['width', 'height', 'strokeWidth'], story: { id: 'new-components-input--kinds', select: 'button[aria-label="Increase"] svg' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(23)} .step svg` } },
    { name: 'sm · held (the lock in place of the stepper)', props: ['width', 'height', 'color'], story: { id: 'foundation-field--the-matrix', select: 'div:has(> span > svg) > input[type=number][disabled] + span > svg' }, console: null, mock: { file: 'mocks/foundation/inputs.html', select: `${M(27)} .lock svg` } },
  ],
};
