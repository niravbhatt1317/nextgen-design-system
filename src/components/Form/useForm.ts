import { useRef, useState } from 'react';
import type { FormEvent } from 'react';

/** What one field asks of its value. */
export interface FormFieldRule<V, T> {
  /**
   * The field must be filled. `true` says "Required"; a string is the message to show. A
   * function decides from the other values - required only while a switch is off, say.
   */
  required?: boolean | string | ((values: T) => boolean | string);
  /** Any other check: return the message when the value is wrong, nothing when it is right. */
  validate?: (value: V, values: T) => string | undefined;
}

export type FormRules<T> = { [K in keyof T]?: FormFieldRule<T[K], T> };

export interface UseFormOptions<T extends Record<string, unknown>> {
  /** The values the form starts from - and compares against to know whether anything changed. */
  initialValues: T;
  /** The checks, by field name. */
  rules?: FormRules<T>;
  /**
   * Runs on a valid submit. Return a promise to keep `submitting` true until it settles;
   * report your own errors inside it - a rejection only ends `submitting`.
   */
  onSubmit: (values: T) => unknown;
}

/** The props one control needs: spread them onto an Input, a Select or a Textarea. */
export interface FormFieldBinding<V> {
  name: string;
  id: string;
  value: V;
  /** Takes the input's change event, or the value itself (a Select, a Switch). */
  onChange: (eventOrValue: unknown) => void;
  onBlur: () => void;
  /** The message to show, once the field has been left or the form submitted. */
  error?: string;
  required?: boolean;
  'aria-invalid'?: boolean;
}

export interface UseFormReturn<T extends Record<string, unknown>> {
  values: T;
  /** The messages showing now - only for fields left or submitted. */
  errors: Partial<Record<keyof T, string>>;
  /** Something differs from `initialValues`. Typed back to the start, it is false again. */
  dirty: boolean;
  /** Every required field holds something. */
  requiredFilled: boolean;
  /** Every rule passes, required and format alike. */
  valid: boolean;
  /** The Save rule: changed, every required field filled, and not already submitting. */
  canSubmit: boolean;
  /** A submit is running. */
  submitting: boolean;
  /** The props for one field's control. */
  field: <K extends keyof T & string>(name: K) => FormFieldBinding<T[K]>;
  /** Set one value directly. */
  setValue: <K extends keyof T>(name: K, value: T[K]) => void;
  /**
   * Pass to `Form`'s onSubmit. Checks every field, shows every message, and on a
   * problem puts focus on the first field that has one; when all is well, runs onSubmit.
   */
  handleSubmit: (event?: FormEvent<HTMLFormElement>) => void;
  /** Back to the start - or to new values, which become the new start (after a save, say). */
  reset: (values?: T) => void;
}

/** Whether a value counts as empty for `required`: blank text, nothing, an empty list. A switch's `false` is an answer. */
const isEmpty = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0);

/** Whether two values are the same answer: compared by content, so a list re-picked in another order still differs. */
const same = (a: unknown, b: unknown): boolean =>
  Object.is(a, b) || (typeof a === 'object' && JSON.stringify(a) === JSON.stringify(b));

const fromEvent = (input: unknown): unknown =>
  typeof input === 'object' && input !== null && 'target' in input
    ? (input as { target: { value: unknown } }).target.value
    : input;

/**
 * useForm - one form's values, checks and Save rule, for every form in the library.
 *
 * Save waits until something has changed and every required field is filled;
 * a wrong format shows when the field is left or Save is pressed, not while
 * typing; a submit with a problem focuses the first field that has one.
 *
 * @example
 * const form = useForm({
 *   initialValues: { name: 'Helpdesk Access', email: '' },
 *   rules: {
 *     name: { required: 'Enter a name' },
 *     email: { required: true, validate: (v) => (/@/.test(v) ? undefined : 'Enter a valid email') },
 *   },
 *   onSubmit: save,
 * });
 *
 * <Form id="edit" onSubmit={form.handleSubmit}>
 *   <Input label="Name" {...form.field('name')} />
 * </Form>
 * <Button type="submit" form="edit" disabled={!form.canSubmit}>Save changes</Button>
 */
export function useForm<T extends Record<string, unknown>>({
  initialValues,
  rules = {},
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [start, setStart] = useState(initialValues);
  const [values, setValues] = useState(initialValues);
  const [shown, setShown] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const names = Object.keys(rules) as (keyof T & string)[];

  /** What `required` says for a field right now: false, or the message it would show. */
  const requiredNow = (name: keyof T): false | string => {
    const rule = rules[name]?.required;
    const said = typeof rule === 'function' ? rule(values) : rule;
    if (!said) return false;
    return typeof said === 'string' ? said : 'Required';
  };

  /** The message a field earns now, whether or not it is showing yet. */
  const check = (name: keyof T): string | undefined => {
    const rule = rules[name];
    if (!rule) return undefined;
    const required = requiredNow(name);
    if (required !== false && isEmpty(values[name])) return required;
    return isEmpty(values[name]) ? undefined : rule.validate?.(values[name], values);
  };

  const allErrors: Partial<Record<keyof T, string>> = {};
  const errors: Partial<Record<keyof T, string>> = {};
  for (const name of names) {
    const message = check(name);
    if (message === undefined) continue;
    allErrors[name] = message;
    if (shown[name]) errors[name] = message;
  }

  const dirty = (Object.keys({ ...start, ...values }) as (keyof T)[]).some(
    (k) => !same(values[k], start[k])
  );
  const requiredFilled = names.every(
    (name) => requiredNow(name) === false || !isEmpty(values[name])
  );
  const valid = Object.keys(allErrors).length === 0;

  const setValue = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const field = <K extends keyof T & string>(name: K): FormFieldBinding<T[K]> => {
    const error = errors[name];
    return {
      name,
      id: name,
      value: values[name],
      onChange: (eventOrValue) => {
        setValue(name, fromEvent(eventOrValue) as T[K]);
      },
      onBlur: () => {
        setShown((s) => (s[name] ? s : { ...s, [name]: true }));
      },
      ...(error === undefined ? {} : { error, 'aria-invalid': true }),
      ...(requiredNow(name) === false ? {} : { required: true }),
    };
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (event) formRef.current = event.currentTarget;
    setShown(Object.fromEntries(names.map((n) => [n, true])) as Partial<Record<keyof T, boolean>>);
    const first = names.find((name) => allErrors[name] !== undefined);
    if (first !== undefined) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(first)}`)?.focus();
      return;
    }
    setSubmitting(true);
    void Promise.resolve()
      .then(() => onSubmit(values))
      .catch(() => undefined)
      .finally(() => {
        setSubmitting(false);
      });
  };

  const reset = (next?: T) => {
    const base = next ?? start;
    setStart(base);
    setValues(base);
    setShown({});
  };

  return {
    values,
    errors,
    dirty,
    requiredFilled,
    valid,
    canSubmit: dirty && requiredFilled && !submitting,
    submitting,
    field,
    setValue,
    handleSubmit,
    reset,
  };
}
