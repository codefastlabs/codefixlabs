import { wait } from '@codefixlabs/lib';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputPassword,
  Label,
} from '@codefixlabs/ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const meta: Meta<typeof InputPassword> = {
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
  },
  component: InputPassword,
  tags: ['autodocs'],
  title: 'UI/Input Password',
};

export default meta;

type Story = StoryObj<typeof InputPassword>;

export const Basic: Story = {
  args: {
    placeholder: 'Enter your password',
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    placeholder: 'Enter your password',
  },
};

export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="email-2">Password</Label>
      <InputPassword {...args} id="email-2" placeholder="Enter your password" />
    </div>
  ),
};

/* -----------------------------------------------------------------------------
 * Story: React Hook Form
 * -------------------------------------------------------------------------- */

const formSchema = z
  .object({
    password: z
      .string()
      .nonempty('Password is required.')
      .min(8, 'Password must be at least 8 characters.'),
    passwordConfirmation: z
      .string()
      .nonempty('Password confirmation is required.')
      .min(8, 'Password confirmation must be at least 8 characters.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  });

type FormValues = z.infer<typeof formSchema>;

function InputReactHookForm(
  args: ComponentProps<typeof InputPassword>,
): React.JSX.Element {
  const form = useForm<FormValues>({
    defaultValues: {
      // Ref: https://bobbyhadz.com/blog/react-component-changing-uncontrolled-input
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await wait(1000);
    // eslint-disable-next-line no-console
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
          name="password"
          render={({ field, formState }): React.JSX.Element => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword
                  disabled={formState.isSubmitting}
                  placeholder="Enter your password"
                  {...args}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field, formState }): React.JSX.Element => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <InputPassword
                  disabled={formState.isSubmitting}
                  placeholder="Enter your password"
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
