import Header from "@/components/Header";
import TravelsList from "@/components/TravelsList";
import { createContext, useState } from "react";
import { GeocodedData } from "@/types/type";
import TravelsMapContainer from "../components/TravelsMapContainer";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import TravelDetails from "@/components/TravelDetails";

type TravelContextType = {
  shownTravels: GeocodedData[] | null;
  setShownTravels: React.Dispatch<React.SetStateAction<GeocodedData[] | null>>;
  key: number;
  setKey: React.Dispatch<React.SetStateAction<number>>;
  isTravelDetailsShowing: boolean;
  setIsTravelDetailsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailedTravel: React.Dispatch<
    React.SetStateAction<GeocodedData | undefined>
  >;
  // open: boolean;
  // setOpen: (open: boolean) => void;
};

const iTravelContextState = {
  shownTravels: null,
  setShownTravels: () => {},
  key: 0,
  setKey: () => {},
  isTravelDetailsShowing: false,
  setIsTravelDetailsShowing: () => {},
  setDetailedTravel: () => {},
  // open: false,
  // setOpen: () => {},
};

export const ShowTravelContext =
  createContext<TravelContextType>(iTravelContextState);

function TravelPlannerPage() {
  const [shownTravels, setShownTravels] = useState<GeocodedData[] | null>([]);
  const [key, setKey] = useState<number>(0);
  const [isTravelDetailsShowing, setIsTravelDetailsShowing] =
    useState<boolean>(false);
  const [detailedTravel, setDetailedTravel] = useState<GeocodedData>();

  // const handleCloseSidebarByEscape = (e: React.KeyboardEvent<HTMLElement>) => {
  //   console.log(isTravelDetailsShowing);
  //   if (e.key === "Escape") setIsTravelDetailsShowing(false);
  // };

  return (
    <ShowTravelContext.Provider
      value={{
        shownTravels,
        setShownTravels,
        key,
        setKey,
        isTravelDetailsShowing,
        setIsTravelDetailsShowing,
        setDetailedTravel,
      }}
    >
      <Header />
      <section key={key}>
        <div className="w-full h-[calc(100vh-64px)] bg-bgImage  bg-center bg-no-repeat bg-cover shadow-inner -z-10 before:absolute before:w-full before:h-screen before:inset-0 before:bg-[#00000044]">
          <div className="container h-full">
            <div className="relative flex justify-between items-center h-full z-20">
              <TravelsList />
              <TravelsMapContainer />
            </div>
          </div>
        </div>
      </section>
      <section>
        <SidebarProvider className="absolute top-0 h-fit" defaultOpen={false}>
          {/* {detailedTravel && (
            <TravelDetails
              {...{
                ...detailedTravel,
                isTravelDetailsShowing,
                setIsTravelDetailsShowing,
              }}
            />
          )} */}

          <TravelDetails
            {...{
              ...detailedTravel!,
              isTravelDetailsShowing,
              setIsTravelDetailsShowing,
            }}
          />
        </SidebarProvider>
      </section>
    </ShowTravelContext.Provider>
  );
}

export default TravelPlannerPage;
