export type User = {
  name: string;
  email: string;
  token: string;
  _id?: string;
};

export type RegisterUserResponse = {
  name: string;
  email: string;
  token: string;
};
