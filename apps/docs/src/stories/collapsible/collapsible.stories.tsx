import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'UI/Collapsible',
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

function CollapsibleWithHooks(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible className="w-[350px]" onOpenChange={setIsOpen} open={isOpen}>
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button
            aria-label="Toggle"
            startIcon={<ChevronsUpDownIcon className="h-4 w-4" />}
            variant="ghost"
          />
        </CollapsibleTrigger>
      </div>
      <div className="mt-2 rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent>
        <div className="mt-2 space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export const Basic: Story = {
  render: (args) => <CollapsibleWithHooks {...args} />,
};
