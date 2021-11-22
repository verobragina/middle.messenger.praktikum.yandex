import messageFieldTmpl from './ChatMessageInput.tmpl';
import Block from '../../../classes/Block/Block';
import {MAIN_BUTTON, MESSAGE_FIELD} from '../Chat.data';
import {webSocketAPI} from '../../../api/WebSocket';
import './ChatMessageInput.scss';

export default class ChatMessageInput extends Block {
  constructor(props?: any) {
    super(props);
  }

  componentDidMount() {
    MAIN_BUTTON.events = {
      click: (e) => {
        e.preventDefault();
        const input = document.querySelector('#message') as HTMLInputElement;

        if (input.value) {
          webSocketAPI.socket.send(JSON.stringify({
            content: input.value,
            type: 'message',
          }));
        }

        input.value = '';
      },
    };

    this.setProps(MESSAGE_FIELD);
  }

  public render() {
    return this.compile(messageFieldTmpl, this.props);
  }
}
