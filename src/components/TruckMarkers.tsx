import { useEffect, useState } from 'react';
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Marker } from 'react-leaflet';

// Fix for default icon markers
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix missing icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

const truckIcon = new Icon({
    iconUrl: '/cybertruck-icon.png',  // This will look for the image in the public folder
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
});

interface PopulationCenter {
    lat: number;
    lng: number;
    weight: number;
    name: string;
}

const TRUCK_COUNT = 40000;

// Major population centers with rough weights
const POPULATION_CENTERS: PopulationCenter[] = [
    { lat: 40.7128, lng: -74.0060, weight: 0.15, name: 'New York' },
    { lat: 34.0522, lng: -118.2437, weight: 0.12, name: 'Los Angeles' },
    { lat: 41.8781, lng: -87.6298, weight: 0.08, name: 'Chicago' },
    { lat: 43.6532, lng: -79.3832, weight: 0.07, name: 'Toronto' },
    { lat: 49.2827, lng: -123.1207, weight: 0.05, name: 'Vancouver' },
    { lat: 45.5017, lng: -73.5673, weight: 0.05, name: 'Montreal' },
    // Add more cities as needed
];

const generateRandomPoint = (center: PopulationCenter, maxDistance: number) => {
    const r = maxDistance * Math.sqrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;

    const lat = center.lat + r * Math.cos(theta);
    const lng = center.lng + r * Math.sin(theta);

    return { lat, lng };
};

const generateTruckLocations = () => {
    const locations = [];

    for (let i = 0; i < TRUCK_COUNT; i++) {
        // Select a population center based on weights
        const random = Math.random();
        let accumWeight = 0;
        let selectedCenter = POPULATION_CENTERS[0];

        for (const center of POPULATION_CENTERS) {
            accumWeight += center.weight;
            if (random <= accumWeight) {
                selectedCenter = center;
                break;
            }
        }

        // Generate point within max 500km of center (adjust as needed)
        const point = generateRandomPoint(selectedCenter, 5);

        // Ensure point is within US/Canada bounds
        if (point.lat >= 25 && point.lat <= 60 &&
            point.lng >= -140 && point.lng <= -50) {
            locations.push(point);
        }
    }

    return locations;
};

export const TruckMarkers = () => {
    const [markers, setMarkers] = useState<Array<{ lat: number, lng: number }>>([]);

    useEffect(() => {
        setMarkers(generateTruckLocations());
    }, []);

    return (
        <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50}
            spiderfyOnMaxZoom={false}
            disableClusteringAtZoom={19}
        >
            {markers.map((position, idx) => (
                <Marker
                    key={`truck-${idx}`}
                    position={[position.lat, position.lng]}
                    icon={truckIcon}
                />
            ))}
        </MarkerClusterGroup>
    );
}; 