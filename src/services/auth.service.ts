import axios, { AxiosInstance } from 'axios';

class AuthService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: 'Time Out',
    });
  }

  login(username: string) {
    return this.instance
      .post('/generateToken', { userId: username })
      .then(({ data }) => {
        if (data?.token) {
          return data;
        }
        throw Error('token not exist');
      });
  }
}

export default AuthService;
