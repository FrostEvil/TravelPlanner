import axios from "axios";

const deleteTravel = async (id: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/travels/${id}`);
    return response.data;
  } catch (error) {
    return {
      message: "Something went wrong, travel was not removed.",
    };
  }
};

export default deleteTravel;
