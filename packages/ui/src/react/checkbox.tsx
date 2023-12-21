import { Indicator, Root } from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: CheckboxIndicator
 * -------------------------------------------------------------------------- */

export const CheckboxIndicator = forwardRef<
  React.ElementRef<typeof Indicator>,
  React.ComponentPropsWithoutRef<typeof Indicator>
>(({ className, ...props }, forwardedRef) => (
  <Indicator
    className={twMerge(
      'flex items-center justify-center fill-current text-current',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CheckboxIndicator.displayName = Indicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: Checkbox
 * -------------------------------------------------------------------------- */

export const Checkbox = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={twMerge(
      'border-muted-foreground size-4.25 peer flex shrink-0 items-center justify-center rounded-[0.25rem] border',
      'focus:ring-ring/40 focus:outline-none focus:ring-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-state-checked:border-primary data-state-checked:bg-primary data-state-checked:text-primary-foreground',
      'data-state-indeterminate:border-primary data-state-indeterminate:bg-primary data-state-indeterminate:text-primary-foreground',
      className,
    )}
    ref={forwardedRef}
    {...props}
  >
    <CheckboxIndicator>
      {props.checked === 'indeterminate' ? (
        <MinusIcon size={13} />
      ) : (
        <CheckIcon size={13} />
      )}
    </CheckboxIndicator>
  </Root>
));

Checkbox.displayName = Root.displayName;
