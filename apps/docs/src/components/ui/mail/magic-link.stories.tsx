import { MagicLinkTemplate } from '@codefixlabs/ui/mail';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MagicLinkTemplate> = {
  component: MagicLinkTemplate,
  tags: ['autodocs'],
  title: 'Mail/Magic Link',
};

export default meta;

type Story = StoryObj<typeof MagicLinkTemplate>;

export const Basic: Story = {
  args: {
    magicLink:
      'http://localhost:3002/api/auth/callback/verify-email?token=ad530f5a67edd13e434e0c9797ad82c64671dd8795cac6aceaccd0706a0b82a3&email=mr.thevuong%40gmail.com',
    userName: 'Vuong Phan',
  },
};
