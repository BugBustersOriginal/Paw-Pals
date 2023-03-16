import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/react'

import {App} from '../client/src/App.jsx';
import {Search} from '../client/src/Components/messageList/Search/Search.jsx';

describe('Search Component Test Suite', () => {
  it('Search Component Renders', () => {
    render(<App />)
    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
  });
});

