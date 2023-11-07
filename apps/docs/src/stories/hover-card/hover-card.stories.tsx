import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@codefixlabs/ui/react/hover-card';
import type { Meta, StoryObj } from '@storybook/react';
import { CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar } from '@codefixlabs/ui/react/avatar';

const meta: Meta<typeof HoverCard> = {
  component: HoverCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Hover Card',
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

export const Basic: Story = {
  args: {
    closeDelay: 100,
    openDelay: 100,
  },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Link
          href="https://twitter.com/radix_ui"
          rel="noreferrer noopener"
          target="_blank"
        >
          <Image
            alt="Radix UI"
            className="rounded-full"
            height={40}
            src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
            unoptimized
            width={40}
          />
        </Link>
      </HoverCardTrigger>

      <HoverCardContent>
        <div className="flex justify-between space-x-4">
          <Avatar alt="VC" fallback="VC" src="https://github.com/vercel.png" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-muted-foreground text-xs">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
