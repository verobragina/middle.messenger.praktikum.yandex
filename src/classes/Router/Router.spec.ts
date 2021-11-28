import {} from '../../../test/global';
import {expect} from 'chai';
import {Path, router} from '../../index';
import Router from './Router';

describe('Router checking', () => {
  it('Router history', () => {
    const historyLength = router.history.length;
    router.go(Path.login);
    router.go(Path.registration);

    expect(router.history.length).to.equal(historyLength + 2);
  });

  it('Error page in case wrong link', () => {
    router.go('/abcd');
    expect(router?._currentRoute?._pathname).to.equal(Path.error);
  });

  it('Router is singleton', () => {
    const a = new Router('#root');
    const b = new Router('#root');

    expect(a).to.equal(b);
  });
});
