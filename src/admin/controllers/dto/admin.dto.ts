import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isVerified: boolean;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isVerified: boolean;
}
