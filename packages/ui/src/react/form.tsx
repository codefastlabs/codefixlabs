import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { createContext, forwardRef, useContext, useId } from 'react';
import type {
  ControllerProps,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { Label } from '@/react/label';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const formItemVariants = cva(undefined, {
  defaultVariants: {
    inline: false,
  },
  variants: {
    inline: {
      false: 'space-y-2',
      true: 'flex gap-2',
    },
  },
});

type FormItemVariants = VariantProps<typeof formItemVariants>;

/* -----------------------------------------------------------------------------
 * Contexts
 * -------------------------------------------------------------------------- */

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

interface FormItemContextValue {
  id: string;
}

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export const FormItemContext = createContext<{
  id: string;
}>({} as FormItemContextValue);

export function useFormField(): {
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error?: FieldError;
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
} {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext.name) {
    throw new Error('useFormField should be used within <FormField />');
  }

  const { id } = itemContext;

  return {
    formDescriptionId: `form-item-description-${id}`,
    formItemId: `form-item-${id}`,
    formMessageId: `form-item-message-${id}`,
    id,
    name: fieldContext.name,
    ...fieldState,
  };
}

/* -----------------------------------------------------------------------------
 * Component: Form
 * -------------------------------------------------------------------------- */

export const Form = FormProvider;

/* -----------------------------------------------------------------------------
 * Component: FormField
 * -------------------------------------------------------------------------- */

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>): React.JSX.Element {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: FormItem
 * -------------------------------------------------------------------------- */

export const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & FormItemVariants
>(({ className, inline = false, ...props }, forwardedRef) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        className={twMerge(formItemVariants({ inline }), className)}
        ref={forwardedRef}
        {...props}
      />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = 'FormItem';

/* -----------------------------------------------------------------------------
 * Component: FormLabel
 * -------------------------------------------------------------------------- */

export const FormLabel = forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ ...props }, forwardedRef) => {
  const { formItemId } = useFormField();

  return <Label htmlFor={formItemId} ref={forwardedRef} {...props} />;
});

FormLabel.displayName = Label.displayName;

/* -----------------------------------------------------------------------------
 * Component: FormLabelNative
 * -------------------------------------------------------------------------- */

export const FormLabelNative = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ ...props }, forwardedRef) => {
  const { formItemId } = useFormField();

  return <label htmlFor={formItemId} ref={forwardedRef} {...props} />;
});

FormLabelNative.displayName = 'FormLabelNative';

/* -----------------------------------------------------------------------------
 * Component: FormControl
 * -------------------------------------------------------------------------- */

export const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>((props, forwardedRef) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      data-invalid={Boolean(error)}
      id={formItemId}
      ref={forwardedRef}
      {...props}
    />
  );
});

FormControl.displayName = 'FormControl';

/* -----------------------------------------------------------------------------
 * Component: FormDescription
 * -------------------------------------------------------------------------- */

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, forwardedRef) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className={twMerge('text-muted-foreground text-sm', className)}
      id={formDescriptionId}
      ref={forwardedRef}
      {...props}
    />
  );
});

FormDescription.displayName = 'FormDescription';

/* -----------------------------------------------------------------------------
 * Component: FormMessage
 * -------------------------------------------------------------------------- */

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, forwardedRef) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;

  return (
    <>
      {body ? (
        <p
          className={twMerge('text-destructive text-xs', className)}
          id={formMessageId}
          ref={forwardedRef}
          {...props}
        >
          {body}
        </p>
      ) : null}
    </>
  );
});

FormMessage.displayName = 'FormMessage';
