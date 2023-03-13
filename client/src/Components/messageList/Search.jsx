import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SearchTile} from './SearchTile.jsx';

export function Search () {

  const [search, setSearch] = useState('');
  const [tileStatus, setTileStatus] = useState(false)

  useEffect(() => {
    if (search === '') {
      setTileStatus(false);
    }
  }, [search])

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const submitSearch = (event) => {
    console.log('this is the search: ',search);
    event.preventDefault();
    // axios.post('/searchFriend', {searchQuery: search});
    // after sucessful search, change tileStatus to true
    setTileStatus(true);
  }

  const userInfo = {
    thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
    userName: 'tivo_this',
    friend: true
  }

  return (
    <div>
      <form>
        <input type="text" name="searchQuery" onChange={handleSearch}/>
        <input type="submit" name="search" onClick={submitSearch}/>
      </form>
      {tileStatus ? <SearchTile userInfo={userInfo}/> : null}
    </div>
  )
}