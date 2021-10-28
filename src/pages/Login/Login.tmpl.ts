export default `
  <form action="" method="post" class="login form__container" id="form-login">
      <div class="form__field">
          <h1 class="form__title">{{title}}</h1>
          {{#each input}}
              {{> input}}
          {{/each}}
      </div>
      <div class="form__buttons">
          {{> mainButton}}
          {{> secondaryButton}}
      </div>
  </form>
`;