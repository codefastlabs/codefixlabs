import { Slot } from '@radix-ui/react-slot';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/react/button';
import type { CommandItemProps, CommandProps } from '@/react/command';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/react/command';
import type { FormControl } from '@/react/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/react/popover';
import { cn } from '@/server/cn';

/* -----------------------------------------------------------------------------
 * Utils
 * -------------------------------------------------------------------------- */

export interface Option {
  icon?: React.ReactNode;
  label: string;
  value: string;
}

export interface OptionGroup {
  label: string;
  options: Option[];
}

export type Options = Option[] | OptionGroup[];

function isOptionGroup(options: Options): options is OptionGroup[] {
  return options.length > 0 && 'options' in options[0];
}

function findComboboxOption(
  options: Options,
  value?: string,
): Option | undefined {
  if (!value) {
    return undefined;
  }

  if (isOptionGroup(options)) {
    for (const group of options) {
      const option = group.options.find(
        (opt) => opt.value.toLowerCase() === value,
      );

      if (option) {
        return option;
      }
    }
  } else {
    return options.find((option) => option.value.toLowerCase() === value);
  }
}

/* -----------------------------------------------------------------------------
 * Component: ComboboxGroupItem
 * -------------------------------------------------------------------------- */

type ComboboxGroupItemProps = Omit<
  CommandItemProps,
  'onSelect' | 'selected'
> & {
  heading?: string;
  options: Option[];
  selected?: Option;
  onSelect?: (value: Option) => void;
};

function ComboboxGroupItem({
  heading,
  options,
  selected,
  onSelect,
  ...props
}: ComboboxGroupItemProps): React.JSX.Element {
  return (
    <CommandGroup heading={heading}>
      {options.map((option) => (
        <CommandItem
          key={option.value}
          onSelect={() => onSelect?.(option)}
          value={`${option.label.trim()}_${option.value}`}
          {...props}
        >
          {option.icon}
          {option.label}
          <CheckIcon
            className={cn(
              'ml-auto size-4',
              option.value === selected?.value ? 'opacity-100' : 'opacity-0',
            )}
          />
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

/* -----------------------------------------------------------------------------
 * Component: Combobox
 * -------------------------------------------------------------------------- */

export interface ComboboxProps
  extends Omit<CommandProps, 'onSelect' | 'slot' | 'variant'> {
  empty?: string;
  onSelect: (value: Option) => void;
  options: Options;
  placeholder?: string;
  selected: Option | Option['value'] | undefined;
  block?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  slot?: {
    FormControl?: typeof FormControl;
  };
  classNameTrigger?: string;
}

export function Combobox({
  icon,
  slot,
  options,
  empty,
  block,
  disabled,
  placeholder,
  selected: initialSelected,
  onSelect,
  classNameTrigger,
  ...props
}: ComboboxProps): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const Trigger = slot?.FormControl ?? Slot;

  const selected = React.useMemo(() => {
    if (typeof initialSelected === 'string') {
      return findComboboxOption(options, initialSelected);
    }

    return initialSelected;
  }, [initialSelected, options]);

  return (
    <Popover onOpenChange={setOpen} open={open} variant="simple">
      <Trigger>
        <PopoverTrigger asChild>
          <Button
            block={block}
            className={classNameTrigger}
            disabled={disabled}
            endIcon={<ChevronsUpDownIcon size={14} />}
            justify="between"
            startIcon={icon}
            variant="outline"
          >
            {selected?.value
              ? selected.label
              : placeholder ?? 'Select an option'}
          </Button>
        </PopoverTrigger>
      </Trigger>
      <PopoverContent align="start">
        <Command {...props} variant="dialog">
          <CommandInput placeholder={placeholder} />
          <CommandList className="max-h-[clamp(6.25rem,calc(var(--radix-popover-content-available-height)-3.75rem),25rem)]">
            <CommandEmpty>{empty}</CommandEmpty>
            {isOptionGroup(options) ? (
              options.map((option, index) => (
                <React.Fragment key={option.label}>
                  <ComboboxGroupItem
                    heading={option.label}
                    key={option.label}
                    onSelect={(value) => {
                      onSelect(value);
                      setOpen(false);
                    }}
                    options={option.options}
                    selected={selected}
                  />
                  {index < options.length - 1 && <CommandSeparator />}
                </React.Fragment>
              ))
            ) : (
              <ComboboxGroupItem
                onSelect={(value) => {
                  onSelect(value);
                  setOpen(false);
                }}
                options={options}
                selected={selected}
              />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
