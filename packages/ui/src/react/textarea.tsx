import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Textarea
 * -------------------------------------------------------------------------- */

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, forwardedRef) => (
    <textarea
      className={cn(
        'border-input placeholder:text-muted-foreground ring-offset-background focus-visible:ring-ring flex min-h-20 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm',
        className,
      )}
      ref={forwardedRef}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
