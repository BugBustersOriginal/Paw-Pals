import React, {useState} from 'react';

export function SelectFriend (props) {

  const [select, setSelect] = useState(false)
  const [arrow, setArrow] = useState(false)

  const handleClick = (event) => {
    setSelect(!select);
    setArrow(!arrow);
  }

  return (
    <div className="select-friend-tile" data-testid="search-tile">
      <input type="checkbox" name="select" value="true" onClick={handleClick}/>
      <img className="user-photo-thumbnail" src={props.friendInfo.thumbnailUrl}/>
      <p>@{props.friendInfo.userId}</p>
      {arrow ? <span class="arrow right" onClick={() => props.handleSelection(props.friendInfo.userId)}></span> : null}
    </div>
  )
}