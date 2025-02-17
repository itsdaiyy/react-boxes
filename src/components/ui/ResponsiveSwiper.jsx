import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

import beginer from "../../assets/beginer.svg";
// import beginer_locked from '../assets/beginer_locked.svg'
import young from "../../assets/young.svg";
// import young_locked from '../../assets/young_locked.svg'
import village_master from "../../assets/village_master.svg";
// import village_master_locked from '../../assets/village_master_locked.svg'
import guardian from "../../assets/guardian.svg";
// import guardian_locked from '../../assets/guardian_locked.svg'
import { IoIosArrowForward } from "react-icons/io";

// 初始化顯示的Slide，用memberRanking判斷
// { initialSlide = 0 }
const ResponsiveSwiper = () => {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [allowTouchMove, setAllowTouchMove] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isDesktopView = window.innerWidth >= 768;
      setIsDesktop(isDesktopView);
      if (!isDesktopView) {
        setSlidesPerView(1);
        setAllowTouchMove(true);
      } else {
        setSlidesPerView(4);
        setAllowTouchMove(false);
      }
    };

    // 初始化設定
    handleResize();

    // 監聽視窗大小變化
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 用memberRanking判斷，meberRanking以轉運紙箱數判斷
  // const memberRanking = 1
  // const getReward = () => {

  const style = {
    cardContainer: "2xl:mx-5 md:mx-2",
    card: "flex flex-col justify-center rounded-2xl border-4 border-main-500 bg-main-100 px-5 py-5 md:py-3",
    cardTilte: "pt-4 text-xl font-bold text-main-500 md:text-xl",
    cardButton:
      "btn my-5 w-full md:text-sm lg:text-sm p-2 xl:text-base 2xl:text-xl",
    getRewardText: "hidden", //依照memberRanking判斷
  };

  return (
    <div className="w-full p-10 md:p-0">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        navigation
        // initialSlide={initialSlide} // 依照memberRanking判斷
        allowTouchMove={allowTouchMove}
        className="w-full"
      >
        <SwiperSlide>
          <div className={style.cardContainer}>
            <div className={style.card}>
              <img className="" src={beginer} alt="" />
              <p className={style.cardTilte}>相遇路人</p>
            </div>
            <button className={style.cardButton}>
              免費領3個紙箱
              <span className={style.getRewardText}>(已領取)</span>
            </button>
          </div>
          {isDesktop && (
            <div className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 translate-x-1/2">
              <IoIosArrowForward className="h-6 w-6 text-gray-600" />
            </div>
          )}
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.cardContainer}>
            <div className={style.card}>
              <img className="" src={young} alt="" />
              <p className={style.cardTilte}>返箱青年</p>
            </div>
            <button className={style.cardButton}>
              免費領10個紙箱
              <span className={style.getRewardText}>(已領取)</span>
            </button>
          </div>
          {isDesktop && (
            <div className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 translate-x-1/2">
              <IoIosArrowForward className="h-6 w-6 text-gray-600" />
            </div>
          )}
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.cardContainer}>
            <div className={style.card}>
              <img className="" src={village_master} alt="" />
              <p className={style.cardTilte}>箱村村長</p>
            </div>
            <button className={style.cardButton}>指定店家消費9折優惠</button>
          </div>
          {isDesktop && (
            <div className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 translate-x-1/2">
              <IoIosArrowForward className="h-6 w-6 text-gray-600" />
            </div>
          )}
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.cardContainer}>
            <div className={style.card}>
              <img className="" src={guardian} alt="" />
              <p className={style.cardTilte}>箱村守護者</p>
            </div>
            <button className={style.cardButton}>指定店家消費8折優惠</button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ResponsiveSwiper;
