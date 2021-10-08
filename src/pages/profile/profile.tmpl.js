export default `
  <div class="profile__container">
      <div class="profile__container-back">
          <a href="/#chats">
              <button id="backToChats">
                  <span class="icon-arrow-left"></span>
              </button>
          </a>
      </div>
      <div class="profile__container-main profile">
          <div class="profile__avatar">
              <img src="{{avatar}}" alt="avatar" name="{{nameAvatar}}">
              <div class="profile__avatar-label">Поменять аватар</div>
          </div>
          <h1 class="profile__name">{{username}}</h1>
          <div class="profile__info">
              {{#each input}}
                  {{> input}}
              {{/each}}
          </div>
          <div class="profile__buttons">
              {{#each button}}
                  {{> secondaryButton}}
              {{/each}}
          </div>
      </div>
  </div>
`
