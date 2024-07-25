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

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject('EVENTS_SERVICE') private redisEvents: ClientProxy,
  ) {}

  sendEmailNotification(user): Observable<number> {
    return this.redisEvents.emit('user_created', user);
  }

  async verifyUser(code) {
    const user = await this.prisma.user.findFirst({
      where: {
        verify_code: code,
      },
    });
    //if user does not exist throw exception
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    return true;
  }

  async login(payload) {
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

  async getUserById(id) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      delete user.hash;
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async signup(payload) {
    const hash = await argon.hash(payload.password);
    try {
      //save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: payload.email,
          hash,
        },
      });

      const verify_code = uid(21);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { verify_code },
      });

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
