import { apiUpdateStationInfo } from "@/services/apiStations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateStationInfo() {
  const queryClient = useQueryClient();

  const {
    mutate: updateStation,
    error: updatedError,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: (newInfo) => apiUpdateStationInfo(newInfo),
    mutationKey: ["updateStationInfo"],
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (station) => {
      toast.success("更新成功");
      queryClient.invalidateQueries({
        queryKey: ["stationAdmin", station.user_id],
      });
    },
  });

  return { updateStation, updatedError, isUpdating };
}
