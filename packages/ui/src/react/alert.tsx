import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

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

/* -----------------------------------------------------------------------------
 * Component: Alert
 * -------------------------------------------------------------------------- */

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, forwardedRef) => (
    <div
      className={cn(alertVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    />
  ),
);

Alert.displayName = 'Alert';

/* -----------------------------------------------------------------------------
 * Component: AlertTitle
 * -------------------------------------------------------------------------- */

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <h5
      className={cn('mb-1 font-medium', className)}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </h5>
  ),
);

AlertTitle.displayName = 'AlertTitle';

/* -----------------------------------------------------------------------------
 * Component: AlertDescription
 * -------------------------------------------------------------------------- */

export type AlertDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export const AlertDescription = React.forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ className, ...props }, forwardedRef) => (
  <div
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    ref={forwardedRef}
    {...props}
  />
));

AlertDescription.displayName = 'AlertDescription';
