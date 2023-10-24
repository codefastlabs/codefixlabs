import { Root } from '@radix-ui/react-label';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { InfoIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

/* -----------------------------------------------------------------------------
 * Component: Label
 * -------------------------------------------------------------------------- */

export const labelVariants = cva(
  [
    'inline-flex items-center gap-2 text-sm font-medium leading-4',
    'peer-invalid:text-destructive peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ],
  {
    defaultVariants: {
      invalid: false,
      required: false,
    },
    variants: {
      invalid: {
        true: 'text-destructive',
      },
      required: {
        true: 'after:text-destructive after:font-mono after:text-xs after:content-["*"]',
      },
    },
  },
);

export const Label = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> &
    VariantProps<typeof labelVariants> & {
      tooltip?: string;
    }
>(
  (
    { children, tooltip, className, required, invalid, ...props },
    forwardedRef,
  ) => (
    <Root
      className={twMerge(labelVariants({ className, invalid, required }))}
      ref={forwardedRef}
      {...props}
    >
      <>
        {children}

        {tooltip ? (
          <Tooltip delayDuration={250}>
            <TooltipTrigger className="shrink-0" type="button">
              <InfoIcon className="text-muted-foreground h-5 w-5" />
            </TooltipTrigger>

            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        ) : null}
      </>
    </Root>
  ),
);

Label.displayName = Root.displayName;
