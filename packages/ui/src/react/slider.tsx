import {
  type SliderProps,
  Range,
  Root,
  Thumb,
  Track,
} from '@radix-ui/react-slider';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Slider
 * -------------------------------------------------------------------------- */

export type { SliderProps };

export const Slider = React.forwardRef<
  React.ElementRef<typeof Root>,
  SliderProps
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={cn(
      'relative flex touch-none select-none items-center data-[orientation=horizontal]:h-5 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col data-[disabled]:opacity-50',
      className,
    )}
    ref={forwardedRef}
    {...props}
  >
    <Track className="bg-secondary data-[orientation=horizontal]:h-0.75 data-[orientation=vertical]:w-0.75 relative grow rounded-full">
      <Range className="bg-primary data-orientation-vertical:w-full absolute rounded-full data-[orientation=horizontal]:h-full data-[disabled]:bg-opacity-50" />
    </Track>
    <Thumb className="bg-background border-primary ring-offset-background focus-visible:ring-ring block size-5 cursor-pointer rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" />
  </Root>
));

Slider.displayName = Root.displayName;
