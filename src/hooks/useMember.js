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

  return {
    member,
    isLoadingMember,
    isAuthenticated: member?.user.role === "authenticated",
    role: member?.user.user_metadata.roles.length > 1 ? "storeOwner" : "normal",
    getMemberError,
  };
}
