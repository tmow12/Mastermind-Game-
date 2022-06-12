import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
const App = require('../client/App.jsx').default;
//babel transform export default statements to exports.default
//need to include .default when requiring React component 

describe('Render App component', () => {
  
  beforeEach(() => {
    render(<App />);
  })

  it('it renders easy button on component mount', () => {
    expect(screen.getByText('Easy')).toBeInTheDocument();
  })

  it('it renders medium button on component mount', () => {
    expect(screen.getByText('Medium')).toBeInTheDocument();
  })

  it('it renders hard button on component mount', () => {
     expect(screen.getByText('Hard')).toBeInTheDocument();
  })

  it('it should not show the start button on component mount', () => {
    expect(screen.queryByText('Start')).not.toBeInTheDocument();
  })

  it('it should show start button when a difficulty is selected', () => {
    userEvent.click(screen.getByText('Easy'));
    waitFor(() => expect(screen.getByText('Start').toBeInTheDocument()))
  })

})



