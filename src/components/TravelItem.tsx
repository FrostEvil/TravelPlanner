import deleteTravel from "@/api/deleteTravel";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";
import { useSidebar } from "./ui/sidebar";
import { TravelProps, TravelsDetails } from "@/types/type";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { handleToast } from "@/utils/handleToast";

interface TravelItemProps {
  travel: TravelsDetails;
  travelsDetails: TravelsDetails[];
  setTravelsDetails: React.Dispatch<React.SetStateAction<TravelsDetails[]>>;
  setTravelDetailsSidebarId: React.Dispatch<React.SetStateAction<string>>;
  refetchTravels: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TravelProps[], Error>>;
}

function TravelItem({
  travel,
  travelsDetails,
  setTravelsDetails,
  setTravelDetailsSidebarId,
  refetchTravels,
}: TravelItemProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const {
    open: isSidebarOpen,
    setOpen: setIsSidebarOpen,
    openMobile,
    setOpenMobile,
    isMobile,
  } = useSidebar();

  const handleShowMapTravel = () => {
    const updatedTravels = travelsDetails.map((t) =>
      t.id === travel.id ? { ...t, isShowingOnMap: !t.isShowingOnMap } : t
    );
    setTravelsDetails(updatedTravels);
  };

  const mutation = useMutation<unknown, Error, string>({
    mutationFn: deleteTravel,
    onSuccess: () => {
      handleToast({
        status: "success",
        message: '"You have successfully removed an existing place!"',
      });
      refetchTravels();
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred.";
      handleToast({ status: "error", message: errorMessage });
    },
    onSettled: () => setIsDeleting(false),
  });

  const handleDeleteTravel = async (id: string) => {
    setIsDeleting(true);
    mutation.mutate(id);
  };

  const toggleSidebar = () => {
    isMobile ? setOpenMobile(!openMobile) : setIsSidebarOpen(!isSidebarOpen);
    setTravelDetailsSidebarId(travel.id);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-8  p-2 my-2 border-b-2 ">
      <div className="flex items-center ">
        <Button
          variant="ghost"
          size="icon"
          disabled={isDeleting}
          onClick={() => {
            handleDeleteTravel(travel.id);
          }}
        >
          <IoMdClose />
        </Button>
        <h3 className="font-mono text-base md:text-xl text-primary ml-2">
          {travel.city}
        </h3>
      </div>
      <p className=" text-sm lg:text-base place-self-end self-center mr-1">
        {travel.date}
      </p>
      <Button
        onClick={handleShowMapTravel}
        size="sm"
        variant={travel.isShowingOnMap === true ? "hide" : "show"}
      >
        {isDeleting ? "Processing..." : travel.isShowingOnMap ? "Hide" : "Show"}
      </Button>
      <Button onClick={toggleSidebar} size="sm">
        More
      </Button>
    </div>
  );
}

export default TravelItem;
