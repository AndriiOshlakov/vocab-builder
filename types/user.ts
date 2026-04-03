export type User = {
  name: string;
  email: string;
};

export type RegisterUserResponse = {
  name: string;
  email: string;
  token: string;
};
