import {
  Button,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  tags: ['autodocs'],
  title: 'UI/Drawer',
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
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
          <DrawerClose variant="outline">Secondary</DrawerClose>
          <DrawerClose>Primary</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Simple: Story = {
  args: {
    variant: 'simple',
  },
  render: Default.render,
};

export const ScrollingHorizontal: Story = {
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
          <p>
            End of content. This is some placeholder content to show a
            vertically
          </p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose variant="outline">Secondary</DrawerClose>
          <DrawerClose>Primary</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const ScrollingVertical: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open</Button>
      </DrawerTrigger>

      <DrawerContent className="max-h-96">
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
          <p>
            End of content. This is some placeholder content to show a
            vertically
          </p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose variant="outline">Secondary</DrawerClose>
          <DrawerClose>Primary</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Scrollable: Story = {
  args: {
    scrollable: true,
  },
  render: ScrollingHorizontal.render,
};

export const Left: Story = {
  args: {
    side: 'left',
  },
  render: ScrollingHorizontal.render,
};

export const LeftScrollable: Story = {
  args: {
    side: 'left',
    scrollable: true,
  },
  render: ScrollingHorizontal.render,
};

export const Top: Story = {
  args: {
    side: 'top',
  },
  render: ScrollingVertical.render,
};

export const TopScrollable: Story = {
  args: {
    side: 'top',
    scrollable: true,
  },
  render: ScrollingVertical.render,
};

export const Bottom: Story = {
  args: {
    side: 'bottom',
  },
  render: ScrollingVertical.render,
};

export const BottomScrollable: Story = {
  args: {
    side: 'bottom',
    scrollable: true,
  },
  render: ScrollingVertical.render,
};
