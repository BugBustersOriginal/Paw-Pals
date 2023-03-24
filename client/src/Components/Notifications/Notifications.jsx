import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { NotificationTile } from './NotificationTile.jsx';

export function Notifications (props) {
// console.log("🚀 ~ file: Notifications.jsx:4 ~ Notifications ~ props:", props.userId)
const userId = props.userId;
let incomingRequests = props.incomingRequests;
console.log("🚀 ~ file: Notifications.jsx:9 ~ Notifications ~ incomingRequests:", incomingRequests)
const [friendData, setFriendData] = useState([])


const getFriendInfo = async (list) => {
  try {
    const requests = list.map(name => axios.post('/searchFriend', {searchQuery: name}));
    const results = await Promise.all(requests);
    const friendInfo = results.map(result => result.data);
    setFriendData(friendInfo);
    console.log("🚀 ~ file: Notifications.jsx:21 ~ getFriendInfo ~ friendData:", friendData)
  }
  catch (err) {
    console.error(err);
  }
}

const acceptRequest = (friendName) => {
  let acceptObj = {
    userId: userId,
    friendId: friendName
  }
  // let index = incomingRequests.indexOf(friendName)
  // let incomingRequests = incomingRequests.slice(index, 1)
  axios.post('/acceptRequest', acceptObj)
  .then(() => {
    console.log('accepted friend request');

// code works but renders tile weird. Will fix later
    // getFriendInfo(incomingRequests);
    // props.rerender();
    // let index = incomingRequests.indexOf(friendName);
    // incomingRequests.splice(index, 1);
    // console.log('incomingRequests: ', incomingRequests);
    // getFriendInfo(incomingRequests);
  })
  .catch((err) => {
    console.error(err);
  })

}

useEffect(() => {
  getFriendInfo(incomingRequests);
},[incomingRequests]);


  return (
    <div>
      <h4>Notifications</h4>
      {friendData?.map((friend, index) => {
        return (
            <NotificationTile key={index} userId={friend.userId} thumbnailUrl={friend.thumbnailUrl} acceptRequest={acceptRequest} />
          )
      })}
    </div>
  )
}