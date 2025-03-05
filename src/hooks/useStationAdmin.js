import { apiGetStationById } from "@/services/apiStations";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useStationAdmin() {
  const queryClient = useQueryClient();
  const {
    user: { id: userId },
  } = queryClient.getQueryData(["member"]);

  console.log(userId);

  const {
    data: station,
    isLoading: isLoadingStation,
    error: stationError,
  } = useQuery({
    queryKey: ["stationAdmin", userId],
    queryFn: () => apiGetStationById(userId, "userId"),
    enabled: !!userId,
  });

  return { station, isLoadingStation, stationError };
}
