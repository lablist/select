import { render, screen } from '@testing-library/react';
import Browse from './Browse';

describe('Browse page component', () => {
  it('should render with success', () => {
    render(<Browse />);

    expect(
      screen.getByRole('heading', {
        name: 'Browse',
        level: 1
      })
    ).toBeInTheDocument();
  });
});
