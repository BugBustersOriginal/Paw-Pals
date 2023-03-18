import React, {useState} from 'react';

export function SelectFriend (props) {

  const [select, setSelect] = useState(false)
  const [arrow, setArrow] = useState(false)

  const handleClick = (event) => {
    setSelect(!select);
    setArrow(!arrow);
  }

  return (
    <div class="select-friend-tile" data-testid="search-tile">
      <input type="checkbox" name="select" value="true" onClick={handleClick}/>
      <img class="user-photo-thumbnail" src={props.userInfo.thumbnailUrl}/>
      <p>@{props.userInfo.userName}</p>
      {arrow ? <span class="arrow right" onClick={() => props.handleSelection(props.friendInfo.userName)}></span> : null}
    </div>
  )
}