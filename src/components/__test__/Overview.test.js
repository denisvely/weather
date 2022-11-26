import { render, screen } from '@testing-library/react';
import Overview from '../../screens/Overview';

test('Check if Loader is in the document', () => {
  render(<Overview />);
  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();
});
