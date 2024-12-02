import "leaflet/dist/leaflet.css";
import curvedLine from "@/utils/curvedLine";
import { useEffect, useMemo } from "react";
import { Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";
import { startLan, startLon } from "@/constants/starterMarkerCoords";
import { DetailedTravelProps } from "@/types/type";

function TravelsMap({
  travelsDetails,
}: {
  travelsDetails: DetailedTravelProps[];
}) {
  const map = useMap();
  const setStyle = () => {
    return { weight: 3, color: "red" };
  };
  const showedTravels: DetailedTravelProps[] = useMemo(() => {
    return travelsDetails.filter((travel) => travel.isShowingOnMap);
  }, [travelsDetails]);

  let uptadedMarkers = showedTravels?.map((travel) => {
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
  //   const memoizedValue = useMemo(() => {
  //     // Your expensive computation or transformation logic here
  //     travelsDetails?.map((travel) => {
  //       const curved = curvedLine({
  //         startLan,
  //         startLon,
  //         endLan: travel.lat,
  //         endLon: travel.lon,
  //       });
  //       return (
  //         <div key={travel.id}>
  //           {!travel.isShowingOnMap && (
  //             <>
  //               <Marker position={[travel.lat, travel.lon]}>
  //                 <Popup className="capitalize">{travel.city}</Popup>
  //               </Marker>
  //               <GeoJSON data={curved} style={setStyle} />
  //             </>
  //           )}
  //         </div>
  //       );
  //     });
  //   }, [travelsDetails]);

  //   useEffect(() => {
  //     uptadedMarkers = [];
  //   }, []);

  useEffect(() => {
    if (showedTravels?.length) {
      const travelCoords: LatLngBoundsExpression = showedTravels.map(
        (travel) => {
          return [travel.lat, travel.lon];
        }
      );
      travelCoords.push([startLan, startLon]);
      map.fitBounds(travelCoords);
    }
  }, [showedTravels]);

  return (
    <div>
      <Marker position={[51.246452, 22.568445]}>
        <Popup>Lublin</Popup>
      </Marker>
      {travelsDetails && uptadedMarkers}
    </div>
  );
}

export default TravelsMap;
