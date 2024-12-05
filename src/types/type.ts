export type TravelProps = {
  id: string;
  city: string;
  date: string;
  isShowingOnMap?: boolean;
};

export type DetailedTravels = {
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
};

export type TravelsDetails = DetailedTravels & {
  date: string;
  isShowingOnMap: boolean;
};

export type ModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StartEndCoords = {
  startLan: number;
  startLon: number;
  endLan: number;
  endLon: number;
};

export type formValuesProps = {
  city: string;
  travelDate: string;
};

export type setSelectedTravelsForMapProps = React.Dispatch<
  React.SetStateAction<DetailedTravels[]>
>;
