import React, {useEffect, useState} from 'react';
import axios from 'axios';

export function Search () {

  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const submitSearch = (event) => {
    console.log('this is the search: ',search);
    event.preventDefault();
    axios.post('/searchFriend', {searchQuery: search});
  }

  return (
    <div>
      <form>
        <input type="text" name="searchQuery" onChange={handleSearch}/>
        <input type="submit" name="search" onClick={submitSearch}/>
      </form>
    </div>
  )
}