import { DetailedTravelProps } from "@/types/type";

interface UptadeShowMapTravelProps {
  selectedTravelsForMap: DetailedTravelProps[] | null;
  setSelectedTravelsForMap: React.Dispatch<
    React.SetStateAction<DetailedTravelProps[] | null>
  >;
  travelDetails: DetailedTravelProps | undefined;
}

const uptadeShowMapTravel = ({
  selectedTravelsForMap,
  setSelectedTravelsForMap,
  travelDetails,
}: UptadeShowMapTravelProps) => {
  const findIndex = selectedTravelsForMap?.findIndex(
    (travel) => travel.city === travelDetails?.city
  );
  if (travelDetails) {
    if (findIndex === -1) {
      setSelectedTravelsForMap([...selectedTravelsForMap!, travelDetails]);
    } else {
      const uptadedShowTravelList = selectedTravelsForMap?.filter(
        (travel) => travel.city !== travelDetails.city
      );
      setSelectedTravelsForMap(uptadedShowTravelList!);
    }
  }
};

export default uptadeShowMapTravel;
