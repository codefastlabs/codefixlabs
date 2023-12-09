import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  InputPhoneNumber,
  Switch,
} from '@codefixlabs/ui';
import { BellIcon, CheckIcon } from 'lucide-react';
import Link from 'next/link';

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

export default function Page(): React.JSX.Element {
  return (
    <main className="flex h-full flex-col items-center justify-center space-y-8 p-4">
      <h1 className="font-bold">Docs</h1>

      <div className="space-y-4">
        <pre className="select-all rounded-lg border px-3 py-2">
          bun storybook
        </pre>

        <Card className="w-screen max-w-md">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <BellIcon className="h-4 w-4 shrink-0" />
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
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  key={notification.title}
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              startIcon={<CheckIcon className="h-4 w-4" />}
            >
              Mark all as read
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-x-2">
        <Link className={buttonVariants()} href="/">
          Link styled as a button
        </Link>
        <Link className={buttonVariants({ variant: 'outline' })} href="/">
          Link styled as a button
        </Link>
      </div>

      <div className="">
        <InputPhoneNumber
          defaultValue={{
            phoneCode: '+84',
            phoneNumber: '987654321',
          }}
          placeholder="Enter your phone number"
        />
      </div>

      <article className="prose dark:prose-invert lg:prose-xl">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </p>
      </article>
    </main>
  );
}
