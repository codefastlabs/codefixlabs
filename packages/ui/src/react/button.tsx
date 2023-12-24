import * as React from 'react';
import { Children, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Loader2Icon } from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/classes/button';

/* -----------------------------------------------------------------------------
 * Component: Button
 * -------------------------------------------------------------------------- */

export const Button = forwardRef<
  HTMLButtonElement,
  VariantProps<typeof buttonVariants> &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
            <Loader2Icon className="animate-spin" size={18} />
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
  if (loading && children) {
    return <Loader2Icon className="animate-spin" size={16} />;
  }

  return <>{children}</>;
}
