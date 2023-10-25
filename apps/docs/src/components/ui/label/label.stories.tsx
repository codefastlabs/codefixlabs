import { Input, Label } from '@codefixlabs/ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useId } from 'react';

const meta: Meta<typeof Label> = {
  component: Label,
  tags: ['autodocs'],
  title: 'UI/Label',
};

export default meta;

type Story = StoryObj<typeof Label>;

function LabelWithHooks(args: ComponentProps<typeof Label>): React.JSX.Element {
  const id = useId();

  return (
    <div className="flex flex-wrap items-center gap-2 px-5">
      <Label {...args} htmlFor={id}>
        First name
      </Label>
      <Input defaultValue="Pedro Duarte" id={id} type="text" />
    </div>
  );
}

export const Basic: Story = {
  render: (args) => <LabelWithHooks {...args} />,
};

export const Required: Story = {
  args: {
    required: true,
  },
  render: Basic.render,
};

export const Tooltip: Story = {
  args: {
    tooltip: 'This is a tooltip',
  },
  render: Basic.render,
};
