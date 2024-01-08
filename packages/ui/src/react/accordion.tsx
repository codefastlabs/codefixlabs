import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionMultipleProps,
  AccordionSingleProps,
  AccordionTriggerProps as TriggerProps,
} from '@radix-ui/react-accordion';
import {
  Content,
  Header,
  Item,
  Root,
  Trigger,
} from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Component: Accordion
 * -------------------------------------------------------------------------- */

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export const Accordion = React.forwardRef<
  React.ElementRef<typeof Root>,
  AccordionProps
>(({ className, ...props }, forwardedRef) => (
  <Root className={cn('divide-y', className)} ref={forwardedRef} {...props} />
));

Accordion.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: AccordionItem
 * -------------------------------------------------------------------------- */

export type { AccordionItemProps };

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  AccordionItemProps
>(({ className, ...props }, forwardedRef) => (
  <Item
    className={cn(
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

export interface AccordionTriggerProps extends TriggerProps {
  classNames?: {
    header?: string;
    trigger?: string;
    icon?: string;
  };
}

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  AccordionTriggerProps
>(({ children, className, classNames, ...props }, forwardedRef) => (
  <Header className={cn('flex', classNames?.header)} data-test-id="header">
    <Trigger
      className={cn(
        'group flex flex-1 cursor-pointer items-center justify-between py-4 text-base font-medium outline-none transition',
        className,
        classNames?.trigger,
      )}
      data-test-id="trigger"
      ref={forwardedRef}
      {...props}
    >
      <>
        {children}
        <ChevronDownIcon
          aria-hidden
          className={cn(
            'group-data-state-open:rotate-180 text-accent-foreground size-4 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]',
            classNames?.icon,
          )}
          data-test-id="icon"
        />
      </>
    </Trigger>
  </Header>
));

AccordionTrigger.displayName = Trigger.displayName;

/* -----------------------------------------------------------------------------
 * Component: AccordionContent
 * -------------------------------------------------------------------------- */

export type { AccordionContentProps };

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  AccordionContentProps
>(({ className, ...props }, forwardedRef) => (
  <Content
    className={cn(
      'text-muted-foreground overflow-hidden text-base',
      'data-state-open:animate-collapsible-down data-state-closed:animate-collapsible-up',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

AccordionContent.displayName = Content.displayName;
