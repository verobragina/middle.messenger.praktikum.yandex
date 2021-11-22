import {userAPI} from '../api/UserAPI';

class UserController {
  async changeProfile(data) {
    try {
      return await userAPI.changeProfile(data);
    } catch (e) {
      throw new Error(`Error from UserController: ${e.message}`);
    }
  }

  async changePassword(data) {
    try {
      return await userAPI.changePassword(data);
    } catch (e) {
      throw new Error(`Error from UserController: ${e.message}`);
    }
  }

  async changeAvatar(data) {
    try {
      return await userAPI.changeAvatar(data);
    } catch (e) {
      console.log(e);
      // throw new Error(`Error from UserController: ${e.message}`);
    }
  }

  async searchUser(data) {
    try {
      return await userAPI.searchUser(data);
    } catch (e) {
      throw new Error(`Error from UserController: ${e.message}`);
    }
  }

  async userById(id) {
    try {
      return await userAPI.getUserById(id);
    } catch (e) {
      throw new Error(`Error from UserController: ${e.message}`);
    }
  }
}

export const userController = new UserController();
