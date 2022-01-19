import pages from './pages.js';

test('return configuration', () => {
  const { public: publicPages } = pages;

  expect(publicPages).toHaveLength(2);

  expect(publicPages[0].id).toEqual('signup');
  expect(publicPages[0].title).toEqual('Sign up');
  expect(publicPages[0].path).toEqual('/signup');

  expect(publicPages[1].id).toEqual('signin');
  expect(publicPages[1].title).toEqual('Sign in');
  expect(publicPages[1].path).toEqual('/signin');
});
