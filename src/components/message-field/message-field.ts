import messageField from './message-field.tmpl';
import Block from '../../classes/Block/Block';
import './message-field.scss';

export default class MessageField extends Block {
  constructor(props?: any) {
    super(props);
  }

  public render() {
    return this.compile(messageField, this.props);
  }
}

