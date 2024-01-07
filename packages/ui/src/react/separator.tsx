import type { SeparatorProps } from '@radix-ui/react-separator';
import { Root } from '@radix-ui/react-separator';
import * as React from 'react';
import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------
 * Component: Separator
 * -------------------------------------------------------------------------- */

export type { SeparatorProps };

export const Separator = React.forwardRef<
  React.ElementRef<typeof Root>,
  SeparatorProps
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={cn(
      'bg-border relative inline-flex shrink-0 items-center justify-center',
      props.orientation === 'vertical'
        ? 'mx-2 h-full w-px'
        : 'my-2 h-px w-full',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

Separator.displayName = Root.displayName;
