import { getFirstInitials } from '@codefixlabs/lib';
import {
  type AvatarProps as RootProps,
  Fallback,
  Image,
  Root,
} from '@radix-ui/react-avatar';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Avatar
 * -------------------------------------------------------------------------- */

export interface AvatarProps extends RootProps {
  alt: string;
  fallback?: string;
  src: string | undefined | null;
  classNames?: {
    root?: string;
    image?: string;
    fallback?: string;
  };
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof Root>,
  AvatarProps
>(({ className, classNames, alt, fallback, src, ...props }, forwardedRef) => (
  <Root
    className={cn(
      'relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full',
      className,
      classNames?.root,
    )}
    ref={forwardedRef}
    {...props}
  >
    <Image
      alt={alt}
      className={cn(
        'bg-primary aspect-square size-full object-cover object-center',
        classNames?.image,
      )}
      src={src ?? undefined}
    />
    <Fallback
      className={cn(
        'bg-muted flex size-full items-center justify-center text-sm',
        classNames?.fallback,
      )}
    >
      {fallback ?? getFirstInitials(alt)}
    </Fallback>
  </Root>
));

Avatar.displayName = 'Avatar';
