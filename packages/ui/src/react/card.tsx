import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Card
 * -------------------------------------------------------------------------- */

export const Card = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'>
>(({ className, ...props }, forwardedRef) => (
  <section
    className={twMerge(
      'bg-card text-card-foreground shadow-border shadow-box rounded',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

Card.displayName = 'Card';

/* -----------------------------------------------------------------------------
 * Component: CardHeader
 * -------------------------------------------------------------------------- */

export const CardHeader = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'>
>(({ className, ...props }, forwardedRef) => (
  <header
    className={twMerge(
      'flex flex-col gap-1.5 rounded-t border-b px-6 py-3',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

/* -----------------------------------------------------------------------------
 * Component: CardFooter
 * -------------------------------------------------------------------------- */

export const CardFooter = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'>
>(({ className, ...props }, forwardedRef) => (
  <footer
    className={twMerge(
      'flex items-center rounded-b border-t px-6 py-3',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

/* -----------------------------------------------------------------------------
 * Component: CardTitle
 * -------------------------------------------------------------------------- */

export const CardTitle = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'>
>(({ className, ...props }, forwardedRef) => (
  <div
    className={twMerge('text-lg font-semibold', className)}
    ref={forwardedRef}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

/* -----------------------------------------------------------------------------
 * Component: CardDescription
 * -------------------------------------------------------------------------- */

export const CardDescription = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'>
>(({ className, ...props }, forwardedRef) => (
  <div
    className={twMerge('text-muted-foreground text-sm', className)}
    ref={forwardedRef}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

/* -----------------------------------------------------------------------------
 * Component: CardContent
 * -------------------------------------------------------------------------- */

export const CardContent = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'>
>(({ className, ...props }, forwardedRef) => (
  <main className={twMerge('p-6', className)} ref={forwardedRef} {...props} />
));

CardContent.displayName = 'CardContent';
