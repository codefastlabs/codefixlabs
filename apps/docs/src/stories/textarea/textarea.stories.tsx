import { wait } from '@codefixlabs/lib';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  Textarea,
} from '@codefixlabs/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  tags: ['autodocs'],
  title: 'UI/Textarea',
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea {...args} id="message" placeholder="Type your message here." />
    </div>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea
        {...args}
        id="message-2"
        placeholder="Type your message here."
      />
      <p className="text-muted-foreground text-sm">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
};

export const WithButton: Story = {
  render: (args) => (
    <div className="grid w-full gap-2">
      <Textarea {...args} placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  ),
};

/* -----------------------------------------------------------------------------
 * Story: React Hook Form
 * -------------------------------------------------------------------------- */

const formSchema = z.object({
  bio: z
    .string({
      required_error: 'Bio is required.',
    })
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

function TextareaReactHookForm(): React.JSX.Element {
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
        className="w-2/3 space-y-6"
        onSubmit={
          form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <FormField
          control={form.control}
          name="bio"
          render={({ field, formState }): React.JSX.Element => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  disabled={formState.isSubmitting}
                  placeholder="Tell us a little bit about yourself"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
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
  render: () => <TextareaReactHookForm />,
};
