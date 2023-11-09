import {
  Action,
  Close,
  Description,
  Provider,
  Root,
  Title,
  Viewport,
} from '@radix-ui/react-toast';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const toastViewportVariants = cva(
  [
    'fixed z-50 flex w-auto gap-2.5',
    'p-[var(--viewport-padding)] [--viewport-padding:1rem]',
  ],
  {
    defaultVariants: {
      position: 'bottom-right',
    },
    variants: {
      position: {
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col',
        'bottom-left': 'bottom-0 left-0 flex-col',
        'bottom-right': 'bottom-0 right-0 flex-col',
        'top-center': 'left-1/2 top-0 -translate-x-1/2 flex-col-reverse',
        'top-left': 'left-0 top-0 flex-col-reverse',
        'top-right': 'right-0 top-0 flex-col-reverse',
      },
    },
  },
);

type ToastViewportVariants = VariantProps<typeof toastViewportVariants>;

const toastVariants = cva(
  [
    'group relative rounded-md border p-4',
    'data-swipe-cancel:transition-transform',
    [
      'data-state-open:data-swipe-direction-right:animate-slide-in-right data-state-closed:data-swipe-direction-right:animate-slide-out-right',
      'data-swipe-move:data-swipe-direction-right:translate-x-[var(--radix-toast-swipe-move-x)] data-swipe-end:data-swipe-direction-right:animate-swipe-out-right',
      'data-swipe-cancel:translate-x-0',
    ],
    [
      'data-state-open:data-swipe-direction-left:animate-slide-in-left data-state-closed:data-swipe-direction-left:animate-slide-out-left',
      'data-swipe-move:data-swipe-direction-left:translate-x-[var(--radix-toast-swipe-move-x)] data-swipe-end:data-swipe-direction-left:animate-swipe-out-left',
      'data-swipe-cancel:translate-x-0',
    ],
    [
      'data-state-open:data-swipe-direction-up:animate-slide-in-up data-state-closed:data-swipe-direction-up:animate-slide-out-up',
      'data-swipe-move:data-swipe-direction-up:translate-y-[var(--radix-toast-swipe-move-y)] data-swipe-end:data-swipe-direction-up:animate-swipe-out-up',
      'data-swipe-cancel:translate-y-0',
    ],
    [
      'data-state-open:data-swipe-direction-down:animate-slide-in-down data-state-closed:data-swipe-direction-down:animate-slide-out-down',
      'data-swipe-move:data-swipe-direction-down:translate-y-[var(--radix-toast-swipe-move-y)] data-swipe-end:data-swipe-direction-down:animate-swipe-out-down',
      'data-swipe-cancel:translate-y-0',
    ],
  ],
  {
    defaultVariants: {
      variant: 'primary',
    },
    variants: {
      variant: {
        error: 'border-destructive bg-destructive text-white',
        primary: 'border-primary bg-background text-primary',
        success: 'border-sky-500 bg-sky-500 text-white',
        warning: 'border-orange-500 bg-orange-500 text-white',
      },
    },
  },
);

type ToastVariants = VariantProps<typeof toastVariants>;

/* -----------------------------------------------------------------------------
 * Component: Toast
 * -------------------------------------------------------------------------- */

export const ToastProvider = Provider;

/* -----------------------------------------------------------------------------
 * Component: ToastViewport
 * -------------------------------------------------------------------------- */

export const ToastViewport = forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport> & ToastViewportVariants
>(({ className, position = 'bottom-right', ...props }, forwardedRef) => (
  <Viewport
    className={twMerge(toastViewportVariants({ position }), className)}
    ref={forwardedRef}
    {...props}
  />
));

ToastViewport.displayName = Viewport.displayName;

/* -----------------------------------------------------------------------------
 * Component: Toast
 * -------------------------------------------------------------------------- */

export const Toast = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> & ToastVariants
>(({ className, variant, ...props }, forwardedRef) => (
  <Root
    className={twMerge(toastVariants({ variant }), className)}
    ref={forwardedRef}
    {...props}
  />
));

Toast.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToastTitle
 * -------------------------------------------------------------------------- */

export const ToastTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, forwardedRef) => (
  <Title
    className={twMerge('font-medium', className)}
    ref={forwardedRef}
    {...props}
  />
));

ToastTitle.displayName = Title.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToastDescription
 * -------------------------------------------------------------------------- */

export const ToastDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, forwardedRef) => (
  <Description
    className={twMerge('text-sm', className)}
    ref={forwardedRef}
    {...props}
  />
));

ToastDescription.displayName = Description.displayName;

/* -----------------------------------------------------------------------------
 * Component: ToastAction
 * -------------------------------------------------------------------------- */

export const ToastAction = Action;

/* -----------------------------------------------------------------------------
 * Component: ToastClose
 * -------------------------------------------------------------------------- */

export const ToastClose = Close;
