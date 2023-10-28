'use client';

import { Content, Root, Trigger } from '@radix-ui/react-collapsible';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Collapsible
 * -------------------------------------------------------------------------- */

export const Collapsible = Root;

/* -----------------------------------------------------------------------------
 * Component: CollapsibleTrigger
 * -------------------------------------------------------------------------- */

export const CollapsibleTrigger = Trigger;

/* -----------------------------------------------------------------------------
 * Component: CollapsibleContent
 * -------------------------------------------------------------------------- */

export const CollapsibleContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, forwardedRef) => (
  <Content
    className={twMerge(
      'overflow-hidden',
      'data-state-open:animate-collapsible-down data-state-closed:animate-collapsible-up',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

CollapsibleContent.displayName = Content.displayName;
