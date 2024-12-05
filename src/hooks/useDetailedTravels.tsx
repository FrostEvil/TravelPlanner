import getDetailedTravel from "@/api/getDetailedTravel";
import getTravels from "@/api/getTravels";
import { TravelsDetails } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

function useDetailedTravels() {
  const { data: travels, refetch: refetchTravels } = useQuery({
    queryKey: ["travels"],
    queryFn: getTravels,
  });

  const detailedTravelsQuery = useQuery({
    queryKey: ["detailedTravels", travels],
    queryFn: async () => {
      if (!travels) return [];

      return await Promise.all(
        travels.map(async (travel) => {
          try {
            const detailedData = await getDetailedTravel(travel.city);
            return detailedData
              ? {
                  ...detailedData,
                  id: travel.id,
                  date: travel.date,
                  isShowingOnMap: false,
                }
              : undefined;
          } catch (error) {
            console.error(`Error fetching details for ${travel.city}`, error);
            return undefined;
          }
        })
      );
    },
    enabled: !!travels,
  });

  return {
    travels,
    detailedTravles: detailedTravelsQuery.data as TravelsDetails[],
    refetchTravels,
  };
}

export default useDetailedTravels;
