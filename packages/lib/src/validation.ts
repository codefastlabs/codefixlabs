import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function isValidPhoneNumber({
  phoneNumber,
  phoneCode,
}: {
  phoneNumber: string;
  phoneCode: string;
}): boolean {
  const parsedPhoneNumber = parsePhoneNumberFromString(
    `${phoneCode}${phoneNumber}`,
  );

  return Boolean(parsedPhoneNumber?.isValid());
}
