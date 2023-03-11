import React from 'react';

const FriendTile = () => {

  let dummyData = {
    url: 'url',
    username: '@mspaws',
    datestamp: '12.19',
    latestChat: 'hello, hi there'
  }

  return (
    <div>
      FriendTile
      <br />
      {dummyData.url}
      {dummyData.username}
      {dummyData.datestamp}
      {dummyData.latestChat}
    </div>
  )
}

export default FriendTile;