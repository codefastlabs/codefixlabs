import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { Loader2Icon } from 'lucide-react';
import * as React from 'react';
import { Children, forwardRef, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import type { IconType } from './icons';

/* -----------------------------------------------------------------------------
 * Component: Button
 * -------------------------------------------------------------------------- */

type ButtonSize = 'lg' | 'md' | 'sm';

type ButtonVariant =
  | 'destructive'
  | 'ghost'
  | 'outline'
  | 'primary'
  | 'secondary';

const sizes: {
  icon: boolean;
  sizes: {
    className: ClassValue;
    size: ButtonSize;
    variant: ButtonVariant[];
  }[];
}[] = [
  {
    icon: true,
    sizes: [
      {
        className: 'px-2 h-8',
        size: 'sm',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-1.75 h-8',
        size: 'sm',
        variant: ['outline'],
      },
      // ---
      {
        className: 'px-3 h-10',
        size: 'md',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-2.75 h-10',
        size: 'md',
        variant: ['outline'],
      },
      // ---
      {
        className: 'px-4 h-12',
        size: 'lg',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-3.75 h-12',
        size: 'lg',
        variant: ['outline'],
      },
    ],
  },
  {
    icon: false,
    sizes: [
      {
        className: 'px-4 h-8',
        size: 'sm',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-3.75 h-8',
        size: 'sm',
        variant: ['outline'],
      },
      // ---
      {
        className: 'px-5 h-10',
        size: 'md',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-4.75 h-10',
        size: 'md',
        variant: ['outline'],
      },
      // ---
      {
        className: 'px-6 h-12',
        size: 'lg',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-5.75 h-12',
        size: 'lg',
        variant: ['outline'],
      },
    ],
  },
];

// Flatten the array and group variants if the size is the same
const compoundSizes = sizes.flatMap<{
  className: ClassValue;
  icon: boolean;
  size: ButtonSize;
  variant: ButtonVariant[];
}>(({ icon, sizes: _sizes }) =>
  _sizes.map(({ variant, size, className }) => ({
    className,
    icon,
    size,
    variant,
  })),
);

export const buttonVariants = cva(
  [
    'relative select-none items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'data-disabled:cursor-not-allowed',
  ],
  {
    compoundVariants: [
      {
        className: 'data-disabled:bg-opacity-50',
        variant: ['primary', 'secondary', 'destructive'],
      },
      {
        className: 'data-disabled:opacity-50',
        variant: ['ghost', 'outline'],
      },
      ...compoundSizes,
    ],
    defaultVariants: {
      block: false,
      icon: false,
      justify: 'center',
      shape: 'rounded',
      size: 'md',
      variant: 'primary',
    },
    variants: {
      block: {
        false: 'inline-flex',
        true: 'flex w-full',
      },
      icon: {
        false: '',
        true: '',
      },
      justify: {
        between: 'justify-between',
        center: 'justify-center',
      },
      shape: {
        pill: 'rounded-full',
        rounded: 'rounded-md',
        square: 'rounded-sm',
      },
      size: {
        lg: '',
        md: '',
        sm: '',
      },
      variant: {
        destructive:
          'bg-destructive text-destructive-foreground [&:not([data-disabled])]:hover:bg-destructive/90',
        ghost: '[&:not([data-disabled])]:hover:bg-accent',
        link: 'text-primary rounded-none hover:underline',
        outline:
          'border-input [&:not([data-disabled])]:hover:bg-accent [&:not([data-disabled])]:hover:text-accent-foreground border',
        primary:
          'bg-primary text-primary-foreground [&:not([data-disabled])]:hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground [&:not([data-disabled])]:hover:bg-secondary/90',
      },
    },
  },
);

const innerButtonVariants = cva('h-4 w-4 shrink-0 text-base text-opacity-100', {
  defaultVariants: {
    loading: false,
  },
  variants: {
    loading: {
      false: undefined,
      true: 'animate-spin',
    },
  },
});

export const Button = forwardRef<
  React.ElementRef<'button'>,
  VariantProps<typeof buttonVariants> &
    React.ComponentPropsWithoutRef<'button'> &
    VariantProps<typeof innerButtonVariants> & {
      endIcon?: IconType;
      startIcon?: IconType;
      classNames?: {
        startIcon?: string;
        endIcon?: string;
      };
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
