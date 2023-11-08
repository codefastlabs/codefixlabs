import { cva } from 'class-variance-authority';

export const toggleGroupItemVariants = cva(
  [
    'inline-flex items-center justify-center text-sm font-medium transition-colors',
    'first:rounded-l-md last:rounded-r-md',
    'hover:bg-primary hover:text-primary-foreground',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'data-state-on:bg-primary data-state-on:text-primary-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
    variants: {
      size: {
        lg: 'h-11 px-5',
        md: 'h-10 px-3',
        sm: 'h-9 px-2.5',
      },
      variant: {
        outline: [
          'border-input border bg-transparent',
          'hover:bg-primary hover:text-primary-foreground',
        ],
        primary: 'bg-transparent',
      },
    },
  },
);
