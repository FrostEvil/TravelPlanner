import getGeocodedData from "@/api/getDetailedTravel";
import getTravels from "@/api/getTravels";
import postTravel from "@/api/postTravel";
import { TravelProps } from "@/types/type";

async function validateAndAddTravel(formValues: TravelProps) {
  const existingTravles = await getTravels();
  const find = existingTravles?.find(
    (travel) => travel.city === formValues.city
  );
  if (find) {
    const postStatus = "exist";
    return postStatus;
  }
  const newPlaceGeocodedData = await getGeocodedData(formValues.city);
  if (newPlaceGeocodedData) {
    const { postStatus } = await postTravel(formValues);
    return postStatus;
  }
}

export default validateAndAddTravel;
