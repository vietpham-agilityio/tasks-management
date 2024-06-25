export type UserLogin = {
  username: string;
  password: string;
};

export type UserLoginState = {
  success?: boolean;
  errors?: {
    username?: string[];
    password?: string[];
  };
};
