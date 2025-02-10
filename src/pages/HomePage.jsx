import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NavLink } from "react-router-dom";
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


function HomePage() {

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
            <div className="flex flex-col items-center w-[360px]">
              <img src={homeSection2_1} alt="網購消費者" className="mb-[24px]" />
              <h3 className="mb-[16px]">作為網購消費者</h3>
              <p>太多網購紙箱囤積在家中<br></br>丟棄浪費卻又沒有空間收藏</p>
            </div>
            <div className="flex flex-col items-center w-[360px]">
              <img src={homeSection2_2} alt="小型店家" className="mb-[24px]" />
              <h3 className="mb-[16px]">做為小型店家</h3>
              <p>每次出貨都需要採購<br></br>許多一次性紙箱</p>
            </div>
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
          <div className="flex py-[25px] px-[40px] items-center justify-center gap-[120px] ">
            <h4 className="text-second-300">1. 查詢附近紙箱轉運站，可回收紙箱類型</h4>
            <img src={homeSection3_1} alt="查詢紙箱轉運站" className="w-[615px] h-[350px]" />
          </div>
          <div className="flex flex-row-reverse py-[25px] px-[40px] items-center justify-center gap-[120px]">
            <h4 className="text-second-300">2. 帶紙箱至轉運站回收</h4>
            <img src={homeSection3_2} alt="帶紙箱至轉運站回收" className="w-[615px] h-[350px]" />
          </div>
          <div className="flex py-[25px] px-[40px] items-center justify-center gap-[120px]">
            <h4 className="text-second-300">3. 依據紙箱狀態，取得積分</h4>
            <img src={homeSection3_3} alt="依據紙箱狀態取得積分" className="w-[615px] h-[350px]" />
          </div>
        </div>
        <div className="relative mb-[80px]">
          <h3 className="absolute top-0 right-0 text-main-600 bg-main-100 py-[16px] px-[40px] rounded-[50px] ">帶需要的紙箱回家</h3>
          <div className="flex flex-row-reverse py-[25px] px-[40px] items-center justify-center gap-[120px]">
            <h4 className="text-main-600">4. 查詢附近紙箱轉運站<br></br>待認領紙箱列表</h4>
            <img src={homeSection3_4} alt="查詢附近站點待認領紙箱" className="w-[615px] h-[350px]" />
          </div>
          <div className="flex py-[25px] px-[40px] items-center justify-center gap-[120px]">
            <h4 className="text-main-600">5. 至轉運站以積分兌換紙箱</h4>
            <img src={homeSection3_5} alt="以積分兌換紙箱" className="w-[615px] h-[350px]" />
          </div>
          <div className="flex flex-row-reverse py-[25px] px-[40px] items-center justify-center gap-[120px]">
            <h4 className="text-main-600">6. 現在你擁有更符合需求的紙箱</h4>
            <img src={homeSection3_6} alt="現在你擁有更符合需求的紙箱" className="w-[615px] h-[350px]" />
          </div>
        </div>
        <NavLink to="/signin" className="btn z-10 inline-block">馬上註冊<br></br>加入返箱大冒險</NavLink>
      </div>
      {/* 區塊四 */}
      <div className="bg-[url(@/assets/homeSection4_background.png)] bg-center bg-cover bg-no-repeat py-[160px]">
        <div className="container mx-auto text-center">
          <div className="text-start">
            <h2 className="pb-[24px]">紙箱轉運站大募集!!</h2>
            <p className="text-[#6F6F6F] fs-3">收到紙箱後，您可以決定紙箱的去向<br></br>成為為紙箱的領路人</p>
          </div>
          <div className="flex mx-auto justify-center items-center gap-[24px] mb-[80px]">
            <div className="flex flex-col items-center justify-center bg-[url(@/assets/homeSection4_boxBg.png)] bg-center bg-contain bg-no-repeat p-[80px]">
              <img src={homeSection4_1} alt="保留自用" className="w-[160px] h-[160px]"/>
              <h3 className="my-[16px]">保留自用</h3>
              <p className="fs-6 text-center">紙箱狀態尚可且符合您的需求<br></br>可以選擇自行保留</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-[url(@/assets/homeSection4_boxBg.png)] bg-center bg-contain bg-no-repeat p-[80px]">
              <img src={homeSection4_2} alt="釋出認領" className="w-[160px] h-[160px]"/>
              <h3 className="my-[16px]">釋出認領</h3>
              <p className="fs-6 text-center">紙箱狀態尚可但無使用需求<br></br>可以選擇釋出供民眾認領</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-[url(@/assets/homeSection4_boxBg.png)] bg-center bg-contain bg-no-repeat p-[80px]">
              <img src={homeSection4_3} alt="進行回收" className="w-[160px] h-[160px]"/>
              <h3 className="my-[16px]">進行回收</h3>
              <p className="fs-6 text-center">紙箱狀態已無法供再次使用<br></br>將紙箱交由本平台進行回收</p>
            </div>
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
