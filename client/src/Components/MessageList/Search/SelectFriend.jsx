import React, {useState} from 'react';

export function SelectFriend (props) {

  const [select, setSelect] = useState(false)
  const [arrow, setArrow] = useState(false)
  let userId = props.userId;

  const handleClick = (event) => {
    setSelect(!select);
    setArrow(!arrow);
  }

  return (
    <div className="select-friend-tile" data-testid="search-tile">
      <input type="checkbox" name="select" value="true" onClick={handleClick}/>
      <img className="user-photo-thumbnail" src={props.friendInfo.thumbnailUrl}/>
      <p>@{props.friendInfo.userId}</p>
      {/* {arrow ? <span className="arrow right" onClick={() => props.handleSelection(userId, props.friendInfo.userId)}></span> : null} */}
      {arrow ? <img className="arrow-icon" src="https://cdn-icons-png.flaticon.com/512/9333/9333991.png" onClick={() => props.handleSelection(userId, props.friendInfo.userId)}/> : null}
    </div>
  )
}