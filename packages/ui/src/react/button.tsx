import * as React from 'react';
import { Children, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Loader2Icon } from 'lucide-react';
import type { ButtonVariants } from '@/classes/button';
import { buttonVariants } from '@/classes/button';

/* -----------------------------------------------------------------------------
 * Component: Button
 * -------------------------------------------------------------------------- */

export interface ButtonProps
  extends ButtonVariants,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
        type="button"
        {...props}
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
        disabled={loading || props.disabled}
        ref={forwardedRef}
      >
        {startIcon}

        {children}

        {endIcon}

        {loading ? (
          <span
            className="rounded-inherit absolute inset-0 z-10 flex items-center justify-center"
            data-slot="loading"
          >
            <Loader2Icon className="animate-spin" size={18} />
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
