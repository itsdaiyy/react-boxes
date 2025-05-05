import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import { useMember } from "@/hooks/authentication/useMember";

import homeSection3_1 from "@/assets/homeSection3_1.svg";
import homeSection3_2 from "@/assets/homeSection3_2.svg";
import homeSection3_3 from "@/assets/homeSection3_3.svg";
import homeSection3_4 from "@/assets/homeSection3_4.svg";
import homeSection3_5 from "@/assets/homeSection3_5.svg";
import homeSection3_6 from "@/assets/homeSection3_6.svg";

function Section3_Card({ imgUrl, content, flexDirection, padding }) {
  return (
    <div
      className={`relative z-50 flex flex-col items-center justify-center gap-[16px] lg:flex-row lg:gap-[9%] ${flexDirection}${padding} title-animation`}
    >
      <h4 className="w-23 text-[20px] leading-[24px] text-second-300 lg:text-[24px] lg:leading-[28.8px]">
        {content}
      </h4>
      <div className="w-47 w-full">
        <img src={imgUrl} alt={content} className="h-auto w-full" />
      </div>
    </div>
  );
}

Section3_Card.propTypes = {
  imgUrl: PropTypes.string,
  content: PropTypes.string,
  flexDirection: PropTypes.string,
  padding: PropTypes.string,
};

function DecoSvgSecond() {
  return (
    <>
      <svg
        className="absolute left-0 top-0 z-0 hidden h-auto w-full xxl:block"
        viewBox="0 0 100 200"
      >
        <path
          d="M10,0 L80,0,A10,10 0 0,1 80,33,L20,33,A10,10 0 0,0 20,71,L80,71,A10,10 0 0,1 80,107,L10,107"
          stroke="#F2F6FF"
          strokeWidth="4"
          fill="none"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        className="absolute left-0 top-0 z-0 hidden h-auto w-full xl:block xxl:hidden"
        viewBox="0 0 100 200"
      >
        <path
          d="M10,0 L80,0,A10,10 0 0,1 80,31,L20,31,A10,10 0 0,0 20,68,L80,68,A10,10 0 0,1 80,104,L10,104"
          stroke="#F2F6FF"
          strokeWidth="4"
          fill="none"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        className="absolute left-0 top-0 z-0 hidden h-auto w-full lg:block xl:hidden"
        viewBox="0 0 100 200"
      >
        <path
          d="M10,0 L80,0,A10,10 0 0,1 80,31,L20,31,A10,10 0 0,0 20,68,L80,68,A10,10 0 0,1 80,100,L10,100"
          stroke="#F2F6FF"
          strokeWidth="4"
          fill="none"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  );
}

function DecoSvgMain() {
  return (
    <>
      <svg
        className="absolute left-0 top-0 -z-10 hidden h-auto w-full xxl:block"
        viewBox="0 0 100 200"
      >
        <path
          d="M90,0 L20,0,A10,10 0 0,0 20,33,L80,33,A10,10 0 0,1 80,71,L20,71,A10,10 0 0,0 20,107,L90,107"
          stroke="#F5F1E8"
          strokeWidth="4"
          fill="none"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        className="absolute left-0 top-0 -z-10 hidden h-auto w-full xl:block xxl:hidden"
        viewBox="0 0 100 200"
      >
        <path
          d="M90,0 L20,0,A10,10 0 0,0 20,31,L80,31,A10,10 0 0,1 80,68,L20,68,A10,10 0 0,0 20,104,L90,104"
          stroke="#F5F1E8"
          strokeWidth="4"
          fill="none"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        className="absolute left-0 top-0 -z-10 hidden h-auto w-full lg:block xl:hidden"
        viewBox="0 0 100 200"
      >
        <path
          d="M90,0 L20,0,A10,10 0 0,0 20,31,L80,31,A10,10 0 0,1 80,68,L20,68,A10,10 0 0,0 20,100,L90,100"
          stroke="#F5F1E8"
          strokeWidth="4"
          fill="none"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  );
}

// main
export default function HomeSection3() {
  const { member } = useMember();
  const navigate = useNavigate();

  const section3Data = [
    {
      imgUrl: homeSection3_1,
      content: "1. 查詢附近紙箱轉運站，可回收紙箱類型",
      flexDirection: "flex-row",
      padding: "lg:py-[25px] py-[24px] lg:ps-[40px] lg:pe-[17%] px-[12px]",
    },
    {
      imgUrl: homeSection3_2,
      content: "2. 帶紙箱至轉運站回收",
      flexDirection: "flex-row-reverse",
      padding: "lg:py-[25px] py-[24px] lg:pe-[40px] lg:ps-[17%] px-[12px]",
    },
    {
      imgUrl: homeSection3_3,
      content: "3. 依據紙箱狀態，取得積分",
      flexDirection: "flex-row",
      padding: "lg:py-[25px] py-[24px] lg:ps-[40px] lg:pe-[17%] px-[12px]",
    },
    {
      imgUrl: homeSection3_4,
      content: "4. 查詢附近紙箱轉運站，待認領紙箱列表",
      flexDirection: "flex-row-reverse",
      padding: "lg:py-[25px] py-[24px] lg:pe-[40px] lg:ps-[17%] px-[12px]",
    },
    {
      imgUrl: homeSection3_5,
      content: "5. 至轉運站以積分兌換紙箱",
      flexDirection: "flex-row",
      padding: "lg:py-[25px] py-[24px] lg:ps-[40px] lg:pe-[17%] px-[12px]",
    },
    {
      imgUrl: homeSection3_6,
      content: "6. 現在你擁有更符合需求的紙箱",
      flexDirection: "flex-row-reverse",
      padding: "lg:py-[25px] py-[24px] lg:pe-[40px] lg:ps-[17%] px-[12px]",
    },
  ];

  const handleClick = () => {
    if (member) {
      navigate("map");
    } else {
      navigate("signup");
    }
  };

  return (
    <div className="container mx-auto px-5 py-[40px] text-center lg:py-[160px]">
      <h2 className="title-animation mb-[40px] text-[28px] leading-[33.6px] lg:mb-[80px] lg:text-[40px] lg:leading-[48px]">
        加入返箱大冒險
      </h2>
      {/* 上層 */}
      <div className="relative mb-[40px] lg:mb-[48px]">
        <h3 className="title-animation z-40 rounded-[50px] bg-second-100 py-[16px] text-[24px] leading-[28.8px] text-second-300 lg:absolute lg:left-0 lg:top-0 lg:-translate-y-1/2 lg:px-[40px] lg:text-[28px] lg:leading-[33.6px]">
          將不用的紙箱回收
        </h3>

        {section3Data.slice(0, 3).map((item, index) => (
          <Section3_Card
            key={index}
            imgUrl={item.imgUrl}
            content={item.content}
            flexDirection={item.flexDirection}
            padding={item.padding}
          ></Section3_Card>
        ))}

        <DecoSvgSecond></DecoSvgSecond>
      </div>
      {/* 下層 */}
      <div className="relative mb-[40px] lg:mb-[80px]">
        <h3 className="title-animation z-40 rounded-[50px] bg-main-100 px-[40px] py-[16px] text-[24px] leading-[28.8px] text-main-600 lg:absolute lg:right-0 lg:top-0 lg:-translate-y-1/2 lg:text-[28px] lg:leading-[33.6px]">
          帶需要的紙箱回家
        </h3>

        {section3Data.slice(3, 6).map((item, index) => (
          <Section3_Card
            key={index}
            imgUrl={item.imgUrl}
            content={item.content}
            flexDirection={item.flexDirection}
            border={item.border}
            before={item.before}
            after={item.after}
            padding={item.padding}
          ></Section3_Card>
        ))}

        <DecoSvgMain></DecoSvgMain>
      </div>

      <button
        onClick={handleClick}
        className="btn title-animation inline-block"
        style={{ zIndex: 100 }}
      >
        馬上註冊加入冒險
      </button>
    </div>
  );
}
