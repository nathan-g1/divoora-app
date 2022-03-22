import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Nav from '../components/nav';
import LandingPage from '../views/landingPage';
import divoora from '../images/divoora.png';

// cleanup after each test
afterEach(() => {
  cleanup();
});

test('renders Landing page', () => {
  render(<LandingPage />);
  const linkElement = screen.getByText(/Login to App/i);
  expect(linkElement).toBeInTheDocument();
});

test('Displays log', () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </RecoilRoot>
  );
  const linkElement = screen.getByAltText(/Divoora Logo/i);
  expect(linkElement).toHaveAttribute('src', divoora);
});

test('Navigating back to landing page works', () => {
  render(
    <RecoilRoot>
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    </RecoilRoot>
  );
  const linkElement = screen.getByAltText(/Divoora Logo/i);
  fireEvent.click(linkElement);
  expect(window.location.href).toContain('/search');
});
