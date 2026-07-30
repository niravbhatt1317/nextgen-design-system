import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Form, FormField, FormLabel, FormControl, FormMessage, FormDescription } from './';
import { Input } from '../Input';
import { Button } from '../Button';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form components for building accessible forms with validation support. Includes Form, FormField, FormLabel, FormControl, FormMessage, and FormDescription.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic form example with a single field.
 */
export const Default: Story = {
  render: () => (
    <div className="mdt-w-[400px]">
      <Form>
        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormControl>
            <Input id="email" type="email" placeholder="Enter your email" />
          </FormControl>
          <FormDescription>We'll never share your email with anyone else.</FormDescription>
        </FormField>
      </Form>
    </div>
  ),
};

/**
 * Form field with required indicator (asterisk).
 */
export const RequiredField: Story = {
  render: () => (
    <div className="mdt-w-[400px]">
      <Form>
        <FormField>
          <FormLabel htmlFor="username" required>
            Username
          </FormLabel>
          <FormControl>
            <Input id="username" type="text" placeholder="Enter username" />
          </FormControl>
          <FormDescription>Choose a unique username.</FormDescription>
        </FormField>
      </Form>
    </div>
  ),
};

/**
 * Form field with error message.
 */
export const WithError: Story = {
  render: () => (
    <div className="mdt-w-[400px]">
      <Form>
        <FormField>
          <FormLabel htmlFor="email-error" required>
            Email
          </FormLabel>
          <FormControl>
            <Input
              id="email-error"
              type="email"
              placeholder="Enter your email"
              error="Invalid email address"
              aria-invalid="true"
            />
          </FormControl>
          <FormMessage error="Invalid email address" />
        </FormField>
      </Form>
    </div>
  ),
};

/**
 * Complete form with multiple fields.
 */
export const CompleteForm: Story = {
  render: () => (
    <div className="mdt-w-[400px]">
      <Form>
        <FormField>
          <FormLabel htmlFor="name" required>
            Full Name
          </FormLabel>
          <FormControl>
            <Input id="name" type="text" placeholder="John Doe" />
          </FormControl>
        </FormField>

        <FormField>
          <FormLabel htmlFor="email-complete" required>
            Email
          </FormLabel>
          <FormControl>
            <Input id="email-complete" type="email" placeholder="john@example.com" />
          </FormControl>
          <FormDescription>We'll send a verification email to this address.</FormDescription>
        </FormField>

        <FormField>
          <FormLabel htmlFor="password" required>
            Password
          </FormLabel>
          <FormControl>
            <Input id="password" type="password" placeholder="Enter password" />
          </FormControl>
          <FormDescription>Must be at least 8 characters long.</FormDescription>
        </FormField>

        <Button type="submit" className="mdt-w-full">
          Submit
        </Button>
      </Form>
    </div>
  ),
};

/**
 * Interactive form with validation state management.
 */
export const InteractiveForm: Story = {
  render: () => {
    const InteractiveFormExample = () => {
      const [email, setEmail] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
          setError('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setError('Invalid email address');
        } else {
          setError('');
          alert(`Form submitted with email: ${email}`);
        }
      };

      return (
        <div className="mdt-w-[400px]">
          <Form onSubmit={handleSubmit}>
            <FormField>
              <FormLabel htmlFor="email-interactive" required>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  id="email-interactive"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  error={error}
                  aria-invalid={!!error}
                />
              </FormControl>
              {error && <FormMessage error={error} />}
              {!error && (
                <FormDescription>Enter a valid email address to continue.</FormDescription>
              )}
            </FormField>

            <Button type="submit" className="mdt-w-full">
              Submit
            </Button>
          </Form>
        </div>
      );
    };

    return <InteractiveFormExample />;
  },
};

/**
 * Form with multiple fields and mixed states.
 */
export const MixedStates: Story = {
  render: () => (
    <div className="mdt-w-[400px]">
      <Form>
        <FormField>
          <FormLabel htmlFor="field1" required>
            Valid Field
          </FormLabel>
          <FormControl>
            <Input id="field1" type="text" defaultValue="John Doe" />
          </FormControl>
          <FormDescription>This field is filled correctly.</FormDescription>
        </FormField>

        <FormField>
          <FormLabel htmlFor="field2" required>
            Field with Error
          </FormLabel>
          <FormControl>
            <Input
              id="field2"
              type="email"
              placeholder="Enter email"
              error="This field is required"
              aria-invalid="true"
            />
          </FormControl>
          <FormMessage error="This field is required" />
        </FormField>

        <FormField>
          <FormLabel htmlFor="field3">Optional Field</FormLabel>
          <FormControl>
            <Input id="field3" type="text" placeholder="Optional information" />
          </FormControl>
          <FormDescription>This field is optional.</FormDescription>
        </FormField>
      </Form>
    </div>
  ),
};

/**
 * Demonstrates different form field sizes.
 */
export const FormFieldSizes: Story = {
  render: () => (
    <div className="mdt-w-[400px]">
      <Form>
        <FormField>
          <FormLabel htmlFor="small">Small Input</FormLabel>
          <FormControl>
            <Input id="small" size="sm" placeholder="Small size" />
          </FormControl>
        </FormField>

        <FormField>
          <FormLabel htmlFor="medium-size">Medium Input (Default)</FormLabel>
          <FormControl>
            <Input id="medium-size" size="md" placeholder="Medium size" />
          </FormControl>
        </FormField>

        <FormField>
          <FormLabel htmlFor="large">Large Input</FormLabel>
          <FormControl>
            <Input id="large" size="lg" placeholder="Large size" />
          </FormControl>
        </FormField>
      </Form>
    </div>
  ),
};

/**
 * Demonstrates label weight variants (normal, medium, semibold, bold).
 */
export const LabelWeights: Story = {
  render: () => (
    <div className="mdt-w-[400px]">
      <Form>
        <FormField>
          <FormLabel htmlFor="normal" weight="normal">
            Normal Weight Label (Default)
          </FormLabel>
          <FormControl>
            <Input id="normal" placeholder="With normal label" />
          </FormControl>
        </FormField>

        <FormField>
          <FormLabel htmlFor="medium-weight" weight="medium">
            Medium Weight Label
          </FormLabel>
          <FormControl>
            <Input id="medium-weight" placeholder="With medium label" />
          </FormControl>
        </FormField>

        <FormField>
          <FormLabel htmlFor="semibold" weight="semibold">
            Semibold Weight Label
          </FormLabel>
          <FormControl>
            <Input id="semibold" placeholder="With semibold label" />
          </FormControl>
        </FormField>

        <FormField>
          <FormLabel htmlFor="bold" weight="bold">
            Bold Weight Label
          </FormLabel>
          <FormControl>
            <Input id="bold" placeholder="With bold label" />
          </FormControl>
        </FormField>
      </Form>
    </div>
  ),
};

/**
 * Demonstrates color variants for labels, messages, and descriptions.
 * Note: Some colors (success, warning, info) are designed for backgrounds/badges,
 * not for text on white backgrounds. Use with appropriate background colors in production.
 */
export const ColorVariants: Story = {
  parameters: {
    // Disable color-contrast for this story - demonstrates color API
    // Success/warning/info colors are designed for badges/backgrounds, not text on white
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
  render: () => (
    <div className="mdt-w-[400px]">
      <Form>
        <FormField>
          <FormLabel htmlFor="default-color">Default Color</FormLabel>
          <FormControl>
            <Input id="default-color" placeholder="Default styling" />
          </FormControl>
          <FormDescription>This is the default description color.</FormDescription>
        </FormField>

        <FormField>
          <FormLabel htmlFor="muted-color" color="muted">
            Muted Label
          </FormLabel>
          <FormControl>
            <Input id="muted-color" placeholder="With muted label" />
          </FormControl>
          <FormDescription color="muted">This is a muted description.</FormDescription>
        </FormField>

        <FormField>
          <FormLabel htmlFor="primary-color" color="primary">
            Primary Color Label
          </FormLabel>
          <FormControl>
            <Input id="primary-color" placeholder="With primary label" />
          </FormControl>
          <FormMessage color="primary">This is a primary message.</FormMessage>
        </FormField>

        <FormField>
          <FormLabel htmlFor="success-field" color="success">
            Success Label
          </FormLabel>
          <FormControl>
            <Input id="success-field" placeholder="Success state" />
          </FormControl>
          <FormMessage color="success">Email is valid!</FormMessage>
        </FormField>

        <FormField>
          <FormLabel htmlFor="warning-field" color="warning">
            Warning Label
          </FormLabel>
          <FormControl>
            <Input id="warning-field" placeholder="Warning state" />
          </FormControl>
          <FormDescription color="warning">Password strength is weak.</FormDescription>
        </FormField>

        <FormField>
          <FormLabel htmlFor="info-field" color="info">
            Info Label
          </FormLabel>
          <FormControl>
            <Input id="info-field" placeholder="Info state" />
          </FormControl>
          <FormMessage color="info">Additional information available.</FormMessage>
        </FormField>
      </Form>
    </div>
  ),
};
