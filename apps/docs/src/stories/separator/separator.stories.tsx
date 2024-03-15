import { Separator } from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Separator> = {
  component: Separator,
  tags: ['autodocs'],
  title: 'UI/Separator',
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-4 w-full max-w-[18.75rem]">
      <div className="text-sm font-medium">Radix Primitives</div>
      <p className="text-muted-foreground text-sm">
        An open-source UI component library.
      </p>
      <Separator {...args} />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator {...args} decorative orientation="vertical" />
        <div>Docs</div>
        <Separator {...args} decorative orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};
