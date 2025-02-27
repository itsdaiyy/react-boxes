import { apiGetMember } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useMember() {
  const {
    data: member,
    isLoading: isLoadingMember,
    error: getMemberError,
  } = useQuery({
    queryKey: ["member"],
    queryFn: () => apiGetMember(),
  });

  return { member, isLoadingMember, getMemberError };
}
