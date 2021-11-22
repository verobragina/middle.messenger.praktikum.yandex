import {VALIDATION_DATA as data} from './FormValidator.data';

export type TOutput = { [key: string]: string };

export default class FormValidator {
  errorField: HTMLElement;
  password: string;
  output: {}

  inputCheck = (value: string, name: string) => {
    let validationResult: string = '';

    if (data[name]) {
      const re = data[name].re;
      validationResult = re.test(value) ? '' : data[name].message;
    }
    if (this.errorField) {
      this.errorField.innerHTML = validationResult;
    }
  }

  passwordCheck = (value: string, name: string) => {
    if (this.password === value) {
      this.errorField.innerHTML = '';
    } else {
      this.errorField.innerHTML = data[name].message;
    }
  }

  onSubmitButtonClick = (e, formName) => {
    e.preventDefault();
    this.output = {};

    const form = document.querySelector(`[name = ${formName}]`);
    const fields = form.querySelectorAll('input');

    fields.forEach((input) => {
      if (input.type !== 'submit') {
        if (input.value !== '') {
          this.output[input.name] = input.value;
        } else {
          input.classList.add('error');
        }
      }
    });

    console.log(this.output);
  }

  onInput = (target) => {
    target.getAttribute('name') === 'password_confirm'
      ? this.passwordCheck(target.value, 'password_confirm')
      : this.inputCheck(target.value, target.name);
  }

  onInputClick = (target, name) => {
    this.errorField = document.querySelector(`[data-name=${name}]`);

    target.classList.remove('error');

    if (name === 'password_confirm') {
      const passwordField = document.querySelector(`[data-name=${name}]`) as HTMLInputElement;
      this.password = passwordField.value;
    }
  }
}
