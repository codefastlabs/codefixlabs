import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';

const meta: Meta<typeof Menubar> = {
  component: Menubar,
  tags: ['autodocs'],
  title: 'UI/Menubar',
};

export default meta;

type Story = StoryObj<typeof Menubar>;

const RADIO_ITEMS = ['Andy', 'Benoît', 'Luis'];
const CHECK_ITEMS = ['Always Show Bookmarks Bar', 'Always Show Full URLs'];

function MenubarWithHooks(
  args: ComponentProps<typeof Menubar>,
): React.JSX.Element {
  const [checkedSelection, setCheckedSelection] = useState([CHECK_ITEMS[1]]);
  const [radioSelection, setRadioSelection] = useState(RADIO_ITEMS[2]);

  return (
    <Menubar {...args}>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>

        <MenubarContent align="start" alignOffset={-3}>
          <MenubarItem shortcut="⌘ T">New Tab</MenubarItem>
          <MenubarItem shortcut="⌘ N">New Window</MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>

          <MenubarSeparator />

          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>

            <MenubarSubContent alignOffset={-5}>
              <MenubarItem>Email Link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>

          <MenubarSeparator />

          <MenubarItem shortcut="⌘ P" variant="destructive">
            Print…
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>

        <MenubarContent align="start" alignOffset={-3}>
          <MenubarItem shortcut="⌘ Z">Undo</MenubarItem>
          <MenubarItem shortcut="⇧ ⌘ Z">Redo</MenubarItem>

          <MenubarSeparator />

          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>

            <MenubarSubContent alignOffset={-5}>
              <MenubarItem>Search the web…</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find…</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>

          <MenubarSeparator />

          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>

        <MenubarContent align="start" alignOffset={-14}>
          {CHECK_ITEMS.map((item) => (
            <MenubarCheckboxItem
              checked={checkedSelection.includes(item)}
              key={item}
              onCheckedChange={() => {
                setCheckedSelection((current) =>
                  current.includes(item)
                    ? current.filter((el) => el !== item)
                    : current.concat(item),
                );
              }}
            >
              {item}
            </MenubarCheckboxItem>
          ))}

          <MenubarSeparator />

          <MenubarItem inset shortcut="⌘ R">
            Reload
          </MenubarItem>
          <MenubarItem disabled inset shortcut="⇧ ⌘ R">
            Force Reload
          </MenubarItem>

          <MenubarSeparator />

          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>

        <MenubarContent align="start" alignOffset={-14}>
          <MenubarRadioGroup
            onValueChange={setRadioSelection}
            value={radioSelection}
          >
            {RADIO_ITEMS.map((item) => (
              <MenubarRadioItem key={item} value={item}>
                {item}
              </MenubarRadioItem>
            ))}

            <MenubarSeparator />

            <MenubarItem inset>Edit…</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Profile…</MenubarItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export const Basic: Story = {
  render: (args) => <MenubarWithHooks {...args} />,
};
