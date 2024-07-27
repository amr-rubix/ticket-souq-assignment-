import { Role } from 'src/enums/role.enum';

export type UserCreatePayload = {
  email: string;
  role: Role;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  password: string;
};
