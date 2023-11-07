import { AspectRatio } from '@codefixlabs/ui/react/aspect-ratio';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Aspect Ratio',
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Basic: Story = {
  args: {
    ratio: 774 / 1162,
  },
  render: (args) => (
    <div className="w-screen max-w-lg overflow-hidden rounded-lg shadow">
      <AspectRatio {...args}>
        <Image
          alt="Landscape photograph by Tobias Tullius"
          className="h-full w-full object-cover"
          height={774}
          src="https://images.unsplash.com/flagged/photo-1570700005880-4ecdb8595d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774"
          width={1162}
        />
      </AspectRatio>
    </div>
  ),
};
