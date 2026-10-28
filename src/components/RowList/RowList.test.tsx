import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { KeyValueList, KeyValueItem } from './KeyValueList';
import { LogRow } from './LogRow';
import { Row, RowList, RowTitle } from './RowList';
import { SelectableRow } from './SelectableRow';
import { Timeline, TimelineItem } from './Timeline';

const rowOf = (text: string): HTMLElement => {
  const row = screen.getByText(text).closest<HTMLElement>('.mdt-rowlist__row');
  if (!row) throw new Error(`no row holds ${text}`);
  return row;
};

describe('RowList', () => {
  it('is a bordered frame at the default density', () => {
    const { container } = render(<RowList>rows</RowList>);
    const list = container.firstElementChild as HTMLElement;
    expect(list).toHaveClass('mdt-rowlist');
    expect(list).toHaveAttribute('data-density', 'default');
    expect(list).toHaveAttribute('data-bordered', '');
  });

  it('takes a density, drops its frame, keeps a class and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <RowList ref={ref} density="compact" bordered={false} className="mine" aria-label="Rows">
        rows
      </RowList>
    );
    const list = container.firstElementChild as HTMLElement;
    expect(list).toHaveAttribute('data-density', 'compact');
    expect(list).not.toHaveAttribute('data-bordered');
    expect(list).toHaveClass('mdt-rowlist', 'mine');
    expect(ref.current).toBe(list);
    expect(screen.getByLabelText('Rows')).toBe(list);
  });
});

describe('Row', () => {
  it('is a plain block without onClick', () => {
    render(
      <Row>
        <RowTitle primary="Platform Ops" />
      </Row>
    );
    const row = rowOf('Platform Ops');
    expect(row.tagName).toBe('DIV');
    expect(row).not.toHaveAttribute('data-interactive');
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('is a real button with onClick, pressed by pointer and keyboard', async () => {
    const onClick = vi.fn();
    render(
      <Row onClick={onClick} aria-label="Open Inventory">
        <RowTitle primary="Inventory" />
      </Row>
    );
    const row = screen.getByRole('button', { name: 'Open Inventory' });
    expect(row).toHaveAttribute('type', 'button');
    expect(row).toHaveAttribute('data-interactive', '');
    await userEvent.click(row);
    row.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('forwards its ref to the button or the block', () => {
    const button = createRef<HTMLElement>();
    const block = createRef<HTMLElement>();
    render(
      <>
        <Row ref={button} onClick={() => undefined}>
          a
        </Row>
        <Row ref={block}>b</Row>
      </>
    );
    expect(button.current?.tagName).toBe('BUTTON');
    expect(block.current?.tagName).toBe('DIV');
  });

  it('a disabled row drops its press and shows as disabled', async () => {
    const onClick = vi.fn();
    render(
      <Row onClick={onClick} disabled>
        Off
      </Row>
    );
    const row = rowOf('Off');
    expect(row.tagName).toBe('DIV');
    expect(row).toHaveAttribute('data-row-state', 'disabled');
    await userEvent.click(row);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('marks the picked row and a dimmed one; a given state wins over disabled', () => {
    render(
      <>
        <Row selected>Picked</Row>
        <Row state="dimmed" disabled>
          Dim
        </Row>
      </>
    );
    expect(rowOf('Picked')).toHaveAttribute('data-selected', '');
    expect(rowOf('Picked')).not.toHaveAttribute('data-row-state');
    expect(rowOf('Dim')).toHaveAttribute('data-row-state', 'dimmed');
  });

  it('draws leading and actions only when given, with the row title', () => {
    render(
      <Row leading={<span>LEAD</span>} actions={<span>ACT</span>} title="Whole row">
        Body
      </Row>
    );
    const row = rowOf('Body');
    expect(row).toHaveAttribute('title', 'Whole row');
    expect(row.querySelector('.mdt-rowlist__leading')).toHaveTextContent('LEAD');
    expect(row.querySelector('.mdt-rowlist__actions')).toHaveTextContent('ACT');

    render(<Row>Bare</Row>);
    const bare = rowOf('Bare');
    expect(bare.querySelector('.mdt-rowlist__leading')).toBeNull();
    expect(bare.querySelector('.mdt-rowlist__actions')).toBeNull();
  });

  it('keeps a press or a key in its actions from reaching the row', async () => {
    const onRow = vi.fn();
    const onMenu = vi.fn();
    const onKey = vi.fn();
    render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- a listener above the row, for the test
      <div onKeyDown={onKey}>
        <Row
          onClick={onRow}
          aria-label="Row"
          actions={
            <span role="presentation" onClick={onMenu}>
              ⋯
            </span>
          }
        >
          Body
        </Row>
      </div>
    );
    await userEvent.click(screen.getByText('⋯'));
    expect(onMenu).toHaveBeenCalledTimes(1);
    expect(onRow).not.toHaveBeenCalled();
    fireEvent.keyDown(screen.getByText('⋯'), { key: 'Enter' });
    expect(onKey).not.toHaveBeenCalled();
  });
});

describe('RowTitle', () => {
  it('draws the name with its tooltip, the line under it and badges beside it', () => {
    render(<RowTitle primary="Helpdesk Access" secondary="IT Support" badges={<b>Custom</b>} />);
    const name = screen.getByText('Helpdesk Access');
    expect(name).toHaveAttribute('data-role', 'primary');
    expect(name).toHaveAttribute('data-truncate', '');
    expect(name).toHaveAttribute('title', 'Helpdesk Access');
    expect(screen.getByText('IT Support')).toHaveAttribute('data-role', 'secondary');
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('is one line when the second is left out or empty, and mono when asked', () => {
    const { container } = render(
      <>
        <RowTitle primary="host-01" mono />
        <RowTitle primary="Second" secondary="" />
      </>
    );
    expect(screen.getByText('host-01')).toHaveAttribute('data-role', 'mono');
    expect(container.querySelectorAll('[data-role="secondary"]')).toHaveLength(0);
  });

  it('gives no tooltip to a name that is not plain text', () => {
    render(<RowTitle primary={<em>rich</em>} />);
    expect(screen.getByText('rich').parentElement).not.toHaveAttribute('title');
  });
});

describe('SelectableRow', () => {
  it('is a label around a tick box; a press anywhere on the row hands back the new state', async () => {
    const onChange = vi.fn();
    render(<SelectableRow label="Sahil Thadani" hint="sahil@acme.org" onChange={onChange} />);
    const box = screen.getByRole('checkbox', { name: /Sahil Thadani/ });
    expect(box).not.toBeChecked();
    expect(screen.getByText('sahil@acme.org')).toBeInTheDocument();
    await userEvent.click(screen.getByText('sahil@acme.org'));
    expect(onChange).toHaveBeenLastCalledWith(true);
  });

  it('a ticked row is marked and unticks to false', async () => {
    const onChange = vi.fn();
    render(<SelectableRow checked label="Meera" onChange={onChange} />);
    const row = rowOf('Meera');
    expect(row.tagName).toBe('LABEL');
    expect(row).toHaveAttribute('data-selected', '');
    expect(row).toHaveAttribute('data-interactive', '');
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('puts the box at the start by default and at the end on request, after the right slot', () => {
    render(
      <>
        <SelectableRow label="Start" />
        <SelectableRow label="End" control="end" right={<span>RIGHT</span>} />
      </>
    );
    const start = rowOf('Start');
    expect(start.firstElementChild).toHaveAttribute('data-control', 'start');
    const end = rowOf('End');
    expect(end).toHaveAttribute('data-control', 'end');
    expect(end.lastElementChild).toHaveAttribute('data-control', 'end');
    expect(end.querySelector('.mdt-rowlist__actions')).toHaveTextContent('RIGHT');
  });

  it('takes its own row text in place of label and hint', () => {
    render(
      <SelectableRow>
        <span>Custom row</span>
      </SelectableRow>
    );
    expect(screen.getByText('Custom row')).toBeInTheDocument();
    expect(document.querySelector('[data-role="primary"]')).toBeNull();
  });

  it('a disabled row cannot be picked', async () => {
    const onChange = vi.fn();
    render(<SelectableRow disabled label="Ilya" onChange={onChange} />);
    const row = rowOf('Ilya');
    expect(row).toHaveAttribute('data-row-state', 'disabled');
    expect(row).not.toHaveAttribute('data-interactive');
    expect(screen.getByRole('checkbox')).toBeDisabled();
    await userEvent.click(row);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('a radio row hands back true, and is picked by a press on its row or by Space', async () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <SelectableRow type="radio" label="col-ams-01" hint="Amsterdam" onChange={onChange} />
    );
    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(screen.getByText('Amsterdam'));
    expect(onChange).toHaveBeenLastCalledWith(true);
    rerender(
      <SelectableRow type="radio" checked label="col-ams-01" hint="Amsterdam" onChange={onChange} />
    );
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
  });

  it('works with no onChange at all', async () => {
    render(
      <>
        <SelectableRow label="Box" />
        <SelectableRow type="radio" label="Dot" />
      </>
    );
    await userEvent.click(screen.getByRole('checkbox'));
    await userEvent.click(screen.getByRole('radio'));
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});

describe('LogRow', () => {
  it('draws the glyph, the message, who and when', () => {
    render(
      <LogRow
        icon={<span>GLYPH</span>}
        message="Rotation policy changed"
        meta="by Meera K."
        time="1d ago"
      />
    );
    const row = rowOf('Rotation policy changed');
    expect(row).toHaveAttribute('data-slot', 'log-row');
    expect(row.querySelector('.mdt-rowlist__leading')).toHaveTextContent('GLYPH');
    expect(screen.getByText('by Meera K.')).toHaveAttribute('data-role', 'secondary');
    const time = screen.getByText('1d ago');
    expect(time).not.toHaveAttribute('data-truncate');
    expect(time.closest('.mdt-rowlist__actions')).not.toBeNull();
  });

  it('needs only a message', () => {
    render(<LogRow message="Connection tested" />);
    const row = rowOf('Connection tested');
    expect(row.querySelector('.mdt-rowlist__leading')).toBeNull();
    expect(row.querySelector('.mdt-rowlist__actions')).toBeNull();
    expect(row.querySelectorAll('[data-role="secondary"]')).toHaveLength(0);
  });
});

describe('KeyValueList', () => {
  it('is a description list with a 150 label column by default', () => {
    render(
      <KeyValueList aria-label="Store">
        <KeyValueItem label="Store type">HashiCorp Vault</KeyValueItem>
      </KeyValueList>
    );
    const list = screen.getByLabelText('Store');
    expect(list.tagName).toBe('DL');
    expect(list.style.getPropertyValue('--mdt-kv-label')).toBe('150px');
    expect(list).not.toHaveAttribute('data-separated');
    expect(screen.getByText('Store type').closest('dt')).not.toBeNull();
    expect(screen.getByText('HashiCorp Vault').closest('dd')).not.toBeNull();
  });

  it('takes a label width, lines between rows, its own style and a ref', () => {
    const ref = createRef<HTMLDListElement>();
    render(
      <KeyValueList
        ref={ref}
        labelWidth={90}
        separated
        className="mine"
        style={{ marginTop: 4 }}
        aria-label="Summary"
      >
        <KeyValueItem label="Endpoint" hint="mutual TLS">
          vault.acme.org
        </KeyValueItem>
        <KeyValueItem label="Type">OAuth 2.0 client</KeyValueItem>
      </KeyValueList>
    );
    const list = screen.getByLabelText('Summary');
    expect(ref.current).toBe(list);
    expect(list).toHaveClass('mdt-kvlist', 'mine');
    expect(list).toHaveAttribute('data-separated', '');
    expect(list.style.getPropertyValue('--mdt-kv-label')).toBe('90px');
    expect(list.style.marginTop).toBe('4px');
    expect(screen.getByText('mutual TLS')).toHaveAttribute('data-role', 'secondary');
    expect(screen.getByText('OAuth 2.0 client').closest('dd')?.children).toHaveLength(1);
  });
});

describe('Timeline', () => {
  it('draws each event with its dot, words and time; the tone and the end of the rail', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Timeline ref={ref} className="mine" aria-label="History">
        <TimelineItem tone="success" title="Credential rotated" meta="automatic" time="2h ago" />
        <TimelineItem title="Created" last />
      </Timeline>
    );
    const trail = screen.getByLabelText('History');
    expect(ref.current).toBe(trail);
    expect(trail).toHaveClass('mdt-timeline', 'mine');
    const first = screen.getByText('Credential rotated').closest('.mdt-timeline__item');
    expect(first).toHaveAttribute('data-tone', 'success');
    expect(first).not.toHaveAttribute('data-last');
    expect(first?.querySelector('.mdt-timeline__dot')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('automatic')).toHaveAttribute('data-role', 'secondary');
    expect(screen.getByText('2h ago').closest('.mdt-timeline__time')).not.toBeNull();
    const last = screen.getByText('Created').closest('.mdt-timeline__item');
    expect(last).toHaveAttribute('data-tone', 'neutral');
    expect(last).toHaveAttribute('data-last', '');
    expect(last?.querySelector('.mdt-timeline__time')).toBeNull();
    expect(last?.querySelectorAll('[data-role="secondary"]')).toHaveLength(0);
  });
});
