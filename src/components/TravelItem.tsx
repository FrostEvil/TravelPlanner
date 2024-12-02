import deleteTravel from "@/api/deleteTravel";
// import getDetailedTravel from "@/api/getDetailedTravel";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";
import { toast } from "@/hooks/use-toast";
import { useSidebar } from "./ui/sidebar";
import { DetailedTravelProps } from "@/types/type";

interface TravelItemProps {
  travel: DetailedTravelProps;
  travelsDetails: DetailedTravelProps[];
  setTravelsDetails: React.Dispatch<
    React.SetStateAction<DetailedTravelProps[]>
  >;
}

function TravelItem({
  travel,
  travelsDetails,
  setTravelsDetails,
}: TravelItemProps) {
  // const [isTravelShow, setIsTravelShow] = useState<boolean>(false);
  const {
    open: isSidebarOpen,
    setOpen: setIsSidebarOpen,
    openMobile,
    setOpenMobile,
    isMobile,
  } = useSidebar();
  // const { data: travelDetails } = useQuery({
  //   queryKey: ["travelDetails", city],
  //   queryFn: ({ queryKey }) => getDetailedTravel(queryKey[1]),
  // });
  const handleShowMapTravel = () => {
    if (!travel.isShowingOnMap) {
      const updatedTravels = travelsDetails.map((t) => {
        if (t.id === travel.id) return { ...t, isShowingOnMap: true };

        return { ...t };
      });

      setTravelsDetails(updatedTravels);
      return;
    }
    const updatedTravels = travelsDetails.map((t) => {
      if (t.id === travel.id) return { ...t, isShowingOnMap: false };

      return { ...t };
    });

    setTravelsDetails(updatedTravels);

    //checking if travel is already showing on map
    //   const findIndex = selectedTravelsForMap?.findIndex(
    //     (travel) => travel.city === travelDetails?.city
    //   );
    //   if (travelDetails) {
    //     if (findIndex === -1) {
    //       setSelectedTravelsForMap([...selectedTravelsForMap!, travelDetails]);
    //     } else {
    //       const updatedShowTravelList = selectedTravelsForMap?.filter(
    //         (travel) => travel.city !== travelDetails.city
    //       );
    //       setSelectedTravelsForMap(updatedShowTravelList!);
    //     }
    //   }
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
    // setKey((k) => k + 1);
    // setSelectedTravelsForMap([]);
  };

  const handleShowSidebarTravelDetails = () => {
    // setDetailedTravel(travelDetails);
    isMobile ? setOpenMobile(!openMobile) : setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-8  p-2 my-2 border-b-2 ">
      <div className="flex items-center ">
        <Button
          variant="ghost"
          size="icon"
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
        {travel.isShowingOnMap ? "Hide" : "Show"}
      </Button>
      <Button onClick={handleShowSidebarTravelDetails} size="sm">
        More
      </Button>
    </div>
  );
}

export default TravelItem;
