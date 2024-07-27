import { AxiosInstance } from 'axios';
import { AxiosService } from './axios.service';
import Cookies from 'js-cookie';

export class AuthService extends AxiosService {
  protected readonly instance: AxiosInstance;
  public constructor() {
    super('auth');
  }

  public async login(email: string, password: string) {
    try {
      const res = await this.instance.post('/signin', {
        email,
        password,
      });

      const token = res.data.access_token;
      const user = this.parseJwt(token);
      Cookies.set(
        'currentUser',
        JSON.stringify({
          ...user,
          token,
        }),
      );
      return true;
    } catch (error) {
      /**
       * todo: handle validation errors
       */
      return false;
    }
  }

  public async signup(fullName, email, password) {
    try {
      //build firstName and lastName
      const fullNameArr = fullName.split(' ');
      const firstName = fullNameArr[0];
      const lastName = fullNameArr[1] || '';

      const res = await this.instance.post('/signup', {
        email,
        password,
        firstName,
        lastName,
      });

      const token = res.data.access_token;
      const user = this.parseJwt(token);
      Cookies.set(
        'currentUser',
        JSON.stringify({
          ...user,
          token,
        }),
      );
      return true;
    } catch (error) {
      /**
       * todo: handle validation errors
       */
      return false;
    }
  }

  public logout() {
    Cookies.remove('currentUser');
    return true;
  }

  // decode the logged in user
  public parseJwt(token: string): object {
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
