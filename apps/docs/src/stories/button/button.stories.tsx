import { Button } from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import {
  AlarmCheckIcon,
  CogIcon,
  GalleryThumbnailsIcon,
  GitForkIcon,
} from 'lucide-react';

const icons = {
  AlarmCheckIcon: <AlarmCheckIcon size={16} />,
  CogIcon: <CogIcon size={16} />,
  GalleryThumbnailsIcon: <GalleryThumbnailsIcon size={16} />,
  GitForkIcon: <GitForkIcon size={16} />,
};

const meta: Meta<typeof Button> = {
  argTypes: {
    block: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    endIcon: {
      control: {
        labels: {
          AlarmCheckIcon: 'AlarmCheckIcon',
          CogIcon: 'CogIcon',
          GalleryThumbnailsIcon: 'GalleryThumbnailsIcon',
          GitForkIcon: 'GitForkIcon',
        },
        type: 'select',
      },
      mapping: icons,
      options: Object.keys(icons),
    },
    loading: {
      control: 'boolean',
    },
    shape: {
      control: 'inline-radio',
      options: ['square', 'rounded', 'pill'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    startIcon: {
      control: {
        labels: {
          AlarmCheckIcon: 'AlarmCheckIcon',
          CogIcon: 'CogIcon',
          GalleryThumbnailsIcon: 'GalleryThumbnailsIcon',
          GitForkIcon: 'GitForkIcon',
        },
        type: 'select',
      },
      mapping: icons,
      options: Object.keys(icons),
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'secondary', 'outline', 'destructive', 'ghost'],
    },
  },
  args: {
    block: false,
    disabled: false,
    loading: false,
    shape: 'rounded',
    size: 'md',
    variant: 'default',
  },
  component: Button,
  tags: ['autodocs'],
  title: 'UI/Button',
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Icon: Story = {
  args: {
    startIcon: <GitForkIcon size={16} />,
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: 'destructive',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-x-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args}>Default</Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Block: Story = {
  args: {
    ...Default.args,
    block: true,
  },
};

export const RoundedFull: Story = {
  args: {
    ...Default.args,
    shape: 'pill',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const LoadingWithIcon: Story = {
  args: {
    ...Default.args,
    loading: true,
    startIcon: <GitForkIcon size={16} />,
  },
};

export const LoadingWithIconRight: Story = {
  args: {
    ...Default.args,
    endIcon: <CogIcon size={16} />,
    loading: true,
  },
};

export const LoadingWithIconBoth: Story = {
  args: {
    ...Default.args,
    endIcon: <CogIcon size={16} />,
    loading: true,
    startIcon: <GitForkIcon size={16} />,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const IconLeft: Story = {
  args: {
    ...Default.args,
    startIcon: <GitForkIcon size={16} />,
  },
};

export const IconRight: Story = {
  args: {
    ...Default.args,
    endIcon: <CogIcon size={16} />,
  },
};
