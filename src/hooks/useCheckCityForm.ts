import getGeocodedData from "@/api/getGeocoedData";
import { useQuery } from "@tanstack/react-query";

function useCheckCityForm(checkedCity: string) {
  const { data } = useQuery({
    queryKey: ["geocodedData", checkedCity],
    queryFn: ({ queryKey }) => getGeocodedData(queryKey[1]),
  });

  const isCheckedCityExist = () => {
    if (data?.city === "") {
      return {
        message: "Entered city does not exist ",
      };
    } else {
      return {
        message: "Success",
      };
    }
  };

  return { isCheckedCityExist };
}

export default useCheckCityForm;
