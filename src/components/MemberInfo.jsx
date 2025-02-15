import village_master from "../assets/village_master.svg";
import points from "../assets/points.svg";
import box_count from "../assets/box_count.svg";

import { FaPen } from "react-icons/fa";
// import { RiCloseLargeFill } from "react-icons/ri";

import ResponsiveSwiper from "./ui/ResponsiveSwiper";

const style = {
  cardContainer: "flex items-center justify-around rounded-2xl bg-white p-10",
  cardText: "text-2xl font-bold",
  cardNumber: "text-6xl font-bold text-main-600",
};

function MemberInfo() {
  return (
    <div className="w-full text-center">
      <div className="my-20">
        <div className="my-10">
          <p className="mb-6 text-base md:text-2xl">
            幫助紙箱君順利搭上返箱專車，繼續旅行吧！
          </p>
          <div className="md:flex md:items-center md:justify-center">
            <p className="my-5 flex items-center justify-center text-base md:text-2xl">
              再累積
              <span className="mx-5 flex items-center text-[40px] font-bold text-main-500">
                486
              </span>
              次
            </p>
            <p className="my-5 flex items-center justify-center text-base md:text-2xl">
              轉運紙箱數，就可以解鎖箱村守護者稱號！
            </p>
          </div>
        </div>
        <ResponsiveSwiper />
      </div>

      <div className="container m-20 mx-auto rounded-3xl bg-main-100 p-4">
        {/* 最外層容器 */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* 右側容器 */}
          <div className="order-1 flex flex-col gap-4 md:order-2 md:w-1/2">
            {/* 1號 div - 永遠在最上方 */}
            <div className="flex items-end justify-between p-4">
              <p className="flex text-3xl font-bold text-main-600">會員資訊</p>
              <img src={village_master} alt="" />
            </div>

            {/* 2號 div - 手機版時在最下方 */}
            <div className="hidden gap-5 rounded md:flex md:flex-col">
              <div className={style.cardContainer}>
                <img src={points} alt="" />
                <p className={style.cardText}>當前積分</p>
                <p className={style.cardNumber}>35</p>
                <p className={style.cardText}>Points</p>
              </div>
              <div className={style.cardContainer}>
                <img src={box_count} alt="" />
                <p className={style.cardText}>轉運紙箱數</p>
                <p className={style.cardNumber}>514</p>
                <p className={style.cardText}>次</p>
              </div>
            </div>
          </div>

          {/* 3號 div - 左側容器，手機版時在中間 */}
          <div className="order-2 rounded-3xl bg-white p-10 md:order-1 md:w-1/2">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-700">箱村村長</p>
              <div className="flex items-center">
                <button type="button">
                  <FaPen className="text-main-600" size={20} />
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col items-start pb-6">
                <label className="mb-2" htmlFor="name">
                  姓名
                </label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  type="text"
                  id="name"
                  value="Johnny"
                />
              </div>
              <div className="flex flex-col items-start pb-6">
                <label className="mb-2" htmlFor="username">
                  會員暱稱
                </label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  type="text"
                  id="username"
                  value="user001"
                />
              </div>
              <div className="flex flex-col items-start pb-6">
                <label className="mb-2" htmlFor="tel">
                  連絡電話
                </label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  type="tel"
                  id="tel"
                  value="09123456789"
                />
              </div>
              <div className="flex flex-col items-start pb-6">
                <label className="mb-2" htmlFor="email">
                  電子信箱
                </label>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  type="email"
                  id="email"
                  value="user001@gmail.com"
                />
              </div>
            </div>
            <button className="btn" type="submit">
              確認修改
            </button>
          </div>

          {/* 會員資訊 */}
          {/* 2號 div 的手機版位置 */}
          <div className="order-3 flex flex-col gap-5 rounded md:hidden">
            <div className={`${style.cardContainer} flex-col gap-4`}>
              <img src={points} alt="" />
              <p className={style.cardText}>當前積分</p>
              <p className={style.cardNumber}>35</p>
              <p className={style.cardText}>Points</p>
            </div>
            <div className={`${style.cardContainer} flex-col gap-4`}>
              <img src={box_count} alt="" />
              <p className={style.cardText}>轉運紙箱數</p>
              <p className={style.cardNumber}>514</p>
              <p className={style.cardText}>次</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberInfo;
