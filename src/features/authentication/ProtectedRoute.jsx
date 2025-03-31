import { useMember } from "@/hooks/authentication/useMember";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

function ProtectedRoute() {
  const { isLoadingMember, isAuthenticated, getMemberError } = useMember();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingMember && !isAuthenticated && !getMemberError)
      navigate("/signin");
  }, [isLoadingMember, isAuthenticated, getMemberError, navigate]);

  if (isLoadingMember) return <Spinner />;
  if (getMemberError)
    return <ErrorMessage errorMessage={getMemberError.message} />;

  if (isAuthenticated) return <Outlet />;
}

export default ProtectedRoute;
