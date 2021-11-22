export default `
  {{#if className}}
  <a class="{{className}}" href="{{href}}">
  {{else}}
  <a class="secondary__btn" href="{{href}}">
  {{/if}}
    <span>{{title}}</span>
    {{#if icon}}
       <span class="icon-arrow-left"></span>
    {{/if}}
  </a>
`;
