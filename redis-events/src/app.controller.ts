import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    // business logic
    return this.appService.sendUserCreatedNotification(data);
  }
}
