import { cva } from 'class-variance-authority';

export const drawerContentVariants = cva(
  'bg-background relative border shadow-lg focus:outline-none',
  {
    defaultVariants: {
      position: 'right',
      scrollable: false,
    },
    variants: {
      position: {
        left: [
          'border-y-0 border-l-0',
          'data-state-open:animate-drawer-show-from-left data-state-closed:animate-drawer-hide-to-left',
        ],
        right: [
          'border-y-0 border-r-0',
          'data-state-open:animate-drawer-show-from-right data-state-closed:animate-drawer-hide-to-right',
        ],
      },
      scrollable: {
        false: 'overflow-y-auto',
        true: 'flex flex-col',
      },
    },
  },
);
