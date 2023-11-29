import {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
} from 'lucide-react';

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  tags: ['autodocs'],
  title: 'UI/Toolbar',
};

export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Basic: Story = {
  args: {
    'aria-label': 'Formatting options',
  },
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarToggleGroup aria-label="Text formatting" type="multiple">
        <ToolbarToggleItem aria-label="Bold" value="bold">
          <BoldIcon size={16} />
        </ToolbarToggleItem>
        <ToolbarToggleItem aria-label="Italic" value="italic">
          <ItalicIcon size={16} />
        </ToolbarToggleItem>
        <ToolbarToggleItem aria-label="Strike through" value="strikethrough">
          <StrikethroughIcon size={16} />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup
        aria-label="Text alignment"
        defaultValue="center"
        type="single"
      >
        <ToolbarToggleItem aria-label="Left aligned" value="left">
          <AlignLeftIcon size={16} />
        </ToolbarToggleItem>
        <ToolbarToggleItem aria-label="Center aligned" value="center">
          <AlignCenterIcon size={16} />
        </ToolbarToggleItem>
        <ToolbarToggleItem aria-label="Right aligned" value="right">
          <AlignRightIcon size={16} />
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarLink className="mr-2.5" href="#" target="_blank">
        Edited 2 hours ago
      </ToolbarLink>
      <ToolbarButton className="ml-auto">Share</ToolbarButton>
    </Toolbar>
  ),
};
