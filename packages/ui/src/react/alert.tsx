import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { alertVariants } from '@/classes/alert';

/* -----------------------------------------------------------------------------
 * Component: Alert
 * -------------------------------------------------------------------------- */

export const Alert = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'> & VariantProps<typeof alertVariants>
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
    className={twMerge(
      'mb-1 font-medium leading-none tracking-tight',
      className,
    )}
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
