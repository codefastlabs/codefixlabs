import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const primitiveInputVariants = cva(
  [
    'border-input min-w-0 rounded-md border bg-transparent px-3 py-2 text-base',
    'sm:text-sm sm:file:text-sm',
    'file:border-0 file:bg-transparent file:text-base file:font-medium',
    'placeholder:text-muted-foreground placeholder:text-sm',
    'ring-offset-background',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-invalid:border-destructive',
  ],
  {
    defaultVariants: {
      inline: false,
      size: 'md',
    },
    variants: {
      inline: {
        false: 'flex w-full',
        true: 'inline-flex',
      },
      size: {
        lg: 'h-12',
        md: 'h-10',
        sm: 'h-8 placeholder:text-xs',
      },
    },
  },
);
type PrimitiveInputVariantsProps = VariantProps<typeof primitiveInputVariants>;
const inputVariants = cva('relative', {
  defaultVariants: {
    hasEndIcon: false,
    hasStartIcon: false,
  },
  variants: {
    hasEndIcon: {
      true: 'pr-10.5',
    },
    hasStartIcon: {
      true: 'pl-10.5',
    },
  },
});

/* -----------------------------------------------------------------------------
 * Component: PrimitiveInput
 * -------------------------------------------------------------------------- */

export interface PrimitiveInputProps
  extends PrimitiveInputVariantsProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {}
export const PrimitiveInput = React.forwardRef<
  HTMLInputElement,
  PrimitiveInputProps
>(({ className, size, inline, ...props }, forwardedRef) => (
  <input
    className={cn(primitiveInputVariants({ inline, size }), className)}
    ref={forwardedRef}
    {...props}
  />
));
PrimitiveInput.displayName = 'PrimitiveInput';

/* -----------------------------------------------------------------------------
 * Component: Input
 * -------------------------------------------------------------------------- */

export interface InputProps extends PrimitiveInputProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  classNames?: {
    startIcon?: string;
    endIcon?: string;
    input?: string;
  };
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ startIcon, endIcon, classNames, className, ...props }, forwardedRef) => (
    <div
      className={cn(
        'relative',
        props.inline ? 'inline-block' : 'w-full',
        className,
      )}
    >
      {startIcon ? (
        <span
          className={cn(
            'text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2',
            classNames?.startIcon,
          )}
        >
          {startIcon}
        </span>
      ) : null}

      <PrimitiveInput
        className={cn(
          inputVariants({
            className: twMerge('max-h-full', classNames?.input),
            hasEndIcon: Boolean(endIcon),
            hasStartIcon: Boolean(startIcon),
          }),
        )}
        ref={forwardedRef}
        {...props}
      />

      {endIcon ? (
        <span
          className={cn(
            'text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2',
            classNames?.endIcon,
          )}
        >
          {endIcon}
        </span>
      ) : null}
    </div>
  ),
);
Input.displayName = 'Input';
