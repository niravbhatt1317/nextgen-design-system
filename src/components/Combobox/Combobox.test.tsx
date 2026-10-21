import { vi } from 'vitest';

import { useState } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox } from './Combobox';
import { ComboboxOption, type ComboboxProps } from './Combobox.types';

const mockOptions: ComboboxOption[] = [
  { value: 'react', label: 'React', description: 'A JavaScript library' },
  { value: 'vue', label: 'Vue', description: 'The Progressive Framework' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

describe('Combobox', () => {
  it('renders correctly', () => {
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    expect(screen.getByRole('button', { name: /framework|select/i })).toBeInTheDocument();
    expect(screen.getByText('Select framework...')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Combobox options={mockOptions} label="Framework" placeholder="Select framework..." />);

    expect(screen.getByText('Framework')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(
      <Combobox
        options={mockOptions}
        label="Framework"
        required
        placeholder="Select framework..."
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Combobox
        options={mockOptions}
        label="Framework"
        error="This field is required"
        placeholder="Select framework..."
      />
    );

    const errorElement = screen.getByRole('alert');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent('This field is required');
  });

  it('displays helper text', () => {
    render(
      <Combobox
        options={mockOptions}
        label="Framework"
        helperText="Choose your preferred framework"
        placeholder="Select framework..."
      />
    );

    expect(screen.getByText('Choose your preferred framework')).toBeInTheDocument();
  });

  it('opens popover on click', async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });
  });

  it('shows search input when opened', async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        searchPlaceholder="Search frameworks..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search frameworks...')).toBeInTheDocument();
    });
  });

  it('filters options based on search', async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        searchPlaceholder="Search..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'react');

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.queryByText('Vue')).not.toBeInTheDocument();
    });
  });

  it('selects an option', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={mockOptions}
        onValueChange={onValueChange}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    const reactOption = screen.getByText('React');
    await user.click(reactOption);

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('react');
    });
  });

  it('clears selection when clearable is true', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={mockOptions}
        defaultValue="react"
        onValueChange={onValueChange}
        clearable
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const clearButton = screen.getByLabelText('Clear selection');
    await user.click(clearButton);

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith(null);
    });
  });

  it('does not show clear button when clearable is false', () => {
    render(
      <Combobox
        options={mockOptions}
        defaultValue="react"
        clearable={false}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    expect(screen.queryByLabelText('Clear selection')).not.toBeInTheDocument();
  });

  it('respects disabled state', () => {
    render(
      <Combobox
        options={mockOptions}
        disabled
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toBeDisabled();
  });

  it('applies size classes', () => {
    const { rerender } = render(
      <Combobox
        options={mockOptions}
        size="sm"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    let trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveClass('mdt-h-8');

    rerender(
      <Combobox
        options={mockOptions}
        size="md"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );
    trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveClass('mdt-h-9');

    rerender(
      <Combobox
        options={mockOptions}
        size="lg"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );
    trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveClass('mdt-h-10');
  });

  it('applies variant classes', () => {
    const { rerender } = render(
      <Combobox
        options={mockOptions}
        variant="default"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    let trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveClass('mdt-border-input');

    rerender(
      <Combobox
        options={mockOptions}
        variant="outline"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );
    trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveClass('mdt-border-input');
  });

  it('applies error styling when error is provided', () => {
    render(
      <Combobox
        options={mockOptions}
        error="Error message"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveClass('mdt-border-destructive');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(
      <Combobox
        ref={ref}
        options={mockOptions}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    expect(ref).toHaveBeenCalled();
  });

  it('shows empty message when no options match search', async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        searchPlaceholder="Search..."
        emptyMessage="No results found"
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  it('calls onSearch when search input changes', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(
      <Combobox
        options={mockOptions}
        onSearch={onSearch}
        placeholder="Select framework..."
        searchPlaceholder="Search..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'react');

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalled();
    });
  });

  it('calls onOpenChange when popover state changes', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Combobox
        options={mockOptions}
        onOpenChange={onOpenChange}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  it('works in controlled mode', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Combobox
        options={mockOptions}
        value={null}
        onValueChange={onValueChange}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    const reactOption = screen.getByText('React');
    await user.click(reactOption);

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('react');
    });

    // Simulate parent component updating value
    rerender(
      <Combobox
        options={mockOptions}
        value="react"
        onValueChange={onValueChange}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    expect(screen.getByRole('button', { name: /framework|select/i })).toHaveTextContent('React');
  });

  it('displays option descriptions', async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    expect(screen.getByText('A JavaScript library')).toBeInTheDocument();
    expect(screen.getByText('The Progressive Framework')).toBeInTheDocument();
  });

  it('uses custom renderOption', async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        renderOption={({ option }) => <div>Custom: {option.label}</div>}
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    expect(screen.getByText('Custom: React')).toBeInTheDocument();
  });

  it('uses custom renderValue', () => {
    render(
      <Combobox
        options={mockOptions}
        defaultValue="react"
        placeholder="Select framework..."
        renderValue={(option) => <span>Selected: {option.label}</span>}
        aria-label="Framework selection"
      />
    );

    expect(screen.getByText('Selected: React')).toBeInTheDocument();
  });

  it('clears search when popover closes', async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        searchPlaceholder="Search..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'react');

    // Select an option to close popover
    const reactOption = screen.getByText('React');
    await user.click(reactOption);

    // Open again
    await user.click(trigger);

    await waitFor(() => {
      const newSearchInput = screen.getByPlaceholderText('Search...');
      expect(newSearchInput).toHaveValue('');
    });
  });

  it('uses custom renderTrigger', () => {
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        renderTrigger={({ placeholder }) => (
          <button data-testid="custom-trigger">{placeholder}</button>
        )}
        aria-label="Framework selection"
      />
    );

    expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('custom-trigger')).toHaveTextContent('Select framework...');
  });

  it('clears selection via keyboard Enter on clear button', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={mockOptions}
        defaultValue="react"
        onValueChange={onValueChange}
        clearable
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const clearButton = screen.getByLabelText('Clear selection');
    clearButton.focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith(null);
    });
  });

  it('ignores non-Enter/Space keydown on clear button', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={mockOptions}
        defaultValue="react"
        onValueChange={onValueChange}
        clearable
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const clearButton = screen.getByLabelText('Clear selection');
    clearButton.focus();
    await user.keyboard('a');

    // Should not have been called with null from keydown handler
    expect(onValueChange).not.toHaveBeenCalledWith(null);
  });

  it('hides helper text when error is present', () => {
    render(
      <Combobox
        options={mockOptions}
        label="Framework"
        error="Error message"
        helperText="This should be hidden"
        placeholder="Select framework..."
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Error message');
    expect(screen.queryByText('This should be hidden')).not.toBeInTheDocument();
  });

  it('sets aria-describedby to error id when error is present', () => {
    render(
      <Combobox
        options={mockOptions}
        id="my-combobox"
        error="Error"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveAttribute('aria-describedby', 'my-combobox-error');
  });

  it('sets aria-describedby to helper id when helperText is present', () => {
    render(
      <Combobox
        options={mockOptions}
        id="my-combobox"
        helperText="Helper text"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveAttribute('aria-describedby', 'my-combobox-helper');
  });

  it('passes name attribute to button', () => {
    render(
      <Combobox
        options={mockOptions}
        name="framework"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveAttribute('name', 'framework');
  });

  it('applies wrapperClassName', () => {
    const { container } = render(
      <Combobox
        options={mockOptions}
        wrapperClassName="my-wrapper-class"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    // The wrapper div is the first child of the container
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveClass('my-wrapper-class');
  });

  it('deselects option when clicking the same option again', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Combobox
        options={mockOptions}
        defaultValue="react"
        onValueChange={onValueChange}
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    // Click the already-selected option to deselect - use getAllByText since "React" appears in trigger and dropdown
    const reactOptions = screen.getAllByText('React');
    // The second one is inside the dropdown list
    await user.click(reactOptions[reactOptions.length - 1]);

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith(null);
    });
  });

  it('filters by description text', async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        searchPlaceholder="Search..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'progressive');

    await waitFor(() => {
      expect(screen.getByText('Vue')).toBeInTheDocument();
      expect(screen.queryByText('React')).not.toBeInTheDocument();
    });
  });

  it('filters by value text', async () => {
    const user = userEvent.setup();
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        searchPlaceholder="Search..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'angular');

    await waitFor(() => {
      expect(screen.getByText('Angular')).toBeInTheDocument();
      expect(screen.queryByText('React')).not.toBeInTheDocument();
    });
  });

  it('sets data-invalid when error is present', () => {
    render(
      <Combobox
        options={mockOptions}
        error="Error"
        placeholder="Select framework..."
        aria-label="Framework selection"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveAttribute('data-invalid', 'true');
  });

  it('passes custom aria-describedby when no error or helperText', () => {
    render(
      <Combobox
        options={mockOptions}
        placeholder="Select framework..."
        aria-label="Framework selection"
        aria-describedby="custom-desc"
      />
    );

    const trigger = screen.getByRole('button', { name: /framework|select/i });
    expect(trigger).toHaveAttribute('aria-describedby', 'custom-desc');
  });

  /* ONE SELECTION LOOK (Pranjal, 2026-10-21): the picked option on the pale ground with the tick on the RIGHT; the
   * highlighted one only grey, no tick. */
  it('puts the picked option on the pale ground with its tick on the right', async () => {
    const user = userEvent.setup();
    render(<Combobox options={mockOptions} value="vue" aria-label="Framework selection" />);
    await user.click(screen.getByRole('button', { name: /framework|select/i }));
    const picked = await screen.findByRole('option', { name: /Vue/ });
    const unpicked = screen.getByRole('option', { name: /Angular/ });
    expect(picked).toHaveClass(
      'mdt-bg-blue-10',
      'aria-selected:mdt-bg-blue-10',
      'hover:mdt-bg-blue-10'
    );
    expect(picked).not.toHaveClass('aria-selected:mdt-bg-neutral-10');
    expect(unpicked).toHaveClass('aria-selected:mdt-bg-neutral-10');
    expect(unpicked).not.toHaveClass('mdt-bg-blue-10');
    // the tick is the row's LAST child - after the label - shown only on the picked row
    expect(picked.lastElementChild?.tagName.toLowerCase()).toBe('svg');
    expect(picked.lastElementChild).toHaveClass('mdt-opacity-100');
    expect(unpicked.lastElementChild).toHaveClass('mdt-opacity-0');
  });

  it('hands a function emptyMessage what was typed in the list search box too', async () => {
    const user = userEvent.setup();
    const emptyMessage = vi.fn((q: string) => `Nothing matches "${q}"`);
    render(
      <Combobox
        options={mockOptions}
        emptyMessage={emptyMessage}
        aria-label="Framework selection"
      />
    );
    await user.click(screen.getByRole('button', { name: /framework|select/i }));
    await user.type(await screen.findByPlaceholderText('Search...'), 'zzz');
    expect(await screen.findByText('Nothing matches "zzz"')).toBeInTheDocument();
    expect(emptyMessage).toHaveBeenLastCalledWith('zzz');
  });

  /* THE TYPE-IN PICKER (Pranjal, 2026-10-21): the field itself is the search box, the list only shows results. */
  describe('search="field" (the type-in picker)', () => {
    const tags: ComboboxOption[] = [
      { value: 'env:prod', label: 'env:prod', description: '1,781 agents' },
      { value: 'env:staging', label: 'env:staging', description: '353 agents' },
      /* the value differs from the label, so a match on the value alone can be seen */
      { value: 'owner-team-platform', label: 'owner:platform', description: '245 agents' },
      { value: 'role:staging', label: 'role:staging', description: '353 agents' },
      { value: 'role:web', label: 'role:web', description: '358 agents' },
    ];

    const zones: ComboboxOption[] = [
      { value: 'Asia/Kolkata', label: 'Asia/Kolkata' },
      { value: 'Europe/London', label: 'Europe/London' },
      { value: 'America/New_York', label: 'America/New_York' },
    ];

    const withDisabled: ComboboxOption[] = [
      { value: 'alpha', label: 'Alpha' },
      { value: 'bravo', label: 'Bravo', disabled: true },
      { value: 'charlie', label: 'Charlie' },
    ];

    const TAG_LABEL = 'Which tag';
    const TAG_PLACEHOLDER = 'Type to find a tag';

    /** The field - an input with the combobox role, named by its label. */
    const field = (name = TAG_LABEL) => screen.getByRole('combobox', { name });
    /** The box round the field, where the pick is drawn at rest. */
    const box = (name = TAG_LABEL) => field(name).parentElement as HTMLElement;
    const optionNamed = (name: string) =>
      screen.getByRole('option', { name: new RegExp(`^${name}`) });

    /** Controlled the way a page holds it: the parent keeps the value in state. */
    function TagPicker({
      initial = null,
      onChange,
      ...rest
    }: Partial<ComboboxProps> & {
      initial?: string | null;
      onChange?: (value: string | null) => void;
    }) {
      const [value, setValue] = useState<string | null>(initial);
      return (
        <Combobox
          search="field"
          options={tags}
          label={TAG_LABEL}
          placeholder={TAG_PLACEHOLDER}
          value={value}
          onValueChange={(next) => {
            setValue(next);
            onChange?.(next);
          }}
          {...rest}
        />
      );
    }

    it('draws an option icon in the list and in the picked field', async () => {
      const user = userEvent.setup();
      const withIcons: ComboboxOption[] = [
        { value: 'in', label: 'India', icon: <span data-testid="flag-in" /> },
        { value: 'uk', label: 'United Kingdom', icon: <span data-testid="flag-uk" /> },
      ];
      render(<Combobox search="field" options={withIcons} label="Country" defaultValue="uk" />);

      expect(within(box('Country')).getByTestId('flag-uk')).toBeInTheDocument();
      await user.click(field('Country'));
      const list = await screen.findByRole('listbox');
      expect(within(list).getByTestId('flag-in')).toBeInTheDocument();
    });

    it('puts each group under its heading, and the keys skip the headings', async () => {
      const user = userEvent.setup();
      const grouped: ComboboxOption[] = [
        { value: 'Asia/Kolkata', label: 'Asia/Kolkata', group: 'Recommended' },
        { value: 'Europe/London', label: 'Europe/London', group: 'All time zones' },
        { value: 'America/New_York', label: 'America/New_York', group: 'All time zones' },
      ];
      render(<Combobox search="field" options={grouped} label="Time zone" />);

      await user.click(field('Time zone'));
      const list = await screen.findByRole('listbox');
      expect(within(list).getByText('Recommended')).toBeInTheDocument();
      expect(within(list).getAllByText('All time zones')).toHaveLength(1);
      expect(within(list).getAllByRole('option')).toHaveLength(3);

      await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
      expect(within(box('Time zone')).getByText('Europe/London')).toBeInTheDocument();
    });

    it('takes its name from aria-labelledby when there is no label', async () => {
      const user = userEvent.setup();
      render(
        <>
          <span id="zone-heading">Network zone</span>
          <Combobox search="field" options={zones} aria-labelledby="zone-heading" />
        </>
      );
      expect(screen.getByRole('combobox', { name: 'Network zone' })).toBeInTheDocument();
      await user.click(screen.getByRole('combobox', { name: 'Network zone' }));
      expect(await screen.findByRole('listbox', { name: 'Network zone' })).toBeInTheDocument();
    });

    it('opens on a click with every option, and has no second search box', async () => {
      const user = userEvent.setup();
      render(<TagPicker />);

      expect(field()).toHaveAttribute('placeholder', TAG_PLACEHOLDER);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

      await user.click(field());

      const list = await screen.findByRole('listbox');
      expect(within(list).getAllByRole('option')).toHaveLength(tags.length);
      expect(field()).toHaveAttribute('aria-expanded', 'true');
      // the field is the only place to type: no search box inside the list
      expect(screen.queryAllByRole('textbox')).toHaveLength(0);
      expect(screen.getAllByRole('combobox')).toHaveLength(1);
    });

    it('opens on ArrowDown with every option', async () => {
      const user = userEvent.setup();
      render(<TagPicker />);

      await user.tab();
      expect(field()).toHaveFocus();
      await user.keyboard('{ArrowDown}');

      const list = await screen.findByRole('listbox');
      expect(within(list).getAllByRole('option')).toHaveLength(tags.length);
    });

    it('narrows the list as you type - label, value or description, ignoring case - and lights the first match', async () => {
      const user = userEvent.setup();
      render(<TagPicker />);

      await user.type(field(), 'STAG');
      let shown = within(screen.getByRole('listbox')).getAllByRole('option');
      expect(shown.map((o) => o.textContent)).toEqual([
        'env:staging353 agents',
        'role:staging353 agents',
      ]);
      expect(shown[0]).toHaveAttribute('data-highlighted');
      expect(shown[1]).not.toHaveAttribute('data-highlighted');

      // the description
      await user.clear(field());
      await user.type(field(), '1,781');
      shown = within(screen.getByRole('listbox')).getAllByRole('option');
      expect(shown).toHaveLength(1);
      expect(shown[0]).toHaveTextContent('env:prod');

      // the value alone
      await user.clear(field());
      await user.type(field(), 'team-plat');
      shown = within(screen.getByRole('listbox')).getAllByRole('option');
      expect(shown).toHaveLength(1);
      expect(shown[0]).toHaveTextContent('owner:platform');
    });

    it('picks the lit option on Enter; the field then reads the label, a hairline and the description', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<TagPicker onChange={onChange} />);

      await user.type(field(), 'stag');
      await user.keyboard('{Enter}');

      expect(onChange).toHaveBeenCalledWith('env:staging');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      expect(field()).toHaveAttribute('aria-expanded', 'false');
      expect(field()).toHaveValue('');
      expect(field()).toHaveAttribute('placeholder', '');

      const label = within(box()).getByText('env:staging');
      const atRest = label.parentElement as HTMLElement;
      expect(atRest).toHaveAttribute('aria-hidden');
      expect(atRest.children).toHaveLength(3);
      expect(atRest.children[1]).toHaveClass('mdt-w-px'); // the hairline
      expect(atRest.children[2]).toHaveTextContent('353 agents');
    });

    it('reads a one-line option as its label alone', async () => {
      const user = userEvent.setup();
      render(
        <Combobox
          search="field"
          options={zones}
          label="Time zone"
          placeholder="Type to find a time zone"
          defaultValue={null}
        />
      );

      await user.click(field('Time zone'));
      await user.click(await screen.findByRole('option', { name: 'Europe/London' }));

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      const atRest = within(box('Time zone')).getByText('Europe/London')
        .parentElement as HTMLElement;
      expect(atRest.children).toHaveLength(1);
      expect(atRest).toHaveTextContent(/^Europe\/London$/);
      expect(box('Time zone').querySelector('.mdt-w-px')).toBeNull();
    });

    it('draws the pick with renderValue when given', () => {
      render(<TagPicker initial="role:web" renderValue={(option) => <b>Tag {option.label}</b>} />);
      expect(within(box()).getByText('Tag role:web')).toBeInTheDocument();
      expect(within(box()).queryByText('358 agents')).not.toBeInTheDocument();
    });

    it('reopens on the whole list, the pick marked with its tick and its name selected in the field', async () => {
      const user = userEvent.setup();
      render(<TagPicker />);

      await user.type(field(), 'stag');
      await user.keyboard('{Enter}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });

      await user.click(field());

      const list = await screen.findByRole('listbox');
      expect(within(list).getAllByRole('option')).toHaveLength(tags.length);
      const picked = optionNamed('env:staging');
      expect(picked).toHaveAttribute('aria-selected', 'true');
      expect(picked).toHaveClass('mdt-bg-blue-10');
      expect(picked.querySelector('svg')).not.toBeNull();
      for (const other of within(list)
        .getAllByRole('option')
        .filter((o) => o !== picked)) {
        expect(other).toHaveAttribute('aria-selected', 'false');
        expect(other.querySelector('svg')).toBeNull();
      }

      const input = field() as HTMLInputElement;
      expect(input).toHaveValue('env:staging');
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe('env:staging'.length);

      // the name is selected, so typing replaces it
      await user.keyboard('web');
      expect(input).toHaveValue('web');
      expect(within(screen.getByRole('listbox')).getAllByRole('option')).toHaveLength(1);
    });

    it('closes on Escape and keeps the last pick, without the Escape reaching the page', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const pageKeyDown = vi.fn();
      render(
        /* a stand-in for the drawer or dialog the field sits in */
        <div onKeyDown={pageKeyDown}>
          <TagPicker initial="env:prod" onChange={onChange} />
        </div>
      );

      await user.click(field());
      await user.keyboard('role');
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      expect(onChange).not.toHaveBeenCalled();
      expect(within(box()).getByText('env:prod')).toBeInTheDocument();
      expect(within(box()).getByText('1,781 agents')).toBeInTheDocument();
      expect(pageKeyDown).not.toHaveBeenCalledWith(expect.objectContaining({ key: 'Escape' }));
    });

    it('closes on Tab and on a press elsewhere, without picking', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <>
          <TagPicker initial="env:prod" onChange={onChange} />
          <button type="button">Elsewhere</button>
        </>
      );

      await user.click(field());
      await user.keyboard('web');
      await user.tab();
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });

      await user.click(field());
      expect(await screen.findByRole('listbox')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Elsewhere' }));
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });

      expect(onChange).not.toHaveBeenCalled();
      expect(within(box()).getByText('env:prod')).toBeInTheDocument();
    });

    it('skips a disabled option with the arrow keys, and will not pick it', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<TagPicker options={withDisabled} label="Call sign" onChange={onChange} />);

      await user.tab();
      await user.keyboard('{ArrowDown}');
      await screen.findByRole('listbox');
      expect(field('Call sign')).not.toHaveAttribute('aria-activedescendant');

      await user.keyboard('{ArrowDown}');
      expect(optionNamed('Alpha')).toHaveAttribute('data-highlighted');
      await user.keyboard('{ArrowDown}');
      expect(optionNamed('Charlie')).toHaveAttribute('data-highlighted');
      expect(optionNamed('Bravo')).not.toHaveAttribute('data-highlighted');
      await user.keyboard('{ArrowUp}');
      expect(optionNamed('Alpha')).toHaveAttribute('data-highlighted');

      expect(optionNamed('Bravo')).toHaveAttribute('aria-disabled', 'true');
      await user.click(optionNamed('Bravo'));
      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      // typing never lights a disabled match either
      await user.keyboard('a');
      expect(optionNamed('Alpha')).toHaveAttribute('data-highlighted');
      await user.clear(field('Call sign'));
      await user.type(field('Call sign'), 'bravo');
      expect(optionNamed('Bravo')).not.toHaveAttribute('data-highlighted');
      expect(field('Call sign')).not.toHaveAttribute('aria-activedescendant');
      await user.keyboard('{Enter}');
      expect(onChange).not.toHaveBeenCalled();
    });

    it('lights the row under the pointer', async () => {
      const user = userEvent.setup();
      render(<TagPicker />);
      await user.click(field());
      await user.hover(await screen.findByRole('option', { name: /^role:web/ }));
      expect(optionNamed('role:web')).toHaveAttribute('data-highlighted');
    });

    it('shows emptyMessage when nothing matches - a function is handed what was typed', async () => {
      const user = userEvent.setup();
      const emptyMessage = vi.fn((q: string) => `No tag matches "${q}"`);
      render(<TagPicker emptyMessage={emptyMessage} />);

      await user.type(field(), 'zzz');

      expect(await screen.findByText('No tag matches "zzz"')).toBeInTheDocument();
      expect(screen.queryAllByRole('option')).toHaveLength(0);
      expect(emptyMessage).toHaveBeenLastCalledWith('zzz');
    });

    it('shows a string emptyMessage as it is', async () => {
      const user = userEvent.setup();
      render(<TagPicker emptyMessage="No tags" />);
      await user.type(field(), 'zzz');
      expect(await screen.findByText('No tags')).toBeInTheDocument();
    });

    it('clearable: clears the pick at rest, and clears only the typed text while typing', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<TagPicker initial="env:prod" clearable onChange={onChange} />);

      await user.click(screen.getByRole('button', { name: 'Clear selection' }));

      expect(onChange).toHaveBeenCalledWith(null);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(within(box()).queryByText('env:prod')).not.toBeInTheDocument();
      expect(field()).toHaveAttribute('placeholder', TAG_PLACEHOLDER);
      expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument();

      await user.type(field(), 'zz');
      expect(screen.getByText('No results found.')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Clear what you typed' }));

      expect(field()).toHaveValue('');
      expect(field()).toHaveFocus();
      expect(within(screen.getByRole('listbox')).getAllByRole('option')).toHaveLength(tags.length);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('shows no clear button unless clearable', () => {
      render(<TagPicker initial="env:prod" />);
      expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument();
    });

    it('controlled: onValueChange gets the option value, and the field shows what the parent holds', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<TagPicker onChange={onChange} />);

      await user.click(field());
      await user.click(optionNamed('owner:platform'));

      expect(onChange).toHaveBeenCalledWith('owner-team-platform');
      expect(within(box()).getByText('owner:platform')).toBeInTheDocument();
    });

    it('controlled: a parent that keeps its value keeps the field on it', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Combobox
          search="field"
          options={tags}
          label={TAG_LABEL}
          value="env:prod"
          onValueChange={onValueChange}
        />
      );

      await user.click(field());
      await user.click(optionNamed('role:web'));

      expect(onValueChange).toHaveBeenCalledWith('role:web');
      expect(within(box()).getByText('env:prod')).toBeInTheDocument();
      expect(within(box()).queryByText('role:web')).not.toBeInTheDocument();
    });

    it('uncontrolled: starts on defaultValue and keeps its own pick', async () => {
      const user = userEvent.setup();
      render(<Combobox search="field" options={tags} label={TAG_LABEL} defaultValue="env:prod" />);
      expect(within(box()).getByText('env:prod')).toBeInTheDocument();

      await user.click(field());
      await user.click(optionNamed('role:web'));
      expect(within(box()).getByText('role:web')).toBeInTheDocument();
    });

    it('is an ARIA combobox: expanded, controls the listbox, points at the lit option', async () => {
      const user = userEvent.setup();
      render(<TagPicker id="tag-picker" />);

      const input = field();
      expect(input.tagName).toBe('INPUT');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('aria-controls', 'tag-picker-listbox');
      expect(input).not.toHaveAttribute('aria-activedescendant');

      await user.click(input);
      const list = await screen.findByRole('listbox', { name: TAG_LABEL });
      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(list).toHaveAttribute('id', input.getAttribute('aria-controls'));
      expect(input).not.toHaveAttribute('aria-activedescendant');

      await user.keyboard('web');
      const lit = optionNamed('role:web');
      expect(lit).toHaveAttribute('data-highlighted');
      expect(input).toHaveAttribute('aria-activedescendant', lit.id);

      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(input).toHaveAttribute('aria-expanded', 'false');
      });
      expect(input).not.toHaveAttribute('aria-activedescendant');
    });

    it('keeps the arrow keys on the pick when reopened from the keyboard', async () => {
      const user = userEvent.setup();
      render(<TagPicker initial="role:staging" />);

      await user.tab();
      await user.keyboard('{Enter}');
      await screen.findByRole('listbox');
      const input = field() as HTMLInputElement;
      expect(input).toHaveAttribute('aria-activedescendant', optionNamed('role:staging').id);
      expect(input).toHaveValue('role:staging');
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe('role:staging'.length);

      await user.keyboard('{ArrowDown}');
      expect(optionNamed('role:web')).toHaveAttribute('data-highlighted');
      await user.keyboard('{Enter}');
      expect(within(box()).getByText('role:web')).toBeInTheDocument();
    });

    it('writes the value into a hidden input when named', async () => {
      const user = userEvent.setup();
      const { container } = render(<TagPicker name="tag" />);
      const hidden = container.querySelector('input[type="hidden"][name="tag"]');
      expect(hidden).toHaveValue('');

      await user.click(field());
      await user.click(optionNamed('role:web'));
      expect(hidden).toHaveValue('role:web');
    });

    it('wires the label, required mark, helper text and error', () => {
      const { rerender } = render(<TagPicker required helperText="Pick one tag" />);
      expect(screen.getByText('*')).toBeInTheDocument();
      const required = screen.getByRole('combobox', { name: `${TAG_LABEL}*` });
      expect(required).toHaveAttribute('aria-required', 'true');
      expect(required).toHaveAccessibleDescription('Pick one tag');

      rerender(<TagPicker error="A tag is needed" helperText="Pick one tag" />);
      expect(screen.getByRole('alert')).toHaveTextContent('A tag is needed');
      expect(field()).toHaveAttribute('aria-invalid', 'true');
      expect(field()).toHaveAccessibleDescription('A tag is needed');
      expect(screen.queryByText('Pick one tag')).not.toBeInTheDocument();
    });

    it('does not open when disabled', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<TagPicker disabled onOpenChange={onOpenChange} />);
      expect(field()).toBeDisabled();
      await user.click(box());
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('reports opening, closing and what is typed', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      const onSearch = vi.fn();
      render(<TagPicker onOpenChange={onOpenChange} onSearch={onSearch} />);

      await user.click(field());
      expect(onOpenChange).toHaveBeenLastCalledWith(true);
      await user.keyboard('we');
      expect(onSearch).toHaveBeenLastCalledWith('we');
      await user.keyboard('{Escape}');
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });

    it('forwards the ref to the field input', () => {
      let node: HTMLElement | null = null;
      render(
        <Combobox
          search="field"
          options={tags}
          label={TAG_LABEL}
          ref={(el) => {
            node = el;
          }}
        />
      );
      expect(node).toBe(field());
    });

    it('leaves the default search="list" as it was: a button, and a search box inside the list', async () => {
      const user = userEvent.setup();
      render(<Combobox search="list" options={tags} aria-label="Tag" />);
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Tag' }));
      expect(await screen.findByPlaceholderText('Search...')).toBeInTheDocument();
    });
  });
});
