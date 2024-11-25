import getTravels from "@/api/getTravels";
import TravelItem from "./TravelItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

function TravelsList() {
  const { data: travels } = useQuery({
    queryKey: ["travels"],
    queryFn: getTravels,
    enabled: false,
  });

  console.log(travels);
  // let data = {};

  // (async () => {
  //   data = await getTravels();
  //   console.log(data);
  // })();
  // console.log(travels);

  const renderedTravels = travels?.map((travel) => {
    return (
      <li key={travel.id}>
        <TravelItem {...travel} />
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
