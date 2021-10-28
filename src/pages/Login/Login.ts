import Handlebars from 'handlebars';
import loginTmpl from './Login.tmpl';
import {LOGIN_DATA} from './Login.data';
import Block from '../../classes/Block/Block';
import FormValidator from '../../classes/FormValidator/FormValidator';
import '../../components/input/input';
import '../../components/main-button/main-button';
import '../../components/secondary-button/secondary-button';
import './Login.scss';

export default class Login extends Block {
  validation: FormValidator

  constructor(props?: any) {
    super('login', props);
  }

  render() {
    const login = Handlebars.compile(loginTmpl);
    return login(LOGIN_DATA);
  }

  initValidation() {
    const inputs = Array.from(document.querySelectorAll('input')) as HTMLInputElement[];
    const errorFields = Array.from(document.querySelectorAll('.input__error-message')) as HTMLElement[];
    this.validation = new FormValidator(inputs, errorFields);
  }
}
