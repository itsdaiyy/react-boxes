import { NavLink } from "react-router-dom";

import homeSection3_1 from "@/assets/homeSection3_1.png";
import homeSection3_2 from "@/assets/homeSection3_2.png";
import homeSection3_3 from "@/assets/homeSection3_3.png";
import homeSection3_4 from "@/assets/homeSection3_4.png";
import homeSection3_5 from "@/assets/homeSection3_5.png";
import homeSection3_6 from "@/assets/homeSection3_6.png";


function Section3_Card({ imgUrl, content, flexDirection, padding }) {
  return (
    <div className={`z-50 relative flex lg:flex-row flex-col items-center justify-center lg:gap-[9%] gap-[16px] ${flexDirection}${padding}`}>
      <h4 className="text-second-300 w-23 lg:text-[24px] text-[20px] lg:leading-[28.8px] leading-[24px]">{content}</h4>
      <div className="w-47 w-full">
        <img src={imgUrl} alt={content} className="w-full h-auto" />
      </div>
    </div>
  )
}

function DecoSvgSecond() {

  return (

    <>
      <svg className="z-0 absolute top-0 left-0 w-full h-auto hidden xxl:block" viewBox="0 0 100 200">
        <path d="M10,0 L80,0,A10,10 0 0,1 80,33,L20,33,A10,10 0 0,0 20,71,L80,71,A10,10 0 0,1 80,107,L10,107" stroke="#F2F6FF" strokeWidth="4" fill="none" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
      </svg>

      <svg className="z-0 absolute top-0 left-0 w-full h-auto hidden xl:block xxl:hidden" viewBox="0 0 100 200">
        <path d="M10,0 L80,0,A10,10 0 0,1 80,31,L20,31,A10,10 0 0,0 20,68,L80,68,A10,10 0 0,1 80,104,L10,104" stroke="#F2F6FF" strokeWidth="4" fill="none" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
      </svg>

      <svg className="z-0 absolute top-0 left-0 w-full h-auto hidden lg:block xl:hidden" viewBox="0 0 100 200">
        <path d="M10,0 L80,0,A10,10 0 0,1 80,31,L20,31,A10,10 0 0,0 20,68,L80,68,A10,10 0 0,1 80,100,L10,100" stroke="#F2F6FF" strokeWidth="4" fill="none" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
      </svg>
    </>
  )
}

function DecoSvgMain() {
  return (
    <>
      <svg className="z-0 absolute top-0 left-0 w-full h-auto hidden xxl:block" viewBox="0 0 100 200">
        <path d="M90,0 L20,0,A10,10 0 0,0 20,33,L80,33,A10,10 0 0,1 80,71,L20,71,A10,10 0 0,0 20,107,L90,107" stroke="#F5F1E8" strokeWidth="4" fill="none" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
      </svg>

      <svg className="z-0 absolute top-0 left-0 w-full h-auto hidden xl:block xxl:hidden" viewBox="0 0 100 200">
        <path d="M90,0 L20,0,A10,10 0 0,0 20,31,L80,31,A10,10 0 0,1 80,68,L20,68,A10,10 0 0,0 20,104,L90,104" stroke="#F5F1E8" strokeWidth="4" fill="none" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
      </svg>

      <svg className="z-0 absolute top-0 left-0 w-full h-auto hidden lg:block xl:hidden" viewBox="0 0 100 200">
        <path d="M90,0 L20,0,A10,10 0 0,0 20,31,L80,31,A10,10 0 0,1 80,68,L20,68,A10,10 0 0,0 20,100,L90,100" stroke="#F5F1E8" strokeWidth="4" fill="none" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
      </svg>
    </>
  )
}

// main
export default function HomeSection3() {

  const section3Data = [
    {
      imgUrl: homeSection3_1,
      content: '1. 查詢附近紙箱轉運站，可回收紙箱類型',
      flexDirection: 'flex-row',
      padding: 'lg:py-[25px] py-[24px] lg:ps-[40px] lg:pe-[17%] px-[12px]'
    },
    {
      imgUrl: homeSection3_2,
      content: '2. 帶紙箱至轉運站回收',
      flexDirection: 'flex-row-reverse',
      padding: 'lg:py-[25px] py-[24px] lg:pe-[40px] lg:ps-[17%] px-[12px]'
    },
    {
      imgUrl: homeSection3_3,
      content: '3. 依據紙箱狀態，取得積分',
      flexDirection: 'flex-row',
      padding: 'lg:py-[25px] py-[24px] lg:ps-[40px] lg:pe-[17%] px-[12px]'
    },
    {
      imgUrl: homeSection3_4,
      content: '4. 查詢附近紙箱轉運站，待認領紙箱列表',
      flexDirection: 'flex-row-reverse',
      padding: 'lg:py-[25px] py-[24px] lg:pe-[40px] lg:ps-[17%] px-[12px]'
    }, {
      imgUrl: homeSection3_5,
      content: '5. 至轉運站以積分兌換紙箱',
      flexDirection: 'flex-row',
      padding: 'lg:py-[25px] py-[24px] lg:ps-[40px] lg:pe-[17%] px-[12px]'
    },
    {
      imgUrl: homeSection3_6,
      content: '6. 現在你擁有更符合需求的紙箱',
      flexDirection: 'flex-row-reverse',
      padding: 'lg:py-[25px] py-[24px] lg:pe-[40px] lg:ps-[17%] px-[12px]'
    }
  ]

  return (
    <div className="container mx-auto px-5 lg:py-[160px] py-[40px] text-center ">
      <h2 className="lg:text-[40px] text-[28px] lg:leading-[48px] leading-[33.6px]  lg:mb-[80px] mb-[40px]">加入返箱大冒險</h2>
      {/* 上層 */}
      <div className="relative lg:mb-[48px] mb-[40px]">
        <h3 className="lg:absolute lg:top-0 lg:left-0 lg:-translate-y-1/2 text-second-300 bg-second-100 py-[16px] lg:px-[40px] rounded-[50px] lg:text-[28px] text-[24px] lg:leading-[33.6px] leading-[28.8px] z-40">將不用的紙箱回收</h3>

        {section3Data.slice(0, 3).map((item, index) => (
          <Section3_Card key={index} imgUrl={item.imgUrl} content={item.content} flexDirection={item.flexDirection} padding={item.padding}></Section3_Card>
        ))}

        <DecoSvgSecond></DecoSvgSecond>

      </div>
      {/* 下層 */}
      <div className="relative lg:mb-[80px] mb-[40px]">
        <h3 className="lg:absolute lg:top-0 lg:right-0 lg:-translate-y-1/2 text-main-600 bg-main-100 py-[16px] px-[40px] rounded-[50px] lg:text-[28px] text-[24px] lg:leading-[33.6px] leading-[28.8px] z-40">帶需要的紙箱回家</h3>


        {section3Data.slice(3, 6).map((item, index) => (
          <Section3_Card key={index} imgUrl={item.imgUrl} content={item.content} flexDirection={item.flexDirection} border={item.border} before={item.before} after={item.after} padding={item.padding}></Section3_Card>
        ))}

        <DecoSvgMain></DecoSvgMain>

      </div>

      <NavLink to="/signup" className="btn z-10 inline-block">馬上註冊<br></br>加入返箱大冒險</NavLink>
    </div>
  )
}