import { TravelProps } from "@/types/type";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import getGeocodedData from "@/api/getGeocoedData";
import { useContext, useState } from "react";
import { ShowTravelContext } from "@/pages/TravelPlannerPage";
import { IoMdClose } from "react-icons/io";
import deleteTravel from "@/api/deleteTravel";
import { toast } from "@/hooks/use-toast";

function TravelItem({ place, date, id }: TravelProps) {
  const { data: geocodedData } = useQuery({
    queryKey: ["geocodedData", place],
    queryFn: ({ queryKey }) => getGeocodedData(queryKey[1]),
  });
  const {
    shownTravels,
    setShownTravels,
    setKey,
    isTravelDetailsShowing,
    setIsTravelDetailsShowing,
    setDetailedTravel,
  } = useContext(ShowTravelContext);
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleShowMarker = () => {
    setIsShow(!isShow);
    const findIndex = shownTravels?.findIndex(
      (travel) => travel.city === geocodedData?.city
    );
    if (geocodedData) {
      if (findIndex === -1) {
        setShownTravels([...shownTravels!, geocodedData]);
      } else {
        const uptadedShowTravel = shownTravels?.filter(
          (travel) => travel.city !== geocodedData.city
        );
        setShownTravels(uptadedShowTravel!);
      }
    }
  };

  const handleDeleteTravel = (id: string) => {
    deleteTravel(id);
    setKey((k) => k + 1);
    toast({
      description: "You have successfully removed an existing place!",
    });
  };
  const handleShowingTravelDetails = () => {
    setIsTravelDetailsShowing(!isTravelDetailsShowing);
    setDetailedTravel(geocodedData);
  };

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-8 p-2 my-2 border-b-2 ">
      <div className="flex items-center ">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            handleDeleteTravel(id);
          }}
        >
          <IoMdClose />
        </Button>
        <h3 className="font-mono text-xl text-primary ml-2">{place}</h3>
      </div>
      <p className="place-self-end mr-1">{date}</p>
      <Button
        onClick={handleShowMarker}
        size="sm"
        variant={isShow === true ? "hide" : "show"}
      >
        {isShow ? "Hide" : "Show"}
      </Button>
      <Button onClick={handleShowingTravelDetails} size="sm">
        See details
      </Button>
    </div>
  );
}

export default TravelItem;
