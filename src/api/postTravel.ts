import axios from "axios";
import { TravelProps } from "@/types/type";

type PostTravelProp = {
  postStatus: string;
};

const postTravel = async (city: TravelProps): Promise<PostTravelProp> => {
  try {
    const reponse = await axios.post("http://localhost:3000/travels", city);
    if (reponse.status !== 201) {
      return { postStatus: "Failed" };
    }
    return { postStatus: "Success" };
  } catch (error) {
    throw error;
  }
};

export default postTravel;
