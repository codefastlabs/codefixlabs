import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { MenuIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useState } from 'react';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Dropdown Menu',
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

function DropdownMenuWithHooks(
  args: ComponentProps<typeof DropdownMenu>,
): React.JSX.Element {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState('pedro');

  return (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Customise options"
          shape="pill"
          startIcon={<MenuIcon className="h-4 w-4" />}
          variant="outline"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem inset shortcut="⌘+T">
          New Tab
        </DropdownMenuItem>
        <DropdownMenuItem inset shortcut="⌘+N">
          New Window
        </DropdownMenuItem>
        <DropdownMenuItem disabled inset shortcut="⇧+⌘+N">
          New Private Window
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger inset>More Tools</DropdownMenuSubTrigger>

          <DropdownMenuSubContent alignOffset={-5}>
            <DropdownMenuItem shortcut="⌘+S">Save Page As…</DropdownMenuItem>
            <DropdownMenuItem>Create Shortcut…</DropdownMenuItem>
            <DropdownMenuItem>Name Window…</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Developer Tools</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={bookmarksChecked}
          onCheckedChange={setBookmarksChecked}
          shortcut="⌘+B"
        >
          Show Bookmarks
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={urlsChecked}
          onCheckedChange={setUrlsChecked}
        >
          Show Full URLs
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel inset>People</DropdownMenuLabel>

        <DropdownMenuRadioGroup onValueChange={setPerson} value={person}>
          <DropdownMenuRadioItem value="pedro">
            Pedro Duarte
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="colm" variant="destructive">
            Colm Tuite
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const Basic: Story = {
  render: (args) => <DropdownMenuWithHooks {...args} />,
};
