import EventBus from '../EventBus/EventBus';
import {user, chats, chat} from './reducers';

type TReducers = { [key: string]: (state, action) => {} };
type TReducer = (state: { [key: string]: any }, action: {}) => { [key: string]: any };

class Store extends EventBus {
  state: { [key: string]: any };
  subscribers = {};
  reducer: TReducer;
  event: string;

  constructor(reducers) {
    super();
    this.state = {};
    this.reducer = this.toReducer(reducers);
    this.subscribers = {};
    this.init();
  }

  init() {
    this.on('user_changed', this.notifySubscribers.bind(this));
    this.on('load_chats', this.notifySubscribers.bind(this));
    this.on('select_chat', this.notifySubscribers.bind(this));
    this.on('messages_received', this.notifySubscribers.bind(this));
  }

  notifySubscribers() {
    Object.keys(this.subscribers).forEach((key: string) => {
      if (key === this.event && this.subscribers[key].storeChanged) {
        this.subscribers[key].storeChanged(key);
      }
    });
  }

  subscribe(component) {
    Object.keys(component).forEach((key) => {
      this.subscribers[key] = component[key];
    });
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    if (action.event) {
      this.event = action.event;
      this.emit(action.event);
    }
  }

  private toReducer(reducers: TReducers): TReducer {
    return (state, action) => {
      const newState = {};

      Object.entries(reducers).forEach(([key, reducer]) => {
        newState[key] = reducer(this.state[key], action);
      });

      return newState;
    };
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store({
  user,
  chats,
  chat,
});

