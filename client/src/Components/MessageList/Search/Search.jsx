import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate, useLocation, withRouter } from 'react-router-dom';
import {SearchTile} from './SearchTile.jsx';

export function Search (props) {

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate();


  let userId = props.userId;
  let userInfo = props.userInfo;
  let userFriends = props.userFriends;
  // let pendingRequests = props.userInfo.sentRequest;

  useEffect(() => {

    setTimeout(() => {
      axios.post('/searchFriend', {searchQuery: search})
      .then((result) => {
        let searchResult = result.data;
        // console.log('search result: ', searchResult);
        setSearchResult(searchResult);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })
    }, 500);
  }, [search])

  const submitSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    // after sucessful search, change tileStatus to true
  }

  const handleSelection = (userOne, userTwo, profileIcon) => {
    let currentUser = userOne;
    let selectedUser = userTwo;
    let conversation = [currentUser, selectedUser]
    navigate(`/messagewindow`,{
      state: {
        users: conversation,
        currentUser: currentUser,
        userTwo: selectedUser,
        userTwoProfileIcon: profileIcon
      }
    })
  }

  // const handleClick = (e) => {
  //   let userOne = userId;
  //   let userTwo = visibleChat.friend.userId;
  //   let participants = [userOne, userTwo]
  //   navigate('/messagewindow', {state: {
  //     users: participants,
  //     currentUser: userOne,
  //     userTwo: userTwo,
  //     userTwoProfileIcon: visibleChat.friend.thumbnailUrl
  //   }})
  // }


  return (
    <div data-testid="search-component">
      <form>
        <label>
          <input data-testid="search-input" type="text" name="searchQuery" placeholder="Search Friend" onChange={submitSearch}/>
        </label>
      </form>
      {searchResult ? <SearchTile searchResult={searchResult} userId={userId} userFriends={props.userFriends} userInfo={props.userInfo} incomingRequests={props.incomingRequests} pendingRequests={props.pendingRequests} handleSelection={handleSelection}/> : null }
    </div>
  )
}