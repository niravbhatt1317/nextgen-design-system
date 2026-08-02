import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FEEDBACK_TONES } from '@/utils/feedback-tones';
import { Button } from '../Button';
import { Input } from '../Input';
import { Callout } from './Callout';

/**
 * A tinted block that says something about the content around it.
 *
 * **It is already there when you arrive.** That is the whole difference from
 * `Toast`, and it decides everything else: a callout does not animate in, does
 * not time out, is not announced as it appears, and is not dismissible unless
 * you ask. A toast interrupts you; a callout is part of the page.
 *
 * The six tones are `Toast`'s, from the same table in `@/utils/feedback-tones`,
 * so a seventh tone is one edit rather than two that drift.
 */
const meta: Meta<typeof Callout> = {
  title: 'Components/Callout',
  component: Callout,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    tone: 'neutral',
    children: 'Guest users lose access when their invite expires.',
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Six tones, and one calm ink through all of them.
 *
 * **Only the icon and the border carry the tone.** Six tones that differ by a
 * tint, an edge and a glyph read as one family; six tones of coloured text read
 * as six problems. The rule came from Org Mgmt's banner and `Toast` follows it
 * too.
 */
export const Tones: Story = {
  render: () => (
    <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-3">
      {FEEDBACK_TONES.map((tone) => (
        <Callout key={tone} tone={tone} title={tone}>
          The body text is the same colour here as in every other tone.
        </Callout>
      ))}
    </div>
  ),
};

/**
 * What it is actually for.
 *
 * Four jobs, all from the product screens the dialog work was read from:
 * the consequences of something irreversible, a summary of what is about to
 * happen, a limit worth knowing before filling a form in, and a group of
 * settings that belong together.
 *
 * **The last one has no icon and no tone.** `neutral` with `icon={false}` is a
 * plain inset panel — and that is a callout too. An icon there would label a
 * group that does not need labelling.
 */
export const WhatItIsFor: Story = {
  render: () => (
    <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-6">
      <Callout tone="danger" title="This cannot be undone">
        Deleting <strong>Acme Production</strong> removes:
        <ul className="mdt-mt-1.5 mdt-list-disc mdt-space-y-0.5 mdt-pl-4">
          <li>3 members, immediately</li>
          <li>12 files, permanently</li>
          <li>All API keys issued to this workspace</li>
        </ul>
      </Callout>

      <Callout tone="info" title="What happens next">
        We will email an invite to each address. Guests can accept for 7 days, and their access ends
        automatically 30 days after that.
      </Callout>

      <Callout tone="warning">
        You are close to your plan&apos;s limit — 48 of 50 seats are in use.
      </Callout>

      <Callout tone="neutral" icon={false} title="Access limits">
        {/*
          A row per setting: the name on the left, the control on the right,
          and no label on the control because the name already is one. A
          stacked label above every field turns four short settings into a
          form, which is not what a grouped block is for.
        */}
        <div className="mdt-mt-2 mdt-flex mdt-flex-col mdt-gap-2">
          {[
            { name: 'Maximum seats', value: '50' },
            { name: 'Session length', value: '8 hours' },
          ].map((setting) => (
            <div
              key={setting.name}
              className="mdt-flex mdt-items-center mdt-justify-between mdt-gap-4"
            >
              <span>{setting.name}</span>
              <Input
                aria-label={setting.name}
                defaultValue={setting.value}
                className="mdt-w-32 mdt-text-right"
              />
            </div>
          ))}
        </div>
      </Callout>
    </div>
  ),
};

/**
 * Controls sit **below** the reading, never beside it.
 *
 * A callout's action is what you do after reading it, and putting it on the
 * right invites pressing it first.
 *
 * **On the width:** a callout is `w-full` on purpose. It is a block that
 * annotates the thing above or below it, so it takes that thing's width — a
 * callout that shrank to fit its sentence would give a stack of them ragged
 * right edges, and would stop lining up with the form it belongs to. Put it in
 * a narrower column and it is narrower; this story is in one.
 */
export const WithActions: Story = {
  render: () => (
    <div className="mdt-flex mdt-max-w-md mdt-flex-col mdt-gap-3">
      <Callout
        tone="warning"
        title="Two members have not accepted their invite"
        actions={
          <>
            <Button size="sm">Resend invites</Button>
            <Button size="sm" variant="ghost">
              Review members
            </Button>
          </>
        }
      >
        Invites expire 7 days after they are sent.
      </Callout>
    </div>
  ),
};

/**
 * Dismissible only when you ask — the opposite of `Toast`.
 *
 * A toast always has a way out because it arrived uninvited. A close on
 * something that was always there implies it will come back.
 */
export const Dismissible: Story = {
  render: function DismissibleDemo() {
    const [shown, setShown] = useState(true);

    return (
      <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-3">
        {shown ? (
          <Callout
            tone="info"
            title="New: saved views"
            onDismiss={() => {
              setShown(false);
            }}
          >
            Save a filter and a column layout together, and share them with your team.
          </Callout>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              setShown(true);
            }}
          >
            Bring it back
          </Button>
        )}
      </div>
    );
  },
};

/**
 * `outline` keeps the edge and drops the fill.
 *
 * For a callout that has to sit on a surface which is already tinted — one
 * inside another, or one on a coloured panel — where a second tint reads as a
 * stain rather than as a block.
 */
export const OnATintedSurface: Story = {
  render: () => (
    <Callout tone="info" title="Before you continue" className="mdt-max-w-2xl">
      Two things need your attention.
      <div className="mdt-mt-3 mdt-flex mdt-flex-col mdt-gap-2">
        <Callout tone="warning" variant="outline" size="sm">
          Your billing address is incomplete.
        </Callout>
        <Callout tone="danger" variant="outline" size="sm">
          One payment method has expired.
        </Callout>
      </div>
    </Callout>
  ),
};

/**
 * On being read out.
 *
 * A callout is read in document order like any other content, so it carries no
 * live region. If one **appears** in response to something — a validation
 * summary after a failed submit — the caller adds `role="alert"`, because only
 * the caller knows it is new.
 *
 * The tone glyph is decorative, so a `danger` callout whose writing does not
 * say it is dangerous reads as neutral. Usually the writing carries it —
 * *"This cannot be undone"* needs no label. `toneLabel` is for when it does not.
 */
export const Announcing: Story = {
  render: function AnnouncingDemo() {
    const [failed, setFailed] = useState(false);

    return (
      <div className="mdt-flex mdt-max-w-2xl mdt-flex-col mdt-gap-3">
        <Button
          onClick={() => {
            setFailed((was) => !was);
          }}
        >
          {failed ? 'Reset' : 'Submit with errors'}
        </Button>

        {failed && (
          <Callout tone="danger" role="alert" title="Two fields need attention">
            An email address is missing, and the parent organisation has not been chosen.
          </Callout>
        )}

        <Callout tone="warning" toneLabel="Warning">
          48 of 50 seats are in use. — this one names its tone, because the sentence does not.
        </Callout>
      </div>
    );
  },
};
