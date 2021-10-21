import Handlebars from 'handlebars'
import loginTmpl from './login.tmpl'
import './login.scss'
import '../../components/input'
import '../../components/main-button'
import '../../components/secondary-button'

const data = {
  title: 'Вход',
  mainButton: 'Авторизоваться',
  hrefMain: '/#chats',
  secondaryButton: 'Нет аккаунта?',
  hrefSecondary: '/#registration',
  input: [
    {
      label: 'Логин',
      type: 'text',
      name: 'login',
      id: 'login'
    },
    {
      label: 'Пароль',
      type: 'password',
      name: 'password',
      id: 'password'
    }
  ]
}

const login = Handlebars.compile(loginTmpl)

export default login(data)
