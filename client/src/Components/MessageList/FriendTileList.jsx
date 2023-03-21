import React from 'react';
import { Search } from './Search/Search.jsx';
import MessageInfo from './MessageInfo.jsx';
import ProfileInfo from './ProfileInfo.jsx';
import FriendTile from './FriendTile.jsx';

const FriendTileList = (props) => {
  //will receive {profileInfo}, {mostRecentMessages} as props

  let profileInfo = [
    {profileIcon: 'profileIcon',
    username: '@SnailLover'},
    {profileIcon: 'profileIcon',
    username: '@OnlyDogsAllowed'},
    {profileIcon: 'profileIcon',
    username: '@puppyHotel'},
    {profileIcon: 'profileIcon',
    username: '@catDad'},
    {profileIcon: 'profileIcon',
    username: '@wolfMom'}
  ]

  let mostRecentMessages = [
    {
      username: '@SnailLover',
    datestamp: 'datestamp',
  message: 'my snails just keep having babies!',
  image: 'imageURL',
  messageNotificationStatus: 'false',
  imageNotificationStatus: 'false'},
  {
    username: '@OnlyDogsAllowed',
  datestamp: 'datestamp',
  message: 'just adoped a rescue! Come visit!',
  image: 'imageURL',
  messageNotificationStatus: 'false',
  imageNotificationStatus: 'false'},
  {
    username: '@puppyHotel',
  datestamp: 'datestamp',
  message: 'fostering puppies, come visit!',
  image: 'imageURL',
  messageNotificationStatus: 'false',
  imageNotificationStatus: 'false'},
  {
    username: '@catDad',
  datestamp: 'datestamp',
  message: 'Henry is turning 15 -- having a party, come over',
  image: 'imageURL',
  messageNotificationStatus: 'false',
  imageNotificationStatus: 'false'},
  {
    username: '@wolfMom',
  datestamp: 'datestamp',
  message: 'my dog just ate his toothbrush....',
  image: 'imageURL',
  messageNotificationStatus: 'false',
  imageNotificationStatus: 'false'}
  ]


  // const profiles = profileInfo.map( (profileObj) => {
  //   console.log(profileObj.profileIcon, 'line 61')
  //   console.log(profileObj.username, 'line 62')
  //   return <div>{profileObj}</div>
  // })

  // const messages = mostRecentMessages.map( (messageObj) => {
  //   console.log(messageObj, 'line 67')
  //   return <div>{messageObj}</div>
  // })

  return (
    <div>
      <Search userFriends={props.userFriends} userInfo={props.userInfo} userId={props.userId}/>
      FriendTileList

      {/* <FriendProfileInfo
        profileIcon = {profiles.profileObj.profileIcon}
        username = {profiles.profileObj.username}
        /> */}

      {/* <FriendTile
        username = {messages.username}
        datestamp = {messages.datestamp}
        message = {messages.message}
        image = {messages.image}
        messageNotificationStatus = {messages.messageNotificationStatus}
        imageNotificationStatus = {messages.imageNotificationStatus}
        /> */}

      {/* {profileInfo.map( (profileObj, index) => <ProfileInfo
      key={index}
      profileIcon = {profileObj.profileIcon}
      username = {profileObj.username}
      />)} */}

      {mostRecentMessages.map( (messageObj, index) => <MessageInfo
      key = {index}
      // profileIcon = {messageObj.profileIcon}
      username = {messageObj.username}
      datestamp = {messageObj.datestamp}
      message = {messageObj.message}
      image = {messageObj.image}
      messageNotificationStatus = {messageObj.messageNotificationStatus}
      imageNotificationStatus = {messageObj.imageNotificationStatus}
       />)}
    </div>
  )
}

export default FriendTileList;