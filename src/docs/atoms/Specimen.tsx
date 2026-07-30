import { useEffect, useRef } from 'react';
import data from './atoms-data.json';

type SystemKey = keyof typeof data.css;

/**
 * Renders one team's specimen using that team's own stylesheet.
 *
 * Each specimen goes into a shadow root with its system's CSS attached, which
 * is how the source comparison tool does it. Without that isolation the four
 * systems' styles would fight each other and this design system's own styles
 * would leak in, so nothing on the page would be a fair likeness.
 */
export const Specimen = ({ system, html }: { system: SystemKey; html: string }) => {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = host.current;
    if (!node) return;

    const shadow = node.shadowRoot ?? node.attachShadow({ mode: 'open' });

    const reset = new CSSStyleSheet();
    reset.replaceSync(data.reset);
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(data.css[system]);
    shadow.adoptedStyleSheets = [reset, sheet];
    shadow.innerHTML = html;
  }, [system, html]);

  return <div ref={host} />;
};

/**
 * Some specimens are an empty container that the original product page filled
 * with JavaScript. Extracted on their own they render blank, so say so rather
 * than showing an empty box and letting it read as "this team has nothing".
 */
export const isEmptyCanvas = (html: string): boolean =>
  /<div class="canvas" id="[^"]+"><\/div>/.test(html);
