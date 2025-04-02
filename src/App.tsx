import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LoginModal } from './components/LoginModal';
import { TruckMarkers } from './components/TruckMarkers';
import 'leaflet/dist/leaflet.css';
import './App.css';
// In a real app, these would be environment variables
const VALID_USERNAME = (import.meta.env?.VITE_USERNAME as string) || 'jeff';
const VALID_PASSWORD = (import.meta.env?.VITE_PASSWORD as string) || 'thepowerlaw';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user was previously authenticated
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      alert('Invalid credentials');
    }
  };

  // Remove this if we  want to show the login modal
  // if (!isAuthenticated) {
  //   return <LoginModal onLogin={handleLogin} />;
  // }

  return (
    <MapContainer
      bounds={[
        [15.0, -170.0],
        [72.0, -50.0]
      ] as L.LatLngBoundsLiteral}
      style={{ height: "100vh", width: "100vw" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TruckMarkers />
    </MapContainer>
  );
}

export default App;
