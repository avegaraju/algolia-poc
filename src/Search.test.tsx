import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';

it('shows search input', () => {
  render(<Search />);
  const input = screen.getByPlaceholderText(/search/i);
  expect(input).toBeInTheDocument();
});
