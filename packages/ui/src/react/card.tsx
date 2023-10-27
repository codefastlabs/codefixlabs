'use client';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Card
 * -------------------------------------------------------------------------- */

export const Card = forwardRef<
  React.ElementRef<'div'>,
  React.ComponentProps<'div'>
>(({ className, ...props }, forwardedRef) => (
  <div
    className={twMerge(
      'bg-card text-card-foreground overflow-hidden rounded-lg border shadow-lg',
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
  <div
    className={twMerge('flex flex-col gap-1.5 p-6', className)}
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
  <div
    className={twMerge('flex items-center p-6', className)}
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
    className={twMerge(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
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
  <div className={twMerge('px-6', className)} ref={forwardedRef} {...props} />
));

CardContent.displayName = 'CardContent';
