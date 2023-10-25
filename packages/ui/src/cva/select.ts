import { cva } from 'class-variance-authority';

export const selectTriggerVariants = cva(
  [
    'border-input h-10 select-none items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'disabled:opacity-50/40 disabled:cursor-not-allowed',
    'placeholder:text-muted-foreground',
  ],
  {
    defaultVariants: {
      block: false,
      size: 'md',
    },
    variants: {
      block: {
        false: 'inline-flex',
        true: 'flex w-full',
      },
      size: {
        lg: 'h-12',
        md: 'h-10',
        sm: 'h-8',
      },
    },
  },
);

export const selectContentVariants = cva(
  [
    'bg-popover text-popover-foreground relative z-40 w-[var(--radix-select-trigger-width)] min-w-max overflow-hidden rounded-md border shadow-lg',
    [
      'data-state-open:data-side-top:animate-slide-in-from-top',
      'data-state-open:data-side-bottom:animate-slide-in-from-bottom',
      'data-state-open:data-side-left:animate-slide-in-from-left',
      'data-state-open:data-side-right:animate-slide-in-from-right',
    ],
    [
      'data-state-closed:data-side-top:animate-slide-out-to-top',
      'data-state-closed:data-side-bottom:animate-slide-out-to-bottom',
      'data-state-closed:data-side-left:animate-slide-out-to-left',
      'data-state-closed:data-side-right:animate-slide-out-to-right',
    ],
  ],
  {
    defaultVariants: {
      position: 'item-aligned',
    },
    variants: {
      position: {
        'item-aligned': '',
        popper:
          'max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]',
      },
    },
  },
);

export const selectItemVariants = cva(
  [
    'group relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5 pl-8 text-sm outline-none',
    'data-disabled:opacity-50 data-disabled:pointer-events-none',
  ],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'focus:bg-accent focus:text-accent-foreground',
          'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
        ],
        destructive: [
          'text-destructive',
          'focus:bg-destructive-foreground focus:text-destructive',
          'data-highlighted:bg-destructive-foreground data-highlighted:text-destructive',
        ],
      },
    },
  },
);
