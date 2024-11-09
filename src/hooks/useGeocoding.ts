import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const useGeocoding = () => {
  const geocodingApiLoaded = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] =
    useState<google.maps.Geocoder>();
  const [geocodingResult, setGeocodingResult] =
    useState<google.maps.GeocoderResult>();
  const [address, _setAddress] = useState("10 Front St, Toronto");

  useEffect(() => {
    if (!geocodingApiLoaded) return;
    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingApiLoaded]);

  useEffect(() => {
    if (!geocodingService || !address) return;

    geocodingService.geocode({ address }, (results, status) => {
      if (results && status === "OK") {
        console.log(results);
        setGeocodingResult(results[0]);
      }
    });
  }, [geocodingService, address]);

  return geocodingResult;
};

export default useGeocoding;
