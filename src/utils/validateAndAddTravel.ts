import getGeocodedData from "@/api/getDetailedTravel";
import getTravels from "@/api/getTravels";
import postTravel from "@/api/postTravel";
import { TravelProps } from "@/types/type";

type ValidationResult = {
  status: "success" | "exist" | "error";
  message: string;
};

async function validateAndAddTravel(
  formValues: TravelProps
): Promise<ValidationResult> {
  try {
    // Fetch existing travels
    const existingTravles = await getTravels();

    const travelExists = existingTravles?.some(
      (travel) =>
        travel.city.toLocaleLowerCase() === formValues.city.toLocaleLowerCase()
    );
    if (travelExists) {
      return {
        status: "exist",
        message: `Travel entry for city "${formValues.city}" already exists.`,
      };
    }

    // Fetch geocoded data for the new city
    const newPlaceGeocodedData = await getGeocodedData(formValues.city);
    if (!newPlaceGeocodedData) {
      return {
        status: "error",
        message: `Failed to fetch geocoded data for city "${formValues.city}".`,
      };
    }

    // Add the new travel entry
    const addedTravel = await postTravel(formValues);
    // const createPostMutation = useMutation({
    //   mutationFn: postTravel,
    // });
    // createPostMutation.mutate(formValues);
    console.log(`City "${addedTravel.city}" added with ID: ${addedTravel.id}`);

    return {
      status: "success",
      message: `Travel to "${formValues.city}" successfully added.`,
    };
  } catch (error) {
    console.error("Error in validateAndAddTravel:", error);

    if (error instanceof Error) {
      return {
        status: "error",
        message: `An error occurred: ${error.message}`,
      };
    }

    return {
      status: "error",
      message: "An unexpected error occurred while adding travel.",
    };
  }
}

export default validateAndAddTravel;
