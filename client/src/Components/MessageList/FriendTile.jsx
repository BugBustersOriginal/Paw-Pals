import React from 'react';
import { useNavigate } from 'react-router-dom';

const FriendTile = ( {conversation, userId, userInfo} ) => {
  // console.log(conversation.friend, 'line 5 conversation FriendTile')
  // console.log(userId, 'line 6, FriendTile')
  // console.log(conversation.messages, 'line 7')
  // console.log(userInfo.thumbnailUrl, 'line 8')

  if (conversation.messages === undefined) {
    conversation.messages = []
  }
  console.log(conversation.messages, 'line 9 Friendtile')
  console.log(conversation.messages[conversation.messages.length-1].content, 'line 14')
  console.log(conversation.messages[conversation.messages.length-1].createdAt, 'line 15')

  let formattedDate = new Date(conversation.messages[conversation.messages.length-1].createdAt)
  console.log(formattedDate, 'line 18')

  let formattedTime = formattedDate.toLocaleString('en-US', {hour12: true, hour: 'numeric', minute: '2-digit'});
  console.log(formattedTime, 'line 21')



  const navigate = useNavigate();

  const handleClick = (e) => {
    let userOne = userId;
    let userTwo = conversation.friend.userId;
    let participants = [userOne, userTwo]
    navigate('/messagewindow', {state: {
      users: participants,
      currentUser: userOne,
      userTwo: userTwo
    }})
  }

  // function getLastMessageContent(conversation) {
  //   const lastMessage = conversation.messages[conversation.messages.length-1];

  //   if (lastMessage && lastmessage.type === 'image') {
  //     return 'I just sent you a photo!';
  //   } else {
  //     return lastMessage ? lastMessage.content : 'no messages yet';
  //   }
  // }

  return (
    <div className="friend-tile-container" onClick={handleClick}>
      <img className="user-photo-thumbnail" src={conversation.friend.thumbnailUrl}/>
      <div>
        <div className="name-timestamp space-between">
          <div>{conversation.friend.userId}</div>
          <div>{conversation.messages.length > 0? formattedTime : ''}</div>
        </div>
        {/* <div>{getLastMessageContent(conversation)}</div> */}
        <div>{conversation.messages.length > 0 ? (
          conversation.messages[conversation.messages.length-1].type === 'image' ? (
            'I just sent you a photo!'
          ) : (
            conversation.messages[conversation.messages.length-1].content
          )
          ) : (
            'no messages yet'
          )}
          </div>
    </div>
    </div>
  )
}

export default FriendTile;