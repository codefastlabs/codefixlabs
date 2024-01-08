import type { SlotProps as FormControlProps } from '@radix-ui/react-slot';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import type {
  ControllerProps as FormFieldProps,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import type { LabelProps as FormLabelProps } from '@/react/label';
import { Label } from '@/react/label';
import { cn } from '@/server/cn';

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

export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

export const FormItemContext = React.createContext<{
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
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
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

export { FormProvider as Form };

/* -----------------------------------------------------------------------------
 * Component: FormField
 * -------------------------------------------------------------------------- */

export type { FormFieldProps };

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>): React.JSX.Element {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: FormItem
 * -------------------------------------------------------------------------- */

export interface FormItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formItemVariants> {}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, inline = false, ...props }, forwardedRef) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          className={cn(formItemVariants({ inline }), className)}
          ref={forwardedRef}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);

FormItem.displayName = 'FormItem';

/* -----------------------------------------------------------------------------
 * Component: FormLabel
 * -------------------------------------------------------------------------- */

export type { FormLabelProps };

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FormLabelProps
>(({ ...props }, forwardedRef) => {
  const { formItemId } = useFormField();

  return <Label htmlFor={formItemId} ref={forwardedRef} {...props} />;
});

FormLabel.displayName = Label.displayName;

/* -----------------------------------------------------------------------------
 * Component: FormLabelNative
 * -------------------------------------------------------------------------- */

export type FormLabelNativeProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const FormLabelNative = React.forwardRef<
  HTMLLabelElement,
  FormLabelNativeProps
>(({ ...props }, forwardedRef) => {
  const { formItemId } = useFormField();

  return <label htmlFor={formItemId} ref={forwardedRef} {...props} />;
});

FormLabelNative.displayName = 'FormLabelNative';

/* -----------------------------------------------------------------------------
 * Component: FormControl
 * -------------------------------------------------------------------------- */

export type { FormControlProps };

export const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  FormControlProps
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

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, forwardedRef) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
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

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ children, className, ...props }, forwardedRef) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;

  return (
    <>
      {body ? (
        <p
          className={cn('text-destructive text-xs', className)}
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
