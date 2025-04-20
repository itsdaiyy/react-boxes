import { Outlet, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { useStationAdmin } from "@/hooks/stations/useStationAdmin";

import Banner from "@/features/admin/Banner";
import DashboardSubNav from "@/features/admin/DashboardSubNav";
import Spinner from "@/components/Spinner";
import DashboardNav from "@/features/admin/DashboardNav";
import BannerImage from "@/features/admin/BannerImage";
import BannerInfo from "@/features/admin/BannerInfo";

function AdminDashboard({ member }) {
  const { station, isLoadingStation } = useStationAdmin();
  const location = useLocation();

  const getNavType = () => {
    if (location.pathname.startsWith("/member/normal")) {
      return "normal";
    } else if (location.pathname.startsWith("/member/admin")) {
      return "storeOwner";
    } else {
      return "normal";
    }
  };

  const navType = getNavType();
  if (isLoadingStation) return <Spinner />;

  const adminInfo = [
    { label: "站點編號", value: station.id },
    { label: "地址", value: station.address, type: "address" },
    { label: "聯絡電話", value: station.phone, type: "tel" },
  ];

  const normalInfo = [
    { label: "會員編號", value: member.user.id },
    { label: "電子信箱", value: member.user.email, type: "email" },
    { label: "聯絡電話", value: member.user.user_metadata.phone, type: "tel" },
  ];

  return (
    <div className="mt-[56px] lg:mt-[72px]">
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
            transactionNumber={member.transactionsCounts}
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
    </div>
  );
}

AdminDashboard.propTypes = {
  member: PropTypes.object.isRequired,
};

export default AdminDashboard;
