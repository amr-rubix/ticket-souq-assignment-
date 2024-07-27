import { PrismaService } from 'src/prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { uid } from 'uid';
import { User } from 'src/user/types/user.type';
import { UserCreatePayload } from '../types/admin.type';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * get all users
   * @returns [Users]
   */
  async findAll(): Promise<Array<User>> {
    return this.prisma.user.findMany({
      omit: {
        hash: true,
      },
    });
  }

  /**
   * create new user
   * @param payload UserCreatePayload
   * @returns
   */
  async create(payload: UserCreatePayload): Promise<User> {
    try {
      //hash password
      const hash = await argon.hash(payload.password);

      //save the new user in the db
      delete payload.password;
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          hash,
        },
      });

      const verify_code = uid(21);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { verify_code },
      });

      user.verify_code = verify_code;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //unique field valioation
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already taken');
        }
      }
      throw new BadRequestException(`Proccess failed, ${error}`);
    }
  }

  /**
   * find user by id
   * @param id number
   * @returns user User
   */
  async findOne(id: number): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  /**
   * update user by id
   * @param id
   * @param payload
   * @returns
   */
  async update(id, payload): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      const hash = await argon.hash(payload.password);
      delete payload.password;
      payload.hash = hash;

      return await this.prisma.user.update({
        where: { id },
        data: payload,
      });
    } catch (error) {
      throw new BadRequestException(`Proccess failed, ${error}`);
    }
  }

  /**
   * remove user by id
   * @param id number
   * @returns user User
   */
  async remove(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
