export default `
  <div class="chats__container">
    <div class="chats__sidebar chats">
      <div class="chats__profile">
        <a class="chats__profile-link" href="#profile">
          <p>Профиль</p>
          <span class="icon-arrow-left"></span>
        </a>
      </div>
      <input class="chats__search" type="text" placeholder="Поиск">
      <div class="chats__list">
        {{#each chat}}
          <div class="chats__list-chat chat">
            <div class="chat__user-photo"></div>
            <div class="chat__content">
              <div class="chat__user-name">{{user}}</div>
              <div class="chat__message">{{message}}</div>
            </div>
            <div class="chat__time">{{time}}</div>
          </div>
        {{/each}}
      </div>
    </div>
    <div class="chats__content">
      <div class="chats__content-user">User</div>
      <div class="chats__messages-filed">
          <p class="chats__messages-placeholder">Выберите чат, чтобы отправить сообщение</p>
      </div>
      <div class="chats__message-container">
          <input class="chats__message-input" name="{{message}}" type="text">
          <button class="chats__message-send"></button>
      </div>
    </div>
  </div>
`
