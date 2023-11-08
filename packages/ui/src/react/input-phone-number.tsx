import { useCountries } from '@codefixlabs/hooks';
import { cx } from 'class-variance-authority';
import * as React from 'react';
import { forwardRef, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Popover, PopoverContent, PopoverTrigger } from '@/react/popover';
import { PrimitiveInput } from '@/react/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/react/command';
import { buttonVariants } from '@/classes/button';

/* -----------------------------------------------------------------------------
 * Component: InputPhoneNumber
 * -------------------------------------------------------------------------- */

export const InputPhoneNumber = forwardRef<
  React.ElementRef<typeof PrimitiveInput>,
  Omit<
    React.ComponentPropsWithoutRef<typeof PrimitiveInput>,
    'type' | 'value' | 'onChange'
  > & {
    value?: {
      phoneCode: string;
      phoneNumber?: string | null;
    };
    onChange?: (value: { phoneCode: string; phoneNumber: string }) => void;
  }
>(({ className, value, onChange, ...props }, forwardedRef) => {
  const [open, setOpen] = useState(false);
  const { countries } = useCountries();
  const currentCountry = useMemo(
    () => countries.find((country) => country.phonecode === value?.phoneCode),
    [countries, value?.phoneCode],
  );

  return (
    <div
      className={cx(
        'relative items-center gap-2',
        props.inline ? 'inline-flex' : 'flex',
      )}
    >
      <Popover onOpenChange={setOpen} open={open} variant="simple">
        <PopoverTrigger
          className={twMerge(
            buttonVariants({
              size: props.size,
              variant: 'outline',
            }),
            'px-3 font-normal',
            props.size === 'sm' ? 'text-xs' : 'text-sm',
          )}
        >
          {currentCountry ? (
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentCountry.flag}</span>
              <span>{currentCountry.phonecode}</span>
            </div>
          ) : (
            'Select Country'
          )}
        </PopoverTrigger>
        <PopoverContent align="start">
          <Command loop variant="dialog">
            <CommandInput placeholder="Search for a country" />
            <CommandList className="max-h-[clamp(6.25rem,calc(var(--radix-popover-content-available-height)-3.75rem),25rem)]">
              <CommandEmpty>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-2xl">🌎</span>
                  </div>
                  <p className="text-sm text-gray-500">No countries found</p>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {countries.map((country) => {
                  const selected = country.phonecode === value?.phoneCode;

                  return (
                    <CommandItem
                      className="justify-between"
                      key={country.isoCode}
                      onSelect={() => {
                        onChange?.({
                          phoneCode: country.phonecode,
                          phoneNumber: value?.phoneNumber ?? '',
                        });
                        setOpen(false);
                      }}
                      value={`${country.phonecode} ${country.name} ${country.isoCode}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{country.flag}</span>
                        <span className={selected ? 'font-medium' : undefined}>
                          {country.name}
                        </span>
                      </div>
                      <span
                        className={cx(
                          selected ? 'font-bold' : 'text-muted-foreground',
                        )}
                      >
                        {country.phonecode}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <PrimitiveInput
        className={twMerge(className)}
        inputMode="tel"
        ref={forwardedRef}
        type="tel"
        value={value?.phoneNumber ?? ''}
        {...props}
        onBlur={(event) => {
          onChange?.({
            phoneCode: value?.phoneCode ?? '',
            phoneNumber: event.target.value,
          });
        }}
        onChange={(event) => {
          onChange?.({
            phoneCode: value?.phoneCode ?? '',
            phoneNumber: event.target.value.replace(/[^0-9+]/g, ''),
          });
        }}
      />
    </div>
  );
});

InputPhoneNumber.displayName = 'InputPhoneNumber';
