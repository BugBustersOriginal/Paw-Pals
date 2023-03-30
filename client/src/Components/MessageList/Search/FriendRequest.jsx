import React, {useState, useEffect} from 'react';
import axios from 'axios';

export function FriendRequest (props) {
// console.log("🚀 ~ file: FriendRequest.jsx:5 ~ FriendRequest ~ sentRequest:", props.pendingRequests)

  const [requestSent, setRequestSent] = useState(false);
  let pendingRequests = props.pendingRequests;

  useEffect(() => {
    if (pendingRequests) {
      if(pendingRequests.indexOf(props.friendInfo.userId) !== -1) {
        setRequestSent(true);
      }
    }
  })

  useEffect(() => {

  }, [requestSent])

  const handleFriendRequest = (event) => {
    //make an axios call to send a friend request
    let selectionObj = {
      userId: props.userId,
      selectedUser: props.friendInfo.userId
    }

    console.log('selectionObj: ', selectionObj);
    axios.post('/sendFriendRequest', selectionObj)
    .then((result) => {
      console.log('successful friendRequest');
      setRequestSent(true);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  return (
    <div className="friend-request-tile" data-testid="search-tile">
      {requestSent ?
      <img className="friend-request-icon" src="https://cdn-icons-png.flaticon.com/512/3602/3602500.png"/> :
      <img className="friend-request-icon" src="https://cdn-icons-png.flaticon.com/512/4458/4458569.png" onClick={handleFriendRequest}/>}
      <img className="user-photo-thumbnail" src={props.friendInfo.thumbnailUrl}/>
      <p>@{props.friendInfo.userId}</p>
    </div>
  )
}