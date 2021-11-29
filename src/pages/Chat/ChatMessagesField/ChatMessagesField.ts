import chatMessagesFieldTmpl from './ChatMessagesField.tmpl';
import Block from '../../../classes/Block/Block';
import {userController} from '../../../controllers/UserController';
import {store} from '../../../classes/Store/Store';

type TResponse = { [key: string]: any };

export default class ChatMessagesField extends Block {
  constructor(props?: any) {
    super(props);
    store.subscribe({'messages_received': this});
    store.subscribe({'select_chat': this});
  }

  storeChanged(key) {
    const parent = document.querySelector('.messages-field');
    const chat = store.getState().chat;
    const userID = store.getState().user.id;

    if (key === 'select_chat') {
      return parent.innerHTML = '';
    }
    if (chat.messages.length) {
      chat.messages.reverse().forEach((message) => {
        this.addMessage(message, userID, parent);
      });
    } else {
      this.addMessage(chat.messages, userID, parent);
    }
  }

  addMessage(message, userID, parent) {
    if (message.type === 'message') {
      const messageType = message.user_id === userID ? 'sent' : 'received';
      parent.appendChild(this.createMessage(message.content, messageType));
    }
    if (message.type === 'user connected') {
      parent.appendChild(this.createSystemMessage(message.content));
    }
  }

  createMessage(text, className) {
    const newMessage = document.createElement('div');
    newMessage.innerText = text;
    newMessage.classList.add('messages-field__message');
    newMessage.classList.add(className);
    return newMessage;
  }

  createSystemMessage(id) {
    const newMessage = document.createElement('div');
    newMessage.classList.add('messages-field__sys-message');
    userController.userById(id)
        .then((res: TResponse) => {
          newMessage.innerText =
            `Подключился пользователь: ${res.response.first_name} ${res.response.second_name}`;
        });
    return newMessage;
  }

  public render() {
    return this.compile(chatMessagesFieldTmpl, this.props);
  }
}
