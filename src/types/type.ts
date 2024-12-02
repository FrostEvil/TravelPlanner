export interface TravelProps {
  id: string;
  city: string;
  date: string;
  isShowingOnMap?: boolean;
}

export interface DetailedTravelProps {
  city: string;
  country: string;
  lat: number;
  lon: number;
  category: string;
  formatted: string;
  state: string;
  timezone: string;
  offset_time: string;
  id: string;
  date: string;
  isShowingOnMap: boolean;
}

export interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StartEndCoords {
  startLan: number;
  startLon: number;
  endLan: number;
  endLon: number;
}

export interface formValuesProps {
  city: string;
  travelDate: string;
}

export type setSelectedTravelsForMapProps = React.Dispatch<
  React.SetStateAction<DetailedTravelProps[]>
>;
