import type { VariantProps } from 'class-variance-authority';
import { cx } from 'class-variance-authority';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@/react/button';
import { inputVariants, primitiveInputVariants } from '@/cva/input';

/* -----------------------------------------------------------------------------
 * Component: PrimitiveInput
 * -------------------------------------------------------------------------- */

export const PrimitiveInput = forwardRef<
  React.ElementRef<'input'>,
  Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> &
    VariantProps<typeof primitiveInputVariants>
>(({ className, size, inline, ...props }, forwardedRef) => (
  <input
    className={twMerge(primitiveInputVariants({ inline, size }), className)}
    ref={forwardedRef}
    {...props}
  />
));

PrimitiveInput.displayName = 'PrimitiveInput';

/* -----------------------------------------------------------------------------
 * Component: InputPassword
 * -------------------------------------------------------------------------- */

export const InputPassword = forwardRef<
  React.ElementRef<typeof PrimitiveInput>,
  Omit<React.ComponentPropsWithoutRef<typeof PrimitiveInput>, 'type'>
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
          type === 'password' ? (
            <EyeIcon className="h-4 w-4" />
          ) : (
            <EyeOffIcon className="h-4 w-4" />
          )
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
  React.ElementRef<typeof PrimitiveInput>,
  React.ComponentPropsWithoutRef<typeof PrimitiveInput> & {
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
      ref={forwardedRef}
      {...props}
    />

    {endIcon ? (
      <span
        className={twMerge(
          'text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2',
          classNames?.endIcon,
        )}
      >
        {endIcon}
      </span>
    ) : null}
  </div>
));

Input.displayName = PrimitiveInput.displayName;
