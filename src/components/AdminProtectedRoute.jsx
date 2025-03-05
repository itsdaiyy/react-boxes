import { useMember } from "@/hooks/useMember";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const { role } = useMember();

  if (role === "normal")
    return <Navigate to="/member/normal/memberInfo" replace />;

  return <Outlet />;
}

export default AdminProtectedRoute;
