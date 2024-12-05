import "leaflet/dist/leaflet.css";
import curvedLine from "@/utils/curvedLine";
import { useEffect, useMemo } from "react";
import { Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";
import { startLan, startLon } from "@/constants/starterMarkerCoords";
import { TravelsDetails } from "@/types/type";

function TravelsMap({ travelsDetails }: { travelsDetails: TravelsDetails[] }) {
  const map = useMap();
  console.log(travelsDetails);
  const showedTravels: TravelsDetails[] = useMemo(
    () => travelsDetails.filter((travel) => travel.isShowingOnMap),
    [travelsDetails]
  );

  // const geoJsonStyle = useMemo(() => {
  //   return { weight: 3, color: "red" };
  // }, []);

  const geoJsonStyle = { weight: 3, color: "red" };

  const updatedMarkers = useMemo(() => {
    return showedTravels.map((travel) => {
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
          <GeoJSON data={curved} style={geoJsonStyle} />
        </div>
      );
    });
  }, [showedTravels, geoJsonStyle]);

  useEffect(() => {
    if (map && showedTravels.length) {
      const travelCoords = [
        ...showedTravels.map((travel) => [travel.lat, travel.lon]),
        [startLan, startLon],
      ];

      map.fitBounds(travelCoords as LatLngBoundsExpression);
    }
  }, [map, showedTravels]);

  return (
    <div>
      <Marker position={[51.246452, 22.568445]}>
        <Popup>Lublin</Popup>
      </Marker>
      {updatedMarkers}
    </div>
  );
}

export default TravelsMap;
