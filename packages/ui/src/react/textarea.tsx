import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Textarea
 * -------------------------------------------------------------------------- */

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, forwardedRef) => (
  <textarea
    className={twMerge(
      'border-input placeholder:text-muted-foreground focus:ring-ring/40 flex min-h-20 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

Textarea.displayName = 'Textarea';
