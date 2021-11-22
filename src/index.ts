import Router from './classes/Router/Router';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Profile from './pages/Profile/Profile';
import ProfilePassword from './pages/Profile/ProfilePassword/ProfilePassword';
import Chat from './pages/Chat/Chat';
import Error from './pages/Error/Error';
import './scss/styles.scss';

type TPath = { [key: string]: string };

const root: string = '#output';

export const Path: TPath = {
  login: '/',
  registration: '/sign-up',
  profile: '/settings',
  changePassword: '/settings/change-password',
  messenger: '/messenger',
  error: '/error',
};

export const router = new Router(root);

router
    .use(Path.login, Login)
    .use(Path.registration, Registration)
    .use(Path.profile, Profile)
    .use(Path.changePassword, ProfilePassword)
    .use(Path.messenger, Chat)
    .use(Path.error, Error)
    .start();
