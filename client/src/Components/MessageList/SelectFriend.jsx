import React, {useState} from 'react';

export function SelectFriend (props) {

  const [select, setSelect] = useState(false)

  const handleClick = (event) => {
    setSelect(!select);
  }

  return (
    <div class="select-friend-tile">
      <input type="checkbox" name="select" value="true" onClick={handleClick}/>
      <img class="user-photo-thumbnail" src={props.userInfo.thumbnailUrl}/>
      <p>{props.userInfo.userName}</p>
    </div>
  )
}