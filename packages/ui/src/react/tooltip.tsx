import {
  type TooltipArrowProps,
  type TooltipContentProps,
  type TooltipProps,
  type TooltipTriggerProps,
  Arrow,
  Content,
  Portal,
  Provider,
  Root,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Tooltip
 * -------------------------------------------------------------------------- */

export type { TooltipProps };

export function Tooltip(props: TooltipProps): React.JSX.Element {
  return (
    <Provider>
      <Root delayDuration={250} {...props} />
    </Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: TooltipArrow
 * -------------------------------------------------------------------------- */

export type { TooltipArrowProps };

export const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof Arrow>,
  TooltipArrowProps
>(({ className, ...props }, forwardedRef) => (
  <Arrow
    className={cn('fill-popover', className)}
    ref={forwardedRef}
    {...props}
  />
));

TooltipArrow.displayName = Arrow.displayName;

/* -----------------------------------------------------------------------------
 * Component: TooltipTrigger
 * -------------------------------------------------------------------------- */

export { TooltipTrigger };
export type { TooltipTriggerProps };

/* -----------------------------------------------------------------------------
 * Component: TooltipContent
 * -------------------------------------------------------------------------- */

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  TooltipContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Portal>
    <Content
      className={cn(
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
