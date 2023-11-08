import { cva } from 'class-variance-authority';

export const tabsListVariants = cva(undefined, {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default:
        'bg-muted text-muted-foreground inline-flex h-10 items-center justify-center gap-1 rounded-lg p-1',
      simple: undefined,
    },
  },
});

export const tabsTriggerVariants = cva(
  [
    'transition-all',
    'focus:ring-ring/40 focus:outline-none focus:ring-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium',
          'data-state-active:bg-background data-state-active:text-foreground data-state-active:shadow-sm',
        ],
        simple: undefined,
      },
    },
  },
);

export const tabsContentVariants = cva(
  ['focus:ring-ring/40 focus:outline-none focus:ring-2'],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'mt-2 rounded-lg',
        simple: undefined,
      },
    },
  },
);
