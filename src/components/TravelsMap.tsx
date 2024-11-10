import "leaflet/dist/leaflet.css";
import curvedLine from "@/utils/curvedLine";
import { useContext, useEffect } from "react";
import { TravelContext } from "@/pages/TravelPlannerPage";
import { Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";
import { startLan, startLon } from "@/constants/starterMarkerCoords";

function TravelsMap() {
  const { selectedTravelsForMap, key } = useContext(TravelContext);
  const map = useMap();

  const setStyle = () => {
    return { weight: 3, color: "red" };
  };

  let uptadedMarkers = selectedTravelsForMap?.map((travel) => {
    const curved = curvedLine({
      startLan,
      startLon,
      endLan: travel.lat,
      endLon: travel.lon,
    });
    return (
      <div key={travel.id}>
        <Marker position={[travel.lat, travel.lon]}>
          <Popup className="capitalize">{travel.city}</Popup>
        </Marker>
        <GeoJSON data={curved} style={setStyle} />
      </div>
    );
  });

  useEffect(() => {
    uptadedMarkers = [];
  }, []);

  useEffect(() => {
    if (selectedTravelsForMap?.length) {
      const travelCoords: LatLngBoundsExpression = selectedTravelsForMap.map(
        (travel) => {
          return [travel.lat, travel.lon];
        }
      );
      travelCoords.push([startLan, startLon]);
      map.fitBounds(travelCoords);
    }
  }, [selectedTravelsForMap]);

  return (
    <div>
      <Marker position={[51.246452, 22.568445]}>
        <Popup>Lublin</Popup>
      </Marker>
      {selectedTravelsForMap && uptadedMarkers}
    </div>
  );
}

export default TravelsMap;
