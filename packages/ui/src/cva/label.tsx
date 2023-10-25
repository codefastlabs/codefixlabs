import { cva } from 'class-variance-authority';

export const labelVariants = cva(
  [
    'inline-flex items-center gap-2 text-sm font-medium leading-4',
    'peer-invalid:text-destructive peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ],
  {
    defaultVariants: {
      invalid: false,
      required: false,
    },
    variants: {
      invalid: {
        true: 'text-destructive',
      },
      required: {
        true: 'after:text-destructive after:font-mono after:text-xs after:content-["*"]',
      },
    },
  },
);
