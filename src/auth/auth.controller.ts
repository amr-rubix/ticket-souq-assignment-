import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //auth/signup
  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Get('verify/:code')
  async verifyUser(@Param('code') code: string) {
    return await this.authService.verifyUser(code);
  }
}
