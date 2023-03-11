import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SearchTile} from './SearchTile.jsx';

export function Search () {

  const [search, setSearch] = useState('');
  const [tileStatus, setTileStatus] = useState(false)

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

  return (
    <div>
      <form>
        <input type="text" name="searchQuery" onChange={handleSearch}/>
        <input type="submit" name="search" onClick={submitSearch}/>
      </form>
      {tileStatus ? <SearchTile /> : null}
    </div>
  )
}