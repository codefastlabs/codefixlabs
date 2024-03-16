import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import {
  CalendarIcon,
  CreditCardIcon,
  SettingsIcon,
  SmileIcon,
  TableIcon,
  UserIcon,
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Command> = {
  component: Command,
  tags: ['autodocs'],
  title: 'UI/Command',
};

export default meta;

type Story = StoryObj<typeof Command>;

/* -----------------------------------------------------------------------------
 * Story: Default
 * -------------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => (
    <Command {...args}>
      <CommandInput placeholder="Type a command or search..." />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          <CommandItem>
            Calendar
            <CalendarIcon className="order-first" size={16} />
          </CommandItem>
          <CommandItem>
            Search Emoji
            <SmileIcon className="order-first" size={16} />
          </CommandItem>
          <CommandItem>
            Table
            <TableIcon className="order-first" size={16} />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          <CommandItem>
            Profile
            <UserIcon className="order-first" size={16} />
          </CommandItem>
          <CommandItem>
            Billing
            <CreditCardIcon className="order-first" size={16} />
          </CommandItem>
          <CommandItem>
            Settings
            <SettingsIcon className="order-first" size={16} />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/* -----------------------------------------------------------------------------
 * Story: Dialog
 * -------------------------------------------------------------------------- */

function CommandWithDialog(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </Button>

      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput placeholder="Type a command or search..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Suggestions">
            <CommandItem>
              Calendar
              <CalendarIcon className="order-first" size={16} />
            </CommandItem>
            <CommandItem>
              Search Emoji
              <SmileIcon className="order-first" size={16} />
            </CommandItem>
            <CommandItem>
              Table
              <TableIcon className="order-first" size={16} />
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem>
              Profile
              <UserIcon className="order-first" size={16} />
            </CommandItem>
            <CommandItem>
              Billing
              <CreditCardIcon className="order-first" size={16} />
            </CommandItem>
            <CommandItem>
              Settings
              <SettingsIcon className="order-first" size={16} />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export const Dialog: Story = {
  render: (args) => <CommandWithDialog {...args} />,
};
