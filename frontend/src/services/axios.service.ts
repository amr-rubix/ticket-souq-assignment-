import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

export class AxiosService {
  protected readonly instance: AxiosInstance;
  public constructor(endpoint: string) {
    const user = Cookies.get('currentUser') || null;
    let token = null;
    if (user) {
      token = JSON.parse(user).token;
    }
    this.instance = axios.create({
      baseURL: `http://localhost:3333/${endpoint}/`,
      timeout: 300,
      timeoutErrorMessage: 'Time out',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
