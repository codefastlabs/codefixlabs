import { cva } from 'class-variance-authority';

export const formItemVariants = cva('', {
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
