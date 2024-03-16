import {
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { BellIcon, CheckIcon } from 'lucide-react';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'UI/Card',
};

export default meta;

type Story = StoryObj<typeof Card>;

/* -----------------------------------------------------------------------------
 * Story: Default
 * -------------------------------------------------------------------------- */

const notifications = [
  {
    description: '1 hour ago',
    title: 'Your call has been confirmed.',
  },
  {
    description: '1 hour ago',
    title: 'You have a new message!',
  },
  {
    description: '2 hours ago',
    title: 'Your subscription is expiring soon!',
  },
];

export const Default: Story = {
  args: {
    className: 'max-w-md',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardBody className="grid gap-6">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellIcon size={16} />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">Push Notifications</p>
            <p className="text-muted-foreground text-sm">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification) => (
            <div
              className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
              key={notification.title}
            >
              <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-muted-foreground text-sm">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <Button className="w-full" startIcon={<CheckIcon />}>
          Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
};

/* -----------------------------------------------------------------------------
 * Story: WithForm
 * -------------------------------------------------------------------------- */

export const WithForm: Story = {
  args: {
    className: 'max-w-md',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardBody>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardBody>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

// With Shadow
export const WithShadow: Story = {
  args: {
    className: 'max-w-md shadow-box-md',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardBody className="grid gap-6">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <BellIcon size={16} />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">Push Notifications</p>
            <p className="text-muted-foreground text-sm">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification) => (
            <div
              className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
              key={notification.title}
            >
              <span className="flex size-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-muted-foreground text-sm">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <Button className="w-full" startIcon={<CheckIcon />}>
          Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
};
