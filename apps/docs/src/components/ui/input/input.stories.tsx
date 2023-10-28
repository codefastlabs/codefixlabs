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
  Input,
  Label,
} from '@codefixlabs/ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { CogIcon, SearchIcon } from 'lucide-react';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  title: 'UI/Input',
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: 'Email',
    type: 'email',
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    placeholder: 'Email',
    type: 'email',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input {...args} id="email" placeholder="Email" type="email" />
    </div>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="email-2">Email</Label>
      <Input {...args} id="email-2" placeholder="Email" type="email" />
      <p className="text-muted-foreground text-sm">Enter your email address.</p>
    </div>
  ),
};

export const WithButton: Story = {
  render: (args) => (
    <div className="flex w-full items-center space-x-2">
      <Input {...args} placeholder="Email" type="email" />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};

export const Password: Story = {
  render: (args) => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input {...args} id="password" placeholder="Password" type="password" />
    </div>
  ),
};

export const File: Story = {
  render: (args) => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input {...args} id="picture" type="file" />
    </div>
  ),
};

/* -----------------------------------------------------------------------------
 * Story: React Hook Form
 * -------------------------------------------------------------------------- */

const formSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

function InputReactHookForm(): React.JSX.Element {
  const form = useForm<FormValues>({
    defaultValues: {
      // Ref: https://bobbyhadz.com/blog/react-component-changing-uncontrolled-input
      username: '',
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
          name="username"
          render={({ field, formState }): React.JSX.Element => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={formState.isSubmitting}
                  placeholder="nextjs"
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
  render: () => <InputReactHookForm />,
};

// Start Icon
export const StartIcon: Story = {
  args: {
    placeholder: 'Search...',
    startIcon: <SearchIcon className="w-4.5 h-4.5" />,
    type: 'text',
  },
};

// End Icon
export const EndIcon: Story = {
  args: {
    endIcon: <SearchIcon className="w-4.5 h-4.5" />,
    placeholder: 'Search...',
    type: 'text',
  },
};

// Start and End Icon
export const StartAndEndIcon: Story = {
  args: {
    endIcon: <CogIcon className="w-4.5 h-4.5" />,
    placeholder: 'Search...',
    startIcon: <SearchIcon className="w-4.5 h-4.5" />,
    type: 'text',
  },
};

// Inline with Start Icon
export const InlineWithStartIcon: Story = {
  args: {
    inline: true,
    placeholder: 'Search...',
    startIcon: <SearchIcon className="w-4.5 h-4.5" />,
    type: 'text',
  },
};

// Inline with End Icon
export const InlineWithEndIcon: Story = {
  args: {
    endIcon: <SearchIcon className="w-4.5 h-4.5" />,
    inline: true,
    placeholder: 'Search...',
    type: 'text',
  },
};

// Inline with Start and End Icon
export const InlineWithStartAndEndIcon: Story = {
  args: {
    endIcon: <CogIcon className="w-4.5 h-4.5" />,
    inline: true,
    placeholder: 'Search...',
    startIcon: <SearchIcon className="w-4.5 h-4.5" />,
    type: 'text',
  },
};
