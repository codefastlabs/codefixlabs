import { Button } from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ActivitySquare,
  ArrowUpRightSquare,
  GanttChartSquare,
  GitFork,
} from 'lucide-react';

const icons = {
  ActivitySquare,
  ArrowUpRightSquare,
  GanttChartSquare,
  GitFork,
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
          BellIcon: 'Bell',
          BookmarkIcon: 'Bookmark',
          GearIcon: 'Gear',
          LayersIcon: 'Layers',
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
          BellIcon: 'Bell',
          BookmarkIcon: 'Bookmark',
          GearIcon: 'Gear',
          LayersIcon: 'Layers',
        },
        type: 'select',
      },
      mapping: icons,
      options: Object.keys(icons),
    },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'outline', 'destructive', 'ghost'],
    },
  },
  args: {
    block: false,
    disabled: false,
    loading: false,
    shape: 'rounded',
    size: 'md',
    variant: 'primary',
  },
  component: Button,
  tags: ['autodocs'],
  title: 'UI/Button',
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'Button',
  },
};

export const Icon: Story = {
  args: {
    startIcon: GitFork,
  },
};

export const Secondary: Story = {
  args: {
    ...Basic.args,
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Basic.args,
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    ...Basic.args,
    variant: 'destructive',
  },
};

export const Ghost: Story = {
  args: {
    ...Basic.args,
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
    ...Basic.args,
    block: true,
  },
};

export const RoundedFull: Story = {
  args: {
    ...Basic.args,
    shape: 'pill',
  },
};

export const Loading: Story = {
  args: {
    ...Basic.args,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  },
};

export const IconLeft: Story = {
  args: {
    ...Basic.args,
    startIcon: GitFork,
  },
};

export const IconRight: Story = {
  args: {
    ...Basic.args,
    endIcon: GanttChartSquare,
  },
};
