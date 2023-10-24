import {
  Arrow,
  Content,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-hover-card';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: HoverCard
 * -------------------------------------------------------------------------- */

export const HoverCard = Root;

/* -----------------------------------------------------------------------------
 * Component: HoverCardTrigger
 * -------------------------------------------------------------------------- */

export const HoverCardTrigger = Trigger;

/* -----------------------------------------------------------------------------
 * Component: HoverCardContent
 * -------------------------------------------------------------------------- */

export const HoverCardContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={twMerge(
        [
          'bg-popover text-popover-foreground relative z-40 rounded-md border p-4 shadow-lg will-change-[opacity,transform]',
          [
            'data-state-open:data-side-top:animate-slide-in-from-bottom',
            'data-state-open:data-side-bottom:animate-slide-in-from-top',
            'data-state-open:data-side-left:animate-slide-in-from-right',
            'data-state-open:data-side-right:animate-slide-in-from-left',
          ],
          [
            'data-state-closed:data-side-top:animate-slide-out-to-bottom',
            'data-state-closed:data-side-bottom:animate-slide-out-to-top',
            'data-state-closed:data-side-left:animate-slide-out-to-right',
            'data-state-closed:data-side-right:animate-slide-out-to-left',
          ],
        ],
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

export const HoverCardArrow = forwardRef<
  React.ElementRef<typeof Arrow>,
  React.ComponentPropsWithoutRef<typeof Arrow>
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={twMerge('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

HoverCardArrow.displayName = Arrow.displayName;
