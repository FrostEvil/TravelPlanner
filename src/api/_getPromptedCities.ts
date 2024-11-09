import { PromptedCity } from "@/types/type";
import axios from "axios";
const getPromptedCities = async (
  citySearching: string
): Promise<PromptedCity[]> => {
  const cities: PromptedCity[] = [];
  try {
    if (citySearching) {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?city=Warsaw&limit=3&&apiKey=${process.env.REACT_APP_GEOLOCATION_API_KEY}`
      );
      console.log(response.data.features);
      for (let i = 0; i < response.data.features.length; i++) {
        cities.push({
          city: response.data.features[i].properties.city,
          state: response.data.features[i].properties.state,
          country: response.data.features[i].properties.state,
          id: response.data.features[i].properties["place_id"],
        });
      }
    }
    console.log(cities);
    return cities;
  } catch (error) {
    throw error;
  }
};

export default getPromptedCities;
