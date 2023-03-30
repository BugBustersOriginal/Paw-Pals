import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/react'
import setImmediate from 'setImmediate';
// global.setImmediate = setImmediate;

import {App} from '../client/src/App.jsx';

import {Search} from '../client/src/Components/messageList/Search/Search.jsx';
import {SearchTile} from '../client/src/Components/messageList/Search/SearchTile.jsx';
import { MemoryRouter, Route, Routes, useNavigate, useLocation, withRouter, BrowserRouter } from 'react-router-dom';

const userInfo = {
  thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
  userName: 'tivo',
  friend: false
}

describe('Search Component Test Suite', () => {
  it('Search Component Renders', () => {
    render(      <MemoryRouter>
      <Search />
    </MemoryRouter>)
    expect(screen.getByTestId('search-component')).toBeInTheDocument();
  });

  it('Input text into Search Bar', () => {
    render(<MemoryRouter><Search /></MemoryRouter>)
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: 'tivo' } });
    const query = screen.getByDisplayValue('tivo');
    expect(input.value).toBe('tivo');
  });

  it('Should Render Search Tile', () => {
    render(<SearchTile userInfo={userInfo}/>)
    // const input = screen.getByTestId("search-input");
    // const button = screen.getByTestId("submit-button");
    // fireEvent.change(input, { target: { value: 'tivo' } });
    // const query = screen.getByDisplayValue('tivo');
    // fireEvent.click(button);
    const searchTile = screen.getByTestId("search-tile");
    expect(searchTile).toBeInTheDocument();
  })
});


