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

  if (Object.keys(error).length) {
    const firstKey = Object.keys(error).at(0) as keyof typeof error | undefined;
    if (!firstKey) {
      return '';
    }

    const firstError = error[firstKey] as FieldError;

    return getErrorMessage(firstError);
  }

  return '';
};
