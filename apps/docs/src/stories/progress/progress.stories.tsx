import { Progress } from '@codefixlabs/ui/react/progress';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Progress> = {
  component: Progress,
  tags: ['autodocs'],
  title: 'UI/Progress',
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Basic: Story = {
  args: {
    value: 100 - Math.random() * 100,
  },
};
