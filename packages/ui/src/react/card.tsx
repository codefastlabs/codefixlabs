import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Card
 * -------------------------------------------------------------------------- */

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, forwardedRef) => (
    <section
      className={cn(
        'bg-card text-card-foreground shadow-border shadow-box rounded',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  ),
);

Card.displayName = 'Card';

/* -----------------------------------------------------------------------------
 * Component: CardHeader
 * -------------------------------------------------------------------------- */

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, forwardedRef) => (
    <header
      className={cn(
        'flex flex-col gap-1.5 rounded-t border-b px-6 py-3',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  ),
);

CardHeader.displayName = 'CardHeader';

/* -----------------------------------------------------------------------------
 * Component: CardFooter
 * -------------------------------------------------------------------------- */

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, forwardedRef) => (
    <footer
      className={cn(
        'flex items-center rounded-b border-t px-6 py-3',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  ),
);

CardFooter.displayName = 'CardFooter';

/* -----------------------------------------------------------------------------
 * Component: CardTitle
 * -------------------------------------------------------------------------- */

export type CardTitleProps = React.HTMLAttributes<HTMLDivElement>;

export const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, ...props }, forwardedRef) => (
    <div
      className={cn('text-lg font-semibold', className)}
      ref={forwardedRef}
      {...props}
    />
  ),
);

CardTitle.displayName = 'CardTitle';

/* -----------------------------------------------------------------------------
 * Component: CardDescription
 * -------------------------------------------------------------------------- */

export type CardDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export const CardDescription = React.forwardRef<
  HTMLDivElement,
  CardDescriptionProps
>(({ className, ...props }, forwardedRef) => (
  <div
    className={cn('text-muted-foreground text-sm', className)}
    ref={forwardedRef}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

/* -----------------------------------------------------------------------------
 * Component: CardBody
 * -------------------------------------------------------------------------- */

export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, forwardedRef) => (
    <main className={cn('p-6', className)} ref={forwardedRef} {...props} />
  ),
);

CardBody.displayName = 'CardBody';
