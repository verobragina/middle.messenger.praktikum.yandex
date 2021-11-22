import {render, isEqual} from '../../utils/utils';
import Block from '../Block/Block';

type TBlockClass = new() => Block;

export default class Route {
  _pathname: string;
  _blockClass: TBlockClass;
  _block: Block;
  _props: { root: string };

  constructor(pathname: string, block: TBlockClass, props: { root: string }) {
    this._pathname = pathname;
    this._blockClass = block;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      // this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.root, this._block.getContent());
      return;
    } else {
      render(this._props.root, this._block.render());
    }
  }
}
