import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  render,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

export function MagicLinkTemplate({
  magicLink,
  userName,
  previewText,
}: {
  magicLink: string;
  userName: string | null;
  previewText: string;
}): React.JSX.Element {
  return (
    <Html lang="en">
      <Tailwind>
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-blue-50 px-4 py-10">
          <Container style={{ maxWidth: '768px' }}>
            <Section className="bg-background rounded-lg border-2 border-gray-200 p-5">
              <Text className="text-base font-light text-gray-700">
                Hello {userName ?? ''},
              </Text>

              <Text className="text-base font-light text-gray-700">
                Great news! Your magic link to access Blog is ready.
              </Text>

              <Button
                className="mt-4 block w-52 rounded-md bg-blue-600 px-4 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
                href={magicLink}
              >
                Access Your Account
              </Button>

              <Text className="text-base font-light text-gray-700">
                No need to remember passwords, just click the magic link, and
                you&apos;re in!
              </Text>

              <Text className="text-base font-light text-gray-700">
                If you didn&apos;t request this, ignore this email.
              </Text>

              <Text className="text-base font-light text-gray-700">
                Happy exploring!
              </Text>

              <Text className="text-base font-light text-gray-700">
                Sincerely, The Blog Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export const magicLinkTemplateHtml = (
  props: React.ComponentProps<typeof MagicLinkTemplate>,
): string => {
  return render(<MagicLinkTemplate {...props} />, {
    pretty: true,
  });
};
