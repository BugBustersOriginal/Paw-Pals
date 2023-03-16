import React from 'react'
import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export function Map() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey:''
  });

  if (!isLoaded) return <div>Loading...</div>
  return (
    <MapView />
    // <div>Map</div>
  )
}

function MapView() {
  return (
    <GoogleMap
    zoom={10}
    center={{lat: 44, lng: -80}}
    mapContainerClassName="map-container"
    ></GoogleMap>
  );
}
