import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@codefixlabs/ui/accordion';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Accordion> = {
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
  component: Accordion,
  tags: ['autodocs'],
  title: 'UI/Accordion',
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  args: {
    collapsible: true,
    defaultValue: 'item-1',
    type: 'single',
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          <p className="pb-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        <AccordionContent>
          <p className="pb-4">
            Yes. It&apos;`s unstyled by default, giving you freedom over the
            look and feel.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent>
          <p className="pb-4">
            Yes! You can animate the Accordion with CSS or JavaScript.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
