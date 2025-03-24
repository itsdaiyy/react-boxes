import { useMember } from "@/hooks/useMember";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NormalDashboard from "@/components/NormalDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import { useEffect } from "react";
import supabase from "@/services/supabase";

function Member() {
  const { role, member } = useMember();

  // useEffect(() => {
  //   (async () => {
  //     const { data: newUserData, error: updateUserError } =
  //       await supabase.auth.updateUser({
  //         data: { roles: ["users"] },
  //       });
  //   })();
  // }, []);

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
