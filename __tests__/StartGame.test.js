import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
const StartGame = require('../client/StartGame.jsx').default;
const App = require('../client/App.jsx').default;


describe('Rendering StartGame component', () => {

    beforeEach(() => {
        render(<App />)
        const easyButton = screen.getByTestId('easy-button-1');
        userEvent.click(easyButton);
        waitFor(() => screen.getByTestId('start-button-1').toBeInTheDocument());
        userEvent.click(screen.getByTestId('start-button-1'));
        render(<StartGame />);
        waitFor(() => screen.getByTestId('start-game-component').toBeInTheDocument());
        waitFor(() => screen.getByTestId('submit-guess-button-1').toBeInTheDocument());
      })

        xit('Render submit guess button', () => {
        const submitButton = screen.getByTestId('submit-guess-button-1'());
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    })



})
