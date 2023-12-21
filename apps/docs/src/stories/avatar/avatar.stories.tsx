import { Avatar } from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Avatar',
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {
  render: (args) => (
    <Avatar
      {...args}
      alt="Pedro Duarte"
      fallback="PD"
      src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
    />
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Avatar
        {...args}
        alt="Colm Tuite"
        className="size-6"
        fallback="CT"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      />

      <Avatar
        {...args}
        alt="Colm Tuite"
        className="size-8"
        fallback="CT"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      />

      <Avatar
        {...args}
        alt="Colm Tuite"
        fallback="CT"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      />

      <Avatar
        {...args}
        alt="Colm Tuite"
        className="size-16"
        fallback="CT"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      />

      <Avatar
        {...args}
        alt="Colm Tuite"
        className="size-20"
        fallback="CT"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      />
    </div>
  ),
};
