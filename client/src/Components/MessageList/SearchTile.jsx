import React from 'react';

export function SearchTile (props) {

  return (
    <div>
      {props.userInfo.friend ? <img src=""/> : <img class="friendRequestIcon" src="https://cdn-icons-png.flaticon.com/512/4458/4458569.png"/>}
      <img width="90px" height="80px" src={props.userInfo.thumbnailUrl}/>
      <p>{props.userInfo.userName}</p>
    </div>
  )

}