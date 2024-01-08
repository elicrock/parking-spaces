import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './ParkingSpacesMap.css';

const ParkingSpacesMap = ({ parkingSpaces, selectedSpace }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && selectedSpace) {
      const { latitude, longitude } = selectedSpace;
      mapRef.current.setView([latitude, longitude], 16);
    }
  }, [selectedSpace]);

  const handleMarkerMouseOver = event => {
    event.target.openPopup();
  };

  const handleMarkerMouseOut = event => {
    event.target.closePopup();
  };

  return (
    <MapContainer center={[55.751244, 37.618423]} zoom={5} className="parking-spaces__map" ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {parkingSpaces.map(parkingSpace =>
        !selectedSpace || selectedSpace._id === parkingSpace._id ? (
          <Marker
            key={parkingSpace._id}
            position={
              parkingSpace.latitude && parkingSpace.longitude ? [parkingSpace.latitude, parkingSpace.longitude] : [0, 0]
            }
            eventHandlers={{
              mouseover: handleMarkerMouseOver,
              mouseout: handleMarkerMouseOut,
            }}
          >
            <Popup>
              <h3 className="parking-spaces__popup-title">{parkingSpace.name}</h3>
              <span>{parkingSpace.address}</span>
            </Popup>
          </Marker>
        ) : null,
      )}
    </MapContainer>
  );
};

export default ParkingSpacesMap;
