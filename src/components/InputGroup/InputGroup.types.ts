import type {
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

/**
 * Props for the InputGroup component
 */
export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * InputGroupInput with optional InputGroupAddon components
   */
  children: ReactNode;
}

/**
 * Props for the InputGroupAddon component
 */
export interface InputGroupAddonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display in the addon (icon, text, button, etc.)
   */
  children: ReactNode;

  /**
   * Alignment position of the addon
   * - inline-start: Before the input (left side)
   * - inline-end: After the input (right side)
   * - block-start: Above the input
   * - block-end: Below the input
   * @default 'inline-end'
   */
  align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
}

/**
 * Props for the InputGroupInput component
 */
export type InputGroupInputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Props for the InputGroupText component
 */
export interface InputGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Text content to display
   */
  children: ReactNode;

  /**
   * Alignment position
   * @default 'inline-end'
   */
  align?: 'inline-start' | 'inline-end';
}

/**
 * Props for the InputGroupButton component
 */
export interface InputGroupButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: ReactNode;

  /**
   * Alignment position
   * @default 'inline-end'
   */
  align?: 'inline-start' | 'inline-end';
}

/**
 * Props for the InputGroupTextarea component
 */
export type InputGroupTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
