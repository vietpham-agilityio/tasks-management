import { ERROR_MESSAGES } from '@/constants';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

export const isRequired = (value: string | null | undefined): boolean =>
  !!value;

export const isValidFormat = (value = '', pattern: RegExp): boolean =>
  value == '' || pattern.test(value);

export const validateRequired = (
  value: string | null | undefined,
): string | true => isRequired(value?.trim()) || ERROR_MESSAGES.FIELD_REQUIRED;

export const isEnableSubmitButton = (
  requiredFields: string[],
  dirtyFields: string[],
  errors: Record<string, unknown>,
): boolean => {
  const isMatchAllRequiredFields: boolean = requiredFields.every((field) =>
    dirtyFields.includes(field),
  );

  return isMatchAllRequiredFields && errors && !Object.keys(errors).length;
};

export const setServerActionErrors = <T extends FieldValues>(
  fields: { [key: string]: string[] },
  setError: UseFormSetError<T>,
) => {
  return Object.keys(fields).map((field: string) => {
    setError(field as Path<T>, { message: fields[field].join('\r\n') });
  });
};

export const isEmpty = <T>(value: T): boolean => {
  if (value && (typeof value === 'string' || Array.isArray(value))) {
    return !value.length;
  }

  if (value && typeof value === 'object') {
    return !Object.keys(value).length;
  }

  return true;
};
