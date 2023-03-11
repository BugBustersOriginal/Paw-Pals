import React, {useEffect, useState} from 'react';

export function Search () {

  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log('this is the search: ',search);
  }

  return (
    <div>
      <form>
        <input type="text" name="searchQuery" onChange={handleSearch}/>
        <input type="submit" name="submit" />
      </form>
    </div>
  )
}