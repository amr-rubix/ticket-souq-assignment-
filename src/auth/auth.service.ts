import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User, UserToken } from '../user/types/user.type';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  /**
   * signup new user
   * @param dto SignupDto
   * @returns token UserToken
   */
  async signup(dto: SignupDto): Promise<UserToken> {
    const user: User = await this.userService.signup(dto);
    return this.signToken(user.id, user.email, user.role);
  }

  /**
   * signin current user
   * @param dto SigninDto
   * @returns token UserToken
   */
  async signin(dto: SigninDto): Promise<UserToken> {
    const user = await this.userService.login(dto);

    //return jwt token signed
    return this.signToken(user.id, user.email, user.role);
  }

  /**
   * verify user by code
   * @param code string
   * @returns boolean
   */
  async verifyUser(code: string): Promise<boolean> {
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

  /**
   * sign JWT token
   * @param userId number
   * @param email string
   * @param role string
   * @returns
   */
  async signToken(
    userId: number,
    email: string,
    role: string,
  ): Promise<UserToken> {
    const payload = {
      id: userId,
      email,
      role,
    };

    //generate signed token with user info
    const token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '15m',
    });

    return {
      access_token: token,
    };
  }
}
