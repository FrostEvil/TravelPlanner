import { DetailedTravelProps } from "@/types/type";
import TravelItem from "./TravelItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TravelsListProps {
  travelsDetails: DetailedTravelProps[];
  setTravelsDetails: React.Dispatch<
    React.SetStateAction<DetailedTravelProps[]>
  >;
}

function TravelsList({ travelsDetails, setTravelsDetails }: TravelsListProps) {
  const renderedTravels = travelsDetails?.map((travel) => {
    return (
      <li key={travel.id}>
        <TravelItem
          travel={travel}
          travelsDetails={travelsDetails}
          setTravelsDetails={setTravelsDetails}
        />
      </li>
    );
  });

  return (
    <>
      <ScrollArea className="mt-2 md:mt-0 bg-white min-w-64 lg:min-w-80 xl:min-w-96 p-4 rounded-lg h-72 md:h-[480px] lg:h-[530px] xl:h-[580px]">
        <h2 className="text-lg sm:text-xl font-medium">All your travels:</h2>
        <ul className="w-full mt-4">{renderedTravels}</ul>
      </ScrollArea>
    </>
  );
}

export default TravelsList;
