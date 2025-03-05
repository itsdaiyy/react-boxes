import { apiUpdateAvailableSlots } from "@/services/apiStations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateAvailableSlots() {
  const queryClient = useQueryClient();

  const { mutate: updateAvailableSlots, isPending: isLoading } = useMutation({
    mutationKey: ["updateAvailableSlots"],
    mutationFn: apiUpdateAvailableSlots,
    onSuccess: (station) => {
      toast.success(`成功更新「可回收紙箱數量」`);
      queryClient.invalidateQueries({
        queryKey: ["stationAdmin", station.user_id],
      });
    },
    onError: () => {
      toast.error(`更新「可回收紙箱數量」失敗`);
    },
  });
  return { updateAvailableSlots, isLoading };
}
