import type { VariantProps } from 'class-variance-authority';
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
        className: 'px-2 h-8',
        size: 'sm',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-1.75 h-8',
        size: 'sm',
        variant: ['outline'],
      },
      // --- 40px
      {
        className: 'px-3 h-10',
        size: 'md',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-2.75 h-10',
        size: 'md',
        variant: ['outline'],
      },
      // --- 48px
      {
        className: 'px-4 h-12',
        size: 'lg',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-3.75 h-12',
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
        className: 'px-4 h-8',
        size: 'sm',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-3.75 h-8',
        size: 'sm',
        variant: ['outline'],
      },
      // --- 40px
      {
        className: 'px-5 h-10',
        size: 'md',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-4.75 h-10',
        size: 'md',
        variant: ['outline'],
      },
      // --- 48px
      {
        className: 'px-6 h-12',
        size: 'lg',
        variant: ['primary', 'secondary', 'destructive', 'ghost'],
      },
      {
        className: 'px-5.75 h-12',
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
    'relative select-none items-center gap-2 overflow-hidden whitespace-nowrap text-sm font-medium transition-colors',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'data-disabled:cursor-not-allowed data-disabled:ring-0',
  ],
  {
    compoundVariants: [...compoundSizes],
    defaultVariants: {
      block: false,
      icon: false,
      justify: 'center',
      shape: 'rounded',
      size: 'md',
      variant: 'primary',
    },
    variants: {
      block: {
        false: 'inline-flex',
        true: 'flex w-full',
      },
      icon: {
        false: undefined,
        true: undefined,
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
        lg: undefined,
        md: undefined,
        sm: undefined,
      },
      variant: {
        destructive: [
          'bg-destructive text-destructive-foreground',
          '[&:not([data-disabled])]:hover:bg-destructive/90',
          '[&:not([data-disabled])]:focus:bg-destructive/90',
          'data-disabled:bg-destructive/60',
        ],
        ghost: [
          '[&:not([data-disabled])]:hover:bg-accent',
          'data-disabled:opacity-60',
        ],
        link: 'text-primary rounded-none hover:underline',
        outline: [
          'border-input border',
          '[&:not([data-disabled])]:hover:bg-accent [&:not([data-disabled])]:hover:text-accent-foreground',
          '[&:not([data-disabled])]:focus:bg-accent [&:not([data-disabled])]:focus:text-accent-foreground',
          'data-disabled:opacity-60',
        ],
        primary: [
          'bg-primary text-primary-foreground',
          '[&:not([data-disabled])]:hover:bg-primary/90',
          '[&:not([data-disabled])]:focus:bg-primary/90',
          'data-disabled:bg-primary/60',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          '[&:not([data-disabled])]:hover:bg-secondary/90',
          '[&:not([data-disabled])]:focus:bg-secondary/90',
          'data-disabled:bg-secondary/60',
        ],
      },
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
