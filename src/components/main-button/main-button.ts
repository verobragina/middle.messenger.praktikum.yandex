import mainButton from './main-button.tmpl';
import Block from '../../classes/Block/Block';
import './main-button.scss';

export default class MainButton extends Block {
  constructor(props?: any) {
    super(props);
  }

  public render() {
    return this.compile(mainButton, this.props);
  }
}
