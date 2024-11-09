import Header from "@/components/Header";
import TravelsList from "@/components/TravelsList";
import TravelsMapContainer from "../components/TravelsMapContainer";
import TravelDetails from "@/components/TravelDetails";
import { createContext, useState } from "react";
import { DetailedTravelProps } from "@/types/type";
import { SidebarProvider } from "@/components/ui/sidebar";

type TravelContextType = {
  selectedTravelsForMap: DetailedTravelProps[] | null;
  setSelectedTravelsForMap: React.Dispatch<
    React.SetStateAction<DetailedTravelProps[] | null>
  >;
  key: number;
  setKey: React.Dispatch<React.SetStateAction<number>>;
  setDetailedTravel: React.Dispatch<
    React.SetStateAction<DetailedTravelProps | undefined>
  >;
};

const TravelContextState = {
  selectedTravelsForMap: null,
  setSelectedTravelsForMap: () => {},
  key: 0,
  setKey: () => {},
  setDetailedTravel: () => {},
};

export const TravelContext =
  createContext<TravelContextType>(TravelContextState);

function TravelPlannerPage() {
  // Stored travels which its path displayed on map
  const [selectedTravelsForMap, setSelectedTravelsForMap] = useState<
    DetailedTravelProps[] | null
  >([]);
  // Stored detailed info about selected travel - "shows on sidebar after see details button is clicked"
  const [detailedTravel, setDetailedTravel] = useState<DetailedTravelProps>();
  // Hook which cause re render of TravelsList component when a new travel is added
  const [key, setKey] = useState<number>(0);

  return (
    <SidebarProvider defaultOpen={false}>
      {detailedTravel && <TravelDetails {...detailedTravel} />}
      <main className="w-full">
        <TravelContext.Provider
          value={{
            selectedTravelsForMap,
            setSelectedTravelsForMap,
            key,
            setKey,
            setDetailedTravel,
          }}
        >
          <Header />
          <section key={key}>
            <div className="h-[calc(100vh-64px)] bg-bgImage  bg-center bg-no-repeat bg-cover shadow-inner -z-10 before:absolute before:w-full before:h-screen before:inset-0 before:bg-[#00000044]">
              <div className="container h-full">
                <div className="relative flex justify-between items-center h-full z-20">
                  <TravelsList />
                  <TravelsMapContainer />
                </div>
              </div>
            </div>
          </section>
        </TravelContext.Provider>
      </main>
    </SidebarProvider>
  );
}

export default TravelPlannerPage;
