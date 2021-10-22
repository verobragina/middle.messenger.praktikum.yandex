import EventBus from "./EventBus"

type Props = { [key: string]: any }

export default class Block {
    _element: HTMLElement
    _meta: Record<string, any>
    props: Props = {}
    eventBus: () => EventBus

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    }

    constructor(tagName = "div", props = {}) {
        const eventBus = new EventBus()

        this._meta = {
            tagName,
            props
        }

        this.props = this._makePropsProxy(props)

        this.eventBus = () => eventBus

        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT)
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    private _createResources() {
        const {tagName} = this._meta
        if (tagName) {
            this._element = this._createDocumentElement(tagName)
        }
    }

    init() {
        this._createResources()
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    private _componentDidMount() {
        this.componentDidMount()
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    componentDidMount() {
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps)
        if (!response) {
            return
        }
        this._render()
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        return true
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }

    get element() {
        return this._element
    }

    private _render() {
        const block = this.render()
        if (block) {
            this._element.innerHTML = block
        }
    }

    render(): string | void {
    }

    getContent() {
        return this.element
    }

    private _makePropsProxy(props: Props) {
        const self = this

        return new Proxy(props, {
            get(target, prop: string) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Нет доступа');
                }
                const value = target[prop]
                return typeof value === "function" ? value.bind(target) : value
            },
            set(target, prop: string, value) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Нет доступа');
                }
                target[prop] = value
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target)
                return true
            },
            deleteProperty(target, prop: string) {
                if (prop.indexOf('_') === 0) {
                    throw new Error('Нет доступа')
                }
                delete target[prop]
                return true
            }
        })
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName)
    }

    show() {
        this.getContent().style.display = "block"
    }

    hide() {
        this.getContent().style.display = "none"
    }
}
