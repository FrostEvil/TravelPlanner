import { TravelProps } from "@/types/type";
import axios from "axios";

const getTravels = async (): Promise<TravelProps[]> => {
  try {
    const response = await axios.get("http://localhost:3000/travels");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getTravels;
