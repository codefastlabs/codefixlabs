import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Context Menu',
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

function ContextMenuWithHooks(
  args: ComponentProps<typeof ContextMenu>,
): React.JSX.Element {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState('pedro');

  return (
    <ContextMenu {...args}>
      <ContextMenuTrigger className="py-11.25 text-3.75 block w-[18.75rem] select-none rounded border-2 border-dashed text-center">
        Right click here.
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem inset shortcut="⌘+[">
          Back
        </ContextMenuItem>

        <ContextMenuItem disabled inset shortcut="⌘+]">
          Forward
        </ContextMenuItem>

        <ContextMenuItem inset shortcut="⌘+R">
          Reload
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>

          <ContextMenuSubContent alignOffset={-5}>
            <ContextMenuItem shortcut="⌘+S">Save Page As…</ContextMenuItem>
            <ContextMenuItem>Create Shortcut…</ContextMenuItem>
            <ContextMenuItem>Name Window…</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />

        <ContextMenuCheckboxItem
          checked={bookmarksChecked}
          onCheckedChange={setBookmarksChecked}
          shortcut="⌘+B"
        >
          Show Bookmarks
        </ContextMenuCheckboxItem>

        <ContextMenuCheckboxItem
          checked={urlsChecked}
          onCheckedChange={setUrlsChecked}
        >
          Show Full URLs
        </ContextMenuCheckboxItem>

        <ContextMenuSeparator />

        <ContextMenuLabel inset>People</ContextMenuLabel>

        <ContextMenuRadioGroup onValueChange={setPerson} value={person}>
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm" variant="destructive">
            Colm Tuite
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const Basic: Story = {
  render: (args) => <ContextMenuWithHooks {...args} />,
};
