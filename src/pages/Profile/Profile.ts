import Handlebars from 'handlebars';
import profileTmpl from './Profile.tmpl';
import {PROFILE_DATA} from './Profile.data';
import Block from '../../classes/Block/Block';
import FormValidator from '../../classes/FormValidator/FormValidator';
import '../../components/input/input';
import '../../components/secondary-button/secondary-button';
import './Profile.scss';

export default class Profile extends Block {
  validation: FormValidator

  constructor(props?: any) {
    super('profile', props);
  }

  render() {
    const profile = Handlebars.compile(profileTmpl);
    return profile(PROFILE_DATA);
  }

  initValidation() {
    const inputs = Array.from(document.querySelectorAll('input')) as HTMLInputElement[];
    const errorFields = Array.from(document.querySelectorAll('.input__error-message')) as HTMLElement[];
    this.validation = new FormValidator(inputs, errorFields);
  }
}
