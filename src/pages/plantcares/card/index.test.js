import React from 'react';
import { render, screen } from '@testing-library/react';
import PlantcareCard from './index.js';

import { mockPlantcare } from '../../../utils';

test('load and render component', () => {
  const plantcare = mockPlantcare();

  render(<PlantcareCard plantcare={plantcare} />);

  expect(screen.getByTestId('actions')).toBeInTheDocument();
  expect(screen.getByTestId('details')).toBeInTheDocument();
  expect(screen.getByTestId('wetstatus')).toBeInTheDocument();

  expect(screen.getAllByText(`Synced at ${plantcare.wetSyncedAt}`)).toBeDefined();
  expect(screen.getAllByText(`Planted at ${plantcare.plantedAt}`)).toBeDefined();
  expect(screen.getAllByText(`Watered at ${plantcare.wateredAt}`)).toBeDefined();
  expect(screen.getAllByText(`Watering at ${plantcare.scheduledAt}`)).toBeDefined();
});
