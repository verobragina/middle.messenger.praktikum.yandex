import Handlebars from 'handlebars';
import registrationTmpl from './Registration.tmpl';
import {REGISTRATION_DATA} from './Registration.data';
import Block from '../../classes/Block/Block';
import FormValidator from '../../classes/FormValidator/FormValidator';
import '../../components/input/input';
import '../../components/main-button/main-button';
import '../../components/secondary-button/secondary-button';
import './Registration.scss';

export default class Registration extends Block {
  validation: FormValidator

  constructor(props?: any) {
    super('registration', props);
  }

  render() {
    const registration = Handlebars.compile(registrationTmpl);
    return registration(REGISTRATION_DATA);
  }

  initValidation() {
    const inputs = Array.from(document.querySelectorAll('input')) as HTMLInputElement[];
    const errorFields = Array.from(document.querySelectorAll('.input__error-message')) as HTMLElement[];
    this.validation = new FormValidator(inputs, errorFields);
  }
}
