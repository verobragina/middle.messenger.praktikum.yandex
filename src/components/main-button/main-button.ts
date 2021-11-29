import mainButtonTmpl from './main-button.tmpl';
import Block from '../../classes/Block/Block';

export default class MainButton extends Block {
  constructor(props?: any) {
    super(props);
  }

  public render() {
    return this.compile(mainButtonTmpl, this.props);
  }
}
