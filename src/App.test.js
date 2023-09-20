import { render, screen } from '@testing-library/react';
import App from './App';

test('renders city name and current weather', async () => {
  render(<App />);
  const loadingText = screen.getByText('Loading..');
  expect(loadingText).toBeInTheDocument();
});
