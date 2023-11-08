import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { PlusIcon } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Tooltip',
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    delayDuration: 100,
  },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button
          aria-label="Customise options"
          shape="pill"
          startIcon={<PlusIcon className="h-4 w-4" />}
          variant="outline"
        />
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
};
