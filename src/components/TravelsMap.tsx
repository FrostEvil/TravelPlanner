import "leaflet/dist/leaflet.css";
import { useContext, useEffect } from "react";
import { ShowTravelContext } from "@/pages/TravelPlannerPage";
import { Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import curvedLine from "@/utils/curvedLine";
import { LatLngBoundsExpression } from "leaflet";
import { startLan, startLon } from "@/constants/starterMarkerCoords";

function TravelsMap() {
  const { shownTravels } = useContext(ShowTravelContext);
  const map = useMap();
  const setStyle = () => {
    return { weight: 3, color: "red" };
  };

  let uptadedMarkers = shownTravels?.map((travel) => {
    const curved = curvedLine({
      startLan,
      startLon,
      endLan: travel.lat,
      endLon: travel.lon,
    });
    return (
      <div key={travel.city}>
        <Marker position={[travel.lat, travel.lon]}>
          <Popup className="capitalize">{travel.city}</Popup>
        </Marker>
        <GeoJSON data={curved} style={setStyle} />
      </div>
    );
  });

  useEffect(() => {
    if (shownTravels?.length) {
      const b: LatLngBoundsExpression = shownTravels.map((travel) => {
        return [travel.lat, travel.lon];
      });
      b.push([startLan, startLon]);
      map.fitBounds(b);
    }
  }, [shownTravels]);

  return (
    <div>
      <Marker position={[51.246452, 22.568445]}>
        <Popup>Lublin</Popup>
      </Marker>
      {shownTravels && uptadedMarkers}
    </div>
  );
}

export default TravelsMap;
