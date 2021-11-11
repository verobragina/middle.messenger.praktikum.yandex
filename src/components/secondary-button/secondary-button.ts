import secondaryButton from './secondary-button.tmpl';
import Block from '../../classes/Block/Block';
import './secondary-button.scss';

export default class SecondaryButton extends Block {
  constructor(props?: any) {
    super(props);
  }

  public render() {
    return this.compile(secondaryButton, this.props);
  }
}
