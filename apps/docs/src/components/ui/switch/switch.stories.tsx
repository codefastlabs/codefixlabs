import { wait } from '@codefixlabs/lib';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Label,
  Switch,
} from '@codefixlabs/ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const meta: Meta<typeof Switch> = {
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    disabled: false,
  },
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Switch',
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  render: (args) => (
    <form>
      <div className="flex items-center gap-2">
        <Switch id="airplane-mode" {...args} />
        <Label htmlFor="airplane-mode">Airplane mode</Label>
      </div>
    </form>
  ),
};

/* -----------------------------------------------------------------------------
 * Story: ReactHookForm
 * -------------------------------------------------------------------------- */

const formSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

function SwitchReactHookForm(): React.JSX.Element {
  const form = useForm<FormValues>({
    defaultValues: {
      security_emails: true,
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
        className="w-full space-y-6"
        onSubmit={
          form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <div className="">
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="marketing_emails"
              render={({ field, formState }): React.JSX.Element => (
                <FormItem
                  className="items-center justify-between rounded-lg border p-4"
                  inline
                >
                  <div className="space-y-0.5">
                    <FormLabel>Marketing emails</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      disabled={formState.isSubmitting}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="security_emails"
              render={({ field }): React.JSX.Element => (
                <FormItem
                  className="items-center justify-between rounded-lg border p-4"
                  inline
                >
                  <div className="space-y-0.5">
                    <FormLabel>Security emails</FormLabel>
                    <FormDescription>
                      Receive emails about your account security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      aria-readonly
                      checked={field.value}
                      disabled
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button loading={form.formState.isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export const ReactHookForm: Story = {
  render: (args) => <SwitchReactHookForm {...args} />,
};
