import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByText('Mind Board')).toBeInTheDocument();
  });
});
