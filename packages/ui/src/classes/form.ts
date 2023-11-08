import { cva } from 'class-variance-authority';

export const formItemVariants = cva(undefined, {
  defaultVariants: {
    inline: false,
  },
  variants: {
    inline: {
      false: 'space-y-2',
      true: 'flex gap-2',
    },
  },
});
