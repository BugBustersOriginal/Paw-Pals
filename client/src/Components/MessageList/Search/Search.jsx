import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SearchTile} from './SearchTile.jsx';

export function Search (props) {

  const [search, setSearch] = useState('');
  const [tileStatus, setTileStatus] = useState(false)
  let userId = props.userId;

  useEffect(() => {
    if (!search) {
      setTileStatus(false);
    }
    //refactor when mongodb database is set up for searching username
    if (search === 'tivo') {
      setTileStatus(true)
    }
    if (search !== 'tivo') {
      setTileStatus(false);
    }
    /////////////
    setTimeout(() => {
      axios.post('/searchFriend', {searchQuery: search});
    }, 500);
  }, [search])

  const submitSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    // after sucessful search, change tileStatus to true
  }

  const handleSelection = (username) => {
    let selectionObj = {
      userId: userId,
      selectedUser: username
    }
    // console.log('selectionObj: ', selectionObj);
    axios.post('/sendFriendRequest', selectionObj)
    .then((result) => {
      console.log('successful friendRequest');
    })
    .catch((err) => {
      console.error(err);
    })
  }


/// sample userInfo
  const userInfo = {
    thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
    userName: 'tivo',
    friend: false
  }


  return (
    <div data-testid="search-component">
      <form>
        <label>
          <input data-testid="search-input" type="text" name="searchQuery" placeholder="Search Friend" onChange={submitSearch}/>
        </label>
      </form>
      {tileStatus ? <SearchTile userId={userId} friendInfo={userInfo} handleSelection={handleSelection}/> : null}
    </div>
  )
}