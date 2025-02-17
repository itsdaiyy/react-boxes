import { NavLink } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import homeSection2_1 from "@/assets/homeSection2-1.png";
import homeSection2_2 from "@/assets/homeSection2-2.png";
import homeSection2_3 from "@/assets/homeSection2-3.png";
import homeSection3_1 from "@/assets/homeSection3_1.png";
import homeSection3_2 from "@/assets/homeSection3_2.png";
import homeSection3_3 from "@/assets/homeSection3_3.png";
import homeSection3_4 from "@/assets/homeSection3_4.png";
import homeSection3_5 from "@/assets/homeSection3_5.png";
import homeSection3_6 from "@/assets/homeSection3_6.png";
import homeSection4_1 from "@/assets/homeSection4_1.png";
import homeSection4_2 from "@/assets/homeSection4_2.png";
import homeSection4_3 from "@/assets/homeSection4_3.png";

// Section Card
function Section2_Card({ imgUrl, title, content }) {
  return (
    <div className="flex flex-col items-center w-[360px]">
      <img src={imgUrl} alt={title} className="mb-[24px]" />
      <h3 className="mb-[16px]">{title}</h3>
      <p>{content[0]}<br></br>{content[1]}</p>
    </div>
  )
}

function Section3_Card({ imgUrl, content, flexDirection }) {
  return (
    <div className={`flex py-[25px] px-[40px] items-center justify-center gap-[120px] ${flexDirection}`}>
      <h4 className="text-second-300">{content}</h4>
      <img src={imgUrl} alt={content} className="w-[615px] h-[350px]" />
    </div>
  )
}

function Section4_Card({ imgUrl, title, content }) {
  return (
    <div className="flex flex-col items-center justify-center bg-[url(@/assets/homeSection4_boxBg.png)] bg-center bg-contain bg-no-repeat p-[80px]">
      <img src={imgUrl} alt={title} className="w-[160px] h-[160px]" />
      <h3 className="my-[16px]">{title}</h3>
      <p className="fs-6 text-center">{content[0]}<br></br>{content[1]}</p>
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
      flexDirection: 'flex-row'
    },
    {
      imgUrl: homeSection3_2,
      content: '2. 帶紙箱至轉運站回收',
      flexDirection: 'flex-row-reverse'
    },
    {
      imgUrl: homeSection3_3,
      content: '3. 依據紙箱狀態，取得積分',
      flexDirection: 'flex-row'
    },
    {
      imgUrl: homeSection3_4,
      content: '4. 查詢附近紙箱轉運站，待認領紙箱列表',
      flexDirection: 'flex-row-reverse'
    }, {
      imgUrl: homeSection3_5,
      content: '5. 至轉運站以積分兌換紙箱',
      flexDirection: 'flex-row'
    },
    {
      imgUrl: homeSection3_6,
      content: '6. 現在你擁有更符合需求的紙箱',
      flexDirection: 'flex-row-reverse'
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
      <div className="bg-[url(@/assets/homeBanner.png)] bg-center bg-cover bg-no-repeat relative before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-60 ">
        <div className="container mx-auto pt-[324px] pb-[396px] flex flex-col items-center justify-center">
          <div className="text-center flex flex-col mb-[40px] gap-[40px] relative z-10">
            <h2 className="font-black text-[64px] leading-[76.8px] text-white" style={bannerText}>全國首創二手紙箱交換平台</h2>
            <h2 className="font-black text-[64px] leading-[76.8px] text-white" style={bannerText}>讓紙箱找到返箱的路</h2>
          </div>

          <NavLink to="/signin" className="btn z-10">登入查詢鄰近站點</NavLink>

        </div>
      </div>
      {/* 區塊二 */}
      <div className="relative">
        <div className="text-center py-[80px] relative z-10">
          <h2 className="h1 mb-[40px]">你也有這種困擾嗎？</h2>
          <div className="flex justify-center gap-[244px]">
            {section2Data.map((item, index) => (
              <Section2_Card key={index} imgUrl={item.imgUrl} title={item.title} content={item.content}></Section2_Card>
            ))}

          </div>
        </div>
        <img src={homeSection2_3} alt="有沒有更環保的選擇呢" className="relative z-10 w-full object-cover" />
        <div className="z-0 absolute inset-0 before:absolute before:w-1/2 before:h-full before:bg-main-100 before:content-[''] after:absolute after:w-1/2 after:h-full after:right-0 after:bg-second-100 after:content-['']">
        </div>

      </div>
      {/* 區塊三 */}
      <div className="py-[160px] text-center container mx-auto">
        <h2 className="h1 mb-[80px]">加入返箱大冒險</h2>
        <div className="relative mb-[48px]">
          <h3 className="absolute top-0 left-0 text-second-300 bg-second-100 py-[16px] px-[40px] rounded-[50px]">將不用的紙箱回收</h3>

          {section3Data.slice(0, 3).map((item, index) => (
            <Section3_Card key={index} imgUrl={item.imgUrl} content={item.content} flexDirection={item.flexDirection}></Section3_Card>
          ))}

        </div>
        <div className="relative mb-[80px]">
          <h3 className="absolute top-0 right-0 text-main-600 bg-main-100 py-[16px] px-[40px] rounded-[50px] ">帶需要的紙箱回家</h3>
          {section3Data.slice(3, 6).map((item, index) => (
            <Section3_Card key={index} imgUrl={item.imgUrl} content={item.content} flexDirection={item.flexDirection}></Section3_Card>
          ))}
        </div>
        <NavLink to="/signup" className="btn z-10 inline-block">馬上註冊<br></br>加入返箱大冒險</NavLink>
      </div>
      {/* 區塊四 */}
      <div className="bg-[url(@/assets/homeSection4_background.png)] bg-center bg-cover bg-no-repeat py-[160px]">
        <div className="container mx-auto text-center">
          <div className="text-start">
            <h2 className="pb-[24px]">紙箱轉運站大募集!!</h2>
            <p className="text-[#6F6F6F] fs-3">收到紙箱後，您可以決定紙箱的去向<br></br>成為為紙箱的領路人</p>
          </div>
          <div className="flex mx-auto justify-center items-center gap-[24px] mb-[80px]">
            {
              section4Data.map((item,index) => (
                <Section4_Card key={index} imgUrl={item.imgUrl} title={item.title} content={item.content}></Section4_Card>
              ))
            }

          </div>

          <NavLink to="/signin" className="btn z-10">申請成為紙箱轉運站</NavLink>

        </div>
      </div>
      {/* 區塊五 */}

      <Footer />
    </div>
  );
}

export default HomePage;
