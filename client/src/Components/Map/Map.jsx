import React, { useState, useEffect } from 'react'
import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';


export function Map() {

  let user = {
    name: 'Thomas',
    location: {lat: 44, lng: -80},
    profileImage: 'https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485565/pngwing.com_1_ka3o33.png'
  }

  let friends = [
    {
      name: 'Andy',
      location: {lat: 44, lng: -79.5},
      profileImage: 'https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485565/pngwing.com_4_hssthb.png'
    },
    {
      name: 'Tony',
      location: {lat: 44, lng: -79},
      profileImage: 'https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485700/pngwing.com_3_ja6dw9.png'
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
      return friend.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setstate({
      query: e.target.value,
      list: results
    })
  }

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
    <h1>Map</h1>
    <form>
      <input type="search" value={state.query} onChange={handleChange} />
    </form>
      <ul>
        {(state.query === '' ? "" : state.list.map(friend => {
          return <li key={friend.name}>{friend.name}</li>
        }))}
      </ul>
      <MapView user={user} friends={friends}/>
    </>
  )
}

function MapView({ user, friends }) {
  const [screenCenter, setScreenCenter] = useState(user.location);

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
            url: user.profileImage
          }}
        />

        {/* generate friends' location */}
        {friends.map((friend, idx) =>
          <Marker key={idx}
          position={friend.location}
          icon={{
            url: friend.profileImage
          }}
        />
        )}
      </GoogleMap>
    </>
  );
}
