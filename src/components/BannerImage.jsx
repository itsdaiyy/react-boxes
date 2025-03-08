import box from "@/assets/box.svg";
import dialog from "@/assets/dialog.svg";
import { useEffect, useState } from "react";

const memberTitle = {
  level_1: "箱遇路人",
  level_2: "返箱青年",
  level_3: "箱村村長",
  level_4: "箱村守護者",
};

function BannerImage({ role, transactionNums }) {
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
  }, [transactionNums, setMemberLevel]);

  return (
    <div className="relative h-60 w-80 md:w-[500px]">
      <h4 className="absolute left-12 top-6 z-30 rotate-6 text-nowrap text-center text-main-100 lg:left-48 lg:top-16">
        {role === "normal" && (
          <>
            {memberLevelTitle}午安，
            <br />
            歡迎來到返箱轉運站！
          </>
        )}
        {role === "storeOwner" && (
          <>
            站長午安，
            <br />
            歡迎回到返箱轉運站！
          </>
        )}
      </h4>
      <img
        src={dialog}
        alt="對話框"
        className="absolute left-4 z-20 lg:left-40 lg:top-10"
      />
      <img src={box} alt="紙箱" className="absolute top-24 z-10" />
    </div>
  );
}

export default BannerImage;
