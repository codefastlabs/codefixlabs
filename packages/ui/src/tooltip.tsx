import {
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  Trigger,
} from '@radix-ui/react-tooltip';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Tooltip
 * -------------------------------------------------------------------------- */

export function Tooltip(
  props: React.ComponentPropsWithoutRef<typeof Root>,
): React.JSX.Element {
  return (
    <Provider>
      <Root delayDuration={250} {...props} />
    </Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: TooltipTrigger
 * -------------------------------------------------------------------------- */

/* -----------------------------------------------------------------------------
 * Component: TooltipArrow
 * -------------------------------------------------------------------------- */

export const TooltipArrow = forwardRef<
  React.ElementRef<typeof Arrow>,
  React.ComponentPropsWithoutRef<typeof Arrow>
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={twMerge('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

TooltipArrow.displayName = Arrow.displayName;

export const TooltipTrigger = Trigger;

/* -----------------------------------------------------------------------------
 * Component: TooltipContent
 * -------------------------------------------------------------------------- */

export const TooltipContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={twMerge(
        [
          'bg-popover text-popover-foreground relative z-40 w-auto select-none rounded-md px-3 py-1.5 text-sm drop-shadow will-change-[transform,opacity]',
          [
            'data-state-delayed-open:data-side-top:animate-slide-in-from-bottom',
            'data-state-delayed-open:data-side-bottom:animate-slide-in-from-top',
            'data-state-delayed-open:data-side-left:animate-slide-in-from-right',
            'data-state-delayed-open:data-side-right:animate-slide-in-from-left',
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
    >
      <>
        {children}
        <TooltipArrow />
      </>
    </Content>
  </Portal>
));

TooltipContent.displayName = Content.displayName;
