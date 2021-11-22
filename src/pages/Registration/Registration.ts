import registrationTmpl from './Registration.tmpl';
import Block from '../../classes/Block/Block';
import FormValidator from '../../classes/FormValidator/FormValidator';
import {REGISTRATION_DATA, INPUTS, MAIN_BUTTON, SECONDARY_BUTTON} from './Registration.data';
import {authController} from '../../controllers/AuthController';
import {Path, router} from '../../index';
import {isEmptyObject} from '../../utils/utils';
import './Registration.scss';


export default class Registration extends Block {
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
        const data = this.validator.onSubmitButtonClick(e, REGISTRATION_DATA.name);
        if (isEmptyObject(data)) {
          await authController.signUp(data);
        }
      },
    };

    SECONDARY_BUTTON.events = {
      click: (e) => {
        e.preventDefault();
        router.go(Path.login);
      },
    };

    this.setProps(REGISTRATION_DATA);
  }

  public render() {
    return this.compile(registrationTmpl, this.props);
  }
}
