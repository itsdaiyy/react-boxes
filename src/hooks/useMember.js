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

  const roles = member?.user?.user_metadata?.roles || [];

  return {
    member,
    isLoadingMember,
    isAuthenticated: member?.user.role === "authenticated",
    role: roles.includes("storeOwner") ? "storeOwner" : "normal",
    getMemberError,
  };
}
