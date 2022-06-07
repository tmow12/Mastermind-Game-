import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
const App = require('../client/App.jsx').default;
//babel transform export default statements to exports.default
//need to include .default when importing React component 

describe('Render App component', () => {
  beforeEach(() => {
    render(<App />);
  })

  test('Render Easy button', () => {
    const easyButton = screen.getByTestId('easy-button-1');
    expect(easyButton).toBeInTheDocument();
    expect(easyButton).toHaveTextContent('Easy');
    expect(easyButton).toBeInTheDocument();
  })

  test('Render Medium button', () => {
    const mediumButton = screen.getByTestId('medium-button-1');
    expect(mediumButton).toBeInTheDocument();
    expect(mediumButton).toHaveTextContent('Medium');
    expect(mediumButton).toBeInTheDocument();
  })

  test('Render Hard button', () => {
    const hardButton = screen.getByTestId('hard-button-1');
    expect(hardButton).toBeInTheDocument();
    expect(hardButton).toHaveTextContent('Hard');
    expect(hardButton).toBeInTheDocument();
  })

  test('Should not show the start button', () => {
    expect(screen.queryByTestId('start-button-1')).not.toBeInTheDocument();
  })

  test('Should show start button when difficulty is selected', () => {
    const easyButton = screen.getByTestId('easy-button-1');
    const mediumButton = screen.getByTestId('medium-button-1');
    const hardButton = screen.getByTestId('hard-button-1');
    userEvent.click(easyButton);
    waitFor(() => expect(screen.getByTestId('start-button-1').toBeInTheDocument()))
    userEvent.click(mediumButton);
    waitFor(() => expect(screen.getByTestId('start-button-1').toBeInTheDocument()))
    userEvent.click(hardButton);
    waitFor(() => expect(screen.getByTestId('start-button-1').toBeInTheDocument()))
  })

})



