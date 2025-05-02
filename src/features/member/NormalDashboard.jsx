import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Banner from "@/features/admin/Banner";
import DashboardSubNav from "@/features/admin/DashboardSubNav";
import DashboardNav from "@/features/admin/DashboardNav";
import BannerInfo from "@/features/admin/BannerInfo";
import BannerImage from "@/features/admin/BannerImage";
import { formatPhoneNumber } from "@/utils/helpers";

function NormalDashboard({ member }) {
  return (
    <div className="mt-[56px] lg:mt-[72px]">
      <Banner member={member}>
        <BannerInfo
          title={member.user.user_metadata.display_name}
          infoData={[
            { label: "會員編號", value: member.user.id },
            { label: "電子信箱", value: member.user.email, type: "email" },
            {
              label: "聯絡電話",
              value: formatPhoneNumber(member.user.user_metadata.phone),
              type: "tel",
            },
          ]}
          showApplyButton={true}
        />
        <BannerImage
          role="normal"
          transactionNumber={member.transactionsCounts}
        />
      </Banner>
      <main>
        <DashboardNav role="normal" />
        <DashboardSubNav role="normal" />
        <section className="container mx-auto my-10">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
NormalDashboard.propTypes = {
  member: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      user_metadata: PropTypes.shape({
        display_name: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
      }).isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    transactionsCounts: PropTypes.number.isRequired,
  }).isRequired,
};

export default NormalDashboard;
