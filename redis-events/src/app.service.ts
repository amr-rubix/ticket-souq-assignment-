import { Injectable } from '@nestjs/common';
import { User } from './types';
@Injectable()
export class AppService {
  sendUserCreatedNotification(data: User) {
    /**
     * todo: email integration
     */
    console.log({ data });
    return true;
  }
}
