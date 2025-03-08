import { Outlet, useLocation } from "react-router-dom";

import { useMember } from "@/hooks/useMember";
import { useStationAdmin } from "@/hooks/useStationAdmin";

import Banner from "./Banner";
import DashboardSubNav from "./DashboardSubNav";
import Spinner from "./Spinner";
import DashboardNav from "./DashboardNav";
import BannerImage from "./BannerImage";
import BannerInfo from "./BannerInfo";

function AdminDashboard({ member }) {
  const { station, isLoadingStation } = useStationAdmin();
  const location = useLocation();

  const getNavType = () => {
    if (location.pathname.startsWith("/member/normal")) {
      return "normal";
    } else if (location.pathname.startsWith("/member/admin")) {
      return "storeOwner";
    } else {
      return "normal"; // 預設值
    }
  };

  const navType = getNavType();
  if (isLoadingStation) return <Spinner />;

  const adminInfo = [
    `站點編號：${station.id}`,
    `地址：${station.address}`,
    `聯絡電話：${station.phone}`,
  ];
  const normalInfo = [
    `會員編號：${member.user.id}`,
    `電子信箱：${member.user.email}`,
    `聯絡電話：${member.user.user_metadata.phone}`,
  ];

  return (
    <>
      <Banner member={member}>
        <>
          <BannerInfo
            role={navType}
            title={
              navType === "storeOwner"
                ? station.station_name
                : member.user.user_metadata.display_name
            }
            infoData={navType === "storeOwner" ? adminInfo : normalInfo}
            showApplyButton={false}
          />
          <BannerImage
            role={navType}
            transactionNums={member.transactionsCounts}
          />
        </>
      </Banner>
      <main>
        <DashboardNav role="storeOwner" />
        <DashboardSubNav role={navType} />
        <section className="container mx-auto my-10">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default AdminDashboard;
