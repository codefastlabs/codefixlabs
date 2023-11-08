import type { FieldError } from 'react-hook-form';

export const getErrorMessage = (error: FieldError | FieldError[]): string => {
  if (Array.isArray(error)) {
    return getErrorMessage(error[0]);
  }

  if (error.message) {
    return error.message;
  }

  if (error.root?.message) {
    return error.root.message;
  }

  return '';
};
