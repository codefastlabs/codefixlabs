'use client';

import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import type { VariantProps } from 'class-variance-authority';
import { createContext, forwardRef, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  tabsContentVariants,
  tabsListVariants,
  tabsTriggerVariants,
} from '@/cva/tabs';

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
  Omit<VariantProps<typeof tabsListVariants>, 'variant'> &
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
  Omit<VariantProps<typeof tabsTriggerVariants>, 'variant'> &
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
  Omit<VariantProps<typeof tabsContentVariants>, 'variant'> &
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
