'use client';

import { getFirstInitials } from '@codefixlabs/lib';
import { Fallback, Image, Root } from '@radix-ui/react-avatar';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Avatar
 * -------------------------------------------------------------------------- */

export const Avatar = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> & {
    alt: string;
    fallback?: string;
    src: string | undefined | null;
    classNames?: {
      root?: string;
      image?: string;
      fallback?: string;
    };
  }
>(({ className, classNames, alt, fallback, src, ...props }, forwardedRef) => (
  <Root
    className={twMerge(
      'relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full',
      className,
      classNames?.root,
    )}
    ref={forwardedRef}
    {...props}
  >
    <Image
      alt={alt}
      className={twMerge(
        'bg-primary aspect-square h-full w-full object-cover object-center',
        classNames?.image,
      )}
      src={src ?? undefined}
    />
    <Fallback
      className={twMerge(
        'bg-muted flex h-full w-full items-center justify-center text-sm',
        classNames?.fallback,
      )}
    >
      {fallback ?? getFirstInitials(alt)}
    </Fallback>
  </Root>
));

Avatar.displayName = 'Avatar';
