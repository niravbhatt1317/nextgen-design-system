import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeWell } from './CodeWell';

const meta: Meta<typeof CodeWell> = {
  title: 'Components/CodeWell',
  component: CodeWell,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A read-only monospace surface for commands, tokens, generated config and log output.',
          '',
          '**Both Org Mgmt and Agent Fleet asked for exactly this in their own audits.** Org',
          'Mgmt has three separate wells and recommends extracting one CodeWell with copy and',
          'mask options. Agent Fleet has a light CodeBlock and a hand-rolled DarkTerminalWell,',
          'records three screens bypassing both, and recommends folding them into a single',
          'component with a surface option. This is that component.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'npm install @mtdt/nextgen-design-system' },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div className="mdt-flex mdt-w-[32rem] mdt-max-w-full mdt-flex-col mdt-gap-6">{children}</div>
);

export const Default: Story = {};

/** Light for values in a panel; dark for terminal output. */
export const Surfaces: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CodeWell label="Light — a value in a panel">https://motadata.example.com/scim/v2</CodeWell>
      <CodeWell surface="dark" label="Dark — terminal output">
        {`$ motadata agent install --token=***
Downloading agent 4.2.1...
Installed. Agent is now reporting.`}
      </CodeWell>
    </Stack>
  ),
};

export const Copyable: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CodeWell copyable label="Install command">
        npm install @mtdt/nextgen-design-system
      </CodeWell>
      <CodeWell copyable surface="dark" label="Agent bootstrap">
        curl -sSL https://motadata.example.com/install.sh | sh
      </CodeWell>
    </Stack>
  ),
};

/** For tokens and secrets. Copy still copies the real value while masked. */
export const Maskable: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CodeWell maskable copyable label="SCIM bearer token">
        scim_live_8f2a91c4e7b6d503a1
      </CodeWell>
      <CodeWell maskable copyable surface="dark" label="Agent token">
        agt_prod_5c1e77b2fa9d40e8
      </CodeWell>
    </Stack>
  ),
};

const LONG_VALUE =
  'jdbc:postgresql://prod-db-01.internal.example.com:5432/motadata?ssl=true&sslmode=verify-full&ApplicationName=motadata-agent';

/**
 * `truncate` holds the well to one line and cuts the value with an ellipsis.
 *
 * **Hover it, or tab to it** — the whole value arrives in a tooltip. Copy still
 * takes all of it, so nothing is lost by cutting it on screen.
 *
 * The tooltip is not blanket behaviour: a value that already fits gets none,
 * because a tooltip repeating what you can already read is just noise. The
 * third well below proves it.
 */
export const LongContent: Story = {
  name: 'Long content',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CodeWell truncate copyable label="Connection string">
        {LONG_VALUE}
      </CodeWell>
      <CodeWell truncate copyable surface="dark" label="Signed download URL">
        https://artifacts.motadata.com/agent/5.7.2/motadata-agent-linux-amd64.tar.gz?X-Amz-Expires=3600&X-Amz-Signature=8f3a9c1e77b04d2a
      </CodeWell>
      <CodeWell truncate copyable label="Short enough to fit — no tooltip">
        systemctl restart motadata-agent
      </CodeWell>
    </Stack>
  ),
};

/**
 * Masking and truncating together. The tooltip stays shut while the value is
 * hidden — revealing a secret on hover would defeat the point of masking it.
 *
 * The well is the same height masked and revealed, so nothing jumps.
 */
export const TruncatedSecret: Story = {
  name: 'Truncate + mask',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack>
      <CodeWell
        truncate
        maskable
        copyable
        label="Agent bootstrap token"
        value="mdt_live_9f2c41ab7de84c05b6139a72e0cf88d143aa50e7c19b6f2d8e4a7031bc95df6a"
      >
        mdt_live_9f2c41ab7de84c05b6139a72e0cf88d143aa50e7c19b6f2d8e4a7031bc95df6a
      </CodeWell>
    </Stack>
  ),
};
