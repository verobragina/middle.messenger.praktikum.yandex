import Route from './Route';
import {Path} from '../../index';
import {authController} from '../../controllers/AuthController';
import {chatsController} from '../../controllers/ChatsController';
import {store} from '../Store/Store';
import {loadChats, setUser} from '../Store/reducers';

type TEvent = { [key: string]: any };
type TResponse = { [key: string]: any };

export default class Router {
  private static __instance: Router
  _root: string | null = null;
  _currentRoute: Route | null
  routes: Route[];
  history: History;

  constructor(root: string) {
    if (Router.__instance) {
      Router.__instance._root = root;
      return Router.__instance;
    }

    this.routes = [];
    this._root = root;
    this._currentRoute = null;
    this.history = window.history;
    Router.__instance = this;
  }

  use(pathname: string, block): Router {
    const route = new Route(pathname, block, {root: this._root});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: TEvent) => {
      const {pathname} = event.currentTarget.location;
      this._onRoute(pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    this.checkRoute(pathname).then(() => {
      let route = this.getRoute(pathname);

      if (!route) {
        route = this.getRoute(Path.error);
      }

      if (this._currentRoute) {
        this._currentRoute.leave();
      }

      this._currentRoute = route;
      route.render();
    });
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  async checkRoute(pathname: string) {
    if (pathname === Path.login || pathname === Path.registration) {
      await authController.getUserInfo().then(async (res: TResponse) => {
        if (res.status >= 200 && res.status < 300) {
          store.dispatch(setUser(res.response));
          await chatsController.getChatInfo().then((res: TResponse) => {
            store.dispatch(loadChats(res.response));
            this.go(Path.messenger);
          });
        }
      });
    }
    if (pathname === Path.profile || pathname === Path.messenger || pathname === Path.changePassword) {
      await authController.getUserInfo().then(async (res: TResponse) => {
        if (res.status > 400) {
          this.go(Path.login);
        }
        if (res.status >= 200 && res.status < 300) {
          store.dispatch(setUser(res.response));
          await chatsController.getChatInfo().then((res: TResponse) => {
            store.dispatch(loadChats(res.response));
          });
        }
      });
    }
    return;
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
