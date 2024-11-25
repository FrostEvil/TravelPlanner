import { DetailedTravelProps } from "@/types/type";

interface UpdateShowMapTravelProps {
  selectedTravelsForMap: DetailedTravelProps[] | null;
  setSelectedTravelsForMap: React.Dispatch<
    React.SetStateAction<DetailedTravelProps[] | null>
  >;
  travelDetails: DetailedTravelProps | undefined;
}

const updateShowMapTravel = ({
  selectedTravelsForMap,
  setSelectedTravelsForMap,
  travelDetails,
}: UpdateShowMapTravelProps) => {
  const findIndex = selectedTravelsForMap?.findIndex(
    (travel) => travel.city === travelDetails?.city
  );
  if (travelDetails) {
    if (findIndex === -1) {
      setSelectedTravelsForMap([...selectedTravelsForMap!, travelDetails]);
    } else {
      const updatedShowTravelList = selectedTravelsForMap?.filter(
        (travel) => travel.city !== travelDetails.city
      );
      setSelectedTravelsForMap(updatedShowTravelList!);
    }
  }
};

export default updateShowMapTravel;
