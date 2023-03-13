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
    //refactor when mongodb database is set up for searching
    if (search === 'tivo') {
      setTileStatus(true)
    }
    if (search !== 'tivo') {
      setTileStatus(false);
    }
  }, [search])

  const submitSearch = (event) => {
    event.preventDefault();

    // axios.post('/searchFriend', {searchQuery: search});
    // after sucessful search, change tileStatus to true

    setSearch(event.target.value);
  }

  const handleSelection = (event) => {
    console.log('handleSelection clicked');
  }

  const userInfo = {
    thumbnailUrl: 'https://hs.sbcounty.gov/cn/Photo%20Gallery/_w/Sample%20Picture%20-%20Koala_jpg.jpg',
    userName: 'tivo',
    friend: false
  }

  return (
    <div>
      <form>
        <input type="text" name="searchQuery" onChange={submitSearch}/>
        <input type="submit" name="search" onClick={submitSearch}/>
      </form>
      {tileStatus ? <SearchTile userInfo={userInfo} handleSelection={handleSelection}/> : null}
    </div>
  )
}