import { cva } from 'class-variance-authority';
import { forwardRef, cloneElement, useState, useEffect, type ReactElement } from 'react';
import { cn } from '@/utils';
import type { IconProps } from './Icon.types';
import { iconRegistry } from './icons';

/**
 * Icon variants using Class Variance Authority (CVA)
 */
export const iconVariants = cva(['mdt-inline-flex mdt-shrink-0'], {
  variants: {
    size: {
      xs: 'mdt-h-3 mdt-w-3',
      sm: 'mdt-h-4 mdt-w-4',
      md: 'mdt-h-5 mdt-w-5',
      lg: 'mdt-h-6 mdt-w-6',
      xl: 'mdt-h-8 mdt-w-8',
    },
    color: {
      current: 'mdt-text-current',
      primary: 'mdt-text-primary',
      secondary: 'mdt-text-secondary-foreground',
      // The success fill is deep enough for white text to sit on it, which
      // leaves it too deep to read against the dark page - 3.7:1. Green 40
      // flips it back to 7.7:1. Same missing token pair Badge logs.
      success: 'mdt-text-success dark:mdt-text-green-40',
      destructive: 'mdt-text-destructive',
      warning: 'mdt-text-warning',
      info: 'mdt-text-info',
      muted: 'mdt-text-muted-foreground',
      foreground: 'mdt-text-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'current',
  },
});

/**
 * Cache for fetched SVG content to avoid refetching
 */
const svgCache = new Map<string, string>();

/**
 * Allowlist of safe SVG elements to prevent XSS attacks (SonarQube: S6299)
 */
const ALLOWED_SVG_ELEMENTS = new Set([
  'svg',
  'path',
  'circle',
  'ellipse',
  'line',
  'polygon',
  'polyline',
  'rect',
  'g',
  'defs',
  'clipPath',
  'mask',
  'use',
  'symbol',
  'title',
  'desc',
  'linearGradient',
  'radialGradient',
  'stop',
  'pattern',
  'filter',
  'feGaussianBlur',
  'feOffset',
  'feBlend',
  'feColorMatrix',
  'feComposite',
  'feFlood',
  'feMerge',
  'feMergeNode',
  'text',
  'tspan',
]);

/**
 * Allowlist of safe SVG attributes to prevent XSS attacks (SonarQube: S6299)
 */
const ALLOWED_SVG_ATTRIBUTES = new Set([
  // Core attributes
  'id',
  'class',
  'style',
  'tabindex',
  // Presentation attributes
  'fill',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-miterlimit',
  'stroke-opacity',
  'fill-opacity',
  'fill-rule',
  'opacity',
  'transform',
  'transform-origin',
  // Geometry attributes
  'd',
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'width',
  'height',
  'points',
  'viewBox',
  'preserveAspectRatio',
  // Gradient attributes
  'offset',
  'stop-color',
  'stop-opacity',
  'gradientUnits',
  'gradientTransform',
  'spreadMethod',
  'fx',
  'fy',
  // Filter attributes
  'stdDeviation',
  'dx',
  'dy',
  'in',
  'in2',
  'result',
  'mode',
  'values',
  'type',
  // Reference attributes
  'href',
  'xlink:href',
  'clip-path',
  'mask',
  'filter',
  // Text attributes
  'font-family',
  'font-size',
  'font-weight',
  'text-anchor',
  'dominant-baseline',
  'letter-spacing',
]);

/**
 * Check if an attribute is dangerous (XSS vector)
 */
function isAttributeDangerous(attrName: string, attrValue: string): boolean {
  const attrValueLower = attrValue.toLowerCase();
  return (
    attrName.startsWith('on') ||
    attrValueLower.includes('javascript:') ||
    attrValueLower.includes('data:text/html')
  );
}

/**
 * Sanitize element attributes by removing dangerous or disallowed ones
 */
function sanitizeElementAttributes(element: Element): void {
  const attributesToRemove: string[] = [];

  for (const attr of Array.from(element.attributes)) {
    const attrName = attr.name.toLowerCase();
    if (isAttributeDangerous(attrName, attr.value) || !ALLOWED_SVG_ATTRIBUTES.has(attrName)) {
      attributesToRemove.push(attr.name);
    }
  }

  attributesToRemove.forEach((attrName) => {
    element.removeAttribute(attrName);
  });
}

/**
 * Recursive function to sanitize SVG nodes
 */
function sanitizeNode(node: Node): void {
  // Handle text nodes - keep them (they're safe in SVG context)
  if (node.nodeType === Node.TEXT_NODE) {
    return;
  }

  // Remove non-element nodes (comments, processing instructions, etc.)
  if (node.nodeType !== Node.ELEMENT_NODE) {
    (node as ChildNode).remove();
    return;
  }

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  // Remove elements not in allowlist
  if (!ALLOWED_SVG_ELEMENTS.has(tagName)) {
    element.remove();
    return;
  }

  // Sanitize attributes
  sanitizeElementAttributes(element);

  // Recursively sanitize child nodes
  Array.from(node.childNodes).forEach(sanitizeNode);
}

/**
 * Sanitize SVG content to prevent XSS attacks (SonarQube: S6299)
 * Removes any elements or attributes not in the allowlist
 */
function sanitizeSvgContent(svgString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  // Check for parsing errors
  if (doc.querySelector('parsererror')) {
    return '';
  }

  const svgElement = doc.querySelector('svg');
  if (!svgElement) {
    return '';
  }

  sanitizeNode(svgElement);
  return svgElement.innerHTML;
}

/**
 * Fetch and parse SVG content from a URL
 */
async function fetchSvgContent(src: string): Promise<string> {
  // Check cache first
  const cached = svgCache.get(src);
  if (cached) {
    return cached;
  }

  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Failed to fetch SVG: ${response.statusText}`);
  }

  const text = await response.text();

  // Validate it's an SVG
  if (!text.includes('<svg')) {
    throw new Error('Invalid SVG content');
  }

  // Cache the result
  svgCache.set(src, text);

  return text;
}

/**
 * Parse SVG string and extract the inner content with sanitization (SonarQube: S6299)
 */
function parseSvgContent(svgString: string): { innerContent: string; viewBox: string } {
  // Extract viewBox using regex first (before sanitization might remove it)
  const viewBoxRegex = /viewBox=["']([^"']+)["']/;
  const viewBoxMatch = viewBoxRegex.exec(svgString);
  const viewBox = viewBoxMatch?.[1] ?? '0 0 24 24';

  // Sanitize the SVG content to prevent XSS attacks
  const innerContent = sanitizeSvgContent(svgString);

  return { innerContent, viewBox };
}

/**
 * Common SVG props type for icon rendering
 */
interface CommonSvgProps {
  ref: React.Ref<SVGSVGElement>;
  className: string;
  style: React.CSSProperties | undefined;
  strokeWidth: number;
  'aria-label': string | undefined;
  'aria-hidden': 'true' | undefined;
  role: 'img' | undefined;
}

/**
 * Computes icon styling based on size and color props
 */
function computeIconStyling(
  size: IconProps['size'],
  color: IconProps['color'],
  className: string | undefined
): { customSizeStyle: React.CSSProperties | undefined; combinedClassName: string } {
  const sizeClass = typeof size === 'number' ? '' : iconVariants({ size, color });
  const customSizeStyle =
    typeof size === 'number'
      ? { width: `${String(size)}px`, height: `${String(size)}px` }
      : undefined;

  const combinedClassName = cn(
    sizeClass,
    typeof size === 'number' && iconVariants({ color }),
    className
  );

  return { customSizeStyle, combinedClassName };
}

/**
 * Renders a registered icon by name
 */
function renderRegisteredIcon(
  name: string,
  commonSvgProps: CommonSvgProps,
  customSizeStyle: React.CSSProperties | undefined,
  restProps: Record<string, unknown>
): ReactElement | null {
  const IconComponent = iconRegistry[name as keyof typeof iconRegistry];
  // Runtime safety check for invalid icon names
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!IconComponent) {
    return null;
  }
  const iconElement = IconComponent() as ReactElement;
  const existingStyle = (iconElement.props as { style?: React.CSSProperties }).style;

  return cloneElement(iconElement, {
    ...commonSvgProps,
    style: { ...customSizeStyle, ...existingStyle },
    ...restProps,
  });
}

/**
 * Renders external SVG based on loading/error/content state
 */
function renderExternalSvg(
  commonSvgProps: CommonSvgProps,
  isLoading: boolean,
  error: string | null,
  svgContent: { innerContent: string; viewBox: string } | null,
  strokeWidth: number
): ReactElement {
  // Loading state
  if (isLoading) {
    return (
      <svg {...commonSvgProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" />
    );
  }

  // Error state
  if (error) {
    return (
      <svg
        {...commonSvgProps}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M18 6L6 18M6 6l12 12" strokeWidth={strokeWidth} />
      </svg>
    );
  }

  // Render fetched SVG content
  if (svgContent) {
    return (
      <svg
        {...commonSvgProps}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={svgContent.viewBox}
        fill="none"
        stroke="currentColor"
        dangerouslySetInnerHTML={{ __html: svgContent.innerContent }}
      />
    );
  }

  // Fallback empty state
  return (
    <svg {...commonSvgProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" />
  );
}

/**
 * Custom hook for fetching external SVG content
 */
function useSvgFetch(src: string | undefined): {
  svgContent: { innerContent: string; viewBox: string } | null;
  isLoading: boolean;
  error: string | null;
} {
  const [svgContent, setSvgContent] = useState<{
    innerContent: string;
    viewBox: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setSvgContent(null);
      return;
    }

    let cancelled = false;
    const srcUrl = src;

    async function loadSvg(): Promise<void> {
      setIsLoading(true);
      setError(null);

      try {
        const content = await fetchSvgContent(srcUrl);
        if (!cancelled) {
          setSvgContent(parseSvgContent(content));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load SVG');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadSvg();

    return () => {
      cancelled = true;
    };
  }, [src]);

  return { svgContent, isLoading, error };
}

/**
 * Icon component for displaying SVG icons.
 *
 * Supports two modes:
 * 1. **Registered icons** - Use the `name` prop to display icons from the registry
 * 2. **Custom/External SVGs** - Use the `src` prop to load SVGs from a URL or path
 *
 * @example
 * ```tsx
 * // Using registered icon
 * <Icon name="user" />
 *
 * // With size and color
 * <Icon name="settings" size="lg" color="primary" />
 *
 * // Using custom SVG from URL
 * <Icon src="/icons/custom-icon.svg" size="md" />
 *
 * // Using external CDN
 * <Icon src="https://cdn.example.com/icon.svg" color="success" />
 * ```
 */
const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 'md',
      color = 'current',
      strokeWidth = 2,
      className,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden = false,
      ...props
    },
    ref
  ) => {
    // Extract name and src from props (discriminated union)
    const name = 'name' in props ? props.name : undefined;
    const src = 'src' in props ? props.src : undefined;

    // Fetch external SVG content using custom hook
    const { svgContent, isLoading, error } = useSvgFetch(src);

    // Compute styling using helper function
    const { customSizeStyle, combinedClassName } = computeIconStyling(size, color, className);

    // Build common SVG props
    const ariaHiddenValue = ariaHidden || !ariaLabel ? ('true' as const) : undefined;
    const commonSvgProps: CommonSvgProps = {
      ref,
      className: combinedClassName,
      style: customSizeStyle,
      strokeWidth,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHiddenValue,
      role: ariaLabel ? ('img' as const) : undefined,
    };

    // Render registered icon by name
    if (name) {
      return renderRegisteredIcon(name, commonSvgProps, customSizeStyle, props);
    }

    // Render external SVG by src
    if (src) {
      return renderExternalSvg(commonSvgProps, isLoading, error, svgContent, strokeWidth);
    }

    // Should never reach here due to TypeScript discriminated union
    return null;
  }
);

Icon.displayName = 'Icon';

export { Icon };
