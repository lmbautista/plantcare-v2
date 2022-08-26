import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlantcareCard from './index.js';

import { mockPlantcare } from '../../../test_utils';

test('load and render component', () => {
  const plantcare = mockPlantcare();

  render(<PlantcareCard plantcare={plantcare} />);

  expect(screen.getByTestId('actions')).toBeInTheDocument();
  expect(screen.getByTestId('details')).toBeInTheDocument();
  expect(screen.getByTestId('wetstatus')).toBeInTheDocument();

  expect(screen.getAllByText(`Synced at ${plantcare.wet_synced_at}`)).toBeDefined();
  expect(screen.getAllByText(`Planted at ${plantcare.planted_at}`)).toBeDefined();
  expect(screen.getAllByText(`Watered at ${plantcare.watered_at}`)).toBeDefined();
  expect(screen.getAllByText(`Watering at ${plantcare.waterings[0].programmed_at}`)).toBeDefined();

  expect(screen.queryAllByTestId('edit-button')).toBeDefined();
});

test('load and call onEditHandler', () => {
  const plantcare = mockPlantcare();
  const onEditHandler = jest.fn();

  render(<PlantcareCard plantcare={plantcare} onEditHandler={onEditHandler} />);

  expect(screen.getByTestId('edit-button')).toBeInTheDocument();

  const editButton = screen.getByTestId('edit-button');
  fireEvent(editButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

  expect(onEditHandler).toHaveBeenCalledTimes(1);
});

test('load and call onRemoveHandler', () => {
  const plantcare = mockPlantcare();
  const onRemoveHandler = jest.fn();

  render(<PlantcareCard plantcare={plantcare} onRemoveHandler={onRemoveHandler} />);

  expect(screen.getByTestId('remove-button')).toBeInTheDocument();

  const removeButton = screen.getByTestId('remove-button');
  fireEvent(removeButton, new MouseEvent('click', { bubbles: true, cancelable: true }));

  expect(onRemoveHandler).toHaveBeenCalledTimes(1);
});
