import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils';

/**
 * Always eight bullets, whatever the secret's real length.
 *
 * Credential's version fixes the count deliberately, so the rendering does not
 * leak how long the secret is.
 */
const BULLET_COUNT = 8;
const BULLETS = '•'.repeat(BULLET_COUNT);

export type SecretDotsSize = 'sm' | 'md';

export interface SecretDotsProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'className' | 'children' | 'color'> {
  /**
   * What is hidden. Announced to screen readers.
   *
   * Credential's audit records the gap this closes: its dots are `aria-hidden`,
   * so a screen-reader user gets no indication a secret exists at all unless
   * the caller happens to supply a caption. Here the caption is built in.
   * @default 'Hidden secret'
   */
  label?: string;

  /** @default 'md' */
  size?: SecretDotsSize;

  className?: string;
}

const SIZE: Record<SecretDotsSize, string> = {
  sm: 'mdt-text-xs',
  md: 'mdt-text-sm',
};

/**
 * SecretDots - a masked secret.
 *
 * @example
 * ```tsx
 * <SecretDots />
 * <SecretDots label="Hidden API key" />
 * ```
 */
const SecretDots = forwardRef<HTMLSpanElement, SecretDotsProps>(
  ({ label = 'Hidden secret', size = 'md', className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(
        'mdt-inline-flex mdt-items-center mdt-font-mono mdt-tracking-widest mdt-text-muted-foreground',
        SIZE[size],
        className
      )}
      {...rest}
    >
      {/* The bullets carry no meaning on their own, so the label speaks instead. */}
      <span aria-hidden="true" data-testid="secret-dots-bullets">
        {BULLETS}
      </span>
      <span className="mdt-sr-only">{label}</span>
    </span>
  )
);

SecretDots.displayName = 'SecretDots';

export { SecretDots, BULLET_COUNT };
