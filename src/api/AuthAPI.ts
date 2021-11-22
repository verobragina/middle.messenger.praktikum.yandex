import {API} from './API';

class AuthAPI extends API {
  signUp(data) {
    return this.post('/auth/signup', {data});
  }

  signIn(data) {
    return this.post('/auth/signin', {data});
  }

  getUserInfo() {
    return this.get('/auth/user');
  }

  logout() {
    return this.post('/auth/logout');
  }
}

export const authAPI = new AuthAPI();
