import React from 'react';
import { render, screen } from '@testing-library/react';
import BubbleCard from './index.js';

import backgroundImg from './test/images/plantcare-default.png';
import iconImg from './test/images/watering-icon.png';
import { mockPlantcare } from '../../../test_utils';

test('load and render component', () => {
  const plantcare = mockPlantcare();
  const props = {
    title: plantcare.name,
    subtitle: 'The subtitle',
    icon: iconImg,
    background: backgroundImg,
    actions: <>No actions</>
  };
  render(<BubbleCard {...props} />);

  expect(screen.getAllByText(props.title)).toBeDefined();
  expect(screen.getAllByText(props.subtitle)).toBeDefined();

  const icon = screen.getByTestId('icon');
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute('src', iconImg);

  const background = screen.getByTestId('background');
  expect(background).toBeInTheDocument();
  expect(background).toHaveAttribute('src', backgroundImg);

  expect(screen.getByTestId('actions')).toBeInTheDocument();
  expect(screen.getAllByText('No actions')).toBeDefined();
});
