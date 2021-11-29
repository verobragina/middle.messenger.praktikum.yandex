import inputTmpl from './input.tmpl';
import Block from '../../classes/Block/Block';

export default class Input extends Block {
  constructor(props?: any) {
    super(props);
  }

  public render() {
    return this.compile(inputTmpl, this.props);
  }
}

