export const REGISTRATION_DATA = {
  title: 'Регистрация',
  mainButton: 'Зарегистрироваться',
  hrefMain: '/#chats',
  secondaryButton: 'Войти',
  hrefSecondary: '/#login',
  input: [
    {
      label: 'Почта',
      type: 'email',
      name: 'email',
      id: 'email',
    },
    {
      label: 'Логин',
      type: 'text',
      name: 'login',
      id: 'login',
    },
    {
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      id: 'name',
    },
    {
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      id: 'second_name',
    },
    {
      label: 'Телефон',
      type: 'tel',
      name: 'phone',
      id: 'phone',
    },
    {
      label: 'Пароль',
      type: 'password',
      name: 'password',
      id: 'password',
    },
    {
      label: 'Пароль (еще раз)',
      type: 'password',
      name: 'password_confirm',
      id: 'password_confirm',
    },
  ],
};
