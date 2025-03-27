import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

function Map() {
  const position = [51.505, -0.09];
  const navigate = useNavigate();
  const [positionn, setPosition] = useState(position);
  const { cities } = useCities();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lng, lat]);

  function GetLocation() {
    const map = useMapEvents({
      click(e) {
        map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom());
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      },
    });

    return null;
  }

  function MoveMap({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
  }

  return (
    <div className={styles.mapC}>
      <MapContainer center={positionn} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.lat, city.lng]}>
            <Popup>{city.name}</Popup>
          </Marker>
        ))}
        <GetLocation />
        <MoveMap position={positionn} />
      </MapContainer>
    </div>
  );
}

export default Map;
