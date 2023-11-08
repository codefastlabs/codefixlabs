import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  tags: ['autodocs'],
  title: 'UI/Alert Dialog',
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Basic: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-screen max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody className="p-6">
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Scrolling: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-screen max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Edit profile
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogBody className="p-6">
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
        </AlertDialogBody>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Scrollable: Story = {
  args: {
    scrollable: true,
  },
  render: Scrolling.render,
};
