import { apiUpdateMember } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateMember() {
  const queryClient = useQueryClient();

  const {
    mutate: updateMember,
    error: updateMemberError,
    isPending: isUpdating,
  } = useMutation({
    mutationKey: ["updateMember"],
    mutationFn: apiUpdateMember,
    onError: (error) => {
      console.error(error.message);
      toast.error(`更新資料失敗`);
    },
    onSuccess: () => {
      toast.success("更新成功");
      queryClient.invalidateQueries({
        queryKey: ["member"],
      });
    },
  });

  return { updateMember, updateMemberError, isUpdating };
}
