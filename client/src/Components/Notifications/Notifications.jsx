import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { NotificationTile } from './NotificationTile.jsx';

export function Notifications (props) {
// console.log("🚀 ~ file: Notifications.jsx:4 ~ Notifications ~ props:", props.incomingRequests)

let incomingRequests = props.incomingRequests;
const [friendData, setFriendData] = useState([])
// let friendData = [];
let dummyData = [{
userId: "batman",
thumbnailUrl: "https://pbs.twimg.com/profile_images/874661809139073025/X8yzIhNy_400x400.jpg"}]

const getFriendInfo = (list) => {
  list.forEach( async (name) => {
    try {
      const result = await axios.post('/searchFriend', {searchQuery: name});
      // friendData.push(result.data);
      // console.log("🚀 ~ file: Notifications.jsx:17 ~ incomingRequests.forEach ~ friendData:", friendData)
      let friendInfo = result.data;
      setFriendData(prevState => [...prevState, friendInfo]);
    }
    catch (err) {
      console.error(err);
    }
  });
}

useEffect(() => {

  getFriendInfo(incomingRequests);

},[incomingRequests]);


  return (
    <div>
      {friendData?.map((friend, index) => {
        return (
            <NotificationTile key={index} userId={friend.userId} thumbnailUrl={friend.thumbnailUrl}/>
          )
      })}
    </div>
  )
}