import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupButton,
  InputGroupTextarea,
} from './InputGroup';

describe('InputGroup', () => {
  it('renders correctly', () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Test input" aria-label="Test" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <InputGroup ref={ref}>
        <InputGroupInput aria-label="Test" />
      </InputGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('accepts custom className', () => {
    render(
      <InputGroup className="custom-class" data-testid="input-group">
        <InputGroupInput aria-label="Test" />
      </InputGroup>
    );
    expect(screen.getByTestId('input-group')).toHaveClass('custom-class');
  });

  it('renders with icon addon', () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" aria-label="Search" />
        <InputGroupAddon>
          <svg data-testid="icon" />
        </InputGroupAddon>
      </InputGroup>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});

describe('InputGroupAddon', () => {
  it('renders correctly', () => {
    render(
      <InputGroup>
        <InputGroupAddon data-testid="addon">Icon</InputGroupAddon>
      </InputGroup>
    );
    expect(screen.getByTestId('addon')).toBeInTheDocument();
  });

  it('accepts align prop', () => {
    render(
      <InputGroup>
        <InputGroupAddon align="inline-start" data-testid="addon">
          Icon
        </InputGroupAddon>
      </InputGroup>
    );
    const addon = screen.getByTestId('addon');
    expect(addon).toHaveAttribute('data-position', 'inline-start');
    expect(addon).toHaveClass('mdt-left-0');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <InputGroup>
        <InputGroupAddon ref={ref}>Icon</InputGroupAddon>
      </InputGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('InputGroupInput', () => {
  it('renders correctly', () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Test" aria-label="Test" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <InputGroup>
        <InputGroupInput ref={ref} aria-label="Test" />
      </InputGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('accepts type prop', () => {
    render(
      <InputGroup>
        <InputGroupInput type="email" aria-label="Email" />
      </InputGroup>
    );
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('can be disabled', () => {
    render(
      <InputGroup>
        <InputGroupInput disabled aria-label="Disabled" />
      </InputGroup>
    );
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });
});

describe('InputGroupText', () => {
  it('renders correctly', () => {
    render(
      <InputGroup>
        <InputGroupText>$</InputGroupText>
      </InputGroup>
    );
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <InputGroup>
        <InputGroupText ref={ref}>Text</InputGroupText>
      </InputGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe('InputGroupButton', () => {
  it('renders correctly', () => {
    render(
      <InputGroup>
        <InputGroupAddon variant="button">
          <InputGroupButton>Click</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <InputGroup>
        <InputGroupAddon variant="button">
          <InputGroupButton ref={ref}>Click</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('can be disabled', () => {
    render(
      <InputGroup>
        <InputGroupAddon variant="button">
          <InputGroupButton disabled>Click</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
    expect(screen.getByRole('button', { name: 'Click' })).toBeDisabled();
  });
});

describe('InputGroupTextarea', () => {
  it('renders correctly', () => {
    render(
      <InputGroup>
        <InputGroupTextarea placeholder="Message" aria-label="Message" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(
      <InputGroup>
        <InputGroupTextarea ref={ref} aria-label="Message" />
      </InputGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('can be disabled', () => {
    render(
      <InputGroup>
        <InputGroupTextarea disabled aria-label="Disabled" />
      </InputGroup>
    );
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });
});

describe('InputGroupAddon block positioning', () => {
  it('positions addon at block-start', () => {
    render(
      <InputGroup>
        <InputGroupAddon align="block-start" data-testid="addon-block-start">
          Label
        </InputGroupAddon>
        <InputGroupInput aria-label="Test" />
      </InputGroup>
    );
    const addon = screen.getByTestId('addon-block-start');
    expect(addon).toHaveAttribute('data-position', 'block-start');
    expect(addon).toHaveClass('mdt-top-0');
    expect(addon).toHaveClass('mdt--translate-y-full');
  });

  it('positions addon at block-end', () => {
    render(
      <InputGroup>
        <InputGroupAddon align="block-end" data-testid="addon-block-end">
          Helper
        </InputGroupAddon>
        <InputGroupInput aria-label="Test" />
      </InputGroup>
    );
    const addon = screen.getByTestId('addon-block-end');
    expect(addon).toHaveAttribute('data-position', 'block-end');
    expect(addon).toHaveClass('mdt-bottom-0');
    expect(addon).toHaveClass('mdt-translate-y-full');
  });
});

describe('InputGroupText inline-start alignment', () => {
  it('positions text addon at inline-start', () => {
    render(
      <InputGroup>
        <InputGroupText align="inline-start" data-testid="text-start">
          $
        </InputGroupText>
        <InputGroupInput aria-label="Amount" />
      </InputGroup>
    );
    const text = screen.getByTestId('text-start');
    expect(text).toHaveAttribute('data-position', 'inline-start');
    expect(text).toHaveClass('mdt-rounded-r-none');
    expect(text).toHaveClass('mdt-border-r-0');
  });
});

describe('InputGroupButton inline-start alignment', () => {
  it('positions button addon at inline-start', () => {
    render(
      <InputGroup>
        <InputGroupButton align="inline-start" data-testid="btn-start">
          Search
        </InputGroupButton>
        <InputGroupInput aria-label="Search" />
      </InputGroup>
    );
    const btn = screen.getByTestId('btn-start');
    expect(btn).toHaveAttribute('data-position', 'inline-start');
    expect(btn).toHaveClass('mdt-rounded-r-none');
    expect(btn).toHaveClass('mdt-border-r-0');
  });
});
