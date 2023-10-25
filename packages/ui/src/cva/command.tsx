import { cva } from 'class-variance-authority';

export const commandVariants = cva(
  'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
  {
    defaultVariants: {
      variant: 'primary',
    },
    variants: {
      variant: {
        dialog: '',
        primary: 'border shadow-lg',
      },
    },
  },
);
