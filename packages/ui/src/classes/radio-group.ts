import { cva } from 'class-variance-authority';

export const radioGroupVariants = cva(undefined, {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'grid gap-2',
      simple: undefined,
    },
  },
});

export const radioGroupItemVariants = cva(
  ['focus:outline-none', 'disabled:cursor-not-allowed disabled:opacity-50'],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'text-primary border-muted-foreground h-4.25 w-4.25 aspect-square rounded-full border',
          'focus:ring-ring/40 focus:ring-2',
          'data-state-checked:border-primary',
        ],
        simple: ['group'],
      },
    },
  },
);
