import React, { useState, useEffect } from 'react'
import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

export function Map({ userInfo, userFriends }) {
  const [screenCenter, setScreenCenter] = useState({lat: 0, lng: 0});

  useEffect(() => {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: 90680, key: ''} })
    .then((result) => {
      console.log('user lat/long:', result.data.results[0].geometry.location)
      userInfo.location = result.data.results[0].geometry.location
      setScreenCenter(userInfo.location)
    })
    .catch((err) => {
      console.error(err);
    })
  }, [userInfo])

  // useEffect(() => {
  //   userFriends.forEach((user) => {
  //     // user = {userId: user};
  //   })
  //     // axios.get('/getUserInfo', {params: {userId: userId} })
  //     // .then((result) => {
  //     //   let userInfo = result.data;
  //     //   setUserInfo(userInfo);
  //     //   setUserFriends(userInfo.friends);
  //     //   setPendingRequests(userInfo.sentRequest);
  //     //   setIncomingRequests(userInfo.incomingRequests);
  //     // })
  //     // .catch((err) => {
  //     //   console.error(err);
  //     // })
  // }, [userFriends])

  let friends = [
    {
      userId: 'Andy',
      location: {lat: 44, lng: -79.5},
      thumbnailUrl: 'https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485565/pngwing.com_4_hssthb.png'
    },
    {
      userId: 'Tony',
      location: {lat: 44, lng: -79},
      thumbnailUrl: 'https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485700/pngwing.com_3_ja6dw9.png'
    }
  ]

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB1le7LEHbnuufJ03zPAF2Mh1xlmszRo4U" // restricted key
  });

  const [state, setstate] = useState({
    query: '',
    list: []
  })

  const handleChange = (e) => {
    const results = friends.filter(friend => {
      if (e.target.value === "") return friends
      return friend.userId.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setstate({
      query: e.target.value,
      list: results
    })
    setScreenCenter(state.list[0].location)
  }

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
    <h1>Map</h1>

    {/* search bar */}
    <form>
      <input type="search" value={state.query} onChange={handleChange} />
    </form>

    {/* search result */}
      <ul>
        {(state.query === '' ? "" : state.list.map(friend => {
          return <li key={friend.userId}>{friend.userId}</li>
        }))}
      </ul>

      <MapView screenCenter={screenCenter} setScreenCenter={setScreenCenter} user={userInfo} friends={friends}/>
    </>
  )
}

function MapView({ user, friends, screenCenter, setScreenCenter }) {

  const [selectedCenter, setSelectedCenter] = useState(null);

  return (
    <>
      <GoogleMap
      zoom={10}
      center={user.location}
      mapContainerClassName="map-container"
      >

        {/* generate user's location */}
        <Marker
          position={user.location}
          icon={{
            url: user.thumbnailUrl
          }}
          // label={user.userId}
          onClick={() => {
            setScreenCenter(user.location);
            setSelectedCenter(user);
          }}
        />

        {/* generate friends' location */}
        {friends.map((friend, idx) =>
          <Marker key={idx}
          position={friend.location}
          icon={{
            url: friend.thumbnailUrl
          }}
          onClick={() => {
            setScreenCenter(friend.location);
            setSelectedCenter(friend);
          }}
        />
        )}
        {selectedCenter && (
   <InfoWindow
      onCloseClick={() => {
         setSelectedCenter(null);
      }}
      position={{
         lat: selectedCenter.location.lat,
         lng: selectedCenter.location.lng
      }}
   >
    <div>{selectedCenter.userId}</div>
   </InfoWindow>
)}
      </GoogleMap>
    </>
  );
}
