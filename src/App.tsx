import { MapContainer, TileLayer } from 'react-leaflet';
import { TruckMarkers } from './components/TruckMarkers';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './App.css';

function App() {
  const bounds = [
    [15.0, -170.0],
    [72.0, -50.0]
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
      <TruckMarkers />
    </MapContainer>
  );
}

export default App;
