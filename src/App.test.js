import { render, screen } from '@testing-library/react';
import { ContextProvider } from './Context';
import App from './App';

test('renders home page', () => {
  render(
    <ContextProvider>
      <App />
    </ContextProvider>
  );

  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('homepage')).toBeInTheDocument();
});
