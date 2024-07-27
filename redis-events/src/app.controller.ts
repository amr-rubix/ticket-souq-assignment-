import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { User } from './types';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user_created')
  async handleUserCreated(data: User): Promise<boolean> {
    // business logic
    return this.appService.sendUserCreatedNotification(data);
  }
}
