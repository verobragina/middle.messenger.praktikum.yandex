type TValidation = { [key: string]: { [key: string]: any } };

export const VALIDATION_DATA: TValidation = {
  email: {
    re: /\S+@\S+\.\S+/,
    message: 'Введите корректную почту. Пример: example@example.com',
  },
  login: {
    re: /^(?=[\S]+)(?=.*[^0-9 ].*)[a-zA-Z0-9_-]{3,20}$/,
    message: 'Допустимо использовать от 3 до 20 символов, только латинские буквы, цифры, "-" и "_"',
  },
  first_name: {
    re: /^[A-ZА-Я][A-Za-zА-Яа-я\\-]+$/,
    message: 'Допустимо использовать только латиницу или кириллицу, первая буква заглавная',
  },
  second_name: {
    re: /^[A-ZА-Я][A-Za-zА-Яа-я\\-]+$/,
    message: 'Допустимо использовать только латиницу или кириллицу, первая буква заглавная',
  },
  display_name: {
    re: /^[A-Za-zА-Яа-я0-9]+$/,
    message: 'Допустимо использовать только латиницу или кириллицу, без символов и пробелов',
  },
  phone: {
    re: /^\+?( *\d){10,15} *$/,
    message: 'Введите корректный номер. Пример: +7 XXX XXX XX XX',
  },
  password: {
    re: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d]{8,20}$/,
    message: 'Пароль должен быть от 8 до 20 символов, включать заглавные буквы и цифры',
  },
  newPassword: {
    re: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d]{8,20}$/,
    message: 'Пароль должен быть от 8 до 20 символов, включать заглавные буквы и цифры',
  },
  password_confirm: {
    message: 'Пароли не совпадают',
  },
};
