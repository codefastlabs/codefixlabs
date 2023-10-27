'use client';

import type { VariantProps } from 'class-variance-authority';
import { Children, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Loader2Icon } from 'lucide-react';
import type { innerButtonVariants } from '@/cva';
import { buttonVariants } from '@/cva';

/* -----------------------------------------------------------------------------
 * Component: Button
 * -------------------------------------------------------------------------- */

export const Button = forwardRef<
  React.ElementRef<'button'>,
  VariantProps<typeof buttonVariants> &
    VariantProps<typeof innerButtonVariants> &
    React.ComponentPropsWithoutRef<'button'> & {
      endIcon?: React.ReactNode;
      startIcon?: React.ReactNode;
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

        {children ? (
          <span className={loading ? 'opacity-0' : undefined}>{children}</span>
        ) : null}

        {endIcon}

        {loading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2Icon className="h-4 w-4 animate-spin" />
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
