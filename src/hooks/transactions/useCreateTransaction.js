import { apiCreateTransaction } from "@/services/apiBoxTransactions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateTransaction() {
  // 取得站點資訊
  const queryClient = useQueryClient();
  const station = queryClient.getQueryData(["stationAdmin"]);
  const stationInfo = {
    station_id: station.id,
    station_name_snapshot: station.station_name,
  };

  const {
    mutateAsync: createTransactionAsync,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationKey: ["createTransaction"],
    mutationFn: ({ transaction, memberId }) =>
      apiCreateTransaction({ transaction, stationInfo, memberId }),
    onSuccess: () => {
      toast.success("新增交易成功");
      queryClient.invalidateQueries({
        queryKey: ["boxes-transactions", "admin"],
      });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error(`${err.message}`);
    },
  });

  return { createTransactionAsync, isCreating, createError };
}
