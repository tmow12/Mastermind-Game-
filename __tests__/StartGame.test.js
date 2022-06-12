import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
const StartGame = require('../client/StartGame.jsx').default;

global.fetch = jest.fn(() => Promise.resolve({
  text: () => Promise.resolve({
    replace: () => Promise.resolve('1111')
  })
}))

describe('Render StartGame component', () => {

  beforeEach(() => {
    act(() => {
      render(<StartGame difficulty={'Easy'} />);
    })
  })

  it('the component calls fetch once on component mount', () => {
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('it renders a submit guess button on component mount', () => {
    expect(screen.getByText('Submit')).toBeInTheDocument();
  })       
})
