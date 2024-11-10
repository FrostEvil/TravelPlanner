import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import TravelsMap from "./TravelsMap";

function TravelsMapContainer() {
  return (
    <div className="mb-2 md:mb-0 max-h-[400px] max-w-xl md:max-h-[512px] md:max-w-md lg:max-h-[576px] lg:max-w-xl xl:max-h-[672px] xl:max-w-2xl h-full w-full">
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
