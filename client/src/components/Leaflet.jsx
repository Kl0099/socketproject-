import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";

const Leaflet = ({
  setlangitude,
  setlatitude,
  array,
  currentlangitude,
  currentlatitude,
}) => {
  const MapClickHandler = () => {
    useMapEvent({
      click: (e) => {
        console.log(e.latlng.lat, e.latlng.lng);
        setlatitude(e.latlng.lat);
        setlangitude(e.latlng.lng);
      },
    });

    return null;
  };
  useEffect(() => {
    console.log("loaded");
  }, []);
  return (
    <div style={{ width: "100%", height: "800px" }}>
      <MapContainer
        center={[23.0260736, 72.5745664]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <MapClickHandler />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[currentlatitude, currentlangitude]}>
          <Popup closeOnClick={true}>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {array.map((item, index) => {
          return (
            // latitude
            // longitude
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
            >
              <Popup closeOnClick={true}>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Leaflet;
