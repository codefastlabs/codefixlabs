import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';
import { cx } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Slider
 * -------------------------------------------------------------------------- */

export const Slider = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={twMerge(
      'relative flex touch-none select-none items-center',
      'data-orientation-horizontal:h-5 data-orientation-horizontal:w-full',
      'data-orientation-vertical:h-full data-orientation-vertical:w-5 data-orientation-vertical:flex-col',
      'data-disabled:opacity-50',
      className,
    )}
    ref={forwardedRef}
    {...props}
  >
    <Track
      className={cx([
        'bg-secondary relative grow rounded-full',
        'data-orientation-horizontal:h-0.75',
        'data-orientation-vertical:w-0.75',
      ])}
    >
      <Range
        className={cx([
          'bg-primary absolute rounded-full',
          'data-disabled:bg-opacity-50',
          'data-orientation-horizontal:h-full data-orientation-vertical:w-full',
        ])}
      />
    </Track>
    <Thumb
      className={cx([
        'bg-background border-primary block size-5 rounded-full border-2 transition-colors',
        'data-orientation-horizontal:cursor-ew-resize data-orientation-vertical:cursor-ns-resize',
        'focus:ring-ring/40 focus:outline-none focus:ring-2',
      ])}
    />
  </Root>
));

Slider.displayName = Root.displayName;
