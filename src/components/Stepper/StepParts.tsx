import type { ClassValue } from 'clsx';
import type { ReactNode } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import {
  DISC_LOOK,
  DISC_POINTER,
  HERE_RING,
  LABEL_LINE,
  MARK,
  labelKey,
  type StepLook,
  type StepModel,
} from './stepperState';

/*
 * The two parts every layout draws the same way - the disc and the label - so the halo, the ring, the dashed line
 * and the spoken words cannot drift between the across layouts and the rail.
 */

interface StepDiscProps {
  index: number;
  model: StepModel;
  /** The layout's size, edge width and number size. */
  className: ClassValue;
  markSize: 'sm' | 'xs';
  /** The tick's weight, where a layout draws it heavier. */
  tickStroke?: number | undefined;
}

/** The disc: a tick for done, a dash for passed over, the number everywhere else. */
export const StepDisc = ({ index, model, className, markSize, tickStroke }: StepDiscProps) => {
  const mark = MARK[model.look];
  return (
    <span
      data-slot="stepper-disc"
      data-here={model.here || undefined}
      className={cn(
        'mdt-flex mdt-shrink-0 mdt-items-center mdt-justify-center mdt-rounded-full',
        'mdt-box-border mdt-font-semibold mdt-tabular-nums',
        className,
        DISC_LOOK[model.look],
        DISC_POINTER,
        model.here && HERE_RING
      )}
      aria-hidden="true"
    >
      {mark ? (
        <Icon
          name={mark}
          size={markSize}
          {...(mark === 'check' && tickStroke !== undefined ? { strokeWidth: tickStroke } : {})}
          aria-hidden
        />
      ) : (
        index + 1
      )}
    </span>
  );
};

interface StepLabelProps {
  label: ReactNode;
  model: StepModel;
  /** The layout's size and flow. */
  className: ClassValue;
  /** The layout's ink and weight per look. */
  ink: Record<StepLook, string>;
  /** The words again, for a layout that reserves the room their bold version needs. */
  dataText?: string | undefined;
}

/** The label, with the dashed line hover draws under it and the words a screen reader hears after it. */
export const StepLabel = ({ label, model, className, ink, dataText }: StepLabelProps) => (
  <span
    data-slot="stepper-label"
    data-text={dataText}
    className={cn(className, LABEL_LINE, ink[labelKey(model)])}
  >
    {label}
    {model.spoken === '' ? null : <span className="mdt-sr-only">{model.spoken}</span>}
  </span>
);
