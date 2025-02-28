import avatorLg from "@/assets/avator-lg.svg";
import memberBannerBg01 from "@/assets/memberBanner-bg1.svg";
import box from "@/assets/box.svg";
import dialog from "@/assets/dialog.svg";
import { FaStoreAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useStation } from "@/hooks/useStation";
import Spinner from "./Spinner";

function MemberBanner() {
  const location = useLocation();

  const getNavType = () => {
    if (location.pathname.startsWith("/member/normal")) {
      return "normal";
    } else if (location.pathname.startsWith("/member/admin")) {
      return "admin";
    } else {
      return "normal"; // 預設值
    }
  };

  const navType = getNavType();
  return (
    <section className="bg-[#F3F3F3] bg-top bg-no-repeat md:bg-[url('@/assets/memberBanner-bg2.svg')]">
      <div className="container relative mx-auto flex flex-col items-center gap-10 py-20 text-center md:flex-row md:justify-between md:text-left">
        <div className="relative h-[201px] w-[200px]">
          <img src={avatorLg} alt="會員頭像" className="absolute z-10" />
          <img
            src={memberBannerBg01}
            alt="背景圖"
            className="absolute -bottom-3 -left-14 hidden md:flex"
          />
        </div>
        {navType === "normal" ? <NormalBanner /> : <AdminBanner />}
        <div className="relative h-60 w-80 md:w-[500px]">
          <h4 className="absolute left-12 top-6 z-30 rotate-6 text-nowrap text-center text-main-100 lg:left-48 lg:top-16">
            {navType === "normal" ? "箱村村長" : "站長"}午安，
            <br /> 歡迎{navType === "normal" ? "來到" : "回到"}返箱轉運站！
          </h4>
          <img
            src={dialog}
            alt="對話框"
            className="absolute left-4 z-20 lg:left-40 lg:top-10"
          />
          <img src={box} alt="紙箱" className="absolute top-24 z-10" />
        </div>
      </div>
    </section>
  );
}

export default MemberBanner;

function NormalBanner() {
  return (
    <div className="grow">
      <h2 className="mb-4 text-black">Natasa</h2>
      <div className="fs-6 mb-4 flex flex-col space-y-2 text-[#6F6F6F]">
        <p>會員編號：Natasa1234</p>
        <p>電子信箱：ntasa0101@gmail.com</p>
        <p>連絡電話：0934134165</p>
      </div>
      <button className="btn flex items-center gap-1 text-main-200">
        <FaStoreAlt className="text-white" />
        申請成為轉運站站長
      </button>
    </div>
  );
}

function AdminBanner() {
  const { station, isLoadingStation } = useStation(10);
  if (isLoadingStation) return <Spinner />;

  return (
    <div className="grow">
      <h2 className="mb-4 text-black">{station.station_name}</h2>
      <div className="fs-6 mb-4 flex flex-col space-y-2 text-[#6F6F6F]">
        <p>站點編號：{station.id}</p>
        <p>地址：{station.address}</p>
        <p>連絡電話：{station.phone}</p>
      </div>
    </div>
  );
}
