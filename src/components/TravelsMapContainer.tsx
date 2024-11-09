import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import TravelsMap from "./TravelsMap";

function TravelsMapContainer() {
  return (
    <div className="h-[700px] w-[700px]">
      <MapContainer
        center={[51.246452, 22.568445]}
        zoom={4}
        zoomControl={false}
        className="h-full w-full rounded-2xl z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TravelsMap />
      </MapContainer>
    </div>
  );
}

export default TravelsMapContainer;
