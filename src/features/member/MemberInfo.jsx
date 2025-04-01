import { useEffect, useState } from "react";
import { useMember } from "@/hooks/authentication/useMember";

import village_master from "@/assets/village_master.svg";
import beginer from "@/assets/beginer.svg";
import young from "@/assets/young.svg";
import guardian from "@/assets/guardian.svg";
import points_icon from "@/assets/points.svg";
import box_count from "@/assets/box_count.svg";

import ResponsiveSwiper from "@/components/ui/ResponsiveSwiper";
import MemberInfoForm from "@/features/member/MemberInfoForm";

const style = {
  cardContainer: "grid rounded-2xl bg-white p-5 lg:px-0 lg:py-10 xl:p-10",
  cardText: "text-2xl font-bold",
  cardNumber: "text-6xl font-bold text-main-600",
  responsiveSettings: "col-span-1 p-1 lg:p-0 justify-self-center",
};

const levelImages = [beginer, young, village_master, guardian];

function MemberInfo() {
  const { member } = useMember();
  const pointNum = member.user.user_metadata.points;
  const transactionNums = member.transactionsCounts;

  // 會員等級定義 => 轉運紙箱數為門檻
  // transactionNums > 0 => 箱遇路人
  // transactionNums > 50 => 返箱青年
  // transactionNums > 100 => 箱村村長
  // transactionNums > 200 => 箱村守護者
  const memberTitle = {
    level_1: "箱遇路人",
    level_2: "返箱青年",
    level_3: "箱村村長",
    level_4: "箱村守護者",
  };

  const [memberLevel, setMemberLevel] = useState(1);
  const [memberLevelTitle, setMemberLevelTitle] = useState("");
  const [unlockMemberTitle, setUnlockMemberTitle] = useState("");
  const [levelUpNum, setLevelUpNum] = useState(0);
  const [initialSlide, setInitialSlide] = useState(0);

  useEffect(() => {
    if (transactionNums >= 0 && transactionNums < 50) {
      setMemberLevel(1);
      setMemberLevelTitle(memberTitle.level_1);
      setUnlockMemberTitle(memberTitle.level_2);
      setLevelUpNum(50 - transactionNums);
      setInitialSlide(0);
    } else if (transactionNums >= 50 && transactionNums < 100) {
      setMemberLevel(2);
      setMemberLevelTitle(memberTitle.level_2);
      setUnlockMemberTitle(memberTitle.level_3);
      setLevelUpNum(100 - transactionNums);
      setInitialSlide(1);
    } else if (transactionNums >= 100 && transactionNums < 200) {
      setMemberLevel(3);
      setMemberLevelTitle(memberTitle.level_3);
      setUnlockMemberTitle(memberTitle.level_4);
      setLevelUpNum(200 - transactionNums);
      setInitialSlide(2);
    } else if (transactionNums > 200) {
      setMemberLevel(4);
      setMemberLevelTitle(memberTitle.level_4);
      setInitialSlide(3);
    }
  }, [
    memberTitle.level_1,
    memberTitle.level_2,
    memberTitle.level_3,
    memberTitle.level_4,
    transactionNums,
  ]);

  return (
    <div className="w-full p-10 text-center">
      <div className="my-20">
        <div className="my-10">
          <p className="mb-6 text-base md:text-2xl">
            幫助紙箱君順利搭上返箱專車，繼續旅行吧！
          </p>

          {memberLevel !== 4 && (
            <NormalLevel
              levelUpNum={levelUpNum}
              memberLevelTitle={memberLevelTitle}
              unlockMemberTitle={unlockMemberTitle}
            />
          )}
        </div>
        <ResponsiveSwiper
          initialSlide={initialSlide}
          memberLevel={memberLevel}
        />
      </div>

      <div className="container m-20 mx-auto rounded-3xl bg-main-100 p-4">
        {/* 最外層容器 */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* 右側容器 */}
          <div className="order-1 flex flex-col gap-4 md:order-2 md:w-1/2">
            {/* 1號 div - 永遠在最上方 */}
            <div className="flex items-end justify-center p-4 lg:justify-between">
              <p className="flex text-3xl font-bold text-main-600">會員資訊</p>
              <img
                src={levelImages[memberLevel - 1]}
                alt={memberLevelTitle}
                className="hidden lg:block"
              />
            </div>

            {/* 2號 div - 手機版時在最下方 */}
            <div className="hidden gap-5 rounded md:flex md:flex-col">
              <div
                className={`${style.cardContainer} items-center lg:grid-cols-4`}
              >
                <img
                  src={points_icon}
                  alt=""
                  className={`${style.responsiveSettings}`}
                />
                <p className={`${style.cardText} ${style.responsiveSettings}`}>
                  當前積分
                </p>
                <p
                  className={`${style.cardNumber} ${style.responsiveSettings}`}
                >
                  {pointNum !== "" ? pointNum : "載入中..."}
                </p>
                <p className={`${style.cardText} ${style.responsiveSettings}`}>
                  Points
                </p>
              </div>
              <div
                className={`${style.cardContainer} items-center lg:grid-cols-4`}
              >
                <img
                  src={box_count}
                  alt=""
                  className={`${style.responsiveSettings}`}
                />
                <p className={`${style.cardText} ${style.responsiveSettings}`}>
                  轉運紙箱
                </p>
                <p
                  className={`${style.cardNumber} ${style.responsiveSettings}`}
                >
                  {transactionNums !== "" ? transactionNums : "載入中..."}
                </p>
                <p className={`${style.cardText} ${style.responsiveSettings}`}>
                  次
                </p>
              </div>
            </div>
          </div>

          {/* 會員資訊表單 */}
          {/* 3號 div - 左側容器，手機版時在中間 */}
          <MemberInfoForm data={member} memberLevelTitle={memberLevelTitle} />

          {/* 會員資訊 */}
          {/* 2號 div 的手機版位置 */}
          <div className="order-3 flex flex-col gap-5 rounded md:hidden">
            <div className={`${style.cardContainer} justify-center gap-4`}>
              <img src={points_icon} alt="" className="justify-self-center" />
              <p className={style.cardText}>當前積分</p>
              <p className={style.cardNumber}>
                {pointNum !== "" ? pointNum : "載入中..."}
              </p>
              <p className={style.cardText}>Points</p>
            </div>
            <div className={`${style.cardContainer} justify-center gap-4`}>
              <img src={box_count} alt="" className="justify-self-center" />
              <p className={style.cardText}>轉運紙箱</p>
              <p className={style.cardNumber}>
                {transactionNums !== "" ? transactionNums : "載入中..."}
              </p>
              <p className={style.cardText}>次</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberInfo;

// 一般等級
function NormalLevel({ levelUpNum, unlockMemberTitle }) {
  return (
    <div className="md:flex md:items-center md:justify-center">
      <p className="my-5 flex items-center justify-center text-base md:text-2xl">
        再累積
        <span className="mx-5 flex items-center text-[40px] font-bold text-main-500">
          {levelUpNum}
        </span>
        次
      </p>
      <p className="my-5 flex items-center justify-center text-base md:text-2xl">
        轉運紙箱數，就可以解鎖
        <span className="px-1 font-bold text-main-500">
          {unlockMemberTitle}
        </span>
        稱號！
      </p>
    </div>
  );
}
