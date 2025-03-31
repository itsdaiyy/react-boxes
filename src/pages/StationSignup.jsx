import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMember } from "@/hooks/authentication/useMember";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";
import StationSignupForm from "@/features/authentication/StationSignupForm";
import toast from "react-hot-toast";

function StationSignup() {
  const { isAuthenticated, role, isLoadingMember } = useMember();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoadingMember && !isAuthenticated) {
      toast.error(`請先登入會員`);
      navigate("/");
    } else if (role !== "normal") {
      navigate("/member/admin/adminInfo");
    }
  }, [isLoadingMember, isAuthenticated, role, navigate]);

  if (isLoadingMember || !isAuthenticated || role !== "normal")
    return (
      <div className="flex h-screen items-center justify-center border">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="grid h-screen grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="container mx-auto my-6 px-3 lg:max-w-3xl">
          <StationSignupForm />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default StationSignup;
