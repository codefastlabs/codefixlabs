import {
  type TabsContentProps as ContentProps,
  type TabsListProps as ListProps,
  type TabsProps as RootProps,
  type TabsTriggerProps as TriggerProps,
  Content,
  List,
  Root,
  Trigger,
} from '@radix-ui/react-tabs';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/server/cn';

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
        'bg-muted text-muted-foreground inline-flex items-center justify-center gap-2 rounded-lg p-1.5',
      simple: undefined,
    },
  },
});

type TabsListVariantsProps = VariantProps<typeof tabsListVariants>;

const tabsTriggerVariants = cva(
  [
    'transition-all',
    'ring-offset-background',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        ],
        simple: undefined,
      },
    },
  },
);

type TabsTriggerVariantsProps = VariantProps<typeof tabsTriggerVariants>;

const tabsContentVariants = cva(
  [
    'ring-offset-background',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  ],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'mt-2 rounded',
        simple: undefined,
      },
    },
  },
);

type TabsContentVariantsProps = VariantProps<typeof tabsContentVariants>;

/* -----------------------------------------------------------------------------
 * Provider: TabsContext
 * -------------------------------------------------------------------------- */

export const TabsContext = React.createContext<{
  variant?: 'default' | 'simple';
}>({});

/* -----------------------------------------------------------------------------
 * Component: Tabs
 * -------------------------------------------------------------------------- */

export interface TabsProps extends RootProps {
  variant?: 'default' | 'simple';
}

export function Tabs({
  variant = 'default',
  ...props
}: TabsProps): React.JSX.Element {
  return (
    <TabsContext.Provider value={{ variant }}>
      <Root {...props} />
    </TabsContext.Provider>
  );
}

/* -----------------------------------------------------------------------------
 * Component: TabsList
 * -------------------------------------------------------------------------- */

export interface TabsListProps
  extends Omit<TabsListVariantsProps, 'variant'>,
    ListProps {}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof List>,
  TabsListProps
>(({ className, ...props }, forwardedRef) => {
  const { variant } = React.useContext(TabsContext);

  return (
    <List
      className={cn(tabsListVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    />
  );
});

TabsList.displayName = List.displayName;

/* -----------------------------------------------------------------------------
 * Component: TabsTrigger
 * -------------------------------------------------------------------------- */

export interface TabsTriggerProps
  extends Omit<TabsTriggerVariantsProps, 'variant'>,
    TriggerProps {}

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  TabsTriggerProps
>(({ className, ...props }, forwardedRef) => {
  const { variant } = React.useContext(TabsContext);

  return (
    <Trigger
      className={cn(tabsTriggerVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    />
  );
});

TabsTrigger.displayName = Trigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: TabsContent
 * -------------------------------------------------------------------------- */

export interface TabsContentProps
  extends Omit<TabsContentVariantsProps, 'variant'>,
    ContentProps {}
export const TabsContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  TabsContentProps
>(({ className, ...props }, forwardedRef) => {
  const { variant } = React.useContext(TabsContext);

  return (
    <Content
      className={cn(tabsContentVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    />
  );
});

TabsContent.displayName = Content.displayName;
