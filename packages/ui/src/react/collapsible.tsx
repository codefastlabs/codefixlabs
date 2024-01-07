import type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from '@radix-ui/react-collapsible';
import {
  Collapsible,
  CollapsibleTrigger,
  Content,
} from '@radix-ui/react-collapsible';
import * as React from 'react';
import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------
 * Component: Collapsible
 * -------------------------------------------------------------------------- */

export { Collapsible };
export type { CollapsibleProps };

/* -----------------------------------------------------------------------------
 * Component: CollapsibleTrigger
 * -------------------------------------------------------------------------- */

export { CollapsibleTrigger };
export type { CollapsibleTriggerProps };

/* -----------------------------------------------------------------------------
 * Component: CollapsibleContent
 * -------------------------------------------------------------------------- */

export type { CollapsibleContentProps };

export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  CollapsibleContentProps
>(({ className, ...props }, forwardedRef) => (
  <Content
    className={cn(
      'overflow-hidden',
      'data-state-open:animate-collapsible-down data-state-closed:animate-collapsible-up',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CollapsibleContent.displayName = Content.displayName;
