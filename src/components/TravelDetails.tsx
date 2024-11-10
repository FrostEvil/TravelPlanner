import { DetailedTravelProps } from "@/types/type";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  useSidebar,
} from "./ui/sidebar";
import { IoMdClose } from "react-icons/io";

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
}: DetailedTravelProps) {
  const {
    open: isSidebarOpen,
    setOpen: setIsSidebarOpen,
    openMobile,
    setOpenMobile,
    isMobile,
  } = useSidebar();

  const handleCloseModalByEscape = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      isMobile ? setOpenMobile(!openMobile) : setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleCloseSidebar = () => {
    isMobile ? setOpenMobile(!openMobile) : setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="absolute" onClick={handleCloseSidebar}>
      <Sidebar
        onClick={(e) => {
          e.stopPropagation();
        }}
        side="right"
        className="z-50"
        onKeyUp={handleCloseModalByEscape}
      >
        <SidebarContent>
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
      {(isSidebarOpen || openMobile) && (
        <div className="fixed inset-0 bg-white opacity-80 z-40"></div>
      )}
    </div>
  );
}

export default TravelDetails;
