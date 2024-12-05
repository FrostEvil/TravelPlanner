import { StartEndCoords } from "@/types/type";
import { Feature, GeoJsonProperties, LineString } from "geojson";
import * as turf from "@turf/turf";

/**
 * Generates a curved line between two geographical points using bezier spline.
 *
 * @param startLan - Latitude of the start point
 * @param startLon - Longitude of the start point
 * @param endLan - Latitude of the end point
 * @param endLon - Longitude of the end point
 * @returns A GeoJSON Feature of a curved LineString
 */
const curvedLine = ({
  startLan,
  startLon,
  endLan,
  endLon,
}: StartEndCoords): Feature<LineString, GeoJsonProperties> => {
  // Define start and end points
  const startPoint = [startLan, startLon];
  const endPoint = [endLan, endLon];

  // Calculate offsets
  const offsetX = endPoint[1] - startPoint[1];
  const offsetY = endPoint[0] - startPoint[0];

  // Calculate distance and angle
  const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);
  const angle = Math.atan2(offsetY, offsetX);

  // Define curve offset angle (π / 10 radians)
  const CURVE_ANGLE_OFFSET = Math.PI / 10;

  // Calculate midpoint coordinates for the curve
  const adjustedDistance = distance / (2 * Math.cos(CURVE_ANGLE_OFFSET));
  const adjustedAngle = angle + CURVE_ANGLE_OFFSET;
  const midpointLon =
    adjustedDistance * Math.cos(adjustedAngle) + startPoint[1];
  const midpointLat =
    adjustedDistance * Math.sin(adjustedAngle) + startPoint[0];

  // Create the line with midpoint
  const lineCoordinates = [
    [startLon, startLan],
    [midpointLon, midpointLat],
    [endLon, endLan],
  ];

  // Generate a bezier spline for smoothness
  const line = turf.lineString(lineCoordinates);
  const curvedLine = turf.bezierSpline(line);

  return curvedLine;
};

export default curvedLine;
