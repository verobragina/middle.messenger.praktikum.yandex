import {getErrorField, css} from '../../utils/utils';
import {VALIDATION_DATA as data} from './FormValidator.data';

export type TOutput = { [key: string]: string };

export default class FormValidator {
  inputs: HTMLInputElement[]
  errorFields: HTMLElement[] | null
  output: TOutput

  constructor(inputs: HTMLInputElement[], errorFields?: HTMLElement[] | null) {
    this.inputs = inputs;
    this.errorFields = errorFields ? errorFields : null;
    this.output = {};
    this.init();
  }

  init() {
    this.inputs.forEach((input) => {
      if (input.type !== 'submit') {
        input.addEventListener('focus', this.onFocus);
        input.addEventListener('blur', this.onBlur);
      } else {
        input.addEventListener('click', this.onClick);
      }
    });
  }

  inputCheck = (value: string, name: string) => {
    let validationResult: string = '';
    let errorField;

    if (data[name]) {
      const re = data[name].re;
      validationResult = re.test(value) ? '' : data[name].message;
    }
    if (this.errorFields) {
      errorField = getErrorField(this.errorFields, name)[0];
      errorField.innerHTML = validationResult;
    }
  }

  passwordCheck = (value: string, name: string) => {
    let errorField;
    const password = this.inputs.filter((input) => {
      return input.getAttribute('name') === 'password';
    })[0].value;

    if (this.errorFields) {
      errorField = getErrorField(this.errorFields, name)[0];
      password === value
        ? errorField.innerHTML = ''
        : errorField.innerHTML = data[name].message;
    }
  }

  onClick = (event: Event) => {
    event.preventDefault();
    this.output = {};
    this.inputs.forEach((input) => {
      if (input.type !== 'submit') {
        input.value !== ''
          ? this.output[input.name] = input.value
          : css(input, {borderColor: '#f00'});
      }
    });
    console.log(this.output);
  }

  onFocus = (event: Event) => {
    let errorField;
    const target = event.target as HTMLInputElement;

    if (this.errorFields) {
      errorField = getErrorField(this.errorFields, target.name)[0];
      css(target, {borderColor: '#3369f3'});
      errorField ? errorField.innerHTML = '' : false;
    }
  }

  onBlur = (event: Event) => {
    const target = event.target as HTMLInputElement;

    target.getAttribute('name') === 'password_confirm'
      ? this.passwordCheck(target.value, 'password_confirm')
      : this.inputCheck(target.value, target.name);
  }

  remove() {
    this.inputs.forEach((input) => {
      if (input.type !== 'submit') {
        input.removeEventListener('focus', this.onFocus);
        input.removeEventListener('blur', this.onBlur);
      } else {
        input.removeEventListener('click', this.onClick);
      }
    });
  }
}
