import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';

import dynamic from "next/dynamic"



const locationData = [
    { "name": "Location A", "latitude": 37.7749, "longitude": -122.4194 },
    { "name": "Location B", "latitude": 34.0522, "longitude": -118.2437 }
    // Add more locations based on your JSON file
  ];

  
  const FontAwesomeMarker = () => (
    <div style={{ transform: "translate(-50%, -100%)" }}>
      <FontAwesomeIcon icon={faCircleExclamation} style={{ color: 'red', fontSize: '24px' }} />
    </div>
  );
  
  // Use L.divIcon to create a Leaflet icon that uses the custom React component
  const customIcon = L.divIcon({
    className: 'custom-icon', // Custom class for CSS styling if needed
    html: renderToStaticMarkup(<FontAwesomeMarker />),
    iconSize: L.point(30, 30, true), // Size of the icon
  });
  
  
const Map = () => (
    <MapContainer center={[37.7749, -122.4194]} zoom={4} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {locationData.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]} icon ={customIcon}>
            <Popup>{location.name}</Popup>
        </Marker>
    ))}
</MapContainer>

  );

export default Map; 