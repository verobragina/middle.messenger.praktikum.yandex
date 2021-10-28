export default `
  <div class="chats__container">
    <div class="chats__sidebar chats">
      <div class="chats__profile">
        <a class="chats__profile-link" href="/#profile">
          <span>Профиль</span>
          <span class="icon-arrow-left"></span>
        </a>
      </div>
      <input class="chats__search" type="text" placeholder="Поиск">
      <div class="chats__list">
        {{#each chat}}
            {{> chat}}
        {{/each}}
      </div>
    </div>
    <div class="chats__content">
      <div class="chats__content-user">User</div>
      <div class="chats__messages-filed">
          <p class="chats__messages-placeholder">Выберите чат, чтобы отправить сообщение</p>
      </div>
      <form action="" method="post" class="chats__message-container">
          <input class="chats__message-input" name="{{message}}" type="text" id="message">
          <input type="submit" class="chats__message-send" value="Отправить">
      </form>
    </div>
  </div>
`;
