import * as React from 'react';
import { ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Breadcrumb
 * -------------------------------------------------------------------------- */

export const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

/* -----------------------------------------------------------------------------
 * Component: BreadcrumbList
 * -------------------------------------------------------------------------- */

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.OlHTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

/* -----------------------------------------------------------------------------
 * Component: BreadcrumbItem
 * -------------------------------------------------------------------------- */

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

/* -----------------------------------------------------------------------------
 * Component: BreadcrumbLink
 * -------------------------------------------------------------------------- */

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

/* -----------------------------------------------------------------------------
 * Component: BreadcrumbPage
 * -------------------------------------------------------------------------- */

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('text-foreground font-normal', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

/* -----------------------------------------------------------------------------
 * Component: BreadcrumbSeparator
 * -------------------------------------------------------------------------- */

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>): React.JSX.Element {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

/* -----------------------------------------------------------------------------
 * Component: BreadcrumbEllipsis
 * -------------------------------------------------------------------------- */

export function BreadcrumbEllipsis({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <EllipsisIcon className="h-4 w-4" size={16} />
      <span className="sr-only">More</span>
    </span>
  );
}
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';
