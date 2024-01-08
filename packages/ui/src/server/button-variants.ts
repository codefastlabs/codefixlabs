import { cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

type ButtonSize = 'lg' | 'md' | 'sm';

type ButtonVariant =
  | 'destructive'
  | 'ghost'
  | 'outline'
  | 'primary'
  | 'secondary';

const btnSizes: {
  icon: boolean;
  sizes: {
    className: ClassValue;
    size: ButtonSize;
    variant: ButtonVariant[];
  }[];
}[] = [
  {
    icon: true,
    sizes: [
      // --- 32px
      {
        className: 'px-2',
        size: 'sm',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-1.75',
        size: 'sm',
        variant: ['outline'],
      },
      // --- 40px
      {
        className: 'px-3',
        size: 'md',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-2.75',
        size: 'md',
        variant: ['outline'],
      },
      // --- 48px
      {
        className: 'px-4',
        size: 'lg',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-3.75',
        size: 'lg',
        variant: ['outline'],
      },
    ],
  },
  {
    icon: false,
    sizes: [
      // --- 32px
      {
        className: 'px-4',
        size: 'sm',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-3.75',
        size: 'sm',
        variant: ['outline'],
      },
      // --- 40px
      {
        className: 'px-5',
        size: 'md',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-4.75',
        size: 'md',
        variant: ['outline'],
      },
      // --- 48px
      {
        className: 'px-6',
        size: 'lg',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-5.75',
        size: 'lg',
        variant: ['outline'],
      },
    ],
  },
];

// Flatten the array and group variants if the size is the same
const compoundSizes = btnSizes.flatMap<{
  className: ClassValue;
  icon: boolean;
  size: ButtonSize;
  variant: ButtonVariant[];
}>(({ icon, sizes }) =>
  sizes.map(({ variant, size, className }) => ({
    className,
    icon,
    size,
    variant,
  })),
);

export const buttonVariants = cva(
  [
    'relative items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors',
    'ring-offset-background',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:duration-0',
  ],
  {
    variants: {
      block: {
        false: 'inline-flex',
        true: 'flex w-full',
      },
      icon: {
        false: '',
        true: '',
      },
      justify: {
        between: 'justify-between',
        center: 'justify-center',
      },
      shape: {
        pill: 'rounded-full',
        rounded: 'rounded-md',
        square: 'rounded-sm',
      },
      size: {
        lg: 'h-12',
        md: 'h-10',
        sm: 'h-8',
      },
      variant: {
        primary: [
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
    compoundVariants: [...compoundSizes],
    defaultVariants: {
      block: false,
      icon: false,
      justify: 'center',
      shape: 'rounded',
      size: 'md',
      variant: 'primary',
    },
  },
);
