import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { NotificationTile } from './NotificationTile.jsx';

export function Notifications (props) {

const userId = props.userId;
let incomingRequests = props.incomingRequests;

const [friendData, setFriendData] = useState([])
const [savedPhoto, setSavedPhoto] = useState([])
const [requestList, setRequestList] = useState([]);


const getFriendInfo = async (list) => {
  try {
    let photos = [];
    let requestArr = [];

    for (var i = 0; i < list.length; i++) {
      let user = list[i];
      if (user.type === 'saved photo') {
        photos.push(user.friendId);
      } else {
        requestArr.push(user.friendId);
      }
    }

    const requests = list.map(name => axios.post('/searchFriend', {searchQuery: name.friendId}));
    const results = await Promise.all(requests);
    const friendInfo = results.map(result => result.data);
    // console.log("🚀 ~ file: Notifications.jsx:18 ~ getFriendInfo ~ friendInfo:", friendInfo)
    setSavedPhoto(photos);
    setRequestList(requestArr);



    setFriendData(friendInfo);
    // console.log('friendData:', friendData);


  }
  catch (err) {
    console.error(err);
  }
  // let friendList = list;
  // console.log("🚀 ~ file: Notifications.jsx:26 ~ getFriendInfo ~ friendList:", friendList)
  // axios.get('/getNotifications', {params:  [friendList]});
}

const acceptRequest = (friendName) => {
  let acceptObj = {
    userId: userId,
    friendId: friendName
  }

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

const dismissNotification = (friendName) => {
  let dismissObj = {
    userId: userId,
    friendId: friendName
  }
  axios.post('dismissNotification', dismissObj);
}

useEffect(() => {
  props.notificationView()
  getFriendInfo(incomingRequests);

},[incomingRequests]);


  return (
    <div>
      <h4>Notifications</h4>
      {friendData?.map((friend, index) => {
        return (
            <NotificationTile key={index} userId={friend.userId} thumbnailUrl={friend.thumbnailUrl} savedPhoto={savedPhoto} requestList={requestList} acceptRequest={acceptRequest} dismissNotification={dismissNotification} />
          )
      })}
    </div>
  )
}