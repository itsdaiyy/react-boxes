import { apiUpdateStationInfo } from "@/services/apiStations";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateStationInfo() {
  const {
    mutate: updateInfo,
    data: updatedStation,
    error: updatedError,
    isPending: isUpdating,
  } = useMutation({
    mutationFn: (newInfo) => apiUpdateStationInfo(newInfo),
    mutationKey: ["updateStationInfo"],
    onError: () => `error`,
    onSuccess: () => toast.success("更新成功"),
  });

  return { updateInfo, updatedStation, updatedError, isUpdating };
}
