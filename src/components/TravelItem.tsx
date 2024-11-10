import deleteTravel from "@/api/deleteTravel";
import getDetailedTravel from "@/api/getDetailedTravel";
import { TravelProps } from "@/types/type";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { TravelContext } from "@/pages/TravelPlannerPage";
import { IoMdClose } from "react-icons/io";
import { toast } from "@/hooks/use-toast";
import { useSidebar } from "./ui/sidebar";

function TravelItem({ city, date, id }: TravelProps) {
  const [isTravelShow, setIsTravelShow] = useState<boolean>(false);
  const {
    open: isSidebarOpen,
    setOpen: setIsSidebarOpen,
    openMobile,
    setOpenMobile,
    isMobile,
  } = useSidebar();

  const { data: travelDetails } = useQuery({
    queryKey: ["travelDetails", city],
    queryFn: ({ queryKey }) => getDetailedTravel(queryKey[1]),
  });

  const {
    selectedTravelsForMap,
    setSelectedTravelsForMap,
    setKey,
    setDetailedTravel,
  } = useContext(TravelContext);

  const handleShowMapTravel = () => {
    setIsTravelShow(!isTravelShow);

    //checking if travel is already showing on map
    const findIndex = selectedTravelsForMap?.findIndex(
      (travel) => travel.city === travelDetails?.city
    );
    if (travelDetails) {
      if (findIndex === -1) {
        setSelectedTravelsForMap([...selectedTravelsForMap!, travelDetails]);
      } else {
        const uptadedShowTravelList = selectedTravelsForMap?.filter(
          (travel) => travel.city !== travelDetails.city
        );
        setSelectedTravelsForMap(uptadedShowTravelList!);
      }
    }
  };

  const handleDeleteTravel = async (id: string) => {
    const response = await deleteTravel(id);
    if (response) {
      toast({
        description: "You have successfully removed an existing place!",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Something went wrong... Try again.",
      });
    }
    setKey((k) => k + 1);
    setSelectedTravelsForMap([]);
  };

  const handleShowSidebarTravelDetails = () => {
    setDetailedTravel(travelDetails);
    isMobile ? setOpenMobile(!openMobile) : setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-8  p-2 my-2 border-b-2 ">
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
        <h3 className="font-mono text-base md:text-xl text-primary ml-2">
          {city}
        </h3>
      </div>
      <p className=" text-sm lg:text-base place-self-end self-center mr-1">
        {date}
      </p>
      <Button
        onClick={handleShowMapTravel}
        size="sm"
        variant={isTravelShow === true ? "hide" : "show"}
      >
        {isTravelShow ? "Hide" : "Show"}
      </Button>
      <Button onClick={handleShowSidebarTravelDetails} size="sm">
        More
      </Button>
    </div>
  );
}

export default TravelItem;
