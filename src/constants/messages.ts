export const ERROR_MESSAGES = {
  FIELD_REQUIRED: 'This field is required.',
  FORMAT: (label: string) => `${label} does not follow the correct format.`,
  PASSWORD_NOT_MATCH:
    'Your password confirmation did not match your password. Please try again.',
  MIN_LENGTH: (label: string, minLength: number | string) =>
    `${label} must have minimum ${minLength} characters.`,
  USER_NOT_FOUND: 'User not found.',
};
