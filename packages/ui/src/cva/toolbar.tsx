import { cva } from 'class-variance-authority';

export const toolbarToggleItemVariants = cva(
  [
    'inline-flex items-center justify-center rounded text-sm font-medium transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'data-state-on:bg-primary data-state-on:text-primary-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    defaultVariants: {
      size: 'sm',
      variant: 'primary',
    },
    variants: {
      size: {
        lg: 'px-4.25 h-9',
        md: 'px-2.25 h-8',
        sm: 'px-1.75 h-7',
      },
      variant: {
        outline: [
          'border-input border bg-transparent',
          'hover:bg-accent hover:text-accent-foreground',
        ],
        primary: 'bg-transparent',
      },
    },
  },
);
