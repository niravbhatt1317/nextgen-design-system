import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';

describe('ButtonGroup', () => {
  it('renders correctly', () => {
    render(
      <ButtonGroup data-testid="button-group">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    );
    expect(screen.getByTestId('button-group')).toBeInTheDocument();
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ButtonGroup ref={ref}>
        <Button>Test</Button>
      </ButtonGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies horizontal orientation by default', () => {
    render(
      <ButtonGroup data-testid="button-group">
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId('button-group');
    expect(group).toHaveClass('mdt-flex-row');
  });

  it('applies vertical orientation when specified', () => {
    render(
      <ButtonGroup orientation="vertical" data-testid="button-group">
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId('button-group');
    expect(group).toHaveClass('mdt-flex-col');
  });

  it('applies attached variant by default', () => {
    render(
      <ButtonGroup data-testid="button-group">
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId('button-group');
    expect(group).toBeInTheDocument();
  });

  it('applies default variant when specified', () => {
    render(
      <ButtonGroup variant="default" data-testid="button-group">
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId('button-group');
    expect(group).toHaveClass('mdt-gap-2');
  });

  it('applies fullWidth variant', () => {
    render(
      <ButtonGroup fullWidth data-testid="button-group">
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId('button-group');
    expect(group).toHaveClass('mdt-w-full');
  });

  it('renders multiple children correctly', () => {
    render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    );
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
    expect(screen.getByText('Button 3')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    render(
      <ButtonGroup className="custom-class" data-testid="button-group">
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId('button-group');
    expect(group).toHaveClass('custom-class');
  });

  it('passes through additional props', () => {
    render(
      <ButtonGroup data-testid="custom-button-group">
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId('custom-button-group');
    expect(group).toBeInTheDocument();
  });

  it('renders with icon buttons', () => {
    render(
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Settings">
          <svg aria-hidden="true" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Download">
          <svg aria-hidden="true" />
        </Button>
      </ButtonGroup>
    );
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Download')).toBeInTheDocument();
  });

  it('renders with disabled buttons', () => {
    render(
      <ButtonGroup>
        <Button>Active</Button>
        <Button disabled>Disabled</Button>
      </ButtonGroup>
    );
    expect(screen.getByText('Active')).toBeEnabled();
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('renders single button correctly', () => {
    render(
      <ButtonGroup>
        <Button>Single Button</Button>
      </ButtonGroup>
    );
    expect(screen.getByText('Single Button')).toBeInTheDocument();
  });

  it('applies size variant', () => {
    render(
      <ButtonGroup size="sm" data-testid="button-group">
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId('button-group');
    expect(group).toBeInTheDocument();
  });

  it('renders with different button variants', () => {
    render(
      <ButtonGroup>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button>Primary</Button>
      </ButtonGroup>
    );
    expect(screen.getByText('Outline')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('renders vertical group with fullWidth', () => {
    render(
      <ButtonGroup orientation="vertical" fullWidth data-testid="button-group">
        <Button>Top</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId('button-group');
    expect(group).toHaveClass('mdt-flex-col');
    expect(group).toHaveClass('mdt-w-full');
  });

  it('renders as a container div without role attribute', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Test</Button>
      </ButtonGroup>
    );
    const buttonGroup = container.querySelector('.mdt-inline-flex');
    expect(buttonGroup).toBeInTheDocument();
    expect(buttonGroup?.hasAttribute('role')).toBe(false);
  });
});
