import type { VariantProps } from 'class-variance-authority';
import { cva, cx } from 'class-variance-authority';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/react/button';

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

type PrimitiveInputVariants = VariantProps<typeof primitiveInputVariants>;

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

type PrimitiveInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  PrimitiveInputVariants;

export const PrimitiveInput = forwardRef<HTMLInputElement, PrimitiveInputProps>(
  ({ className, size, inline, ...props }, forwardedRef) => (
    <input
      className={twMerge(primitiveInputVariants({ inline, size }), className)}
      ref={forwardedRef}
      {...props}
    />
  ),
);

PrimitiveInput.displayName = 'PrimitiveInput';

/* -----------------------------------------------------------------------------
 * Component: InputPassword
 * -------------------------------------------------------------------------- */

export const InputPassword = forwardRef<
  HTMLInputElement,
  Omit<PrimitiveInputProps, 'type'>
>(({ className, ...props }, forwardedRef) => {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? 'text' : 'password';
  const toggleShowPassword = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={cx('relative', props.inline && 'inline-block')}>
      <PrimitiveInput
        className={twMerge('pr-10.5', className)}
        ref={forwardedRef}
        type={type}
        {...props}
      />
      <Button
        className="right-1.25 absolute top-1/2 -translate-y-1/2"
        disabled={props.disabled}
        onClick={toggleShowPassword}
        shape="pill"
        size="sm"
        startIcon={
          type === 'password' ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />
        }
        variant="ghost"
      />
    </div>
  );
});

InputPassword.displayName = 'InputPassword';

/* -----------------------------------------------------------------------------
 * Component: Input
 * -------------------------------------------------------------------------- */

export const Input = forwardRef<
  HTMLInputElement,
  PrimitiveInputProps & {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    classNames?: {
      startIcon?: string;
      endIcon?: string;
      input?: string;
    };
  }
>(({ startIcon, endIcon, classNames, className, ...props }, forwardedRef) => (
  <div
    className={twMerge(
      'relative',
      props.inline ? 'inline-block' : 'w-full',
      className,
    )}
  >
    {startIcon ? (
      <span
        className={twMerge(
          'text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2',
          classNames?.startIcon,
        )}
        data-test-id="start-icon"
      >
        {startIcon}
      </span>
    ) : null}

    <PrimitiveInput
      className={twMerge(
        inputVariants({
          className: twMerge('max-h-full', classNames?.input),
          hasEndIcon: Boolean(endIcon),
          hasStartIcon: Boolean(startIcon),
        }),
      )}
      data-test-id="input"
      ref={forwardedRef}
      {...props}
    />

    {endIcon ? (
      <span
        className={twMerge(
          'text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2',
          classNames?.endIcon,
        )}
        data-test-id="end-icon"
      >
        {endIcon}
      </span>
    ) : null}
  </div>
));

Input.displayName = PrimitiveInput.displayName;
