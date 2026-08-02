import { forwardRef, useId } from 'react';
import { cn } from '@/utils';
import type { AiMarkAppearance, AiMarkProps, AiMarkSize, AiMarkVariant } from './AiMark.types';

/**
 * The two marks, as the design owner drew them.
 *
 * Path data copied in rather than imported, for the same reason the icon set
 * is: a mark that can change shape without a commit is not a mark.
 *
 * **Each carries its own viewBox, cropped to its artwork.** Both arrived on a
 * 16px box with room around them - measured, `spark` filled 67% of it and
 * `trio` 77%, against the ~83% a Lucide glyph fills. So at the same rendered
 * size the mark read smaller than the icons beside it, and the two variants
 * read as different sizes from each other. Cropping to the artwork and padding
 * back to a common 86% fixes both: the paths are untouched, only the window
 * onto them moved.
 */
const MARKS: Record<AiMarkVariant, { paths: string[]; opacity: number; viewBox: string }> = {
  // One large four-pointed star with a small one at its shoulder. The general
  // AI mark - what a tone, a button or a label reaches for.
  spark: {
    paths: [
      'M11.9081 8.31506C9.9069 7.57392 8.32957 5.99657 7.58841 3.9954C7.54174 3.86872 7.3623 3.86872 7.31506 3.9954C6.57392 5.99657 4.99657 7.5739 2.9954 8.31506C2.86872 8.36173 2.86872 8.54118 2.9954 8.58841C4.99657 9.32956 6.5739 10.9069 7.31506 12.9081C7.36173 13.0348 7.54118 13.0348 7.58841 12.9081C8.32956 10.9069 9.9069 9.32957 11.9081 8.58841C12.0348 8.54174 12.0348 8.3623 11.9081 8.31506Z',
      'M13.5318 3.99108C12.7807 3.71385 12.189 3.12214 11.9117 2.37094C11.8944 2.32427 11.8261 2.32427 11.8094 2.37094C11.5322 3.12208 10.9405 3.71379 10.1893 3.99108C10.1426 4.0083 10.1426 4.07664 10.1893 4.09331C10.9404 4.37054 11.5321 4.96225 11.8094 5.71345C11.8267 5.76012 11.895 5.76012 11.9117 5.71345C12.1889 4.9623 12.7806 4.3706 13.5318 4.09331C13.5785 4.07609 13.5785 4.00775 13.5318 3.99108Z',
    ],
    // Drawn at 90%, and kept there rather than rounded up: it is what takes the
    // magenta end off full strength against a white page.
    opacity: 0.9,
    viewBox: '2.03 1.47 12.41 12.41',
  },
  // Three stars of falling size across the box, at a third of the strength.
  // For a surface that wants the mark as a texture rather than as a glyph.
  trio: {
    paths: [
      'M11.4287 9.14493C11.3361 8.89179 10.9776 8.89179 10.885 9.14493L10.4515 10.3346C10.3637 10.5754 10.1743 10.7649 9.93346 10.8526L8.74378 11.2861C8.49064 11.3787 8.49064 11.7373 8.74378 11.8299L9.93346 12.2634C10.1743 12.3511 10.3637 12.5406 10.4515 12.7814L10.885 13.9711C10.9776 14.2242 11.3361 14.2242 11.4287 13.9711L11.8622 12.7814C11.95 12.5406 12.1394 12.3511 12.3802 12.2634L13.5699 11.8299C13.8231 11.7373 13.8231 11.3787 13.5699 11.2861L12.3802 10.8526C12.1394 10.7649 11.95 10.5754 11.8622 10.3346L11.4287 9.14493Z',
      'M6.18583 4.69368C6.05953 4.3469 5.56879 4.3469 5.44195 4.69368L4.84899 6.32168C4.72858 6.6508 4.46903 6.91036 4.13989 7.03024L2.51189 7.62374C2.16511 7.75057 2.16511 8.24132 2.51189 8.36762L4.13989 8.96058C4.46902 9.08099 4.72858 9.34054 4.84899 9.66968L5.44195 11.2977C5.56825 11.6445 6.05953 11.6445 6.18583 11.2977L6.77879 9.66968C6.89921 9.34056 7.15876 9.08099 7.48789 8.96058L9.11589 8.36762C9.46267 8.24132 9.46267 7.75057 9.11589 7.62374L7.48789 7.03024C7.15877 6.91036 6.89921 6.65081 6.77879 6.32168L6.18583 4.69368Z',
      'M11.2163 2.01511C11.1264 1.7684 10.7775 1.7684 10.6875 2.01511L10.2653 3.17321C10.1797 3.40761 9.99504 3.59224 9.76064 3.67787L8.60255 4.09958C8.35583 4.19002 8.35583 4.53895 8.60255 4.62886L9.76064 5.0511C9.99504 5.13673 10.1797 5.32137 10.2653 5.55576L10.6875 6.71386C10.7775 6.96057 11.1264 6.96057 11.2163 6.71386L11.6385 5.55576C11.7242 5.32137 11.9088 5.13673 12.1432 5.0511L13.3013 4.62886C13.548 4.53895 13.548 4.19003 13.3013 4.09958L12.1432 3.67787C11.9088 3.59224 11.7242 3.40761 11.6385 3.17321L11.2163 2.01511Z',
    ],
    opacity: 0.3,
    viewBox: '0.84 0.83 14.34 14.34',
  },
};

/**
 * How heavy the line is, on the 16px box the marks were drawn on.
 *
 * 1, not Lucide's 2. Lucide draws on a 24px box, so 2 there is 1.33 here - and
 * these stars have concave curves that close up before a Lucide icon's would.
 * At 1.33 the small star in `spark` filled in at 16px; at 1 it stays a star.
 */
const STROKE = 1;

/**
 * A line has to hold its own strength.
 *
 * The drawn opacities exist to take the weight off a filled shape - 30% of a
 * solid star is a watermark, 30% of a 1px outline is nothing. So `line` always
 * renders at full and the caller dims it if they want to.
 */
const OPACITY: Partial<Record<AiMarkAppearance, number>> = { line: 1 };

/** The same scale `Icon` uses, so a mark and an icon sit level in a row. */
const SIZES: Record<AiMarkSize, string> = {
  xs: 'mdt-h-3 mdt-w-3',
  sm: 'mdt-h-4 mdt-w-4',
  md: 'mdt-h-5 mdt-w-5',
  lg: 'mdt-h-6 mdt-w-6',
  xl: 'mdt-h-8 mdt-w-8',
};

/**
 * AiMark - the gradient mark that means "this is AI".
 *
 * **A mark, not an icon, which is why it is not in the icon set.** Every
 * `<Icon>` is one stroke in `currentColor`, and that is what lets the system
 * size, tint and audit all 1209 of them the same way. This is three colours
 * sweeping across itself and answers to none of it - tinting it would destroy
 * the thing that makes it recognisable. The library's rule is that Lucide is
 * the only *icon* source; a brand mark is the same exception the seventeen
 * kept logos are.
 *
 * **Two of them, each filled or drawn as a line.** `spark` is the general
 * mark; `trio` is three stars at a third of the strength, for a surface that
 * wants a texture rather than a glyph. `appearance="line"` strokes the same
 * outline instead of filling it, for a row where every other glyph is line
 * art - beside a Lucide icon a solid mark reads as a different weight of
 * thing.
 *
 * **The gradient is a token**, not a literal: `--mdt-ai-gradient-from`, `-via`,
 * `-to` and `-via-position`. Both supplied marks carried the same ramp, which
 * is what made it a pattern worth saving rather than two one-off fills.
 *
 * Every instance mints its own gradient `id`. Two of these on a page sharing
 * one id is a real bug and a quiet one: the second element resolves the first
 * one's definition, so it looks right until the first unmounts.
 *
 * @example
 * ```tsx
 * <AiMark />
 * <AiMark variant="trio" size="lg" />
 * <AiMark title="Generated by AI" />
 * ```
 */
const AiMark = forwardRef<SVGSVGElement, AiMarkProps>(
  ({ className, variant = 'spark', size = 'sm', appearance = 'solid', title, ...props }, ref) => {
    // Unique per instance. `useId` is stable across server and client, so this
    // does not trade a painting bug for a hydration one.
    const gradientId = `mdt-ai-gradient-${useId()}`;
    const mark = MARKS[variant];

    return (
      <svg
        ref={ref}
        viewBox={mark.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('mdt-inline-flex mdt-shrink-0', SIZES[size], className)}
        // Decoration unless given a name. The mark says "AI" to somebody who
        // has learnt it and nothing at all to somebody who has not, so the
        // writing beside it is what should carry the meaning.
        {...(title === undefined ? { 'aria-hidden': true } : { role: 'img', 'aria-label': title })}
        {...props}
      >
        <g opacity={OPACITY[appearance] ?? mark.opacity}>
          {mark.paths.map((d) => (
            <path
              key={d.slice(0, 24)}
              d={d}
              {...(appearance === 'line'
                ? {
                    fill: 'none',
                    stroke: `url(#${gradientId})`,
                    strokeWidth: STROKE,
                    strokeLinejoin: 'round' as const,
                  }
                : { fill: `url(#${gradientId})` })}
            />
          ))}
        </g>
        <defs>
          {/*
            `objectBoundingBox`, so the ramp runs across *each* star rather
            than across the box they sit in. That is how the supplied marks
            were drawn - one gradient per path, each spanning its own extent -
            and it is not cosmetic: swept across the whole 16px box instead,
            the small star in `spark` and the two small ones in `trio` land
            past the violet stop and come out solid magenta, with the blue end
            never appearing at all. Rendered both ways to be sure.
          */}
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0.5"
            x2="1"
            y2="0.5"
            gradientUnits="objectBoundingBox"
          >
            <stop stopColor="hsl(var(--mdt-ai-gradient-from))" />
            <stop
              offset="var(--mdt-ai-gradient-via-position)"
              stopColor="hsl(var(--mdt-ai-gradient-via))"
            />
            <stop offset="1" stopColor="hsl(var(--mdt-ai-gradient-to))" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
);
AiMark.displayName = 'AiMark';

export { AiMark };
