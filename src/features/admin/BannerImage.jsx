import { useMemo } from "react";

import box from "@/assets/box.svg";
import dialog from "@/assets/dialog.svg";

const memberTitle = {
  level_1: "箱遇路人",
  level_2: "返箱青年",
  level_3: "箱村村長",
  level_4: "箱村守護者",
};
import PropTypes from "prop-types";

function getMemberLevel(transactionNumber) {
  if (transactionNumber >= 200) return 4;
  if (transactionNumber >= 100) return 3;
  if (transactionNumber >= 50) return 2;
  if (transactionNumber > 0) return 1;
  return 1;
}

function BannerImage({ role, transactionNumber }) {
  const memberLevel = useMemo(
    () => getMemberLevel(transactionNumber),
    [transactionNumber],
  );
  const memberLevelTitle = memberTitle[`level_${memberLevel}`];

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
BannerImage.propTypes = {
  role: PropTypes.string.isRequired,
  transactionNumber: PropTypes.number.isRequired,
};

export default BannerImage;
