import { ScrollArea } from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Scroll Area',
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export const Basic: Story = {
  args: {
    className: 'h-72 w-48 rounded-md border',
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <div className="mb-4 text-sm font-medium leading-none">Tags</div>
        <div className="space-y-2 divide-y">
          {TAGS.map((tag) => (
            <div className="pt-2 text-sm" key={tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  ),
};
