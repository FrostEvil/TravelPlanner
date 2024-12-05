import { TravelProps, TravelsDetails } from "@/types/type";
import TravelItem from "./TravelItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import TravelDialog from "./TravelDialog";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import TravelDetails from "./TravelDetails";

type TravelsListProps = {
  travelsDetails: TravelsDetails[];
  setTravelsDetails: React.Dispatch<React.SetStateAction<TravelsDetails[]>>;
  refetchTravels: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TravelProps[], Error>>;
};

function TravelsList({
  travelsDetails,
  setTravelsDetails,
  refetchTravels,
}: TravelsListProps) {
  const [travelDetailsSidebarId, setTravelDetailsSidebarId] =
    useState<string>("");

  const chosenDetailedTravel = travelsDetails.find(
    (travel) => travel.id === travelDetailsSidebarId
  );

  const travelDetailsSection = chosenDetailedTravel ? (
    <TravelDetails travelDetail={chosenDetailedTravel} />
  ) : null;

  const renderedTravels = useMemo(() => {
    return travelsDetails.map((travel) => {
      return (
        <li key={travel.id}>
          <TravelItem
            travel={travel}
            travelsDetails={travelsDetails}
            setTravelsDetails={setTravelsDetails}
            setTravelDetailsSidebarId={setTravelDetailsSidebarId}
            refetchTravels={refetchTravels}
          />
        </li>
      );
    });
  }, [
    travelsDetails,
    setTravelsDetails,
    setTravelDetailsSidebarId,
    refetchTravels,
  ]);

  return (
    <>
      {travelDetailsSection}
      <div className=" mt-6 md:mt-0 flex flex-col justify-between bg-white p-4 rounded-lg ">
        <h2 className="text-lg sm:text-xl font-medium">All your travels:</h2>
        <ScrollArea className="mt-2 h-48  md:h-72 lg:h-80 xl:h-96">
          <ul className="w-full mt-4">{renderedTravels}</ul>
        </ScrollArea>
        <div className="mt-8">
          <TravelDialog refetchTravels={refetchTravels} />
        </div>
      </div>
    </>
  );
}

export default TravelsList;
