import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const deleteTravel = async (id: string) => {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid travel ID provided");
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/travels/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to delete travel"
      );
    }
    throw new Error("An unexpected error occurred while deleting travel");
  }
};

export default deleteTravel;
