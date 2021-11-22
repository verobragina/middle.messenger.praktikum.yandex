import {router} from '../index';
import {Path} from '../index';
import {authAPI} from '../api/AuthAPI';

class AuthController {
  async signIn(data) {
    try {
      await authAPI.signIn(data);
      router.go(Path.messenger);
    } catch (e) {
      router.go(Path.login);
    }
  }

  async signUp(data) {
    try {
      await authAPI.signUp(data);
      router.go(Path.messenger);
    } catch (e) {
      router.go(Path.registration);
    }
  }

  async logout() {
    try {
      await authAPI.logout();
      router.go(Path.login);
    } catch (e) {
      throw new Error(`Error from AuthController: ${e.message}`);
    }
  }

  async getUserInfo() {
    try {
      return await authAPI.getUserInfo();
    } catch (e) {
      return e;
      // throw new Error(`Error from AuthController: ${e.message}`);
    }
  }
}

export const authController = new AuthController();
