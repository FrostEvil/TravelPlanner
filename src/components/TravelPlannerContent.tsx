import TravelsMapContainer from "./TravelsMapContainer";
import TravelsList from "./TravelsList";
import { TravelsDetails } from "@/types/type";
import useDetailedTravels from "@/hooks/useDetailedTravels";
import { useEffect, useState } from "react";

function TravelPlannerContent() {
  const [travelsDetails, setTravelsDetails] = useState<TravelsDetails[]>([]);
  const { detailedTravles, refetchTravels } = useDetailedTravels();

  useEffect(() => {
    setTravelsDetails(detailedTravles);
  }, [detailedTravles]);

  return (
    <>
      {travelsDetails && (
        <section>
          <div className="h-[calc(100vh-64px)] bg-bgImage  bg-center bg-no-repeat bg-cover shadow-inner -z-10 before:absolute before:w-full before:h-screen before:inset-0 before:bg-[#00000044]">
            <div className="container h-full">
              <div className=" gap-4 mx-4 relative flex flex-col md:flex-row justify-around items-center h-full z-20">
                <TravelsList
                  travelsDetails={travelsDetails}
                  setTravelsDetails={setTravelsDetails}
                  refetchTravels={refetchTravels}
                />

                <TravelsMapContainer travelsDetails={travelsDetails} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default TravelPlannerContent;
