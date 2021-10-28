import Handlebars from 'handlebars';
import chatsTmpl from './Chats.tmpl';
import {CHATS_DATA} from './Chats.data';
import Block from '../../classes/Block/Block';
import FormValidator from '../../classes/FormValidator/FormValidator';
import '../../components/chat/chat';
import './Chats.scss';

export default class Chats extends Block {
  validation: FormValidator

  constructor(props?: any) {
    super('chats', props);
  }

  render() {
    const chats = Handlebars.compile(chatsTmpl);
    return chats(CHATS_DATA);
  }

  initValidation() {
    const inputs = Array.from(document.querySelectorAll('input')) as HTMLInputElement[];
    this.validation = new FormValidator(inputs);
  }
}

