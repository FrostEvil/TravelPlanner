import { TravelProps } from "@/types/type";
import axios from "axios";

type PostTravel = {
  postStatus: string;
};

const postTravel = async (place: TravelProps): Promise<PostTravel> => {
  try {
    const reponse = await axios.post("http://localhost:3000/travels", place);
    if (reponse.status !== 201) {
      return { postStatus: "Failed" };
    }
    return { postStatus: "Success" };
  } catch (error) {
    throw error;
  }
};

export default postTravel;
