import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const tabsListVariants = cva(undefined, {
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

type TabsListVariants = VariantProps<typeof tabsListVariants>;

const tabsTriggerVariants = cva(
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

type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;

const tabsContentVariants = cva(
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

type TabsContentVariants = VariantProps<typeof tabsContentVariants>;

/* -----------------------------------------------------------------------------
 * Provider: TabsContext
 * -------------------------------------------------------------------------- */

export const TabsContext = createContext<{
  variant?: 'default' | 'simple';
}>({});

/* -----------------------------------------------------------------------------
 * Component: Tabs
 * -------------------------------------------------------------------------- */

export function Tabs({
  variant = 'default',
  ...props
}: React.ComponentProps<typeof Root> & {
  variant?: 'default' | 'simple';
}): React.JSX.Element {
  return (
    <TabsContext.Provider value={{ variant }}>
      <Root {...props} />
    </TabsContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: TabsList
 * -------------------------------------------------------------------------- */

export const TabsList = forwardRef<
  React.ElementRef<typeof List>,
  Omit<TabsListVariants, 'variant'> &
    React.ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, forwardedRef) => {
  const { variant } = useContext(TabsContext);

  return (
    <List
      className={twMerge(tabsListVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    />
  );
});

TabsList.displayName = List.displayName;

/* -----------------------------------------------------------------------------
 * Component: TabsTrigger
 * -------------------------------------------------------------------------- */

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  Omit<TabsTriggerVariants, 'variant'> &
    React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, forwardedRef) => {
  const { variant } = useContext(TabsContext);

  return (
    <Trigger
      className={twMerge(tabsTriggerVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    />
  );
});

TabsTrigger.displayName = Trigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: TabsContent
 * -------------------------------------------------------------------------- */

export const TabsContent = forwardRef<
  React.ElementRef<typeof Content>,
  Omit<TabsContentVariants, 'variant'> &
    React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, forwardedRef) => {
  const { variant } = useContext(TabsContext);

  return (
    <Content
      className={twMerge(tabsContentVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    />
  );
});

TabsContent.displayName = Content.displayName;
