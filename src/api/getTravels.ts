import { TravelProps } from "@/types/type";
import axios from "axios";

const getTravels = async (): Promise<TravelProps[]> => {
  try {
    const response = await axios.get<TravelProps[]>(
      "http://localhost:3000/travels"
    );

    // Validate the response data (if needed)
    if (!Array.isArray(response.data)) {
      throw new Error("Unexpected response format: Expected an array.");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch travels: ${
          error.response?.status || "Unknown Status"
        } - ${error.message}`
      );
    }

    throw new Error("An unexpected error occurred while fetching travels.");
  }
};

export default getTravels;
