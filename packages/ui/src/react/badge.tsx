import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/server/cn';

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

/* -----------------------------------------------------------------------------
 * Component: Badge
 * -------------------------------------------------------------------------- */

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({
  className,
  variant,
  ...props
}: BadgeProps): React.JSX.Element {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
