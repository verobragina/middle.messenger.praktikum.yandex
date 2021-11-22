type TAction = {
  type: string,
  event: string,
  data: any
}

export const setUser = (data) => {
  return {
    type: 'SET_USER',
    event: 'user_changed',
    data,
  };
};

export const loadChats = (data) => {
  return {
    type: 'LOAD_CHATS',
    event: 'load_chats',
    data,
  };
};

export const selectChat = (data) => {
  return {
    type: 'SELECT_CHAT',
    event: 'select_chat',
    data,
  };
};

export const setMessages = (data) => {
  return {
    type: 'SET_MESSAGES',
    event: 'messages_received',
    data,
  };
};

export const user = (state, action: TAction) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
};

export const chats = (state, action: TAction) => {
  switch (action.type) {
    case 'LOAD_CHATS':
      return action.data;
    default:
      return state;
  }
};

export const chat = (state, action: TAction) => {
  switch (action.type) {
    case 'SELECT_CHAT':
      return state = {
        id: action.data,
      };
    case 'SET_MESSAGES':
      return state.message = {
        ...state,
        messages: JSON.parse(action.data),
      };
    default:
      return state;
  }
};


