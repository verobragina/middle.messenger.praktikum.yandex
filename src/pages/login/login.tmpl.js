export default `
  <div class="login form__container">
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
  </div>
`
