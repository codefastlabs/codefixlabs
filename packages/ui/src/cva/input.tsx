import { cva } from 'class-variance-authority';

export const primitiveInputVariants = cva(
  [
    'border-input min-w-0 rounded-md border bg-transparent px-3 py-2 text-base',
    'sm:text-sm sm:file:text-sm',
    'file:border-0 file:bg-transparent file:text-base file:font-medium',
    'placeholder:text-muted-foreground placeholder:text-sm',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-invalid:border-destructive',
  ],
  {
    defaultVariants: {
      inline: false,
      size: 'md',
    },
    variants: {
      inline: {
        false: 'flex w-full',
        true: 'inline-flex',
      },
      size: {
        lg: 'h-12',
        md: 'h-10',
        sm: 'h-8 placeholder:text-xs',
      },
    },
  },
);

export const inputVariants = cva('relative z-40', {
  defaultVariants: {
    hasEndIcon: false,
    hasStartIcon: false,
  },
  variants: {
    hasEndIcon: {
      true: 'pr-10.5',
    },
    hasStartIcon: {
      true: 'pl-10.5',
    },
  },
});
