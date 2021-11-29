import chatListTmpl from './ChatList.tmpl';
import Block from '../../../classes/Block/Block';
import Chat from '../../../components/chat/chat';
import {webSocketAPI} from '../../../api/WebSocket';
import {store} from '../../../classes/Store/Store';
import {selectChat} from '../../../classes/Store/reducers';

export default class ChatList extends Block {
  constructor(props?: any) {
    super(props);
    this.props = props;
    store.subscribe({'load_chats': this});
  }

  componentDidMount() {
    this.props.events = {
      click: (e) => {
        e.preventDefault();
        const parent = e.target.closest('.chats__list-chat');
        if (parent) {
          const id = parent.dataset.chatId;
          const chatHeader = document.querySelector('.chat-header');
          const headerName = chatHeader.querySelector('.chat-header__title');
          const chats = store.getState().chats;
          const chat = chats.filter((chat) => {
            return chat.id === Number(id);
          });

          chatHeader.classList.add('show');
          chatHeader.setAttribute('data-selected-chat', id);
          headerName.textContent = chat[0].title ? chat[0].title : '';

          store.dispatch(selectChat(id));
          this.initWebSocket(id);
        }
      },
    };

    this.setProps(this.props);
  }

  initWebSocket(id) {
    const data = store.getState().user;
    webSocketAPI.connect({
      userID: data.id,
      chatID: id,
    });
  }

  storeChanged(key) {
    if (key === 'load_chats') {
      const newProps = this.updateChatsList();
      this.setProps(newProps);
    }
  }

  updateChatsList() {
    const chats = store.getState().chats;
    const newProps = {
      chats: [],
    };

    if (chats) {
      chats.forEach((chat) => {
        newProps.chats.push(new Chat(chat));
      });
    }

    return newProps;
  }

  public render() {
    return this.compile(chatListTmpl, this.props);
  }
}
