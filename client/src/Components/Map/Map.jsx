import React, { useState, useEffect } from 'react'
import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export function Map(props) {


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: props.apiKey
  });

  if (!isLoaded) return <div>Loading...</div>
  return (
    <MapView />
  )
}

function MapView() {
  const center = useMemo(() => ({lat: 44, lng: -79.9}), []);
  return (
    <GoogleMap
    zoom={13}
    center={center}
    mapContainerClassName="map-container"
    >
      <Marker
        position={{lat: 44, lng: -80}}
        icon={{
          url: 'https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485565/pngwing.com_1_ka3o33.png'
        }}
      />
      <Marker
        position={{lat: 44, lng: -79.9}}
        icon={{
          url: 'https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485565/pngwing.com_4_hssthb.png'
        }}
      />
      <Marker
        position={{lat: 44, lng: -79.8}}
        icon={{
          url: 'https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485700/pngwing.com_3_ja6dw9.png'
        }}
      />
    </GoogleMap>
  );
}
