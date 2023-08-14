import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders app main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Be the first to know when we launch./i);
  expect(linkElement).toBeInTheDocument();
});
