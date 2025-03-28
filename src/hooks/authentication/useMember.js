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
  const role =
    roles.includes("storeOwner") && roles.length > 1
      ? "storeOwner"
      : roles.includes("users")
        ? "normal"
        : "";

  return {
    member,
    isLoadingMember,
    isAuthenticated: member?.user.role === "authenticated",
    role,
    getMemberError,
  };
}
