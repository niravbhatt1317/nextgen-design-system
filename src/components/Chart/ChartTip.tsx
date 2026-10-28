import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../Tooltip';
import type { ChartTipProps } from './Chart.types';
import './chart.css';

/**
 * ChartTip - the one-line hover on a chart mark: the mark and its value, opening at once above it.
 *
 * Ported from the console Health's shared `Tip` (Pranjal, 2026-10-28: "keep them direct to the point. in charts if
 * it shows number then just number if other then other"; "why do we need to show name of all the agents in the first
 * place"). One line - "1–2 days silent · 69 agents", "Linux · 412 agents", "14:00 · 98.2%" - never a list of names,
 * a breakdown, a "Select to see them" line or an "example" tag. It takes one string, so a second line cannot creep
 * back. The bubble is the library Tooltip, `instant`, on top, wrapping at 320.
 *
 * @example
 * ```tsx
 * <ChartTip text="6–24h silent · 10 agents">
 *   <button type="button">…</button>
 * </ChartTip>
 * ```
 */
export function ChartTip({ text, children }: ChartTipProps) {
  return (
    <TooltipProvider>
      <Tooltip instant>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="top" maxWidth={320}>
          <span className="mdt-chart-tip">{text}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
