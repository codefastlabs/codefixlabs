import { Alert, AlertDescription, AlertTitle } from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { TerminalIcon } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ['autodocs'],
  title: 'UI/Alert',
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <TerminalIcon size={16} />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: Default.render,
};
