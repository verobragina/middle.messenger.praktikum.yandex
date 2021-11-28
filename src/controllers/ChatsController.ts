import {chatsAPI} from '../api/ChatsAPI';

class ChatsController {
  async createChat(data) {
    try {
      return await chatsAPI.createChat(data);
    } catch (e) {
      throw new Error(`Error from ChatsController: ${e.message}`);
    }
  }

  async addUser(data) {
    try {
      await chatsAPI.addUser(data);
    } catch (e) {
      throw new Error(`Error from ChatsController: ${e.message}`);
    }
  }

  async deleteChat(data) {
    try {
      await chatsAPI.deleteChat(data);
    } catch (e) {
      throw new Error(`Error from ChatsController: ${e.message}`);
    }
  }

  async getChatInfo(data?) {
    try {
      return await chatsAPI.getChats(data);
    } catch (e) {
      throw new Error(`Error from ChatsController: ${e.message}`);
    }
  }

  async getChatToken(data) {
    try {
      return await chatsAPI.getToken(data);
    } catch (e) {
      throw new Error(`Error from ChatsController: ${e.message}`);
    }
  }
}

export const chatsController = new ChatsController();
