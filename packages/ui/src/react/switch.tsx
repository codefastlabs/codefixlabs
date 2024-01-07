import type { SwitchProps } from '@radix-ui/react-switch';
import { Root, Thumb } from '@radix-ui/react-switch';
import * as React from 'react';
import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------
 * Component: Switch
 * -------------------------------------------------------------------------- */

export type { SwitchProps };

export const Switch = React.forwardRef<
  React.ElementRef<typeof Root>,
  SwitchProps
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
      'ring-offset-background',
      'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'data-state-unchecked:bg-input',
      'data-state-checked:bg-primary',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    ref={forwardedRef}
    {...props}
  >
    <Thumb
      className={cn(
        'bg-background pointer-events-none block size-5 rounded-full shadow-lg transition-transform',
        'data-state-checked:translate-x-5',
        'data-state-unchecked:translate-x-0',
      )}
    />
  </Root>
));

Switch.displayName = Root.displayName;
