import type { LabelProps as RootProps } from '@radix-ui/react-label';
import { Root } from '@radix-ui/react-label';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { InfoIcon } from 'lucide-react';
import * as React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/react/tooltip';
import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const labelVariants = cva(
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

/* -----------------------------------------------------------------------------
 * Component: Label
 * -------------------------------------------------------------------------- */

export interface LabelProps
  extends RootProps,
    VariantProps<typeof labelVariants> {
  tooltip?: string;
}

export const Label = React.forwardRef<
  React.ElementRef<typeof Root>,
  LabelProps
>(
  (
    { children, tooltip, className, required, invalid, ...props },
    forwardedRef,
  ) => (
    <Root
      className={cn(labelVariants({ invalid, required }), className)}
      ref={forwardedRef}
      {...props}
    >
      <>
        {children}

        {tooltip ? (
          <Tooltip delayDuration={250}>
            <TooltipTrigger className="shrink-0" type="button">
              <InfoIcon className="text-muted-foreground" size={16} />
            </TooltipTrigger>

            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        ) : null}
      </>
    </Root>
  ),
);

Label.displayName = Root.displayName;
