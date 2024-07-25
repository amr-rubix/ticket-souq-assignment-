import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sendUserCreatedNotification(data) {
    console.log('email should be sent', data);
  }
}
