import { VerifyEmailTemplate } from '@codefixlabs/ui/email';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof VerifyEmailTemplate> = {
  component: VerifyEmailTemplate,
  tags: ['autodocs'],
  title: 'Mail/Verify Email',
};

export default meta;

type Story = StoryObj<typeof VerifyEmailTemplate>;

export const Basic: Story = {
  args: {
    userName: 'Vuong Phan',
    verifyEmailLink: '',
  },
};
