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

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('admin/users')
export class AdminUserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles([Role.ADMIN])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles([Role.ADMIN])
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles([Role.ADMIN])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Roles([Role.ADMIN])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles([Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
