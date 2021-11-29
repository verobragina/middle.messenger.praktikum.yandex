import profileTmpl from './Profile.tmpl';
import Block from '../../classes/Block/Block';
import FormValidator from '../../classes/FormValidator/FormValidator';
import {
  EXIT_BUTTON,
  PROFILE_DATA,
  INPUTS,
  CHANGE_DATA,
  SAVE_DATA,
  CHANGE_PASSWORD, AVATAR_DATA,
} from './Profile.data';
import {authController} from '../../controllers/AuthController';
import {userController} from '../../controllers/UserController';
import {store} from '../../classes/Store/Store';
import {Path, router} from '../../index';
import {isEmptyObject, toLowerCase} from '../../utils/utils';

export default class Profile extends Block {
  validator: FormValidator;

  constructor(props?: any) {
    super(props);
    this.validator = new FormValidator();
    store.subscribe({'user_changed': this});
  }

  componentDidMount() {
    const data = store.getState().user;

    AVATAR_DATA.events = {
      change: (e) => {
        const formInput = e.target.closest('.profile__avatar');
        const form = new FormData(formInput);

        userController.changeAvatar(form).then(() => {
          router.go(Path.profile);
        });
      },
    };

    EXIT_BUTTON.events = {
      click: async (e) => {
        e.preventDefault();
        await authController.logout();
      },
    };

    CHANGE_DATA.events = {
      click: (e) => {
        e.preventDefault();
        const profile = document.querySelector('.profile__info');
        profile.classList.add('change');
      },
    };

    CHANGE_PASSWORD.events = {
      click: (e) => {
        e.preventDefault();
        router.go(Path.changePassword);
      },
    };

    SAVE_DATA.events = {
      click: async (e) => {
        e.preventDefault();
        const profile = document.querySelector('.profile__info');
        const data = this.validator.onSubmitButtonClick(e, PROFILE_DATA.name);

        if (isEmptyObject(data)) {
          await userController.changeProfile(data);
        }

        profile.classList.remove('change');
      },
    };

    if (data) {
      this.changeProps(data);
    }

    this.setProps(PROFILE_DATA);
  }

  storeChanged() {
    const data = store.getState().user;

    if (data) {
      this.changeProps(data);
    }

    this.setProps(PROFILE_DATA);
  }

  changeProps(data) {
    Object.entries(INPUTS).forEach(([key, value]) => {
      return value.value = data[toLowerCase(key)];
    });

    PROFILE_DATA.username = `${data.first_name} ${data.second_name}`;
    AVATAR_DATA.avatar = data.avatar;
  }

  public render() {
    return this.compile(profileTmpl, this.props);
  }
}
