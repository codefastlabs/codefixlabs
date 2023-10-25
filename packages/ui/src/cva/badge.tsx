import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
  {
    defaultVariants: {
      variant: 'primary',
    },
    variants: {
      variant: {
        destructive:
          'bg-destructive text-destructive-foreground border-transparent',
        outline: 'border-input',
        primary: 'bg-primary text-primary-foreground border-transparent',
        secondary: 'bg-secondary text-secondary-foreground border-transparent',
      },
    },
  },
);
