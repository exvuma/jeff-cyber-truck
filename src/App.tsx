import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MapContainer, TileLayer } from 'react-leaflet';

import './App.css'

function App() {
  // North America bounds approximately
  const bounds = [
    [15.0, -170.0], // Southwest coordinates
    [72.0, -50.0]   // Northeast coordinates
  ];

  return (
    <MapContainer
      bounds={bounds}
      style={{ height: "100vh", width: "100vw" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default App
