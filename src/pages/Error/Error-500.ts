import Handlebars from 'handlebars';
import errorTmpl from './Error.tmpl';
import {ERROR500_DATA} from './Error.data';
import Block from '../../classes/Block/Block';
import './Error.scss';

export default class Error404 extends Block {
  constructor(props?: any) {
    super('error500', props);
  }

  render() {
    const error500 = Handlebars.compile(errorTmpl);
    return error500(ERROR500_DATA);
  }
}
