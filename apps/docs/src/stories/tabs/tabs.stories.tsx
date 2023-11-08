import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@codefixlabs/ui/card';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@codefixlabs/ui/tabs';
import { Label } from '@codefixlabs/ui/label';
import { Input } from '@codefixlabs/ui/input';
import { Button } from '@codefixlabs/ui/button';

const meta: Meta<typeof Tabs> = {
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
  component: Tabs,
  tags: ['autodocs'],
  title: 'UI/Tabs',
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  args: {
    defaultValue: 'tab1',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList
        aria-label="Manage your account"
        className="grid w-full grid-cols-2"
      >
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input defaultValue="Pedro Duarte" id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input defaultValue="@peduarte" id="username" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};
