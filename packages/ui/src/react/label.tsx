import { Root } from '@radix-ui/react-label';
import type { VariantProps } from 'class-variance-authority';
import { InfoIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/react/tooltip';
import { labelVariants } from '@/classes/label';

/* -----------------------------------------------------------------------------
 * Component: Label
 * -------------------------------------------------------------------------- */

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
      className={twMerge(labelVariants({ invalid, required }), className)}
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
