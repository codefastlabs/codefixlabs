import { Button } from '@codefixlabs/ui/button';
import { Input } from '@codefixlabs/ui/input';
import { Label } from '@codefixlabs/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@codefixlabs/ui/popover';
import type { Meta, StoryObj } from '@storybook/react';
import { SlidersHorizontalIcon } from 'lucide-react';

const meta: Meta<typeof Popover> = {
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Popover',
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button
          aria-label="Update dimensions"
          shape="pill"
          startIcon={<SlidersHorizontalIcon className="h-4 w-4" />}
          variant="outline"
        />
      </PopoverTrigger>
      <PopoverContent className="p-5">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                className="col-span-2 h-8"
                defaultValue="100%"
                id="width"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                className="col-span-2 h-8"
                defaultValue="300px"
                id="maxWidth"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                className="col-span-2 h-8"
                defaultValue="25px"
                id="height"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                className="col-span-2 h-8"
                defaultValue="none"
                id="maxHeight"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
