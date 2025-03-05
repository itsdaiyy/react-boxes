import { useMember } from "@/hooks/useMember";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NormalDashboard from "@/components/NormalDashboard";
import AdminDashboard from "@/components/AdminDashboard";

function Member() {
  const { role, member } = useMember();
  console.log(role);
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
