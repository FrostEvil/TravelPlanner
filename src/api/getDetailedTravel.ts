import axios from "axios";
import { DetailedTravelProps } from "@/types/type";

const getDetailedTravel = async (
  city: string
): Promise<DetailedTravelProps | undefined> => {
  try {
    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?city=${city}&limit=1&apiKey=${process.env.REACT_APP_GEOLOCATION_API_KEY}`
    );
    if (response.data !== undefined) {
      const {
        city,
        country,
        lat,
        lon,
        category,
        formatted,
        state,
        timezone,
        place_id,
      } = response.data.features[0].properties;

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
        id: place_id,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export default getDetailedTravel;
