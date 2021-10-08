import Handlebars from 'handlebars'
import chatsTmpl from './chats.tmpl'
import './chats.scss'

const data = {
  chat: [
    {
      user: 'Андрей',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: '10:49'
    },
    {
      user: 'Илья',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: '09:20'
    },
    {
      user: 'Вадим',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: 'Пт'
    },
    {
      user: 'Стас',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: 'Чт'
    },
    {
      user: 'Иван',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: '1 Мая 2021'
    },
    {
      user: 'Андрей',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: '10:49'
    },
    {
      user: 'Илья',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: '09:20'
    },
    {
      user: 'Вадим',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: 'Пт'
    },
    {
      user: 'Стас',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: 'Чт'
    },
    {
      user: 'Иван',
      message: 'Друзья, у меня для вас особенный выпуск новостей!',
      time: '1 Мая 2021'
    }
  ],
  message: "message"
}

const chats = Handlebars.compile(chatsTmpl)

export default chats(data)
