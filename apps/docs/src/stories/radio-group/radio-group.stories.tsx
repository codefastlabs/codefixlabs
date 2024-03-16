import { wait } from '@codefixlabs/lib';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@codefixlabs/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { useId } from 'react';
import type { FieldPathValue, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const meta: Meta<typeof RadioGroup> = {
  argTypes: {
    disabled: { control: 'boolean' },
    onValueChange: { action: 'onValueChange' },
  },
  args: {
    disabled: false,
  },
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'UI/Radio Group',
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

/* -----------------------------------------------------------------------------
 * Story: Default
 * -------------------------------------------------------------------------- */

function RadioGroupBasic(
  args: ComponentProps<typeof RadioGroup>,
): React.JSX.Element {
  const id = useId();

  return (
    <form>
      <RadioGroup {...args}>
        <div className="flex items-center gap-2">
          <RadioGroupItem id={`default-${id}`} value="default" />
          <Label htmlFor={`default-${id}`}>Default</Label>
        </div>

        <div className="flex items-center gap-2">
          <RadioGroupItem id={`comfortable-${id}`} value="comfortable" />
          <Label htmlFor={`comfortable-${id}`}>Comfortable</Label>
        </div>

        <div className="flex items-center gap-2">
          <RadioGroupItem id={`compact-${id}`} value="compact" />
          <Label htmlFor={`compact-${id}`}>Compact</Label>
        </div>
      </RadioGroup>
    </form>
  );
}

export const Default: Story = {
  args: {
    'aria-label': 'View density',
    defaultValue: 'default',
  },
  render: (args) => <RadioGroupBasic {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: ReactHookForm
 * -------------------------------------------------------------------------- */

const formSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

function RadioGroupReactHookForm(): React.JSX.Element {
  const form = useForm<FormValues>({
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
        className="space-y-6"
        onSubmit={
          form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field, formState }): React.JSX.Element => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  disabled={formState.isSubmitting}
                  onValueChange={(
                    value: FieldPathValue<FormValues, 'type'>,
                  ) => {
                    field.onChange(value);
                  }}
                >
                  <FormItem inline>
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>

                  <FormItem inline>
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Direct messages and mentions
                    </FormLabel>
                  </FormItem>

                  <FormItem inline>
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
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
  render: (args) => <RadioGroupReactHookForm {...args} />,
};
