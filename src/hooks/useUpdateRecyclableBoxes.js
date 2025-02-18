import { apiUpdateRecyclableBoxes } from "@/services/apiStations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateRecyclableBoxes() {
  const queryClient = useQueryClient();

  const { mutate: updateRecyclableBoxes, isPending: isLoading } = useMutation({
    mutationKey: ["updateRecyclableBoxes"],
    mutationFn: apiUpdateRecyclableBoxes,
    onSuccess: (station) => {
      toast.success(`成功更新「可回收紙箱數量」`);
      queryClient.invalidateQueries({ queryKey: ["station", station.id] });
    },
    onError: () => {
      toast.error(`更新「可回收紙箱數量」失敗`);
    },
  });
  return { updateRecyclableBoxes, isLoading };
}
