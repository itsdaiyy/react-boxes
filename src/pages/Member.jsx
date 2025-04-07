import { useMember } from "@/hooks/authentication/useMember";

import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import NormalDashboard from "@/features/member/NormalDashboard";
import AdminDashboard from "@/features/admin/AdminDashboard";

function Member() {
  const { role, member } = useMember();

  return (
    <>
      <Header />
      {role === "normal" && <NormalDashboard member={member} />}
      {role === "storeOwner" && <AdminDashboard member={member} />}
      <Footer />
    </>
  );
}

export default Member;
