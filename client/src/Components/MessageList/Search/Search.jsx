import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SearchTile} from './SearchTile.jsx';

export function Search () {

  const [search, setSearch] = useState('');
  const [tileStatus, setTileStatus] = useState(false)

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
    console.log('username selected: ', username);
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
          <input data-testid="search-input" type="text" name="searchQuery" onChange={() => submitSearch}/>
          {/* <button data-testid="submit-button" type="submit" name="search" onClick={() => submitSearch}>Search</button> */}
        </label>
      </form>
      {tileStatus ? <SearchTile userInfo={userInfo} handleSelection={handleSelection}/> : null}
    </div>
  )
}