import * as React from 'react';
import { toast, Toaster as Sonner } from 'sonner';

/* -----------------------------------------------------------------------------
 * Function: toast
 * -------------------------------------------------------------------------- */

export { toast };

/* -----------------------------------------------------------------------------
 * Component: Toaster
 * -------------------------------------------------------------------------- */

export type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster(props: ToasterProps): React.JSX.Element {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
}
