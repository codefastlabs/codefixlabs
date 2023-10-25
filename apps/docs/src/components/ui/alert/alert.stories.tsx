import { Alert, AlertDescription, AlertTitle } from '@codefixlabs/ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { TerminalIcon } from 'lucide-react';

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ['autodocs'],
  title: 'UI/Alert',
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
  render: (args) => (
    <Alert {...args}>
      <TerminalIcon className="h-4 w-4" />
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
  render: Basic.render,
};
