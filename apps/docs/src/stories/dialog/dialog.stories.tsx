import { wait } from '@codefixlabs/lib';
import { Button } from '@codefixlabs/ui/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@codefixlabs/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@codefixlabs/ui/form';
import { Input, InputPassword } from '@codefixlabs/ui/input';
import { Label } from '@codefixlabs/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  tags: ['autodocs'],
  title: 'UI/Dialog',
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="w-screen max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Edit profile</DialogTitle>
        </DialogHeader>
        <DialogBody className="grid gap-4 p-6">
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input
              className="col-span-3"
              defaultValue="Pedro Duarte"
              id="name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="username">
              Username
            </Label>
            <Input
              className="col-span-3"
              defaultValue="@peduarte"
              id="username"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild className="ml-auto">
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Simple: Story = {
  args: {
    variant: 'simple',
  },
  render: Basic.render,
};

export const Scrolling: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="w-screen max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Edit profile</DialogTitle>
        </DialogHeader>

        <DialogBody className="p-6">
          <p>
            This is some placeholder content to show a vertically centered
            modal. We&apos;ve added some extra copy here to show how vertically
            centering the modal works when combined with scrollable modals. We
            also use some repeated line breaks to quickly extend the height of
            the content, thereby triggering the scrolling. When content becomes
            longer than the predefined max-height of modal, content will be
            cropped and scrollable within the modal.
          </p>
          {Array.from({ length: 40 }).map(() => (
            <br key={Math.random()} />
          ))}
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild className="ml-auto">
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Scrollable: Story = {
  args: {
    scrollable: true,
  },
  render: Scrolling.render,
};

/* -----------------------------------------------------------------------------
 * Form
 * -------------------------------------------------------------------------- */

const dialogFormSchema = z.object({
  confirmPassword: z.string().min(1).max(255),
  email: z.string().email().max(255),
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
});

type DialogFormSchema = z.infer<typeof dialogFormSchema>;

function DialogForm(
  props: React.ComponentProps<typeof Dialog>,
): React.JSX.Element {
  const [open, setOpen] = useState(false);

  const form = useForm<DialogFormSchema>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      firstName: 'Pedro',
      lastName: 'Duarte',
      password: '',
    },
    resolver: zodResolver(dialogFormSchema),
  });

  const onSubmit: SubmitHandler<DialogFormSchema> = async (
    values,
  ): Promise<void> => {
    await wait(1000);
    // eslint-disable-next-line no-console -- demo
    console.log(values);
    setOpen(false);
  };

  return (
    <Dialog {...props} onOpenChange={setOpen} open={open} scrollable>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-screen max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Edit profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid overflow-auto"
            onSubmit={
              form.handleSubmit(
                onSubmit,
              ) as React.FormEventHandler<HTMLFormElement>
            }
          >
            <DialogBody className="space-y-4 p-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field, formState }): React.JSX.Element => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input disabled={formState.isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field, formState }): React.JSX.Element => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input disabled={formState.isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field, formState }): React.JSX.Element => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={formState.isSubmitting}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, formState }): React.JSX.Element => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputPassword
                        disabled={formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, formState }): React.JSX.Element => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <InputPassword
                        disabled={formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogBody>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={form.formState.isSubmitting}
                  variant="outline"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button loading={form.formState.isSubmitting} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export const FormScrolling: Story = {
  render: (args) => <DialogForm {...args} />,
};
