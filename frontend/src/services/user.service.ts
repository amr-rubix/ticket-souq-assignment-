import { AxiosInstance } from 'axios';
import { AxiosService } from './axios.service';

export class UserService extends AxiosService {
  protected readonly instance: AxiosInstance;
  public constructor() {
    super('users');
  }

  public async me() {
    try {
      return await this.instance.get('/me');
    } catch (error) {
      /**
       * todo: handle validation errors
       */
      return false;
    }
  }

  public async update(data) {
    try {
      return await this.instance.patch('/me', data);
    } catch (error) {
      /**
       * todo: handle validation errors
       */
      return false;
    }
  }
}
