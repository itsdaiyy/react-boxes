import { Outlet } from "react-router-dom";

import Banner from "@/components/Banner";
import DashboardSubNav from "@/components/DashboardSubNav";
import DashboardNav from "@/components/DashboardNav";
import BannerInfo from "@/components/BannerInfo";
import BannerImage from "@/components/BannerImage";

function NormalDashboard({ member }) {
  return (
    <>
      <Banner member={member}>
        <BannerInfo
          title={member.user.user_metadata.display_name}
          infoData={[
            `會員編號：${member.user.id}`,
            `電子信箱：${member.user.email}`,
            `聯絡電話：${member.user.user_metadata.phone}`,
          ]}
          showApplyButton={true}
        />
        <BannerImage
          role="normal"
          transactionNums={member.transactionsCounts}
        />
      </Banner>
      <main>
        <DashboardNav role="normal" />
        <DashboardSubNav role="normal" />
        <section className="container mx-auto my-10">
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default NormalDashboard;
