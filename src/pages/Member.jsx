import Header from "@/components/Header";
import MemberBanner from "@/components/MemberBanner";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";
import MemberNav from "@/components/MemberNav";

function Member() {
  return (
    <div>
      <Header />
      <MemberBanner />
      <MemberNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Member;
