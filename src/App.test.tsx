import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search input', () => {
  render(<App />);
  const heading = screen.getByText(/Algolia POC Search/i);
  expect(heading).toBeInTheDocument();
  const input = screen.getByPlaceholderText(/search/i);
  expect(input).toBeInTheDocument();
});
