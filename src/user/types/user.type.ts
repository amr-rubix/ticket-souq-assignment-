export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserToken = {
  access_token: string;
};

export type UserUpdatePayload = {
  firstName: string;
  lastName: string;
};

export type UserRequest = {
  id: number;
  email: string;
  role: string;
};

export type UserLoginPaylod = {
  email: string;
  password: string;
};

export type UserSignUpPaylod = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
