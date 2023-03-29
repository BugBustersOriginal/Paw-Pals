import React, { useState, useEffect } from 'react'
import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

export function Map({ userInfo, userFriends }) {
  const [screenCenter, setScreenCenter] = useState({lat: 0, lng: 0});

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB1le7LEHbnuufJ03zPAF2Mh1xlmszRo4U" // restricted key
  });

  const [state, setstate] = useState({
    query: '',
    list: []
  })

  const handleChange = (e) => {
    const results = userFriends.filter(friend => {
      if (e.target.value === "") return friends
      return friend.userId.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setstate({
      query: e.target.value,
      list: results
    })
    setScreenCenter(state.list[0].location)
  }

  useEffect(() => {
    setScreenCenter(userInfo.location)
  }, [userInfo])

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
    <h1>Map</h1>

    <form>
      <input type="search" value={state.query} onChange={handleChange} />
    </form>

      <ul>
        {(state.query === '' ? "" : state.list.map(friend => {
          return <li key={friend.userId}>{friend.userId}</li>
        }))}
      </ul>

      <MapView screenCenter={screenCenter} setScreenCenter={setScreenCenter} user={userInfo} friends={userFriends} />
    </>
  )
}

function MapView({ user, friends, screenCenter, setScreenCenter }) {
  const [selectedCenter, setSelectedCenter] = useState(null);

  return (
    <>
      <GoogleMap
      zoom={10}
      center={screenCenter}
      mapContainerClassName="map-container"
      >

      {/* generate user's location */}
      <Marker
        position={user.location}
        icon={{
          url: user.thumbnailUrl,
          scaledSize: new google.maps.Size(90, 90)
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
            url: friend.thumbnailUrl,
            scaledSize: new google.maps.Size(90, 90)
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
