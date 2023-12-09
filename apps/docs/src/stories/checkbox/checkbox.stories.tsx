import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
} from '@codefixlabs/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useId } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { wait } from '@codefixlabs/lib';

const meta: Meta<typeof Checkbox> = {
  argTypes: {
    disabled: { control: 'boolean' },
    onCheckedChange: { action: 'onCheckedChange' },
  },
  args: {
    disabled: false,
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'UI/Checkbox',
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

function CheckboxWithHooks(
  args: ComponentProps<typeof Checkbox>,
): React.JSX.Element {
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id={id} />
      <Label htmlFor={id}>Accept terms and conditions.</Label>
    </div>
  );
}

export const Basic: Story = {
  render: (args) => <CheckboxWithHooks {...args} />,
};

export const WithText: Story = {
  render: (args) => (
    <div className="items-top flex space-x-2">
      <Checkbox {...args} id="terms1" />
      <div className="grid gap-1.5">
        <Label htmlFor="terms1">Accept terms and conditions</Label>
        <p className="text-muted-foreground text-sm">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: Basic.render,
};

/* -----------------------------------------------------------------------------
 * Story: SingleReactHookForm
 * -------------------------------------------------------------------------- */

const formSchema = z.object({
  mobile: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

function CheckboxSingleReactHookForm(): React.JSX.Element {
  const form = useForm<FormValues>({
    defaultValues: {
      mobile: true,
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
          name="mobile"
          render={({ field, formState }): React.JSX.Element => (
            <FormItem className="rounded-md border p-4" inline>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  disabled={formState.isSubmitting}
                  onCheckedChange={(value) => {
                    field.onChange(value === 'indeterminate' ? false : value);
                  }}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>
                  Use different settings for my mobile devices
                </FormLabel>
                <FormDescription>
                  You can manage your mobile notifications in the{' '}
                  <Link className="hover:underline" href="/">
                    mobile settings
                  </Link>{' '}
                  page.
                </FormDescription>
              </div>
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

export const SingleReactHookForm: Story = {
  render: (args) => <CheckboxSingleReactHookForm {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: MultipleReactHookForm
 * -------------------------------------------------------------------------- */

const items = [
  {
    id: 'recent',
    label: 'Recent',
  },
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'applications',
    label: 'Applications',
  },
  {
    id: 'desktop',
    label: 'Desktop',
  },
  {
    id: 'downloads',
    label: 'Downloads',
  },
  {
    id: 'documents',
    label: 'Documents',
  },
] as const;

const multipleFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

type FormValues2 = z.infer<typeof multipleFormSchema>;

function CheckboxMultipleReactHookForm(): React.JSX.Element {
  const form = useForm<FormValues2>({
    defaultValues: {
      items: ['recent', 'home'],
    },
    resolver: zodResolver(multipleFormSchema),
  });

  const onSubmit: SubmitHandler<FormValues2> = async (data) => {
    await wait(1000);
    // eslint-disable-next-line no-console -- demo
    console.log('data', data);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={
          form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <FormField
          control={form.control}
          name="items"
          render={(): React.JSX.Element => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  control={form.control}
                  key={item.id}
                  name="items"
                  render={({ field, formState }): React.JSX.Element => (
                    <FormItem inline key={item.id}>
                      <FormControl>
                        <Checkbox
                          checked={field.value.includes(item.id)}
                          disabled={formState.isSubmitting}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value.filter(
                                    (value) => value !== item.id,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
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

export const MultipleReactHookForm: Story = {
  render: (args) => <CheckboxMultipleReactHookForm {...args} />,
};
