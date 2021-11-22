import chatsTmpl from './Chat.tmpl';
import Block from '../../classes/Block/Block';
import {
  ADD_CHAT,
  CHATS_DATA,
  CREATE_NAME_CHAT,
  TO_PROFILE,
} from './Chat.data';
import {chatsController} from '../../controllers/ChatsController';
import {Path, router} from '../../index';
import './Chat.scss';

export default class Chat extends Block {
  constructor(props?: any) {
    super(props);
  }

  componentDidMount() {
    TO_PROFILE.events = {
      click: (e) => {
        e.preventDefault();
        router.go(Path.profile);
      },
    };

    ADD_CHAT.events = {
      click: (e) => {
        e.preventDefault();
        const addChatField = document.querySelector('.chats__add-field');
        addChatField.classList.toggle('show');
      },
    };

    CREATE_NAME_CHAT.events = {
      click: async (e) => {
        e.preventDefault();
        const addChatField = e.target.closest('.chats__add-field');
        const chatInput = addChatField.querySelector('.chats__add-chat-input');

        if (!chatInput.value) {
          return;
        }

        const newChatName = {
          title: chatInput.value,
        };

        await chatsController.createChat(newChatName);

        chatInput.value = '';
        addChatField.classList.toggle('show');

        router.go(Path.messenger);
      },
    };

    this.setProps(CHATS_DATA);
  }

  public render() {
    return this.compile(chatsTmpl, this.props);
  }
}

