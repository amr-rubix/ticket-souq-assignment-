import { AxiosInstance } from 'axios';
import { AxiosService } from './axios.service';

export class AdminService extends AxiosService {
  protected readonly instance: AxiosInstance;
  public constructor() {
    super('admin/users');
  }

  public async get() {
    try {
      return await this.instance.get('/');
    } catch (error) {
      //   console.log('error', error);
      /**
       * todo: handle validation errors
       */
      return false;
    }
  }

  public async getById(id) {
    try {
      return await this.instance.get(`${id}`);
    } catch (error) {
      //   console.log('error', error);
      /**
       * todo: handle validation errors
       */
      return false;
    }
  }

  public async post(data) {
    try {
      return await this.instance.post('/', data);
    } catch (error) {
      /**
       * todo: handle validation errors
       */
      return false;
    }
  }

  public async patch(data) {
    try {
      return await this.instance.patch('/' + data.id, data);
    } catch (error) {
      /**
       * todo: handle validation errors
       */
      return false;
    }
  }
}
