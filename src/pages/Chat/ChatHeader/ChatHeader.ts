import charHeaderTmpl from './ChatHeader.tmpl';
import Block from '../../../classes/Block/Block';
import {ADD_USER} from '../Chat.data';
import {chatsController} from '../../../controllers/ChatsController';
import {userController} from '../../../controllers/UserController';
import {Path, router} from '../../../index';
import './ChatHeader.scss';

type TResponse = { [key: string]: any }

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
          const userAddField = document.querySelector('.chat-header__add-user');
          userAddField.classList.toggle('show');
        }
      },
    };

    ADD_USER.events = {
      click: async (e) => {
        e.preventDefault();
        const selectedChatId = Number(e.target.closest('.chat-header').dataset.selectedChat);
        const options = e.target.closest('.chat-header__options');
        const inputUsername = document.querySelector('.add-user__input') as HTMLInputElement;
        const userAddField = document.querySelector('.chat-header__add-user') as HTMLInputElement;

        if (inputUsername.value !== '') {
          await userController.searchUser({
            login: inputUsername.value,
          }).then(async (res: TResponse) => {
            await chatsController.addUser({
              users: [res.response[0].id],
              chatId: selectedChatId,
            });
          });

          options.classList.toggle('show');
          userAddField.classList.toggle('show');
          inputUsername.value = '';
        }
      },
    };
  }

  public render() {
    return this.compile(charHeaderTmpl, this.props);
  }
}
