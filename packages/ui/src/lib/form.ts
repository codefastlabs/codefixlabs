import type { FieldError } from 'react-hook-form';

export const getErrorMessage = (error: FieldError | FieldError[]): string => {
  if (Array.isArray(error)) {
    const firstError = error.filter(Boolean).at(0);

    if (!firstError) {
      return '';
    }

    return getErrorMessage(firstError);
  }

  if (error.message) {
    return error.message;
  }

  if (error.root?.message) {
    return error.root.message;
  }

  return '';
};
