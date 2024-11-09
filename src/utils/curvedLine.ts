import { StartEndCoords } from "@/types/type";
import { Feature, GeoJsonProperties, LineString } from "geojson";
import * as turf from "@turf/turf";

const curvedLine = ({
  startLan,
  startLon,
  endLan,
  endLon,
}: StartEndCoords): Feature<LineString, GeoJsonProperties> => {
  const latlng1 = [startLan, startLon];
  const latlng2 = [endLan, endLon];
  const offsetX = latlng2[1] - latlng1[1];
  const offsetY = latlng2[0] - latlng1[0];

  const r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
    theta = Math.atan2(offsetY, offsetX);

  const thetaOffset = 3.14 / 10;

  const r2 = r / 2 / Math.cos(thetaOffset);
  const theta2 = theta + thetaOffset;

  const midpointX = r2 * Math.cos(theta2) + latlng1[1];
  const midpointY = r2 * Math.sin(theta2) + latlng1[0];

  const line = turf.helpers.lineString(
    [
      [startLan, startLon],
      [midpointY, midpointX],
      [endLan, endLon],
    ].map((latLng) => [latLng[1], latLng[0]])
  );

  const curved = turf.bezierSpline(line);

  return curved;
};

export default curvedLine;
