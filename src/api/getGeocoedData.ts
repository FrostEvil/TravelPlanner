import { GeocodedData } from "@/types/type";
import axios from "axios";

const getGeocodedData = async (place: string): Promise<GeocodedData> => {
  try {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?city=${place}&limit=1&apiKey=${process.env.REACT_APP_GEOLOCATION_API_KEY}`
    );
    const { city, country, lat, lon, category, formatted, state, timezone } =
      response.data.features[0].properties;
    return {
      city,
      country,
      lat,
      lon,
      category,
      state,
      formatted,
      timezone: timezone["name"],
      offset_time: timezone["offset_DST"],
    };
  } catch (error) {
    throw error;
  }
};

export default getGeocodedData;
