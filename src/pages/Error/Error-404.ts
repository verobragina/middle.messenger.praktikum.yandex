import Handlebars from 'handlebars';
import errorTmpl from './Error.tmpl';
import {ERROR404_DATA} from './Error.data';
import Block from '../../classes/Block/Block';
import './Error.scss';

export default class Error404 extends Block {
  constructor(props?: any) {
    super('error404', props);
  }

  render() {
    const error404 = Handlebars.compile(errorTmpl);
    return error404(ERROR404_DATA);
  }
}
