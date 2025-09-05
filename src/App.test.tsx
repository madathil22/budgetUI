import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders navbar brand', () => {
  render(<App />);
  expect(screen.getByText('Home-Budget')).toBeInTheDocument();
});

