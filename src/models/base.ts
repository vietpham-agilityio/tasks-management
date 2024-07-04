export type CustomStateType = {
  success?: boolean;
};

export type ResponseStateType<T> = {
  success?: boolean;
  error?: string;
  data?: T;
};

export type CustomResponseType<T> = {
  response?: ResponseStateType<T>;
};
