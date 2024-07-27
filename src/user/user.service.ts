import { PrismaService } from 'src/prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ClientProxy } from '@nestjs/microservices';
import { uid } from 'uid';
import {
  User,
  UserLoginPaylod,
  UserUpdatePayload,
  UserSignUpPaylod,
} from './types/user.type';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject('EVENTS_SERVICE') private redisEvents: ClientProxy,
  ) {}

  /**
   *  omit event to redis microservice
   *  send user data
   * @param user: User
   * @returns number
   */
  sendEmailNotification(user: User): Observable<number> {
    return this.redisEvents.emit('user_created', user);
  }

  /**
   *  login user function using email/passowed
   * @param payload UserLoginPaylod {email, password}
   * @returns user User | error ForbiddenException
   */
  async login(payload: UserLoginPaylod): Promise<User> {
    //find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    //if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    //compare password
    //if password incorrect throw exception
    const comparePassword = await argon.verify(user.hash, payload.password);
    if (!comparePassword) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    //check if user verified
    if (!user.isVerified) {
      throw new ForbiddenException('Please verify your email');
    }

    return user;
  }

  /**
   * update user by id
   * @param id number
   * @param data UserUpdatePayload
   * @returns Promise <user, error>
   */
  async update(id: number, payload: UserUpdatePayload): Promise<User> {
    try {
      //find user by id
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      //if user not found
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return await this.prisma.user.update({
        where: { id: user.id },
        data: payload,
      });
    } catch (error) {
      throw new BadRequestException(`Proccess failed, ${error}`);
    }
  }

  /**
   *  get user by id
   * @param id number
   * @returns user User
   */
  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      //remove password
      delete user.hash;
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  /**
   *  signup function to register new user
   * @param payload UserSignUpPaylod,
   * @returns user Promise<User | ForbiddenException |BadRequestException >
   */
  async signup(payload: UserSignUpPaylod): Promise<User> {
    //hash password
    const hash = await argon.hash(payload.password);
    try {
      //save the new user in the db
      const { email, firstName, lastName } = payload;
      const user = await this.prisma.user.create({
        data: {
          email,
          hash,
          firstName,
          lastName,
        },
      });

      //generate verify code and update user
      const verify_code = uid(21);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { verify_code },
      });

      //send email notification to redis
      user.verify_code = verify_code;
      this.sendEmailNotification(user);

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
}
