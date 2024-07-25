import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   *
   * @param req HTTP request
   * @returns User Object
   */
  @Get('me')
  @Roles([Role.USER])
  async getMe(@Req() req: any) {
    return await this.userService.getUserById(req.user.id);
  }

  @Get(':id')
  @Roles([Role.USER])
  async getUser(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Get('verify/:code')
  @Roles([Role.USER])
  async verifyUser(@Param('code') code: number) {
    return await this.userService.verifyUser(code);
  }
}
