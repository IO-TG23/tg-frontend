import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

/**
 * @description Based on LeafletJS map component
 * @param {*} props 
 * @returns JSX.Element
 */
function LocationMap({ position, popupMessage }) {
  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{
        height:"300px"
    }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{popupMessage}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default LocationMap;
