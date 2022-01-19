import routes from '../../routes';

import sections from './sections.js';

test('return home configuration', () => {
  const home = sections.public[routes.home];

  expect(home).toHaveLength(3);

  expect(home[0].id).toEqual('features');
  expect(home[0].title).toEqual('Features');
  expect(home[0].path).toEqual('#features');

  expect(home[1].id).toEqual('about');
  expect(home[1].title).toEqual('About');
  expect(home[1].path).toEqual('#about');

  expect(home[2].id).toEqual('contact');
  expect(home[2].title).toEqual('Contact');
  expect(home[2].path).toEqual('#contact');
});
