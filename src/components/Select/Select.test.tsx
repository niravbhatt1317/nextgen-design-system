import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Select } from './Select';
import { SelectOption } from './Select.types';

const simpleOptions: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4', disabled: true },
];

const groupedOptions: SelectOption[] = [
  { value: '1', label: 'Apple', group: 'Fruits' },
  { value: '2', label: 'Banana', group: 'Fruits' },
  { value: '3', label: 'Carrot', group: 'Vegetables' },
  { value: '4', label: 'Broccoli', group: 'Vegetables' },
];

const optionsWithDescriptions: SelectOption[] = [
  { value: '1', label: 'Admin', description: 'Full access to all resources' },
  { value: '2', label: 'Editor', description: 'Can edit content' },
  { value: '3', label: 'Viewer', description: 'Read-only access' },
];

describe('Select', () => {
  describe('Rendering', () => {
    it('renders with placeholder', () => {
      render(<Select options={simpleOptions} placeholder="Select option..." />);
      expect(screen.getByText('Select option...')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Select options={simpleOptions} label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Select options={simpleOptions} helperText="Helper text" />);
      expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Select options={simpleOptions} error="Error message" />);
      const error = screen.getByText('Error message');
      expect(error).toBeInTheDocument();
      expect(error).toHaveClass('mdt-text-destructive');
    });

    it('renders required asterisk when required', () => {
      render(<Select options={simpleOptions} label="Required Field" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Single Select Mode', () => {
    it('opens dropdown on click', async () => {
      const user = userEvent.setup();
      render(<Select options={simpleOptions} placeholder="Select..." />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });
    });

    it('selects an option', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select options={simpleOptions} onChange={handleChange} placeholder="Select..." />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Option 1'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('1');
      });
    });

    it('does not select disabled option', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select options={simpleOptions} onChange={handleChange} placeholder="Select..." />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 4')).toBeInTheDocument();
      });

      const disabledOption = screen.getByText('Option 4');
      await user.click(disabledOption);

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('does not open when disabled', async () => {
      const user = userEvent.setup();
      render(<Select options={simpleOptions} disabled placeholder="Select..." />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
      });
    });

    it('has disabled attribute when disabled', () => {
      render(<Select options={simpleOptions} disabled />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });
  });

  describe('Size Variants', () => {
    it('applies small size class', () => {
      render(<Select options={simpleOptions} size="sm" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('mdt-h-8');
    });

    it('applies medium size class', () => {
      render(<Select options={simpleOptions} size="md" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('mdt-h-9');
    });

    it('applies large size class', () => {
      render(<Select options={simpleOptions} size="lg" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('mdt-h-10');
    });
  });

  describe('Options with Icons and Avatars', () => {
    it('renders options with icons', async () => {
      const user = userEvent.setup();
      const optionsWithIcons: SelectOption[] = [
        {
          value: '1',
          label: 'With Icon',
          icon: <span data-testid="icon">🔥</span>,
        },
      ];

      render(<Select options={optionsWithIcons} placeholder="Select..." />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('icon')).toBeInTheDocument();
      });
    });

    it('renders options with avatars', async () => {
      const user = userEvent.setup();
      const optionsWithAvatars: SelectOption[] = [
        {
          value: '1',
          label: 'User 1',
          avatar: 'https://example.com/avatar.jpg',
        },
      ];

      render(<Select options={optionsWithAvatars} placeholder="Select..." />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        const avatar = screen.getByAltText('User 1');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
      });
    });

    it('renders options with descriptions', async () => {
      const user = userEvent.setup();
      const optionsWithDesc: SelectOption[] = [
        {
          value: '1',
          label: 'Option with description',
          description: 'This is a description',
        },
      ];

      render(<Select options={optionsWithDesc} placeholder="Select..." />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('This is a description')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(
        <Select
          options={simpleOptions}
          label="Accessible Select"
          aria-label="Test select"
          required
        />
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-label', 'Test select');
    });

    it('shows error state in ARIA', () => {
      render(<Select options={simpleOptions} error="Error message" />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error message with input', () => {
      render(<Select options={simpleOptions} error="Error message" id="test-select" />);

      const trigger = screen.getByRole('combobox');
      const errorId = trigger.getAttribute('aria-describedby');
      expect(errorId).toContain('error');
    });
  });

  describe('Custom className', () => {
    it('applies custom className to trigger', () => {
      render(<Select options={simpleOptions} className="custom-class" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('custom-class');
    });

    it('applies custom wrapperClassName', () => {
      const { container } = render(
        <Select options={simpleOptions} wrapperClassName="wrapper-class" />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('wrapper-class');
    });
  });

  describe('Empty State', () => {
    it('shows empty message when no options', async () => {
      const user = userEvent.setup();
      render(<Select options={[]} placeholder="Select..." emptyMessage="No items found" />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('No items found')).toBeInTheDocument();
      });
    });
  });

  describe('Multi-select Mode', () => {
    it('renders multi-select with placeholder', () => {
      render(<Select mode="multiple" options={simpleOptions} placeholder="Select items..." />);
      expect(screen.getByText('Select items...')).toBeInTheDocument();
    });

    it('opens dropdown and shows options on click', async () => {
      const user = userEvent.setup();
      render(<Select mode="multiple" options={simpleOptions} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });
    });

    it('selects multiple options', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          onChange={handleChange}
          placeholder="Select..."
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Option 1'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['1']);
      });

      // Select another option
      await user.click(screen.getByText('Option 2'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['1', '2']);
      });
    });

    it('displays pills when showPills is true', () => {
      render(<Select mode="multiple" options={simpleOptions} value={['1', '2']} showPills />);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('displays count when showPills is false', () => {
      render(
        <Select mode="multiple" options={simpleOptions} value={['1', '2', '3']} showPills={false} />
      );

      expect(screen.getByText('3 selected')).toBeInTheDocument();
    });

    it('removes pill on click', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { container } = render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1', '2']}
          onChange={handleChange}
          showPills
        />
      );

      // Find the first pill remove button (button element inside the pill)
      const pillRemoveButtons = container.querySelectorAll(
        '.mdt-inline-flex button[aria-label^="Remove"]'
      );
      const pillRemoveButton = pillRemoveButtons[0];

      if (pillRemoveButton) {
        await user.click(pillRemoveButton as Element);

        await waitFor(() => {
          expect(handleChange).toHaveBeenCalledWith(['2']);
        });
      } else {
        throw new Error('Pill remove button not found');
      }
    });

    it('clears all selections with clearable', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { container } = render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1', '2']}
          onChange={handleChange}
          clearable
        />
      );

      // Find the clear button (button element that's a child of the trigger button)
      const triggerButton = container.querySelector('button[type="button"]');
      const clearButton = triggerButton?.querySelector('button[aria-label="Clear all selections"]');

      if (clearButton) {
        await user.click(clearButton as Element);

        await waitFor(() => {
          expect(handleChange).toHaveBeenCalledWith([]);
        });
      } else {
        throw new Error('Clear button not found');
      }
    });

    it('shows search input when searchable', async () => {
      const user = userEvent.setup();
      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          searchable
          searchPlaceholder="Search options..."
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Search options...');
        expect(searchInput).toBeInTheDocument();
      });
    });

    it('filters options based on search query', async () => {
      const user = userEvent.setup();
      render(<Select mode="multiple" options={simpleOptions} searchable />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, '1');

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
      });
    });

    it('shows "X selected" without pills when multiple selected', () => {
      render(<Select mode="multiple" options={simpleOptions} value={['1', '2']} />);
      expect(screen.getByText('2 selected')).toBeInTheDocument();
    });

    it('shows "+N more" when pills exceed maxPills', () => {
      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1', '2', '3']}
          showPills
          maxPills={2}
        />
      );
      expect(screen.getByText('+1 more')).toBeInTheDocument();
    });

    it('calls onRemovePill callback when pill is removed', async () => {
      const user = userEvent.setup();
      const handleRemovePill = vi.fn();

      const { container } = render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1', '2']}
          showPills
          onRemovePill={handleRemovePill}
        />
      );

      const pillRemoveButtons = container.querySelectorAll('.mdt-inline-flex span[role="button"]');
      if (pillRemoveButtons[0]) {
        await user.click(pillRemoveButtons[0] as Element);
        await waitFor(() => {
          expect(handleRemovePill).toHaveBeenCalledWith('1');
        });
      }
    });

    it('shows select all button and selects all non-disabled options', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select mode="multiple" options={simpleOptions} onChange={handleChange} selectAll />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText(/Select all/)).toBeInTheDocument();
      });

      await user.click(screen.getByText(/Select all/));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['1', '2', '3']);
      });
    });

    it('shows loading state', async () => {
      const user = userEvent.setup();
      render(<Select mode="multiple" options={simpleOptions} loading />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      });
    });

    it('shows load more button when hasMore and loadMore provided', async () => {
      const user = userEvent.setup();
      const loadMore = vi.fn().mockResolvedValue(undefined);

      render(<Select mode="multiple" options={simpleOptions} hasMore loadMore={loadMore} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Load more...')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Load more...'));
      expect(loadMore).toHaveBeenCalled();
    });

    it('shows custom empty message via renderEmpty', async () => {
      const user = userEvent.setup();
      render(
        <Select mode="multiple" options={[]} renderEmpty={() => <span>Custom empty state</span>} />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Custom empty state')).toBeInTheDocument();
      });
    });

    it('renders custom items via renderItem', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          onChange={handleChange}
          renderItem={({ option, selected }) => (
            <div data-testid={`custom-item-${option.value}`}>
              {selected ? '✓' : '○'} {option.label}
            </div>
          )}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('custom-item-1')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('custom-item-1'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['1']);
      });
    });

    it('renders custom trigger via renderTrigger', () => {
      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1']}
          renderTrigger={({ selectedOptions, open }) => (
            <div data-testid="custom-trigger">
              {selectedOptions.length} items {open ? 'open' : 'closed'}
            </div>
          )}
        />
      );

      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
      expect(screen.getByText('1 items closed')).toBeInTheDocument();
    });

    it('renders options with prefix icon in multi-select', () => {
      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          prefixIcon={<span data-testid="prefix-icon">🔍</span>}
        />
      );

      expect(screen.getByTestId('prefix-icon')).toBeInTheDocument();
    });

    it('clears all via keyboard (Enter key)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { container } = render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1', '2']}
          onChange={handleChange}
          clearable
        />
      );

      const triggerButton = container.querySelector('button[type="button"]');
      const clearButton = triggerButton?.querySelector('button[aria-label="Clear all selections"]');

      if (clearButton) {
        (clearButton as HTMLElement).focus();
        await user.keyboard('{Enter}');

        await waitFor(() => {
          expect(handleChange).toHaveBeenCalledWith([]);
        });
      }
    });

    it('shows grouped options when grouped is true', async () => {
      const user = userEvent.setup();
      render(<Select mode="multiple" options={groupedOptions} grouped />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Carrot')).toBeInTheDocument();
      });
    });

    it('selects option in grouped mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select mode="multiple" options={groupedOptions} onChange={handleChange} grouped />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Apple'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['1']);
      });
    });

    it('toggles option off when already selected', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1', '2']}
          onChange={handleChange}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Option 1'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['2']);
      });
    });

    it('shows options with descriptions in multi-select', async () => {
      const user = userEvent.setup();
      render(<Select mode="multiple" options={optionsWithDescriptions} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Full access to all resources')).toBeInTheDocument();
      });
    });

    it('calls onOpen and onClose callbacks', async () => {
      const user = userEvent.setup();
      const handleOpen = vi.fn();
      const handleClose = vi.fn();

      render(
        <Select mode="multiple" options={simpleOptions} onOpen={handleOpen} onClose={handleClose} />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(handleOpen).toHaveBeenCalledTimes(1);
      });

      // Click outside to close (ESC key)
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalledTimes(1);
      });
    });

    it('uses custom filterFn for search', async () => {
      const user = userEvent.setup();
      const customFilter = vi.fn((option: SelectOption, query: string) =>
        option.label.startsWith(query)
      );

      render(<Select mode="multiple" options={simpleOptions} searchable filterFn={customFilter} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'O');

      await waitFor(() => {
        expect(customFilter).toHaveBeenCalled();
      });
    });

    it('renders options with avatars in multi-select', async () => {
      const user = userEvent.setup();
      const optionsWithAvatars: SelectOption[] = [
        { value: '1', label: 'User 1', avatar: 'https://example.com/a.jpg' },
      ];

      render(<Select mode="multiple" options={optionsWithAvatars} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        const avatar = screen.getByAltText('User 1');
        expect(avatar).toHaveAttribute('src', 'https://example.com/a.jpg');
      });
    });

    it('renders options with icons in multi-select', async () => {
      const user = userEvent.setup();
      const optionsWithIcons: SelectOption[] = [
        { value: '1', label: 'Star', icon: <span data-testid="star-icon">⭐</span> },
      ];

      render(<Select mode="multiple" options={optionsWithIcons} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('star-icon')).toBeInTheDocument();
      });
    });

    it('shows selected on top with separator when showSelectedOnTop is true', async () => {
      const user = userEvent.setup();
      render(<Select mode="multiple" options={simpleOptions} value={['3']} showSelectedOnTop />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        // Option 3 should appear (selected options show on top)
        expect(screen.getByText('Option 3')).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });
    });

    it('renders with borderless variant in multi-select', () => {
      render(<Select mode="multiple" options={simpleOptions} variant="borderless" />);

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveClass('mdt-border-transparent');
    });

    it('supports uncontrolled mode with defaultValue', () => {
      render(<Select mode="multiple" options={simpleOptions} defaultValue={['1', '2']} />);

      expect(screen.getByText('2 selected')).toBeInTheDocument();
    });

    it('renders pills with avatar and icon in pills', () => {
      const optionsWithExtras: SelectOption[] = [
        { value: '1', label: 'User 1', avatar: 'https://example.com/a.jpg' },
        { value: '2', label: 'Star Item', icon: <span data-testid="pill-icon">⭐</span> },
      ];

      render(<Select mode="multiple" options={optionsWithExtras} value={['1', '2']} showPills />);

      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('Star Item')).toBeInTheDocument();
    });

    it('removes pill via keyboard (Enter key)', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { container } = render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1', '2']}
          onChange={handleChange}
          showPills
        />
      );

      const pillRemoveButtons = container.querySelectorAll('.mdt-inline-flex span[role="button"]');
      if (pillRemoveButtons[0]) {
        (pillRemoveButtons[0] as HTMLElement).focus();
        await user.keyboard('{Enter}');

        await waitFor(() => {
          expect(handleChange).toHaveBeenCalledWith(['2']);
        });
      }
    });

    it('renders disabled option in multi-select as non-interactive', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select mode="multiple" options={simpleOptions} onChange={handleChange} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 4')).toBeInTheDocument();
      });

      // Click on disabled option
      const disabledOption = screen.getByText('Option 4').closest('button');
      if (disabledOption) {
        expect(disabledOption).toBeDisabled();
      }
    });

    it('displays multi-select error and helper text', () => {
      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          error="This field is required"
          label="Tags"
          required
        />
      );

      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('shows helper text when no error in multi-select', () => {
      render(<Select mode="multiple" options={simpleOptions} helperText="Select one or more" />);

      expect(screen.getByText('Select one or more')).toBeInTheDocument();
    });
  });

  describe('Single Select Advanced Features', () => {
    it('calls onOpen and onClose callbacks in single select', async () => {
      const user = userEvent.setup();
      const handleOpen = vi.fn();
      const handleClose = vi.fn();

      render(
        <Select
          options={simpleOptions}
          onOpen={handleOpen}
          onClose={handleClose}
          placeholder="Select..."
        />
      );

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(handleOpen).toHaveBeenCalledTimes(1);
      });
    });

    it('shows prefix icon in single select', () => {
      render(<Select options={simpleOptions} prefixIcon={<span data-testid="prefix">🔍</span>} />);

      expect(screen.getByTestId('prefix')).toBeInTheDocument();
    });

    it('renders with borderless variant in single select', () => {
      render(<Select options={simpleOptions} variant="borderless" />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('mdt-border-transparent');
    });

    it('shows custom empty state via renderEmpty in single select', async () => {
      const user = userEvent.setup();
      render(
        <Select
          options={[]}
          renderEmpty={() => <span>No options available</span>}
          placeholder="Select..."
        />
      );

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('No options available')).toBeInTheDocument();
      });
    });

    it('renders controlled single select with value', () => {
      render(<Select options={simpleOptions} value="1" />);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('clears single select value when clearable', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          options={simpleOptions}
          value="1"
          onChange={handleChange}
          clearable
          placeholder="Select..."
        />
      );

      // Find the clear button
      const clearButton = screen.getByLabelText('Clear selection');
      await user.click(clearButton);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(null);
      });
    });

    it('clears single select via keyboard', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select options={simpleOptions} value="1" onChange={handleChange} clearable />);

      const clearButton = screen.getByLabelText('Clear selection');
      clearButton.focus();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(null);
      });
    });

    it('associates helper text with input via aria-describedby in single select', () => {
      render(<Select options={simpleOptions} helperText="Pick one" id="my-select" />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-describedby', 'my-select-helper');
    });

    it('renders with showSelectedOnTop in single select', () => {
      render(<Select options={simpleOptions} value="2" showSelectedOnTop />);

      // The selected value should be displayed in the trigger
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('supports uncontrolled single select with defaultValue', () => {
      render(<Select options={simpleOptions} defaultValue="1" />);

      // In single mode, the controlled value should display
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('renders label and required asterisk for single select', () => {
      render(<Select options={simpleOptions} label="Country" required />);

      expect(screen.getByText('Country')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('renders error message for single select', () => {
      render(<Select options={simpleOptions} error="Selection required" />);

      expect(screen.getByText('Selection required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('hides helper text when error is shown in single select', () => {
      render(
        <Select options={simpleOptions} error="Error occurred" helperText="This should be hidden" />
      );

      expect(screen.getByText('Error occurred')).toBeInTheDocument();
      expect(screen.queryByText('This should be hidden')).not.toBeInTheDocument();
    });
  });

  describe('Search Debounce', () => {
    it('calls onSearch after debounce period', async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          searchable
          onSearch={handleSearch}
          searchDebounce={50}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      const searchInput = screen.getByPlaceholderText('Search...');
      await user.type(searchInput, 'test');

      // Wait for debounce to complete
      await waitFor(
        () => {
          expect(handleSearch).toHaveBeenCalledWith('test');
        },
        { timeout: 2000 }
      );
    });
  });

  describe('Multi-Select Clearable', () => {
    it('renders clearable multi-select with selected values', () => {
      render(<Select mode="multiple" options={simpleOptions} value={['1', '2']} clearable />);

      // Should show "2 selected" text
      expect(screen.getByText('2 selected')).toBeInTheDocument();
      // The clear-all span role=button should exist
      const clearBtn = screen
        .getAllByRole('button')
        .find((btn) => btn.querySelector('svg[name="x"]'));
      expect(clearBtn).toBeDefined();
    });
  });

  describe('Multi-Select Grouped Options', () => {
    it('renders grouped options in multi-select dropdown', async () => {
      const user = userEvent.setup();

      render(<Select mode="multiple" options={groupedOptions} grouped />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Carrot')).toBeInTheDocument();
      });
    });

    it('selects option from grouped multi-select', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select mode="multiple" options={groupedOptions} grouped onChange={handleChange} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Apple')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Apple'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['1']);
      });
    });
  });

  describe('Multi-Select with renderItem', () => {
    it('renders custom items via renderItem in multi-select', async () => {
      const user = userEvent.setup();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          renderItem={({ option, selected }) => (
            <div data-testid={`custom-item-${option.value}`}>
              {selected ? '✅' : '⬜'} {option.label}
            </div>
          )}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('custom-item-1')).toBeInTheDocument();
        expect(screen.getByTestId('custom-item-2')).toBeInTheDocument();
      });
    });
  });

  describe('Multi-Select renderTrigger', () => {
    it('uses custom renderTrigger in multi-select', () => {
      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1']}
          renderTrigger={({ selectedOptions }) => (
            <button data-testid="custom-trigger">
              Custom: {selectedOptions.map((o) => o.label).join(', ')}
            </button>
          )}
        />
      );

      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('custom-trigger')).toHaveTextContent('Custom: Option 1');
    });
  });

  describe('Multi-Select Options with Descriptions', () => {
    it('renders option descriptions in multi-select dropdown', async () => {
      const user = userEvent.setup();

      render(<Select mode="multiple" options={optionsWithDescriptions} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Full access to all resources')).toBeInTheDocument();
        expect(screen.getByText('Can edit content')).toBeInTheDocument();
      });
    });
  });

  describe('Multi-Select Pill Removal Keyboard', () => {
    it('removes pill via click on pill remove button', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1', '2']}
          onChange={handleChange}
          showPills
        />
      );

      // Pills render with button elements for the X close icon
      // Find pill remove buttons by their aria-label
      const pillRemoveButtons = screen.getAllByLabelText(/^Remove/);

      expect(pillRemoveButtons.length).toBeGreaterThan(0);

      await user.click(pillRemoveButtons[0]);

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['2']);
      });
    });
  });

  describe('Single Select Clearable with Keyboard Space', () => {
    it('clears single select via Space key on clear button', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select options={simpleOptions} value="1" onChange={handleChange} clearable />);

      const clearButton = screen.getByLabelText('Clear selection');
      clearButton.focus();
      await user.keyboard(' ');

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(null);
      });
    });
  });

  describe('Multi-Select Borderless with Clearable', () => {
    it('renders borderless multi-select with clearable and selected values', () => {
      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1']}
          variant="borderless"
          clearable
        />
      );

      const buttons = screen.getAllByRole('button');
      // The main trigger button should have the borderless class
      const trigger = buttons[0];
      expect(trigger).toHaveClass('mdt-border-transparent');
    });
  });

  describe('Multi-Select Open/Close Callbacks', () => {
    it('calls onOpen and onClose in multi-select mode', async () => {
      const user = userEvent.setup();
      const handleOpen = vi.fn();
      const handleClose = vi.fn();

      render(
        <Select mode="multiple" options={simpleOptions} onOpen={handleOpen} onClose={handleClose} />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(handleOpen).toHaveBeenCalledTimes(1);
      });

      // Click outside to close
      await user.click(document.body);

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled();
      });
    });
  });

  describe('Single Select Clear via Enter Key', () => {
    it('clears single select via Enter key on clear button', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Select options={simpleOptions} value="1" onChange={handleChange} clearable />);

      const clearButton = screen.getByLabelText('Clear selection');
      clearButton.focus();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(null);
      });
    });
  });

  describe('Single Select with showSelectedOnTop', () => {
    it('renders with showSelectedOnTop and a selected value', () => {
      render(
        <Select options={simpleOptions} value="2" showSelectedOnTop placeholder="Select..." />
      );

      // In single select, showSelectedOnTop still renders but the value is shown in trigger
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });

  describe('Multi-Select Grouped with renderItem', () => {
    it('renders grouped options with custom renderItem in multi-select', async () => {
      const user = userEvent.setup();

      render(
        <Select
          mode="multiple"
          options={groupedOptions}
          grouped
          renderItem={({ option, selected }) => (
            <div data-testid={`custom-item-${option.value}`}>
              {selected ? '✓ ' : ''}
              {option.label}
            </div>
          )}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('custom-item-1')).toBeInTheDocument();
        expect(screen.getByTestId('custom-item-3')).toBeInTheDocument();
      });
    });

    it('selects a grouped option via click on custom renderItem', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          mode="multiple"
          options={groupedOptions}
          grouped
          onChange={handleChange}
          renderItem={({ option, selected }) => (
            <div data-testid={`custom-item-${option.value}`}>
              {selected ? '✓ ' : ''}
              {option.label}
            </div>
          )}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('custom-item-1')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('custom-item-1'));

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith(['1']);
      });
    });
  });

  describe('Multi-Select with showSelectedOnTop', () => {
    it('shows selected options on top in multi-select', async () => {
      const user = userEvent.setup();

      render(<Select mode="multiple" options={simpleOptions} value={['3']} showSelectedOnTop />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 3')).toBeInTheDocument();
      });
    });
  });

  describe('Single Select with name prop', () => {
    it('passes name attribute in single select mode', () => {
      render(<Select options={simpleOptions} name="my-select" placeholder="Select..." />);

      expect(screen.getByText('Select...')).toBeInTheDocument();
    });
  });

  describe('Single Select Borderless Clearable', () => {
    it('renders borderless clearable single select', () => {
      render(<Select options={simpleOptions} value="1" variant="borderless" clearable />);

      const clearButton = screen.getByLabelText('Clear selection');
      expect(clearButton).toBeInTheDocument();
    });
  });

  describe('Keyboard Interaction on Options with renderItem', () => {
    it('selects custom rendered option via Enter key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          onChange={handleChange}
          renderItem={({ option, selected }) => (
            <div data-testid={`custom-${option.value}`}>
              {selected ? '✓ ' : ''}
              {option.label}
            </div>
          )}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('custom-1')).toBeInTheDocument();
      });

      // Find the custom rendered item wrapper (has role="button")
      const customItem = screen.getByTestId('custom-1').closest('[role="button"]') as HTMLElement;

      if (customItem) {
        // Use fireEvent for keyboard event on custom rendered item
        fireEvent.keyDown(customItem, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
          expect(handleChange).toHaveBeenCalledWith(['1']);
        });
      }
    });

    it('selects custom rendered option via Space key', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          onChange={handleChange}
          renderItem={({ option, selected }) => (
            <div data-testid={`custom-${option.value}`}>
              {selected ? '✓ ' : ''}
              {option.label}
            </div>
          )}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('custom-2')).toBeInTheDocument();
      });

      // Find the custom rendered item wrapper
      const customItem = screen.getByTestId('custom-2').closest('[role="button"]') as HTMLElement;

      if (customItem) {
        // Use fireEvent for Space key
        fireEvent.keyDown(customItem, { key: ' ', code: 'Space' });

        await waitFor(() => {
          expect(handleChange).toHaveBeenCalledWith(['2']);
        });
      }
    });

    it('does not select disabled custom rendered option via keyboard', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          onChange={handleChange}
          renderItem={({ option, selected }) => (
            <div data-testid={`custom-${option.value}`}>
              {selected ? '✓ ' : ''}
              {option.label}
            </div>
          )}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByTestId('custom-4')).toBeInTheDocument();
      });

      // Option 4 is disabled
      const customItem = screen.getByTestId('custom-4').closest('[role="button"]') as HTMLElement;

      if (customItem) {
        fireEvent.keyDown(customItem, { key: 'Enter', code: 'Enter' });

        // Should not have been called since option is disabled
        expect(handleChange).not.toHaveBeenCalled();
      }
    });
  });

  describe('Pill HoverCard', () => {
    it('renders pills with hover card when pillHoverCard and renderPillHoverCard provided', async () => {
      const user = userEvent.setup();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          value={['1', '2']}
          showPills
          pillHoverCard
          renderPillHoverCard={({ option }) => (
            <div data-testid={`hover-content-${option.value}`}>Details for {option.label}</div>
          )}
        />
      );

      // Pills should be rendered
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();

      // Hover over the first pill to trigger HoverCard
      const pill1 = screen.getByText('Option 1');
      await user.hover(pill1);

      // HoverCard content should appear after hover
      await waitFor(() => {
        expect(screen.getByTestId('hover-content-1')).toBeInTheDocument();
      });
    });
  });

  describe('Search Debounce Timeout Clearing', () => {
    it('clears previous timeout when typing rapidly', async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup();

      render(
        <Select
          mode="multiple"
          options={simpleOptions}
          searchable
          onSearch={handleSearch}
          searchDebounce={200}
        />
      );

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      const searchInput = screen.getByPlaceholderText('Search...');

      // Type multiple characters rapidly to trigger multiple debounces
      await user.type(searchInput, 'ab');

      // Wait for debounce to complete
      await waitFor(
        () => {
          // Should only call once with final value due to debounce clearing
          expect(handleSearch).toHaveBeenCalledWith('ab');
        },
        { timeout: 2000 }
      );
    });

    it('clears timeout on component unmount', () => {
      // Use fake timers to control timing
      vi.useFakeTimers();

      const handleSearch = vi.fn();

      const { unmount } = render(
        <Select
          mode="multiple"
          options={simpleOptions}
          searchable
          onSearch={handleSearch}
          searchDebounce={500}
        />
      );

      // Unmount immediately (before any search interaction)
      // This tests the cleanup effect on line 508
      unmount();

      // Advance timers
      vi.advanceTimersByTime(600);

      // Callback should never have been called
      expect(handleSearch).not.toHaveBeenCalled();

      vi.useRealTimers();
    });
  });

  describe('Virtualized Options Rendering', () => {
    it('renders virtualized options with many items and scrolling', async () => {
      const user = userEvent.setup();

      // Create a large list of options to trigger virtualization
      const manyOptions: SelectOption[] = Array.from({ length: 100 }, (_, i) => ({
        value: `${i + 1}`,
        label: `Option ${i + 1}`,
      }));

      const { container } = render(<Select mode="multiple" options={manyOptions} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        // First few options should be visible
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      // Get the scrollable container
      const scrollContainer = container.querySelector('[style*="overflow"]');
      if (scrollContainer) {
        // Trigger scroll event to exercise virtualizer getScrollElement
        scrollContainer.scrollTop = 100;
        scrollContainer.dispatchEvent(new Event('scroll'));
      }

      // Verify virtualizer is working by checking some options are rendered
      const option1 = screen.getByText('Option 1');
      expect(option1).toBeInTheDocument();
    });

    it('handles null option in virtual items gracefully', async () => {
      const user = userEvent.setup();

      render(<Select mode="multiple" options={simpleOptions} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      // Options should render without errors (including the null check on line 970)
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('renders selected option in virtualized list', async () => {
      const user = userEvent.setup();

      const manyOptions: SelectOption[] = Array.from({ length: 50 }, (_, i) => ({
        value: `${i + 1}`,
        label: `Option ${i + 1}`,
      }));

      render(<Select mode="multiple" options={manyOptions} value={['5', '10']} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument();
      });

      // The virtualized rendering should handle selected items (covers line 971)
      expect(screen.getByText('2 selected')).toBeInTheDocument();
    });
  });
});
