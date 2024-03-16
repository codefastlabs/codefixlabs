import {
  type AccordionContentProps,
  type AccordionItemProps,
  type AccordionMultipleProps,
  type AccordionSingleProps,
  type AccordionTriggerProps as TriggerProps,
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
  <Header className={cn('flex', classNames?.header)}>
    <Trigger
      className={cn(
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
          className={cn(
            'text-accent-foreground size-4 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180',
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

export type { AccordionContentProps };

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  AccordionContentProps
>(({ className, ...props }, forwardedRef) => (
  <Content
    className={cn(
      'text-muted-foreground data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden text-base',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

AccordionContent.displayName = Content.displayName;
