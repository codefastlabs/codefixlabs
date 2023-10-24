import {
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* -----------------------------------------------------------------------------
 * Component: Accordion
 * -------------------------------------------------------------------------- */

export const Accordion = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, forwardedRef) => (
  <Root
    className={twMerge('divide-y', className)}
    ref={forwardedRef}
    {...props}
  />
));

Accordion.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: AccordionItem
 * -------------------------------------------------------------------------- */

export const AccordionItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, forwardedRef) => (
  <Item
    className={twMerge(
      'overflow-hidden focus-within:relative focus-within:z-40',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

AccordionItem.displayName = Item.displayName;

/* -----------------------------------------------------------------------------
 * Component: AccordionTrigger
 * -------------------------------------------------------------------------- */

export const AccordionTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger> & {
    classNames?: {
      header?: string;
      trigger?: string;
      icon?: string;
    };
  }
>(({ children, className, classNames, ...props }, forwardedRef) => (
  <Header className={twMerge('flex', classNames?.header)}>
    <Trigger
      className={twMerge(
        'group flex flex-1 cursor-pointer items-center justify-between py-4 text-base font-medium outline-none transition',
        className,
        classNames?.trigger,
      )}
      ref={forwardedRef}
      {...props}
    >
      <>
        {children}
        <ChevronDownIcon
          aria-hidden
          className={twMerge(
            'group-data-state-open:rotate-180 text-accent-foreground h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]',
            classNames?.icon,
          )}
        />
      </>
    </Trigger>
  </Header>
));

AccordionTrigger.displayName = Trigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: AccordionContent
 * -------------------------------------------------------------------------- */

export const AccordionContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, forwardedRef) => (
  <Content
    className={twMerge(
      'text-muted-foreground overflow-hidden text-base',
      'data-state-open:animate-collapsible-down data-state-closed:animate-collapsible-up',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

AccordionContent.displayName = Content.displayName;
