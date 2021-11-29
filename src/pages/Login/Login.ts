import loginTmpl from './Login.tmpl';
import Block from '../../classes/Block/Block';
import FormValidator from '../../classes/FormValidator/FormValidator';
import {LOGIN_DATA, INPUTS, MAIN_BUTTON, SECONDARY_BUTTON} from './Login.data';
import {authController} from '../../controllers/AuthController';
import {Path, router} from '../../index';
import {isEmptyObject} from '../../utils/utils';

export default class Login extends Block {
  validator: FormValidator;

  constructor(props?: any) {
    super(props);
    this.validator = new FormValidator();
  }

  componentDidMount() {
    Object.values(INPUTS).forEach((value) => {
      return value.events = {
        click: (e) => this.validator.onInputClick(e.target, value.name),
        input: (e) => this.validator.onInput(e.target),
      };
    });

    MAIN_BUTTON.events = {
      click: async (e) => {
        e.preventDefault();
        const data = this.validator.onSubmitButtonClick(e, LOGIN_DATA.name);
        if (isEmptyObject(data)) {
          await authController.signIn(data);
        }
      },
    };

    SECONDARY_BUTTON.events = {
      click: async (e) => {
        e.preventDefault();
        router.go(Path.registration);
      },
    };

    this.setProps(LOGIN_DATA);
  }

  public render() {
    return this.compile(loginTmpl, this.props);
  }
}
