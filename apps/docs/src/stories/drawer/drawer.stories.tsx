import { Button } from '@codefixlabs/ui/react/button';
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@codefixlabs/ui/react/drawer';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  tags: ['autodocs'],
  title: 'UI/Drawer',
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open</Button>
      </DrawerTrigger>

      <DrawerContent className="max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer Description</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="p-6">
          <p>
            This is some placeholder content to show a vertically centered
            modal. We&apos;ve added some extra copy here to show how vertically
            centering the modal works when combined with scrollable modals. We
            also use some repeated line breaks to quickly extend the height of
            the content, thereby triggering the scrolling. When content becomes
            longer than the predefined max-height of modal, content will be
            cropped and scrollable within the modal.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Secondary</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Primary</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open</Button>
      </DrawerTrigger>

      <DrawerContent className="max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer Description</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="p-6">
          <p>
            This is some placeholder content to show a vertically centered
            modal. We&apos;ve added some extra copy here to show how vertically
            centering the modal works when combined with scrollable modals. We
            also use some repeated line breaks to quickly extend the height of
            the content, thereby triggering the scrolling. When content becomes
            longer than the predefined max-height of modal, content will be
            cropped and scrollable within the modal.
          </p>
          {Array.from({ length: 80 }).map(() => (
            <br key={Math.random()} />
          ))}
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Secondary</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Primary</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const LeftScrolling: Story = {
  args: {
    position: 'left',
  },
  render: Scrolling.render,
};

export const Scrollable: Story = {
  args: {
    scrollable: true,
  },
  render: Scrolling.render,
};

export const LeftScrollable: Story = {
  args: {
    position: 'left',
    scrollable: true,
  },
  render: Scrolling.render,
};
