'use client';

import { Root } from '@radix-ui/react-separator';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Separator
 * -------------------------------------------------------------------------- */

export const Separator = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={twMerge(
      'bg-border relative inline-flex shrink-0 items-center justify-center',
      props.orientation === 'vertical'
        ? 'mx-2 h-full w-px'
        : 'my-2 h-px w-full',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

Separator.displayName = Root.displayName;
