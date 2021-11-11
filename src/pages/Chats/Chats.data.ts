import MessageField from '../../components/message-field/message-field';
import MainButton from '../../components/main-button/main-button';
import FormValidator from '../../classes/FormValidator/FormValidator';

const validator = new FormValidator();

const MAIN_BUTTON = {
  className: 'chats__message-send',
  title: 'Отправить',
  events: {
    click: (e) => validator.onSubmitButtonClick(e, MESSAGE_FIELD.name),
  },
};

const MESSAGE_FIELD = {
  name: 'chats-form',
  message: 'message',
  mainButton: new MainButton(MAIN_BUTTON),
};

export const CHATS_DATA = {
  chat: [
    {
      user: 'Андрей',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: '10:49',
    },
    {
      user: 'Илья',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: '09:20',
    },
    {
      user: 'Вадим',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: 'Пт',
    },
    {
      user: 'Стас',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: 'Чт',
    },
    {
      user: 'Иван',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: '1 Мая 2021',
    },
    {
      user: 'Андрей',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: '10:49',
    },
    {
      user: 'Илья',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: '09:20',
    },
    {
      user: 'Вадим',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: 'Пт',
    },
    {
      user: 'Стас',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: 'Чт',
    },
    {
      user: 'Иван',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      datetime: '',
      time: '1 Мая 2021',
    },
  ],
  messageField: new MessageField(MESSAGE_FIELD),
};
