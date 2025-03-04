import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";

import beginer from "../../assets/beginer.svg";
import beginer_locked from "../../assets/beginer_locked.svg";
import young from "../../assets/young.svg";
import young_locked from "../../assets/young_locked.svg";
import village_master from "../../assets/village_master.svg";
import village_master_locked from "../../assets/village_master_locked.svg";
import guardian from "../../assets/guardian.svg";
import guardian_locked from "../../assets/guardian_locked.svg";
import { IoIosArrowForward } from "react-icons/io";

function ResponsiveSwiper({ initialSlide, memberLevel }) {
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [allowTouchMove, setAllowTouchMove] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isDesktopView = window.innerWidth >= 990;
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

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(initialSlide);
    }
  }, [slidesPerView, initialSlide]);

  const style = {
    cardContainer: "2xl:mx-5 md:mx-2",
    card: "flex flex-col justify-center rounded-2xl border-4 border-main-500 bg-main-100 px-5 py-5 md:py-3",
    cardTilte: "pt-4 text-xl font-bold text-main-500 md:text-xl",
    cardButton:
      "rounded-[20px] border border-[#563B28] bg-main-600  py-2 text-main-200 shadow-[0_2px_0_#563B28] my-5 w-full md:text-sm lg:text-sm p-2 xl:text-base 2xl:text-xl",
    cardButtonRewarded:
      "rounded-[20px] border border-[#D9D9D9] bg-[#D9D9D9]  py-2 text-main-200 shadow-[0_2px_0_#563B28] my-5 w-full md:text-sm lg:text-sm p-2 xl:text-base 2xl:text-xl  text-white shadow-[#B2B2B2]",
  };

  return (
    <div className="w-full p-10 md:p-0">
      <Swiper
        key={slidesPerView} // 強制 Swiper 重新初始化
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        navigation
        initialSlide={initialSlide}
        allowTouchMove={allowTouchMove}
        className="w-full"
      >
        <SwiperSlide>
          <div className={style.cardContainer}>
            <div className={style.card}>
              <img className="" src={beginer} alt="" />
              <p className={style.cardTilte}>相遇路人</p>
            </div>
            <button
              className={
                memberLevel >= 1 ? style.cardButtonRewarded : style.cardButton
              }
              disabled
            >
              免費領3個紙箱
              <span className={memberLevel >= 1 ? "inline" : "hidden"}>
                (已領取)
              </span>
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
              <img
                className=""
                src={memberLevel < 2 ? young_locked : young}
                alt=""
              />
              <p className={style.cardTilte}>返箱青年</p>
            </div>
            <button
              className={
                memberLevel >= 2 ? style.cardButtonRewarded : style.cardButton
              }
              disabled
            >
              免費領10個紙箱
              <span className={memberLevel >= 2 ? "inline" : "hidden"}>
                (已領取)
              </span>
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
              <img
                className=""
                src={memberLevel < 3 ? village_master_locked : village_master}
                alt=""
              />
              <p className={style.cardTilte}>箱村村長</p>
            </div>
            <button
              className={
                memberLevel >= 3 ? style.cardButtonRewarded : style.cardButton
              }
              disabled
            >
              指定店家消費9折優惠
              <span className={memberLevel >= 3 ? "inline" : "hidden"}>
                (已領取)
              </span>
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
              <img
                className=""
                src={memberLevel < 4 ? guardian_locked : guardian}
                alt=""
              />
              <p className={style.cardTilte}>箱村守護者</p>
            </div>
            <button className={style.cardButton}>
              指定店家消費8折優惠
              <span className={memberLevel == 4 ? "inline" : "hidden"}>
                (已領取)
              </span>
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ResponsiveSwiper;
