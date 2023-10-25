import { Badge } from '@codefixlabs/ui/react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'outline', 'destructive'],
    },
  },
  args: {
    children: 'Badge',
    variant: 'primary',
  },
  component: Badge,
  tags: ['autodocs'],
  title: 'UI/Badge',
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Basic: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="space-x-4">
      <Badge variant="primary">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};
