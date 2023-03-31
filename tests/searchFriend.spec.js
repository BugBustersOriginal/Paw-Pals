import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/react'
import setImmediate from 'setImmediate';
// global.setImmediate = setImmediate;

import { App } from '../client/src/App.jsx';
import { Search } from '../client/src/Components/messageList/Search/Search.jsx';
import { SearchTile } from '../client/src/Components/messageList/Search/SearchTile.jsx';
import { Notifications } from '../client/src/Components/Notifications/Notifications.jsx';
import { NotificationTile } from '../client/src/Components/Notifications/NotificationTile.jsx';

import { MemoryRouter, Route, Routes, useNavigate, useLocation, withRouter, BrowserRouter } from 'react-router-dom';

jest.mock('axios');

const userInfo = {
  userId: 'tivo',
  thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
  location: '',
  friends: ['superman', 'shadow', 'batman'],
  conversations: [],
  incomingNotifications: [{friendId: 'banjo', type: 'friend request'}, {friendId: 'batman', type: 'saved photo'}],
  sentRequest: []
}

let userId = userInfo.userId;
let userFriends = userInfo.friends;
let incomingRequests = userInfo.incomingNotifications
let pendingRequests = userInfo.sentRequest;
let savedPhoto = ['batman'];
let requestList = ['banjo'];

let searchResult =   {
  userId: 'batman',
  thumbnailUrl: 'https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg',
  location: '',
  friends: ['tivo', 'banjo', 'superman', 'shadow'],
  conversations: [],
  incomingNotifications: [],
  sentRequest: []
  }

  const handleSelection = (userOne, userTwo) => {
    let conversation = [userOne, userTwo]
    navigate(`/messagewindow`,{
      state: {
        users: conversation,
        currentUser: userInfo.userId,
        userTwo: userTwo
      }
    })
  }

  const acceptRequest = (friendName) => {
    let acceptObj = {
      userId: userId,
      friendId: friendName
    }

    axios.post('/acceptRequest', acceptObj)
    .then(() => {
      console.log('accepted friend request');

    })
    .catch((err) => {
      console.error(err);
    })

  }

  const dismissNotification = (friendName) => {
    let dismissObj = {
      userId: userId,
      friendId: friendName
    }
    axios.post('dismissNotification', dismissObj);
  }

describe('Search Component Test Suite', () => {
  it('Search Component Renders', () => {
    render(<MemoryRouter><Search /></MemoryRouter>)
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
    render(<SearchTile userInfo={userInfo} searchResult={searchResult} userId={userId} userFriends={userFriends} incomingRequests={incomingRequests} pendingRequests={pendingRequests} handleSelection={handleSelection} />)
    // const input = screen.getByTestId("search-input");
    // const button = screen.getByTestId("submit-button");
    // fireEvent.change(input, { target: { value: 'tivo' } });
    // const query = screen.getByDisplayValue('tivo');
    const searchTile = screen.getByTestId("search-tile");
    expect(searchTile).toBeInTheDocument();
  })

  it('Should Render Select Friend Tile', () => {
    render(<SearchTile userInfo={userInfo} searchResult={searchResult} userId={userId} userFriends={userFriends} incomingRequests={incomingRequests} pendingRequests={pendingRequests} handleSelection={handleSelection} />)
    const select_friend_tile = screen.getByTestId("select-friend-tile");
    expect(select_friend_tile).toBeInTheDocument();
  })


});

describe('Notification Component Test Suite', () => {
  beforeEach(() => {
    axios.post.mockReset();
  });
  const notificationView = () => {
    // setNotificationBadge(false);
  }

  it ('Notification Component Renders', () => {
    render(<MemoryRouter><Notifications userId={userId} incomingRequests={incomingRequests} notificationView={notificationView} /></MemoryRouter>)
  })

  it ('Notification Tile for "Saved Photo" Renders', () => {
    render(<MemoryRouter><NotificationTile userId={savedPhoto[0]} thumbnailUrl={searchResult.thumbnailUrl} savedPhoto={savedPhoto} requestList={requestList} acceptRequest={acceptRequest} dismissNotification={dismissNotification} /></MemoryRouter>)
    const savedPhoto_notification = screen.getByTestId("notification-tile-savedPhoto");
    expect(savedPhoto_notification).toBeInTheDocument();
  })

  it ('Notification Tile for "Friend Request" Renders', () => {
    render(<MemoryRouter><NotificationTile userId={requestList[0]} thumbnailUrl={searchResult.thumbnailUrl} savedPhoto={savedPhoto} requestList={requestList} acceptRequest={acceptRequest} dismissNotification={dismissNotification} /></MemoryRouter>)
    const friendRequest = screen.getByTestId("notification-tile-friendRequest");
    expect(friendRequest).toBeInTheDocument();
  })

});


