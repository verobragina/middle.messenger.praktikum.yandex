import {chatsController} from '../controllers/ChatsController';
import {store} from '../classes/Store/Store';
import {setMessages} from '../classes/Store/reducers';

type TDataToken = { [key: string]: any };

export default class WebSocketAPI {
  readonly _baseURL: string;
  chats: [];
  userID: number;
  chatID: number;
  token: string;
  public socket: WebSocket;

  constructor() {
    this._baseURL = 'wss://ya-praktikum.tech/ws/chats';
  }

  connect({userID, chatID}) {
    this.userID = userID;
    this.chatID = chatID;

    chatsController.getChatToken(this.chatID)
        .then((data: TDataToken) => {
          this.token = data.response.token;

          this.socket = new WebSocket(`${this._baseURL}/${this.userID}/${this.chatID}/${this.token}`);

          this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            this.socket.send(JSON.stringify({
              content: '',
              type: 'get old',
            }));
          });

          this.socket.addEventListener('close', (e: CloseEvent) => {
            if (e.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }

            console.log(`Код: ${e.code} | Причина: ${e.reason}`);
          });

          this.socket.addEventListener('message', (e: MessageEvent) => {
            console.log('Получены данные', e);
            store.dispatch(setMessages(e.data));
          });

          this.socket.addEventListener('error', (e: ErrorEvent) => {
            console.log('Ошибка', e.message);
          });
        });
  }
}

export const webSocketAPI = new WebSocketAPI();
