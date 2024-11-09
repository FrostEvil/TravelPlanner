import getGeocodedData from "@/api/getDetailedTravel";
import postTravel from "@/api/postTravel";
import { TravelProps } from "@/types/type";

async function validateAndAddTravel(formValues: TravelProps) {
  const newPlaceGeocodedData = await getGeocodedData(formValues.city);
  if (newPlaceGeocodedData) {
    const { postStatus } = await postTravel(formValues);
    return postStatus;
  }
}

export default validateAndAddTravel;
