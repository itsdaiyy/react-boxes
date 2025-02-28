import { NavLink } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import homeSection2_1 from "@/assets/homeSection2-1.png";
import homeSection2_2 from "@/assets/homeSection2-2.png";
import homeSection2_3 from "@/assets/homeSection2-3.png";
import homeSection2_3_md from "@/assets/homeSection2-3_md.png";
import homeSection2_3_lg from "@/assets/homeSection2-3_lg.png";
import homeSection3_1 from "@/assets/homeSection3_1.png";
import homeSection3_2 from "@/assets/homeSection3_2.png";
import homeSection3_3 from "@/assets/homeSection3_3.png";
import homeSection3_4 from "@/assets/homeSection3_4.png";
import homeSection3_5 from "@/assets/homeSection3_5.png";
import homeSection3_6 from "@/assets/homeSection3_6.png";
import homeSection4_1 from "@/assets/homeSection4_1.png";
import homeSection4_2 from "@/assets/homeSection4_2.png";
import homeSection4_3 from "@/assets/homeSection4_3.png";
import homeSection5_lg from "@/assets/homeSection5_lg.png";
import homeSection5_md from "@/assets/homeSection5_md.png";
import homeSection5_sm from "@/assets/homeSection5_sm.png";

// Section Card
function Section2_Card({ imgUrl, title, content, bgColor, padding }) {
  return (
    <div className={`flex flex-col items-center lg:w-21 w-93 ${padding} relative`}>
      <img src={imgUrl} alt={title} className="mb-[24px] z-10" />
      <h3 className="mb-[16px] z-10">{title}</h3>
      <p className="z-10">{content[0]}<br></br>{content[1]}</p>
      {/* <div className={`z-0 absolute inset-0 
        before:absolute before:w-screen before:h-full before:bg-${bgColor} before:left-1/2 before:-translate-x-1/2 before:content-[''] lg:hidden`}>
        </div> */}
    </div>
  )
}

function Section3_Card({ imgUrl, content, flexDirection, border, before, after, padding }) {
  return (
    <div className={`flex lg:flex-row flex-col items-center justify-center lg:gap-[9%] gap-[16px] ${flexDirection}
  ${border} ${before} ${after} ${padding}`}>
      <h4 className="text-second-300 w-23 lg:text-[24px] text-[20px] lg:leading-[28.8px] leading-[24px]">{content}</h4>
      <div className="w-47 w-full">
        <img src={imgUrl} alt={content} className="w-full h-auto" />
      </div>

    </div>
  )
}

function Section4_Card({ imgUrl, title, content }) {
  return (
    <div className="bg-[url(@/assets/homeSection4_boxBg.png)] bg-center bg-contain bg-no-repeat w-full py-[64px]">
      <div className="flex flex-col items-center justify-center z-10">
        <img src={imgUrl} alt={title} className="w-34 h-auto z-10" />
        <h3 className="my-[16px] z-10 xl:text-[28px] text-[24px] xl:leading-[33.6px] leading-[28.8px]">{title}</h3>
        <p className="fs-6 text-center z-10">{content[0]}<br></br>{content[1]}</p>
      </div>

      {/* <div className="absolute bg-[url(@/assets/homeSection4_boxBg.png)] bg-center bg-contain bg-no-repeat top-1/2 left-1/2 z-0  w-full h-full lg:w-[150%] lg:h-[150%] -translate-x-1/2 -translate-y-1/2"></div> */}
    </div>

  )
}

// Main 

function HomePage() {

  // Section Data
  const section2Data = [
    {
      imgUrl: homeSection2_1,
      title: '作為網購消費者',
      content: ['太多網購紙箱囤積在家中', '丟棄浪費卻又沒有空間收藏']
    },
    {
      imgUrl: homeSection2_2,
      title: '做為小型店家',
      content: ['每次出貨都需要採購', '許多一次性紙箱']
    }
  ]

  const section3Data = [
    {
      imgUrl: homeSection3_1,
      content: '1. 查詢附近紙箱轉運站，可回收紙箱類型',
      flexDirection: 'flex-row',
      border: 'relative z-10 lg:border-y-4 lg:border-e-4 lg:rounded-r-full lg:border-second-100 ',
      before: 'lg:before:absolute lg:before:content-[""] lg:before:w-1/2 lg:before:h-[10px] lg:before:bg-white lg:before:bottom-0 lg:before:left-0 lg:before:translate-y-1/2',
      after: '',
      padding: 'lg:py-[25px] py-[24px] lg:ps-[40px] lg:pe-[17%] px-[12px]'
    },
    {
      imgUrl: homeSection3_2,
      content: '2. 帶紙箱至轉運站回收',
      flexDirection: 'flex-row-reverse',
      border: 'relative z-20 lg:border-y-4 lg:border-s-4 lg:rounded-l-full lg:border-second-100 ',
      before: 'lg:before:absolute lg:before:content-[""] lg:before:w-1/2 lg:before:h-[10px] lg:before:bg-white lg:before:bottom-0 lg:before:right-0 lg:before:translate-y-1/2 ',
      after: 'lg:after:absolute lg:after:content-[""] lg:after:w-1/2 lg:after:h-[10px] lg:after:bg-white lg:after:top-0 lg:after:right-0 lg:after:-translate-y-1/2 ',
      padding: 'lg:py-[25px] py-[24px] lg:pe-[40px] lg:ps-[17%] px-[12px]'
    },
    {
      imgUrl: homeSection3_3,
      content: '3. 依據紙箱狀態，取得積分',
      flexDirection: 'flex-row',
      border: 'relative z-30 lg:border-y-4 lg:border-e-4 lg:rounded-r-full lg:border-second-100',
      before: 'lg:before:absolute lg:before:content-[""] lg:before:w-1/2 lg:before:h-[10px] lg:before:bg-white lg:before:top-0 lg:before:left-0 lg:before:-translate-y-1/2 ',
      after: '',
      padding: 'lg:py-[25px] py-[24px] lg:ps-[40px] lg:pe-[17%] px-[12px]'
    },
    {
      imgUrl: homeSection3_4,
      content: '4. 查詢附近紙箱轉運站，待認領紙箱列表',
      flexDirection: 'flex-row-reverse',
      border: 'relative z-10 lg:border-y-4 lg:border-s-4 lg:rounded-l-full lg:border-main-100',
      before: 'lg:before:absolute lg:before:content-[""] lg:before:w-1/2 lg:before:h-[10px] lg:before:bg-white lg:before:bottom-0 lg:before:right-0 lg:before:translate-y-1/2 ',
      after: '',
      padding: 'lg:py-[25px] py-[24px] lg:pe-[40px] lg:ps-[17%] px-[12px]'
    }, {
      imgUrl: homeSection3_5,
      content: '5. 至轉運站以積分兌換紙箱',
      flexDirection: 'flex-row',
      border: 'relative z-20 lg:border-y-4 lg:border-e-4 lg:rounded-r-full lg:border-main-100',
      before: 'lg:before:absolute lg:before:content-[""] lg:before:w-1/2 lg:before:h-[10px] lg:before:bg-white lg:before:bottom-0 lg:before:left-0 lg:before:translate-y-1/2 ',
      after: 'lg:after:absolute lg:after:content-[""] lg:after:w-1/2 lg:after:h-[10px] lg:after:bg-white lg:after:top-0 lg:after:left-0 lg:after:-translate-y-1/2 ',
      padding: 'lg:py-[25px] py-[24px] lg:ps-[40px] lg:pe-[17%] px-[12px]'
    },
    {
      imgUrl: homeSection3_6,
      content: '6. 現在你擁有更符合需求的紙箱',
      flexDirection: 'flex-row-reverse',
      border: 'relative z-30 lg:border-y-4 lg:border-s-4 lg:rounded-l-full lg:border-main-100',
      before: 'lg:before:absolute lg:before:content-[""] lg:before:w-1/2 lg:before:h-[10px] lg:before:bg-white lg:before:top-0 lg:before:right-0 lg:before:-translate-y-1/2 ',
      after: '',
      padding: 'lg:py-[25px] py-[24px] lg:pe-[40px] lg:ps-[17%] px-[12px]'
    }
  ]

  const section4Data = [
    {
      imgUrl: homeSection4_1,
      title: '保留自用',
      content: ['紙箱狀態尚可且符合您的需求', '可以選擇自行保留'],
    },
    {
      imgUrl: homeSection4_2,
      title: '釋出認領',
      content: ['紙箱狀態尚可但無使用需求', '可以選擇釋出供民眾認領'],
    },
    {
      imgUrl: homeSection4_3,
      title: '進行回收',
      content: ['紙箱狀態已無法供再次使用', '將紙箱交由本平台進行回收'],
    }
  ]

  // style
  const bannerText = {
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.3), 0px 8px 12px rgba(0, 0, 0, 0.1)'
  }

  return (
    <div>
      <Header />
      {/* 區塊一 */}
      <div className="bg-[url(@/assets/homeBanner_2.jpg)] bg-center bg-cover bg-no-repeat relative before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-60 ">
        <div className="container mx-auto lg:pt-[324px] lg:pb-[396px] py-[146px] flex flex-col items-center justify-center">
          <div className="text-center flex flex-col lg:mb-[40px] mb-[16px] lg:gap-[40px] gap-[16px] relative z-10">
            <h2 className="font-black lg:leading-[76.8px] lg:text-[64px] leading-[33.6px] text-[28px] text-white " style={bannerText}>全國首創二手紙箱交換平台</h2>
            <h2 className="font-black lg:leading-[76.8px] lg:text-[64px] leading-[33.6px] text-[28px] text-white  " style={bannerText}>讓紙箱找到返箱的路</h2>
          </div>

          <NavLink to="/signin" className="btn z-10">登入查詢鄰近站點</NavLink>

        </div>
      </div>
      {/* 區塊二 */}
      <div className="relative">
        <div className="text-center lg:py-[80px] py-[40px] relative z-10">
          <h2 className="lg:text-[40px] text-[28px] lg:leading-[48px] leading-[33.6px] mb-[40px]">你也有這種困擾嗎？</h2>
          <div className="flex lg:flex-row flex-col justify-center items-center">
            <Section2_Card imgUrl={section2Data[0].imgUrl} title={section2Data[0].title} content={section2Data[0].content} padding={`lg:pe-[122px] ps-0 pb-[40px] lg:pb-0`} bgColor={`main-100`}></Section2_Card>
            <Section2_Card imgUrl={section2Data[1].imgUrl} title={section2Data[1].title} content={section2Data[1].content} padding={`lg:ps-[122px] ps-0 pt-[40px] lg:pt-0`} bgColor={`second-100`}></Section2_Card>
          </div>
        </div>
        <img src={homeSection2_3} alt="有沒有更環保的選擇呢" className="relative z-10 w-full object-cover h-auto hidden xl:block" />
        <img src={homeSection2_3_md} alt="有沒有更環保的選擇呢" className="relative z-10 w-full object-cover h-auto block hidden lg:block xl:hidden" />
        <img src={homeSection2_3_md} alt="有沒有更環保的選擇呢" className="relative z-10 w-full object-cover h-auto block lg:hidden" />
        <div className="z-0 absolute inset-0 
        before:absolute lg:before:w-1/2 before:w-full lg:before:h-full before:h-2/6 before:bg-main-100 top-0 before:content-[''] 
        after:absolute lg:after:w-1/2 after:w-full lg:after:h-full after:h-4/6 lg:after:right-0 after:bottom-0 after:bg-second-100 after:content-['']">
        </div>

      </div>
      {/* 區塊三 */}
      <div className="container mx-auto px-5 lg:py-[160px] py-[40px] text-center ">
        <h2 className="lg:text-[40px] text-[28px] lg:leading-[48px] leading-[33.6px]  lg:mb-[80px] mb-[40px]">加入返箱大冒險</h2>
        <div className="relative lg:mb-[48px] mb-[40px]">
          <h3 className="lg:absolute lg:top-0 lg:left-0 lg:-translate-y-1/2 text-second-300 bg-second-100 py-[16px] lg:px-[40px] rounded-[50px] lg:text-[28px] text-[24px] lg:leading-[33.6px] leading-[28.8px] z-50">將不用的紙箱回收</h3>

          {section3Data.slice(0, 3).map((item, index) => (
            <Section3_Card key={index} imgUrl={item.imgUrl} content={item.content} flexDirection={item.flexDirection} border={item.border} before={item.before} after={item.after} padding={item.padding}></Section3_Card>
          ))}

        </div>

        <div className="relative lg:mb-[80px] mb-[40px]">
          <h3 className="lg:absolute lg:top-0 lg:right-0 lg:-translate-y-1/2 text-main-600 bg-main-100 py-[16px] px-[40px] rounded-[50px] lg:text-[28px] text-[24px] lg:leading-[33.6px] leading-[28.8px] z-50">帶需要的紙箱回家</h3>
          {section3Data.slice(3, 6).map((item, index) => (
            <Section3_Card key={index} imgUrl={item.imgUrl} content={item.content} flexDirection={item.flexDirection} border={item.border} before={item.before} after={item.after} padding={item.padding}></Section3_Card>
          ))}
        </div>
        <NavLink to="/signup" className="btn z-10 inline-block">馬上註冊<br></br>加入返箱大冒險</NavLink>
      </div>
      {/* 區塊四 */}
      <div className="xl:bg-[url(@/assets/homeSection4_background.png)] bg-main-100 bg-center bg-cover bg-no-repeat lg:py-[160px] py-[40px]">
        <div className="container mx-auto px-5 text-center">
          <div className="xl:text-start text-center xl:mb-[92px] mb-[40px]">
            <h2 className="xl:text-[40px] text-[28px] xl:leading-[48px] leading-[33.6px] pb-[24px]">紙箱轉運站大募集!!</h2>
            <p className="text-[#6F6F6F] xl:text-[28px] text-[16px] xl:leading-[33.6px] leading-[19.2px] font-medium xl:font-bold">收到紙箱後，您可以決定紙箱的去向<br></br>成為為紙箱的領路人</p>
          </div>
          <div className="flex xl:flex-row flex-col mx-auto justify-center items-center gap-[24px] xl:gap-[40px] xl:mb-[80px] mb-[40px]">
            {
              section4Data.map((item, index) => (
                <Section4_Card key={index} imgUrl={item.imgUrl} title={item.title} content={item.content}></Section4_Card>
              ))
            }

          </div>

          <NavLink to="/signin" className="btn z-10">申請成為紙箱轉運站</NavLink>

        </div>
      </div>
      {/* 區塊五 */}

      <div className="relative">
        <img src={homeSection5_lg} alt="地圖使用介紹" className="w-full lg:block hidden relative"/>
        <img src={homeSection5_md} alt="地圖使用介紹" className="w-full lg:hidden md:block hidden relative"/>
        <img src={homeSection5_sm} alt="地圖使用介紹" className="w-full md:hidden block  relative"/>
        <NavLink to="/map" className='btn absolute md:left-1/2 md:-translate-x-1/2 z-10 xl:bottom-[20px] lg:bottom-[10px] md:bottom-[15px] bottom-[30px] left-[60%]'>
            前往尋找理想紙箱
          </NavLink>
        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/20 to-transparent xl:h-[70px] h-[60px]"></div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
