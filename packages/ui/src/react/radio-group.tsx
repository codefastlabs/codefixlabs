import {
  type RadioGroupIndicatorProps,
  type RadioGroupItemProps as ItemProps,
  type RadioGroupProps as RootProps,
  Indicator,
  Item,
  Root,
} from '@radix-ui/react-radio-group';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Classes
 * -------------------------------------------------------------------------- */

const radioGroupVariants = cva(undefined, {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'grid gap-2',
      simple: undefined,
    },
  },
});

type RadioGroupVariantsProps = VariantProps<typeof radioGroupVariants>;

const radioGroupItemVariants = cva(
  ['focus:outline-none', 'disabled:cursor-not-allowed disabled:opacity-50'],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'text-primary border-muted-foreground size-4.25 aspect-square rounded-full border',
          'ring-offset-background',
          'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'data-[state=checked]:border-primary',
        ],
        simple: ['group'],
      },
    },
  },
);

type RadioGroupItemVariantsProps = VariantProps<typeof radioGroupItemVariants>;

/* -----------------------------------------------------------------------------
 * Provider: RadioGroupContext
 * -------------------------------------------------------------------------- */

export const RadioGroupContext = React.createContext<
  Pick<RadioGroupVariantsProps, 'variant'>
>({
  variant: 'default',
});

/* -----------------------------------------------------------------------------
 * Component: RadioGroup
 * -------------------------------------------------------------------------- */

export interface RadioGroupProps extends RootProps, RadioGroupVariantsProps {}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof Root>,
  RadioGroupProps
>(({ className, variant = 'default', ...props }, forwardedRef) => (
  <RadioGroupContext.Provider value={{ variant }}>
    <Root
      className={cn(radioGroupVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    />
  </RadioGroupContext.Provider>
));

RadioGroup.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: RadioGroupIndicator
 * -------------------------------------------------------------------------- */

export type { RadioGroupIndicatorProps };

export const RadioGroupIndicator = React.forwardRef<
  React.ElementRef<typeof Indicator>,
  RadioGroupIndicatorProps
>(({ className, ...props }, forwardedRef) => (
  <Indicator
    className={cn(
      'after:h-2.25 after:w-2.25 relative flex h-full w-full items-center justify-center after:block after:rounded-full after:bg-current',
      className,
    )}
    ref={forwardedRef}
    {...props}
  />
));

RadioGroupIndicator.displayName = Indicator.displayName;

/* -----------------------------------------------------------------------------
 * Component: RadioGroupItem
 * -------------------------------------------------------------------------- */

interface RadioGroupItemProps
  extends Omit<RadioGroupItemVariantsProps, 'variant'>,
    ItemProps {}

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof Item>,
  RadioGroupItemProps
>(({ children, className, ...props }, forwardedRef) => {
  const { variant } = React.useContext(RadioGroupContext);

  return (
    <Item
      className={cn(radioGroupItemVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    >
      {variant === 'default' ? <RadioGroupIndicator /> : children}
    </Item>
  );
});

RadioGroupItem.displayName = Item.displayName;
