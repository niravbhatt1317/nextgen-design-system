import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from '../components/Icon';
import { iconAtDrawnSize } from './icon-at-drawn-size';

const strokeOf = (node: React.ReactNode) =>
  render(<>{node}</>)
    .container.querySelector('svg')
    ?.getAttribute('stroke-width');

describe('iconAtDrawnSize', () => {
  it('gives a size-less Icon the size it is drawn at, so the ladder reads the true size', () => {
    expect(strokeOf(iconAtDrawnSize(<Icon name="plus" />, 16))).toBe('1.75');
    expect(strokeOf(iconAtDrawnSize(<Icon name="plus" />, 14))).toBe('1.75');
    expect(strokeOf(iconAtDrawnSize(<Icon name="plus" />, 20))).toBe('1.5');
  });

  it('leaves a size the caller asked for alone', () => {
    expect(strokeOf(iconAtDrawnSize(<Icon name="plus" size="lg" />, 16))).toBe('1.5');
    expect(strokeOf(iconAtDrawnSize(<Icon name="plus" size={12} />, 32))).toBe('1.75');
  });

  it('leaves an explicit strokeWidth alone - it never beats the caller', () => {
    expect(strokeOf(iconAtDrawnSize(<Icon name="plus" strokeWidth={2} />, 16))).toBe('2');
  });

  it('returns anything that is not an element untouched', () => {
    expect(iconAtDrawnSize('just text', 16)).toBe('just text');
    expect(iconAtDrawnSize(null, 16)).toBeNull();
    expect(iconAtDrawnSize(undefined, 16)).toBeUndefined();
    expect(iconAtDrawnSize(42, 16)).toBe(42);
  });

  it('leaves an element that is not an Icon alone', () => {
    /* the guard is a string `name` prop - a plain span has none, so nothing is cloned */
    const span = <span data-testid="plain">x</span>;
    expect(iconAtDrawnSize(span, 16)).toBe(span);
  });
});
