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
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AlertVariants
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
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
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
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, forwardedRef) => (
  <div
    className={twMerge('text-sm [&_p]:leading-relaxed', className)}
    ref={forwardedRef}
    {...props}
  />
));

AlertDescription.displayName = 'AlertDescription';
