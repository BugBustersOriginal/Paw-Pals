import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 33.80421371292495, lng: -117.99600029783456 },
  });

  const locations = [
    {
      lat: 33.80421371292495,
      lng: -117.99600029783456,
      icon: "https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485565/pngwing.com_4_hssthb.png",
    },
    {
      lat: 33.894377805345435,
      lng: -117.87114238988885,
      icon: "https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485700/pngwing.com_3_ja6dw9.png",
    },
    {
      lat: 34.06103499718833,
      lng: -117.18623527454041,
      icon: "https://res.cloudinary.com/ddu3bzkvr/image/upload/v1678485565/pngwing.com_1_ka3o33.png",
    },
  ];

  for (let i = 0; i < locations.length; i++) {
    const marker = new google.maps.Marker({
      position: { lat: locations[i].lat, lng: locations[i].lng },
      map,
      icon: locations[i].icon,
    });
  }
}

window.initMap = initMap;


export function Map() {
  return (
    <div>
      <h1>Map</h1>
    </div>
  )
}