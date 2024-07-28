import {
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
// import { Role } from '@prisma/client';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { User, UserRequest } from './types/user.type';
import { NotFoundError } from 'rxjs/internal/util/NotFoundError';
import { UpdateUserDto } from './dto/index';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * get loggedIn user
   * @param req HTTP request
   * @returns User Object
   */
  @Get('me')
  @Roles([Role.USER, Role.ADMIN])
  async getMe(
    @Req() req: { user: UserRequest },
  ): Promise<User | NotFoundException> {
    return await this.userService.getUserById(req.user.id);
  }

  /**
   * updated loggedIn user with body parameters
   * @param req HTTP request
   * @returns User Object
   */
  @Patch('me')
  @Roles([Role.ADMIN, Role.USER])
  update(
    @Req() req: { user: UserRequest },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | NotFoundException> {
    return this.userService.update(req.user.id, updateUserDto);
  }

  /**
   * get user by id
   * @param id number
   * @returns User Object
   */
  @Get(':id')
  @Roles([Role.USER, Role.ADMIN])
  async getUser(@Param('id') id: number): Promise<User | NotFoundError> {
    return await this.userService.getUserById(+id);
  }
}
