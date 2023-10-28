'use client';

import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Children, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { buttonVariants } from '@/cva/button';

/* -----------------------------------------------------------------------------
 * Component: Button
 * -------------------------------------------------------------------------- */

export const Button = forwardRef<
  React.ElementRef<'button'>,
  VariantProps<typeof buttonVariants> &
    React.ComponentPropsWithoutRef<'button'> & {
      endIcon?: React.ReactNode;
      startIcon?: React.ReactNode;
      loading?: boolean;
    }
>(
  (
    {
      children,
      className,
      variant,
      size,
      block,
      shape,
      justify,
      loading,
      startIcon,
      endIcon,
      icon,
      ...props
    },
    forwardedRef,
  ) => {
    return (
      <button
        className={twMerge(
          buttonVariants({
            block,
            icon: icon || !Children.count(children),
            justify,
            shape,
            size,
            variant,
          }),
          className,
        )}
        data-disabled={loading || props.disabled ? true : undefined}
        disabled={loading || props.disabled}
        ref={forwardedRef}
        type="button"
        {...props}
      >
        {startIcon}

        {children}

        {endIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
