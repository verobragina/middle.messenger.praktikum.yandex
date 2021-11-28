import {API} from './API';

class ChatsAPI extends API {
  createChat(data) {
    return this.post('/chats', {data});
  }

  addUser(data) {
    return this.put('/chats/users', {data});
  }

  deleteChat(data) {
    return this.delete('/chats', {data});
  }

  getChats(data) {
    return this.get('/chats', {data});
  }

  getToken(id) {
    return this.post(`/chats/token/${id}`);
  }
}

export const chatsAPI = new ChatsAPI();
