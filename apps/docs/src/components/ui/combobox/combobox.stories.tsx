import { getFirstInitials, wait } from '@codefixlabs/lib';
import type { Option } from '@codefixlabs/ui';
import {
  Avatar,
  Button,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@codefixlabs/ui';
import { faker } from '@faker-js/faker';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { cx } from 'class-variance-authority';
import { CheckIcon, UserPlus2Icon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { ControllerRenderProps, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const meta: Meta<typeof Combobox> = {
  component: Combobox,
  tags: ['autodocs'],
  title: 'UI/Combobox',
};

export default meta;

type Story = StoryObj<typeof Combobox>;

/* -----------------------------------------------------------------------------
 * Story: Basic
 * -------------------------------------------------------------------------- */

function ComboboxWithHooks(
  args: ComponentProps<typeof Combobox>,
): React.JSX.Element {
  const [value, setValue] = useState<Option>();

  return <Combobox {...args} onSelect={setValue} selected={value} />;
}

export const Basic: Story = {
  args: {
    options: [
      { label: 'Next.js', value: 'next.js' },
      { label: 'SvelteKit', value: 'sveltekit' },
      { label: 'Nuxt.js', value: 'nuxt.js' },
      { label: 'Remix', value: 'remix' },
      { label: 'Astro', value: 'astro' },
    ],
    placeholder: 'Select framework...',
  },
  render: (args) => <ComboboxWithHooks {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: ComboboxGroup
 * -------------------------------------------------------------------------- */

export const ComboboxGroup: Story = {
  args: {
    options: [
      {
        label: 'Suggestions',
        options: [
          { label: 'Calendar', value: 'calendar' },
          { label: 'Search Emoji', value: 'emoji' },
          { label: 'Table', value: 'table' },
          { label: 'Calculator', value: 'calculator' },
          { label: 'Notes', value: 'notes' },
          { label: 'Voice Recorder', value: 'voice-recorder' },
          { label: 'Tasks', value: 'tasks' },
          { label: 'Contacts', value: 'contacts' },
          { label: 'Weather', value: 'weather' },
          { label: 'Maps', value: 'maps' },
          { label: 'Voice Assistant', value: 'voice-assistant' },
          { label: 'Camera', value: 'camera' },
          { label: 'File Manager', value: 'file-manager' },
          { label: 'Music Player', value: 'music-player' },
          { label: 'Video Player', value: 'video-player' },
          { label: 'News', value: 'news' },
          { label: 'Reminders', value: 'reminders' },
          { label: 'Translator', value: 'translator' },
          { label: 'Notes', value: 'notes' },
        ],
      },
      {
        label: 'Settings',
        options: [
          { label: 'Profile', value: 'profile' },
          { label: 'Billing', value: 'billing' },
          { label: 'Settings', value: 'settings' },
          { label: 'Notifications', value: 'notifications' },
          { label: 'Privacy', value: 'privacy' },
          { label: 'Security', value: 'security' },
          { label: 'Themes', value: 'themes' },
          { label: 'Language', value: 'language' },
          { label: 'Data Usage', value: 'data-usage' },
          { label: 'Backup', value: 'backup' },
          { label: 'Sync', value: 'sync' },
          { label: 'Accessibility', value: 'accessibility' },
          { label: 'Display', value: 'display' },
          { label: 'About', value: 'about' },
          { label: 'Help', value: 'help' },
          { label: 'Feedback', value: 'feedback' },
          { label: 'Sign Out', value: 'sign-out' },
          { label: 'Clear Cache', value: 'clear-cache' },
          { label: 'Reset', value: 'reset' },
        ],
      },
    ],
  },
  render: (args) => <ComboboxWithHooks {...args} />,
};

/* -----------------------------------------------------------------------------
 * Story: Assign member
 * -------------------------------------------------------------------------- */

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const members = Array.from({ length: 20 }, () => ({
  avatar: faker.internet.avatar(),
  email: faker.internet.email(),
  id: faker.string.uuid(),
  name: faker.person.fullName(),
}));

function ComboboxAssignMember(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member>();

  return (
    <Popover onOpenChange={setOpen} open={open} variant="simple">
      <PopoverTrigger>
        {currentMember ? (
          <Avatar
            alt={getFirstInitials(currentMember.name)}
            className="h-9 w-9"
            fallback={currentMember.name}
            src={currentMember.avatar}
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed">
            <UserPlus2Icon className="h-6 w-6" />
          </div>
        )}
      </PopoverTrigger>

      <PopoverContent align="start">
        <Command
          value={
            currentMember
              ? `${currentMember.name}_${currentMember.email}`
              : undefined
          }
          variant="dialog"
        >
          <CommandInput placeholder="Search..." />
          <CommandList className="max-h-[clamp(6.25rem,calc(var(--radix-popover-content-available-height)-3.75rem),25rem)]">
            <CommandEmpty>No members found.</CommandEmpty>
            <CommandGroup>
              {members.map((member) => (
                <CommandItem
                  key={member.id}
                  onSelect={() => {
                    setCurrentMember(member);
                    setOpen(false);
                  }}
                  value={`${member.name}_${member.email}`}
                >
                  <Avatar
                    alt={getFirstInitials(member.name)}
                    className="h-9 w-9"
                    fallback={member.name}
                    src={member.avatar}
                  />
                  {member.name}
                  <CheckIcon
                    className={cx(
                      'ml-auto h-4 w-4',
                      member.id === currentMember?.id
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const AssignMember: Story = {
  render: () => <ComboboxAssignMember />,
};

/* -----------------------------------------------------------------------------
 * Story: Assign member with custom trigger
 * -------------------------------------------------------------------------- */

function ComboboxAssignMemberWithCustomTrigger(): React.JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open} variant="simple">
      <PopoverTrigger asChild className="data-state-open:bg-accent">
        <Button size="sm" startIcon={UserPlus2Icon} variant="ghost">
          Allocate task
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start">
        <Command variant="dialog">
          <CommandInput placeholder="Search..." />
          <CommandList className="max-h-[clamp(6.25rem,calc(var(--radix-popover-content-available-height)-3.75rem),25rem)]">
            <CommandEmpty>No members found.</CommandEmpty>
            <CommandGroup>
              {members.map((member) => (
                <CommandItem
                  key={member.id}
                  onSelect={() => {
                    setOpen(false);
                  }}
                  value={`${member.name}_${member.email}`}
                >
                  <Avatar
                    alt={getFirstInitials(member.name)}
                    className="h-9 w-9"
                    fallback={member.name}
                    src={member.avatar}
                  />
                  {member.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const AssignMemberWithCustomTrigger: Story = {
  render: () => <ComboboxAssignMemberWithCustomTrigger />,
};

/* -----------------------------------------------------------------------------
 * Story: ReactHookForm
 * -------------------------------------------------------------------------- */

const formSchema = z.object({
  language: z.any({
    required_error: 'Please select a language.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

function ComboboxReactHookForm(
  args: ComponentProps<typeof Combobox>,
): React.JSX.Element {
  const form = useForm<FormValues>({
    defaultValues: {
      language: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await wait(1000);
    // eslint-disable-next-line no-console
    console.log('data', data);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={
          form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>
        }
      >
        <FormField
          control={form.control}
          name="language"
          render={({ field }): React.JSX.Element => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Combobox
                {...args}
                classNameTrigger="flex"
                empty="No languages found."
                onSelect={field.onChange}
                placeholder="Select language"
                selected={
                  (
                    field as ControllerRenderProps<
                      { language?: string },
                      'language'
                    >
                  ).value
                }
                slot={{ FormControl }}
              />
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button loading={form.formState.isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export const ReactHookForm: Story = {
  args: {
    options: [
      { label: 'English', value: 'en' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
      { label: 'Spanish', value: 'es' },
      { label: 'Portuguese', value: 'pt' },
      { label: 'Russian', value: 'ru' },
      { label: 'Japanese', value: 'ja' },
      { label: 'Korean', value: 'ko' },
      { label: 'Chinese', value: 'zh' },
      { label: 'Italian', value: 'it' },
      { label: 'Dutch', value: 'nl' },
      { label: 'Swedish', value: 'sv' },
      { label: 'Danish', value: 'da' },
      { label: 'Norwegian', value: 'no' },
      { label: 'Finnish', value: 'fi' },
      { label: 'Greek', value: 'el' },
      { label: 'Turkish', value: 'tr' },
      { label: 'Arabic', value: 'ar' },
      { label: 'Hindi', value: 'hi' },
      { label: 'Bengali', value: 'bn' },
      { label: 'Indonesian', value: 'id' },
      { label: 'Malay', value: 'ms' },
      { label: 'Vietnamese', value: 'vi' },
      { label: 'Thai', value: 'th' },
      { label: 'Tagalog', value: 'tl' },
      { label: 'Swahili', value: 'sw' },
      { label: 'Hebrew', value: 'he' },
      { label: 'Polish', value: 'pl' },
      { label: 'Czech', value: 'cs' },
      { label: 'Slovak', value: 'sk' },
      { label: 'Hungarian', value: 'hu' },
      { label: 'Romanian', value: 'ro' },
      { label: 'Bulgarian', value: 'bg' },
      { label: 'Ukrainian', value: 'uk' },
      { label: 'Croatian', value: 'hr' },
      { label: 'Serbian', value: 'sr' },
      { label: 'Slovenian', value: 'sl' },
      { label: 'Estonian', value: 'et' },
      { label: 'Latvian', value: 'lv' },
      { label: 'Lithuanian', value: 'lt' },
    ],
  },
  render: (args) => <ComboboxReactHookForm {...args} />,
};
