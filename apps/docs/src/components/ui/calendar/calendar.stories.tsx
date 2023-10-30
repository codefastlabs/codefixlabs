import { Calendar } from '@codefixlabs/ui/react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

const meta: Meta<typeof Calendar> = {
  argTypes: {
    captionLayout: {
      control: 'radio',
      options: ['dropdown', 'buttons', 'dropdown-buttons'],
    },
    fromYear: {
      control: 'number',
    },
    toYear: {
      control: 'number',
    },
  },
  args: {
    captionLayout: 'dropdown',
    fromYear: 2010,
    toYear: 2023,
  },
  component: Calendar,
  decorators: [
    (Story): React.JSX.Element => (
      <div className="w-auto">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Calendar',
};

export default meta;

type Story = StoryObj<typeof Calendar>;

/* -----------------------------------------------------------------------------
 * Story: Single
 * -------------------------------------------------------------------------- */

function CalendarWithSingle(
  props: ComponentProps<typeof Calendar>,
): React.JSX.Element {
  const [day, setDay] = useState<Date>();

  return <Calendar {...props} mode="single" onSelect={setDay} selected={day} />;
}

export const Single: Story = {
  render: (args) => <CalendarWithSingle {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Multiple
 * -------------------------------------------------------------------------- */

export const Multiple: Story = {
  render: (args) => <CalendarWithMultiple {...args} />,
};

function CalendarWithMultiple(
  props: ComponentProps<typeof Calendar>,
): React.JSX.Element {
  const [days, setDays] = useState<Date[]>();

  return (
    <Calendar {...props} mode="multiple" onSelect={setDays} selected={days} />
  );
}

/* -----------------------------------------------------------------------------
 * Story: Range
 * -------------------------------------------------------------------------- */

function CalendarWithRange(
  props: ComponentProps<typeof Calendar>,
): React.JSX.Element {
  const [range, setRange] = useState<DateRange>();

  return (
    <Calendar {...props} mode="range" onSelect={setRange} selected={range} />
  );
}

export const Range: Story = {
  render: (args) => <CalendarWithRange {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Range With Input
 * -------------------------------------------------------------------------- */

export const RangeWithInput: Story = {
  args: {
    showDateRangeInput: true,
  },
  render: (args) => <CalendarWithRange {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Range Two Months
 * -------------------------------------------------------------------------- */

export const RangeTwoMonths: Story = {
  args: {
    numberOfMonths: 2,
  },
  render: (args) => <CalendarWithRange {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Range Two Months With Input
 * -------------------------------------------------------------------------- */

export const RangeTwoMonthsWithInput: Story = {
  args: {
    numberOfMonths: 2,
    showDateRangeInput: true,
  },
  render: (args) => <CalendarWithRange {...args} />,
};
