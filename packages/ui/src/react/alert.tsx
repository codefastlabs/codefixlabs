import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const alertVariants = cva(
  [
    'relative w-full rounded-lg border p-4',
    '[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
    '[&>svg+div]:-translate-y-0.75',
    '[&:has(svg)]:pl-11',
  ],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: ['bg-background text-foreground', '[&>svg]:text-foreground'],
        destructive: [
          'border-destructive/50 text-destructive dark:border-destructive',
          '[&>svg]:text-destructive',
        ],
      },
    },
  },
);

type AlertVariants = VariantProps<typeof alertVariants>;

/* -----------------------------------------------------------------------------
 * Component: Alert
 * -------------------------------------------------------------------------- */

export const Alert = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'> & AlertVariants
>(({ className, variant, ...props }, forwardedRef) => (
  <div
    className={twMerge(alertVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

Alert.displayName = 'Alert';

/* -----------------------------------------------------------------------------
 * Component: AlertTitle
 * -------------------------------------------------------------------------- */

export const AlertTitle = forwardRef<
  React.ElementRef<'h5'>,
  React.ComponentProps<'h5'>
>(({ children, className, ...props }, forwardedRef) => (
  <h5
    className={twMerge('mb-1 font-medium', className)}
    ref={forwardedRef}
    {...props}
  >
    {children}
  </h5>
));

AlertTitle.displayName = 'AlertTitle';

/* -----------------------------------------------------------------------------
 * Component: AlertDescription
 * -------------------------------------------------------------------------- */

export const AlertDescription = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'>
>(({ className, ...props }, forwardedRef) => (
  <div
    className={twMerge('text-sm [&_p]:leading-relaxed', className)}
    ref={forwardedRef}
    {...props}
  />
));

AlertDescription.displayName = 'AlertDescription';
