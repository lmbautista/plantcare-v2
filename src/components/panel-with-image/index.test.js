import React from 'react';
import { render, screen } from '@testing-library/react';
import PanelWithImage from './index.js';

const testProps = {
  id: 'id',
  image: '/',
  title: 'title',
  subtitle: 'subtitle',
  description: 'description',
  children: <p>children</p>
};

test('load and render component', () => {
  const { container } = render(<PanelWithImage {...testProps} />);

  expect(container.querySelector('#id'));

  const titleTags = screen.getAllByText('title');
  expect(titleTags).toBeDefined();
  expect(titleTags).toHaveLength(2);

  const subtitleTags = screen.getAllByText('subtitle');
  expect(subtitleTags).toBeDefined();
  expect(subtitleTags).toHaveLength(2);

  const descriptionTags = screen.getAllByText('description');
  expect(descriptionTags).toBeDefined();
  expect(descriptionTags).toHaveLength(2);

  expect(screen.getByRole('img')).toBeDefined();
});
