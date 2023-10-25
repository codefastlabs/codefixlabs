'use client';

import type { VariantProps } from 'class-variance-authority';
import { cx } from 'class-variance-authority';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { IconType } from '@/react/icons';
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
    className={twMerge(primitiveInputVariants({ className, inline, size }))}
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
        startIcon={type === 'password' ? EyeIcon : EyeOffIcon}
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
    startIcon?: IconType;
    endIcon?: IconType;
    classNames?: {
      startIcon?: string;
      endIcon?: string;
      input?: string;
    };
  }
>(
  (
    { startIcon: StartIcon, endIcon: EndIcon, classNames, className, ...props },
    forwardedRef,
  ) => (
    <div
      className={twMerge(
        'relative',
        props.inline ? 'inline-block' : 'w-full',
        className,
      )}
    >
      {StartIcon ? (
        <StartIcon
          className={twMerge(
            'h-4.5 w-4.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2',
            classNames?.startIcon,
          )}
        />
      ) : null}

      <PrimitiveInput
        className={twMerge(
          inputVariants({
            className: twMerge('max-h-full', classNames?.input),
            hasEndIcon: Boolean(EndIcon),
            hasStartIcon: Boolean(StartIcon),
          }),
        )}
        ref={forwardedRef}
        {...props}
      />

      {EndIcon ? (
        <EndIcon
          className={twMerge(
            'h-4.5 w-4.5 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2',
            classNames?.endIcon,
          )}
        />
      ) : null}
    </div>
  ),
);

Input.displayName = PrimitiveInput.displayName;
