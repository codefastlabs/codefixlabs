import { cva } from 'class-variance-authority';

export const navigationMenuTriggerVariants = cva([
  'bg-background group inline-flex h-10 w-max items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
  'hover:bg-accent hover:text-accent-foreground',
  'focus:bg-accent focus:text-accent-foreground focus:outline-none',
  'disabled:pointer-events-none disabled:opacity-50',
  'data-state-open:bg-accent/50 data-active:bg-accent/50',
]);
