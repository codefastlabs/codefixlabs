import { Indicator, Root } from '@radix-ui/react-progress';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Progress
 * -------------------------------------------------------------------------- */

export const Progress = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, style, ...props }, forwardedRef) => (
  <Root
    className={twMerge(
      'bg-secondary relative h-4 overflow-hidden rounded-full',
      className,
    )}
    ref={forwardedRef}
    style={{ ...style, transform: 'translateZ(0)' }}
    {...props}
  >
    <Indicator
      className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] bg-primary size-full transition-transform duration-500"
      style={{ transform: `translateX(-${100 - (props.value || 0)}%)` }}
    />
  </Root>
));

Progress.displayName = 'Progress';
