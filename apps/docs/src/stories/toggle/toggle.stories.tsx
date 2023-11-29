import { Toggle } from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { ItalicIcon } from 'lucide-react';

const meta: Meta<typeof Toggle> = {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'outline'],
    },
  },
  args: {
    disabled: false,
    size: 'md',
    variant: 'primary',
  },
  component: Toggle,
  tags: ['autodocs'],
  title: 'UI/Toggle',
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Basic: Story = {
  args: {
    'aria-label': 'Toggle italic',
  },
  render: (args) => (
    <Toggle {...args}>
      <ItalicIcon size={16} />
    </Toggle>
  ),
};
