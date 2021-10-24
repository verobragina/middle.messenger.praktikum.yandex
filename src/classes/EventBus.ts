export default class EventBus {
    listeners: {
        [key: string]: Function[]
    }

    constructor() {
      this.listeners = {};
    }

    on(event: string, callback: Function) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }

    emit(event: string, ...args: any) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event].forEach(function(listener) {
        listener(...args);
      });
    }

    off(event: string, callback: Function) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }

      this.listeners[event] = this.listeners[event].filter(
          (listener) => listener !== callback
      );
    }
}
