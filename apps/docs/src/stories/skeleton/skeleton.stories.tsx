import { Skeleton } from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  tags: ['autodocs'],
  title: 'UI/Skeleton',
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  args: {
    className: 'w-32 h-4',
  },
};

export const ProfileLoading: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[15.625rem]" />
        <Skeleton className="h-4 w-[12.5rem]" />
      </div>
    </div>
  ),
};
