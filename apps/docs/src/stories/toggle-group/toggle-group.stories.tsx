import { ToggleGroup, ToggleGroupItem } from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  tags: ['autodocs'],
  title: 'UI/Toggle Group',
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    'aria-label': 'Text alignment',
    defaultValue: 'center',
    type: 'single',
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem aria-label="Left aligned" value="left">
        <AlignLeftIcon size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Center aligned" value="center">
        <AlignCenterIcon size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Right aligned" value="right">
        <AlignRightIcon size={16} />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
