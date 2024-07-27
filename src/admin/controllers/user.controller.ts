import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services/user.service';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CreateUserDto, UpdateUserDto } from './dto/admin.dto';
import { User } from '../../user/types/user.type';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('admin/users')
export class AdminUserController {
  constructor(private userService: UserService) {}

  /**
   * /users get all users
   * @returns users Users
   */
  @Get()
  @Roles([Role.ADMIN])
  findAll(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  /**
   *
   * @param id number
   * @returns user User
   */
  @Get(':id')
  @Roles([Role.ADMIN])
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  /**
   * create new user
   * @param createUserDto CreateUserDto
   * @returns user User
   */
  @Post()
  @Roles([Role.ADMIN])
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  /**
   * update current user
   * @param id number
   * @param updateUserDto UpdateUserDto
   * @returns user User
   */
  @Patch(':id')
  @Roles([Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * delete user by id
   * @param id
   * @returns
   */
  @Delete(':id')
  @Roles([Role.ADMIN])
  remove(@Param('id') id: string): Promise<User> {
    return this.userService.remove(+id);
  }
}
