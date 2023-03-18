import React from 'react';

const FriendTile = (props) => {
  // console.log(props, 'line 4 FriendTile')
  // console.log(props)

  return (
    <div>
      <li>
        <ul>{props.profileIcon}</ul>
        <ul>{props.username}</ul>
        <ul>{props.message}</ul>
      </li>

    </div>
  )
}

export default FriendTile;