'use client';

import {
  Corner,
  Root,
  Scrollbar,
  Thumb,
  Viewport,
} from '@radix-ui/react-scroll-area';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge'; /* -----------------------------------------------------------------------------
 * Component: ScrollAreaViewport
 * -------------------------------------------------------------------------- */

/* -----------------------------------------------------------------------------
 * Component: ScrollAreaViewport
 * -------------------------------------------------------------------------- */

export const ScrollAreaViewport = forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport>
>(({ className, ...props }, forwardedRef) => (
  <Viewport
    className={twMerge('rounded-inherit h-full w-full', className)}
    ref={forwardedRef}
    {...props}
  />
));

ScrollAreaViewport.displayName = Viewport.displayName;

/* -----------------------------------------------------------------------------
 * Component: ScrollAreaScrollbar
 * -------------------------------------------------------------------------- */

export const ScrollAreaScrollbar = forwardRef<
  React.ElementRef<typeof Scrollbar>,
  React.ComponentPropsWithoutRef<typeof Scrollbar>
>(({ className, ...props }, forwardedRef) => (
  <Scrollbar
    className={twMerge(
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

export const ScrollAreaThumb = forwardRef<
  React.ElementRef<typeof Thumb>,
  React.ComponentPropsWithoutRef<typeof Thumb>
>(({ className, ...props }, forwardedRef) => (
  <Thumb
    className={twMerge(
      'bg-border relative flex-1 rounded-full',
      'before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2',
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

export const ScrollAreaCorner = forwardRef<
  React.ElementRef<typeof Corner>,
  React.ComponentPropsWithoutRef<typeof Corner>
>(({ className, ...props }, forwardedRef) => (
  <Corner
    className={twMerge('rounded-tl-md bg-black/20', className)}
    ref={forwardedRef}
    {...props}
  />
));

ScrollAreaCorner.displayName = Corner.displayName;

/* -----------------------------------------------------------------------------
 * Component: ScrollArea
 * -------------------------------------------------------------------------- */

export const ScrollArea = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ children, className, ...props }, forwardedRef) => (
  <Root
    className={twMerge('relative overflow-hidden', className)}
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
