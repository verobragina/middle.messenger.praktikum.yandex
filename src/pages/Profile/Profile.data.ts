export const PROFILE_DATA = {
  username: 'Иван',
  avatar: 'avatar',
  nameAvatar: 'avatar',
  input: [
    {
      label: 'Почта',
      value: 'ivan@yandex.ru',
      type: 'email',
      name: 'email',
      id: 'mail',
    },
    {
      label: 'Логин',
      value: 'ivanivanov',
      type: 'text',
      name: 'login',
      id: 'login',
    },
    {
      label: 'Имя',
      value: 'Иван',
      type: 'text',
      name: 'first_name',
      id: 'name',
    },
    {
      label: 'Фамилия',
      value: 'Иванов',
      type: 'text',
      name: 'second_name',
      id: 'second_name',
    },
    {
      label: 'Имя в чате',
      value: 'Иван',
      type: 'text',
      name: 'display_name',
      id: 'display_name',
    },
    {
      label: 'Телефон',
      value: '+7 (123) 456 78 90',
      type: 'tel',
      name: 'phone',
      id: 'phone',
    },
  ],
  button: [
    {
      secondaryButton: 'Изменить данные',
      hrefSecondary: '/#error-404',
    },
    {
      secondaryButton: 'Изменить пароль',
      hrefSecondary: '/#error-404',
    },
    {
      secondaryButton: 'Выйти',
      hrefSecondary: '/#login',
    },
  ],
};
