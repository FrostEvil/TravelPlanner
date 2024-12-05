import axios from "axios";
import { TravelProps } from "@/types/type";

const postTravel = async (city: TravelProps): Promise<TravelProps> => {
  if (!city || !city.city) {
    throw new Error("Invalid input: City information is required.");
  }

  try {
    const response = await axios.post("http://localhost:3000/travels", city);

    if (response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to post travel: ${
          error.response?.status || "Unknown Status"
        } - ${error.message}`
      );
    }

    throw new Error("An unexpected error occurred while posting travel.");
  }
};

export default postTravel;
