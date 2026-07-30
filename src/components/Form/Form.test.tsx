import { vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormField, FormLabel, FormControl, FormMessage, FormDescription } from './';
import { Input } from '../Input';

describe('Form', () => {
  it('renders correctly', () => {
    render(
      <Form>
        <div>Form content</div>
      </Form>
    );
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('prevents default form submission', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <Form className="custom-class">
        <div>Content</div>
      </Form>
    );
    const form = container.querySelector('form');
    expect(form).toHaveClass('custom-class');
    expect(form).toHaveClass('mdt-space-y-4');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLFormElement | null };
    render(
      <Form ref={ref}>
        <div>Content</div>
      </Form>
    );
    expect(ref.current).toBeInstanceOf(HTMLFormElement);
  });
});

describe('FormField', () => {
  it('renders children correctly', () => {
    render(
      <FormField>
        <div>Field content</div>
      </FormField>
    );
    expect(screen.getByText('Field content')).toBeInTheDocument();
  });

  it('applies default spacing class', () => {
    const { container } = render(
      <FormField>
        <div>Content</div>
      </FormField>
    );
    const field = container.querySelector('div');
    expect(field).toHaveClass('mdt-space-y-2');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormField className="custom-field">
        <div>Content</div>
      </FormField>
    );
    const field = container.querySelector('div');
    expect(field).toHaveClass('custom-field');
    expect(field).toHaveClass('mdt-space-y-2');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <FormField ref={ref}>
        <div>Content</div>
      </FormField>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('FormLabel', () => {
  it('renders label text', () => {
    render(<FormLabel>Username</FormLabel>);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('shows asterisk when required is true', () => {
    render(<FormLabel required>Email</FormLabel>);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('does not show asterisk when required is false', () => {
    render(<FormLabel>Email</FormLabel>);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('associates with input via htmlFor', () => {
    render(
      <>
        <FormLabel htmlFor="test-input">Label</FormLabel>
        <input id="test-input" />
      </>
    );
    const label = screen.getByText('Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('applies custom className', () => {
    render(<FormLabel className="custom-label">Label</FormLabel>);
    const label = screen.getByText('Label');
    expect(label).toHaveClass('custom-label');
    expect(label).toHaveClass('mdt-text-sm');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLLabelElement | null };
    render(<FormLabel ref={ref}>Label</FormLabel>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});

describe('FormControl', () => {
  it('renders children correctly', () => {
    render(
      <FormControl>
        <input aria-label="test input" />
      </FormControl>
    );
    expect(screen.getByLabelText('test input')).toBeInTheDocument();
  });

  it('applies relative positioning', () => {
    const { container } = render(
      <FormControl>
        <input />
      </FormControl>
    );
    const control = container.querySelector('div');
    expect(control).toHaveClass('mdt-relative');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormControl className="custom-control">
        <input />
      </FormControl>
    );
    const control = container.querySelector('div');
    expect(control).toHaveClass('custom-control');
    expect(control).toHaveClass('mdt-relative');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <FormControl ref={ref}>
        <input />
      </FormControl>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('FormMessage', () => {
  it('renders error message', () => {
    render(<FormMessage error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders children as message', () => {
    render(<FormMessage>Helper text</FormMessage>);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('prioritizes error over children', () => {
    render(<FormMessage error="Error message">Helper text</FormMessage>);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('applies error styling for error messages', () => {
    render(<FormMessage error="Error" />);
    const message = screen.getByText('Error');
    expect(message).toHaveClass('mdt-text-destructive');
  });

  it('applies muted styling for helper text', () => {
    render(<FormMessage>Helper</FormMessage>);
    const message = screen.getByText('Helper');
    expect(message).toHaveClass('mdt-text-muted-foreground');
  });

  it('has alert role when error is present', () => {
    render(<FormMessage error="Error message" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('does not have alert role for helper text', () => {
    render(<FormMessage>Helper text</FormMessage>);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('returns null when no message', () => {
    const { container } = render(<FormMessage />);
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className', () => {
    render(<FormMessage className="custom-message">Message</FormMessage>);
    const message = screen.getByText('Message');
    expect(message).toHaveClass('custom-message');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLParagraphElement | null };
    render(<FormMessage ref={ref}>Message</FormMessage>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

describe('FormDescription', () => {
  it('renders description text', () => {
    render(<FormDescription>This is a description</FormDescription>);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    render(<FormDescription>Description</FormDescription>);
    const description = screen.getByText('Description');
    expect(description).toHaveClass('mdt-text-sm');
    expect(description).toHaveClass('mdt-text-muted-foreground');
  });

  it('applies custom className', () => {
    render(<FormDescription className="custom-desc">Description</FormDescription>);
    const description = screen.getByText('Description');
    expect(description).toHaveClass('custom-desc');
    expect(description).toHaveClass('mdt-text-sm');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLParagraphElement | null };
    render(<FormDescription ref={ref}>Description</FormDescription>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

describe('Form Integration', () => {
  it('renders complete form with all components', () => {
    render(
      <Form>
        <FormField>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <FormControl>
            <Input id="email" type="email" />
          </FormControl>
          <FormDescription>Enter your email address</FormDescription>
          <FormMessage error="Email is required" />
        </FormField>
      </Form>
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('handles form submission with input values', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <Form onSubmit={handleSubmit}>
        <FormField>
          <FormLabel htmlFor="username">Username</FormLabel>
          <FormControl>
            <Input id="username" type="text" />
          </FormControl>
        </FormField>
        <button type="submit">Submit</button>
      </Form>
    );

    const input = screen.getByLabelText('Username');
    await user.type(input, 'testuser');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
