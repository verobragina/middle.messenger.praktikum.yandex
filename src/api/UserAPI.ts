import {API} from './API';

class UserAPI extends API {
  changeProfile(data) {
    return this.put('/user/profile', {data});
  }

  changePassword(data) {
    return this.put('/user/password', {data});
  }

  changeAvatar(data) {
    return this.put('/user/profile/avatar', {data});
  }

  searchUser(data) {
    return this.post('/user/search', {data});
  }

  getUserById(id) {
    return this.get(`/user/${id}`);
  }
}

export const userAPI = new UserAPI();
