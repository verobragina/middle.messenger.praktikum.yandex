import charHeaderTmpl from './ChatHeader.tmpl';
import Block from '../../../classes/Block/Block';
import {ADD_USER} from '../Chat.data';
import {chatsController} from '../../../controllers/ChatsController';
import {userController} from '../../../controllers/UserController';
import {Path, router} from '../../../index';
import './ChatHeader.scss';

export default class ChatHeader extends Block {
  constructor(props?: any) {
    super(props);
  }

  componentDidMount() {
    this.props.events = {
      click: async (e) => {
        e.preventDefault();
        if (e.target.closest('span.icon-more')) {
          const options = document.querySelector('.chat-header__options');
          options.classList.toggle('show');
        }

        if (e.target.hasAttribute('data-delete-chat')) {
          const selectedChatId = Number(e.target.closest('.chat-header').dataset.selectedChat);
          await chatsController.deleteChat({
            chatId: selectedChatId,
          });

          router.go(Path.messenger);
        }

        if (e.target.hasAttribute('data-add-user')) {
          const userInput = document.querySelector('.chat-header__add-user');
          userInput.classList.toggle('show');
        }
      },
    };

    ADD_USER.events = {
      click: async (e) => {
        e.preventDefault();
        const selectedChatId = Number(e.target.closest('.chat-header').dataset.selectedChat);
        const options = e.target.closest('.chat-header__options');
        const inputUsername = document.querySelector('.add-user__input') as HTMLInputElement;

        if (inputUsername.value !== '') {
          const user = await userController.searchUser({
            login: inputUsername.value,
          });

          await chatsController.addUser({
            users: [user[0].id],
            chatId: selectedChatId,
          });

          options.classList.toggle('show');
        }
      },
    };
  }

  public render() {
    return this.compile(charHeaderTmpl, this.props);
  }
}
