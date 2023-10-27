'use client';

import { cx } from 'class-variance-authority';
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/react/toast';
import { useToast } from '@/react/use-toast';

/* -----------------------------------------------------------------------------
 * Component: Toaster
 * -------------------------------------------------------------------------- */

export function Toaster({
  position,
  ...props
}: Pick<React.ComponentPropsWithoutRef<typeof ToastViewport>, 'position'> &
  React.ComponentPropsWithoutRef<typeof ToastProvider>): React.JSX.Element {
  const { toasts } = useToast();

  return (
    <ToastProvider {...props}>
      {toasts.map(({ id, title, description, action, className, ...rest }) => (
        <Toast
          key={id}
          {...rest}
          className={cx('flex items-center justify-between gap-4', className)}
        >
          <div className="flex flex-col gap-1">
            {title ? <ToastTitle>{title}</ToastTitle> : null}

            {description ? (
              <ToastDescription>{description}</ToastDescription>
            ) : null}
          </div>

          {action}
        </Toast>
      ))}

      <ToastViewport position={position} />
    </ToastProvider>
  );
}
