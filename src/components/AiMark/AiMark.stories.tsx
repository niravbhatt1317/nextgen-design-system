import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Callout } from '../Callout';
import { Icon } from '../Icon';
import { AiMark } from './AiMark';

/**
 * The gradient mark that means "this is AI".
 *
 * **A mark, not an icon.** Every `<Icon>` in this library is one stroke in
 * `currentColor`, which is what lets the system size, tint and audit all 1209
 * of them the same way. This is three colours sweeping across itself and
 * answers to none of that — tinting it would destroy the thing that makes it
 * recognisable. Lucide is the only *icon* source; a brand mark is the same
 * exception the seventeen kept logos are.
 *
 * The gradient is a token — `--mdt-ai-gradient-from`, `-via`, `-to` and
 * `-via-position`. Both marks the design owner supplied carried the same ramp,
 * which is what made it a pattern worth saving rather than two one-off fills.
 */
const meta: Meta<typeof AiMark> = {
  title: 'Components/AiMark',
  component: AiMark,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const Cell = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mdt-flex mdt-w-28 mdt-flex-col mdt-items-center mdt-gap-2">
    <div className="mdt-flex mdt-h-10 mdt-items-center">{children}</div>
    <span className="mdt-text-xs mdt-text-muted-foreground">{label}</span>
  </div>
);

/**
 * Two marks, each filled or drawn as a line.
 *
 * `spark` is the general one. `trio` is three stars at a third of the strength
 * — a texture rather than a glyph.
 *
 * The line versions stroke the same outline at **1px on the 16px box**, not
 * Lucide's 2. Lucide draws on a 24px box, so 2 there is 1.33 here, and these
 * stars have concave curves that close up before a Lucide icon's would — at
 * 1.33 the small star in `spark` filled in.
 */
export const Marks: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-col mdt-gap-8">
      <div className="mdt-flex mdt-gap-4">
        <Cell label="spark · solid">
          <AiMark size="xl" />
        </Cell>
        <Cell label="spark · line">
          <AiMark size="xl" appearance="line" />
        </Cell>
        <Cell label="trio · solid">
          <AiMark size="xl" variant="trio" />
        </Cell>
        <Cell label="trio · line">
          <AiMark size="xl" variant="trio" appearance="line" />
        </Cell>
      </div>

      <div className="mdt-flex mdt-items-end mdt-gap-4">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Cell key={size} label={size}>
            <AiMark size={size} />
          </Cell>
        ))}
      </div>
    </div>
  ),
};

/**
 * Where it goes.
 *
 * Beside a Lucide icon, `line` is the one that matches — a solid mark in a row
 * of outlines reads as a different weight of thing. On its own, or as the tone
 * glyph of an `ai` callout, `solid` carries better at 16px.
 */
export const InUse: Story = {
  render: () => (
    <div className="mdt-flex mdt-w-[30rem] mdt-flex-col mdt-gap-6">
      <Callout tone="ai" title="Summarised by AI" icon={<AiMark size="sm" />}>
        Three of the twelve tickets in this view mention the same failing job.
      </Callout>

      <div className="mdt-flex mdt-flex-wrap mdt-items-center mdt-gap-3">
        <Button variant="ai" leftIcon={<AiMark size="sm" />}>
          Ask AI
        </Button>
        <Badge tone="neutral" shape="pill">
          <AiMark size="xs" className="mdt-mr-1" />
          Generated
        </Badge>
      </div>

      <div className="mdt-flex mdt-flex-col mdt-gap-2 mdt-rounded-md mdt-border mdt-border-border mdt-p-3">
        <p className="mdt-text-xs mdt-text-muted-foreground">
          In a row of Lucide icons — the line mark matches the weight
        </p>
        <div className="mdt-flex mdt-items-center mdt-gap-4">
          <Icon name="search" size="sm" />
          <Icon name="filter" size="sm" />
          <AiMark size="sm" appearance="line" />
          <Icon name="settings" size="sm" />
        </div>
      </div>
    </div>
  ),
};
