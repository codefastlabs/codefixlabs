import { Slider } from '@codefixlabs/ui/slider';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Slider> = {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    disabled: false,
  },
  component: Slider,
  tags: ['autodocs'],
  title: 'UI/Slider',
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  args: {
    defaultValue: [Math.random() * 100],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <form>
      <Slider {...args} />
    </form>
  ),
};
