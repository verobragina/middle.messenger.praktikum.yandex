import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Profile from './pages/Profile/Profile';
import Chats from './pages/Chats/Chats';
import Error404 from './pages/Error/Error-404';
import Error500 from './pages/Error/Error-500';
import {render} from './utils/utils';
import './scss/styles.scss';

type TLocation = { [key: string]: any };

const TAG: string = '#output';

const location: TLocation = {
  'login': Login,
  'registration': Registration,
  'profile': Profile,
  'chats': Chats,
  'error404': Error404,
  'error500': Error500,
};

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);

  const component = Object.keys(location).includes(hash)
    ? new location[hash]()
    : new Error404();

  render(TAG, component.render());
  // eslint-disable-next-line
  component.__proto__.hasOwnProperty('initValidation')
    ? component.initValidation()
    : false;
});
