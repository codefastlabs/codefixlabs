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

export function ForgotPasswordTemplate({
  resetPasswordLink,
  userName,
  previewText,
}: {
  resetPasswordLink: string;
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
                We noticed that you recently requested to reset your password
                for your Blog account. Don&apos;t worry; we&apos;re here to help
                you get back in!
              </Text>

              <Text className="text-base font-light text-gray-700">
                To proceed with resetting your password, please click on the
                link below:
              </Text>

              <Button
                className="mt-4 block w-52 rounded-md bg-blue-600 px-4 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
                href={resetPasswordLink}
              >
                Reset password
              </Button>

              <Text className="text-base font-light text-gray-700">
                If you did not initiate this request, there&apos;s no need to
                take any action. Your account remains secure, and no changes
                have been made.
              </Text>

              <Text className="text-base font-light text-gray-700">
                For your security, this link will expire in 24 hours. If you
                don&apos;t reset your password within this time, you&apos;ll
                need to submit another request.
              </Text>

              <Text className="text-base font-light text-gray-700">
                Please do not share this link with anyone for your
                account&apos;s safety.
              </Text>

              <Text className="text-base font-light text-gray-700">
                If you have any questions or need further assistance, don&apos;t
                hesitate to contact our support team at support@codefix.dev.
              </Text>

              <Text className="text-base font-light text-gray-700">
                Thank you for using Blog. We&apos;re always here to help!
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

export const forgotPasswordTemplateHtml = (
  props: React.ComponentProps<typeof ForgotPasswordTemplate>,
): string => {
  return render(<ForgotPasswordTemplate {...props} />, {
    pretty: true,
  });
};
