import { isValidPhoneNumber, wait } from '@codefixlabs/lib';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@codefixlabs/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InputPhoneNumber } from '@codefixlabs/ui/input-phone-number';
import { Label } from '@codefixlabs/ui/label';
import { Button } from '@codefixlabs/ui/button';

const meta: Meta<typeof InputPhoneNumber> = {
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
  },
  component: InputPhoneNumber,
  tags: ['autodocs'],
  title: 'UI/Input Phone Number',
};

export default meta;

type Story = StoryObj<typeof InputPhoneNumber>;

export const Basic: Story = {
  args: {
    placeholder: 'Enter your phone number',
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    placeholder: 'Enter your phone number',
  },
};

export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="email-2">Phone Number</Label>
      <InputPhoneNumber
        {...args}
        id="email-2"
        placeholder="Enter your phone number"
      />
    </div>
  ),
};

/* -----------------------------------------------------------------------------
 * Story: React Hook Form
 * -------------------------------------------------------------------------- */

const formSchema = z.object({
  phone: z
    .object({
      phoneCode: z.string().min(1, 'Phone Code is required.'),
      phoneNumber: z.string().min(1, 'Phone Number is required.'),
    })
    .refine((value) => isValidPhoneNumber(value), {
      message: 'Phone Number is invalid.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

function InputReactHookForm(
  args: ComponentProps<typeof InputPhoneNumber>,
): React.JSX.Element {
  const form = useForm<FormValues>({
    defaultValues: {
      phone: {
        phoneCode: '+84',
        phoneNumber: '',
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
        className="space-y-6"
        onSubmit={
          form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field, formState }): React.JSX.Element => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <InputPhoneNumber
                  disabled={formState.isSubmitting}
                  placeholder="Enter your phone number"
                  {...args}
                  {...field}
                />
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
  render: (args) => <InputReactHookForm {...args} />,
};
