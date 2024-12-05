import { DetailedTravels } from "@/types/type";
import axios from "axios";

const getDetailedTravel = async (
  city: string
): Promise<DetailedTravels | undefined> => {
  try {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?city=${city}&limit=1&apiKey=${process.env.REACT_APP_GEOLOCATION_API_KEY}`
    );

    // Check if there are any features in the response
    const feature = response.data.features?.[0]?.properties;
    if (!feature) {
      console.error("No valid location data found for city:", city);
      return undefined;
    }

    // Destructure the properties
    const {
      city: cityName,
      country,
      lat,
      lon,
      category,
      formatted,
      state,
      timezone,
      place_id,
    } = feature;

    // Return the detailed travel data
    return {
      city: cityName,
      country,
      lat,
      lon,
      category,
      state,
      formatted,
      timezone: timezone?.name,
      offset_time: timezone?.offset_DST,
      id: place_id,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error occurred while fetching travel data:",
        error.message
      );
    } else {
      console.error("An unknown error occurred:", error);
    }
    return undefined; // Return undefined to signal failure
  }
};

export default getDetailedTravel;
