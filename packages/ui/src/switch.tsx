import { Root, Thumb } from '@radix-ui/react-switch';
import { cx } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
/* -----------------------------------------------------------------------------
 * Exported components
 * -------------------------------------------------------------------------- */

/* -----------------------------------------------------------------------------
 * Component: Switch
 * -------------------------------------------------------------------------- */

export const Switch = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={twMerge(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
      'focus:ring-ring/40 focus:outline-none focus:ring-2',
      'data-state-unchecked:bg-input',
      'data-state-checked:bg-primary',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    ref={forwardedRef}
    {...props}
  >
    <Thumb
      className={cx(
        'bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg transition-transform',
        'data-state-checked:translate-x-5',
        'data-state-unchecked:translate-x-0',
      )}
    />
  </Root>
));

Switch.displayName = Root.displayName;
