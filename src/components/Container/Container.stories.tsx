import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A container component that provides consistent max-width and padding for page layouts. Centers content by default and supports responsive breakpoints.',
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Maximum width of the container',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Horizontal padding',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    paddingY: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Vertical padding',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    centered: {
      control: 'boolean',
      description: 'Center the container horizontally',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    as: {
      control: 'text',
      description: 'HTML element to render as',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    children: {
      control: false,
      description: 'Content to display inside the container',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default container with medium max-width and padding.
 */
export const Default: Story = {
  args: {
    children: (
      <div className="mdt-rounded-lg mdt-border-2 mdt-border-dashed mdt-border-border mdt-bg-muted mdt-p-8 mdt-text-center">
        <h2 className="mdt-text-2xl mdt-font-bold mdt-text-foreground">Container Content</h2>
        <p className="mdt-mt-2 mdt-text-muted-foreground">
          This content is wrapped in a Container component with default settings.
        </p>
      </div>
    ),
  },
};

/**
 * All max-width variants displayed together.
 */
export const MaxWidthVariants: Story = {
  render: () => (
    <div className="mdt-space-y-8 mdt-bg-accent mdt-p-8">
      <Container maxWidth="sm" padding="md">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          <strong>Small (sm)</strong> - 640px max-width
        </div>
      </Container>

      <Container maxWidth="md" padding="md">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          <strong>Medium (md)</strong> - 768px max-width
        </div>
      </Container>

      <Container maxWidth="lg" padding="md">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          <strong>Large (lg)</strong> - 1024px max-width
        </div>
      </Container>

      <Container maxWidth="xl" padding="md">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          <strong>Extra Large (xl)</strong> - 1280px max-width
        </div>
      </Container>

      <Container maxWidth="2xl" padding="md">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          <strong>2X Large (2xl)</strong> - 1536px max-width
        </div>
      </Container>

      <Container maxWidth="full" padding="md">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          <strong>Full Width</strong> - 100% max-width
        </div>
      </Container>
    </div>
  ),
};

/**
 * Different padding sizes.
 */
export const PaddingVariants: Story = {
  render: () => (
    <div className="mdt-space-y-4 mdt-bg-muted mdt-p-4">
      <Container maxWidth="lg" padding="none">
        <div className="mdt-rounded-lg mdt-bg-secondary mdt-p-4 mdt-text-secondary-foreground">
          No padding (padding="none")
        </div>
      </Container>

      <Container maxWidth="lg" padding="sm">
        <div className="mdt-rounded-lg mdt-bg-secondary mdt-p-4 mdt-text-secondary-foreground">
          Small padding (padding="sm")
        </div>
      </Container>

      <Container maxWidth="lg" padding="md">
        <div className="mdt-rounded-lg mdt-bg-secondary mdt-p-4 mdt-text-secondary-foreground">
          Medium padding (padding="md")
        </div>
      </Container>

      <Container maxWidth="lg" padding="lg">
        <div className="mdt-rounded-lg mdt-bg-secondary mdt-p-4 mdt-text-secondary-foreground">
          Large padding (padding="lg")
        </div>
      </Container>

      <Container maxWidth="lg" padding="xl">
        <div className="mdt-rounded-lg mdt-bg-secondary mdt-p-4 mdt-text-secondary-foreground">
          Extra large padding (padding="xl")
        </div>
      </Container>
    </div>
  ),
};

/**
 * Vertical padding examples.
 */
export const VerticalPadding: Story = {
  render: () => (
    <div className="mdt-space-y-4 mdt-bg-muted">
      <Container maxWidth="lg" paddingY="sm" className="mdt-bg-accent">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          Small vertical padding (paddingY="sm")
        </div>
      </Container>

      <Container maxWidth="lg" paddingY="md" className="mdt-bg-accent">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          Medium vertical padding (paddingY="md")
        </div>
      </Container>

      <Container maxWidth="lg" paddingY="lg" className="mdt-bg-accent">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          Large vertical padding (paddingY="lg")
        </div>
      </Container>

      <Container maxWidth="lg" paddingY="xl" className="mdt-bg-accent">
        <div className="mdt-rounded-lg mdt-bg-primary mdt-p-4 mdt-text-center mdt-text-primary-foreground">
          Extra large vertical padding (paddingY="xl")
        </div>
      </Container>
    </div>
  ),
};

/**
 * Container with semantic HTML element.
 */
export const SemanticHTML: Story = {
  render: () => (
    <div className="mdt-space-y-6">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Container as={'section' as any} maxWidth="lg" paddingY="lg" className="mdt-bg-muted">
        <h2 className="mdt-text-xl mdt-font-bold mdt-text-foreground">Section Container</h2>
        <p className="mdt-mt-2 mdt-text-muted-foreground">
          This container uses a semantic &lt;section&gt; element.
        </p>
      </Container>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Container as={'article' as any} maxWidth="md" padding="lg" className="mdt-bg-accent">
        <h2 className="mdt-text-xl mdt-font-bold mdt-text-foreground">Article Container</h2>
        <p className="mdt-mt-2 mdt-text-muted-foreground">
          This container uses a semantic &lt;article&gt; element.
        </p>
      </Container>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Container as={'main' as any} maxWidth="xl" padding="lg">
        <div className="mdt-rounded-lg mdt-border mdt-border-border mdt-p-6">
          <h2 className="mdt-text-xl mdt-font-bold mdt-text-foreground">Main Container</h2>
          <p className="mdt-mt-2 mdt-text-muted-foreground">
            This container uses a semantic &lt;main&gt; element.
          </p>
        </div>
      </Container>
    </div>
  ),
};

/**
 * Non-centered container aligned to left.
 */
export const NotCentered: Story = {
  args: {
    maxWidth: 'md',
    centered: false,
    children: (
      <div className="mdt-rounded-lg mdt-border-2 mdt-border-dashed mdt-border-border mdt-bg-muted mdt-p-8">
        <h2 className="mdt-text-xl mdt-font-bold mdt-text-foreground">Left-aligned Container</h2>
        <p className="mdt-mt-2 mdt-text-muted-foreground">
          This container is not centered (centered=false).
        </p>
      </div>
    ),
  },
};

/**
 * Nested containers example.
 */
export const NestedContainers: Story = {
  render: () => (
    <Container maxWidth="2xl" padding="lg" className="mdt-bg-accent">
      <div className="mdt-mb-4 mdt-text-center">
        <h2 className="mdt-text-2xl mdt-font-bold">Outer Container (2xl)</h2>
      </div>
      <Container maxWidth="lg" padding="md" className="mdt-bg-background">
        <div className="mdt-mb-4 mdt-text-center">
          <h3 className="mdt-text-xl mdt-font-semibold">Middle Container (lg)</h3>
        </div>
        <Container maxWidth="sm" padding="sm" className="mdt-bg-muted">
          <div className="mdt-text-center">
            <h4 className="mdt-text-lg mdt-font-medium">Inner Container (sm)</h4>
            <p className="mdt-mt-2 mdt-text-sm mdt-text-muted-foreground">
              Containers can be nested for complex layouts.
            </p>
          </div>
        </Container>
      </Container>
    </Container>
  ),
};

/**
 * Full-width image container.
 */
export const FullWidthImage: Story = {
  render: () => (
    <div className="mdt-space-y-8">
      <Container maxWidth="full" padding="none">
        <div className="mdt-flex mdt-h-64 mdt-items-center mdt-justify-center mdt-bg-gradient-to-r mdt-from-primary mdt-to-secondary mdt-text-primary-foreground">
          <h2 className="mdt-text-3xl mdt-font-bold">Full Width Hero Banner</h2>
        </div>
      </Container>

      <Container maxWidth="lg">
        <h3 className="mdt-text-2xl mdt-font-bold">Regular Content</h3>
        <p className="mdt-mt-4 mdt-text-muted-foreground">
          This content is in a regular container below the full-width banner.
        </p>
      </Container>
    </div>
  ),
};
