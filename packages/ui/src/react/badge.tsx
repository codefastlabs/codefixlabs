import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import * as React from 'react';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
  {
    defaultVariants: {
      variant: 'primary',
    },
    variants: {
      variant: {
        destructive:
          'bg-destructive text-destructive-foreground border-transparent',
        outline: 'border-input',
        primary: 'bg-primary text-primary-foreground border-transparent',
        secondary: 'bg-secondary text-secondary-foreground border-transparent',
      },
    },
  },
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

/* -----------------------------------------------------------------------------
 * Component: Badge
 * -------------------------------------------------------------------------- */

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & BadgeVariants): React.JSX.Element {
  return (
    <div
      className={twMerge(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
