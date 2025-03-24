import { apiStationSignup } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useStationSignup() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData(["member"]);

  const { mutateAsync: createStationAsync, isPending: usCreatingStation } =
    useMutation({
      mutationKey: ["stationSignup"],
      mutationFn: (formData) => apiStationSignup({ formData, currentUser }),
      onSuccess: () => {
        toast.success("成功建立站點");
        queryClient.invalidateQueries({
          queryKey: ["member"],
        });
        queryClient.invalidateQueries({
          queryKey: ["stationAdmin"],
        });
        queryClient.invalidateQueries({
          queryKey: ["station"],
        });
        queryClient.invalidateQueries({
          queryKey: ["stations"],
        });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { createStationAsync, usCreatingStation };
}
