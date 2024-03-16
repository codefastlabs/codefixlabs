import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Skeleton
 * -------------------------------------------------------------------------- */

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({
  className,
  ...props
}: SkeletonProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'bg-secondary relative max-w-full overflow-hidden rounded before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
        className,
      )}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
 * Component: TextSkeleton
 * -------------------------------------------------------------------------- */

type FontSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

const paddingMapping: Record<FontSize, string> = {
  xs: 'py-0.5',
  sm: 'py-0.75',
  base: 'py-1',
  lg: 'py-1.25',
  xl: 'py-1',
  '2xl': 'py-1',
  '3xl': 'py-0.75',
  '4xl': 'py-0.5',
  '5xl': 'py-0',
  '6xl': 'py-0',
  '7xl': 'py-0',
  '8xl': 'py-0',
  '9xl': 'py-0',
};

const heightMapping: Record<FontSize, string> = {
  xs: 'h-3',
  sm: 'h-3.5',
  base: 'h-4',
  lg: 'h-4.5',
  xl: 'h-5',
  '2xl': 'h-6',
  '3xl': 'h-7.5',
  '4xl': 'h-9',
  '5xl': 'h-12',
  '6xl': 'h-15',
  '7xl': 'h-18',
  '8xl': 'h-24',
  '9xl': 'h-32',
};

export interface TextSkeletonProps {
  className?: string;
  text?: FontSize;
}

export function TextSkeleton({
  className,
  text = 'base',
}: TextSkeletonProps): React.JSX.Element {
  return (
    <div className={paddingMapping[text]}>
      <Skeleton className={cn(heightMapping[text], className)} />
    </div>
  );
}
