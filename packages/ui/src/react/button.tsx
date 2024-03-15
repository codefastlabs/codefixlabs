import * as React from 'react';
import { Loader2Icon } from 'lucide-react';
import {
  buttonVariants,
  type ButtonVariantsProps,
} from '@/server/button-variants';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Button
 * -------------------------------------------------------------------------- */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantsProps {
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      block,
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
        className={cn(
          buttonVariants({
            block,
            icon: icon ?? !React.Children.count(children),
            size,
            variant,
          }),
          className,
        )}
        disabled={loading ?? props.disabled}
        ref={forwardedRef}
        type="button"
        {...props}
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
