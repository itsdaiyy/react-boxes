import { apiGetStationById } from "@/services/apiStations";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useStationAdmin() {
  const queryClient = useQueryClient();
  const member = queryClient.getQueryData(["member"]);

  const userId = member?.user?.id;

  const {
    data: station,
    isLoading: isLoadingStation,
    error: stationError,
  } = useQuery({
    queryKey: ["stationAdmin"],
    queryFn: () => apiGetStationById(userId, "userId"),
    enabled: !!userId,
  });

  return { station, isLoadingStation, stationError };
}
