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

export function VerifyEmailTemplate({
  verifyEmailLink,
  userName,
  previewText,
}: {
  verifyEmailLink: string;
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
                Thank you for registering an account on our Blog!
              </Text>

              <Text className="text-base font-light text-gray-700">
                To complete the registration process and secure your account,
                please verify your email address by clicking on the link below:
              </Text>

              <Button
                className="mt-4 block w-52 rounded-md bg-blue-600 px-4 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
                href={verifyEmailLink}
              >
                Verify Email
              </Button>

              <Text className="text-base font-light text-gray-700">
                If you did not sign up, please disregard this email.
              </Text>

              <Text className="text-base font-light text-gray-700">
                If you have any questions or need support, please contact us at
                support@codefix.dev or through the contact page on our Blog.
              </Text>

              <Text className="text-base font-light text-gray-700">
                Thank you, and we wish you a wonderful experience on our Blog!
              </Text>

              <Text className="mb-1 text-base font-light text-gray-700">
                Sincerely, The Blog Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export const verifyEmailTemplateHtml = (
  props: React.ComponentProps<typeof VerifyEmailTemplate>,
): string => {
  return render(<VerifyEmailTemplate {...props} />, {
    pretty: true,
  });
};
