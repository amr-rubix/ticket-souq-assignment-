import { Module } from '@nestjs/common';
import { AdminUserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
@Module({
  controllers: [AdminUserController],
  providers: [UserService],
})
export class AdminModule {}
