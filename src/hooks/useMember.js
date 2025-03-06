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
    // staleTime: 1000 * 60 * 10, // ✅ 10 分鐘內不重新 fetch，減少不必要的渲染
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
