import profilePasswordTmpl from './ProfilePassword.tmpl';
import Block from '../../../classes/Block/Block';
import FormValidator from '../../../classes/FormValidator/FormValidator';
import {INPUTS, PROFILE_PASSWORD_DATA, SAVE_PASSWORD} from './ProfilePassword.data';
import {userController} from '../../../controllers/UserController';
import {store} from '../../../classes/Store/Store';
import {Path, router} from '../../../index';
import {isEmptyObject} from '../../../utils/utils';

export default class ProfilePassword extends Block {
  validator: FormValidator;

  constructor(props?: any) {
    super(props);
    this.validator = new FormValidator();
  }

  componentDidMount() {
    const data = store.getState().user;

    INPUTS.NEW_PASSWORD.events = {
      click: (e) => this.validator.onInputClick(e.target, INPUTS.NEW_PASSWORD.name),
      input: (e) => this.validator.onInput(e.target),
    };

    SAVE_PASSWORD.events = {
      click: async (e) => {
        e.preventDefault();
        const data = this.validator.onSubmitButtonClick(e, PROFILE_PASSWORD_DATA.name);

        if (isEmptyObject(data)) {
          await userController.changePassword(data).then(() => {
            router.go(Path.profile);
          });
        }
      },
    };

    if (data) {
      PROFILE_PASSWORD_DATA.username = `${data.first_name} ${data.second_name}`;
    }

    this.setProps(PROFILE_PASSWORD_DATA);
  }

  public render() {
    return this.compile(profilePasswordTmpl, this.props);
  }
}
