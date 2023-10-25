'use client';

import {
  Content,
  Indicator,
  Item,
  Link,
  List,
  Root,
  Sub,
  Trigger,
  Viewport,
} from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { navigationMenuTriggerVariants } from 'src/cva/navigation-menu';

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuList
 * -------------------------------------------------------------------------- */

export const NavigationMenuList = forwardRef<
  React.ElementRef<typeof List>,
  React.ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, forwardedRef) => (
  <List
    className={twMerge(
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

export const NavigationMenuIndicator = forwardRef<
  React.ElementRef<typeof Indicator>,
  React.ComponentPropsWithoutRef<typeof Indicator>
>(({ className, ...props }, forwardedRef) => (
  <Indicator
    ref={forwardedRef}
    {...props}
    className={twMerge(
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

export const NavigationMenuViewport = forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport>
>(({ className, ...props }, forwardedRef) => (
  <Viewport
    ref={forwardedRef}
    {...props}
    className={twMerge(
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

export const NavigationMenu = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ children, className, ...props }, forwardedRef) => (
  <Root
    className={twMerge('relative', className)}
    ref={forwardedRef}
    {...props}
  >
    <>
      <NavigationMenuList>
        {children}

        <NavigationMenuIndicator>
          <div className="rounded-tl-0.5 top-1.75 bg-background relative h-2.5 w-2.5 rotate-45" />
        </NavigationMenuIndicator>
      </NavigationMenuList>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenuViewport />
      </div>
    </>
  </Root>
));

NavigationMenu.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuSub
 * -------------------------------------------------------------------------- */

export const NavigationMenuSub = forwardRef<
  React.ElementRef<typeof Sub>,
  React.ComponentPropsWithoutRef<typeof Sub>
>(({ children, className, ...props }, forwardedRef) => (
  <Sub className={twMerge('relative', className)} ref={forwardedRef} {...props}>
    <>
      <NavigationMenuList>
        {children}

        <NavigationMenuIndicator>
          <div className="top-1.75 bg-border relative h-2.5 w-2.5 rotate-45 rounded-tl-sm shadow-lg" />
        </NavigationMenuIndicator>
      </NavigationMenuList>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenuViewport />
      </div>
    </>
  </Sub>
));

NavigationMenuSub.displayName = Sub.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuTrigger
 * -------------------------------------------------------------------------- */

export const NavigationMenuTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Trigger
    className={twMerge(navigationMenuTriggerVariants({ className }))}
    ref={forwardedRef}
    {...props}
  >
    <>
      {children}

      <ChevronDownIcon className="group-data-state-open:rotate-180 text-accent-foreground h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]" />
    </>
  </Trigger>
));

NavigationMenuTrigger.displayName = Trigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuContent
 * -------------------------------------------------------------------------- */

export const NavigationMenuContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, forwardedRef) => (
  <Content
    ref={forwardedRef}
    {...props}
    className={twMerge(
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

export const NavigationMenuItem = Item;

/* -----------------------------------------------------------------------------
 * Component: NavigationMenuLink
 * -------------------------------------------------------------------------- */

export const NavigationMenuLink = Link;
