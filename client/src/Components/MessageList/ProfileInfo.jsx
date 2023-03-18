import React from 'react';

const ProfileInfo = (props) => {
  // console.log(props, 'line 4 ProfileInfo');

  return (
    <div>
      <li>
        <ul>{props.profileIcon}</ul>
        <ul>{props.username}</ul>
      </li>
    </div>
  )

}

export default ProfileInfo;