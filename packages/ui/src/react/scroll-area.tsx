import {
  type ScrollAreaCornerProps,
  type ScrollAreaProps,
  type ScrollAreaScrollbarProps,
  type ScrollAreaThumbProps,
  type ScrollAreaViewportProps,
  Corner,
  Root,
  Scrollbar,
  Thumb,
  Viewport,
} from '@radix-ui/react-scroll-area';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: ScrollAreaViewport
 * -------------------------------------------------------------------------- */

export type { ScrollAreaViewportProps };

export const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof Viewport>,
  ScrollAreaViewportProps
>(({ className, ...props }, forwardedRef) => (
  <Viewport
    className={cn('rounded-inherit size-full', className)}
    ref={forwardedRef}
    {...props}
  />
));

ScrollAreaViewport.displayName = Viewport.displayName;

/* -----------------------------------------------------------------------------
 * Component: ScrollAreaScrollbar
 * -------------------------------------------------------------------------- */

export type { ScrollAreaScrollbarProps };

export const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof Scrollbar>,
  ScrollAreaScrollbarProps
>(({ className, ...props }, forwardedRef) => (
  <Scrollbar
    className={cn(
      'z-50 flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out',
      'data-orientation-horizontal:h-2.5 data-orientation-horizontal:flex-col',
      'data-orientation-vertical:w-2.5',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

ScrollAreaScrollbar.displayName = Scrollbar.displayName;

/* -----------------------------------------------------------------------------
 * Component: ScrollAreaThumb
 * -------------------------------------------------------------------------- */

export type { ScrollAreaThumbProps };

export const ScrollAreaThumb = React.forwardRef<
  React.ElementRef<typeof Thumb>,
  ScrollAreaThumbProps
>(({ className, ...props }, forwardedRef) => (
  <Thumb
    className={cn(
      'bg-border relative flex-1 rounded-full',
      'before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-11 before:w-full before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

ScrollAreaThumb.displayName = Thumb.displayName;

/* -----------------------------------------------------------------------------
 * Component: ScrollAreaCorner
 * -------------------------------------------------------------------------- */

export type { ScrollAreaCornerProps };

export const ScrollAreaCorner = React.forwardRef<
  React.ElementRef<typeof Corner>,
  ScrollAreaCornerProps
>(({ className, ...props }, forwardedRef) => (
  <Corner
    className={cn('rounded-tl-md bg-black/20', className)}
    ref={forwardedRef}
    {...props}
  />
));

ScrollAreaCorner.displayName = Corner.displayName;

/* -----------------------------------------------------------------------------
 * Component: ScrollArea
 * -------------------------------------------------------------------------- */

export type { ScrollAreaProps };

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof Root>,
  ScrollAreaProps
>(({ children, className, ...props }, forwardedRef) => (
  <Root
    className={cn('relative overflow-hidden', className)}
    ref={forwardedRef}
    {...props}
  >
    <>
      <ScrollAreaViewport>{children}</ScrollAreaViewport>

      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>

      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>

      <ScrollAreaCorner />
    </>
  </Root>
));

ScrollArea.displayName = Root.displayName;
