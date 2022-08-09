import { render, screen } from '@testing-library/react';
import { UserContextProvider } from './UserContext';
import App from './App';

test('renders home page', () => {
  render(
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );

  expect(screen.getByTestId('header')).toBeInTheDocument();
  expect(screen.getByTestId('homepage')).toBeInTheDocument();
});
