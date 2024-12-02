import { useEffect, useState } from "react";
import TravelsMapContainer from "./TravelsMapContainer";
import { useQuery } from "@tanstack/react-query";
import getTravels from "@/api/getTravels";
import TravelsList from "./TravelsList";
import { DetailedTravelProps } from "@/types/type";
import getDetailedTravel from "@/api/getDetailedTravel";

function TravelPlannerContent() {
  const [travelsDetails, setTravelsDetails] = useState<DetailedTravelProps[]>(
    []
  );

  const { data: travels, refetch } = useQuery({
    queryKey: ["travels"],
    queryFn: getTravels,
  });

  useEffect(() => {
    if (travels) {
      const fetchDetailedTravels = async () => {
        const detailedTravelsData = await Promise.all(
          travels.map(async (travel) => {
            try {
              const detailedData = await getDetailedTravel(travel.city);
              return detailedData
                ? {
                    ...detailedData,
                    date: travel.date,
                    isShowingOnMap: false,
                  }
                : undefined;
            } catch (error) {
              console.error(
                `Error fetching details for ${travel.city}:`,
                error
              );
              return undefined; // Handle failed requests gracefully
            }
          })
        );
        const validTravels = detailedTravelsData.filter(
          (data): data is DetailedTravelProps => data !== undefined
        );
        setTravelsDetails(validTravels);
      };
      fetchDetailedTravels();
    }
    refetch();
  }, [travels]);
  console.log("travels", travelsDetails);
  return (
    <section>
      <div className="h-[calc(100vh-64px)] bg-bgImage  bg-center bg-no-repeat bg-cover shadow-inner -z-10 before:absolute before:w-full before:h-screen before:inset-0 before:bg-[#00000044]">
        <div className="container h-full">
          <div className=" gap-4 mx-4 relative flex flex-col md:flex-row justify-around items-center h-full z-20">
            {travels && (
              <TravelsList
                travelsDetails={travelsDetails}
                setTravelsDetails={setTravelsDetails}
              />
            )}
            <TravelsMapContainer travelsDetails={travelsDetails} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelPlannerContent;
