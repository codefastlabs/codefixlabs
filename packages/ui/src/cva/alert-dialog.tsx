import { cva } from 'class-variance-authority';

export const alertDialogContentVariants = cva(
  [
    'bg-background relative rounded-lg border shadow-lg focus:outline-none',
    'data-state-open:animate-content-show data-state-closed:animate-content-hide',
  ],
  {
    defaultVariants: {
      scrollable: false,
    },
    variants: {
      scrollable: {
        true: 'flex max-h-full flex-col',
      },
    },
  },
);
