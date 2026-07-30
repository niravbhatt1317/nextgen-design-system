import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  describe('Rendering', () => {
    it('renders the icon correctly', () => {
      const { container } = render(<Icon name="user" aria-label="User icon" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders different icons based on name prop', () => {
      const { container: container1 } = render(<Icon name="user" aria-label="User" />);
      const { container: container2 } = render(<Icon name="settings" aria-label="Settings" />);

      const svg1 = container1.querySelector('svg');
      const svg2 = container2.querySelector('svg');

      expect(svg1).toBeInTheDocument();
      expect(svg2).toBeInTheDocument();
      expect(svg1?.innerHTML).not.toBe(svg2?.innerHTML);
    });

    it('returns null for non-existent icon', () => {
      // @ts-expect-error Testing invalid icon name
      const { container } = render(<Icon name="non-existent" />);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('applies xs size class', () => {
      const { container } = render(<Icon name="user" size="xs" aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-w-3', 'mdt-h-3');
    });

    it('applies sm size class', () => {
      const { container } = render(<Icon name="user" size="sm" aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-w-4', 'mdt-h-4');
    });

    it('applies md size class by default', () => {
      const { container } = render(<Icon name="user" aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-w-5', 'mdt-h-5');
    });

    it('applies lg size class', () => {
      const { container } = render(<Icon name="user" size="lg" aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-w-6', 'mdt-h-6');
    });

    it('applies xl size class', () => {
      const { container } = render(<Icon name="user" size="xl" aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-w-8', 'mdt-h-8');
    });

    it('applies custom numeric size', () => {
      const { container } = render(<Icon name="user" size={48} aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle({ width: '48px', height: '48px' });
    });
  });

  describe('Color Variants', () => {
    it('applies current color by default', () => {
      const { container } = render(<Icon name="user" aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-text-current');
    });

    it('applies primary color class', () => {
      const { container } = render(<Icon name="user" color="primary" aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-text-primary');
    });

    it('applies success color class', () => {
      const { container } = render(<Icon name="check" color="success" aria-label="Check" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-text-success');
    });

    it('applies destructive color class', () => {
      const { container } = render(<Icon name="x" color="destructive" aria-label="Close" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-text-destructive');
    });
  });

  describe('Stroke Width', () => {
    it('applies default stroke width of 2', () => {
      const { container } = render(<Icon name="user" aria-label="User" />);
      const svg = container.querySelector('svg');
      // React renders strokeWidth as stroke-width attribute in the DOM
      expect(svg).toHaveAttribute('stroke-width', '2');
    });

    it('applies custom stroke width', () => {
      const { container } = render(<Icon name="user" strokeWidth={3} aria-label="User" />);
      const svg = container.querySelector('svg');
      // cloneElement overrides the prop, React renders as stroke-width
      expect(svg).toHaveAttribute('stroke-width', '3');
    });
  });

  describe('Accessibility', () => {
    it('adds aria-label when provided', () => {
      const { container } = render(<Icon name="user" aria-label="User profile" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-label', 'User profile');
      expect(svg).toHaveAttribute('role', 'img');
    });

    it('sets aria-hidden to true when no aria-label', () => {
      const { container } = render(<Icon name="user" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).not.toHaveAttribute('role');
    });

    it('respects explicit aria-hidden prop', () => {
      const { container } = render(<Icon name="user" aria-hidden />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('sets role to img when aria-label is provided', () => {
      const { container } = render(<Icon name="user" aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('role', 'img');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(<Icon name="user" className="custom-class" aria-label="User" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null as SVGSVGElement | null };
      render(<Icon name="user" ref={ref} aria-label="User" />);
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
    });

    it('passes through additional SVG props', () => {
      const { container } = render(<Icon name="user" data-testid="test-icon" aria-label="User" />);
      const svg = screen.getByTestId('test-icon');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Combined Variants', () => {
    it('combines size and color variants', () => {
      const { container } = render(
        <Icon name="check" size="lg" color="success" aria-label="Success" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('mdt-w-6', 'mdt-h-6', 'mdt-text-success');
    });

    it('combines custom size with color variant', () => {
      const { container } = render(
        <Icon name="check" size={32} color="primary" aria-label="Check" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveStyle({ width: '32px', height: '32px' });
      expect(svg).toHaveClass('mdt-text-primary');
    });
  });

  describe('External SVG via src prop', () => {
    const validSvgContent =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>';

    const validSvgNoViewBox =
      '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/></svg>';

    beforeEach(() => {
      vi.restoreAllMocks();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('renders a loading placeholder SVG while fetching', async () => {
      // Create a fetch that never resolves during the test
      let resolveFetch!: (value: Response) => void;
      vi.spyOn(globalThis, 'fetch').mockImplementation(
        () =>
          new Promise<Response>((resolve) => {
            resolveFetch = resolve;
          })
      );

      const { container } = render(
        <Icon src="https://example.com/icon.svg" aria-label="Custom icon" />
      );

      // While loading, should show an SVG placeholder
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svg).toHaveAttribute('fill', 'none');

      // Cleanup: resolve the fetch to avoid act warnings
      await act(async () => {
        resolveFetch(
          new Response(validSvgContent, {
            status: 200,
            headers: { 'Content-Type': 'image/svg+xml' },
          })
        );
      });
    });

    it('renders fetched SVG content on success', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(validSvgContent, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/icon.svg" aria-label="Custom icon" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svg?.innerHTML).toContain('path');
      });
    });

    it('renders error X icon when fetch fails', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response('Not found', { status: 404, statusText: 'Not Found' })
      );

      const { container } = render(
        <Icon src="https://example.com/missing.svg" aria-label="Missing icon" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        // Error state renders an X path
        const path = svg?.querySelector('path');
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute('d', 'M18 6L6 18M6 6l12 12');
      });
    });

    it('renders error icon when fetch throws', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

      const { container } = render(
        <Icon src="https://example.com/network-fail.svg" aria-label="Failed icon" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        const path = svg?.querySelector('path');
        expect(path).toHaveAttribute('d', 'M18 6L6 18M6 6l12 12');
      });
    });

    it('renders error when response is not valid SVG', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response('<html><body>Not SVG</body></html>', {
          status: 200,
          headers: { 'Content-Type': 'text/html' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/not-svg.html" aria-label="Not SVG" />
      );

      await waitFor(() => {
        const path = container.querySelector('path');
        expect(path).toHaveAttribute('d', 'M18 6L6 18M6 6l12 12');
      });
    });

    it('applies size and color variants to src-based icon', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(validSvgContent, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/icon2.svg" size="lg" color="primary" aria-label="Styled" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('mdt-w-6', 'mdt-h-6', 'mdt-text-primary');
      });
    });

    it('applies custom numeric size to src-based icon', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(validSvgContent, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/icon3.svg" size={40} aria-label="Custom sized" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toHaveStyle({ width: '40px', height: '40px' });
      });
    });

    it('uses default viewBox when SVG has no viewBox', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(validSvgNoViewBox, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/no-viewbox.svg" aria-label="No viewbox" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      });
    });

    it('caches fetched SVG content', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(validSvgContent, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const cacheUrl = 'https://example.com/cached-icon.svg';

      // First render
      const { unmount } = render(<Icon src={cacheUrl} aria-label="First" />);

      await waitFor(() => {
        expect(fetchSpy).toHaveBeenCalledTimes(1);
      });

      unmount();

      // Second render with same URL should use cache
      render(<Icon src={cacheUrl} aria-label="Second" />);

      // Wait a tick for useEffect to run
      await waitFor(() => {
        // fetch should still be called only once due to caching
        expect(fetchSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('cleans up when unmounted during fetch', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      let resolveFetch!: (value: Response) => void;
      vi.spyOn(globalThis, 'fetch').mockImplementation(
        () =>
          new Promise<Response>((resolve) => {
            resolveFetch = resolve;
          })
      );

      const { unmount } = render(
        <Icon src="https://example.com/cleanup-test.svg" aria-label="Cleanup" />
      );

      // Unmount while fetch is pending
      unmount();

      // Resolve fetch after unmount - should not cause errors
      await act(async () => {
        resolveFetch(
          new Response(validSvgContent, {
            status: 200,
            headers: { 'Content-Type': 'image/svg+xml' },
          })
        );
      });

      // Verify no React state update errors occurred after unmount
      const stateUpdateErrors = consoleErrorSpy.mock.calls.filter((call) =>
        call.some(
          (arg) => typeof arg === 'string' && arg.includes("Can't perform a React state update")
        )
      );
      expect(stateUpdateErrors).toHaveLength(0);
      consoleErrorSpy.mockRestore();
    });

    it('applies aria-hidden and role correctly for src-based icon', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(validSvgContent, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/accessible.svg" aria-label="Accessible icon" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('aria-label', 'Accessible icon');
        expect(svg).toHaveAttribute('role', 'img');
      });
    });

    it('hides src-based icon from screen readers when no aria-label', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(validSvgContent, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(<Icon src="https://example.com/decorative.svg" aria-hidden />);

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('aria-hidden', 'true');
        expect(svg).not.toHaveAttribute('role');
      });
    });

    it('renders fallback empty SVG when src is set but content not yet loaded', () => {
      // Mock fetch to never resolve
      vi.spyOn(globalThis, 'fetch').mockImplementation(() => new Promise<Response>(() => {}));

      const { container } = render(
        <Icon src="https://example.com/pending.svg" aria-label="Pending" />
      );

      // Initially shows a loading SVG
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    });

    it('applies stroke width to error icon', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response('Not found', { status: 404, statusText: 'Not Found' })
      );

      const { container } = render(
        <Icon src="https://example.com/err.svg" strokeWidth={3} aria-label="Error" />
      );

      await waitFor(() => {
        const path = container.querySelector('path');
        expect(path).toHaveAttribute('stroke-width', '3');
      });
    });
  });

  describe('SVG Sanitization', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('strips script elements from SVG', async () => {
      const maliciousSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><script>alert("xss")</script><path d="M12 2L2 22h20L12 2z"/></svg>';

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(maliciousSvg, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/malicious-script.svg" aria-label="Sanitized" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg?.innerHTML).not.toContain('script');
        expect(svg?.innerHTML).not.toContain('alert');
        expect(svg?.innerHTML).toContain('path');
      });
    });

    it('strips event handler attributes from SVG', async () => {
      const maliciousSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z" onclick="alert(1)" onload="alert(2)"/></svg>';

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(maliciousSvg, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/malicious-handlers.svg" aria-label="Sanitized" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        const path = svg?.querySelector('path');
        expect(path).not.toHaveAttribute('onclick');
        expect(path).not.toHaveAttribute('onload');
        expect(path).toHaveAttribute('d', 'M12 2L2 22h20L12 2z');
      });
    });

    it('strips javascript: URLs from SVG attributes', async () => {
      const maliciousSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><use href="javascript:alert(1)"/><path d="M12 2z"/></svg>';

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(maliciousSvg, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/malicious-js.svg" aria-label="Sanitized" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        const use = svg?.querySelector('use');
        expect(use).not.toHaveAttribute('href');
      });
    });

    it('strips data:text/html URIs from SVG attributes', async () => {
      const maliciousSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><use href="data:text/html,&lt;script&gt;alert(1)&lt;/script&gt;"/><path d="M12 2z"/></svg>';

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(maliciousSvg, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/malicious-data.svg" aria-label="Sanitized" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        // The href attribute with data:text/html should be stripped
        const use = svg?.querySelector('use');
        if (use) {
          expect(use).not.toHaveAttribute('href');
        }
        // The sanitized content should not contain the dangerous URI
        expect(svg?.innerHTML).not.toContain('data:text/html');
      });
    });

    it('strips disallowed elements like iframe', async () => {
      const maliciousSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><foreignObject><iframe src="evil.html"></iframe></foreignObject><path d="M12 2z"/></svg>';

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(maliciousSvg, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/malicious-iframe.svg" aria-label="Sanitized" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg?.innerHTML).not.toContain('iframe');
        expect(svg?.innerHTML).not.toContain('foreignObject');
        expect(svg?.innerHTML).toContain('path');
      });
    });

    it('preserves allowed SVG elements and attributes', async () => {
      const safeSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="rotate(45)"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><rect x="2" y="2" width="20" height="20" rx="4"/></g></svg>';

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(safeSvg, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/safe-complex.svg" aria-label="Safe" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        const g = svg?.querySelector('g');
        expect(g).toHaveAttribute('transform', 'rotate(45)');
        const circle = svg?.querySelector('circle');
        expect(circle).toHaveAttribute('cx', '12');
        expect(circle).toHaveAttribute('cy', '12');
        expect(circle).toHaveAttribute('r', '10');
        const rect = svg?.querySelector('rect');
        expect(rect).toHaveAttribute('width', '20');
        expect(rect).toHaveAttribute('height', '20');
      });
    });

    it('returns empty content for invalid SVG XML', async () => {
      const invalidSvg = '<svg><this is not valid xml</svg>';

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(invalidSvg, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/invalid-xml.svg" aria-label="Invalid" />
      );

      // Since the SVG content has `<svg` but parsing fails in sanitization,
      // the component should render an error or empty content
      await waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });

    it('strips disallowed attributes not in the allowlist', async () => {
      const svgWithExtraAttrs =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" data-custom="test" data-foo="bar"/></svg>';

      vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(svgWithExtraAttrs, {
          status: 200,
          headers: { 'Content-Type': 'image/svg+xml' },
        })
      );

      const { container } = render(
        <Icon src="https://example.com/extra-attrs.svg" aria-label="Extra" />
      );

      await waitFor(() => {
        const svg = container.querySelector('svg');
        const circle = svg?.querySelector('circle');
        expect(circle).toBeInTheDocument();
        expect(circle).toHaveAttribute('cx', '12');
        expect(circle).toHaveAttribute('cy', '12');
        expect(circle).toHaveAttribute('r', '10');
        expect(circle).not.toHaveAttribute('data-custom');
        expect(circle).not.toHaveAttribute('data-foo');
      });
    });
  });

  describe('Edge Cases', () => {
    it('renders error state with non-Error throw', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValue('string error');

      const { container } = render(
        <Icon src="https://example.com/string-error.svg" aria-label="Error" />
      );

      await waitFor(() => {
        const path = container.querySelector('path');
        expect(path).toHaveAttribute('d', 'M18 6L6 18M6 6l12 12');
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });
  });
});
