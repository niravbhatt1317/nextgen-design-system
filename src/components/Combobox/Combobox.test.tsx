import { vi } from 'vitest';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox } from './Combobox';
import { ComboboxOption } from './Combobox.types';

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
});
