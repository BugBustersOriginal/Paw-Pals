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

  const handleSelection = (userOne, userTwo) => {
    let conversation = [userOne, userTwo]
    console.log('open window for: ', conversation);
    navigate(`/messagewindow`)
  }


  return (
    <div data-testid="search-component">
      <form>
        <label>
          <input data-testid="search-input" type="text" name="searchQuery" placeholder="Search Friend" onChange={submitSearch}/>
        </label>
      </form>
      {searchResult ? <SearchTile searchResult={searchResult} userId={userId} userFriends={props.userFriends} userInfo={props.userInfo} pendingRequests={props.pendingRequests} handleSelection={handleSelection}/> : null }
    </div>
  )
}