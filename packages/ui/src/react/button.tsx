import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Children, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Loader2Icon } from 'lucide-react';
import { buttonVariants } from '@/classes/button';

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
        <IconButton loading={loading}>{startIcon}</IconButton>

        {children}

        <IconButton loading={loading ? !startIcon : false}>
          {endIcon}
        </IconButton>

        {loading && !(startIcon || endIcon) ? (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <Loader2Icon className="h-4.5 w-4.5 animate-spin" />
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';

/* -----------------------------------------------------------------------------
 * Component: IconButton
 * -------------------------------------------------------------------------- */

export function IconButton({
  children,

  loading,
}: {
  children: React.ReactNode;
  loading?: boolean;
}): React.JSX.Element {
  return (
    <>
      {loading && children ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        children
      )}
    </>
  );
}
