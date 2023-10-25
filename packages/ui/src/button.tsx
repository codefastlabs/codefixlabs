'use client';

import type { VariantProps } from 'class-variance-authority';
import { Loader2Icon } from 'lucide-react';
import * as React from 'react';
import { Children, forwardRef, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { buttonVariants, innerButtonVariants } from './cva';
import type { IconType } from './icons';

/* -----------------------------------------------------------------------------
 * Component: Button
 * -------------------------------------------------------------------------- */

export const Button = forwardRef<
  React.ElementRef<'button'>,
  VariantProps<typeof buttonVariants> &
    React.ComponentPropsWithoutRef<'button'> & {
      endIcon?: IconType;
      startIcon?: IconType;
      classNames?: {
        startIcon?: string;
        endIcon?: string;
      };
      loading?: boolean;
    }
>(
  (
    {
      children,
      className,
      classNames,
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
    const StartIcon = useMemo(() => {
      if (loading && (startIcon || !endIcon)) {
        return Loader2Icon;
      }

      return startIcon;
    }, [startIcon, endIcon, loading]);

    const EndIcon = useMemo(() => {
      if (loading && !startIcon && endIcon) {
        return Loader2Icon;
      }

      return endIcon;
    }, [startIcon, endIcon, loading]);

    const hasIcon = useMemo(() => {
      return Boolean(startIcon) || Boolean(endIcon);
    }, [startIcon, endIcon]);

    return (
      <button
        className={twMerge(
          buttonVariants({
            block,
            className,
            icon: icon || !Children.count(children),
            justify,
            shape,
            size,
            variant,
          }),
        )}
        data-disabled={loading || props.disabled ? true : undefined}
        disabled={loading || props.disabled}
        ref={forwardedRef}
        type="button"
        {...props}
      >
        {StartIcon ? (
          <StartIcon
            className={twMerge(
              innerButtonVariants({
                loading,
              }),
              classNames?.startIcon,
              !hasIcon && 'absolute',
            )}
          />
        ) : null}

        {children && !hasIcon && loading ? (
          <span className="opacity-0">{children}</span>
        ) : (
          children
        )}

        {EndIcon ? (
          <EndIcon
            className={twMerge(
              innerButtonVariants({
                className: classNames?.endIcon,
                loading: loading && !startIcon,
              }),
            )}
          />
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
