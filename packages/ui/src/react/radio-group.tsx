import { Indicator, Item, Root } from '@radix-ui/react-radio-group';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

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

type RadioGroupVariants = VariantProps<typeof radioGroupVariants>;

const radioGroupItemVariants = cva(
  ['focus:outline-none', 'disabled:cursor-not-allowed disabled:opacity-50'],
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: [
          'text-primary border-muted-foreground h-4.25 w-4.25 aspect-square rounded-full border',
          'focus:ring-ring/40 focus:ring-2',
          'data-state-checked:border-primary',
        ],
        simple: ['group'],
      },
    },
  },
);

type RadioGroupItemVariants = VariantProps<typeof radioGroupItemVariants>;

/* -----------------------------------------------------------------------------
 * Provider: RadioGroupContext
 * -------------------------------------------------------------------------- */

export const RadioGroupContext = createContext<
  Pick<RadioGroupVariants, 'variant'>
>({});

/* -----------------------------------------------------------------------------
 * Component: RadioGroup
 * -------------------------------------------------------------------------- */

export const RadioGroup = forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root> & RadioGroupVariants
>(({ className, variant = 'default', ...props }, forwardedRef) => (
  <RadioGroupContext.Provider value={{ variant }}>
    <Root
      className={twMerge(radioGroupVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    />
  </RadioGroupContext.Provider>
));

RadioGroup.displayName = Root.displayName;

/* -----------------------------------------------------------------------------
 * Component: RadioGroupIndicator
 * -------------------------------------------------------------------------- */

export const RadioGroupIndicator = forwardRef<
  React.ElementRef<typeof Indicator>,
  React.ComponentPropsWithoutRef<typeof Indicator>
>(({ className, ...props }, forwardedRef) => (
  <Indicator
    className={twMerge(
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

export const RadioGroupItem = forwardRef<
  React.ElementRef<typeof Item>,
  React.ComponentPropsWithoutRef<typeof Item> &
    Omit<RadioGroupItemVariants, 'variant'>
>(({ children, className, ...props }, forwardedRef) => {
  const { variant } = useContext(RadioGroupContext);

  return (
    <Item
      className={twMerge(radioGroupItemVariants({ variant }), className)}
      ref={forwardedRef}
      {...props}
    >
      {variant === 'default' ? <RadioGroupIndicator /> : children}
    </Item>
  );
});

RadioGroupItem.displayName = Item.displayName;
