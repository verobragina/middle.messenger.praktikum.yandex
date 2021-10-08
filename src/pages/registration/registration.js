import Handlebars from 'handlebars'
import registrationTmpl from './registration.tmpl'
import './registration.scss'
import '../../components/input'
import '../../components/main-button'
import '../../components/secondary-button'

const data = {
  title: 'Регистрация',
  mainButton: 'Зарегистрироваться',
  hrefMain: '/#chats',
  secondaryButton: 'Войти',
  hrefSecondary: '/#login',
  input: [
    {
      label: 'Почта',
      type: 'text',
      name: 'email',
      id: 'email'
    },
    {
      label: 'Логин',
      type: 'text',
      name: 'login',
      id: 'login'
    },
    {
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      id: 'name'
    },
    {
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      id: 'second_name'
    },
    {
      label: 'Телефон',
      type: 'text',
      name: 'phone',
      id: 'phone'
    },
    {
      label: 'Пароль',
      type: 'password',
      name: 'password',
      id: 'password'
    },
    {
      label: 'Пароль (еще раз)',
      type: 'password',
      id: 'password-rep'
    }
  ]
}

const registration =  Handlebars.compile(registrationTmpl)

export default registration(data)
