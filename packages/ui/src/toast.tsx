'use client';

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
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { toastVariants, toastViewportVariants } from 'src/cva/toast';

/* -----------------------------------------------------------------------------
 * Component: Toast
 * -------------------------------------------------------------------------- */

export const ToastProvider = Provider;

/* -----------------------------------------------------------------------------
 * Component: ToastViewport
 * -------------------------------------------------------------------------- */

export const ToastViewport = forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport> &
    VariantProps<typeof toastViewportVariants>
>(({ className, position = 'bottom-right', ...props }, forwardedRef) => (
  <Viewport
    className={twMerge(toastViewportVariants({ className, position }))}
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
  React.ComponentPropsWithoutRef<typeof Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, forwardedRef) => (
  <Root
    className={twMerge(toastVariants({ className, variant }))}
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
