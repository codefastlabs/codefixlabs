import type {
  NavigationMenuContentProps,
  NavigationMenuIndicatorProps,
  NavigationMenuItemProps,
  NavigationMenuLinkProps,
  NavigationMenuListProps,
  NavigationMenuProps,
  NavigationMenuSubProps,
  NavigationMenuTriggerProps,
  NavigationMenuViewportProps,
} from '@radix-ui/react-navigation-menu';
import {
  Content,
  Indicator,
  List,
  NavigationMenuItem,
  NavigationMenuLink,
  Root,
  Sub,
  Trigger,
  Viewport,
} from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuList
 * -------------------------------------------------------------------------- */

export type { NavigationMenuListProps };
export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof List>,
  NavigationMenuListProps
>(({ className, ...props }, forwardedRef) => (
  <List
    className={cn(
      'group flex flex-1 list-none items-center justify-center gap-1',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

NavigationMenuList.displayName = List.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuIndicator
 * -------------------------------------------------------------------------- */

export const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof Indicator>,
  NavigationMenuIndicatorProps
>(({ className, ...props }, forwardedRef) => (
  <Indicator
    ref={forwardedRef}
    {...props}
    className={cn(
      'top-full z-40 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]',
      'data-state-visible:animate-fade-in data-state-hidden:animate-fade-out',
      className,
    )}
  />
));

NavigationMenuIndicator.displayName = Indicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuViewport
 * -------------------------------------------------------------------------- */

export type { NavigationMenuViewportProps };

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof Viewport>,
  NavigationMenuViewportProps
>(({ className, ...props }, forwardedRef) => (
  <Viewport
    ref={forwardedRef}
    {...props}
    className={cn(
      'origin-top-center bg-popover text-popover-foreground relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md drop-shadow transition-[width,height] duration-300',
      'sm:w-[var(--radix-navigation-menu-viewport-width)]',
      'data-state-open:animate-scale-in data-state-closed:animate-scale-out',
      className,
    )}
  />
));

NavigationMenuViewport.displayName = Viewport.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenu
 * -------------------------------------------------------------------------- */

export type { NavigationMenuProps };

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof Root>,
  NavigationMenuProps
>(({ children, className, ...props }, forwardedRef) => (
  <Root className={cn('relative', className)} ref={forwardedRef} {...props}>
    <>
      <NavigationMenuList>
        {children}

        <NavigationMenuIndicator>
          <div className="rounded-tl-0.5 top-1.75 bg-background relative size-2.5 rotate-45" />
        </NavigationMenuIndicator>
      </NavigationMenuList>

      <div className="perspective-[125rem] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenuViewport />
      </div>
    </>
  </Root>
));

NavigationMenu.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuSub
 * -------------------------------------------------------------------------- */

export type { NavigationMenuSubProps };

export const NavigationMenuSub = React.forwardRef<
  React.ElementRef<typeof Sub>,
  NavigationMenuSubProps
>(({ children, className, ...props }, forwardedRef) => (
  <Sub className={cn('relative', className)} ref={forwardedRef} {...props}>
    <>
      <NavigationMenuList>
        {children}

        <NavigationMenuIndicator>
          <div className="top-1.75 bg-border relative size-2.5 rotate-45 rounded-tl-sm shadow-lg" />
        </NavigationMenuIndicator>
      </NavigationMenuList>

      <div className="perspective-[125rem] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenuViewport />
      </div>
    </>
  </Sub>
));

NavigationMenuSub.displayName = Sub.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuTrigger
 * -------------------------------------------------------------------------- */

export type { NavigationMenuTriggerProps };

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  NavigationMenuTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Trigger
    className={cn(
      [
        'bg-background group inline-flex h-10 w-max items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:bg-accent focus:text-accent-foreground focus:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-state-open:bg-accent/50 data-active:bg-accent/50',
      ],
      className,
    )}
    ref={forwardedRef}
    {...props}
  >
    <>
      {children}

      <ChevronDownIcon
        className="group-data-state-open:rotate-180 text-accent-foreground transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]"
        size={16}
      />
    </>
  </Trigger>
));

NavigationMenuTrigger.displayName = Trigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuContent
 * -------------------------------------------------------------------------- */

export type { NavigationMenuContentProps };

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  NavigationMenuContentProps
>(({ className, ...props }, forwardedRef) => (
  <Content
    ref={forwardedRef}
    {...props}
    className={cn(
      'absolute left-0 top-0 w-full',
      'sm:w-auto',
      'data-motion-from-start:animate-enter-from-left data-motion-to-start:animate-exit-to-left',
      'data-motion-from-end:animate-enter-from-right data-motion-to-end:animate-exit-to-right',
      className,
    )}
  />
));

NavigationMenuContent.displayName = Content.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuItem
 * -------------------------------------------------------------------------- */

export { NavigationMenuItem };
export type { NavigationMenuItemProps };

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuLink
 * -------------------------------------------------------------------------- */

export { NavigationMenuLink };
export type { NavigationMenuLinkProps };
