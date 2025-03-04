import avatorLg from "@/assets/avator-lg.svg";
import memberBannerBg01 from "@/assets/memberBanner-bg1.svg";
import box from "@/assets/box.svg";
import dialog from "@/assets/dialog.svg";
import { FaStoreAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useStation } from "@/hooks/useStation";
import Spinner from "./Spinner";
import { useMember } from "@/hooks/useMember";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";

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

  // 會員稱號
  const { member, isLoadingMember, getMemberError } = useMember();
  const [transactionNums, setTransactionNums] = useState(0);
  useEffect(() => {
    if (member && member.user.user_metadata) {
      setTransactionNums(member.user.user_metadata.transaction_nums);
    }
  }, [member]);
  // 會員等級定義 => 轉運紙箱數為門檻
  // transactionNums > 0 => 相遇路人
  // transactionNums > 50 => 返箱青年
  // transactionNums > 100 => 箱村村長
  // transactionNums > 200 => 箱村守護者
  const memberTitle = {
    level_1: "相遇路人",
    level_2: "返箱青年",
    level_3: "箱村村長",
    level_4: "箱村守護者",
  };
  const [memberLevel, setMemberLevel] = useState(1);
  const [memberLevelTitle, setMemberLevelTitle] = useState("");
  useEffect(() => {
    if (transactionNums > 0 && transactionNums < 50) {
      setMemberLevel(1);
      setMemberLevelTitle(memberTitle.level_1);
    } else if (transactionNums >= 50 && transactionNums < 100) {
      setMemberLevel(2);
      setMemberLevelTitle(memberTitle.level_2);
    } else if (transactionNums >= 100 && transactionNums < 200) {
      setMemberLevel(3);
      setMemberLevelTitle(memberTitle.level_3);
    } else if (transactionNums > 200) {
      setMemberLevel(4);
      setMemberLevelTitle(memberTitle.level_4);
    }
  }, [
    memberTitle.level_1,
    memberTitle.level_2,
    memberTitle.level_3,
    memberTitle.level_4,
    transactionNums,
  ]);

  if (isLoadingMember) return <Spinner />;
  if (getMemberError) return <ErrorMessage errorMessage={member.message} />;

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
            {navType === "normal" ? memberLevelTitle : "站長"}午安，
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
