import { wait } from '@codefixlabs/lib';
import {
  Button,
  DatePicker,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@codefixlabs/ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { add } from 'date-fns';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { FieldPathValue, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { DateRange } from 'react-day-picker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  tags: ['autodocs'],
  title: 'UI/Date Picker',
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

/* -----------------------------------------------------------------------------
 * Story: Single
 * -------------------------------------------------------------------------- */

function CalendarPickerWithSingle(
  props: ComponentProps<typeof DatePicker>,
): React.JSX.Element {
  const [selectedDay, setSelectedDay] = useState<Date>();

  return (
    <DatePicker
      {...props}
      mode="single"
      onSelect={setSelectedDay}
      selected={selectedDay}
    />
  );
}

export const Single: Story = {
  render: (args) => <CalendarPickerWithSingle {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Multiple
 * -------------------------------------------------------------------------- */

function CalendarPickerWithMultiple(
  props: ComponentProps<typeof DatePicker>,
): React.JSX.Element {
  const [days, setDays] = useState<Date[]>();

  return (
    <DatePicker {...props} mode="multiple" onSelect={setDays} selected={days} />
  );
}

export const Multiple: Story = {
  render: (args) => <CalendarPickerWithMultiple {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Range
 * -------------------------------------------------------------------------- */

function CalendarPickerWithRange(
  props: ComponentProps<typeof DatePicker>,
): React.JSX.Element {
  const [range, setRange] = useState<DateRange>();

  return (
    <DatePicker
      {...props}
      defaultMonth={range?.from}
      mode="range"
      onSelect={setRange}
      selected={range}
    />
  );
}

export const Range: Story = {
  render: (args) => <CalendarPickerWithRange {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Range With Input
 * -------------------------------------------------------------------------- */

export const RangeWithInput: Story = {
  args: {
    showDateRangeInput: true,
  },
  render: (args) => <CalendarPickerWithRange {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Range Two Months
 * -------------------------------------------------------------------------- */

export const RangeTwoMonths: Story = {
  args: {
    numberOfMonths: 2,
  },
  render: (args) => <CalendarPickerWithRange {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Range Two Months With Input
 * -------------------------------------------------------------------------- */

export const RangeTwoMonthsWithInput: Story = {
  args: {
    numberOfMonths: 2,
    showDateRangeInput: true,
  },
  render: (args) => <CalendarPickerWithRange {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: ReactHookForm
 * -------------------------------------------------------------------------- */

const formSchema = z.object({
  dayOfBirth: z.date({
    required_error: 'A date of birth is required.',
  }),
  range: z.object(
    {
      from: z.date({ required_error: 'A start date is required.' }),
      to: z.date({ required_error: 'An end date is required.' }),
    },
    {
      required_error: 'A date range is required.',
    },
  ),
});

type FormValues = z.infer<typeof formSchema>;

function CalendarReactHookForm(
  props: ComponentProps<typeof DatePicker>,
): React.JSX.Element {
  const form = useForm<FormValues>({
    defaultValues: {
      dayOfBirth: new Date(),
      range: {
        from: new Date(),
        to: new Date(),
      },
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await wait(1000);
    // eslint-disable-next-line no-console -- demo
    console.log('data', data);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={
          form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <FormField
          control={form.control}
          name="dayOfBirth"
          render={({ field }): React.JSX.Element => (
            <FormItem>
              <FormLabel
                required
                tooltip="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet at, culpa, dolor eligendi eos esse in nemo non nostrum quae quaerat quasi quo recusandae soluta, suscipit tempore unde."
              >
                Date of birth
              </FormLabel>
              <DatePicker
                {...props}
                classNameTrigger="flex"
                disabled={(date): boolean =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
                mode="single"
                onSelect={(day) => {
                  field.onChange(day);
                }}
                selected={field.value}
                slot={{ FormControl }}
              />
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="range"
          render={({ field }): React.JSX.Element => (
            <FormItem>
              <FormLabel required>Date range</FormLabel>
              <DatePicker
                {...props}
                classNameTrigger="flex"
                defaultMonth={field.value.from}
                disabled={(date): boolean =>
                  date >
                    add(new Date(), { hours: 23, minutes: 59, seconds: 59 }) ||
                  date < new Date('1900-01-01')
                }
                initialFocus
                mode="range"
                onSelect={(range) => {
                  field.onChange(range as FieldPathValue<FormValues, 'range'>);
                }}
                selected={field.value}
                showDateRangeInput
                slot={{ FormControl }}
              />
              <FormDescription>
                A range of dates is used to calculate the number of days between
                the start and end dates.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button loading={form.formState.isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export const ReactHookForm: Story = {
  render: (args) => <CalendarReactHookForm {...args} />,
};
