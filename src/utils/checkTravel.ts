import getGeocodedData from "@/api/getGeocoedData";
import postTravel from "@/api/postTravel";
import { TravelProps } from "@/types/type";

async function checkTravel(formValues: TravelProps) {
  const newPlaceGeocodedData = await getGeocodedData(formValues.place);

  if (newPlaceGeocodedData) {
    const { postStatus } = await postTravel(formValues);
    return postStatus;
  }
}

export default checkTravel;
