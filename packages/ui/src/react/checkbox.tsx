import {
  type CheckboxIndicatorProps,
  type CheckboxProps,
  Indicator,
  Root,
} from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: CheckboxIndicator
 * -------------------------------------------------------------------------- */

export type { CheckboxIndicatorProps };

export const CheckboxIndicator = React.forwardRef<
  React.ElementRef<typeof Indicator>,
  CheckboxIndicatorProps
>(({ className, ...props }, forwardedRef) => (
  <Indicator
    className={cn(
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

export type { CheckboxProps };

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof Root>,
  CheckboxProps
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={cn(
      'border-muted-foreground size-4.25 peer flex shrink-0 items-center justify-center rounded-[0.25rem] border',
      'ring-offset-background',
      'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
