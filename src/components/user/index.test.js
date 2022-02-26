import User from './index';
import routes from '../../routes';
import * as Utils from '../../utils';

beforeEach(() => jest.clearAllMocks());

const history = { go: jest.fn() };
const userData = { email: 'luihbautista@gmail.com', api_token: 'abc123' };
const cookieData = { user: 'luihbautista@gmail.com', token: 'abc123' };

test('return expected object with no season', () => {
  const user = User({ history });

  expect(user.signIn).toBeInstanceOf(Function);
  expect(user.signOut).toBeInstanceOf(Function);
  expect(user.isLoggedIn).toBeInstanceOf(Function);
  expect(user.profile).toBeInstanceOf(Function);
});

test('return profile with no season', () => {
  const user = User({ history });

  expect(JSON.stringify(user.profile())).toEqual(JSON.stringify({}));
});

test('return profile with season', () => {
  Utils.getSessionCookies = jest.fn().mockImplementation(() => cookieData);
  const user = User({ history });

  expect(JSON.stringify(user.profile())).toEqual(JSON.stringify(cookieData));
});

test('signIn', () => {
  Utils.setSessionCookies = jest.fn();
  Utils.getSessionCookies = jest.fn().mockImplementationOnce(() => userData);

  const user = User({ history });

  user.signIn(userData);

  expect(history.go).toHaveBeenCalledWith(routes.plantcares);
  expect(Utils.setSessionCookies).toHaveBeenCalledWith(userData);
});

test('signOut', () => {
  Utils.removeSessionCookies = jest.fn();

  const user = User({ history });

  user.signOut();

  expect(history.go).toHaveBeenCalledWith(routes.root);
  expect(Utils.removeSessionCookies).toHaveBeenCalledTimes(1);
});

test('isLoggedIn returns true', () => {
  Utils.getSessionCookies = jest.fn().mockImplementationOnce(() => cookieData);

  const user = User({ history });

  expect(user.isLoggedIn()).toBeTruthy();
  expect(Utils.getSessionCookies).toHaveBeenCalledTimes(1);
});

test('isLoggedIn returns false', () => {
  Utils.getSessionCookies = jest.fn().mockImplementationOnce(() => {});

  const user = User({ history });

  expect(user.isLoggedIn()).toBeFalsy();
  expect(Utils.getSessionCookies).toHaveBeenCalledTimes(1);
});
