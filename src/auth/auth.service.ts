import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      //save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      //hide user hash
      delete user.hash;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //unique field valioation
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already taken');
        }
      }
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    //if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    //compare password
    //if password incorrect throw exception
    const comparePassword = await argon.verify(user.hash, dto.password);
    if (!comparePassword) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    //send back user without hash
    delete user.hash;
    return user;
  }
}
