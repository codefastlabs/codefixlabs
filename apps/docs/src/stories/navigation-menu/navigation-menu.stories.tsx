import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@codefixlabs/ui';
import type { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';
import { cx } from 'class-variance-authority';

const meta: Meta<typeof NavigationMenu> = {
  component: NavigationMenu,
  decorators: [
    (Story): React.JSX.Element => (
      <div className="min-h-[37.5rem]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  title: 'UI/Navigation Menu',
};

export default meta;

type Story = StoryObj<typeof NavigationMenu>;

type ListItemProps = ComponentPropsWithoutRef<typeof Link> & {
  title: string;
};

const ListItem: ForwardRefExoticComponent<
  PropsWithoutRef<ListItemProps> & RefAttributes<ElementRef<typeof Link>>
> = forwardRef<ElementRef<typeof Link>, ListItemProps>(
  ({ children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={forwardedRef}
          {...props}
          className="focus:ring-primary block select-none rounded-md p-3 text-base no-underline outline-none transition-colors hover:bg-neutral-200 focus:ring-2"
        >
          <div className="text-primary mb-1.25 font-medium">{title}</div>
          <p className="text-neutral-950/80">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  ),
);

ListItem.displayName = 'ListItem';

export const Basic: Story = {
  args: {
    className: 'flex justify-center',
  },
  render: (args) => (
    <NavigationMenu {...args}>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-x-2.5 p-5 sm:w-[31.25rem] sm:grid-cols-[0.75fr_1fr]">
            <li className="row-span-3 grid">
              <NavigationMenuLink asChild>
                <Link
                  className="focus:ring-primary flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-800 to-indigo-800 p-6 no-underline outline-none focus:ring-2"
                  href="/"
                >
                  <svg
                    aria-hidden
                    fill="white"
                    height="38"
                    viewBox="0 0 25 25"
                    width="38"
                  >
                    <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z" />
                    <path d="M12 0H4V8H12V0Z" />
                    <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z" />
                  </svg>
                  <div className="mb-1.75 mt-4 text-lg font-medium text-white">
                    Radix Primitives
                  </div>
                  <p className="text-sm text-neutral-300">
                    Unstyled, accessible components for React.
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>

            <ListItem href="https://stitches.dev/" title="Stitches">
              CSS-in-JS with best-in-class developer experience.
            </ListItem>

            <ListItem href="/colors" title="Colors">
              Beautiful, thought-out palettes with auto dark mode.
            </ListItem>

            <ListItem href="https://icons.radix-ui.com/" title="Icons">
              A crisp set of 15x15 icons, balanced and consistent.
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-x-2.5 p-5 sm:w-[37.5rem] sm:grid-flow-col sm:grid-rows-3">
            <ListItem
              href="/docs/primitives/overview/introduction"
              title="Introduction"
            >
              Build high-quality, accessible design systems and web apps.
            </ListItem>

            <ListItem
              href="/docs/primitives/overview/getting-started"
              title="Getting started"
            >
              A quick tutorial to get you up and running with Radix Primitives.
            </ListItem>

            <ListItem href="/docs/primitives/overview/styling" title="Styling">
              Unstyled and compatible with any styling solution.
            </ListItem>

            <ListItem
              href="/docs/primitives/overview/animation"
              title="Animation"
            >
              Use CSS keyframes or any animation library of your choice.
            </ListItem>

            <ListItem
              href="/docs/primitives/overview/accessibility"
              title="Accessibility"
            >
              Tested in a range of browsers and assistive technologies.
            </ListItem>

            <ListItem
              href="/docs/primitives/overview/releases"
              title="Releases"
            >
              Radix Primitives releases and their changelogs.
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            className={cx([
              'bg-background group inline-flex h-10 w-max items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'focus:bg-accent focus:text-accent-foreground focus:outline-none',
              'disabled:pointer-events-none disabled:opacity-50',
              'data-state-open:bg-accent/50 data-active:bg-accent/50',
            ])}
            href="https://github.com/radix-ui"
          >
            Github
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenu>
  ),
};
