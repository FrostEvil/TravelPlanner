export interface TravelProps {
  id: string;
  place: string;
  date: string;
}

export interface GeocodedData {
  city: string;
  country: string;
  lat: number;
  lon: number;
  category: string;
  formatted: string;
  state: string;
  timezone: string;
  offset_time: string;
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

export type ModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
