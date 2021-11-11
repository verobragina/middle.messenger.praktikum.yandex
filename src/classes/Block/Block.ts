import * as Handlebars from 'handlebars';
import EventBus from '../EventBus/EventBus';
import {css} from '../../utils/utils';

type TProps = { [key: string]: any };

export default abstract class Block {
  private _element;
  private eventBus: () => EventBus;
  private readonly _nodes: Record<string, Block>;
  protected props: TProps = {};

  abstract render(): Element;

  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  protected constructor(props = {}) {
    const eventBus = new EventBus();
    this._nodes = {};
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    this._element = document.createDocumentFragment();
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {
  }

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
    return oldProps !== newProps;
  }

  setProps = ({...nextProps}: TProps) => {
    const previousProps = {...this.props};
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, previousProps, this.props);
  }

  get element() {
    return this._element.firstElementChild;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();
    this._element.textContent = '';
    if (block) {
      this._element.appendChild(block);
    }
    this._addEvents();
  }

  compile = (tmpl, props) => {
    const fragment = document.createElement('template');
    const template = Handlebars.compile(tmpl);
    const nodes = this._nodes;

    Object.entries(props).forEach(([propName, prop], index) => {
      if (prop instanceof Block) {
        nodes[index] = prop;
        props[propName] = `<div id='${index}'></div>`;
      }
    });

    fragment.innerHTML = template(props);

    Object.entries(nodes).forEach(([id, component]: [string, Block]) => {
      const templateEl = fragment.content.getElementById(`${id}`);

      if (!templateEl) {
        return;
      }

      templateEl.replaceWith(component.render());
    });

    if (props.events) {
      this._addEvents(fragment.content.firstElementChild);
    }

    return fragment.content.firstElementChild;
  }

  getContent() {
    return this.element as Node;
  }

  private _addEvents(element?) {
    const {events} = this.props;
    if (events) {
      Object.entries(events).forEach(([event, handler]) => {
        if (element) {
          element.addEventListener(event, handler);
        }
        this.element?.addEventListener(event, handler);
      });
    }
  }

  private _removeEvents(element?) {
    const {events} = this.props;
    if (events) {
      Object.entries(events).forEach(([event, handler]) => {
        if (element) {
          element.removeEventListener(event, handler);
        }
        this.element?.removeEventListener(event, handler);
      });
    }
  }

  private _makePropsProxy = (props: TProps) => {
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет доступа');
        }
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет доступа');
        }
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty(target, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Нет доступа');
        }
        delete target[prop];
        return true;
      },
    });
  }

  show() {
    css(this.getContent(), {display: 'block'});
  }

  hide() {
    css(this.getContent(), {display: 'none'});
  }
}
