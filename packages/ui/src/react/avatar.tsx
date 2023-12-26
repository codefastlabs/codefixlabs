import { getFirstInitials } from '@codefixlabs/lib';
import { Fallback, Image, Root } from '@radix-ui/react-avatar';
import * as React from 'react';
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
      'relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full',
      className,
      classNames?.root,
    )}
    data-test-id="root"
    ref={forwardedRef}
    {...props}
  >
    <Image
      alt={alt}
      className={twMerge(
        'bg-primary aspect-square size-full object-cover object-center',
        classNames?.image,
      )}
      data-test-id="image"
      src={src ?? undefined}
    />
    <Fallback
      className={twMerge(
        'bg-muted flex size-full items-center justify-center text-sm',
        classNames?.fallback,
      )}
      data-test-id="fallback"
    >
      {fallback ?? getFirstInitials(alt)}
    </Fallback>
  </Root>
));

Avatar.displayName = 'Avatar';
