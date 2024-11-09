import { GeocodedData } from "@/types/type";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  useSidebar,
} from "./ui/sidebar";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

type TravelDetailsProps = GeocodedData & {
  setIsTravelDetailsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  isTravelDetailsShowing: boolean;
};

function TravelDetails({
  city,
  country,
  lat,
  lon,
  category,
  formatted,
  state,
  timezone,
  offset_time,
  isTravelDetailsShowing,
  setIsTravelDetailsShowing,
}: TravelDetailsProps) {
  const handleCloseSidebar = () => {
    // setIsTravelDetailsShowing(false);
    setOpen(!open);
  };

  // useEffect(() => {
  //   setOpen(false);
  // }, []);

  const { open, setOpen } = useSidebar();
  console.log(open);
  return (
    <>
      <Sidebar side="right" className="z-30">
        <SidebarContent className="relative">
          <SidebarGroup>
            <ul className="mt-10 flex flex-col gap-y-4 w-full px-2 ">
              <li className="font-semibold">City: {city}</li>
              <li>Country: {country}</li>
              <li>Latitude: {lat}</li>
              <li>Longitude: {lon}</li>
              <li>Formatted: {formatted}</li>
              <li>State: {state}</li>
              <li>Category: {category}</li>
              <li>Timezone: {timezone}</li>
              <li>Offset time: {offset_time}</li>
            </ul>
          </SidebarGroup>
          <SidebarMenuButton
            onClick={handleCloseSidebar}
            className="absolute top-1 right-1"
            size="icon"
          >
            <IoMdClose size="2rem" />
          </SidebarMenuButton>
        </SidebarContent>
      </Sidebar>
      {isTravelDetailsShowing && (
        <div className="fixed inset-0 bg-white opacity-80 z-20"></div>
      )}
    </>
  );
}

export default TravelDetails;
