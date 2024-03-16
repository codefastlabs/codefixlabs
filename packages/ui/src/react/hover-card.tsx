import {
  type HoverCardArrowProps,
  type HoverCardContentProps,
  type HoverCardProps,
  type HoverCardTriggerProps,
  Arrow,
  Content,
  HoverCard,
  HoverCardTrigger,
  Portal,
} from '@radix-ui/react-hover-card';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: HoverCard
 * -------------------------------------------------------------------------- */

export { HoverCard };
export type { HoverCardProps };

/* -----------------------------------------------------------------------------
 * Component: HoverCardTrigger
 * -------------------------------------------------------------------------- */

export { HoverCardTrigger };
export type { HoverCardTriggerProps };

/* -----------------------------------------------------------------------------
 * Component: HoverCardContent
 * -------------------------------------------------------------------------- */

export type { HoverCardContentProps };

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  HoverCardContentProps
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:data-[side=top]:animate-slide-in-from-bottom data-[state=open]:data-[side=bottom]:animate-slide-in-from-top data-[state=open]:data-[side=left]:animate-slide-in-from-right data-[state=open]:data-[side=right]:animate-slide-in-from-left data-[state=closed]:data-[side=top]:animate-slide-out-to-bottom data-[state=closed]:data-[side=bottom]:animate-slide-out-to-top data-[state=closed]:data-[side=left]:animate-slide-out-to-right data-[state=closed]:data-[side=right]:animate-slide-out-to-left relative z-40 rounded-md border p-4 shadow-lg will-change-[opacity,transform]',
        className,
      )}
      ref={forwardedRef}
      sideOffset={5}
      {...props}
    />
  </Portal>
));

HoverCardContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: HoverCardArrow
 * -------------------------------------------------------------------------- */

export type { HoverCardArrowProps };

export const HoverCardArrow = React.forwardRef<
  React.ElementRef<typeof Arrow>,
  HoverCardArrowProps
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={cn('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

HoverCardArrow.displayName = Arrow.displayName;
