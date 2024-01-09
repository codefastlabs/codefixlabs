import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'relative items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors',
    'ring-offset-background',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:duration-0',
  ],
  {
    compoundVariants: [
      // region Icon
      // --- 32px
      {
        className: 'px-2',
        icon: true,
        size: 'sm',
        variant: ['default', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-1.75',
        icon: true,
        size: 'sm',
        variant: ['outline'],
      },
      // --- 40px
      {
        className: 'px-3',
        icon: true,
        size: 'md',
        variant: ['default', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-2.75',
        icon: true,
        size: 'md',
        variant: ['outline'],
      },
      // --- 48px
      {
        className: 'px-4',
        icon: true,
        size: 'lg',
        variant: ['default', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-3.75',
        icon: true,
        size: 'lg',
        variant: ['outline'],
      },
      // endregion

      // region Without Icon
      // --- 32px
      {
        className: 'px-4',
        size: 'sm',
        icon: false,
        variant: ['default', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-3.75',
        size: 'sm',
        icon: false,
        variant: ['outline'],
      },
      // --- 40px
      {
        className: 'px-5',
        size: 'md',
        icon: false,
        variant: ['default', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-4.75',
        size: 'md',
        icon: false,
        variant: ['outline'],
      },
      // --- 48px
      {
        className: 'px-6',
        size: 'lg',
        icon: false,
        variant: ['default', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-5.75',
        size: 'lg',
        icon: false,
        variant: ['outline'],
      },
      // endregion
    ],
    defaultVariants: {
      block: false,
      icon: false,
      size: 'md',
      variant: 'default',
    },
    variants: {
      block: {
        false: 'inline-flex',
        true: 'flex w-full',
      },
      icon: {
        false: '',
        true: '',
      },
      size: {
        lg: 'h-12',
        md: 'h-10',
        sm: 'h-8',
      },
      variant: {
        default: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90',
          'disabled:bg-primary/50 disabled:text-primary-foreground/50',
          'has-[[data-slot=loading]]:text-primary-foreground/0 [&_[data-slot=loading]]:disabled:text-primary-foreground',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/90',
          'disabled:bg-destructive/50 disabled:text-destructive-foreground/50',
          'has-[[data-slot=loading]]:text-destructive-foreground/0 [&_[data-slot=loading]]:disabled:text-destructive-foreground',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/90',
          'disabled:bg-secondary/50 disabled:text-secondary-foreground/50',
          'has-[[data-slot=loading]]:text-secondary-foreground/0 [&_[data-slot=loading]]:disabled:text-secondary-foreground',
        ],
        outline: [
          'border-input border',
          'hover:border-input/90 hover:bg-accent hover:text-accent-foreground',
          'disabled:border-input/50 disabled:text-accent-foreground/50',
          'has-[[data-slot=loading]]:text-accent-foreground/0 [&_[data-slot=loading]]:disabled:text-accent-foreground',
        ],
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
          'disabled:text-accent-foreground/50',
          'has-[[data-slot=loading]]:text-accent-foreground/0 [&_[data-slot=loading]]:disabled:text-accent-foreground',
        ],
        link: [
          'text-primary rounded-none',
          'hover:underline',
          'disabled:text-primary/50',
          'has-[[data-slot=loading]]:text-primary/0 [&_[data-slot=loading]]:disabled:text-primary',
        ],
      },
    },
  },
);

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
