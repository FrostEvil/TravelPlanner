import { useQuery } from "@tanstack/react-query";
import TravelItem from "./TravelItem";
import getTravels from "@/api/getTravels";
import { ScrollArea } from "@/components/ui/scroll-area";
function TravelsList() {
  const { data: travels } = useQuery({
    queryKey: ["travels"],
    queryFn: getTravels,
  });

  const renderedTravels = travels?.map((travel) => {
    return (
      <li key={travel.id}>
        <TravelItem {...travel} />
      </li>
    );
  });

  return (
    <>
      <ScrollArea className="bg-white min-w-96 p-4 rounded-lg h-[550px]">
        <h2 className="text-xl font-medium">All your travels:</h2>
        <ul className="w-full mt-4">{renderedTravels}</ul>
      </ScrollArea>
    </>
  );
}

export default TravelsList;
